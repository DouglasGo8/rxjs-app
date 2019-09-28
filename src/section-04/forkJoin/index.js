const { Subject, of, forkJoin } = require("rxjs");
const { concatMap, delay } = require("rxjs/operators");

const deleteSubject = new Subject();
const deleteClick = id => deleteSubject.next(id);
const deleteItem = id => of({ id }).pipe(delay(2000));

const deleteItems$ = deleteSubject.asObservable().pipe(
  concatMap((id, index) => {
    if (index === 1) {
      return deleteItem(id).pipe(delay(2000));
    }
    return deleteItem(id);
  }, null)
);

setInterval(() => deleteClick(Math.floor(Math.random() * 100)), 2000);

deleteItems$.subscribe(console.log);


const deleteAllClick  = () => {
    
    const ids = [1, 2, 3];
    const arraysOfObservables = ids.map(deleteItem);

    forkJoin(arraysOfObservables).subscribe(console.log);
};


deleteAllClick();