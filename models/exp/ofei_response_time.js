const request = require('request');
const fs = require('fs');

// data = {
// csvName: string,  要輸出excel的檔名
// resquestTimes:  int. 要發出的request數量
// queryTopic : Query想要的內容
// deviceID ：deviceID
// }

module.exports = async function expResponseTime(data) {

    fs.writeFileSync('./ofei_csvName.txt', data.csvName);

    //function 發出api request並輸出csv
    for (let i = 0; i < data.resquestTimes; i++) {
        let startDate = Date.now();
        let info = {};
        info.queryTopic =data.queryTopic;
        info.deviceID =data.deviceID;
        

        request.post({
            url: `http://localhost:3001/ofei/queryData`,
            body: info,
            json: true,
        }, function (err, httpResponse, body) {
            if (err) {
                console.error(err);
            } else {
                let endDate = Date.now();
                let str = `${i},${body.identifier},${startDate},${endDate},${endDate - startDate}\n`
                //let str = `${i},${body.identifier},${startDate}}\n`
                try {
                    fs.appendFile(`./logs/${data.csvName}.csv`, str, function (err) {
                        if (err) throw err;
                        console.log(`index${i},${data.csvName}Log Saved!`);
                    });
                } catch (e) {
                    console.log(e);
                    fs.writeFileSync(`./logs/${data.csvName}.csv`, str, (err) => { console.log(err); });
                }
            }
        });
    }
    return `start to request data`;
}
