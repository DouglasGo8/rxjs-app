

console.clear();

const Event = require('events').EventEmitter;

const emitter = new Event();

const {defer, of, from, fromEvent, Observable } = require('rxjs')
const {switchMap, take, debounceTime } = require('rxjs/Operators')

fromEvent(emitter, 'event$')
	.pipe(debounceTime(750))
	.subscribe(console.log);

emitter.emit('event$', 'value');


