const fs = require('fs');
const path = require('path');

const websiteUrls = {
    "tgw.com.drivers": "https://www.tgw.com/golf-clubs/golf-drivers",
    "rockbottomgolf.com.drivers": "https://www.rockbottomgolf.com/golf-clubs/drivers",
    "globalgolf.com.drivers": "https://www.globalgolf.com/golf-clubs/driver",
    "pgatoursuperstore.com.drivers": "https://www.pgatoursuperstore.com/golf-clubs/drivers",
    "golfdiscount.com.drivers": "https://www.golfdiscount.com/golf-clubs/drivers?resultsPerPage=24",
    "carlsgolfland.com.drivers": "https://www.carlsgolfland.com/golf-clubs/drivers",
    "dickssportinggoods.com.drivers": "https://www.dickssportinggoods.com/f/golf-drivers",

    "tgw.com.fairway-woods": "https://www.tgw.com/golf-clubs/fairway-woods",
    "rockbottomgolf.com.fairway-woods": "https://www.rockbottomgolf.com/golf-clubs/fairway-woods",
    "globalgolf.com.fairway-woods": "https://www.globalgolf.com/golf-clubs/fairway-wood",
    "pgatoursuperstore.com.fairway-woods": "https://www.pgatoursuperstore.com/golf-clubs/fairway-metals",
    "golfdiscount.com.fairway-woods": "https://www.golfdiscount.com/golf-clubs/fairway-woods?resultsPerPage=24",
    "carlsgolfland.com.fairway-woods": "https://www.carlsgolfland.com/golf-clubs/fairway-woods",
    "dickssportinggoods.com.fairway-woods": "https://www.dickssportinggoods.com/f/fairway-woods",

    "tgw.com.hybrids": "https://www.tgw.com/golf-clubs/hybrid-golf-clubs",
    "rockbottomgolf.com.hybrids": "https://www.rockbottomgolf.com/golf-clubs/hybrids",
    "globalgolf.com.hybrids": "https://www.globalgolf.com/golf-clubs/hybrid",
    "pgatoursuperstore.com.hybrids": "https://www.pgatoursuperstore.com/golf-clubs/hybrids",
    "golfdiscount.com.hybrids": "https://www.golfdiscount.com/golf-clubs/hybrids?resultsPerPage=24",
    "carlsgolfland.com.hybrids": "https://www.carlsgolfland.com/golf-clubs/hybrids",
    "dickssportinggoods.com.hybrids": "https://www.dickssportinggoods.com/f/hybrid-golf-clubs",

    "tgw.com.irons": "https://www.tgw.com/golf-clubs/golf-irons",
    "rockbottomgolf.com.irons": "https://rockbottomgolf.com/golf-clubs/iron-sets",
    "globalgolf.com.irons": "https://www.globalgolf.com/golf-clubs/iron-set",
    "pgatoursuperstore.com.irons": "https://www.pgatoursuperstore.com/golf-clubs/irons-sets",
    "golfdiscount.com.irons": "https://www.golfdiscount.com/golf-clubs/irons?resultsPerPage=24",
    "carlsgolfland.com.irons": "https://www.carlsgolfland.com/golf-clubs/iron-sets",
    "dickssportinggoods.com.irons": "https://www.dickssportinggoods.com/f/golf-irons-sets",

    "tgw.com.putters": "https://www.tgw.com/golf-clubs/putters",
    "rockbottomgolf.com.putters": "https://www.rockbottomgolf.com/golf-clubs/putters",
    "globalgolf.com.putters": "https://www.globalgolf.com/golf-clubs/putter",
    "pgatoursuperstore.com.putters": "https://www.pgatoursuperstore.com/golf-clubs/putters",
    "golfdiscount.com.putters": "https://www.golfdiscount.com/golf-clubs/putters?resultsPerPage=24",
    "carlsgolfland.com.putters": "https://www.carlsgolfland.com/golf-clubs/putters",
    "dickssportinggoods.com.putters": "https://www.dickssportinggoods.com/f/putters",

    "tgw.com.wedges": "https://www.tgw.com/golf-clubs/golf-wedges",
    "rockbottomgolf.com.wedges": "https://www.rockbottomgolf.com/golf-clubs/wedges",
    "globalgolf.com.wedges": "https://www.globalgolf.com/golf-clubs/wedge",
    "pgatoursuperstore.com.wedges": "https://www.pgatoursuperstore.com/golf-clubs/wedges",
    "golfdiscount.com.wedges": "https://www.golfdiscount.com/golf-clubs/wedges?resultsPerPage=24",
    "carlsgolfland.com.wedges": "https://www.carlsgolfland.com/golf-clubs/wedges",
    "dickssportinggoods.com.wedges": "https://www.dickssportinggoods.com/f/golf-wedges",

    "tgw.com.balls/personalized": "https://www.tgw.com/golf-balls/personalized-golf-balls",
    "rockbottomgolf.com.balls/personalized": "https://www.rockbottomgolf.com/balls/custom-logo-balls",
    "globalgolf.com.balls/personalized": "https://www.globalgolf.com/golf-balls/personalized",
    "pgatoursuperstore.com.balls/personalized": "https://www.pgatoursuperstore.com/golf-balls/personalized",
    "golfdiscount.com.balls/personalized": "https://www.golfdiscount.com/golf-balls/balls/personalized?resultsPerPage=24",
    "carlsgolfland.com.balls/personalized": "https://www.carlsgolfland.com/golf-balls/personalized-golf-balls",
    "dickssportinggoods.com.balls/personalized": "https://www.dickssportinggoods.com/f/golf-balls?filterFacets=4973%253APersonalized",

    "tgw.com.balls/all": "https://www.tgw.com/golf-balls/top-golf-balls",
    "rockbottomgolf.com.balls/all": "https://www.rockbottomgolf.com/balls/new-golf-balls",
    "globalgolf.com.balls/all": "https://www.globalgolf.com/golf-balls",
    "pgatoursuperstore.com.balls/all": "https://www.pgatoursuperstore.com/golf-balls",
    "golfdiscount.com.balls/all": "https://www.golfdiscount.com/golf-balls?resultsPerPage=24",
    "carlsgolfland.com.balls/all": "https://www.carlsgolfland.com/golf-balls",
    "dickssportinggoods.com.balls/all": "https://www.dickssportinggoods.com/f/golf-balls",

    "globalgolf.com.gloves.left.men": "https://www.globalgolf.com/search/?ply=1&term=left+handed+golf+gloves",
    "carlsgolfland.com.gloves.left.men": "https://www.carlsgolfland.com/search/go?ts=custom&w=left+handed+golf+gloves#/perpage:90/filter:gender_filter:Mens",
    "globalgolf.com.gloves.left.women": "https://www.globalgolf.com/search/?ply=1&term=left+handed+golf+gloves",
    "carlsgolfland.com.gloves.left.women": "https://www.carlsgolfland.com/search/go?ts=custom&w=left+handed+golf+gloves#/perpage:90/filter:gender_filter:Womens",

    "globalgolf.com.gloves.right.men": "https://www.globalgolf.com/search/?ply=1&term=right+handed+golf+gloves",
    "carlsgolfland.com.gloves.right.men": "https://www.carlsgolfland.com/search/go?ts=custom&w=right+handed+golf+gloves#/perpage:90/filter:gender_filter:Mens",
    "globalgolf.com.gloves.right.women": "https://www.globalgolf.com/search/?ply=1&term=right+handed+golf+gloves",
    "carlsgolfland.com.gloves.right.women": "https://www.carlsgolfland.com/search/go?ts=custom&w=right+handed+golf+gloves#/perpage:90/filter:gender_filter:Womens",

    "globalgolf.com.gloves.other.men": "https://www.globalgolf.com/search/?ply=1&term=golf+gloves",
    "carlsgolfland.com.gloves.other.men": "https://www.carlsgolfland.com/search/go?ts=custom&w=golf+gloves#/perpage:90/filter:gender_filter:Mens",
    "globalgolf.com.gloves.other.women": "https://www.globalgolf.com/search/?ply=1&term=golf+gloves",
    "carlsgolfland.com.gloves.other.women": "https://www.carlsgolfland.com/search/go?ts=custom&w=golf+gloves#/perpage:90/filter:gender_filter:Womens"
};

