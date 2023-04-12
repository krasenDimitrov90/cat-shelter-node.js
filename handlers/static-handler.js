const path = require('path');
const url = require('url');
const fs = require('fs');

const getContentType = (url) => {
    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('js')) {
        return 'text/js';
    } else if (url.endsWith('ico')) {
        return 'text/ico';
    } else if (url.endsWith('png')) {
        return 'text/png';
    } else if (url.endsWith('jpg')) {
        return 'text/jpg';
    } else if (url.endsWith('jpeg')) {
        return 'text/jpeg';
    }
}; 

const sendFile = (res, filePath, contentType) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        }
    });
};

module.exports = (req, res) => {
    const pathName = url.parse(req.url).pathname;
    if (pathName.startsWith('/content')) {
        const contentType = getContentType(pathName);

        let filePath = path.normalize(path.join(__dirname, '../', pathName));
        sendFile(res, filePath, contentType);
    }
};