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
var params = {screen_name: 'dasBootKamp',count:21};
//the "get" call taken from the npm documentation
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error && response.statusCode === 200) {
    for (var i=0; i<tweets.length; i++){
        var timeStamp = tweets[i].created_at;
        var tweetSent = tweets[i].text;
     console.log(tweetSent + " " + timeStamp);
    //BONUS
    //this is for appending to the log.txt
     fs.appendFile('log.txt', tweetSent+" "+timeStamp+"\n", function(err) {
    });
    //END BONUS

        }
    }
});
}   
//END TWITTER SECTION


//SPOTIFY SECTION LETS FIND SOME MUSIC
function spotifySong () {

  //ACE OF BASE IF NO SONG INPUT
  if (song === undefined) {
    console.log(song);
    spotify.search({ type: 'track', query: 'Ace of Base' }, function(err, data) {
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);

    });
  } else {
  //IF THERE IS SONG INPUT RUN THE SEARCH
  spotify.search({ type: 'track', query: song }, function(err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
          }
            var songDetails = data.tracks.items[0];
            console.log(songDetails.artists[0].name);
            console.log(songDetails.name);
            console.log(songDetails.preview_url);
            console.log(songDetails.album.name);
            //BONUS
            //this is the variable for appending to the log.txt
            var songAll = ("\nArtist: "+songDetails.artists[0].name+ "\nSong: "+songDetails.name+"\nPreview: "+songDetails.preview_url+"\nAlbum: "+songDetails.album.name);
            fs.appendFile('log.txt', songAll, function(err) {
              console.log("appended to log.txt")              
            });
            //end BONUS           
      });
    }}
//END SPOTIFY 

//START MOVIE-THIS SECTION LETS FIND SOME MOVIE INFO
function movieThis() {

  //CUE MR NOBODY IF NO MOVIE IS INPUT
  if (song == undefined) {

    var queryUrlAlt = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
    request(queryUrlAlt, function(error, response, body) {
        console.log(JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
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
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);

    //BONUS
    //this is the variable for appending to the log.txt
    var movieAll = ("\nMovie: "+JSON.parse(body).Title+ "\nRelease Year: "+JSON.parse(body).Year+"\nIMDB Rating: "+JSON.parse(body).imdbRating+"\nRotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value+"\nCountry: "+JSON.parse(body).Country+"\nLanguage: "+JSON.parse(body).Language+"\nPlot: "+JSON.parse(body).Plot+"\nActors: "+JSON.parse(body).Actors);
    //end variable for log.txt
    //append function to send the variable to the log.txt file
    fs.appendFile('log.txt', movieAll, function(err) {
      console.log("appended to log.txt")              
    });
    //end append function for log.txt
    //END BONUS

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

    //restating variables
    var arg = dataArr[0];
    var song = dataArr[1];

    //Using same switch at above
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
   //END SWITCH

   //NEW TWITTER SECTION
  //set params with my screen name
  function myTweetsB () {
    var params = {screen_name: 'dasBootKamp',count:21};
    //the "get" call taken from the npm documentation
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error && response.statusCode === 200) {
      for (var i=0; i<tweets.length; i++){
          var timeStamp = tweets[i].created_at;
          var tweetSent = tweets[i].text;
       console.log(tweetSent + " " + timeStamp);
      //BONUS
 
          }
      }
  });
  }   
  //END TWITTER SECTION

    //NEW SPOTIFY SECTION    
    function spotifySongB () {
        spotify.search({ type: 'track', query: song }, function(err, data) {
        
                var songDetails = data.tracks.items[0];
                console.log(songDetails.artists[0].name);
                console.log(songDetails.name);
                console.log(songDetails.preview_url);
                console.log(songDetails.album.name);
                
                //BONUS
                //this is the variable for appending to the log.txt
                var songAll = ("Artist: "+songDetails.artists[0].name+ "\nSong: "+songDetails.name+"\nPreview: "+songDetails.preview_url+"\nAlbum: "+songDetails.album.name);
                fs.appendFile('log.txt', songAll, function(err) {
                  console.log("appended to log.txt")              
                });
                //END BONUS
    
                if (err) {
                    return console.log('Error occurred: ' + err);
                  }
        
          });
        }
    //END SECOND SPOTIFY SECTION
    
    //SECOND MOVIE-THIS SECTION TO CLEAR SCOPE PROBLEM
    function movieThisB() {

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

      //BONUS
      //this is the variable for appending to the log.txt
      var movieAll = ("Movie: "+JSON.parse(body).Title+ "\nRelease Year: "+JSON.parse(body).Year+"\nIMDB Rating: "+JSON.parse(body).imdbRating+"\nRotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value+"\nCountry: "+JSON.parse(body).Country+"\nLanguage: "+JSON.parse(body).Language+"\nPlot: "+JSON.parse(body).Plot+"\nActors: "+JSON.parse(body).Actors);
      //end variable for log.txt
      //append function to send the variable to the log.txt file
      fs.appendFile('log.txt', movieAll, function(err) {
      console.log("appended to log.txt")              
      });
    //end append function for log.txt
    //END BONUS

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