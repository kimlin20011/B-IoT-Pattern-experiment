"use strict";
const fs = require('fs');
const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);

module.exports = async function listenCallbackEvent() {
    let Consumer_Abi = config.Consumer.abi;
    //取得目前geth中第一個account
    let Consumer_Address = fs.readFileSync('./Consumer_Address.txt').toString();
    let Consumer = new web3.eth.Contract(Consumer_Abi, Consumer_Address);

    Consumer.events.UploadEvent({})
        .on('data', function (event) {
            let result = {};
            result.data = event.returnValues.data;
            result.callbackTimestamp = event.returnValues.callbackTimestamp;
            result.identifier = event.returnValues.identifier;
            //let result_event = JSON.stringify(result);
            //fs.writeFileSync('./listenCallbackEvent.json', result_event);
            console.log(`成功監聽到Callback Event\n`);
            console.log(result);
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
