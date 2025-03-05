/* Script that creates a pop-up with the users input when the submit the contact form */
$(document).ready(function() {
    $(".contact-form").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Collect user input values
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let email = $("#email").val();
        let reasonForContact = $("#reasonForContact").val();
        let subject = $("#subject").val();
        let sendCopy = $("#sendEmailCheck").is(":checked") ? "Yes" : "No";
        let message = $("#message").val();
        
        // Format the message
        let userInfo = `First Name: ${firstName}\n`
                    + `Last Name: ${lastName}\n`
                    + `Email: ${email}\n`
                    + `Reason for Contacting: ${reasonForContact}\n`
                    + `Subject: ${subject}\n`
                    + `Send a copy to my email: ${sendCopy}\n`
                    + `Message: ${message}`;
        
        // Show alert with user information
        alert(userInfo);
        
        // Clear the form fields
        $("input, textarea, select").val('');
        $("input[type='checkbox']").prop("checked", false);
    });
});