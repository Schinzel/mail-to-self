/**
 *
 * Holds utility functions for HTML elements.
 */
var Elem = (function () {

    return {
        /**
         *
         * @param id The if of the html element to return
         * @returns {HTMLElement}
         */
        getById: function (id) {
            return document.getElementById(id);
        },


        /**
         *
         * @param id The element to show
         * @returns {Elem} This for chaining
         */
        show: function (id) {
            Elem.getById(id).style.display = 'block';
            return this;
        },


        /**
         *
         * @param id The element to hide
         * @returns {Elem} This for chaining
         */
        hide: function (id) {
            Elem.getById(id).style.display = 'none';
            return this;
        }
    };

}());