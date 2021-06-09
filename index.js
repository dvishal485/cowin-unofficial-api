var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end({
        "name": "Cowin Unofficial API",
        "developer": "Vishal Das <dvishal485@gmail.com>",
        "purpose": "Educational Project",
        "description": "Real time cowin api extracted from cowin.gov.in",
        "api_usage": {
            "search_via_pincode": "https://cowin-api-dvishal485.vercel.app/api/pincode?p=110051"
        }
    });
}).listen(8080);