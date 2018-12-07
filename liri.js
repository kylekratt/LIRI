require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var search = process.argv[2];
var term = process.argv.slice(3).join(" ");
function concert(term) {
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
    axios.get(URL)
        .then(function (response) {
            response.data.forEach(function(element){
                console.log();
                console.log(element.venue.name);
                console.log(element.venue.country+","+element.venue.city);
                console.log(moment(element.datetime).format("MM/DD/YY"));
            })
        })
}
function music(term) {
    spotify({ type: "track", query: term }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data);

    })
}
function movie(term) {
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t="+ term)
    .then(function(response){
        var data = response.data;
        console.log();
        console.log("Title: " + data.Title);
        console.log("Year: " + data.Year);
        console.log("IMDB Rating: " + data.Ratings[0].Value);
        console.log("Rotten Tomatoes: " + data.Ratings[1].Value);
        console.log("Country: " + data.Country);
        console.log("Plot: " + data.Plot);
        console.log("Actors: " + data.Actors);
    })
}
if (search === "do-what-it-says") {

}
if (search === "concert-this") {
    concert(term);
}
else if (search === "spotify-this-song") {
    if (!term) {
        term = "The Sign";
    }
    music(term);
}
else if (search === "movie-this") {
    if (!term) {
        term = "Mr. Nobody";
    }
    movie(term);
}
