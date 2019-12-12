const router = require('koa-router')();
const odp = require('../controllers/odp_controller');

module.exports = router
    .post('/deployObserver', odp.deployQueryRegistery)
    .get('/listenUpdateEvent', odp.listenUpdateEvent)
