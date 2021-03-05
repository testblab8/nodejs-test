const http = require('http');
const path = require('path');
const fs = require('fs');
const { ifError } = require('assert');

const server = http.createServer((req, res) => {
    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname,'public', 'index.html'), (err, content) => {
    //         if (err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(content);
    //     });
    // }
    // if (req.url === '/about') {
    //     fs.readFile(path.join(__dirname,'public', 'about.html'), (err, content) => {
    //         if (err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(content);
    //     });
    // }
    // if (req.url == '/api/users') {
    //     const users = [
    //         {name: 'Bob Smith', age: 40},
    //         {name: 'Jon Doe', age: 30}
    //     ];
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.end(JSON.stringify(users));
    // }

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') { 
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8')
                })
            } else {
                res.writeHead(500);
                res.end(`Server error ${res.code}`)
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8')
        }
    });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))