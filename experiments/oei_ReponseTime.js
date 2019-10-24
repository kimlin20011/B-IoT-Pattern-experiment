const request = require('request');
const fs = require('fs');

//監聽device的智能合約事件
request.get({
    url: "http://localhost:3002/oei/listenQueryEvent",
}, function (err, httpResponse, body) {
    if (err) {
        console.error(err);
    } else {
        console.log(body);
    }
});

//監聽edge的智能合約事件
request.get({
    url: "http://localhost:3001/oei/listenCallbackEvent",
}, function (err, httpResponse, body) {
    if (err) {
        console.error(err);
    } else {
        console.log(body);
    }
});

//function 發出api request並輸出csv
function makeRequest(index) {
    //let startDate = moment();
    let startDate = Date.now();
    let info = {};
    info.deviceID = index

    request.post({
        url: "http://localhost:3001/oei/queryData",
        body: info,
        json: true,
    }, function (err, httpResponse, body) {
        if (err) {
            console.error(err);
        } else {
            let endDate = Date.now();
            let str = `${index},${body.identifier},${startDate},${endDate},${endDate-startDate}\n`
            try {
                fs.appendFile(`../logs/response_time.csv`, str, function (err) {
                    if (err) throw err;
                    console.log('Log Saved!');
                });
            } catch (e) {
                console.log(e);
                fs.writeFileSync(`../logs/response_time.csv`, str, (err) => { console.log(err); });
            }
        }
    });
}

for (let i = 0; i < 1000; i++) {
    makeRequest(i);
}