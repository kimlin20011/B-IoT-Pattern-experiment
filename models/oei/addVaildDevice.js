"use strict";
const fs = require('fs');
const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require('../unlock');

module.exports = async function addVaildDevice(data) {
    let QueryRegistry_Abi = config.QueryRegistry.abi;
    //取得目前geth中第一個account
    let password = config.geth.password;
    let QueryRegistry_Address = fs.readFileSync('./QueryRegistry_Address.txt').toString();
    let QueryRegistry = new web3.eth.Contract(QueryRegistry_Abi,QueryRegistry_Address);

    //取得目前geth中第一個account
    let nowAccount = "";
    await web3.eth.getAccounts((err, res) => { nowAccount = res[0] });
    // 解鎖

    let unlock = await unlockAccount(nowAccount,password);
    if (!unlock) {
        console.log(`not unlock`);
        return;
    }

    return new Promise((resolve, reject) => {
        let result ={};
        QueryRegistry.methods
            .addVaildDevice(data.deviceAddress)
            .send({
                from: nowAccount,
                gas: 3000000
            })
            .on("receipt", function(receipt) {
                result.receipt = receipt;
                result.status = true;
                console.log(result);
                resolve(result);
            })
            .on("error", function(error) {
                result.info =`智能合約addVaildDevice操作失敗`;
                result.error= error.toString();
                result.status = false;
                reject(result);
            });
    });
};
