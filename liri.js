//Gather Keys
var keys = require('./keys.js');
//console.log(keys);

var request = require('request');

var command = process.argv[2];
//console.log(command)

//Command Switch
switch(command) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThisSong();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
    default:
        console.log('Try one of these commands: "my-tweets" "spotify-this-song" "movie-this" "do-what-it-says"')
}

function myTweets(){
	//Twitter Credentials and Variables
	var Twitter = require('twitter');
	var twitterKeys = keys.twitterKeys;
	var client = new Twitter({
	  consumer_key: twitterKeys.consumer_key,
	  consumer_secret: twitterKeys.consumer_secret,
	  access_token_key: twitterKeys.access_token_key,
	  access_token_secret: twitterKeys.access_token_secret
	});
	
	//Tweet API Call
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log('\n===================== READING TWEETS =====================\n');
	  	for(var i=0; i<20; i++){
	  		console.log(tweets[i].text);
	  		console.log(tweets[i].created_at);
	  	}
	  }
	});
}

function spotifyThisSong(){
	//Spotify Credentials and Variables
	var Spotify = require('node-spotify-api');
	var spotifyKeys = keys.spotifyKeys;
	var spotify = new Spotify({
	  id: spotifyKeys.id,
	  secret: spotifyKeys.secret
	});

	//User Input
	var searchQuery = process.argv[3];

	//Default searchQuery
	if(!searchQuery){
		searchQuery = 'The Sign';
	}

	//Spotify API Call
	spotify.search({ type: 'track', query: searchQuery }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	console.log(data.tracks.items[0])
	console.log('\n==================== SEARCHING SPOTIFY =====================\n');
	console.log('Search: ' + searchQuery);
	console.log('Album: ' + data.tracks.items[0].album.name); 
	console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
	console.log('Album Cover: ' + data.tracks.items[0].album.images[0].url);
	console.log('Preview Url: ' + data.tracks.items[0].preview_url);
	});
}

function movieThis(){
	var movie = process.argv[3];
	console.log(movie)
	if(movie === undefined){
		movie = 'Mr Nobody'
		console.log(movie)
	}
	request('http://www.omdbapi.com/?apikey=40e9cece&t='+movie, function (error, response, body) {
	  if(error){
	  	return console.log('error:', error); // Print the error if one occurred
	  }
	  var data = JSON.parse(body)
	  console.log('\n=================== SEARCHING OMDB ====================\n');
	  console.log('Title: '+data.Title);
	  console.log('Year: '+data.Year);
	  console.log('Rating: '+data.Ratings[0].Value);
	  console.log('Country: '+data.Country);
	  console.log('Language: '+data.Language);
	  console.log('Plot: '+data.Plot);
	  console.log('Actors: '+data.Actors);
	});
}

function doWhatItSays(){
	console.log('do what is says');
}










