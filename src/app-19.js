const { defer } = require('rxjs');
const { repeat } = require('rxjs/Operators');
const { ajax } = require('rxjs/ajax');
const { XMLHttpRequest } = require('xmlhttprequest');

const createXHR = () => new XMLHttpRequest();

console.clear();

let count = 0;

const getData = () => defer(() => ajax({
    createXHR,
    url: 'http://localhost:4001/list-data?page=' + count++,
    crossDomain: true,
    withCredentials: false,
    method: 'GET'
})).pipe(repeat(2));


getData().subscribe(
    (r) => console.log(r.response),
    console.warn
);