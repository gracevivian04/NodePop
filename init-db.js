const readline = require('readline');

// load model ads 
const Advert = require('./src/models/ads');

// import JSON file
const jsonFile = require('./adverts.json');

async function main() {
  // ask security question to user 
  const continueToDelete = await confirmContinuation('Are you sure you want to delete the database?');
  if(!continueToDelete) {
    process.exit();
  }

  // connect to the database 
  const connectToDB = require('./lib/connectMongoose');

  // start ad collection 
  await initAdvert();

  // disconnect database 
  connectToDB.close();
}

main().catch(error => console.log("There's been an error", error));

async function initAdvert() {
  // delete all the listings from the ad collection 
  const result = await Advert.deleteMany();
  console.log(`${result.deletedCount} ads deleted.`)

  // create initial ads
  const initialAds = await Advert.insertMany(jsonFile.adverts);
  console.log(`${initialAds.length} ads created.`)
}

function confirmContinuation(text) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interface.question(text, response => {
      interface.close();
      if(response.toLowerCase() === 'yes') {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}