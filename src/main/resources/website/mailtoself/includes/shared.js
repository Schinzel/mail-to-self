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

var Accounts = (function () {
    _init();

    function _init() {
        var accounts = [
            {
                'name': 'Schinzel',
                'user_name': 'henrik@schinzel.se',
                'password': '***'
            }
            , {
                'name': 'Treceni',
                'user_name': 'henrik@treceni.com',
                'password': '***'
            }
        ];
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    function _getAccounts() {
        return JSON.parse(localStorage.getItem("accounts"));
    }


    return {
        getAccountNames: function () {
            var accounts = _getAccounts();
            var accountNames = [];
            for (var i = 0; i < accounts.length; i++) {
                accountNames[i] = accounts[i].name;
            }
            return accountNames;
        },
        /**
         *
         * @param index
         * @returns String The user name for the account at the argument index
         */
        getUserName: function (index) {
            return _getAccounts()[index].user_name;
        },
        /**
         *
         * @param index
         * @returns String The encrypted password for the account at the argument index
         */
        getEncryptedPassword: function (index) {
            return _getAccounts()[index].password;
        },
        /**
         *
         * @param index
         * @returns String The account name for the account at the argument index
         */
        getAccountName: function (index) {
            return _getAccounts()[index].name;
        }
    };
}());








