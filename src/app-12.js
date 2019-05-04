

console.clear();

const { fromEvent, EMPTY } = require('rxjs');
const { ajax } = require('rxjs/ajax');
const { mapTo, mergeScan } = require('rxjs/Operators');
const Event = require('events').EventEmitter;
const { XMLHttpRequest } = require('xmlhttprequest');

const createXHR = () => new XMLHttpRequest();


const moreButton$ = new Event();


fromEvent(moreButton$, 'click')
    .pipe(

        //mapTo("A event was fired"),

        mergeScan((prevAjaxResponse, next) => {

            if ('nextIndex' in prevAjaxResponse.response) {
                return ajax({
                    createXHR,
                    url: `https://jsonplaceholder.typicode.com/posts/${prevAjaxResponse.response.nextIndex}`,
                    crossDomain: true,
                    withCredentials: false,
                    method: 'GET'
                })
            }

            return EMPTY

        }, { response: { nextIndex: 1 } }, 1))
    .subscribe((d) => console.log(d.response));





moreButton$.emit('click');
