const pidusageTest = require('../experiments/pidusageTest');

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
}