"use strict";
const fs = require('fs');
const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
const moment = require('moment');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);

module.exports = async function listenCallbackEvent() {
    let QueryRegistry_Abi = config.QueryRegistry.abi;
    //取得目前geth中第一個account
    let QueryRegistry_Address = fs.readFileSync('./QueryRegistry_Address.txt').toString();
    let QueryRegistry = new web3.eth.Contract(QueryRegistry_Abi, QueryRegistry_Address);

    QueryRegistry.events.UploadEvent({})
        .on('data', function (event) {
            let result = {};
            result.data = event.returnValues.data;
            result.callbackTimestamp = event.returnValues.callbackTimestamp;
            result.identifier = event.returnValues.identifier;
            result.deviceID = event.returnValues.deviceID;
            let callbackDate = Date.now();
            let str = `${result.identifier},${callbackDate},${result.callbackTimestamp}\n`
            try {
                fs.appendFile(`./logs/${result.deviceID}_callbackData.csv`, str, function (err) {
                    if (err) throw err;
                    console.log(`${result.deviceID}_callbackData_Log Saved!`);
                });
            } catch (e) {
                console.log(e);
                fs.writeFileSync(`./logs/${result.deviceID}_callbackData.csv`, str, (err) => { console.log(err); });
            }
            console.log(`成功監聽到Callback Event\n`);
            //console.log(result);
        })
        .on('error', function (error) {
            let result = {};
            result.info = `智能合約事件監聽操作失敗`;
            result.error = error.toString();
            result.status = false;
            console.log(result);
        });

    return `start listen callback event/responsed from Edge server`;
};
