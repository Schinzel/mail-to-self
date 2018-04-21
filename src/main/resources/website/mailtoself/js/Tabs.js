/**
 * Renders and represents the email account tabs.
 *
 */
var Tabs = (function () {

    /**
     * Make clicked on tab active tab and unmark previous active tab.
     * @private
     */
    function _toggleTabs() {
        //Remove active tab class from previously selected tab
        document.getElementsByClassName("active_tab")[0].classList.remove("active_tab");
        //Set argument tab to be active tab
        event.target.classList.add('active_tab');
    }


    /**
     * Creates a HTML div element and returns it.
     *
     * @param account_id
     * @param account_description
     * @param is_active_tab
     * @returns {HTMLDivElement} The tab as a HTML div element
     * @private
     */
    function _createTab(account_id, account_description, is_active_tab) {
        var div = document.createElement('div');
        div.classList.add('tab');
        if (is_active_tab) {
            div.classList.add('active_tab');
        }
        div.onclick = _toggleTabs;
        div.innerHTML = account_description;
        div.dataset.accountId = account_id;
        return div;
    }

    return {
        /**
         * Initializer. Renders a set of tabs.
         *
         * @param elementId The html element into which the html of tabs will be rendered.
         * @param account_ids A set of account ids. In same order as descriptions.
         * @param account_descriptions A set of account descriptions. In same order as ids.
         */
        render: function (elementId, account_ids, account_descriptions) {
            //Clear the element into which the tabs will be injected
            getbyId(elementId).innerHTML = '';
            //If there are tabs, go through tabs
            for (var i = 0; account_ids && i < account_ids.length; i++) {
                //Is active tab if is first tab
                var is_active_tab = (i === 0);
                //Create html of tab
                var div = _createTab(account_ids[i], account_descriptions[i], is_active_tab);
                //Add newly created div tab
                getbyId(elementId).appendChild(div);
            }
        },


        /**
         *
         * @returns {boolean} True if there exists at least one tab
         */
        isNotEmpty: function () {
            return document.getElementsByClassName("active_tab")[0] !== undefined;
        },


        /**
         *
         * @returns {String} The account id of active tab.
         */
        getIdOfActiveTab: function () {
            var active_tab = document.getElementsByClassName("active_tab")[0];
            return active_tab ? active_tab.dataset.accountId : "";
        }
    };
}());