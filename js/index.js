$(document).ready(function() {
  //set up variables
  //note won't work if the codepen is https, use http instead.
  var theQuote = "";
  var theAuthor = "";
  var apiError = "There was an error accessing the Random Quote Generator.";
  importQuote();

  //assign functions to both buttons
  $("#getQuote").on("click", function() {
    importQuote();
  });
  
  //Tweets quote when clicking on tweetQuote button
  $("#tweetQuote").on("click", function() {
    tweetQuote();
  });

  //create function to import random quote from quote API
  function importQuote() {
    $.ajax({
      url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
      data: {},
      dataType: 'json',

      //only gets quote/auther if successful
      success: function(data) {
        //grabs the quote from the quoteText object
        theQuote = data.quoteText;
        //stores the author in theAuthor var
        theAuthor = data.quoteAuthor;
        /* output quote and author to IDs quoteOut and AuthorOut*/
        document.getElementById('quoteOut').innerHTML = theQuote;
        if (theAuthor != "") {
          document.getElementById('authorOut').innerHTML = theAuthor;
        } else {
          document.getElementById('authorOut').innerHTML = "Unknown";
        }
      },
      //if not successful getting quote/author from website, writes that there was error
      error: $("quoteOut").text(apiError),
    })// end of ajax
  } //end of importQuote function

  //tweet quote in new window function
  function tweetQuote() {
    var myUrl = 'https://twitter.com/intent/tweet?text=' + theQuote + ' ' + theAuthor;
    window.open(myUrl, 'twitter');
    return false;
  };

});