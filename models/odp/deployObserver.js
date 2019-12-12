"use strict";
const fs = require('fs');
const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require('../unlock');

module.exports = async function deploy_Observer_contract() {
    let Observer_Bytecode = config.Observer.bytecode;
    let Observer_Abi = config.Observer.abi;
    //取得目前geth中第一個account
    let nowAccount = "";
    await web3.eth.getAccounts((err, res) => { nowAccount = res[0] });

    let password = config.geth.password;
    let QR = new web3.eth.Contract(Observer_Abi);

    // 解鎖
    let unlock = await unlockAccount(nowAccount, password);
    if (!unlock) {
        console.log(`not unlock`);
        return;
    }

    return new Promise((resolve, reject) => {
        let result = {};
        QR
            .deploy({
                data: Observer_Bytecode
            })
            .send({
                from: nowAccount,
                gas: 6000000
            })
            .on('error', function (error) {
                result.info = error;
                result.status = false;
                reject(result);
            })
            .on("receipt", function (receipt) {
                console.log(receipt);
                // 更新合約介面
                let Observer_Address = receipt.contractAddress;
                result.status = true;
                result.address = Observer_Address;
                //將新生成的RM地址寫進.txt檔案
                fs.writeFileSync('./Observer_Address.txt', result.address);
                resolve(result);
            })
    });
};

