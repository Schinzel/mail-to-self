/**
 *
 * The UI for sending an email.
 */
var Sender = (function () {
    function _send() {
        //The message to email
        var mail_content = Elem.getById("mail_content").value;
        //If there was no message to send
        if (!mail_content) {
            return;
        }
        var xhr = new XMLHttpRequest();
        //Set callback to invoke on successful response from server
        xhr.onload = function () {
            //Empty message input box
            Elem.getById("mail_content").value = "";
            //Show server response to user
            Notification.notify(xhr.responseText);
            //Put focus in input box for user to start typing a new message
            Elem.getById("mail_content").focus();
        };
        //Create request
        xhr.open("post", "/api/mailMe", true);
        var id = Tabs.getIdOfActiveTab();
        var user_name = Accounts.getUserName(id);
        var password = Accounts.getEncryptedPassword(id);
        //Send request to server
        xhr.send(
            "message=" + encodeURIComponent(mail_content)
            + "&username=" + encodeURIComponent(user_name)
            + "&password=" + encodeURIComponent(password)
        );
    }

    return {
        render: function (elementId) {
            var textarea = document.createElement('textarea');
            textarea.id = 'mail_content';
            textarea.placeholder = 'Mail content here...';
            textarea.onkeypress = function () {
                if (event.keyCode === 13) _send();
            };
            var save_button = document.createElement('button');
            save_button.type = 'button';
            save_button.innerText = 'SEND';
            save_button.onclick = _send;
            Elem.getById(elementId).appendChild(textarea);
            Elem.getById(elementId).appendChild(save_button);
        }
    };
}());