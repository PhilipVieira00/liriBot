let axios = require("axios");
// var keys = require("./keys.js");
// var fs = require("fs");
var Spotify = require('node-spotify-api');
let method = process.argv[2];
let searchee = process.argv[3];
let songName = searchee;
var spotify = new Spotify({
  id: '0c13fbb948dc49b19bd7e6675f6ae981',
  secret: "cd18afa4db004a5989ef3febaea9a14f"
});
function spotify_this_song() {
spotify.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=10', function(error, songResponse) {
  if (error){
      return console.log(error);
  }
  console.log("Artist: " + songResponse.tracks.items[0].artists[0].name);
  console.log("Song: " + songResponse.tracks.items[0].name);
  console.log("URL: " + songResponse.tracks.items[0].preview_url);
  console.log("Album: " + songResponse.tracks.items[0].album.name);
});
};
function concert_this() {
  var queryURL = "https://rest.bandsintown.com/artists/" + searchee + "/events?app_id=codingbootcamp";
    
    console.log(queryURL); 

    axios.get(queryURL).then(
        function(bandResponse){
            console.log("Venue: " + bandResponse.data.venue.name);
            console.log("City: " + bandResponse.data.venue.city);
            console.log(moment(bandResponse.data.datetime).format("MM/DD/YYYY"));
        }
    );
};
function movie_this() {
  var queryURL = "http://www.omdbapi.com/?t=" + searchee + "&y=&plot=&apikey=trilogy";
  console.log(queryURL);
  axios.get(queryURL).then(
    function(helloThere) {
      console.log("Title: " + helloThere.data.Title);
      console.log("Year: " + helloThere.data.Year);
      console.log("Rated " + helloThere.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + helloThere.data.tomatoRating);
      console.log("Country of Production: " + helloThere.data.Country);
      console.log("Original Language: " + helloThere.data.Language);
      console.log("Plot: " + helloThere.data.Plot);
    }
  )
}
function doWhatItSays() {
  searchee === "Mr. Nobody";
  movie_this();
  searchee === "Modern Crusaders";
  spotify_this_song();
}
if (method === "spotify_this_song") {
spotify_this_song();
}
else {
  if (method === "concert-this") {
    concert_this();
  }
  else {
    if (method === "movie-this") {
      movie_this();
    }
    else {
      doWhatItSays();
    }
  }
}