const path = require('path');
var pidusage = require('pidusage')
const Koa = require('koa');
//const views = require('koa-views');
const responseTime = require('koa-response-time');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const static = require('koa-static');

const config = require('./configs/config');
const routers = require('./routers/index_router');

const app = new Koa();

const staticPath = './views';

// http logger
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置ctx.body解析中间件
app.use(bodyParser());


// 測試request response的時間
app.use(responseTime({ hrtime: false }));


// 配置服务端模板渲染引擎中间件
/*app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));*/

//set up landing page of website
app.use(static(
    path.join( __dirname,  staticPath)
))

// initial router middleware
app.use(routers.routes()).use(routers.allowedMethods());

// listen port
app.listen( config.port );
console.log(`the resource server(Koa2) is start at port ${config.port}`);
console.log(`Process ID: ${process.pid}`);

// // Compute statistics every second:
// setInterval(function () {
//     pidusage(process.pid, function (err, stats) {
//       console.log(stats)
//       // => {
//       //   cpu: 10.0,            // percentage (from 0 to 100*vcore)
//       //   memory: 357306368,    // bytes
//       //   ppid: 312,            // PPID
//       //   pid: 727,             // PID
//       //   ctime: 867000,        // ms user + system time
//       //   elapsed: 6650000,     // ms since the start of the process
//       //   timestamp: 864000000  // ms since epoch
//       // }
//     })
//   }, 1000)
