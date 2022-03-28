const http = require('http');
const fs = require('fs');
const { BADQUERY } = require('dns');

const server = http.createServer((req,res)=>{
    // const url = req.url;
    // const method = req.method;
    // const headers = req.headers;
    const {url, method} = req;
    //console.log(`Url: ${url} \n Method: ${method} \n Headers: ${headers}`);
    res.setHeader('Content-Type','text/html');

    if(url === '/hello'){
    res.write('<html>');
    res.write('<head><title>hello world</title></head>');
    res.write('<body><center><h1>hello world</h1></center></body>');
    res.write('</html>');
    return res.end();
    } else if (url === '/'){
    res.write('<html>');
    res.write('<head><title>hello world</title></head>');
    res.write('<body><center>');
    res.write('<h1>Home page</h1>');
    res.write(`<form action='/message' method='POST'>`);
    res.write("<input type='text' name='message'/>");
    res.write("<input type='submit'/>");
    res.write('</form>');
    res.write('</center></body>');
    res.write('</html>');
    return res.end();

}else if(url === '/message' && method === 'POST'){
    const body = [];
    req.on('data',(chunk)=>{
        body.push(chunk);
        //console.log(body);
    });

    req.on('end', ()=>{
        const parseBody = Buffer.concat(body).toString();
        console.log(parseBody);
        const message = parseBody.split('=')[1];
        fs.writeFileSync('message.txt', message);
    })
    
    // res.statusCode = 302;
    // res.setHeader('Location','/');
    res.writeHead(302,{Location: '/'});
    return res.end();
    }else{
    res.write('<html>');
    res.write('<head><title>hello world</title></head>');
    res.write('<body><center><h1>Not found</h1></center></body>');
    res.write('</html>');
    return res.end();
    }
});

server.listen(3001);