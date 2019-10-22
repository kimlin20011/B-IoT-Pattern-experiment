const router = require('koa-router')();
const oei = require('../controllers/oei_controller');

module.exports = router
    .post('/deployQueryRegistry', oei.deployQueryRegistery)
    .post('/deployConsumer', oei.deployConsumer)
    .post('/addVaildDevice', oei.addVaildDevice)
    .post('/queryData', oei.queryData)
    .get('/listenCallbackEvent', oei.listenCallbackEvent)
    .post('/queryData_PID', oei.queryData_PIDusage)
    .get('/listenCallbackEvent_PID', oei.listenCallbackEvent_PIDusage)


