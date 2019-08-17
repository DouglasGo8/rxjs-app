const { interval, of } = require("rxjs");
const { take, map } = require("rxjs/operators");

interval(1000)
  .pipe(
    take(4),
    map(x => {
      if (x === 2) throw { code: "503", message: "Internal Server Error" };
      return x;
    })
    //catchError(err => of(err))
  )
  .subscribe(console.log, console.error);
