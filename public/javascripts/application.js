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

function updateTableWithData(data) {
  var today = new Date().addHours(-3).clearTime();
  var days = {};
  for (var i = 0; i < 7; i++) {
    var loopDate = new Date(today).addDays(-i);
    days[i] = {
      'ord': i,
      'date': loopDate,
      'dayOfWeek': loopDate.toString('ddd').toLowerCase(),
      'tweets': 0
    };
  }
  for (var i = 0; i < data.length; i++) {
    var loopDate = new Date(data[i].created_at).addHours(-3).clearTime();
    for (var j = 0; j < 7; j++) {
      if (loopDate.equals(days[j]['date']))
        days[j]['tweets'] = days[j]['tweets'] + 1;
    }
  }
  for (var i=0; i < 7; i++) {
    console.log(days[i]['dayOfWeek'] + ' ' + days[i]['tweets']);
    $('#tweetData tr:eq(0) th:eq(' + (6 - i) + ')').text(days[i]['dayOfWeek']);
    $('#tweetData tr:eq(2) td:eq(' + (6 - i) + ')').text(days[i]['tweets']);
  }
}

function updateTableWithMax() {
  $('#tweetData tr:eq(1) td').text($('input[name=maxtweets]').val());
}

function handleTweets(data) {
  saveCookies();
  updateTableWithMax();
  updateTableWithData(data);
	$('#tweetData').visualize({'type': 'area', 'width': '600px', 'height': '350px'}, $('#graph'));
  $('#spinner').addClass('invisible');
}

function getTweets(evt, noValidationErrors) {
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
  return false;
}

$(function() {
  loadCookies();
  getTweets(null, true);
  $('form').submit(getTweets);
});

