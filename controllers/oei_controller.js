const deployQueryRegistery = require('../models/oei/deployQueryRegistry');
const deployConsumer = require('../models/oei/deployConsumer');
const addVaildDevice = require('../models/oei/addVaildDevice');
const queryData = require('../models/oei/queryData');
const listenCallbackEvent = require('../models/oei/listenCallbackEvent')
const queryData_PIDusage = require('../models/oei/queryData_PIDusage');
const listenCallbackEvent_PIDusage = require('../models/oei/listenCallbackEvent_PIDusage')



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
    async addVaildDevice(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let addVaildDevice_result = await addVaildDevice(formData);
            res = addVaildDevice_result;
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
    async queryData_PIDusage(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let queryData_result = await queryData_PIDusage(formData);
            res = queryData_result;
            ctx.body = res;
        } catch (error) {
            ctx.body = error;
        }
    },
    async listenCallbackEvent_PIDusage(ctx) {
        try {
            let listenCallbackEvent_result = await listenCallbackEvent_PIDusage();
            ctx.body = listenCallbackEvent_result;
        } catch (error) {
            ctx.body = error;
        }
    },
}