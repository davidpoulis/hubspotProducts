// This example displays how to get all deals from a HubID and paginate through them using the 'offset' parameter.
// The end result is an array containing all parsed deals.

var request = require('request-promise')
var secret = require('../secret')
const API_KEY = secret.API_KEY
const END_POINT = `https://api.hubapi.com/properties/v2/products/properties/?hapikey=${API_KEY}`
var data= require('./data').data
var req=require('../request')
 data.forEach(prop=>{
   req.sendProductToHubspot(prop,END_POINT,'POST');
 })
 

 