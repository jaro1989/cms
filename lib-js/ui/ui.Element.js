
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
             * Set html ID on element
             * @param {string|null} htmlId
             * @param {string|null} htmlName
             * @returns {ui.Element}
             * @public
             */
            setIdElement: function(htmlId, htmlName) {

                if (typeof htmlId === 'string') {

                    this.element.id = htmlId;

                } else if (htmlId === null) {

                    if (typeof htmlName === 'string') {

                        this.element.id = htmlName.replace('[', '-').replace(']', '');

                    }
                }
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
                this.element.classList.add(ui.CSS.disabledClass);
                this.element.setAttribute('disabled', 'disabled');
                return this;
            },

            /**
             * Set html class icon
             * @param {string} iconName
             * @returns {ui.Element}
             * @public
             */
            setIconElement: function(iconName) {
                this.element.classList.add(ui.CSS.iconClass);
                this.element.classList.add(ui.CSS.iconClass + '-' + iconName);
                return this;
            },

            /**
             * Set type element input
             * @param {string} elementType {'text'|'password'|'image'|'button'|'checkbox'|'file'|'hidden'|'radio'|'reset'|'submit'|'week'|'url'|'time'|'tel'|'search'|'range'|'number'|'month'|'email'|'datetime-local'|'color'|'date'|'datetime'}
             * @returns {ui.Element}
             * @public
             */
            setTypeElement: function(elementType) {
                if (ui.Lib.inArray(TYPE_INPUT, elementType) == -1) {
                    elementType = 'text';
                }
                this.element.setAttribute('type', elementType);
                return this;
            },

            /**
             * Set html class - skin element
             * @param {string|null} type {'default'|'text'|'field'|'panel'|'pagination'}
             * @param {string} skin {'disabled'|'active'|'success'|'warning'|'danger'|'info'|'link'|'default'|'error'|'primary'}
             * @returns {ui.Element}
             * @public
             */
            setSkinElement: function(type, skin) {
                var skinClass = null;

                if (ui.CSS.skinClass.hasOwnProperty(type) && ui.CSS.skinClass[type].hasOwnProperty(skin)) {

                    skinClass = ui.CSS.skinClass[type][skin];

                } else {

                    if (ui.CSS.skinClass.default.hasOwnProperty(skin)) {

                        if (type === 'text') {

                            skinClass = ui.CSS.prefixClass.text + '-' + ui.CSS.skinClass.default[skin];

                        } else if (type === 'field') {

                            skinClass = ui.CSS.prefixClass.field + '-' + ui.CSS.skinClass.default[skin];

                        } else {

                            skinClass = ui.CSS.skinClass.default[skin];
                        }

                    }
                }

                this.element.classList.add(skinClass);
                return this;
            },

            /**
             * Set html class - size element
             * @param {string} type {'input'|'pagination'|'button'}
             * @param {string} size {'lg'|'sm'|'xs'}
             * @returns {string}
             */
            setSizeElement: function(type, size) {

                if (ui.CSS.sizeClass.hasOwnProperty(type)) {

                    if (ui.CSS.sizeClass[type].hasOwnProperty(size)) {

                        this.element.classList.add(ui.CSS.sizeClass[type][size]);

                    }

                }

                return this;
            }
        };

    } (window.ui || {}));
