var gifs = ["ron swanson", "april ludgate", "tom haverford", "leslie knope"]

    console.log("ready!");
    // Function for displaying movie data

    function displayGif() {

        var person = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var personImage = $("<img class = 'gif'>");

                // personImage.addClass("gif");
                personImage.attr("src", results[i].images.fixed_height_still.url);
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.attr("data-state", "still");

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $("#gifs-appear-here").prepend(gifDiv);
            }
            $(".gif").on("click", function(){
                var state = $(this).attr("data-state");
                console.log(state);
                if (state === "still"){
                  var replace = $("<img>");
                  replace = $(this).attr("src", $(this).attr("data-animate")); 
                  $(this).attr("data-state","animate");
                  console.log(replace);
                } else {
                  var replace = $("<img>");
                  replace = $(this).attr("src", $(this).attr("data-still")); 
                  $(this).attr("data-state","still");
                  console.log(replace);
        
                }
            });
        });
    };
    
    function renderButtons() {

        // Deletes the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of gifs
        for (var i = 0; i < gifs.length; i++) {

            // Then dynamicaly generates buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("gifs");
            // Added a data-attribute
            a.attr("data-person", gifs[i]);
            // Provided the initial button text
            a.text(gifs[i]);
            // Added the button to the buttons-view div
            // $("#buttons-view").data("data-person", a);
            $("#buttons-view").append(a);
        }
    }


    // This function handles events where the add gif button is clicked
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        console.log(event);
        gifs.push(gif);

        renderButtons();
    });
    

    // Adding click event listeners to all elements with a class of "movie"
    $(document).on("click", ".gifs", displayGif);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
