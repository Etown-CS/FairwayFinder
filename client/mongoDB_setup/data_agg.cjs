const fs = require('fs');
const path = require('path');

// Define specific product type mappings for each file
const productTypeMapping = {
    "balls/all/output.txt": "Balls",
    "balls/personalized/output.txt": "Personalized Balls",
    "clubs/drivers/output.txt": "Driver",
    "clubs/fairway-woods/output.txt": "Fairway Wood",
    "clubs/hybrids/output.txt": "Hybrid",
    "clubs/irons/output.txt": "Iron",
    "clubs/putters/output.txt": "Putter",
    "clubs/wedges/output.txt": "Wedge",
    "gloves/left/men/output.txt": "Men's Left Hand Glove",
    "gloves/left/women/output.txt": "Women's Left Hand Glove",
    "gloves/right/men/output.txt": "Men's Right Hand Glove",
    "gloves/right/women/output.txt": "Women's Right Hand Glove",
    "gloves/other/men/output.txt": "Men's Glove",
    "gloves/other/women/output.txt": "Women's Glove"
};

// Function to add missing product type only to the "Website" field
function addProductTypeToWebsite(data, productType) {
    return data.replace(/(Website):\s*<b>(.*?)<\/b>/g, (match, fieldName, currentValue) => {
        if (!currentValue.toLowerCase().includes(productType.toLowerCase())) {
            return `${fieldName}: <b>${currentValue} ${productType}</b>`; // Append product type only to Website field
        }
        return match;
    });
}

// List of file paths (relative to web_scrapping/scrape-and-ag/data-ag/)
const filePaths = Object.keys(productTypeMapping);

// Base directory for input files
const baseDir = path.join(__dirname, '..', '..', 'web_scrapping', 'scrape-and-ag', 'data-ag');

// Read, modify, and process files dynamically
let allModifiedData = filePaths.map(relativePath => {
    const fullPath = path.join(baseDir, relativePath);
    if (!fs.existsSync(fullPath)) {
        console.warn(`⚠️ Warning: File not found - ${relativePath}`);
        return ""; // Skip missing files
    }
    
    const data = fs.readFileSync(fullPath, 'utf8');
    const productType = productTypeMapping[relativePath] || "Unknown"; // Default if missing
    return addProductTypeToWebsite(data, productType);
}).filter(Boolean).join('\n\n'); // Remove empty entries and join with spacing

// Path to the output file "all_deals.txt"
const outputFilePath = path.join(__dirname, 'all_deals.txt');

// Write the combined modified data
fs.writeFileSync(outputFilePath, allModifiedData, 'utf8');

console.log("✅ All data has been written to 'all_deals.txt' with specific product types added only to Website fields.");
