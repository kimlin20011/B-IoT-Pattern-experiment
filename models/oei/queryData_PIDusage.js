"use strict";
const request = require('request');
const fs = require('fs');
const config = require('../../configs/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require('../unlock');

module.exports = async function queryData_PID(data) {
    let Consumer_Abi = config.Consumer.abi;
    //取得目前geth中第一個account
    let password = config.geth.password;
    let Consumer_Address = fs.readFileSync('./Consumer_Address.txt').toString();
    let Consumer = new web3.eth.Contract(Consumer_Abi,Consumer_Address);

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
        request.get({
            url: "http://localhost:3001/exp/getPIDusage",
        }, function (err, httpResponse, body) {
            if (err) {
                console.error(err);
            } else {
                console.log(`starting logging PIDusage`);
                console.log(body);
            }
        });

        Consumer.methods
            .queryData(data.deviceID)
            .send({
                from: nowAccount,
                gas: 3000000
            })
            .on("receipt", function(receipt) {
                result.identifier = receipt.events._query.returnValues.identifier;
                result.status = true;
                //let result_event = JSON.stringify(result);
                //fs.writeFileSync('./queryIdentifier.json', result_event);
                console.log(`identifier:${result.identifier}`);
                resolve(result);
            })
            .on("error", function(error) {
                result.info =`智能合約queryData操作失敗`;
                result.error= error.toString();
                result.status = false;
                reject(result);
            });
    });
};
