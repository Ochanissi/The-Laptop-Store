const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);
// console.log(laptopData);

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        return;
    }


    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;
    console.log(id);
    console.log(pathName);
    console.log(req.url);
    // console.log(req.url);

    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, {'Content-type': 'text/html'});
        // res.end('This is the PRODUCTS page!');



        
    } 
    
    else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'});
        // res.end(`This is the LAPTOP page for the laptop ${id}!`);

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];

            const output = replaceTemplate(data, laptop);

            res.end(output);
        });} 
        
    else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('URL was not found on the server!');
    }


    // console.log('Someone did access the server!');
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now!');
});


function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);

    return output;
}