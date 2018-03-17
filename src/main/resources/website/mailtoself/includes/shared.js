/**
 * Display the argument message to user
 * @param message Message to display
 */
function notify(message) {
    //Get element to place notification in
    var notification = document.getElementById("notification");
    //If there was no notification element on page
    if (!notification) {
        //Add notification element
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.classList.add('notification');
        document.body.appendChild(notification);
    }
    //Set notification text
    notification.innerHTML = message;
    //Display the notification
    notification.style.display = 'block';
    //Make the notification invisible after little bit
    setTimeout(function () {
            document.getElementById("notification").style.display = 'none';
        },
        1000);
}

