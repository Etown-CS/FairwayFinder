const fs = require('fs');
const path = require('path');

// Hardcoded mapping of website + product type -> URL ID
const websiteMapping = {
    "tgw driver": 1,
    "rockbottomgolf driver": 2,
    "globalgolf driver": 3,
    "pgatoursuperstore driver": 4,
    "golfdiscount driver": 5,
    "carls golfland driver": 6,
    "dickssportinggoods driver": 7,
    "tgw fairway wood": 8,
    "rockbottomgolf fairway wood": 9,
    "globalgolf fairway wood": 10,
    "pgatoursuperstore fairway wood": 11,
    "golfdiscount fairway wood": 12,
    "carls golfland fairway wood": 13,
    "dickssportinggoods fairway wood": 14,
    "tgw hybrid": 15,
    "rockbottomgolf hybrid": 16,
    "globalgolf hybrid": 17,
    "pgatoursuperstore hybrid": 18,
    "golfdiscount hybrid": 19,
    "carls golfland hybrid": 20,
    "dickssportinggoods hybrid": 21,
    "tgw iron": 22,
    "rockbottomgolf iron": 23,
    "globalgolf iron": 24,
    "pgatoursuperstore iron": 25,
    "golfdiscount iron": 26,
    "carls golfland iron": 27,
    "dickssportinggoods iron": 28,
    "tgw putter": 29,
    "rockbottomgolf putter": 30,
    "globalgolf putter": 31,
    "pgatoursuperstore putter": 32,
    "golfdiscount putter": 33,
    "carls golfland putter": 34,
    "dickssportinggoods putter": 35,
    "tgw wedge": 36,
    "rockbottomgolf wedge": 37,
    "globalgolf wedge": 38,
    "pgatoursuperstore wedge": 39,
    "golfdiscount wedge": 40,
    "carls golfland wedge": 41,
    "dickssportinggoods wedge": 42,
    "tgw personalized balls": 43,
    "rockbottomgolf personalized balls": 44,
    "globalgolf personalized balls": 45,
    "pgatoursuperstore personalized balls": 46,
    "golfdiscount personalized balls": 47,
    "carls golfland personalized balls": 48,
    "dickssportinggoods personalized balls": 49,
    "tgw balls": 50,
    "rockbottomgolf balls": 51,
    "globalgolf balls": 52,
    "pgatoursuperstore balls": 53,
    "golfdiscount balls": 54,
    "carls golfland balls": 55,
    "dickssportinggoods balls": 56,
    "tgw mens left hand glove": 57,
    "rockbottomgolf mens left hand glove": 58,
    "pgatoursuperstore mens left hand glove": 59,
    "golfdiscount mens left hand glove": 60,
    "carls golfland mens left hand glove": 61,
    "dickssportinggoods mens left hand glove": 62,
    "tgw womens left hand glove": 63,
    "rockbottomgolf womens left hand glove": 64,
    "pgatoursuperstore womens left hand glove": 65,
    "golfdiscount womens left hand glove": 66,
    "dickssportinggoods womens left hand glove": 67,
    "tgw mens right hand glove": 68,
    "rockbottomgolf mens right hand glove": 69,
    "pgatoursuperstore mens right hand glove": 70,
    "golfdiscount mens right hand glove": 71,
    "dickssportinggoods mens right hand glove": 72,
    "tgw womens right hand glove": 73,
    "rockbottomgolf womens right hand glove": 74,
    "pgatoursuperstore womens right hand glove": 75,
    "golfdiscount womens right hand glove": 76,
    "dickssportinggoods womens right hand glove": 77,
    "globalgolf mens glove": 78,
    "carls golfland womens glove": 79
};

