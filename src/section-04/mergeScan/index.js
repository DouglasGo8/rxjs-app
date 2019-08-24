const { fromEvent, empty, of } = require("rxjs");
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
          return ajax({
            url: `http://127.0.0.1:4001/list-data?page=${prevAjaxResponse.response.nextIndex}`,
            createXHR
          });
        }
        return empty();
      },
      { response: { nextIndex: 1 } }, // Initial acc value
      1 // Maximum concurrency, 1 - to prevent race conditions
    )
  )
  .subscribe(d => {
    d.response.data.forEach(item => {
      console.log(item);
    });
  }, console.error);

$button.emit("click");
