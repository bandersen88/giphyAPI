var topics = ["frog","turtle","gorilla","kangaroo","koala","bat"];

$(document).ready(function() {
  console.log("beginning");
    for(i = 0; i < topics.length; i++) {
        var $button = $("<button>");
        $button.text(topics[i]);
        $button.addClass("button");
        $button.attr("data-name",topics[i]);
        $("#buttons-here").append($button);
    }
    console.log("end");
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
          $img.attr("src", results[i].images.fixed_height_still.url);
          $img.data("still", results[i].images.fixed_height_still.url)
            .data("animate",results[i].images.fixed_height.url)
            .data("state", "still")
            .addClass("image");

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