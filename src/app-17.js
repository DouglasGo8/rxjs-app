
const { of, zip } = require('rxjs');
const { take, delay } = require('rxjs/Operators');

console.clear();

const httpService = {

    getCitiesInfo: () => {
        return of({
            London: 25,
            Paris: 30,
            Rome: 35,
            Brazil: 33
        }).pipe(delay(1000))
    },

    getTaxCoefficients: () => {
        return of([1, 1.2, 1.5, 2.2]).pipe(delay(1200));
    }

}


const citiesObject$ = httpService.getCitiesInfo();
const coefficientList$ = httpService.getTaxCoefficients();


zip(citiesObject$, coefficientList$)
    .pipe(take(1))
    .subscribe(console.log);