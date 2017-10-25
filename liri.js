//Gather Keys
var keys = require('./keys.js');
//console.log(keys);

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
	  	console.log('==========================================================');
	  	console.log('===================== READING TWEETS =====================');
	  	console.log('==========================================================');
	  	for(var i=0; i<20; i++){
	  		console.log(tweets[i].text);
	  		console.log(tweets[i].created_at);
	  		console.log('===========================================================');
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
	console.log('===========================================================');
	console.log('Search: ' + searchQuery);
	console.log('Album: ' + data.tracks.items[0].album.name); 
	console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
	console.log('Album Cover: ' + data.tracks.items[0].album.images[0].url);
	console.log('===========================================================');
	});
}