const router = require('koa-router')();
const ofei = require('../controllers/ofei_controller');

module.exports = router
    .post('/deployQueryRegistry', ofei.deployOFEI_QueryRegistry)
    .post('/queryData', ofei.queryData)
    .get('/whisperSubscribe', ofei.whisperSubscribe)


