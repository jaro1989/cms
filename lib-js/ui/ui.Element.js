
    (function(ui) {
        /**
         * @type {[]}
         */
        var TYPES_INPUT = ['text', 'password', 'image', 'button', 'checkbox', 'file', 'hidden', 'radio', 'reset', 'submit', 'week', 'url', 'time', 'tel', 'search', 'range', 'number', 'month', 'email', 'datetime-local', 'color', 'date', 'datetime'];

        var getStar = function() {

            return new ui.Element('span')
                .setContentElement(ui.Config.label.required)
                .addClassElement(ui.CSS.satrClass)
                .addStyleElement('color', ui.Config.label.colorStar)
                .toHTML();
        };

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
            this.tag_name = name;
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

                } else {

                    if (typeof htmlName === 'string') {

                        this.element.id = htmlName.replace('[', '-').replace(']', '');
                    }
                }

                return this;
            },

            /**
             * Set for in label
             * @param htmlId
             * @param {string|null} htmlName
             * @returns {ui.Element}
             */
            setForLabelElement: function(htmlId, htmlName) {

                if (ui.api.inArray(['label'], this.tag_name) != -1) {

                    if (typeof htmlId === 'string') {

                        this.element.setAttribute('for', htmlId);

                    } else {

                        if (typeof htmlName === 'string') {

                            this.element.setAttribute('for', htmlName.replace('[', '-').replace(']', ''));
                        }
                    }
                }

                return this;
            },

            /**
             * Set name field
             * @param {string} nameField
             * @returns {ui.Element}
             * @public
             */
            setNameElement: function(nameField) {

                if (ui.api.inArray(['input', 'textarea', 'select'], this.tag_name) != -1) {

                    this.element.setAttribute('name', nameField);
                }

                return this;
            },

            /**
             * Set value field
             * @param {string} nameValue
             * @param {string} nameField
             * @returns {ui.Element}
             * @public
             */
            setValueElement: function(nameValue, nameField) {

                if (ui.api.inArray(['input', 'textarea', 'select', 'option', 'button'], this.tag_name) != -1) {

                    this.element.value = ui.api.setValue(nameValue, nameField);
                }

                return this;
            },

            /**
             * Set html attribute checked on element
             * @param {boolean} status
             * @returns {ui.Element}
             * @public
             */
            setCheckedElement: function(status) {

                if (status === true && ui.api.inArray(['input'], this.tag_name) != -1) {

                    this.element.classList.add(ui.CSS.checkedClass);
                    this.element.setAttribute('checked', 'checked');
                }

                return this;
            },

            /**
             * Set html attribute selected on element
             * @param {boolean} status
             * @returns {ui.Element}
             * @public
             */
            setSelectedElement: function(status) {

                if (status === true && ui.api.inArray(['option'], this.tag_name) != -1) {

                    this.element.setAttribute('selected', 'selected');
                }

                return this;
            },

            /**
             * Set content in element
             * @param {string} caption
             * @param {boolean} required
             * @returns {ui.Element}
             * @public
             */
            setCaptionElement: function(caption, required) {

                this.element.innerHTML = caption;

                if (required) {

                    this.element.innerHTML += getStar();
                }

                this.element.innerHTML += ui.Config.label.separator + ' ';

                return this;
            },

            /**
             * Set content in element
             * @param {string} caption
             * @param {boolean} required
             * @returns {ui.Element}
             * @public
             */
            setCaptionRadioElement: function(caption, required) {

                if (required) {

                    this.element.innerHTML += getStar();
                }

                this.element.innerHTML += caption;

                return this;
            },

            /**
             * Set content in element
             * @param {string} contentElement
             * @returns {ui.Element}
             * @public
             */
            setContentElement: function(contentElement) {
                this.element.innerHTML = contentElement;
                return this;
            },

            /**
             * Add children element before
             * @param {ui.Element} element
             * @returns {ui.Element}
             * @public
             */
            addChildBefore: function(element) {
                this.element.insertBefore(element, this.element.firstChild);
                return this;
            },

            /**
             * Add children element after
             * @param {ui.Element} element
             * @returns {ui.Element}
             * @public
             */
            addChildAfter: function(element) {
                this.element.appendChild(element);
                return this;
            },

            /**
             * Add HTML Class in element
             * @param {string} elementClass
             * @returns {ui.Element}
             * @public
             */
            addClassElement: function(elementClass) {

                if (elementClass !== '') {

                    this.element.classList.add(elementClass);
                }

                return this;
            },

            /**
             * Set html class disabled and attribute disabled on element
             * @param {boolean} status
             * @returns {ui.Element}
             * @public
             */
            setDisabledElement: function(status) {

                if (status === true) {

                    this.element.classList.add(ui.CSS.disabledClass);
                    this.element.setAttribute('disabled', 'disabled');
                }

                return this;
            },



            /**
             * Set html class required and attribute required on element
             * @param {boolean} status
             * @returns {ui.Element}
             * @public
             */
            setRequiredElement: function(status) {

                if (status === true) {

                    this.element.classList.add(ui.CSS.requiredClass);
                    this.element.setAttribute('required', 'required');
                }

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
             * @param {string} elementType input = 'text'|'password'|'image'|'button'|'checkbox'|'file'|'hidden'|'radio'|'reset'|'submit'|'week'|'url'|'time'|'tel'|'search'|'range'|'number'|'month'|'email'|'datetime-local'|'color'|'date'|'datetime'
             *                             | link = text/css
             *                             | script = text/javascript
             * @returns {ui.Element}
             * @public
             */
            setTypeElement: function(elementType) {

                if (ui.api.inArray(['input', 'button'], this.tag_name) != -1) {

                    if (ui.api.inArray(TYPES_INPUT, elementType) == -1) {

                        elementType = 'text';
                    }

                    this.element.setAttribute('type', elementType);
                }

                if (ui.api.inArray(['link', 'script'], this.tag_name) != -1) {

                    this.element.setAttribute('type', elementType);
                }

                return this;
            },

            /**
             * Set url for element with tag name - "a|src|script|link"
             * @param {string} elementUrl
             * @returns {ui.Element}
             */
            setUrlElement: function(elementUrl) {

                if (ui.api.inArray(['a', 'link'], this.tag_name) != -1) {

                    this.element.setAttribute('href', elementUrl);
                }

                if (ui.api.inArray(['img', 'script'], this.tag_name) != -1) {

                    this.element.setAttribute('src', elementUrl);
                }

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

                        } else if (type === 'button') {

                            skinClass = ui.CSS.prefixClass.button + '-' + ui.CSS.skinClass.default[skin];

                        } else {

                            skinClass = ui.CSS.skinClass.default[skin];
                        }
                    }
                }

                if (skinClass !== null) {

                    this.element.classList.add(skinClass);
                }

                return this;
            },

            /**
             * Set html class - size element
             * @param {string} type {'input'|'pagination'|'button'}
             * @param {string} size {'lg'|'sm'|'xs'}
             * @returns {ui.Element}
             * @public
             */
            setSizeElement: function(type, size) {

                if (ui.CSS.sizeClass.hasOwnProperty(type)) {

                    if (ui.CSS.sizeClass[type].hasOwnProperty(size)) {

                        this.element.classList.add(ui.CSS.sizeClass[type][size]);

                    }
                }

                return this;
            },

            /**
             * Set html class - padding element
             * @param {string|null} padding { 'lg' | 'sm' | 'xs' }
             * @returns {ui.Element}
             */
            setPaddingElement: function(padding) {

                if (ui.CSS.paddingClass.hasOwnProperty(padding)) {

                    this.element.classList.add(ui.CSS.paddingClass[padding]);
                }

                return this;
            },

            /**
             * Set height element
             * @param {string|number} height
             * @returns {ui.FFTextarea}
             */
            setHeightElement: function(height) {

                if (typeof height == 'string') {

                    this.element.style.height = height;

                } if (typeof height == 'number') {

                    this.element.style.height = height  + 'px';
                }
                return this;
            },

            /**
             * Set width element
             * @param {string|number} elementWidth if value - string set attribut width
             *                                     if value - number set html class
             * @returns {ui.Element}
             */
            setWidthElement: function(elementWidth) {

                if (typeof elementWidth === 'number') {

                    this.element.classList.add(ui.CSS.widthClass + '-' + elementWidth);
                }

                if (typeof elementWidth === 'string') {

                    this.element.style.width = elementWidth;
                }

                return this;
            },

            /**
             *
             * @param {string} event
             * @param {string|function} fun
             * @param {boolean} useCapture
             */
            setEvent: function(event, fun, useCapture) {

                this.element.addEventListener('click',
                    function() {
                        alert('sada');
                    },
                    false
                );
                return this;
            },

            /**
             * Get clone current object
             * @returns {Node}
             */
            getClone: function() {

                return this.element.cloneNode(true);
            },

            /**
             * Add CSS style on element
             * @param {string} property
             * @param {string|number} value
             * @returns {ui.Element}
             */
            addStyleElement: function(property, value) {

                if (this.element.style.hasOwnProperty(property)) {

                    this.element.style[property] = value;
                }

                return this;
            },

            /**
             * Get current object
             * @returns {Element}
             * @public
             */
            getElement: function() {
                return this.element;
            },

            /**
             * Get html element
             * @returns {string}
             * @public
             */
            toHTML: function()  {
                return this.element.outerHTML;
            },

            /**
             * Add html in elements with "selector"
             * @param {string} selector
             * @returns {ui.Element}
             * @public
             */
            appendHTML: function(selector) {
                new ui.$(selector).append(this.element);
                return this;
            }
        };
    } (window.ui || {}));