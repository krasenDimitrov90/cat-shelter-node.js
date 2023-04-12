const http = require('http');
const port = 3000;

const handlers = require('./handlers/index');

const app = http.createServer((req, res, next) => {

    for (let handler of handlers) {
        if (!handler(req, res, next)) {
            break;
        }
    }

});

app.listen(port, () => console.log(`Server is running on port - ${port}`));