const deploy_OFEI_QueryRegistry = require('../models/ofei/deploy_OFEI_QueryRegistry');
const queryData = require('../models/ofei/queryData');
const subWhisper = require('../models/ofei/subWhisper');

module.exports = {
    async deployOFEI_QueryRegistry(ctx) {
        //let formData = ctx.request.body;
        let res = {};
        try {
            let deployQueryRegistery_result = await deploy_OFEI_QueryRegistry();
            res = deployQueryRegistery_result;
            ctx.body = res;
        } catch (error) {
            ctx.body = error;
        }
    },
    async queryData(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let queryData_result = await queryData(formData);
            res = queryData_result;
            ctx.body = res;
        } catch (error) {
            ctx.body = error;
        }
    },
    async whisperSubscribe(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let whisperSubscribe_result = await subWhisper(formData);
            res = whisperSubscribe_result;
            ctx.body = res;
        } catch (error) {
            ctx.body = error;
        }
    },
}