
const keys = require('./keys');
const myDiscogsAPIkey = keys.myDiscogsAPIkey;
const myDiscogsUserName = keys.myDiscogsUserName;

const Discogs = require('disconnect').Client;
const discogsClient = new Discogs({userToken: myDiscogsAPIkey});
discogsClient.setConfig({outputFormat:'plaintext'});

module.exports = {
    discogsCollection:discogsClient.user().collection(),
    discogsDB:discogsClient.database(),
    discogsMarketPlace:discogsClient.marketplace(),
    myDiscogsUserName:myDiscogsUserName


}