var topics = ["monty python","life of brian","the hangover","archer","bruce almighty"];

$(document).ready(function() {

    for(i = 0; i < topics.length; i++) {
        var $button = $("<button>");
        $button.text(topics[i]);
        $button.addClass("button");
        $button.attr("data-name",topics[i]);
        $("#buttons-here").append($button);
    }

});

$('body').on('click', '.button', function() {

    var queryURL = "";
    var endpoint = "http://api.giphy.com/v1/gifs/search?q="
    var searchTerm = "";
    var limit = "&limit=10";
    var rating = "pg-13";
    var apiKey = "&api_key=xkpAYyGIqWQM83LbWKxTSAp5r3Lbr6pp";

    searchTerm = $(this).text();
    console.log("search term: " + searchTerm);

    var queryURL = endpoint + searchTerm + apiKey + limit;
    console.log(queryURL);

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {       
          
        var results = response.data;

          // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          var $img = $("<img>");
          var $p = $("<p>");
          $img.attr("src", results[i].images.fixed_height_still.url);
          $img.data("still", results[i].images.fixed_height_still.url)
            .data("animate",results[i].images.fixed_height.url)
            .data("state", "still")
            .addClass("image");
          $p.text(results[i].rating);

          $("#gifs-appear-here").prepend($p);
          $("#gifs-appear-here").prepend($img);

          if (results[i].rating == rating) {

            console.log("rating = " + rating);

          }}
       
      console.log(JSON.stringify(results));

      //  $("#gifs-appear-here").text(JSON.stringify(articles));
      });
});

$("body").on("click", ".image", function() {

  if($(this).data("state") === "still") {
    $(this).attr("src",$(this).data("animate"));
    $(this).data("state","animate");
  } else {
    $(this).attr("src",$(this).data("still"));
    $(this).data("state","still");
  }
});

$("#addTopicBtn").on("click", function(event) {

  event.preventDefault();
  
  var val = $("#newTopic").val();
  var $button = $("<button>");

  topics.push(val);
  $button.text(val);
  $button.addClass("button");
  $button.attr("data-name",val);
  $("#buttons-here").append($button);
}); 