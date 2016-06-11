
(function(ui) {

    /**
     * @memberOf ui
     * @namespace ui.$
     * @constructor
     */
    ui.$ = function (selector) {
        this.elements = document.querySelectorAll(selector);
    };

    /** @protected */
    ui.$.prototype = {

        /**
         *
         * @returns {ui.$}
         */
        append: function(contentElement) {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].appendChild(contentElement.cloneNode(true));
            }
            return this;
        }
    };

    /**
     * @memberOf ui
     * @namespace ui.api
     */
    ui.api = {

        /**
         * Find value in array
         * @param {[]} array
         * @param {string|number} value
         * @returns {number} If found - return key. If did not find - returning false
         * @public
         */
        inArray: function(array, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
            return -1;
        }
    };

} (window.ui || {}));