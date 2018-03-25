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
                'id': 'hdfjksf',
                'account_name': 'Schinzel',
                'user_name': 'henrik@schinzel.se',
                'password': '***'
            }
            , {
                'id': 'lsdkjsa',
                'account_name': 'Treceni',
                'user_name': 'henrik@treceni.com',
                'password': '***'
            }
        ];
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }


    function _getAccounts() {
        return JSON.parse(localStorage.getItem("accounts"));
    }


    function _getAccount(id) {
        var accounts = _getAccounts();
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].id === id) {
                return accounts[i];
            }
        }
    }


    function getRandomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }


    return {
        getAccountIds: function () {
            var accountIds = [];
            var accounts = _getAccounts();
            for (var i = 0; i < accounts.length; i++) {
                accountIds[i] = accounts[i].id;
            }
            return accountIds;
        },
        /**
         *
         * @param id
         * @returns String The user name for the account at the argument index
         */
        getUserName: function (id) {
            return _getAccount(id).user_name;
        },
        /**
         *
         * @param id
         * @returns String The encrypted password for the account at the argument index
         */
        getEncryptedPassword: function (id) {
            return _getAccount(id).password;
        },
        /**
         *
         * @param id
         * @returns String The account name for the account at the argument index
         */
        getAccountName: function (id) {
            return _getAccount(id).account_name;
        }
    };
}());








