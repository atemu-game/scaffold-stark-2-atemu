const {
    Account,
    Contract,
    RpcProvider,
    json,
    uint256,
    CallData,
} = require("starknet");
const fs = require("fs");
// StarkNet RPC provider
const RPC = "https://starknet-sepolia.public.blastapi.io/rpc/v0_7";
const provider = new RpcProvider({ nodeUrl: RPC });
const factoryABI = [
    { "type": "function", "name": "set_cards_distribution", "inputs": [{ "name": "collection", "type": "core::starknet::contract_address::ContractAddress" }, { "name": "cards", "type": "core::array::Array::<contracts::AtemuCollectionFactory::CardsDistribution>" }], "outputs": [], "state_mutability": "external" },
] as const;

const { parse } = require('csv-parse/sync')

const PRIVATE_KEY = process.env.PRIVATE_KEY_SEPOLIA;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS_SEPOLIA;

// const PACK_ADDRESS = "0x01a40fe0d23C56B1f31A1Ab0D0734a60Ec94Eb9c40bA42F87CfccB84fC33aB34";
const FACTORY_ADDRESS = "0x2a64600cdc15f9a3d7376582f928ae85b43dd5880caef55c73418267daf44c2";
const COLLECTION_ADDRESS = "0x02b2cBcBf3A77Dd858e10EEF705029f8EEC9767070195ca84d39446bfde2C523";

const CSV_FILE = "/Users/0xandee/Documents/Github/scaffold-stark-2-atemu/packages/snfoundry/scripts-ts/data/atemu-card-collection-data.csv";

const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);

// Helper to convert string to ASCII felt representation
const stringToFelt = (str) => {
    let felt = 0n;
    for (let i = 0; i < str.length; i++) {
        felt = (felt << 8n) + BigInt(str.charCodeAt(i));
    }
    return felt.toString();
};

// Helper to flatten a CardDistribution struct
const flattenCardDistribution = (card) => {
    const { token_id, rarity_rate } = card;

    // token_id and rate are u256, so we split them into two 128-bit numbers
    const tokenIdLow = token_id.low.toString();
    const tokenIdHigh = token_id.high.toString();
    const rateLow = rarity_rate.low.toString();
    const rateHigh = rarity_rate.high.toString();

    return [
        tokenIdLow,
        tokenIdHigh, // u256 (token_id)
        rateLow,
        rateHigh, // u256 (rate)
    ];
};

function generateCardDistributions(csvPath: string) {
    // 1. Read CSV contents
    const csvData = fs.readFileSync(csvPath, 'utf-8');

    // 2. Parse CSV into records
    const records = parse(csvData, {
        columns: true,         // Use the first row as object keys
        skip_empty_lines: true // Ignore empty lines
    });

    // 3. Build the array of distribution objects
    const cardDistributions = records.map((row: any) => {
        // Get token_id from CSV (string form)
        const tokenId = row['hidden: token_id'];

        // Extract distribution rate (e.g. "3.48%"), parse it into a float => 3.48 => 34800
        const distRateStr = row['hidden: distribution_rate']?.trim() || '0';
        const distNumber = parseFloat(distRateStr.replace('%', ''));
        const rarityRate = Math.round(distNumber * 10000); // e.g. 3.48 => 34800

        // Return the object in the specified format
        return {
            token_id: uint256.bnToUint256(tokenId),
            rarity_rate: uint256.bnToUint256(rarityRate)
        };
    });

    // 4. Return the final array
    return cardDistributions;
}

async function setCardDistribution() {
    try {
        console.log("🚀 Interacting with CardFactory at: " + FACTORY_ADDRESS);
        console.log("🧑‍💼 Using Account: " + account.address);

        const cardFactory = new Contract(factoryABI, FACTORY_ADDRESS, provider);
        cardFactory.connect(account);

        const collectibleAddress = COLLECTION_ADDRESS;

        // rarity_rate 0.01% = 100
        // rarity_rate 0.1% = 1000
        // rarity_rate 1% = 10000
        // rarity_rate 10% = 100000
        const cardDistributions = generateCardDistributions(CSV_FILE);
        console.log("cardDistributions", cardDistributions);

        // Flatten the CardDistribution objects
        const flattenedCards = cardDistributions.flatMap(flattenCardDistribution);
        // Add the length of the array at the start
        const calldata = [
            collectibleAddress, // Contract address
            cardDistributions.length.toString(), // Length of the cards array
            ...flattenedCards, // Flattened array of cards
        ];

        console.log("📦 Calldata for set_cards_distribution:", calldata);

        const result = await account.execute({
            contractAddress: FACTORY_ADDRESS,
            entrypoint: "set_cards_distribution",
            calldata: calldata,
        });

        const txReceipt = await provider.waitForTransaction(
            result.transaction_hash
        );
        console.log("🎉 Transaction Confirmed on Starknet!", txReceipt);
    } catch (error) {
        console.error("❌ Error while interacting with the contract:", error);
    }
}

setCardDistribution();
