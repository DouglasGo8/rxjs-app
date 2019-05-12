
const { of, Subject } = require("rxjs");
const { delay, mergeMap, concatMap } = require("rxjs/Operators");

console.clear();

const deleteSubject = new Subject();

const deleteClick = (id) => deleteSubject.next(id);

const deleteItem = (id) => {
    return of({ id }).pipe(delay(2000));
}

const deleteItems = deleteSubject.asObservable()
    .pipe(
        concatMap((id, idx) => {
            console.log(idx)
            if (idx === 1)
                return deleteItem(id).pipe(delay(2000))
            return deleteItem(id);
        }, null)
    )

deleteItems.subscribe(console.log);

deleteClick(1);
deleteClick(2);
deleteClick(3);