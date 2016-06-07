    (function(ui) {

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {ui.Basis}
         */
        var _basis = new ui.Basis();

        /**
         * @memberOf ui
         * @namespace ui.Tag
         * @constructor
         * @param {string} tagName
         * @param {boolean} tagClosed
         */
        ui.Tag = function(tagName, tagClosed) {

            /**
             * Tag name
             *
             * @private
             * @type {string}
             */
            this._tagName   = tagName;

            /**
             * Tag closed or open
             *
             * @private
             * @type {boolean}
             */
            this._tagClosed = tagClosed;

            /**
             * List attributes
             *
             * @private
             * @type {object}
             */
            this._attr = {
                'id': null,

                'class': null,

                'name': null,

                'disabled': null,

                'href': null,

                'type': null,

                'value': null,

                'placeholder': null,

                'onclick': null,

                'checked': null,

                'action': null,

                'method': null,

                'required': null,

                'for': null,

                'style': null,

                'rowspan': null,

                'colspan': null
            };
        };

        /** @protected */
        ui.Tag.prototype = {

            /**
             * Open tag or closed
             *
             * @private
             * @type {boolean}
             */
            _tagClosed: true,

            /**
             * Tag contents
             *
             * @private
             * @type {string|null}
             */
            _tagContent: null,

            getStyle: function() {
                return this._attr.style;
            },

            /**
             * Set attribute "style"
             *
             * @public
             * @param {number} style
             * @returns {ui.Tag}
             */
            setStyle: function(style) {
                this._attr.style = style;
                return this;
            },

            getColspan: function() {
                return this._attr.colspan;
            },

            /**
             * Set attribute "colspan"
             *
             * @public
             * @param {number} colspan
             * @returns {ui.Tag}
             */
            setColspan: function(colspan) {
                this._attr.colspan = colspan;
                return this;
            },

            getRowspan: function() {
                return this._attr.rowspan;
            },


            /**
             * Set attribute "rowspan"
             *
             * @public
             * @param {number} rowspan
             * @returns {ui.Tag}
             */
            setRowspan: function(rowspan) {
                this._attr.rowspan = rowspan;
                return this;
            },

            getAttributes: function() {
                return this._attr;
            },

            /**
             * Set attributes
             *
             * @public
             * @param {object} attributes
             * @returns {ui.Tag}
             */
            setAttributes: function(attributes) {
                if (typeof attributes === 'object') {
                    var currentObj = this;
                    $.each(attributes, function(attrName, attrValue) {
                        if (currentObj._attr.hasOwnProperty(attrName)) {
                            currentObj._attr[attrName] = attrValue;
                        }
                    });
                }
                return this;
            },

            /**
             * Set data in tag
             *
             * @public
             * @param {string} data
             * @returns {ui.Tag}
             */
            setContent: function(data) {
                this._tagContent = data;
                return this;
            },

            getId: function() {
                return this._attr.id;
            },

            /**
             * Set attribute "id"
             *
             * @public
             * @param {string} htmlId
             * @param {string|null} nameField
             * @returns {ui.Tag}
             */
            setId: function(htmlId, nameField) {
                if (typeof htmlId === 'string') {

                    this._attr.id = htmlId;
                } else {

                    if (typeof nameField === 'string') {

                        this._attr.id = nameField
                            .replace(/\[/g, '_')
                            .replace(/\]/g, '');
                    }
                }
                return this;
            },

            getClass: function() {
                return this._attr.class;
            },


            /**
             * Set attribute "class"
             *
             * @public
             * @param {string} htmlClass
             * @returns {ui.Tag}
             */
            setClass: function(htmlClass) {
                this._attr.class = htmlClass;
                return this;
            },


            /**
             * Add attribute "class"
             *
             * @public
             * @param {string|null} htmlClass
             * @returns {ui.Tag}
             */
            addClass: function(htmlClass) {
                this._attr.class = _basis.emptyValue(this._attr.class, '') + ' ' + _basis.emptyValue(htmlClass, '');
                return this;
            },

            getName: function() {
                return this._attr.name;
            },

            /**
             * Set attribute "name"
             *
             * @public
             * @param {string} fieldName
             * @returns {ui.Tag}
             */
            setName: function(fieldName) {
                this._attr.name = fieldName;
                return this;
            },

            getDisabled: function() {
                return this._attr.disabled;
            },

            /**
             * Set attribute "disabled"
             *
             * @public
             * @param {boolean} state
             * @returns {ui.Tag}
             */
            setDisabled: function(state) {
                if (state === true) {
                    this._attr.disabled = 'disabled';
                } else {
                    this._attr.disabled = null;
                }
                return this;
            },

            getHref: function() {
                return this._attr.href;
            },

            /**
             * Set attribute "href"
             *
             * @public
             * @param {string} link
             * @returns {ui.Tag}
             */
            setHref: function(link) {
                this._attr.href = link;
                return this;
            },

            getType: function() {
                return this._attr.type;
            },

            /**
             * Set attribute "type"
             *
             * @public
             * @param {string} typeField
             * @returns {ui.Tag}
             */
            setType: function(typeField) {
                this._attr.type = typeField;
                return this;
            },

            getValue: function() {
                return this._attr.value;
            },

            /**
             * Set attribute "value"
             *
             * @public
             * @param {string|number|boolean} value
             * @returns {ui.Tag}
             */
            setValue: function(value) {
                this._attr.value = value;
                return this;
            },

            getPlaceholder: function() {
                return this._attr.placeholder;
            },

            /**
             * Set attribute "placeholder"
             *
             * @public
             * @param {string|number} placeholder
             * @returns {ui.Tag}
             */
            setPlaceholder: function(placeholder) {
                this._attr.placeholder = placeholder;
                return this;
            },

            getOnclick: function() {
                return this._attr.onclick;
            },

            /**
             * Set attribute "onclick"
             *
             * @public
             * @param {string} dataCallback
             * @returns {ui.Tag}
             */
            setOnclick: function(dataCallback) {
                this._attr.onclick = dataCallback;
                return this;
            },

            getChecked: function() {
                return this._attr.checked;
            },

            /**
             * Set attribute "checked"
             *
             * @public
             * @param {boolean} state
             * @returns {ui.Tag}
             */
            setChecked: function(state) {
                if (state === true) {
                    this._attr.checked = 'checked';
                } else {
                    this._attr.checked = null;
                }
                return this;
            },

            getAction: function() {
                return this._attr.action;
            },

            /**
             * Set attribute "action"
             *
             * @public
             * @param {string} link
             * @returns {ui.Tag}
             */
            setAction: function(link) {
                this._attr.action = link;
                return this;
            },

            getMethod: function() {
                return this._attr.method;
            },

            /**
             * Set attribute "method"
             *
             * @public
             * @param {string} method
             * @returns {ui.Tag}
             */
            setMethod: function(method) {
                this._attr.method = method;
                return this;
            },

            getRequired: function() {
                return this._attr.required;
            },

            /**
             * Set attribute "required"
             *
             * @public
             * @param {boolean} state
             * @returns {ui.Tag}
             */
            setRequired: function(state) {
                if (state === true) {
                    this._attr.required = 'required';
                } else {
                    this._attr.required = null;
                }
                return this;
            },

            getFor: function() {
                return this._attr.for;
            },

            /**
             * Set attribute "for"
             *
             * @public
             * @param {string|number} htmlId
             * @param {string} nameField
             * @returns {ui.Tag}
             */
            setFor: function(htmlId, nameField) {
                if (typeof htmlId === 'string') {

                    this._attr.for = htmlId;
                } else {

                    if (typeof nameField === 'string') {

                        this._attr.for = nameField
                            .replace(/\[/g, '_')
                            .replace(/\]/g, '');
                    }
                }
                return this;
            },

            /**
             * Get string with attributes
             *
             * @private
             * @returns {string} string with html attributes
             */
            _getStringAttr: function() {
                var str = '';
                $.each(this._attr, function(attrName, attrValue) {

                    var value = _basis.emptyValue(attrValue, '');
                    if (typeof value === 'string') {

                        value = value.replace(/\s{2,}/g, ' ').trim();
                        if (value !== '') {
                            str += attrName + '="' + value + '" ';
                        }

                    } else {
                        str += attrName + '="' + value + '" ';
                    }

                });
                if (str !== '') {
                    str = ' ' + str.trim();
                }
                return str;
            },

            /**
             * Build html tag
             *
             * @private
             * @returns {string} Html tag
             */
            _buildTag: function() {
                var element = '';
                if (typeof this._tagName === 'string') {

                    element = '<' + this._tagName + this._getStringAttr() + '>';
                    element += _basis.emptyValue(this._tagContent, '');

                    if (this._tagClosed === true) {
                        element += '</' + this._tagName + '>';
                    }
                }
                return element;
            },

            /**
             * Compiles and returns HTML tag
             *
             * @public
             * @returns {string} Html tag
             */
            toHTML: function() {
                return this._buildTag();
            },

            /**
             * Compiles and appends HTML tag in elements "element"
             *
             * @public
             * @param {string} element {This table will be added in element "element"}
             * @returns {ui.Tag}
             */
            appentTo: function(element) {
                $(element).append(this._buildTag());
                return this;
            }
        }

    } (window.HTML || {}));