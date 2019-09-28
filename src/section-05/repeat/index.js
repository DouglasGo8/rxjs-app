const { defer } = require("rxjs");
const { ajax } = require("rxjs/ajax");
const { take, repeat } = require("rxjs/operators");

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
console.clear();

const createXHR = () => new XMLHttpRequest();
let counter = 0;

const getData = () =>
  defer(() =>
    ajax({
      url: `http://127.0.0.1:4001/list-data?page=${counter++}`,
      createXHR
    }).pipe(repeat(2))
  );


  let repetableObservable = getData();

  repetableObservable.subscribe(
    (data) => console.log(data.response),
    console.warn
  )

