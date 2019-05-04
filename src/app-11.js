

console.clear();

const { of } = require('rxjs');
const { ajax } = require('rxjs/ajax');
const { mergeMap } = require('rxjs/Operators');
const { XMLHttpRequest } = require('xmlhttprequest');



const createXHR = () => new XMLHttpRequest();



const getUserId = (n, result = []) => {

    //console.log(n);

    const url = `https://jsonplaceholder.typicode.com/posts/${n}`;

    return ajax({
        createXHR,
        url: url,
        crossDomain: true,
        withCredentials: false,
        method: 'GET'
    }).pipe(
        mergeMap((d) => {

            result = result.concat(d.response.title);

            if (('body' in d.response) && (n < 10))
                return getUserId(++n, result);

            return of(result);

        }, null, 1)
    );
}




const createMergeMap = () => {


    //setInterval(() => {

    getUserId(1)
        .subscribe(result => {
            console.log('<ul>');
            result.forEach(v => {
                console.log(`\t<li>${v}</li>`);
            });
            console.log('</ul>');
        });

   // }, 2000);


}


createMergeMap();