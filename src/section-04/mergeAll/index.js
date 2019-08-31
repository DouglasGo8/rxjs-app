const { of } = require("rxjs");
const { bufferCount, mergeAll, mergeMap } = require("rxjs/operators");

const getAllIds = () => of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// Initial Array
getAllIds().subscribe(console.log);

/**
 * 
 * @param {*} chunksId 
 */
const deleteFromDB = (chunksId) => {
    console.log(`Ids to delete ${chunksId}`);

    return of ({success: true, ids: chunksId});
}

/**
 * 
 */
const deleteChunked = () => {
  return getAllIds().pipe(
    mergeAll(), // emits one by one 1..2..3..4....10
    bufferCount(2, 2),
    mergeMap(deleteFromDB)
  );
};


deleteChunked().subscribe(console.log);