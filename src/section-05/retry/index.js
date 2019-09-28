const { ajax } = require("rxjs/ajax");
const { retry, delay } = require("rxjs/operators");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

console.clear();

const createXHR = () => new XMLHttpRequest();

const getData = () =>
  ajax({
    url: "http://127.0.0.1:4001/list-data-v2",
    createXHR
  }).pipe(retry(4));

getData().subscribe((data) => console.log(data.response));
