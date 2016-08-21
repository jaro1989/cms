
    (function(ui) {
        'use strict';

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

        var getError = function() {

            return new ui.Element('small')
                .addClassElement(ui.CSS.validateErrorClass)
                .addClassElement(ui.CSS.prefixClass.text + '-' + ui.CSS.skinClass.default.danger)
                .toHTML()
        };

        /**
         * @param {string} str {name[0][key]| name | name[key][0][name][key][2]}
         * @returns {string}
         */
        var parseName = function(str) {

            return str.replace(/\[/g, '_').replace(/\]/g, '');
        };

        /**
         * @memberOf ui
         * @namespace ui.Element
         * @constructor
         */
        ui.Element = function(name) {

            /**
             * @type {Node}
             */
            this.element = document.createElement(name);
            this.tag_name = name;
        };

        /** @protected */
        ui.Element.prototype = {

            _thead: null,
            _tbody: null,
            _tfoot: null,
            _tr:    null,
            _th:    null,
            _td:    null,

            /**
             *
             * @param {string|null} action
             * @returns {ui.Element}
             */
            setOnClick: function(action) {

                action = ui.api.empty(action, false);

                if (action !== false) {

                    this.element.setAttribute('onclick', action);
                }

                return this;
            },

            /**
             * Add row table head
             * @param {number} index
             * @returns {ui.Element}
             * @public
             */
            addRowHead: function(index) {

                if (this._thead === null) {

                    this._thead = this.element.createTHead();
                }

                this._tr = this._thead.insertRow(ui.api.empty(index, 0));

                return this;
            },

            /**
             * Add cell table head
             * @param {string|null} content
             * @param {number|null} index
             * @returns {ui.Element}
             * @public
             */
            addCellHead: function(content, index) {

                this._th = this._tr.insertCell(ui.api.empty(index, 0));
                this._th.innerHTML = ui.api.empty(content, '');

                return this;
            },

            /**
             * Add block table body
             * @returns {ui.Element}
             * @public
             */
            addBlockBody: function() {

                this._tbody = this.element.appendChild(document.createElement('tbody'));
                return this;
            },

            /**
             * Add row table body
             * @param {number} index
             * @returns {ui.Element}
             * @public
             */
            addRowBody: function(index) {


                if (this._tbody === null) {
                    this.addBlockBody();
                }

                this._tr = this._tbody.insertRow(ui.api.empty(index, 0));

                return this;
            },

            /**
             * Add cell table body
             * @param {string|null} content
             * @param {number|null} index
             * @returns {ui.Element}
             * @public
             */
            addCellBody: function(content, index) {

                this._td = this._tr.insertCell(ui.api.empty(index, this._tr.children.length));
                this._td.innerHTML = ui.api.empty(content, '');
                return this;
            },

            /**
             *
             * @param {string} type {'table' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'th' | 'td'}
             * @param {string} attrName
             * @param {string|number|null} value
             * @returns {ui.Element}
             */
            addAttrTable: function(type, attrName, value) {

                if (value !== null) {

                    if (type === 'table') {

                        this.element.setAttribute(attrName, value);

                    } else if (type === 'thead') {

                        this._thead.setAttribute(attrName, value);

                    } else if (type === 'tbody') {

                        this._tbody.setAttribute(attrName, value);

                    } else if (type === 'tfoot') {

                        this._tfoot.setAttribute(attrName, value);

                    } else if (type === 'tr') {

                        this._tr.setAttribute(attrName, value);

                    } else if (type === 'th') {

                        this._th.setAttribute(attrName, value);

                    } else if (type === 'td') {

                        this._td.setAttribute(attrName, value);

                    }
                }

                return this;
            },

            /**
             *
             * @param {string} type {'table' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'th' | 'td'}
             * @param {string} attrName
             * @param {string|number} value
             * @returns {ui.Element}
             */
            addStyleTable: function(type, attrName, value) {

                var element = {};

                if (type === 'table') {

                    element = this.element;

                } else if (type === 'thead') {

                    element = this._thead;

                } else if (type === 'tbody') {

                    element = this._tbody;

                } else if (type === 'tfoot') {

                    element = this._tfoot;

                } else if (type === 'tr') {

                    element = this._tr;

                } else if (type === 'th') {

                    element = this._th;

                } else if (type === 'td') {

                    element = this._td;

                }

                if (element.style.hasOwnProperty(attrName)) {

                    element.style[attrName] = value;
                }

                return this;
            },

            /**
             * Set html ID on element
             * @param {string|number|null} htmlId
             * @param {string|null} htmlName
             * @returns {ui.Element}
             * @public
             */
            setIdElement: function(htmlId, htmlName) {

                if (typeof htmlId === 'string' || typeof htmlId === 'number') {

                    this.element.id = htmlId;

                } else {

                    if (typeof htmlName === 'string') {

                        this.element.id = parseName(htmlName);
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

                            this.element.setAttribute('for', parseName(htmlName));
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

                if (ui.api.inArray(['input', 'textarea', 'select', 'button', 'submit'], this.tag_name) != -1 && nameField !== null) {
                    nameField = nameField.replace(/-/g, "_");
                    this.element.setAttribute('name', nameField);
                }

                return this;
            },

            /**
             * Set value field
             * @param {string|number|null} nameValue
             * @param {string|number|null} nameField
             * @returns {ui.Element}
             * @public
             */
            setValueElement: function(nameValue, nameField) {

                var value = ui.api.setValue(nameValue, nameField);

                if (ui.api.inArray(['input', 'select', 'option', 'button'], this.tag_name) != -1) {

                    if (value != '') {

                        this.element.setAttribute('value', value);
                    }
                } else if (ui.api.inArray(['textarea'], this.tag_name) != -1) {

                    if (value != '') {

                        this.element.innerHTML = value;
                    }
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

                if (ui.api.empty(caption, false)) {

                    this.element.innerHTML += ui.Config.label.separator + ' ';
                }

                if (required) {

                    this.element.innerHTML += getError();
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
            setCaptionRadioElement: function(caption, required) {

                if (required) {

                    this.element.innerHTML += getStar();
                }

                if (ui.api.empty(caption, false)) {

                    this.element.innerHTML += caption;
                }

                if (required) {

                    this.element.innerHTML += getError();
                }

                return this;
            },

            /**
             * Set content in element
             * @param {string|number|null} contentElement
             * @returns {ui.Element}
             * @public
             */
            setContentElement: function(contentElement) {

                if (contentElement !== null) {

                    this.element.innerHTML = contentElement;
                }

                return this;
            },

            /**
             * Add children element before
             * @param {Node} element
             * @returns {ui.Element}
             * @public
             */
            addChildBefore: function(element) {
                this.element.insertBefore(element, this.element.firstChild);
                return this;
            },

            /**
             * Add children element after
             * @param {Node} element
             * @returns {ui.Element}
             * @public
             */
            addChildAfter: function(element) {
                this.element.appendChild(element);
                return this;
            },

            /**
             * Add HTML Class in element
             * @param {string|null} elementClass
             * @returns {ui.Element}
             * @public
             */
            addClassElement: function(elementClass) {

                if (elementClass !== '' && elementClass !== null) {

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
             * Set a text field to read-only
             * @returns {ui.Element}
             */
            setReadOnly: function() {

                this.element.readOnly = true;
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
             *
             * @param {string} attrName
             * @param {string|number|boolean|null} attrValue
             * @returns {ui.Element}
             * @public
             */
            setAttrElement: function(attrName, attrValue) {

                if (attrValue !== null) {

                    this.element.setAttribute(attrName, attrValue);
                }

                return this;
            },

            /**
             * Set html class - skin element
             * @param {string|null} type {'button'|'default'|'text'|'field'|'panel'|'pagination'}
             * @param {string|null} skin {'disabled'|'active'|'success'|'warning'|'danger'|'info'|'link'|'default'|'error'|'primary'|'muted'}
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
             * Set html class - Psition element
             * @param {string|null} psition { 'legt' | 'right' | 'center' | 'clear' | null }
             * @returns {ui.Element}
             */
            setPsitionElement: function(psition) {

                if (ui.CSS.alignClass.block.hasOwnProperty(psition)) {

                    this.element.classList.add(ui.CSS.alignClass.block[psition]);
                }

                return this;
            },

            /**
             * Set height element
             * @param {string|number} height
             * @returns {ui.Element}
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

                this.element.style[property] = value;
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

                new ui.dom(selector).append(this.element);
                return this;
            }
        };
    } (window.ui || {}));
