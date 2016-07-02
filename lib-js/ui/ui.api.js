
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

        /**
         * Find parent element with attribute
         * @param {Element} element
         * @param {string} selector
         * @returns {*}
         */
        findParent: function(element, selector) {

            return element.closest(selector);
        },

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

        trim: function(str, character_mask) {

            character_mask = this.empty(character_mask, '\s');

            var reg = '^' + character_mask + '+|' + character_mask + '+$';

            return str.replace(new RegExp(reg), "");
        },

        arrayMerge: function(defaultArr, mergeArray) {

            for (var index in mergeArray) {

                defaultArr.push(mergeArray[index]);
            }

            return defaultArr;
        },

        /**
         * If "property" exist - return "value" else "defaultValue"
         * @param {{}} object
         * @param {string} property
         * @param {{}|string|number|boolean} defaultValue
         * @returns {{}|string|number|boolean}
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

                return '';
            }

            return ui.api.empty(nameValue, '');
        },

        /**
         * GET PARAMETERS
         * @param {string|number|null} key
         *          if type key "string|number" this method is returning value or null
         *          if type key "null" this method is returning object values
         * @returns {*}
         */
        getParams: function (key) {

            var prmstr = window.location.search.substr(1);
            var data   = prmstr != null && prmstr != "" ? prmstr : {};

            if (Object.keys(data).length) {

                var params = {};
                var prmarr = data.split("&");

                for (var i = 0; i < prmarr.length; i++) {

                    var tmparr = prmarr[i].split("=");
                    params[tmparr[0]] = tmparr[1];
                }

                if (this.empty(key, false) !== false) {

                    if (params.hasOwnProperty(key)) {

                        return params[key];
                    }

                    return null;
                }

                return params;
            }
            
            return null;
        },

        getChar: function (event) {

            if (event.which == null) {

                if (event.keyCode < 32) return null;

                return String.fromCharCode(event.keyCode); // IE
            }

            if (event.which != 0 && event.charCode != 0) {

                if (event.which < 32) return null;

                return String.fromCharCode(event.which); // остальные
            }

            return null; // специальная клавиша
        }
    };

} (window.ui || {}));