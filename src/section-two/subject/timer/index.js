const emitter = require("events").EventEmitter;

const $button = new emitter();

const { fromEvent } = require("rxjs");

const min = 9;
const max = 1000;

let counter = 0;

/**
 *
 */
fromEvent($button, "click").subscribe(v => {
  counter += v;

  console.log(counter);
});

/**
 *
 */
const clearInt = setInterval(() => {
  const number = Math.floor(Math.random() * (max - min) + min);
  $button.emit("click", number % 2 === 0 ? 1 : 2);
}, 2000);

/**
 * wait for 20 seconds
 */
setTimeout(() => {
  clearInterval(clearInt);
}, 20000);
