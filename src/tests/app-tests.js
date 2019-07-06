const { of, asyncScheduler } = require("rxjs");
const { map } = require("rxjs/Operator");

const getRange = () => of(1, 2, 3).pipe(map(x => x + 1));
const getRangeAsync = () => of(1, 2, 3, asyncScheduler).pipe(map(x => x + 1));

describe("Some detail Test 1", () => {
  it("show be ok", () => {
    let result = [];
    let expectedBody = [1, 2, 3];
    getRange().subscribe(v => result.push(v));
    expected(result).toEqual(expectedBody);
  });
});

describe("Some detail Async Test 1", () => {
  it("show be ok", () => {
    let result = [];
    let expectedBody = [1, 2, 3];
    getRangeAsync().subscribe(v => result.push(v), null, () => {
      expected(result).toEqual(expectedBody);
      done();
    });
  });
});
