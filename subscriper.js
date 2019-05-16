require('dotenv').config();
var request = require('./request')
const {PubSub} = require('@google-cloud/pubsub');

const pubsub = new PubSub();


const subscriptionName = 'ordersEarly';
const timeout = 60;


const subscription = pubsub.subscription(subscriptionName);

let messageCount = 0;

const messageHandler = message => {
  console.log(`Received message ${message.id}:`);
  console.log(`Data: ${message.data}`);
  console.log(`tAttributes: ${message.attributes}`);
  request.sendProductToHubspot(JSON.parse(message.data))
  messageCount += 1;

  // Ack the messae
  message.ack();
};

// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);
setTimeout(() => {
  subscription.removeListener('message', messageHandler);
  console.log(`${messageCount} message(s) received.`);
}, timeout * 1000);