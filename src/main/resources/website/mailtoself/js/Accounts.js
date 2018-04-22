/**
 *
 * Represents the accounts stored in the browser's local storage.
 */
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
        /**
         *
         * @returns {string} A newly generated random account id
         */
        getRandomAccountId: function () {
            var length = 8;
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        },


        /**
         * Remove the account with the argument account id
         *
         * @param account_id
         */
        removeAccount: function (account_id) {
            var accounts = _getAccounts();
            accounts = accounts.filter(function(item) {
                return item.id !== account_id
            });
            localStorage.setItem("accounts", JSON.stringify(accounts));
        },


        /**
         * Save the argument account
         *
         * @param account_id
         * @param account_description
         * @param user_name
         * @param encrypted_password
         */
        saveAccount: function (account_id, account_description, user_name, encrypted_password) {
            var accounts = _getAccounts();
            var account_updated = false;
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i].id === account_id) {
                    accounts[i].account_description = account_description;
                    accounts[i].user_name = user_name;
                    accounts[i].password = encrypted_password;
                    account_updated = true;
                }
            }
            if (!account_updated) {
                var new_account = {
                    id: account_id,
                    account_description: account_description,
                    user_name: user_name,
                    password: encrypted_password
                };
                accounts.push(new_account);
            }
            localStorage.setItem("accounts", JSON.stringify(accounts));
        },


        /**
         *
         * @returns {Array} All the account ids as an array
         */
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
         * @returns {Array} All the account descriptions as an array
         */
        getAccountDescriptions: function () {
            var account_descriptions = [];
            var accounts = _getAccounts();
            for (var i = 0; accounts && i < accounts.length; i++) {
                account_descriptions[i] = accounts[i].account_description;
            }
            return account_descriptions;
        },


        /**
         *
         * @param account_id
         * @returns String The user name for the account with the argument id
         */
        getUserName: function (account_id) {
            return _getAccount(account_id).user_name;
        },


        /**
         *
         * @param account_id
         * @returns String The encrypted password for the account at the argument id
         */
        getEncryptedPassword: function (account_id) {
            return _getAccount(account_id).password;
        },


        /**
         *
         * @param account_id
         * @returns String The account description for the account with the argument id
         */
        getAccountDescription: function (account_id) {
            return _getAccount(account_id).account_description;
        }
    };
}());