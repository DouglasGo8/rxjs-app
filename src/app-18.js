
const { repeat } = require('rxjs/Operators');
const { ajax } = require('rxjs/ajax');
const { XMLHttpRequest } = require('xmlhttprequest');

const createXHR = () => new XMLHttpRequest();

console.clear();

const getData = (url) =>  ajax({
    createXHR,
    url: url,
    crossDomain: true,
    withCredentials: false,
    method: 'GET'
}).pipe(repeat(4));


getData('http://localhost:4001/list-data-v2').subscribe(
    (r) => console.log(r.response),
    console.warn
);