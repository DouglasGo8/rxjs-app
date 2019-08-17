const emitter = require("events").EventEmitter;
const $inputEmmiter = new emitter();
const axios = require("axios");
const { fromEvent } = require("rxjs");
const { debounceTime, map, switchAll } = require("rxjs/operators");

console.clear();

const wikiUrl = "https://en.wikipedia.org/w/api.php";
const words = ["love", "hate", "gado", "petralha", "sindicato"];

const makeWikeSearch = async value => {
  return axios({
    method: "GET",
    url: wikiUrl,
    dataType: "jsonp",
    data: {
      action: "opensearch",
      format: "json",
      search: value
    }
  });
};

fromEvent($inputEmmiter, "keyup")
  .pipe(
    //map(e => `Value from event ${e}`),
    debounceTime(500),
    map(makeWikeSearch),
    //distinctUntilChanged(),
    switchAll()
  )
  .subscribe(response => {
    console.log(response.data);
  });

setInterval(() => {
  $inputEmmiter.emit("keyup", words[Math.floor(Math.random() * Math.floor(5))]);
}, 1000);
