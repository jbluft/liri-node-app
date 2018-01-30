require("dotenv").config();
var Twitter = require('twitter');
var fs = require("fs");
var request = require("request");
var keys = require('./keys');
var client = new Twitter(keys.twitter);
var omdb = require('omdb');

var arg = process.argv[2];
var song = process.argv[3];

//SPOTIFY SECTION
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);



// fs.readFile("random.txt", "utf8", function(error, data) {

//     // If the code experiences any errors it will log the error to the console.
//     if (error) {
//       return console.log(error);
//     }
  
//     // Then split it by commas (to make it more readable)
//     var dataArr = data.split(",");
  
  
//   });



//TWITTER SECTION
//set params with my screen name
var params = {screen_name: 'jbluft',count:21};
//the "get" call taken from the npm documentation
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error && response.statusCode === 200 && arg == "my-tweets") {
    for (var i=0; i<tweets.length; i++){
        var timeStamp = tweets[i].created_at;
        var tweetSent = tweets[i].text;
     console.log(tweetSent + timeStamp);
    }
 }


else {
    spotify.search({ type: 'track', query: song }, function(err, data) {
    
   
        if (!error && response.statusCode === 200 && arg == 'spotify-this-song') {
            var songDetails = data.tracks.items[0];
            console.log(songDetails.artists[0].name);
            console.log(songDetails.name);
            console.log(songDetails.preview_url);
            console.log(songDetails.album.name);
            };

            if (err) {
                return console.log('Error occurred: ' + err);
              }
    
      });

}

if (arg == "movie-this") {

    //OMDB section
// Then run a request to the OMDB API with the movie specified

var queryUrl = "http://www.omdbapi.com/?t=" + song + "&y=&plot=short&apikey=trilogy";
request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log(JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("IMDB Rating: " + JSON.parse(body).Country);
    console.log("IMDB Rating: " + JSON.parse(body).Language);
    console.log("IMDB Rating: " + JSON.parse(body).Plot);
    console.log("IMDB Rating: " + JSON.parse(body).Actors);
  }

  if(error) {
    return console.error(err);
}

});
}

});







