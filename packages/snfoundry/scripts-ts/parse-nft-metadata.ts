import * as fs from 'fs';
import { parse } from 'csv-parse/sync'; // Make sure csv-parse v5+ is installed

// Path to your CSV file
const CSV_FILE = '/Users/0xandee/Documents/Github/scaffold-stark-2-atemu/packages/snfoundry/scripts-ts/data/atemu-card-collection-data.csv';

// Read the entire CSV file into a string
const csvData = fs.readFileSync(CSV_FILE, 'utf-8');

// Parse the CSV data
// By default, "columns: true" will use the header row as property keys
const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
});

// For each row in CSV, create a corresponding metadata JSON
records.forEach((row: any) => {
    // Pull out relevant fields. The exact column keys depend on your header.
    const tokenId = row['hidden: token_id'];
    const name = row['name'];
    const description = row['description'];
    const image = row['image'];

    // Pull out attribute columns
    // Note: We trim() these in case the CSV has extra spaces.
    const rarity = row['attributes: Rarity']?.trim();
    const classAttr = row['attributes: Class']?.trim();
    const category = row['attributes: Category']?.trim();
    const element = row['attributes: Element']?.trim();

    // Convert numeric attributes to numbers
    const attack = Number(row['attributes: Attack']);
    const defense = Number(row['attributes: Defense']);
    const manaCost = Number(row['attributes: Mana Cost']);

    // Build the attributes array
    const attributes = [
        {
            display_type: 'string',
            trait_type: 'Rarity',
            value: rarity,
        },
        {
            display_type: 'string',
            trait_type: 'Class',
            value: classAttr,
        },
        {
            display_type: 'string',
            trait_type: 'Category',
            value: category,
        },
        {
            display_type: 'string',
            trait_type: 'Element',
            value: element,
        },
        {
            display_type: 'number',
            trait_type: 'Attack',
            value: attack,
        },
        {
            display_type: 'number',
            trait_type: 'Defense',
            value: defense,
        },
        {
            display_type: 'number',
            trait_type: 'Mana Cost',
            value: manaCost,
        },
    ];

    // Construct final metadata object
    const metadata = {
        description,
        image,
        name,
        attributes,
    };

    // Write to a JSON file named {tokenId}.json
    const fileName = `${tokenId}`;
    fs.writeFileSync(fileName, JSON.stringify(metadata, null, 2), 'utf-8');
    console.log(`Created: ${fileName}`);
});

// base_uri = ipfs://QmWwZvTdBR9T1rfBuAdfRnCkrd93BnQRbfF2QqX8xUtb1Z/