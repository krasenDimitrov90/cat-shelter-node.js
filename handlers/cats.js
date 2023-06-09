const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds');
const cats = require('../data/cats');

const sendFile = (res, filePath) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });
};




module.exports = (req, res) => {
    const pathName = url.parse(req.url).pathname;

    if (pathName === '/cats/add-cat' && req.method === 'GET') {
        const filePath = path.normalize(path.join(__dirname, '../', '/views/addCat.html'));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const catBreedPlaceholder = breeds.map(breed => `<option value="${breed}" >${breed}</option>`);
                const modifyData = data.toString().replace("{{catBreeds}}", catBreedPlaceholder);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(modifyData);
                res.end();
            }
        });

    } else if (pathName === '/cats/add-cat' && req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) throw err;
            console.log({ fields , file: files.upload.originalFilename});

            const newCat = {
                id: cats.length + 1,
                name: fields.name,
                description: fields.description,
                breed: fields.breed,
                image: files.upload.originalFilename,
            };

            cats.push(newCat);

            // let data = {id: 1, name: 'text', description: 'asd', breed: 'asd', image: 'adw.png'}

            const filePath = path.normalize(path.join(__dirname, '../data/cats.json'));

            fs.writeFile(filePath, JSON.stringify(cats, null, 2), (err) => {
                if (err) throw err;
                // console.log({ data });
                res.setHeader('Location', '/');
                res.statusCode = 302;
                res.end();
            });

        });


    } else if (pathName === '/cats/add-breed' && req.method === 'GET') {
        const filePath = path.normalize(path.join(__dirname, '../', '/views/addBreed.html'));
        sendFile(res, filePath);

    } else if (pathName === '/cats/add-breed' && req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) throw err;

            breeds.push(fields.breed);

            const filePath = path.normalize(path.join(__dirname, '../data/breeds.json'));

            fs.writeFile(filePath, JSON.stringify(breeds, null, 2), (err) => {
                if (err) throw err;
            });

            res.setHeader('Location', '/');
            res.statusCode = 302;
            res.end();
        });

    } else {
        return true;
    }
};