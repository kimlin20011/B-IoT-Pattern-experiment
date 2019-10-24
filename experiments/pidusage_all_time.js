"use strict";
const fs = require('fs');
const pidusage = require('pidusage');
const request = require('request');
let pid_interval;
let interval_feq;
let koa_pid_edge = 1818;
let koa_pid_device = 1820;
let geth_pid = 1641;
let deviceID = 123;
let index = 0;
let iterative_terms = 3; //每輪總共要發出幾筆資料
let feq_pid= 1000; //pid檢查的頻率
let feq_time = 10000; //每一輪的頻率
let round = 0;//第幾輪
let max_round = 3;//最多幾輪



pid_interval = setInterval(function () {
    pidusage([koa_pid_edge, koa_pid_device, geth_pid], function (err, stats) {

        let timestamp = Date.now();
        let str = `${index},${stats[`${koa_pid_edge}`].memory},${stats[`${koa_pid_edge}`].cpu},${stats[`${koa_pid_device}`].memory},${stats[`${koa_pid_device}`].cpu},${stats[`${geth_pid}`].memory},${stats[`${geth_pid}`].cpu},${timestamp}\n`
        index++;
        try {
            fs.appendFile(`../logs/PIG_usage_all_1.csv`, str, function (err) {
                if (err) throw err;
                console.log('PIG_usage_all_1 Log Saved!');
            });
        } catch (e) {
            console.log(e);
            fs.writeFileSync(`../logs/PIG_usage_all_1.csv`, str, (err) => { console.log(err); });
        }
    })
}, feq_pid)   //不斷檢查pid

//每輪不斷發出資料
interval_feq = setInterval(makeRequest, feq_time);  //每輪不斷發出資料


//function 發出api request並輸出csv
function makeRequest() {
    //先檢查目前為第幾輪
    if (round <= max_round) {
        console.log(`第${round}輪`);
        round++;
    } else {
        console.log(`第${round}輪，結束`);
        clearInterval(interval_feq);
        //clearInterval(pid_interval)
        return;
    }

    //開始一輪發出請求
    for (let i = 0; i < iterative_terms; i++) {
        if (i === (iterative_terms-1) ){
            console.log(`第${round}輪結束`);
        }
        let info = {};
        info.deviceID = deviceID

        request.post({
            url: "http://localhost:3001/oei/queryData",
            body: info,
            json: true,
        }, function (err, httpResponse, body) {
            if (err) {
                console.error(err);
            } else {
                console.log(body);
            }
        });
    }
}