function updateWebsiteUrls(content) {
    // Regular expression to match the website names in the content
    const websiteRegex = /Website: <b>(.*?)<\/b>/g;
    let updatedContent = content;

    // Replace each website name with the correct URL from the JSON mapping
    updatedContent = updatedContent.replace(websiteRegex, (match, websiteName) => {
        // Normalize the website name by removing product terms, apostrophes, and spaces

        console.log(`Website Name Before Normalization: "${websiteName}"`);

        let cleanWebsiteName = websiteName
            .replace(/( Hybrid| Driver| Iron| Wedge| Putter| Balls| Fairway Wood | Glove)/, "")  // Remove product terms
            .replace(/'/g, "")  // Remove apostrophes
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "");  // Remove extra spaces

        cleanWebsiteName = cleanWebsiteName.replace(/-/g, ""); // Replace hyphen with an empty string

        // Debugging: Log the normalized website name
        console.log(`Normalized Website Name: "${cleanWebsiteName}"`);

        // Determine product type (e.g., hybrids, drivers, etc.) from the website name
        let productType = websiteName.toLowerCase().match(/(hybrid|driver|irons|putter|wedge|fairway-woods|balls|glove|fairwaywood)/);

        // If a product type exists, use it to check the category in the URL
        if (productType) {
            productType = productType[0];
        } else {
            productType = ""; // Default to no specific category
        }

        // Debugging: Log the detected product type
        console.log(`Detected Product Type: "${productType}"`);

        // Iterate through the URLs and check if the normalized website name exists in any URL path
        let foundUrl = null;
        for (let key in websiteUrls) {
            // Convert both key and value to lowercase for a case-insensitive comparison
            const url = websiteUrls[key].toLowerCase();

            // Debugging: Show the current URL being checked
            console.log(`Checking URL: "${url}" against normalized website name: "${cleanWebsiteName}" and Product Type: "${productType}"`);

            // Adjust the key based on the product type (hybrid, driver, etc.)
            if (key.includes(cleanWebsiteName) && key.includes(productType)) {
                foundUrl = websiteUrls[key];
                break;
            }
        }

        // Debugging: If no URL was found
        if (!foundUrl) {
            console.log(`No URL found for website name: "${websiteName}"`);
        }

        // If a matching URL is found, replace the website name with the full URL
        if (foundUrl) {
            console.log(`Found URL: ${foundUrl}`);
            return `Website: <b>${websiteName}: ${foundUrl}</b>`;
        } else {
            return match; // If no URL is found, return the match as is
        }
    });

    return updatedContent;
}

// Example input content
const allDealsPath = "all_deals.txt"
const alldeals_data = fs.readFileSync(allDealsPath, 'utf8');

const inputContent = alldeals_data;

// Run the function to update the content
const updatedContent = updateWebsiteUrls(inputContent);

// Output the updated content
const outputFilePath = path.join(__dirname, 'deals_with_websites.txt');
fs.writeFileSync(outputFilePath, updatedContent, 'utf8');

