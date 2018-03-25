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
    var passwords = ["v1_783a9ee1ec503366eda3569b01275919_4392ba1018f3fbfd8cb82b6835d305e5af9023744d6e864d", "v1_783a9ee1ec503366eda3569b01275919_4392ba1018f3fbfd8cb82b6835d305e5af9023744d6e864d"];
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