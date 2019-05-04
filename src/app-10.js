// This is your Editor pane. Write your JavaScript here and 
// use the command line to execute commands


console.clear();

const request = require('request');
const { fromEvent } = require('rxjs');
const {
    map,
    filter,
    debounceTime,
    distinctUntilChanged,
    switchMap } = require('rxjs/Operators');
const Event = require('events').EventEmitter;




const textInput$ = new Event();
const research = ['en', 'balloon', 'music', 'keyboard', 'ca', 'pentagono', 'textwist'];

const makeWikiSearch = (value) => {

    return new Promise((resolve => {
        request.post({
            url: 'https://en.wikipedia.org/w/api.php', formData: {
                action: 'opensearch',
                format: 'json',
                search: value
            }
        }, (err, response, body) => {

            if (err) {
                return console.error('upload failed:', err);
            }
            //console.log(body);
            resolve(JSON.parse(body));
        });
    }));


};



const onChangeInput = () => {

    setInterval(() => {
        textInput$.emit('keyup', research[Math.floor(Math.random() * (research.length - 1))]);
    }, 2000);

    //textInput$.on('keyup', (e) => {
    //   console.log(e)
    //});

    return textInput$;

};

fromEvent(onChangeInput(), 'keyup')
    .pipe(
        map(e => e.trim()),
        filter(e => e.length > 2),
        debounceTime(750),
        distinctUntilChanged(),
        //map(makeWikiSearch),
        //switchAll()
        switchMap(makeWikiSearch)
    )
    .subscribe(console.log);
























