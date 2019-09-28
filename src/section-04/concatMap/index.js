const { Subject, of } = require("rxjs");
const { delay, concatMap } = require("rxjs/operators");

console.clear();

const deleteSubject = new Subject();
const deleteClick = id => deleteSubject.next(id);
const deleteItem = id => of({ id }).pipe(delay(2000));

deleteSubject
  .asObservable()
  .pipe(
    concatMap((id, index) => {
      if (index === 1) {
        return deleteItem(id).pipe(delay(2000));
      }
      return deleteItem(id);
    }, null)
  )
  .subscribe(console.log);

setInterval(() => deleteClick(Math.floor(Math.random() * 100)), 1000);
