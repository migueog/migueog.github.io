/*REQUIREMENTS:
    - Different Options
    - Each option adds a thing
*/

$("#startButton").click(function(event) {
    event.preventDefault();
    $("#start").hide();
    $("#question1").fadeIn("slow");   
});

/*---LEVEL 1 BUTTONS ---*/

$("#level1AButton").click(function(event) {
    event.preventDefault();
    $("#question1").hide();
    $("#question2").fadeIn("slow");
    derp.send();
});

$("#level1BButton").click(function(event) {
    event.preventDefault();
    $("#question1").hide();
    $("#question2").fadeIn("slow");
});

$("#level1CButton").click(function(event) {
    event.preventDefault();
    $("#question1").hide();
    $("#question2").fadeIn("slow");
});
/*---------*/

/*-----LEVEL 2 BUTTONS ----*/
$("#level2AButton").click(function(event) {
    event.preventDefault();
    $("#question2").hide();
    $("#question3").fadeIn("slow");
});

$("#level2BButton").click(function(event) {
    event.preventDefault();
    $("#question2").hide();
    $("#question3").fadeIn("slow");
});

$("#level2CButton").click(function(event) {
    event.preventDefault();
    $("#question2").hide();
    $("#question3").fadeIn("slow");
});
/*-------*/

/*-----LEVEL 3 BUTTONS ----*/
$("#level3AButton").click(function(event) {
    event.preventDefault();
    $("#question2").hide();
    $("#question3").fadeIn("slow");
});

$("#level3BButton").click(function(event) {
    event.preventDefault();
    $("#question2").hide();
    $("#question3").fadeIn("slow");
});

$("#level3CButton").click(function(event) {
    event.preventDefault();
    $("#question2").hide();
    $("#question3").fadeIn("slow");
});
/*-------*/

    var derp = {
        send: function (object) {
            $.ajax({
                    url: "https://api.mongolab.com/api/1/databases/quartatdb/collections/users?apiKey=AZrlbylZhU9TA4G6jDd23yALgnnM7lAa",
                    type: "POST",
                    data: JSON.stringify( ),
                contentType: "application/json"
            }).done(function (msg) {
                console.log(msg);
            });
        }
    };

    

