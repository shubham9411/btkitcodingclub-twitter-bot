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
var retweet = function () {
    var params = {
        q: '#btkitcodingclub',
        result_type: 'recent',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, function (err, data) {
        console.log('search complete');
        if (!err) {
            data.statuses.forEach(function (tweet, id) {
                let retweetId = tweet.id_str;
                console.log(retweetId);
                Twitter.post('statuses/retweet/:id', {
                    id: retweetId
                }, function (err, response) {
                    if (response) {
                        console.log('Retweeted!!!');
                    }
                    if (err) {
                        console.log('Something went wrong while RETWEETING... Duplication maybe...');
                    }
                });
            })
        } else {
            console.log('Something went wrong while SEARCHING...');
            console.log(err);
        }
    });
}
retweet()
setInterval(retweet, 150000);