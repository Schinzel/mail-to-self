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


/**
 * @returns Array Account names
 */
function getAccountNames() {
    return ["Schinzel", "Treceni", "ddd"];
}


/**
 *
 * @param index
 * @returns String The user name for the account at the argument index
 */
function getUserName(index) {
    var userNames = ["henrik@schinzel.se", "henrik@treceni.com"];
    return userNames[index];
}


/**
 *
 * @param index
 * @returns String The encrypted password for the account at the argument index
 */
function getEncryptedPassword(index) {
    var passwords = ["***", "***"];
    return passwords[index];
}


/**
 *
 * @param index
 * @returns String The account name for the account at the argument index
 */
function getAccountName(index) {
    var accountNames = ["Schinzel", "Treceni"];
    return accountNames[index];
}