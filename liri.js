//HIGH LEVEL REQUIRES
require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require('./keys');

//API VARIABLES SECTION
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb = require('omdb');

//SET VARIABLES TO TAKE INPUTS FROM COMMAND LINE
var arg = process.argv[2];
var song = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (arg) {
    case "my-tweets":
      myTweets();
      break;
  
    case "spotify-this-song":
      spotifySong();
      break;
  
    case "movie-this":
      movieThis();
      break;
  
    case "do-what-it-says":
      whatSays();
      break;
  }

//TWITTER SECTION
//set params with my screen name

function myTweets () {
var params = {screen_name: 'jbluft',count:21};
//the "get" call taken from the npm documentation
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error && response.statusCode === 200) {
    for (var i=0; i<tweets.length; i++){
        var timeStamp = tweets[i].created_at;
        var tweetSent = tweets[i].text;
     console.log(tweetSent + timeStamp);
        }
    }
});
}   
//END TWITTER SECTION





//SPOTIFY SECTION LETS FIND SOME MUSIC
function spotifySong () {

  if (song === undefined) {
    console.log(song);
    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
        console.log(data);
    });
  } else {

  spotify.search({ type: 'track', query: song }, function(err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
          }
            var songDetails = data.tracks.items[0];
            console.log(songDetails.artists[0].name);
            console.log(songDetails.name);
            console.log(songDetails.preview_url);
            console.log(songDetails.album.name);
 
           
      });
    }}
//END SPOTIFY 

//START MOVIE-THIS SECTION LETS FIND SOME MOVIE INFO
function movieThis() {

  if (song == undefined) {
    var song = "Mr. Nobody";
    var queryUrl = "http://www.omdbapi.com/?t=" + song + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
        console.log(JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("IMDB Rating: " + JSON.parse(body).Country);
        console.log("IMDB Rating: " + JSON.parse(body).Language);
        console.log("IMDB Rating: " + JSON.parse(body).Plot);
        console.log("IMDB Rating: " + JSON.parse(body).Actors);
        });
  } else {

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
}
//END MOVIE-THIS SECTION WE FOUND SOME MOVIE INFO



//START DO-WHAT-IT-SAYS SECTION
function whatSays() {
fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    // console.log(dataArr);

    var arg = dataArr[0];
    var song = dataArr[1];

    switch (arg) {
        case "my-tweets":
          myTweetsB();
          break;
      
        case "spotify-this-song":
          spotifySongB();
          break;
      
        case "movie-this":
          movieThisB();
          break;
      
    }  
   
    //NEW SPOTIFY SECTION TO CLEAR SCOPE PROBLEM WITH PASSING THE SECOND VARIABLE    
    function spotifySongB () {
        spotify.search({ type: 'track', query: song }, function(err, data) {
        
            // if (!err && response.statusCode === 200) {
                var songDetails = data.tracks.items[0];
                console.log(songDetails.artists[0].name);
                console.log(songDetails.name);
                console.log(songDetails.preview_url);
                console.log(songDetails.album.name);
                // };
    
                // if (err) {
                //     return console.log('Error occurred: ' + err);
                //   }
        
          });
        }
    //END SECOND SPOTIFY SECTION

    //TWITTER SECTION AGAIN BECAUSE OF SCOPE ISSUE
    //set params with my screen name

    function myTweetsB () {
        var params = {screen_name: 'jbluft',count:21};
        //the "get" call taken from the npm documentation
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode === 200) {
        for (var i=0; i<tweets.length; i++){
        var timeStamp = tweets[i].created_at;
        var tweetSent = tweets[i].text;
        console.log(tweetSent + timeStamp);
            }
            }
        });
    }      
        //END TWITTER AGAIN SECTION
    
    //SECOND MOVIE-THIS SECTION TO CLEAR SCOPE PROBLEM
    function movieThisB() {

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
//END SECOND MOVIE-THIS SECTION

   });
}
//END DO-WHAT-IT-SAYS SECTION







