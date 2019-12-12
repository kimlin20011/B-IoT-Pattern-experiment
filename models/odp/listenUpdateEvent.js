"use strict";
const fs = require('fs');
const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
//const moment = require('moment');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);

module.exports = async function listenCallbackEvent(data) {
    let Observer_Abi = config.Observer.abi;
    //取得目前geth中第一個account
    let Observer_Address = fs.readFileSync('./Observer_Address.txt').toString();
    let Observer = new web3.eth.Contract(Observer_Abi, Observer_Address);

    Observer.events.updateEvent({})
        .on('data', function (event) {
            let result = {};
            result.signature = event.returnValues.signature;
            let callbackDate = Date.now();
            let str = `${result.signature},${callbackDate}\n`
            try {
                fs.appendFile(`./logs/odp_${data.csvName}.csv`, str, function (err) {
                    if (err) throw err;
                    console.log(`odp_${data.csvName}.csv data Log Saved!`);
                });
            } catch (e) {
                console.log(e);
                fs.writeFileSync(`./logs/odp_${data.csvName}.csv`, str, (err) => { console.log(err); });
            }
            console.log(`成功監聽到updateEvent`);
        })
        .on('error', function (error) {
            let result = {};
            result.info = `智能合約事件監聽操作失敗`;
            result.error = error.toString();
            result.status = false;
            console.log(result);
        });

    return `start listen updateEvent from Device`;
};
