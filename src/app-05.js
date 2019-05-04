const {
    Subject
} = require('rxjs');

// console.clear();

const Event = require('events').EventEmitter;

const step1 = new Event();
const step2 = new Event();


const switcherValueAsObservable = () => {

    let switchSubject = new Subject();

    step1.on('click', () => {
        console.log('step1 fired');
        switchSubject.next(1);
    });
    step2.on('click', () => {
        console.log('step2 fired');
        switchSubject.next(2);
    });

    return switchSubject.asObservable();

};


const createCounter = (n) => (f) => {

    let step = n;
    let counter = 0;


    f().subscribe((data) => step = data);

    setInterval(() => {

        let number = Math.floor(Math.random() * 1000) + 1;

        if (number % 2 == 0)
            step1.emit('click');
        else
            step2.emit('click');

        counter += step;

        printMe(counter);
     

    }, 2000);

};

const printMe = (n) => {
    console.log(n);
};



createCounter(1)(switcherValueAsObservable);
