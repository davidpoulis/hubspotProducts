// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Your Google Cloud Platform project ID
const projectId = 'earlbreakfast1';

// Instantiates a client
const pubsubClient = new PubSub({
  projectId: projectId,
  keyFilename: '/home/david/Downloads/earlbreakfast1-120ba71d6d13.json'
});

// The name for the new topic
const topicName = 'orderBreakfast';


  var data =  [
    {
        "prices": {
            "price": 5.5,
            "currency": "AED"
        },
        "measurement": {},
        "nutrition": {
            "calories": "232",
            "fat": "15g",
            "salt": "1",
            "saturated": "3g",
            "polyunsaturated": "0"
        },
        "productImages": [
            {
                "filename": "https://firebasestorage.googleapis.com/v0/b/earlybreakfast-developme-ce1bc.appspot.com/o/catalogv1.1%2FcheeseCroissant.png?alt=media&token=11b21b15-17f5-4da2-af57-1960bf245e66",
                "type": "mobile"
            }
        ],
        "name": "Cheese Croissant",
        "description": "Cheese Croissant",
        "active": true,
        "productId": "cheeseCroissant",
        "catalogId": "EMIRATES",
        "categoryId": "croissantCategory",
        "familyId": "westernBakery",
        "locale": "en-AE",
        "creationDate": "2019-05-04T16:18:52.000+0000",
        "modifiedDate": "2019-05-15T22:32:32.858+0000",
        "id": "5cdafca53aaa7f0001c96986"
    }
]
  const payload = JSON.stringify(data)
  const dataBuffer = Buffer.from(payload);
  
  pubsubClient
    .topic(topicName)
    .publish(dataBuffer)
    .then(messageId => {
      console.log(`Message ${messageId} published.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });