# NodePop
WEB-API project to develop an API that will run on a server of a second-hand goods sale service called Nodepop. The idea is that this API would be
used by other iOS or Android developers. The service maintains advertisements for buying or selling items and allows you to search as you put
filters by various criteria. 

Each advert has the following data:
- Item name, an ad will always have only one item.
-  Whether the item is for sale or wanted.
- Price. This will be the price of the item if it is an offer for sale. In the case of
if it is a 'wanted' advert it will be the price the applicant would be willing to pay.
-  Photo of the item. Each advert will have only one photo.
- Advert tags. It may contain one or more of four tags: work, lifestyle, motor, and mobile.

### **To deploy**
`npm install` 

### **To load initial data to database**
`npm run init-db`

### **To start application in production**
`npm start`

### **To start application in development**
`npm run dev` 

# API documentation 
### Ad listings: 
GET /api/adverts 
` {
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
    }`

### Filter examples: 



