
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
        },

        event: function(event, fun, useCapture) {

            for (var i = 0; i < this.elements.length; i++) {

                this.elements[i].addEventListener(event, fun, useCapture);
            }
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
        },

        /**
         * If "value" not empty and not null - return "value" else "defaultValue"
         * @param {*} value
         * @param {*} defaultValue
         * @returns {*}
         */
        empty: function(value, defaultValue) {
            return (value != undefined && value !== null) ? value : defaultValue;
        },

        /**
         * If "property" exist - return "value" else "defaultValue"
         * @param {{}} object
         * @param {*} property
         * @param {*} defaultValue
         * @returns {*}
         */
        existProperty: function(object, property, defaultValue) {

            if (object.hasOwnProperty(property)) {

                return object[property];
            }

            return defaultValue;
        },

        /**
         * Set value field
         * @param {string|number} nameValue
         * @param {string} nameField
         * @returns {string|number}
         * @public
         */
        setValue: function(nameValue, nameField) {

            if (typeof nameValue === 'object' && nameValue !== null) {

                if (nameValue.hasOwnProperty(nameField)) {

                    return nameValue[nameField];
                }
            }

            return nameValue;
        }
    };

} (window.ui || {}));