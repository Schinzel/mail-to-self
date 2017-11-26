function notify(message) {
    var notification = document.getElementById("notification");
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.classList.add('notification');
        document.body.appendChild(notification);
    }
    notification.style.display = 'block';
    notification.innerHTML = message;
    setTimeout(function () {
            document.getElementById("notification").style.display = 'none';
        },
        1000);
}

