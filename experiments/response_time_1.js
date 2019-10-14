var request = require('request');
var moment = require('moment');

    function makeRequest() {
        var startDate = moment();
        request('http://localhost', function (error,response,body) {
            var endDate = moment();
            console.log('Request took: ' + endDate.diff(startDate) + ' ms.');

        });
    }

    for(var i = 0; i < 100; i++){
        makeRequest();
    }