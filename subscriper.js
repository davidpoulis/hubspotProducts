require('dotenv').config();
var request = require('./request')
const {PubSub} = require('@google-cloud/pubsub');
var trans=require('./transformObject').transform
var API_KEY = require('./secret').API_KEY
const END_POINT = `https://api.hubapi.com/crm-objects/v1/objects/products?hapikey=${API_KEY}`
const METHOD = 'POST'
const pubsub = new PubSub();


const subscriptionName = 'ordersEarly';
const timeout = 60;


const subscription = pubsub.subscription(subscriptionName);

let messageCount = 0;

const messageHandler = message => {
  console.log(`Received message ${message.id}:`);
  console.log(`Data: ${message.data}`);
  console.log(`tAttributes: ${message.attributes}`);
  //transform data from buffer to json
  msgString=JSON.parse(message.data.toString('utf8')) 
  //transObj=[]
  //transObj.push(trans(msgString));
  sendData=[]
 
  transObj = trans(msgString)
  console.log('transObj',transObj)
  for(var key in transObj){
    if (transObj.hasOwnProperty(key)) {
    
      sendData.push({name:key,value:transObj[key]})
   }
  }
  request.sendProductToHubspot(sendData,END_POINT,METHOD )
  
  messageCount += 1;

  // Ack the messae
  message.ack();
};

// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);
// setTimeout(() => {
//   subscription.removeListener('message', messageHandler);
//   console.log(`${messageCount} message(s) received.`);
// }, timeout * 1000);