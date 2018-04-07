var Sender = (function () {
    function _send() {
        //The the message to email
        var mailContent = document.getElementById("mailContent").value;
        //If there was no message to send
        if (!mailContent) {
            return;
        }
        var xhr = new XMLHttpRequest();
        //Set callback to invoke on successful response from server
        xhr.onload = function () {
            //Empty message input box
            document.getElementById("mailContent").value = "";
            //Show server response to user
            notify(xhr.responseText);
            //Put focus in input box for user to start typing a new message
            document.getElementById("mailContent").focus();
        };
        //Create request
        xhr.open("post", "/call/mailMe", true);
        var id = Tabs.getIdOfActiveTab();
        var userName = Accounts.getUserName(id);
        var password = Accounts.getEncryptedPassword(id);
        //Send request to server
        xhr.send(
            "Message=" + encodeURIComponent(mailContent)
            + "&Username=" + encodeURIComponent(userName)
            + "&Password=" + encodeURIComponent(password)
        );
    }

    return {
        render: function (elementId) {
            var textarea = document.createElement('textarea');
            textarea.id = 'mailContent';
            textarea.placeholder = 'Mail content here...';
            textarea.onkeypress = function () {
                if (event.keyCode === 13) _send();
            };
            var saveButton = document.createElement('button');
            saveButton.type = 'button';
            saveButton.innerText = 'SEND';
            saveButton.onclick = _send;
            document.getElementById(elementId).appendChild(textarea);
            document.getElementById(elementId).appendChild(saveButton);
        }
    };
}());