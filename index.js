var topics = ['Dog', 'Cat', 'Rabit', 'Hampster', 'Turtle', 'Chicken', 'Frog'];

function createButton(buttonName) {
    var input = $("<input type='button' class = 'button' value='" + buttonName + "'/>");
    input.appendTo($('h1'));
}

function renderButtons() {
    $('h1').empty();
    for (var i = 0; i < topics.length; i++) {
        createButton(topics[i]);
    }
}
$(document).ready(function () {
    renderButtons();

    $('#submit').click(function () {
        var userAnimal = $('#userInput').val().trim();
        topics.push(userAnimal);
        renderButtons();
    })

    var title;

    var animate;

    var still;

    var state;
    $(document).on('click', 'input:button', function () {
        title = $(this).val();
        var queryURL = ("http://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=dc6zaTOxFJmzC");

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            $(".col1").empty();
            for (var i = 0; i < 16; i++) {
                var newRating = $("<p>");
                var newGif = $("<img>");
                var newDiv = $("<div>");
                newDiv.addClass("combined");
                newGif.attr("id", i);
                newGif.addClass("gif");
                newGif.attr("data-state", "animate");
                newGif.attr("src", response.data[i].images.downsized.url);
                newGif.attr("data-still", response.data[i].images.downsized_still.url);
                newGif.attr("data-animate", response.data[i].images.downsized.url);
                newRating.html("Rating: " + response.data[i].rating);
                $(newDiv).append(newRating);
                $(newDiv).append(newGif);
                $(".col1").append(newDiv);
            }

        })

    })
    $(document).on("click", ".gif", function () {
        var myvar = $(this).attr("id");
        state = $(this).attr("data-state");
        var animateURL = $(this).attr("data-animate");
        var stillURL = $(this).attr("data-still");

        if (state === "animate") {
            $(this).attr("data-state", "still");
            $(this).attr("src", stillURL);
        } else {
            $(this).attr("data-state", "animate");
            $(this).attr("src", animateURL);
        }

    })

});