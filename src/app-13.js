
console.clear();

const { of } = require('rxjs');
const { ajax } = require('rxjs/ajax');
const { delay, mergeMap, mergeMapTo } = require('rxjs/Operators');
const { XMLHttpRequest } = require('xmlhttprequest');



const createXHR = () => new XMLHttpRequest();


const reqUrl = 'http://localhost:4001/request-data';
const respUrl = 'http://localhost:4001/get-response?dataId=';

/**
 * 
 * @param {*} url 
 * @param {*} maxCounter 
 * @param {*} dataId 
 */
const getItems = (url, maxCounter, dataId) => {

    if (maxCounter === 0) return throwError({ message: 'max retry count exceeded' });

    return ajax({
        createXHR,
        url: url,
        crossDomain: true,
        withCredentials: false,
        method: 'GET'
    }).pipe(
        mergeMap(
            (d) => {
               
                if ('dataId' in d.response)  {
                    dataId = d.response.dataId;
                    return getItems(respUrl + dataId, maxCounter, dataId);
                }
                if (d.response.ready) {
                    return of (d.response.data) // where ready
                } else {
                    return of(1).pipe( delay(1000), mergeMapTo(getItems(respUrl + dataId, maxCounter--, dataId)));
                }

            }, null, 1)
    );

}


getItems(reqUrl, 5, null)
    .subscribe(console.log);