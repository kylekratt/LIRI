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
            response.data.forEach(function (element) {
                console.log();
                console.log(element.venue.name);
                console.log(element.venue.country + "," + element.venue.city);
                console.log(moment(element.datetime).format("MM/DD/YY"));
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}
function music(term) {
    spotify.search({ type: "track", query: term }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songData = data.tracks.items[0];
        console.log()
        console.log("Name: " + songData.name);
        var artists = [];
        songData.artists.forEach(function (element) {
            artists.push(element.name);
        })
        console.log("Artists: " + artists.join(","));
        console.log("Preview link: " + songData.preview_url);
        console.log("Album: " + songData.album.name);
    })
}
function movie(term) {
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + term)
        .then(function (response) {
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
if (search === "concert-this") {
    if (!term) {
        term = "Franz Ferdinand";
    }
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
else if (search === "do-what-it-says") {
    fs.readFile("random.txt", 'utf8', (err, data) => {
        if (err) throw err
        newData = data.split("\r\n");
        var lineNum = Math.floor(Math.random() * newData.length);
        var newerData = newData[lineNum].split(",");
        search = newerData[0];
        term = newerData[1];
        console.log(search+", "+term);
        if (search === "concert-this") {
            concert(term);
        }
        else if (search === "spotify-this-song") {
            music(term);
        }
        else if (search === "movie-this") {
            movie(term);
        }
    })
}
