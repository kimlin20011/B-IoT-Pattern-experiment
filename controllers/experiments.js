const pidusageTest = require('../experiments/pidusageTest');
const response_time = require('../models/exp/response_time');
const ofei_response_time = require('../models/exp/ofei_response_time');


module.exports = {
    async pid(ctx) {
        ctx.body = process.pid;
    },
    async getPIDusage(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let pidusageTest_result = await pidusageTest(formData);
            res = pidusageTest_result;
            ctx.body = res;
        } catch (error) {
            ctx.body = error;
        }
    },
    async testResponseTime(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let testResponseTime_result = await response_time(formData);
            res = testResponseTime_result;
            ctx.body = res;
        } catch (error) {
            ctx.body = error;
        }
    },
    async testOFEIResponseTime(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let ofei_response_time_result = await ofei_response_time(formData);
            res = ofei_response_time_result;
            ctx.body = res;
        } catch (error) {
            ctx.body = error;
        }
    },
}