const deployObserver = require('../models/odp/deployObserver');
const listenUpdateEvent = require('../models/odp/listenUpdateEvent');

module.exports = {
    async deployQueryRegistery(ctx) {
        let formData = ctx.request.body;
        let res = {};
        try {
            let deployObserver_result = await deployObserver(formData);
            res = deployObserver_result;
            ctx.body = res;
        } catch (error) {
            ctx.body = error;
        }
    },
    async listenUpdateEvent(ctx) {
        let formData = ctx.request.body;
        try {
            let listenUpdateEvent_result = await listenUpdateEvent(formData);
            ctx.body = listenUpdateEvent_result;
        } catch (error) {
            ctx.body = error;
        }
    },
}