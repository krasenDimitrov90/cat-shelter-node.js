const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats');

module.exports = (req, res, next) => {
    const pathName = url.parse(req.url).pathname;

    if (pathName === '/' && req.method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'})
                res.write('Page not Found');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data);
                res.end();
            }
        });

    } else {
        return true;
    }
};