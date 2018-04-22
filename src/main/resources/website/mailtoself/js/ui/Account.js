/**
 *
 * The UI for viewing and setting account information.
 */
var AccountSaver = (function () {
    var m_on_save_done_function;
    var m_account_id;
    var m_html = ''
        + '<label for="account_description">Description</label>'
        + '<input type="text" id="account_description">'
        + '<label for="user_name">Gmail Username</label>'
        + '<input type="text" id="user_name">'
        + '<label for="password">Gmail Password</label>'
        + '<input type="password" id="password">'
        + '<button type="button" id="save_account">Save</button>';


    function _saveSettings() {
        var password = Elem.getById("password").value;
        if (!password) {
            Notification.notify("Dude. You forgot to set the password..");
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var encrypted_password = xhr.responseText;
            _saveToLocalStorage(encrypted_password);
        };
        xhr.open("post", "/call/encryptPassword", true);
        //Encode so that can send special chars
        var mail_content = encodeURIComponent(password);
        xhr.send("Password=" + mail_content);
    }


    function _saveToLocalStorage(encrypted_password) {
        var account_description = Elem.getById("account_description").value;
        var user_name = Elem.getById("user_name").value;
        if (!account_description || !user_name) {
            Notification.notify("Dude. You forgot to set the account description or user name...");
            return;
        }
        Accounts.saveAccount(m_account_id, account_description, user_name, encrypted_password);
        Notification.notify('Saved settings');
        m_on_save_done_function();
    }



    return {
        render: function (element_id, on_save_done_function, account_id, account_description, user_name) {
            m_on_save_done_function = on_save_done_function;
            m_account_id = account_id;
            Elem.getById(element_id).innerHTML = m_html;
            Elem.getById("account_description").value = account_description;
            Elem.getById("user_name").value = user_name;
            Elem.getById("password").value = "";
            Elem.getById("save_account").onclick = _saveSettings;
        }
    }
}());