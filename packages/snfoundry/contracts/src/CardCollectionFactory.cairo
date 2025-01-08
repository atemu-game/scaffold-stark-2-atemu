use starknet::{ContractAddress, ClassHash};

#[derive(Drop, Serde, Copy, starknet::Store)]
struct CardsDistribution {
    token_id: u256,
    rarity_rate: u256,
}

#[derive(Drop, Serde, Copy, starknet::Store)]
struct CollectionPackInfo {
    collection_address: ContractAddress,
    pack_address: ContractAddress,
    amount_cards_in_pack: u32,
}

#[starknet::interface]
trait ICardCollectionFactory<TContractState> {
    fn create_collection(
        ref self: TContractState,
        base_uri: ByteArray,
        pack_address: ContractAddress,
        amount_cards_in_pack: u32,
    );
    fn update_collection(
        ref self: TContractState,
        collection: ContractAddress,
        pack_address: ContractAddress,
        amount_cards_in_pack: u32,
    );
    fn set_collection_class_hash(ref self: TContractState, new_class_hash: ClassHash);
    fn set_cards_distribution(
        ref self: TContractState, collection: ContractAddress, cards: Array<CardsDistribution>,
    );
    fn update_cards_distribution(
        ref self: TContractState, collection: ContractAddress, cards: Array<CardsDistribution>,
    );
    fn open_pack(ref self: TContractState, pack_address: ContractAddress, token_id: u256);

    fn get_collection(self: @TContractState, collection: ContractAddress) -> CollectionPackInfo;
    fn get_pack(self: @TContractState, pack: ContractAddress) -> CollectionPackInfo;
    fn get_collection_class_hash(self: @TContractState) -> ClassHash;
    fn get_all_collection_addresses(self: @TContractState) -> Array<ContractAddress>;
    fn get_all_pack_addresses(self: @TContractState) -> Array<ContractAddress>;
    fn get_cards_distribution(
        self: @TContractState, collection: ContractAddress,
    ) -> Array<CardsDistribution>;
}

#[starknet::interface]
trait IRandom<TContractState> {
    fn felt252(ref self: TContractState, seed: felt252) -> felt252;
    fn bool(ref self: TContractState, seed: felt252) -> bool;
    fn u8(ref self: TContractState, seed: felt252) -> u8;
    fn u16(ref self: TContractState, seed: felt252) -> u16;
    fn u32(ref self: TContractState, seed: felt252) -> u32;
    fn u64(ref self: TContractState, seed: felt252) -> u64;
    fn u128(ref self: TContractState, seed: felt252) -> u128;
    fn u256(ref self: TContractState, seed: felt252) -> u256;
    fn u8_capped(ref self: TContractState, seed: felt252, cap: u8) -> u8;
    fn u16_capped(ref self: TContractState, seed: felt252, cap: u16) -> u16;
    fn u32_capped(ref self: TContractState, seed: felt252, cap: u32) -> u32;
    fn u64_capped(ref self: TContractState, seed: felt252, cap: u64) -> u64;
    fn u128_capped(ref self: TContractState, seed: felt252, cap: u128) -> u128;
    fn u256_capped(ref self: TContractState, seed: felt252, cap: u256) -> u256;
    fn salt(ref self: TContractState, salt: felt252);
}

#[starknet::contract]
mod CardCollectionFactory {
    use super::IRandomDispatcherTrait;
    use super::super::CardCollection::ICardCollectionDispatcherTrait;
    use super::{CardsDistribution, CollectionPackInfo};

    use starknet::{
        ContractAddress, ClassHash, get_caller_address, get_contract_address,
        contract_address_const, get_block_info,
    };
    use starknet::syscalls::deploy_syscall;
    use starknet::storage::{
        Map, StoragePointerReadAccess, StoragePathEntry, StoragePointerWriteAccess, Vec, VecTrait,
        MutableVecTrait,
    };

    use openzeppelin::token::erc721::interface::{IERC721Dispatcher, IERC721DispatcherTrait};
    use openzeppelin::access::ownable::{OwnableComponent};
    use openzeppelin::security::reentrancyguard::ReentrancyGuardComponent;
    use openzeppelin::upgrades::interface::IUpgradeable;
    use openzeppelin::upgrades::UpgradeableComponent;

