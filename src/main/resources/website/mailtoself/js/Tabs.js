var Tabs = (function () {
    function _toggleTabs() {
        //Remove active tab class from previously selected tab
        document.getElementsByClassName("activeTab")[0].classList.remove("activeTab");
        //Set argument tab to be active tab
        event.target.classList.add('activeTab');
    }

    function _createTab(account_id, account_description, is_active_tab) {
        var div = document.createElement('div');
        div.classList.add('tab');
        if (is_active_tab) {
            div.classList.add('activeTab');
        }
        div.onclick = _toggleTabs;
        div.innerHTML = account_description;
        div.dataset.accountId = account_id;
        return div;
    }

    return {
        render: function (elementId) {
            getbyId(elementId).innerHTML = '';
            var accountIds = Accounts.getAccountIds();
            if (accountIds && accountIds.length > 0) {
                for (var i = 0; i < accountIds.length; i++) {
                    var isActiveTab = (i === 0);
                    var accountDescription = Accounts.getAccountDescription(accountIds[i]);
                    var div = _createTab(accountIds[i], accountDescription, isActiveTab);
                    getbyId(elementId).appendChild(div);
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