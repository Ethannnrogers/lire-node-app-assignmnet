var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var spotify = require('spotify');
var twitter = require("twitter");
var request = require('request');
var fs = require("fs");

var command = process.argv[2];
var commandTwo = process.argv[3];
var x = "";

//for loop to combine inputs -- slice?
for(i = 4; i < process.argv.length; i++){
  commandTwo += '+' + process.argv[i];
}



//switch command to toggle between commands
switch(command){
    case "my-tweets":
    tweetList();
    break;

    case "spotify-this-song":
    if(x){
      spotifySong(x);
    } else{
      spotifySong("Mine");
    }
    break;
    
    case "movie-this":
    if(x){
      omdbData(x)
    } else{
      omdbData("I am legend")
    }
    break;

    case "do-what-it-says":
    doStuff();
    break;

    default:
    console.log("Enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says");
    break;

}

function tweetList(){
	console.log("Don't laugh, but the president of the United States said this publicly...");
	//new variable for instance of twitter, load keys from imported keys.js
	var client = new twitter({
		consumer_key: keys.twitter.consumer_key,
		consumer_secret: keys.twitter.consumer_secret,
		access_token_key: keys.twitter.access_token_key,
		access_token_secret: keys.twitter.access_token_secret
	});

	//twitter parameters
	var parameters = {
		screen_name: 'realdonaldtrump',
		count: 20
	};

	//call the get method on our client variable twitter instance
	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
	            var returnedData = ('Tweet: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnedData);
	            console.log("===============");
	        }
	    };
  });
  
};


function spotifySong() {
  console.log("Play the tunes!");

  var songSearch;

  if(commandTwo === undefined){
    songSearch = "The Sign";
  }else{
    searchTrack = commandTwo;
  }

  spotify.search({type:'track', query:songSearch}, function(err, data){
    if(err){
      console.log('Error occured: ' + err);
      return;
    }else{
      console.log(data);

    }
  })

} // end function

function omdbData(){
  console.log("Let's watch a movie!");

  var movieSearch;
  if(commandTwo === undefined){
    movieSearch = "Mr. Nobody";
  }else{
    movieSearch = commandTwo;
  };

  var url = "http://www.omdbapi.com?apikey=trilogy&t=" + movieSearch + "&y=&plot=short&tomatoes=true&r=json"
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      var result = JSON.parse(body);
      console.log(JSON.parse(body));
      console.log("====================")
      console.log("Title: " + result.Title);
      console.log("Year: " + result.Year);
      console.log("IMDB: " + result.imdbRating);
      console.log("Rotten Tomatoes: " + result.tomatoeRating);
      console.log("Country: " + result.Country);
      console.log("Language: " + result.Language);
      console.log("Plot: " + result.Plot);
      console.log("Actors: " + result.Actors);
    
    }
  })

  if(movieSearch === "Mr. Nobody"){
    console.log("====================");
    console.log("If you haven't seen 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");

  }

}
