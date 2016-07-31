
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
         * @returns {ui.$}
         */
        before: function(contentElement) {

            this.elements.insertBefore(contentElement, this.elements.firstChild);
            return this;
        },

        /**
         * @returns {ui.$}
         */
        append: function(contentElement) {

            this.elements.appendChild(contentElement);
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
         *
         * @param {{}} obj
         * @param {[]} arr
         * @param {{}|[]|string|number|null} val
         * @param {number} i
         * @returns {*}
         */
        buildObject: function(obj, arr, val, i) {

            for (var a = 0; a < i; a++) {
                delete arr[a];
            }

            if (arr.hasOwnProperty(i)) {

                var key = arr[i];
                delete arr[i];
                i++;

                if (Object.keys(arr).length == 0) {

                    if (!ui.api.empty(key, false)) {
                        //console.log(key, obj, Object.keys(obj).length);
                        key = Object.keys(obj).length;
                    }
                    obj[key] = val;

                } else {

                    if (!obj.hasOwnProperty(key)) {
                        //console.log(key);
                        obj[key] = {};
                    }

                    return this.buildObject(obj[key], arr, val, i);
                }
            }
        },

        /**
         * Parse name field
         * @param {string} name
         * @returns {[]}
         */
        parseName: function(name) {

            name = name.replace(/]/g, '');
            return name.split('[');
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