// Numbered URLs based on the mapping
const urlMapping = {
    1: 'https://www.tgw.com/golf-clubs/golf-drivers',
    2: 'https://www.rockbottomgolf.com/golf-clubs/drivers',
    3: 'https://www.globalgolf.com/golf-clubs/driver',
    4: 'https://www.pgatoursuperstore.com/golf-clubs/drivers',
    5: 'https://www.golfdiscount.com/golf-clubs/drivers?resultsPerPage=24',
    6: 'https://www.carlsgolfland.com/golf-clubs/drivers',
    7: 'https://www.dickssportinggoods.com/f/golf-drivers',
    8: 'https://www.tgw.com/golf-clubs/fairway-woods',
    9: 'https://www.rockbottomgolf.com/golf-clubs/fairway-woods',
    10: 'https://www.globalgolf.com/golf-clubs/fairway-wood',
    11: 'https://www.pgatoursuperstore.com/golf-clubs/fairway-metals',
    12: 'https://www.golfdiscount.com/golf-clubs/fairway-woods?resultsPerPage=24',
    13: 'https://www.carlsgolfland.com/golf-clubs/fairway-woods',
    14: 'https://www.dickssportinggoods.com/f/fairway-woods',
    15: 'https://www.tgw.com/golf-clubs/hybrid-golf-clubs',
    16: 'https://www.rockbottomgolf.com/golf-clubs/hybrids',
    17: 'https://www.globalgolf.com/golf-clubs/hybrid',
    18: 'https://www.pgatoursuperstore.com/golf-clubs/hybrids',
    19: 'https://www.golfdiscount.com/golf-clubs/hybrids?resultsPerPage=24',
    20: 'https://www.carlsgolfland.com/golf-clubs/hybrids',
    21: 'https://www.dickssportinggoods.com/f/hybrid-golf-clubs',
    22: 'https://www.tgw.com/golf-clubs/golf-irons',
    23: 'https://www.rockbottomgolf.com/golf-clubs/iron-sets',
    24: 'https://www.globalgolf.com/golf-clubs/iron-set',
    25: 'https://www.pgatoursuperstore.com/golf-clubs/irons-sets',
    26: 'https://www.golfdiscount.com/golf-clubs/irons?resultsPerPage=24',
    27: 'https://www.carlsgolfland.com/golf-clubs/iron-sets',
    28: 'https://www.dickssportinggoods.com/f/golf-irons-sets',
    29: 'https://www.tgw.com/golf-clubs/putters',
    30: 'https://www.rockbottomgolf.com/golf-clubs/putters',
    31: 'https://www.globalgolf.com/golf-clubs/putter',
    32: 'https://www.pgatoursuperstore.com/golf-clubs/putters',
    33: 'https://www.golfdiscount.com/golf-clubs/putters?resultsPerPage=24',
    34: 'https://www.carlsgolfland.com/golf-clubs/putters',
    35: 'https://www.dickssportinggoods.com/f/putters',
    36: 'https://www.tgw.com/golf-clubs/golf-wedges',
    37: 'https://www.rockbottomgolf.com/golf-clubs/wedges',
    38: 'https://www.globalgolf.com/golf-clubs/wedge',
    39: 'https://www.pgatoursuperstore.com/golf-clubs/wedges',
    40: 'https://www.golfdiscount.com/golf-clubs/wedges?resultsPerPage=24',
    41: 'https://www.carlsgolfland.com/golf-clubs/wedges',
    42: 'https://www.dickssportinggoods.com/f/golf-wedges',
    43: 'https://www.tgw.com/golf-balls/personalized-golf-balls',
    44: 'https://www.rockbottomgolf.com/balls/custom-logo-balls',
    45: 'https://www.globalgolf.com/golf-balls/personalized',
    46: 'https://www.pgatoursuperstore.com/golf-balls/personalized',
    47: 'https://www.golfdiscount.com/golf-balls/balls/personalized?resultsPerPage=24',
    48: 'https://www.carlsgolfland.com/golf-balls/personalized-golf-balls',
    49: 'https://www.dickssportinggoods.com/f/golf-balls?filterFacets=4973%253APersonalized',
    50: 'https://www.tgw.com/golf-balls/top-golf-balls',
    51: 'https://www.rockbottomgolf.com/balls/new-golf-balls',
    52: 'https://www.globalgolf.com/golf-balls',
    53: 'https://www.pgatoursuperstore.com/golf-balls',
    54: 'https://www.golfdiscount.com/golf-balls?resultsPerPage=24',
    55: 'https://www.carlsgolfland.com/golf-balls',
    56: 'https://www.dickssportinggoods.com/f/golf-balls',
    57: 'https://www.tgw.com/accessories/golf-gloves#facet:-77411240122833343737710111039115,-774112401228336683576101102116&productBeginIndex:0&orderBy:5&pageView:grid&minPrice:&maxPrice:&pageSize:&',  
    58: 'https://www.rockbottomgolf.com/accessories/gloves/#?profile_id=9a60e9bcfd4c1a789dfe41a2ec4ffd11&session_id=468725c2-d939-11ef-b74b-0242ac110003&Searchcat1=Gloves&Gender=Mens&Dexteritysearch=&search_return=all&Dexterity=Left',  
    59: 'https://www.pgatoursuperstore.com/search?q=mens+gloves&pmin=0.01&prefn1=STK_DEXTERITY&prefv1=Left+Hand&prefn2=gender&prefv2=Men%27s&prefn3=merchantCategory&prefv3=Golf+Gloves&srule=Best+Sellers',  
    60: 'https://www.golfdiscount.com/catalogsearch/result/?q=gloves&filter.hand=Left%20Hand&filter.gender=Men%27s&resultsPerPage=36',  
    61: 'https://www.carlsgolfland.com/search/go?ts=custom&w=gloves#/perpage:90/filter:gender_filter:Mens/filter:golf_club_hand:Left',  
    62: 'https://www.dickssportinggoods.com/search/SearchDisplay?searchTerm=gloves%20golf&storeId=15108&catalogId=12301&langId=-1&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&fromPage=Search&searchSource=Q&pageView=&beginIndex=0&DSGsearchType=Keyword&pageSize=96&selectedStore=260&filterFacets=3945%253ALeft%2520Hand%253B5495%253AMen%27s&pageNumber=0',  
    63: 'https://www.tgw.com/accessories/golf-gloves#facet:-77411240122833343738711110910111039115,-774112401228336683576101102116&productBeginIndex:0&orderBy:5&pageView:grid&minPrice:&maxPrice:&pageSize:&',  
    64: 'https://www.rockbottomgolf.com/accessories/gloves/#?profile_id=9a60e9bcfd4c1a789dfe41a2ec4ffd11&session_id=468725c2-d939-11ef-b74b-0242ac110003&Gender=Ladies&Dexteritysearch=&Searchcat1=Gloves&search_return=all&Dexterity=Left',  
    65: 'https://www.pgatoursuperstore.com/search?q=gloves+women&pmin=0.01&prefn1=STK_DEXTERITY&prefv1=Left+Hand&prefn2=gender&prefv2=Women%27s&prefn3=merchantCategory&prefv3=Golf+Gloves&srule=Best+Sellers',  
    66: 'https://www.golfdiscount.com/catalogsearch/result/?q=gloves&resultsPerPage=36&filter.hand=Left%20Hand&filter.gender=Women%27s',  
    67: 'https://www.dickssportinggoods.com/search/SearchDisplay?searchTerm=gloves%20golf&storeId=15108&catalogId=12301&langId=-1&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&fromPage=Search&searchSource=Q&pageView=&beginIndex=0&DSGsearchType=Keyword&pageSize=96&selectedStore=260&filterFacets=3945%253ALeft%2520Hand%253B5495%253AWomen%27s',  
    68: 'https://www.tgw.com/accessories/golf-gloves#facet:-77411240122833343737710111039115,-774112401228336683582105103104116&productBeginIndex:0&orderBy:5&pageView:grid&minPrice:&maxPrice:&pageSize:&',  
    69: 'https://www.rockbottomgolf.com/accessories/gloves/#?profile_id=9a60e9bcfd4c1a789dfe41a2ec4ffd11&session_id=468725c2-d939-11ef-b74b-0242ac110003&Gender=Mens&Dexteritysearch=&Searchcat1=Gloves&Dexterity=Right&search_return=all',  
    70: 'https://www.pgatoursuperstore.com/search?q=gloves&pmin=0.01&prefn1=STK_DEXTERITY&prefv1=Right+Hand&prefn2=gender&prefv2=Men%27s&srule=Best+Sellers',  
    71: 'https://www.golfdiscount.com/catalogsearch/result/?q=gloves&resultsPerPage=36&filter.hand=Right%20Hand&filter.gender=Men%27s',  
    72: 'https://www.dickssportinggoods.com/search/SearchDisplay?searchTerm=gloves%20golf&storeId=15108&catalogId=12301&langId=-1&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&fromPage=Search&searchSource=Q&pageView=&beginIndex=0&DSGsearchType=Keyword&pageSize=96&selectedStore=260&filterFacets=3945%253ARight%2520Hand%253B5495%253AMen%27s',  
    73: 'https://www.tgw.com/accessories/golf-gloves#facet:-77411240122833343738711110910111039115,-774112401228336683582105103104116&productBeginIndex:0&orderBy:5&pageView:grid&minPrice:&maxPrice:&pageSize:&',  
    74: 'https://www.rockbottomgolf.com/accessories/gloves/#?profile_id=9a60e9bcfd4c1a789dfe41a2ec4ffd11&session_id=468725c2-d939-11ef-b74b-0242ac110003&Gender=Ladies&Dexteritysearch=&Searchcat1=Gloves&Dexterity=Right&search_return=all',  
    75: 'https://www.pgatoursuperstore.com/search?q=gloves&pmin=0.01&prefn1=STK_DEXTERITY&prefv1=Right+Hand&prefn2=gender&prefv2=Women%27s&srule=Best+Sellers',  
    76: 'https://www.golfdiscount.com/catalogsearch/result/?q=gloves&resultsPerPage=36&filter.gender=Women%27s&filter.hand=Right%20Hand',  
    77: 'https://www.dickssportinggoods.com/search/SearchDisplay?searchTerm=gloves%20golf&storeId=15108&catalogId=12301&langId=-1&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&fromPage=Search&searchSource=Q&pageView=&beginIndex=0&DSGsearchType=Keyword&pageSize=96&selectedStore=260&filterFacets=3945%253ARight%2520Hand%253B5382%253AGolf%2520Gloves%253B5495%253AWomen%27s',  
    78: 'https://www.globalgolf.com/search/?ply=1&term=gloves',  
    79: 'https://www.carlsgolfland.com/search/go?ts=custom&w=gloves#/perpage:90/filter:gender_filter:Womens'  
};


