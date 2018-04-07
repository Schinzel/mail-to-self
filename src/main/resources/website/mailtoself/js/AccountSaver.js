var AccountSaver = (function () {
    var mOnSaveDoneFunction;
    var mAccountId;
    var mHtml = ''
        + '<label for="account_description">Description</label>'
        + '<input type="text" id="account_description">'
        + '<label for="user_name">Gmail Username</label>'
        + '<input type="text" id="user_name">'
        + '<label for="password">Gmail Password</label>'
        + '<input type="password" id="password">'
        + '<button type="button" id="save_account">Save</button>'
        + '<button type="button" id="remove_account">Remove Account</button>';


    function _saveSettings() {
        var password = document.getElementById("password").value;
        if (!password) {
            notify("Dude. You forgot to set the password..");
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            _saveToLocalStorage(xhr.responseText);
        };
        xhr.open("post", "/call/encryptPassword", true);
        //Encode so that can send special chars
        var mailContent = encodeURIComponent(password);
        xhr.send("Password=" + mailContent);
    }


    function _saveToLocalStorage(encryptedPassword) {
        var accountDescription = document.getElementById("account_description").value;
        var userName = document.getElementById("user_name").value;
        if (!accountDescription || !userName) {
            notify("Dude. You forgot to set the account description or user name...");
            return;
        }
        Accounts.saveAccount(mAccountId, accountDescription, userName, encryptedPassword);
        notify('Saved settings');
        mOnSaveDoneFunction();
    }


    function _removeAccount() {
        Accounts.removeAccount(mAccountId);
        notify('Account removed');
        mOnSaveDoneFunction();
    }


    return {
        render: function (elementId, onSaveDoneFunction, accountId, accountDescription, userName) {
            mOnSaveDoneFunction = onSaveDoneFunction;
            mAccountId = accountId;
            document.getElementById(elementId).innerHTML = mHtml;
            document.getElementById("account_description").value = accountDescription;
            document.getElementById("user_name").value = userName;
            document.getElementById("password").value = "";
            document.getElementById("save_account").onclick = _saveSettings;
            document.getElementById("remove_account").onclick = _removeAccount;
        }
    }
}());