var gotTweets = false;
var gotRetweets = false;

function handleTweets(data) {
  $('#spinner').addClass('invisible');
	$('#tweetData').visualize({'type': 'area', 'width': '600px', 'height': '350px'});
}

function getTweets() {
  gotTweets = gotRetweets = false;

  var username = encodeURIComponent($('input[name=username]').val());
  if (username == "") { alert("Please enter a username"); $('input[name=username]').focus(); return; }

  $('#spinner').removeClass('invisible');
  var tweeturl = "http://twitter.com/status/user_timeline/#{user}.json?count=200&callback=?";
  $.getJSON(tweeturl.replace("#{user}", username), handleTweets);
  $('#go').blur();
}

$(function() {
  $('#go').click(getTweets);
});
