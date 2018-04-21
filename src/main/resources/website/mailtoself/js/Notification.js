/**
 *
 * The purpose of this object is to show notifications for the user.
 */
var Notification = (function () {

    return{
        /**
         * Display the argument message to user
         * @param message Message to display
         */
        notify: function (message) {
            //Get element to place notification in
            var notification = Elem.getById("notification");
            //If there was no notification element on page
            if (!notification) {
                //Create notifications div
                notification = document.createElement('div');
                notification.id = 'notification';
                notification.classList.add('notification');
                //Add notification element
                document.body.appendChild(notification);
            }
            //Set notification text
            notification.innerHTML = message;
            //Display the notification
            Elem.show('notification');
            //Make the notification invisible after little bit
            setTimeout(function () {
                    Elem.hide('notification');
                },
                1000);
        }
    };

}());