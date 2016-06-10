
(function(ui) {

    /**
     * @memberOf ui
     * @namespace ui.api
     */
    ui.api = {
        /**
         * Find value in array
         * @param {[]} array
         * @param {string|number} value
         * @returns {boolean|number} If found - return key. If did not find - returning false
         * @public
         */
        inArray: function(array, value) {

            for (var i = 0; i < array.length; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
            return false;

        }
    };

} (window.ui || {}));