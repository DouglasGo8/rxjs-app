const { of } = require("rxjs");
const { ajax } = require("rxjs/ajax");
const { mergeMap } = require("rxjs/operators");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

console.clear();

const getItems = (index, result = []) => {
  return ajax({
    url: `http://127.0.0.1:4001/list-data?page=${index}`,
    createXHR: () => new XMLHttpRequest()
  }).pipe(
    mergeMap(
      d => {
        result = result.concat(d.response.data);
        if ("nextIndex" in d.response) {
          return getItems(d.response.nextIndex, result);
        }
        return of(result);
      },
      null,
      1
    )
  );
};

getItems(0).subscribe(result => {
  result.forEach(item => console.log(item));
}, console.error);
