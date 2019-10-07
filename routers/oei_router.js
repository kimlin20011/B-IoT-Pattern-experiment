const router = require('koa-router')();
const oei = require('../controllers/oei_controller');

module.exports = router
    .post('/deployQueryRegistry', oei.deployQueryRegistery)
    .post('/deployConsumer', oei.deployConsumer)
    .post('/queryData', oei.queryData)


