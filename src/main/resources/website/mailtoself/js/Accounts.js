var Accounts = (function () {

    function _getAccounts() {
        var accounts = JSON.parse(localStorage.getItem("accounts"));
        return accounts ? accounts : [];
    }


    function _getAccount(id) {
        var accounts = _getAccounts();
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].id === id) {
                return accounts[i];
            }
        }
    }


    return {
        getRandomAccountId: function () {
            var length = 8;
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        },

        removeAccount: function (id) {
            var accounts = _getAccounts();
            accounts = accounts.filter(function(item) {
                return item.id !== id
            });
            localStorage.setItem("accounts", JSON.stringify(accounts));
        },

        saveAccount: function (id, accountDescription, userName, encryptedPassword) {
            var accounts = _getAccounts();
            var accountUpdated = false;
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i].id === id) {
                    accounts[i].account_description = accountDescription;
                    accounts[i].user_name = userName;
                    accounts[i].password = encryptedPassword;
                    accountUpdated = true;
                }
            }
            if (!accountUpdated) {
                var newAccount = {
                    id: id,
                    account_description: accountDescription,
                    user_name: userName,
                    password: encryptedPassword
                };
                accounts.push(newAccount);
            }
            localStorage.setItem("accounts", JSON.stringify(accounts));
        },

        getAccountIds: function () {
            var accountIds = [];
            var accounts = _getAccounts();
            for (var i = 0; accounts && i < accounts.length; i++) {
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
         * @returns String The account description for the account at the argument index
         */
        getAccountDescription: function (id) {
            return _getAccount(id).account_description;
        }
    };
}());