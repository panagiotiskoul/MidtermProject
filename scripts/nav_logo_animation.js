/* Script that Animates the Logo Image of the Navbar */

// Wait for the document to be fully loaded before executing the script
$(document).ready(function() {
    
    // When the mouse enters the logo image
    $(".navbar-brand img").hover(
        function() {
            // This function is triggered when the mouse enters the image
            $(this).attr("src", "./images/Site_Logo/logo-hover.png"); // Change the image source to the hover version
        }, 
        function() {
            // This function is triggered when the mouse leaves the image
            $(this).attr("src", "./images/Site_Logo/logo.png"); // Change the image source back to the original version
        }
    );
});