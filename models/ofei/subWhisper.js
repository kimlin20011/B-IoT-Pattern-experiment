const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const fs = require("fs");


module.exports =  function subscribe_whisper() {
    web3.shh.newKeyPair()
        .then((keyPairID) => {
            web3.shh.subscribe("messages", {privateKeyID: keyPairID}, (err, msg) => {
                console.log(web3.utils.hexToUtf8(msg.payload));
            });

            web3.shh.getPublicKey(keyPairID).then((publicKey) => {
                console.log(`This is public key: ${publicKey}`);
                fs.writeFileSync('./Edge_publicKey.txt', publicKey);
                //fs.writeFileSync('../Device_B-IoT-Pattern-experiment/Edge_publicKey.txt', publicKey);
            })
        });

    return `start subscribe whisper`;
};