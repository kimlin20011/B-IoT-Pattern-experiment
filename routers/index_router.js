/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const blockchain = require('./blockchain_router');


router.use('/blockchain', blockchain.routes(), blockchain.allowedMethods());



module.exports = router;
