// This example displays how to get all deals from a HubID and paginate through them using the 'offset' parameter.
// The end result is an array containing all parsed deals.

var request = require('request-promise')
var secret = require('./secret')
const API_KEY = secret.API_KEY
const END_POINT = `https://api.hubapi.com/properties/v2/products/properties/?hapikey=${API_KEY}`
var data= require('./data')

  var options = {
    method: 'POST',
    uri: END_POINT,
    body: data.data ,
    json: true // Automatically stringifies the body to JSON
  };
 console.log("options",options)
 request(options)
    .then(function (parsedBody) {
     //response json
     console.log("response",parsedBody)
    })
    .catch(function (err) {
       console.log('we have error: ',err)
    });

 