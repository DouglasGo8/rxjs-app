

const port = 4001;

var express = require('express');
var app = express();
var cors = require('cors');

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json());


// global declarations
let value = 0;
let count = 0;
let counter = 0;
let responseReady = {};

/**
 * 
 */
app.get('/list-data', (req, res) => {

    console.log(`Page: ${req.query.page}`);

    let nextIndex;
    let pageIndex = +req.query.page;

    value = pageIndex * 5 + 1;

    if (req.query.page < 3) {
        nextIndex = pageIndex + 1;
        res.status(200)
            .send({
                nextIndex,
                data: [value++, value++, value++, value++, value++]
            });
    } else {
        res.status(200)
            .send({
                data: [value++, value++, value++, value++]
            });
    }
});

app.get('/list-data-v2', (req, res) => {


    console.log(`count...${count}`);

    if (count++ < 3) {
        res.status(404).send({ message: 'Page not found' });
        return;
    }

    count = 0;

    res.status(200).send({
        success: true,
        data: 'Some data from BE'
    })

});

app.get('/request-data', (req, res) => {

    const requestAnswer = { dataId: counter++ };

    setTimeout(() => {
        responseReady[requestAnswer.dataId] = true;
    }, 3000);

    res.status(200)
        .send(requestAnswer);

});


app.get('/get-response', (req, res) => {

    console.log(req.query.dataId);

    const dataId = req.query.dataId;
    const notReadyAnswer = { ready: false };
    const readyAnswer = { data: [1, 2, 3, 4, 5], ready: true };

    console.log(responseReady);

    if (!responseReady[dataId]) {
        console.log('Not ready yet...');
        res.status(200)
            .send(notReadyAnswer);
    } else {
        console.log('Ready...');
        res.status(200)
            .send(readyAnswer);
    }

});


app.listen(port, () => console.log(`server.js app listening on port ${port}`));