

console.clear();

const { of } = require('rxjs');
const { ajax } = require('rxjs/ajax');
const { mergeMap } = require('rxjs/Operators');
const { XMLHttpRequest } = require('xmlhttprequest');



const createXHR = () => new XMLHttpRequest();

/**
 * 
 * @param {*} n 
 * @param {*} result 
 */
const getUserId = (n, result = []) => {

    //console.log(n);

    const url = `http://localhost:4001/list-data?page=${n}`;

    return ajax({
        createXHR,
        url: url,
        crossDomain: true,
        withCredentials: false,
        method: 'GET'
    }).pipe(

        mergeMap(
            (d) => {

                result = result.concat(d.response.data);

                if (('nextIndex' in d.response))
                    return getUserId(d.response.nextIndex, result);

                return of(result);

            }, null, 1)
    );
}







//setInterval(() => {

getUserId(0)
    .subscribe(result => {
        console.log('<ul>');
        result.forEach(v => {
            console.log(`\t<li>${v}</li>`);
        });
        console.log('</ul>');
    });

   // }, 2000);

