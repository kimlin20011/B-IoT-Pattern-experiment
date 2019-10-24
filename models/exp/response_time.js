const request = require('request');
const fs = require('fs');

// data = {
// csvName: string,  要輸出excel的檔名
// resquestTimes:  int. 要發出的request數量
// pattern : 要測試的pattern
// }

module.exports = async function expResponseTime(data) {

    console.log(data);

    //function 發出api request並輸出csv
    for (let i = 0; i < data.resquestTimes; i++) {
        let startDate = Date.now();
        let info = {};
        info.deviceID =data.deviceID;

        request.post({
            url: `http://localhost:3001/oei/queryData`,
            body: info,
            json: true,
        }, function (err, httpResponse, body) {
            if (err) {
                console.error(err);
            } else {
                let endDate = Date.now();
                let str = `${i},${body.identifier},${startDate},${endDate},${endDate - startDate}\n`
                try {
                    fs.appendFile(`./logs/${data.csvName}_${data.deviceID}.csv`, str, function (err) {
                        if (err) throw err;
                        console.log(`index${i},${data.csvName}_${data.deviceID} Log Saved!`);
                    });
                } catch (e) {
                    console.log(e);
                    fs.writeFileSync(`./logs/${data.csvName}_${data.deviceID}.csv`, str, (err) => { console.log(err); });
                }
            }
        });
    }
    return `start to request data`;
}


// //function 發出api request並輸出csv
// function makeRequest(data) {
//     let startDate = Date.now();
//     let info = {};
//     info.deviceID = `123`

//     request.post({
//         url: `http://localhost:3001/${pattern}/queryData`,
//         body: info,
//         json: true,
//     }, function (err, httpResponse, body) {
//         if (err) {
//             console.error(err);
//         } else {
//             let endDate = Date.now();
//             let str = `${data.index},${body.identifier},${startDate},${endDate},${endDate - startDate}\n`
//             try {
//                 fs.appendFile(`./logs/${data.csvName}.csv`, str, function (err) {
//                     if (err) throw err;
//                     console.log(`${data.csvName} Log Saved!`);
//                 });
//             } catch (e) {
//                 console.log(e);
//                 fs.writeFileSync(`./logs/${data.csvName}.csv`, str, (err) => { console.log(err); });
//             }
//         }
//     });
// }