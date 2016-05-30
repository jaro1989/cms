    (function(HTML) {

        var TAG_DEFAULT = 'div';

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

        /**
         * @memberOf HTML
         * @namespace HTML.BuildTag
         * @constructor
         * @param {string} tagName
         * @param {boolean} tagClosed
         */
        HTML.BuildTag = function(tagName, tagClosed) {
            this._tagName = _basis.emptyValue(tagName, TAG_DEFAULT);
            this._tagClosed = _basis.emptyValue(tagClosed, true);

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

                'rowspan': 1,

                'colspan': 1
            };
        };

        /** @protected */
        HTML.BuildTag.prototype = {

            /**
             * Tag name
             *
             * @private
             * @type {string}
             */
            _tagName: TAG_DEFAULT,

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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
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
             * @returns {HTML.BuildTag}
             */
            appentTo: function(element) {
                $(element).append(this._buildTag());
                return this;
            }
        }

    } (window.HTML || {}));