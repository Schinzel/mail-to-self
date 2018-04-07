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

        saveAccount: function (id, account_description, user_name, encrypted_password) {
            var accounts = _getAccounts();
            var account_updated = false;
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i].id === id) {
                    accounts[i].account_description = account_description;
                    accounts[i].user_name = user_name;
                    accounts[i].password = encrypted_password;
                    account_updated = true;
                }
            }
            if (!account_updated) {
                var new_account = {
                    id: id,
                    account_description: account_description,
                    user_name: user_name,
                    password: encrypted_password
                };
                accounts.push(new_account);
            }
            localStorage.setItem("accounts", JSON.stringify(accounts));
        },

        getAccountIds: function () {
            var account_ids = [];
            var accounts = _getAccounts();
            for (var i = 0; accounts && i < accounts.length; i++) {
                account_ids[i] = accounts[i].id;
            }
            return account_ids;
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