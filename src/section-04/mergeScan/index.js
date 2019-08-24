const { fromEvent, empty } = require("rxjs");
const { mergeScan } = require("rxjs/operators");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const emitter = require("events").EventEmitter;
const $button = new emitter();

const { ajax } = require("rxjs/ajax");
const fromMoreEvents$ = fromEvent($button, "click");

const createXHR = () => new XMLHttpRequest();

console.clear();

fromMoreEvents$
  .pipe(
    mergeScan(
      (prevAjaxResponse, next) => {
        if ("nextIndex" in prevAjaxResponse.response) {
          return ajax.get({
            url: `http://127.0.0.1:4001/list-data?page=${prevAjaxResponse.response.nextIndex}`,
            createXHR,
            crossDomain: true,
            body: {},
            responseType: "json",
            method: "GET"
          });
        }
        return empty();
      },
      { response: { nextIndex: 1 } },
      1
    )
  )
  .subscribe(response => {
    response.data.data.forEach(item => console.log(item));
  }, console.error);

$button.emit("click", "value");
