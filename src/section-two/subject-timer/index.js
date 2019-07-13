const emitter = require("events").EventEmitter;

const $buttonOne = new emitter();
const $buttonTwo = new emitter();

const { fromEvent } = require("rxjs");


