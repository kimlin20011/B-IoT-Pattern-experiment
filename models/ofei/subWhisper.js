const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const fs = require("fs");

module.exports =  function subscribe_whisper() {

    let csvname = fs.readFileSync('./ofei_csvName.txt').toString();

    web3.shh.newKeyPair()
        .then((keyPairID) => {
            web3.shh.subscribe("messages", {privateKeyID: keyPairID}, (err, msg) => {
            
    
                let msg_receive = web3.utils.hexToUtf8(msg.payload);
                console.log(`whisper訊息${msg_receive}`);
                let callbackDate = Date.now();
                let str = `${msg_receive},${callbackDate}\n`
                try {
                    fs.appendFile(`./logs/${csvname}_whisper_callbackData.csv`, str, function (err) {
                        if (err) throw err;
                        console.log(`${csvname}_callbackData_Log Saved!`);
                    });
                } catch (e) {
                    console.log(e);
                    fs.writeFileSync(`./logs/${csvname}_callbackData.csv`, str, (err) => { console.log(err); });
                }
            });

            web3.shh.getPublicKey(keyPairID).then((publicKey) => {
                console.log(`This is public key: ${publicKey}`);
                fs.writeFileSync('./Edge_publicKey.txt', publicKey);
                //fs.writeFileSync('../Device_B-IoT-Pattern-experiment/Edge_publicKey.txt', publicKey);
            })
        });

    return `start subscribe whisper`;
};