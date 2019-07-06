const { range } = require("rxjs");
const { map } = require("rxjs/operators");

/**
 * [SomeService description]
 */
class SomeService {
  getRange() {
    return range(0, 4).pipe(map(this.multiplyByTwo));
  }

  multiplyByTwo(x) {
    return x * 2;
  }
}


let serviceIntance = new SomeService();

serviceIntance.getRange().subscribe(console.log);
