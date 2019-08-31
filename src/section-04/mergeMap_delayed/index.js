const { ajax } = require("rxjs/ajax");
const { of, throwError } = require("rxjs");
const { mergeMap, mergeMapTo, delay } = require("rxjs/operators");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const requestUrl = "http://127.0.0.1:4001/request-data";
const responseUrl = "http://127.0.0.1:4001/get-response?dataId=";

/**
 *
 * @param {*} url
 * @param {*} maxCounter
 * @param {*} dataId
 */
const getItems = (url, maxCounter, dataId) => {
  //console.log(url);
  if (maxCounter === 0)
    return throwError({ message: "Max of retries was exceeded" });

  console.log(maxCounter);
  /**
   *
   */
  return ajax({
    url: url,
    createXHR: () => new XMLHttpRequest()
  }).pipe(
    mergeMap(
      d => {
        if ("dataId" in d.response) {
          dataId = d.response.dataId;
          return getItems(responseUrl + dataId, maxCounter, dataId);
        }
        if (d.response.ready) {
          return of(d.response.data);
        } else {
          return of(1).pipe(
            delay(2000),
            mergeMapTo(getItems(responseUrl + dataId, --maxCounter, dataId))
          );
        }
      },
      null, // selector function - we don't need it here.
      1
    ) // Maximum concurrency, 1 - to prevent race conditions
  );
};

/**
 *  recursively calls
 */
getItems(requestUrl, 5, null).subscribe(console.log, console.warn);
