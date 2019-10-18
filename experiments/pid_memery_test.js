const pidusage = require('pidusage')

let edge_PID;
let device_PID;

//取得edge的PID
request.get({
    url: "http://localhost:3001/exp/getPID",
}, function (err, httpResponse, body) {
    if (err) {
        console.error(err);
    } else {
        edge_PID = body;
        console.log(`PID${edge_PID}`)
    }
});

//取得device的PID
request.get({
    url: "http://localhost:3002/exp/getPID",
}, function (err, httpResponse, body) {
    if (err) {
        console.error(err);
    } else {
        device_PID = body;
        console.log(`PID${device_PID}`)
    }
});



//function 發出api request並輸出csv
function makeRequest(index) {
    //let startDate = Date.now();
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
            //let endDate = moment();
            let endDate = Date.now();
            let str = `${index},${body.identifier},${startDate},${endDate},${endDate-startDate}\n`

            //let str = `${index},${body.identifier},${startDate},${endDate},${endDate.diff(startDate)}\n`
            try {
                fs.appendFile(`../logs/requestData.csv`, str, function (err) {
                    if (err) throw err;
                    console.log('Log Saved!');
                });
            } catch (e) {
                console.log(e);
                fs.writeFileSync(`../logs/requestData.csv`, str, (err) => { console.log(err); });
            }
        }
    });
}

for (let i = 0; i < 1000; i++) {
    makeRequest(i);
}

// Compute statistics every second:
setInterval(function () {
    pidusage(process.pid, function (err, stats) {
      console.log(stats)
      // => {
      //   cpu: 10.0,            // percentage (from 0 to 100*vcore)
      //   memory: 357306368,    // bytes
      //   ppid: 312,            // PPID
      //   pid: 727,             // PID
      //   ctime: 867000,        // ms user + system time
      //   elapsed: 6650000,     // ms since the start of the process
      //   timestamp: 864000000  // ms since epoch
      // }
    })
  }, 1000)


  var interval = pidusage([727, 1234], function (err, stats) {
    console.log(stats)
    // => {
    //   727: {
    //     cpu: 10.0,            // percentage (from 0 to 100*vcore)
    //     memory: 357306368,    // bytes
    //     ppid: 312,            // PPID
    //     pid: 727,             // PID
    //     ctime: 867000,        // ms user + system time
    //     elapsed: 6650000,     // ms since the start of the process
    //     timestamp: 864000000  // ms since epoch
    //   },
    //   1234: {
    //     cpu: 0.1,             // percentage (from 0 to 100*vcore)
    //     memory: 3846144,      // bytes
    //     ppid: 727,            // PPID
    //     pid: 1234,            // PID
    //     ctime: 0,             // ms user + system time
    //     elapsed: 20000,       // ms since the start of the process
    //     timestamp: 864000000  // ms since epoch
    //   }
    // }
})