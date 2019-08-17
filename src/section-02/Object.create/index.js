const {
  //range,
  Observable
} = require("rxjs");

/**
 * 
 * @param {*} observer 
 */
const emitValue = observer =>
  setInterval(() => {
    observer.next("hi");
    // observer.complete();
  }, 1000)

// const emitWithRange = () => range(0, 3);

Observable.create(emitValue).subscribe(console.log, console.warn, () =>
  console.log("Completed")
);

/**
 * [evenNumbers description]
 * @type {[type]}
 */
const evenNumbers = Observable.create(obs => {
  let value = 0;

  const interval = setInterval(() => {
    if (value % 2 === 0) {
      obs.next(value);
    }
    value++;
  }, 1000);

  return () => clearInterval(interval);

});

/**
 *
 */
const subs = evenNumbers.subscribe(console.log);


setTimeout(() => {
  subs.unsubscribe();
}, 10000)
