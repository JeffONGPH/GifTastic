//Global variable//
var players = ["David Luiz", "Luis Suarez","Eric Cantona", "Zlatan Ibrahimovic", "Wayne Rooney", "Ronaldinho", "Roberto Carlos", "Ronaldo", "Diego Maradona", "Dani Alves"];
var input;

$(document).ready(function () {

//render buttons function
    function renderButtons() {
        $(".buttons").empty()
        for (i = 0; i < players.length; i++) {
            var butt = $("<button>");
            butt.addClass("playername");
            butt.attr("data-name", players[i]);
            butt.text(players[i]);
            $(".buttons").append(butt);
        }
    };

    renderButtons();

    //addPlayer form
    $("#addPlayer").on("click", function (event) {
        event.preventDefault();
        input = $("#input").val().trim()
        if (input !== "") {
            players.push(input)
            renderButtons();
        }
    });
    
    //Players button clicked
    $(".buttons").on("click", ".playername", function () {
        $(".gifs").empty()
        var player = $(this).attr("data-name")
        console.log(player);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            player + "&api_key=dc6zaTOxFJmzC&limit=100";

        $.ajax(url = queryURL).then(function (response) {
            console.log(response)
            for (i = 0; i < response.data.length; i++) {
                var rating = "<div>" + "<p>" + "Rating: " + response.data[i].rating + "</P>" + "</div>";
                var gif = "<div class='col-lg-4'>" + "<img src='" + response.data[i].images.fixed_height_still.url +
                    "'data-still='" + response.data[i].images.fixed_height_still.url +
                    "'data-animate='" + response.data[i].images.fixed_height.url +
                    "'data-state='still'  class='goAnimate'  >" + rating + "</div>"

                $(".gifs").append(gif);
            }
        })
    });

    //Gif clicked
    $(".gifs").on("click", ".goAnimate", function () {
        var state = $(this).attr("data-state")

        if (state == "still") {
            $(this).attr("src", $(this).attr('data-animate'));
            $(this).attr("data-state", $(this).attr('animate'));
        } else {
            $(this).attr("src", $(this).attr('data-still'));
            $(this).attr("data-state", $(this).attr('still'));
        }
    });

});
