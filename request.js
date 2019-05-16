// This example displays how to get all deals from a HubID and paginate through them using the 'offset' parameter.
// The end result is an array containing all parsed deals.

var request = require('request-promise')
var secret = require('./secret')
const API_KEY = secret.API_KEY
const END_POINT = `https://api.hubapi.com/crm-objects/v1/objects/products?hapikey=${API_KEY}`


exports.sendProductToHubspot= async (data) =>{
  var options = {
    method: 'POST',
    uri: END_POINT,
    body: data ,
    json: true // Automatically stringifies the body to JSON
};
 console.log("options",options)
await request(options)
    .then(function (parsedBody) {
      console.log("portalId: ",parsedBody.portalId," \n objectId: ",parsedBody.objectId);
    })
    .catch(function (err) {
       console.log('we have error: ',err)
    });
}
 