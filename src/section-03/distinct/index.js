const { from } = require("rxjs");
const {
  distinctUntilChanged,
  distinct,
  distinctUntilKeyChanged
} = require("rxjs/operators");

console.clear();

from([1, 2, 3, 4, 4, 5])
  .pipe(distinctUntilChanged())
  .subscribe(console.log);

from([
  { v: 1 },
  { v: 2 },
  { v: 2 },
  { v: 3 },
  { v: 4 },
  { v: 4 },
  { v: 5 },
  { v: 1 }
])
  .pipe(
    /*distinctUntilChanged((prev, next) => prev.v === next.v)*/ /*distinctUntilChanged(null, (item) => item.v)*/ /*distinct()*/ distinct(
      item => item.v
    )
  )
  .subscribe(console.log);

/**
 * doens't works
 */
from([
  { uid: "15acdd12-90ff-4c96-952a-3b5fc4554fad" },
  { uid: "087724cb-12c0-44d1-acd5-d3b7521d60e2" },
  { uid: "d475ace3-285f-4ef9-89f0-52076569a42c" },
  { uid: "f0bb2e4c-feec-401c-a365-3a660d02b144" },
  { uid: "d475ace3-285f-4ef9-89f0-52076569a42c" },
  { uid: "15acdd12-90ff-4c96-952a-3b5fc4554fad" }
])
  .pipe(distinctUntilKeyChanged("uid"))
  .subscribe(console.log);
