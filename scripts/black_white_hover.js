/* Script that makes images of 'about' page black and white when mouse hovers over them */

$(document).ready(function() {
    // When mouse enters the member image
    $(".panos-img img").hover(
            function() {
                $(this).attr("src", "./images/Our_Team/PanosBNW.jpg"); // Change to hover image
            }, 
            function() {
                $(this).attr("src", "./images/Our_Team/Panos.jpg"); // Change back to original image
            }
        );
});

$(document).ready(function() {
    // When mouse enters the member image
    $(".andreas-img img").hover(
            function() {
                $(this).attr("src", "./images/Our_Team/AndreasBNW.jpg"); // Change to hover image
            }, 
            function() {
                $(this).attr("src", "./images/Our_Team/Andreas.jpg"); // Change back to original image
            }
        );
});

$(document).ready(function() {
    // When mouse enters the member image
    $(".pandelis-img img").hover(
            function() {
                $(this).attr("src", "./images/Our_Team/PandelisBNW.jpg"); // Change to hover image
            }, 
            function() {
                $(this).attr("src", "./images/Our_Team/Pandelis.jpg"); // Change back to original image
            }
        );
});

$(document).ready(function() {
    // When mouse enters the member image
    $(".nikolas-img img").hover(
            function() {
                $(this).attr("src", "./images/Our_Team/NikolasBNW.jpg"); // Change to hover image
            }, 
            function() {
                $(this).attr("src", "./images/Our_Team/Nikolas.jpg"); // Change back to original image
            }
        );
});