    use core::traits::TryInto;
    use core::num::traits::Zero;
    use core::hash::HashStateTrait;
    use core::byte_array::ByteArray;
    use core::pedersen::PedersenTrait;
    use core::integer::u256_from_felt252;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(
        path: ReentrancyGuardComponent, storage: reentrancyguard, event: ReentrancyGuardEvent,
    );
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);

    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;
    impl ReentrancyGuardInternalImpl = ReentrancyGuardComponent::InternalImpl<ContractState>;
    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        collection_class_hash: ClassHash,
        random_oracleless_address: ContractAddress,
        all_collections: Vec<ContractAddress>,
        all_packs: Vec<ContractAddress>,
        is_collection: Map<ContractAddress, bool>,
        // collection address -> CollectionPackInfo
        mapping_collection_info: Map<ContractAddress, CollectionPackInfo>,
        // pack address -> CollectionPackInfo
        mapping_pack_info: Map<ContractAddress, CollectionPackInfo>,
        mapping_collection_cards_distribution: Map<ContractAddress, Vec<CardsDistribution>>,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        reentrancyguard: ReentrancyGuardComponent::Storage,
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        CollectionCreated: CollectionCreated,
        CollectionUpdated: CollectionUpdated,
        PackOpened: PackOpened,
        CardsDistributionSet: CardsDistributionSet,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        ReentrancyGuardEvent: ReentrancyGuardComponent::Event,
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event,
    }

    #[derive(Drop, Copy, starknet::Event)]
    struct CollectionCreated {
        #[key]
        owner: ContractAddress,
        collection_address: ContractAddress,
        pack_address: ContractAddress,
        amount_cards_in_pack: u32,
    }

    #[derive(Drop, Copy, starknet::Event)]
    struct CollectionUpdated {
        #[key]
        owner: ContractAddress,
        collection_address: ContractAddress,
        pack_address: ContractAddress,
        amount_cards_in_pack: u32,
    }

    #[derive(Drop, Copy, starknet::Event)]
    struct PackOpened {
        #[key]
        caller: ContractAddress,
        collection_address: ContractAddress,
        pack_address: ContractAddress,
        token_id: u256,
    }

    #[derive(Drop, Copy, starknet::Event)]
    struct CardsDistributionSet {
        collection: ContractAddress,
        total_cards: u32,
    }

    mod Errors {
        pub const REQUESTOR_NOT_SELF: felt252 = 'Requestor is not self';
        pub const INVALID_PACK_OWNER: felt252 = 'Caller does not own the pack';
        pub const INVALID_COLLECTION: felt252 = 'Invalid Card Collection';
    }

    // Random oracleless contract:
    // Mainnet: 0x0000000000000000000000000000000000000000000000000000000000000000
    // SEPOLIA: 0x02da9C98a2E5B60EA441C14371d062395cFB3864f1b6Fead23CE8Bc47b3d2ECD

    #[constructor]
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress,
        collection_class_hash: ClassHash,
        random_oracleless_address: ContractAddress,
    ) {
        self.ownable.initializer(owner);
        self.collection_class_hash.write(collection_class_hash);
        self.random_oracleless_address.write(random_oracleless_address);
    }

    #[abi(embed_v0)]
    impl CardCollectionFactoryImpl of super::ICardCollectionFactory<ContractState> {
        fn create_collection(
            ref self: ContractState,
            base_uri: ByteArray,
            pack_address: ContractAddress,
            amount_cards_in_pack: u32,
        ) {
            self.reentrancyguard.start();
            self.ownable.assert_only_owner();

            let caller = get_caller_address();

            // Get a random salt
            let random_contract_address = self.random_oracleless_address.read();
            let random_contract_dispatcher = contracts::CardCollectionFactory::IRandomDispatcher {
                contract_address: random_contract_address,
            };
            let mut salt: felt252 = random_contract_dispatcher.felt252(caller.into());

            // Construct the constructor calldata
            let mut constructor_calldata = ArrayTrait::<felt252>::new();
            constructor_calldata.append(caller.into());
            constructor_calldata.append(get_contract_address().into());
            constructor_calldata.append(base_uri.data.len().into());
            for i in 0..base_uri.data.len() {
                constructor_calldata.append((*base_uri.data.at(i)).into());
            };
            constructor_calldata.append(base_uri.pending_word);
            constructor_calldata.append(base_uri.pending_word_len.into());

            // Deploy the collection contract
            let (collection, _) = deploy_syscall(
                self.get_collection_class_hash(), salt, constructor_calldata.span(), false,
            )
                .ok()
                .unwrap();

            let collection_pack_detail = CollectionPackInfo {
                collection_address: collection, pack_address, amount_cards_in_pack,
            };

            self.is_collection.entry(collection).write(true);
            self.all_collections.append().write(collection);
            self.all_packs.append().write(pack_address);
            self.mapping_collection_info.entry((collection)).write(collection_pack_detail);
            self.mapping_pack_info.entry((pack_address)).write(collection_pack_detail);

            self
                .emit(
                    CollectionCreated {
                        owner: caller,
                        collection_address: collection,
                        pack_address,
                        amount_cards_in_pack,
                    },
                );

            self.reentrancyguard.end();
        }

        fn open_pack(ref self: ContractState, pack_address: ContractAddress, token_id: u256) {
            let caller = get_caller_address();
            let pack_details = self.get_pack(pack_address);
            let collection = pack_details.collection_address;

            self.assert_only_card_collection(collection);

            let pack_dispatcher = IERC721Dispatcher { contract_address: pack_address };
            let DEAD_ADDRESS: ContractAddress = contract_address_const::<
                0x000000000000000000000000000000000000000000000000000000000000dead,
            >();
            pack_dispatcher.transfer_from(caller, DEAD_ADDRESS, token_id); // burn

            self._mint_cards(collection, caller);

            self
                .emit(
                    PackOpened { caller, collection_address: collection, pack_address, token_id },
                );
        }

        fn update_collection(
            ref self: ContractState,
            collection: ContractAddress,
            pack_address: ContractAddress,
            amount_cards_in_pack: u32,
        ) {
            self.ownable.assert_only_owner();
            self.assert_only_card_collection(collection);

            let new_card_pack_details = CollectionPackInfo {
                collection_address: collection, pack_address, amount_cards_in_pack,
            };
            self.mapping_collection_info.entry((collection)).write(new_card_pack_details);
            self.mapping_pack_info.entry((pack_address)).write(new_card_pack_details);
            self
                .emit(
                    CollectionUpdated {
                        owner: self.ownable.owner(),
                        collection_address: collection,
                        pack_address,
                        amount_cards_in_pack,
                    },
                );
        }

        fn set_collection_class_hash(ref self: ContractState, new_class_hash: ClassHash) {
            self.ownable.assert_only_owner();
            self.collection_class_hash.write(new_class_hash);
        }

        fn set_cards_distribution(
            ref self: ContractState, collection: ContractAddress, cards: Array<CardsDistribution>,
        ) {
            self.ownable.assert_only_owner();
            self.assert_only_card_collection(collection);

            let storage_vec = self.mapping_collection_cards_distribution.entry((collection));

            for i in 0..cards.len() {
                let card = cards.at(i);
                storage_vec.append().write(card.clone());
            };

            self.emit(CardsDistributionSet { collection, total_cards: cards.len() })
        }

        fn update_cards_distribution(
            ref self: ContractState, collection: ContractAddress, cards: Array<CardsDistribution>,
        ) {
            self.ownable.assert_only_owner();
            self.assert_only_card_collection(collection);

            let storage_vec = self.mapping_collection_cards_distribution.entry((collection));
            let length: u32 = storage_vec.len().try_into().unwrap();

            for i in 0..cards.len() {
                let card = cards.at(i);
                let index: u64 = i.try_into().unwrap();
                if i < length {
                    storage_vec.at(index).write(card.clone());
                } else {
                    storage_vec.append().write(card.clone());
                }
            };

            if cards.len() < length {
                let excess_count = length - cards.len();
                let start_index = cards.len();

                for i in start_index..start_index + excess_count {
                    let index: u64 = i.try_into().unwrap();
                    storage_vec
                        .at(index)
                        .write(
                            CardsDistribution { token_id: 0, rarity_rate: u256 { low: 0, high: 0 } },
                        );
                }
            }

            self.emit(CardsDistributionSet { collection, total_cards: cards.len() })
        }

        fn get_collection(self: @ContractState, collection: ContractAddress) -> CollectionPackInfo {
            let phase_details = self.mapping_collection_info.entry((collection)).read();
            phase_details
        }

        fn get_pack(self: @ContractState, pack: ContractAddress) -> CollectionPackInfo {
            let phase_details = self.mapping_pack_info.entry((pack)).read();
            phase_details
        }

        fn get_collection_class_hash(self: @ContractState) -> ClassHash {
            self.collection_class_hash.read()
        }

        fn get_all_collection_addresses(self: @ContractState) -> Array<ContractAddress> {
            let mut collections = ArrayTrait::new();
            for i in 0..self.all_collections.len() {
                collections.append(self.all_collections.at(i).read());
            };
            collections
        }

        fn get_all_pack_addresses(self: @ContractState) -> Array<ContractAddress> {
            let mut packs = ArrayTrait::new();
            for i in 0..self.all_packs.len() {
                packs.append(self.all_packs.at(i).read());
            };
            packs
        }

        fn get_cards_distribution(
            self: @ContractState, collection: ContractAddress,
        ) -> Array<CardsDistribution> {
            let distributions = self.mapping_collection_cards_distribution.entry((collection));

            if distributions.len() == 0 {
                return ArrayTrait::<CardsDistribution>::new();
            }

            let mut card_distributions = ArrayTrait::new();
            for i in 0..distributions.len() {
                card_distributions.append(distributions.at(i).read());
            };
            card_distributions
        }
    }

    #[generate_trait]
    impl InternalFactoryImpl of InternalImplTrait {
        fn assert_only_card_collection(self: @ContractState, collection: ContractAddress) {
            let is_collection = self.is_collection.entry(collection).read();
            assert(is_collection, Errors::INVALID_COLLECTION);
        }

        fn _mint_cards(
            ref self: ContractState, collection_address: ContractAddress, minter: ContractAddress,
        ) {
            let phase_details = self.get_collection(collection_address);
            let amount_cards_in_pack = phase_details.amount_cards_in_pack;

            let card_dispatcher = contracts::CardCollection::ICardCollectionDispatcher {
                contract_address: collection_address,
            };
            let selected_cards = self
                ._select_random_cards(collection_address, amount_cards_in_pack);

            let mut token_ids_array = array![];
            let mut amounts_array = array![];

            for i in 0..selected_cards.len() {
                let token_id: u256 = selected_cards[i].token_id.clone();
                let amount: u256 = u256 { low: 1, high: 0 };

                token_ids_array.append(token_id);
                amounts_array.append(amount);

                card_dispatcher.mint(minter, token_id, amount);
            };
        }

        fn _select_random_cards(
            self: @ContractState, collection_address: ContractAddress, amount_cards_in_pack: u32,
        ) -> Array<CardsDistribution> {
            // 1. Retrieve the card distribution
            let distributions = self
                .mapping_collection_cards_distribution
                .entry(collection_address);
            if distributions.len() == 0 {
                // No cards in this collection, return an empty array
                return ArrayTrait::<CardsDistribution>::new();
            }

            // 2. Get all cards for this collection
            let all_cards = self.get_cards_distribution(collection_address);

            // 3. Calculate total_weight (sum of all card rates)
            let total_weight: u256 = self._calculate_total_weight(all_cards);

            // 4. Prepare an array to hold all the randomly selected cards
            let mut selected_cards = array![];
            let all_cards = self.get_cards_distribution(collection_address);

            // 5. Pick `amount_cards_in_pack` times
            for i in 0..amount_cards_in_pack {
                // 5a. Normalize random_u256 to [0, total_weight)
                let random_contract_address = self.random_oracleless_address.read();
                let random_contract_dispatcher =
                    contracts::CardCollectionFactory::IRandomDispatcher {
                    contract_address: random_contract_address,
                };
                let mut random_u256: u256 = random_contract_dispatcher.u256(i.into());
                let random_index: u256 = random_u256 % total_weight;

                // 5b. Find which card covers `random_index` in its cumulative range
                let mut cumulative_weight: u256 = 0;
                let len_u64: u64 = distributions.len();
                let len_u32: u32 = len_u64.try_into().unwrap();

                for j in 0..len_u32 {
                    let card = all_cards.at(j);
                    cumulative_weight += card.rarity_rate.clone();
                    if random_index < cumulative_weight {
                        selected_cards.append(card.clone());
                        break;
                    }
                };
            };

            // 6. Return all selected cards
            selected_cards
        }

        fn _calculate_total_weight(
            self: @ContractState, all_cards: Array<CardsDistribution>,
        ) -> u256 {
            let mut total_weight: u256 = 0;
            let mut i = 0;
            let len = all_cards.len();
            while i < len {
                let card = all_cards.at(i);
                total_weight = total_weight + *card.rarity_rate;
                i += 1;
            };
            total_weight
        }
    }

    //
    // Upgradeable
    //

    #[abi(embed_v0)]
    impl UpgradeableImpl of IUpgradeable<ContractState> {
        fn upgrade(ref self: ContractState, new_class_hash: ClassHash) {
            self.ownable.assert_only_owner();
            self.upgradeable.upgrade(new_class_hash);
        }
    }
}

