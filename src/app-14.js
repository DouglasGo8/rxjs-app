


const { of } = require('rxjs');
const { bufferCount, mergeAll, mergeMap } = require('rxjs/Operators');


console.clear();

const getAllId = () => of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);


const deleteFromDb = (chunksId) => {

    console.log('Ids to delete', chunksId);

    return of({ success: true, id: chunksId });
}

const deletedChunked = () => {
    return getAllId().pipe(
        mergeAll(),
        bufferCount(2, 2),
        mergeMap(deleteFromDb)
    )
}


deletedChunked().subscribe((data, index) => console.log('Deleted data' + data));





