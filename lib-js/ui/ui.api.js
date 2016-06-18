
(function(ui) {

    /**
     * @memberOf ui
     * @namespace ui.$
     * @constructor
     */
    ui.$ = function (selector) {

        this.elements  = document.querySelector(selector);
    };

    /** @protected */
    ui.$.prototype = {

        /**
         *
         * @returns {ui.$}
         */
        append: function(contentElement) {

            this.elements.appendChild(contentElement);
            return this;
        },

        on: function(event, fun, useCapture) {

            if (this.elements !== null) {

                this.elements.addEventListener(event, fun, useCapture);
            }

            return this;
        }
    };

    /**
     * @memberOf ui
     * @namespace ui.api
     */
    ui.api = {

        addEvents: function(arrSelector, event, fun, useCapture) {

            if (typeof arrSelector === 'array') {

                for (var i = 0, count = arrSelector.length; i < count; i++) {

                    new ui.$('#' + arrSelector[i]).on(event, fun, useCapture);
                }
            } else {

                new ui.$('#' + arrSelector).on(event, fun, useCapture);
            }
        },

        /**
         * Find value in array
         * @param {[]} array
         * @param {string|number} value
         * @returns {number} If found - return key. If did not find - returning false
         * @public
         */
        inArray: function(array, value) {

            for (var i = 0, count = array.length; i < count; i++) {

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