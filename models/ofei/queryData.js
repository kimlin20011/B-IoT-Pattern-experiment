"use strict";
const fs = require('fs');
const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require('../unlock');
let OFEI_QueryRegistry_Address = fs.readFileSync('./OFEI_QueryRegistry_Address.txt').toString();
let nowAccount = config.geth.account;

module.exports = async function queryData(data) {
    let OFEI_QueryRegistry_Abi = config.OFEI_QueryRegistry.abi;
    //取得目前geth中第一個account
    //let password = config.geth.password;
    //let OFEI_QueryRegistry_Address = fs.readFileSync('./OFEI_QueryRegistry_Address.txt').toString();
    let OFEI_QueryRegistry = new web3.eth.Contract(OFEI_QueryRegistry_Abi, OFEI_QueryRegistry_Address);

    // //取得目前geth中第一個account
    // let nowAccount = "";
    // await web3.eth.getAccounts((err, res) => { nowAccount = res[0] });
    // // 解鎖

    // let unlock = await unlockAccount(nowAccount, password);
    // if (!unlock) {
    //     console.log(`not unlock`);
    //     return;
    // }
    let startTime = Date.now();
    let str = `${data.deviceID},${startTime}\n`

    fs.appendFile(`./logs/${data.csvName}_OFI_start.csv`, str, function (err) {
        if (err) throw err;
        console.log(`${data.csvName}_OFI_start.csv Log Saved!`);
    });

    return new Promise((resolve, reject) => {
        let result = {};
        //let whisperPK = fs.readFileSync('./Edge_publicKey.txt').toString();
        OFEI_QueryRegistry.methods
            .offchainQueryRegistry(data.deviceID, data.index, data.whisperPK)
            .send({
                from: nowAccount,
                gas: 3000000
            })
            .on("receipt", function (receipt) {
                result = receipt.events.offchainQueryInfo.returnValues;
                resolve(result);
            })
            .on("error", function (error) {
                result.info = `智能合約OFEI_QueryRegistry操作失敗`;
                result.error = error.toString();
                result.status = false;
                reject(result);
            });
    });
};
