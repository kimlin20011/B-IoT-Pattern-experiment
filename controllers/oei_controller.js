const deployQueryRegistery = require('../models/oei/deployQueryRegistry');
const deployConsumer = require('../models/oei/deployConsumer');
const queryData = require('../models/oei/queryData');
const listenCallbackEvent = require('../models/oei/listenCallbackEvent')


module.exports = {
    async deployQueryRegistery(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let deployQueryRegistery_result = await deployQueryRegistery(formData);
            res = deployQueryRegistery_result;
            ctx.body = res;
        } catch (error) {
            ctx.body = error;
        }
    },
    async deployConsumer(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let deployConsumer_result = await deployConsumer(formData);
            res = deployConsumer_result;
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
    async listenCallbackEvent(ctx) {
        try {
            let listenCallbackEvent_result = await listenCallbackEvent();
            ctx.body = listenCallbackEvent_result;
        } catch (error) {
            ctx.body = error;
        }
    },
}