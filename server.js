const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const utils = require("./modules/utils");

const lang = require("./lang/en/en");

function getDate(req, res, parsedUrl) {
    const name = parsedUrl.searchParams.get("name");
    const currentTime = utils.getDate();

    //Debugging #######################
    console.log(lang.greet(name, currentTime));

    res.end(lang.greet(name, currentTime));
}

function readFile(req, res) {
    fs.readFile("./files/file.txt", (err, data) => {
        if(err) {
            return sendError(res, 404, lang.err404);
        }
        res.write(data);
        res.end();
    });
}

function writeFile(req, res, parsedUrl) {
    const fileName = parsedUrl.searchParams.get("text");
    if(!fileName) {
        return sendError(res, 404, lang.failWritten);
    }

    fs.writeFile(path.join('./files/file.txt'), fileName, {flag: "a"}, (err) => {
        if(err) {
            return sendError(res, 500, lang.err500);
        }
        return res.end(lang.successWritten);
    })
}

function sendError(res, status, msg) {
    res.writeHead(status, {'Content-type':'text/plain'});
    res.write(`${status} ${msg}`);
    res.end();

    console.log(`${status} ${msg}`);
}

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `https://${req.headers.host}/`);

    console.log(req.url);
    console.log(parsedUrl.pathname)

    if(parsedUrl.pathname === "/COMP4537/labs/3/getDate/") {
        getDate(req, res, parsedUrl);
    } else if(parsedUrl.pathname === "/COMP4537/labs/3/readFile/file.txt") {
        readFile(req, res);
    } else if(parsedUrl.pathname === "/COMP4537/labs/3/writeFile/") {
        writeFile(req, res, parsedUrl);
    } else {
        sendError(res, 404, lang.err404);
    }
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log("Server is running");
});
