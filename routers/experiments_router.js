const router = require('koa-router')();
const exp = require('../controllers/experiments');

module.exports = router
    .get('/getPID', exp.pid)
    .get('/getPIDusage', exp.getPIDusage)
    .post('/testResponseTime', exp.testResponseTime)
    .post('/testOFEIResponseTime', exp.testOFEIResponseTime)


