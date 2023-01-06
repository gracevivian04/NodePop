const { connection } = require('mongoose');
const readline = require('readline');

// load model ads 
const Advert = require('./src/models/ads');

async function main() {
  // ask security question to user 
  const continueToDelete = await yesNoQ('Are you sure you want to delete the database?')
  if(!continueToDelete) {
    process.exit();
  }

  /* / connect to the database 
  const connectToDB = require -- need to complete */

  // start ad collection 
  await initAdvert();

  // disconnect database 
  connection.close();
}

main().catch(error => console.log("There's been an error", error));

async function initAdvert() {
  // delete all the listings from the ad collection 
  const result = await Advert.deleteMany();
  console.log(`${result.deletedCount} ads deleted.`)

  // create initial ads
  const initialAds = await Advert.insertMany([
    {
      "name": "Bicycle",
      "sale": true,
      "price": 230.15,
      "photo": "bici.png",
      "tags": ["lifestyle", "motor"]
    },
    {
      "name": "iPhone 11",
      "sale": false,
      "price": 50.00,
      "photo": "iphone.png",
      "tags": ["lifestyle", "mobile"]
    }
  ]);
  console.log(`${inserted.length} ads created.`)
}

function yesNoQ(text) {
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
    })
  })
}