// Function to normalize extracted website names
function normalizeWebsiteName(websiteName) {
    return websiteName
        .toLowerCase()
        .trim()
        .replace(/'/g, "") // Remove apostrophes
        .replace(/\.com/g, "") // Remove ".com"
        .replace(/pga tour superstore/, "pgatoursuperstore") // Standardize PGA TOUR Superstore
        .replace(/rock bottom golf/, "rockbottomgolf") // Standardize Rock Bottom Golf
        .replace(/carl's golfland/, "carlsgolfland") // Standardize Carl's Golfland
        .replace(/golfdiscount/, "golfdiscount") // Ensure "GolfDiscount" is not altered
        .replace(/globalgolf/, "globalgolf") // Ensure "GlobalGolf" is not altered
        .replace(/\s+/g, " ") // Collapse extra spaces
        .trim();
}

// Function to update website URLs in the content
function updateWebsiteUrls(content) {
    const websiteRegex = /Website: <b>(.*?)<\/b>/g;

    let updatedContent = content.replace(websiteRegex, (match, websiteName) => {
        console.log(`Extracted Website Name: "${websiteName}"`);

        let cleanWebsiteName = normalizeWebsiteName(websiteName);
        console.log(`Normalized Website Name: "${cleanWebsiteName}"`);

        let foundUrlId = websiteMapping[cleanWebsiteName];

        if (foundUrlId && urlMapping[foundUrlId]) {
            let foundUrl = urlMapping[foundUrlId];
            let updatedWebsiteField = `Website: <b>${websiteName}: ${foundUrl}</b>`;
            
            console.log(`Updated Field: ${updatedWebsiteField}`); // Log the new website field

            return updatedWebsiteField;
        } else {
            console.log(`No URL found for: "${cleanWebsiteName}"`);
            return match;
        }
    });

    return updatedContent;
}

// Read input data
const allDealsPath = "all_deals.txt";
const outputFilePath = path.join(__dirname, "deals_with_websites.txt");

// Read the all_deals.txt file
let allDealsData = fs.readFileSync(allDealsPath, "utf8");

// Remove any extra newline space between the last "Brand" entry and "Website" field
let cleanedContent = allDealsData.replace(/\n+\s*(Website:)/g, "\n$1");

// Update website URLs in the cleaned content
const updatedContent = updateWebsiteUrls(cleanedContent);

// Save updated content to deals_with_websites.txt
fs.writeFileSync(outputFilePath, updatedContent, "utf8");

console.log("Updated deals_with_websites.txt successfully!");


