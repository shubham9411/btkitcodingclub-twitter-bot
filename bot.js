var http = require('http')
var twit = require('twit');
var config = require('./config.js');

//config.js
/** TWITTER APP CONFIGURATION
 * consumer_key
 * consumer_secret
 * access_token
 * access_token_secret
 */

var Twitter = new twit(config);
// 
//  filter the twitter public stream by the word '#btkitcodingclub'.
// 
var streamStatus = Twitter.stream('statuses/filter', {
	track: '#btkitcodingclub'
})

streamStatus.on('tweet', function (tweet) {
	let retweetId = tweet.id_str;
	Twitter.post('statuses/retweet/:id', {
		id: retweetId
	}, function (err, response) {
		if (response) {
			console.log('Retweeted!!!', response);
		}
		if (err) {
			console.log('Something went wrong while RETWEETING... Duplication maybe...');
		}
	});
})
streamStatus.on('connect', function (request) {
	console.log('Starting Bot');
})

streamStatus.on('connected', function (response) {
	console.log('Bot Connected');
})


var streamUser = Twitter.stream('user', {
	stringify_friend_ids: true
})

streamUser.on('connect', function (request) {
	console.log('Starting Bot');
})

streamUser.on('connected', function (response) {
	console.log('Bot Connected');
})

streamUser.on('direct_message', function (directMsg) {
	// If someone sends the direct_message
})
streamUser.on('follow', function (follow) {
	console.log(follow.source.screen_name, ' Followed')
	Twitter.post('statuses/update', {
		status: 'Hey @' + follow.source.screen_name + ' thanks for your follow! what are you doing today? :)'
	}, function (err, data, response) {
		console.log(data)
	})
})

var server = http.createServer( function ( req, res ){
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end('Hello world');
});
server.listen(process.env.PORT || 3000)

