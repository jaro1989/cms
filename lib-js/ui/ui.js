
    (function(ui) {

        var TYPE_INPUT = [
            'text', 'password', 'image', 'button', 'checkbox', 'file', 'hidden', 'radio', 'reset', 'submit', 'week', 'url', 'time', 'tel', 'search', 'range', 'number', 'month', 'email', 'datetime-local', 'color', 'date', 'datetime'
        ];

        /**
         * @memberOf ui
         * @namespace ui.Element
         * @constructor
         */
        ui.Element = function(name) {
            /**
             * @type {Element}
             */
            this.element = document.createElement(name);
        };

        /** @protected */
        ui.Element.prototype = {

            /**
             * Set HTML ID in element
             * @param {string} elementId
             * @returns {ui.Element}
             * @public
             */
            setIdElement: function(elementId) {
                this.element.id = elementId;
                return this;
            },

            /**
             * Add HTML Class in element
             * @param {string} elementClass
             * @returns {ui.Element}
             * @public
             */
            addClassElement: function(elementClass) {
                this.element.classList.add(elementClass);
                return this;
            },

            /**
             * Set html class disabled and attribute disabled on element
             * @returns {ui.Element}
             * @public
             */
            setDisabledElement: function() {
                this.element.classList.add(ui.disabled);
                this.element.disabled = true;
                return this;
            },

            /**
             * Set html class icon
             * @param {string} iconName
             * @returns {ui.Element}
             * @public
             */
            setIconElement: function(iconName) {
                this.element.classList.add(ui.iconClass);
                this.element.classList.add(ui.iconClass + '-' + iconName);
                return this;
            },

            /**
             * Set type element input
             * @param {string} elementType {'text'|'password'|'image'|'button'|'checkbox'|'file'|'hidden'|'radio'|'reset'|'submit'|'week'|'url'|'time'|'tel'|'search'|'range'|'number'|'month'|'email'|'datetime-local'|'color'|'date'|'datetime'}
             * @returns {ui.Element}
             * @public
             */
            setInputType: function(elementType) {
                if (ui.findValueArray(TYPE_INPUT, elementType) == -1) {
                    elementType = 'text';
                }
                this.element.setAttribute('type', elementType);
                return this;
            },

            /**
             *
             * @param {string} type {'text'|'field'}
             * @param {string} skin {'disabled'|'active'|'success'|'warning'|'danger'|'info'|'link'|'default'|'error'|'primary'}
             * @returns {string|null}
             */
            getClassSkin: function(type, skin) {

                if (ui.skin.hasOwnProperty(skin)) {

                    if (type === 'text') {
                        return ui.prefix.text + '-' + ui.skin[skin];
                    } else if (type === 'field') {
                        return ui.prefix.field + '-' + ui.skin[skin];
                    }

                }

                return null;
            }

        };

    } (window.ui || {}));
