
(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.dom
     * @constructor
     */
    ui.dom = function (selector) {

        this.elements  = document.querySelectorAll(selector);
    };

    /** @protected */
    ui.dom.prototype = {

        /**
         * @returns {ui.dom}
         */
        before: function(contentElement) {

            for (var i = 0; i < this.elements.length; i++) {

                this.elements[i].insertBefore(contentElement, this.elements[i].firstChild);
            }

            return this;
        },

        /**
         * @returns {ui.dom}
         */
        append: function(contentElement) {


            for (var i = 0; i < this.elements.length; i++) {

                this.elements[i].appendChild(contentElement);
            }

            return this;
        },

        /**
         * @returns {ui.dom}
         */
        remove: function() {


            for (var i = 0; i < this.elements.length; i++) {

                this.elements[i].remove();
            }

            return this;
        }
    };

    /**
     * @memberOf ui
     * @namespace ui.api
     */
    ui.api = {

        escapeHtml: function (text) {

            var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };

            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        },

        clear: function(element) {

            element.removeAttribute('value');
            element.defaultValue = '';

            return element;
        },

        /**
         * @param {string|null} link
         */
        reload: function(link) {

            window.location.href = this.empty(link, window.location.href);
        },

        reloadBack: function() {

            window.location.href = document.referrer;
        },

        /**
         * @param {string|number} text
         * @returns {boolean}
         */
        isNumeric: function(text) {

            var validChars = '0123456789.';
            var isNumber = true;
            var char, i;

            for (i = 0; i < text.length && isNumber == true; i++) {

                char = text.charAt(i);

                if (validChars.indexOf(char) == -1) {

                    isNumber = false;
                }
            }

            return isNumber;
        },

        /**
         * @param {Element} element
         * @param {boolean} status
         * @returns {boolean}
         */
        disabledElement: function(element, status) {

            if (element !== null) {

                if (status) {

                    element.setAttribute('disabled', 'disabled');
                    element.classList.add(ui.CSS.disabledClass);

                } else {

                    element.removeAttribute('disabled');
                    element.classList.remove(ui.CSS.disabledClass);
                }

                return true;
            } else {

                return false;
            }
        },

        /**
         * Find parent element with attribute
         * @param {*} element
         * @param {string} selector
         * @returns {*}
         */
        findParent: function(element, selector) {

            return element.closest(selector);
        },

        addEvents: function(arrSelector, event, fun, useCapture) {

            if (typeof arrSelector === 'object') {

                for (var i = 0, count = arrSelector.length; i < count; i++) {

                    new ui.dom('#' + arrSelector[i]).on(event, fun, useCapture);
                }
            } else {

                new ui.dom('#' + arrSelector).on(event, fun, useCapture);
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

            return (value !== undefined && value !== null) ? value : defaultValue;
        },

        trim: function(str, character_mask) {

            character_mask = this.empty(character_mask, '\s');

            var reg = '^' + character_mask + '+|' + character_mask + '+$';

            return str.replace(new RegExp(reg), "");
        },

        /**
         *
         * @param {[]} defaultArr
         * @param {[]} mergeArray
         * @returns {*}
         */
        arrayMerge: function(defaultArr, mergeArray) {

            for (var index in mergeArray) {

                defaultArr.push(mergeArray[index]);
            }

            return defaultArr;
        },

        /**
         * Build object for save data
         * @param {{}} obj
         * @param {string} nameField - fieldName | fieldName[1] | objectName[fieldName][1] | ...
         * @param {{}|[]|string|number|null} valueField
         * @param {number} i
         * @returns {*}
         */
        buildObject: function(obj, nameField, valueField, i) {

            var arr = typeof nameField == 'string' ? ui.api.parseName(nameField) : nameField;

            for (var a = 0; a < i; a++) {
                delete arr[a];
            }

            if (arr.hasOwnProperty(i)) {

                var key = arr[i];
                delete arr[i];
                i++;

                if (Object.keys(arr).length == 0) {

                    if (!ui.api.empty(key, false)) {

                        key = Object.keys(obj).length;
                    }

                    obj[key] = valueField;

                } else {

                    if (!obj.hasOwnProperty(key)) {
                        obj[key] = {};
                    }

                    return this.buildObject(obj[key], arr, valueField, i);
                }
            }
        },

        /**
         * Parse name field
         * @param {string} string name[key1][key2]
         * @returns {[]} ['name', 'key1', 'ke21']
         */
        parseName: function(string) {

            string = string.replace(/]/g, '');
            return string.split('[');
        },

        /**
         * If "property" exist - return "value" else "defaultValue"
         * @param {{}} object
         * @param {string|number|null} property
         * @param {{}|string|number|boolean|null} defaultValue
         * @returns {{}|string|number|boolean}
         */
        existProperty: function(object, property, defaultValue) {

            if (object !== null && object.hasOwnProperty(property)) {

                return object[property];
            }

            return defaultValue;
        },

        /**
         * Set value field
         * @param {string|number} nameValue
         * @param {string} nameField
         * @param {string|number|boolean} defValue
         * @returns {string|number}
         * @public
         */
        setValue: function(nameValue, nameField, defValue) {

            defValue = ui.api.empty(defValue, '');

            if (typeof nameValue === 'object' && nameValue !== null) {

                return nameField in nameValue ? nameValue[nameField] : defValue;
            }

            nameValue = (typeof nameValue == 'boolean') ? Number(nameValue) : nameValue;
            return ui.api.empty(nameValue, defValue);
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

        /**
         * @param {Element} element
         */
        show: function(element) {

            if (element !== null) {

                element.style.visibility = 'visible';
            }
        },

        /**
         * @param {Element} element
         */
        hide: function(element) {

            if (element !== null) {

                element.style.visibility = 'hidden';
            }
        },

        /**
         * @param {Element} element
         */
        toggle: function(element) {

            if (element !== null) {

                if (element.style.visibility === 'hidden') {

                    element.style.visibility = 'visible';

                } else {

                    element.style.visibility = 'hidden';
                }
            }
        }
    };

} (window.ui || {}));