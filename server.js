/* Created by durka on 12/30/16. */
var http = require('http');
var url = require('url');


function start(route, handle) {
    function onRequest(request, response) {
        var pathName = url.parse(request.url).pathname;
        console.log('Request for ' + pathName + ' received.');
        route(handle, pathName, response, request);
    }


    http.createServer(onRequest, function (q, r) {
        if (q.url === '/favicon.ico') {
            r.writeHead(200, {'Content-Type': 'image/x-icon'});
            r.end();
            console.log('favicon requested');
            return;
        }

        console.log('hello');
        r.writeHead(200, {'Content-Type': 'text/plain'});
        r.write('favicon test past..');
        r.end();

    }).listen(8000);
    console.log('Server has started. Listening on port: 8000' + '...');
}

exports.start = start;
