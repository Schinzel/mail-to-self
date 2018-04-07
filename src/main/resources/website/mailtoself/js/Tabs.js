var Tabs = (function () {
    function _toggleTabs() {
        //Remove active tab class from previously selected tab
        document.getElementsByClassName("activeTab")[0].classList.remove("activeTab");
        //Set argument tab to be active tab
        event.target.classList.add('activeTab');
    }

    function _createTab(accountId, accountDescription, isActiveTab) {
        var div = document.createElement('div');
        div.classList.add('tab');
        if (isActiveTab) {
            div.classList.add('activeTab');
        }
        div.onclick = _toggleTabs;
        div.innerHTML = accountDescription;
        div.dataset.accountId = accountId;
        return div;
    }

    return {
        render: function (elementId) {
            document.getElementById(elementId).innerHTML = '';
            var accountIds = Accounts.getAccountIds();
            if (accountIds && accountIds.length > 0) {
                for (var i = 0; i < accountIds.length; i++) {
                    var isActiveTab = (i === 0);
                    var accountDescription = Accounts.getAccountDescription(accountIds[i]);
                    var div = _createTab(accountIds[i], accountDescription, isActiveTab);
                    document.getElementById(elementId).appendChild(div);
                }
            }
        },
        isNotEmpty: function () {
            return document.getElementsByClassName("activeTab")[0] !== undefined;
        },
        getIdOfActiveTab: function () {
            var activeTab = document.getElementsByClassName("activeTab")[0];
            return activeTab ? activeTab.dataset.accountId : "";
        }
    };
}());