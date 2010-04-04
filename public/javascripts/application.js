function loadCookies() {
  $('input[name=username]').val($.cookie('username'));
  $('input[name=maxtweets]').val($.cookie('maxtweets'));
  if ($('input[name=maxtweets]').val() == "")
    $('input[name=maxtweets]').val('10');
}

function saveCookies() {
  $.cookie('username', $('input[name=username]').val());
  $.cookie('maxtweets', $('input[name=maxtweets]').val());
}

function handleTweets(data) {
  $('#spinner').addClass('invisible');
	$('#tweetData').visualize({'type': 'area', 'width': '600px', 'height': '350px'}, $('#graph'));
}

function getTweets(evt, noValidationErrors) {
  saveCookies();

  var username = encodeURIComponent($('input[name=username]').val());
  if (username == "") {
    if (! noValidationErrors) {
      alert("Please enter a username");
    }
    $('input[name=username]').focus();
    return;
  }

  $('#graph').html('');
  $('#spinner').removeClass('invisible');
  var tweeturl = "http://twitter.com/status/user_timeline/#{user}.json?count=200&callback=?";
  $.getJSON(tweeturl.replace("#{user}", username), handleTweets);
  $('#go').blur();
}

$(function() {
  loadCookies();
  getTweets(null, true);
  $('#go').click(getTweets);
});
