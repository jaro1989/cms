    
    (function(ui) {
    
        /**
         * @memberOf ui
         * @namespace ui.FFSelect
         * @param {string|null} value
         * @param {string|null} name
         * @param {string|null} caption
         * @constructor
         */
        ui.FFSelect = function (value, name, caption) {
    
            this._value   = ui.api.empty(value, null);
            this._name    = ui.api.empty(name, null);
            this._caption = ui.api.empty(caption, null);
            this._items   = {};
        };
    
        /** @protected */
        ui.FFSelect.prototype = {
    
            /**
             * @private
             * @type {string|null}
             */
            _leftIcon: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _rightIcon: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _leftMarker: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _rightMarker: null,
    
            /**
             * @private
             * @type {number|null}
             */
            _widthCaption: null,
    
            /**
             * @private
             * @type {string|number|null}
             */
            _width: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _id: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _padding: ui.Config.padding,
    
            /**
             * @private
             * @type {string|null}
             */
            _skin: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _size: null,
    
            /**
             * @private
             * @type {boolean}
             */
            _disabled: false,
    
            /**
             * @private
             * @type {boolean}
             */
            _required: false,

            /**
             *
             * Set data list
             * @param {[]|{}} data [ 'valu-1', 'valu-2', 'valu-3', ... ]
             * @returns {ui.FFSelect}
             */
            setList: function(data) {
                this._items = data;
                return this;
            },

            /**
             * Add item in list
             * @param {string|number} value
             * @param {string|number} text
             * @returns {ui.FFSelect}
             */
            addItem: function(value, text) {
                this._items[value] = text;
                return this;
            },
    
            /**
             * Set required field
             * @param {boolean} required
             * @returns {ui.FFSelect}
             */
            setRequired: function(required) {
                this._required = ui.api.empty(required, true);
                return this;
            },
    
            /**
             * Set disables field
             * @returns {ui.FFSelect}
             */
            setDisabled: function() {
                this._disabled = true;
                return this;
            },
    
            /**
             * Set skin field
             * @param {string} sizeField { 'lg' | 'sm' }
             * @returns {ui.FFSelect}
             * @public
             */
            setSize: function(sizeField) {
                this._size = sizeField;
                return this;
            },
    
            /**
             * Set skin field
             * @param {string} skinName { 'success' | 'warning' | 'error' }
             * @returns {ui.FFSelect}
             * @public
             */
            setSkin: function(skinName) {
                this._skin = skinName;
                return this;
            },
    
            /**
             * Set left marker field
             * @param {string} textMarker
             * @returns {ui.FFSelect}
             * @public
             */
            setLeftMarker: function(textMarker) {
                this._leftMarker = textMarker;
                return this;
            },
    
            /**
             * Set right marker field
             * @param {string} textMarker
             * @returns {ui.FFSelect}
             * @public
             */
            setRightMarker: function(textMarker) {
                this._rightMarker = textMarker;
                return this;
            },
    
            /**
             * Set left icon field
             * @param {string} iconName
             * @returns {ui.FFSelect}
             * @public
             */
            setLeftIcon: function(iconName) {
                this._leftIcon = iconName;
                return this;
            },
    
            /**
             * Set right icon field
             * @param {string} iconName
             * @returns {ui.FFSelect}
             * @public
             */
            setRightIcon: function(iconName) {
                this._rightIcon = iconName;
                return this;
            },
    
            /**
             * Set width label field {1-10}
             * @param {number} widthCaption {1-10}
             * @returns {ui.FFSelect}
             * @public
             */
            setWidthCaption: function(widthCaption) {
                this._widthCaption = widthCaption;
                return this;
            },
    
            /**
             * Set width block field
             * @param {number|string} width
             * @example
             *      {1-12 | '300px' | '30%'}
             * @returns {ui.FFSelect}
             * @public
             */
            setWidth: function(width) {
                this._width = width;
                return this;
            },
    
            /**
             * Set html ID field
             * @param {string} htmlId
             * @returns {ui.FFSelect}
             * @public
             */
            setId: function(htmlId) {
                this._id = htmlId;
                return this;
            },
    
            /**
             * Set html class padding
             * @param {string} padding { 'lg' | 'sm' | 'xs' }
             * @returns {ui.FFSelect}
             * @public
             */
            setPadding: function(padding) {
                this._padding = padding;
                return this;
            },
    
            /**
             * Build html label
             * @returns {*|Element}
             * @private
             */
            _buildCaption: function() {
    
                var label =  new ui.Element('label')
                    .addClassElement(ui.CSS.controlLabelClass)
                    .setForLabelElement(this._id, this._name)
                    .setCaptionElement(this._caption, this._required);
    
                if (typeof this._widthCaption === 'number') {
    
                    label
                        .setWidthElement(this._widthCaption)
                        .addClassElement(ui.CSS.alignClass.text.right);
                }
    
                return label.getElement();
            },

            /**
             * Build html option
             * @param {string|number} value
             * @param {string|number} text
             * @returns {*|Element}
             * @private
             */
            _buildItem: function(value, text) {

                var option = new ui.Element('option')
                    .setValueElement(value, null)
                    .setContentElement(text);

                if (ui.api.setValue(this._value, this._name) == value) {

                    option.setSelectedElement(true);
                }

                return option.getElement();
            },
    
            /**
             * Build html field
             * @returns {*|Element}
             * @private
             */
            _buildField: function() {
    
                var setect = new ui.Element('select')
                    .setNameElement(this._name)
                    .setIdElement(this._id, this._name)
                    .addClassElement(ui.CSS.formControlClass)
                    .setDisabledElement(this._disabled)
                    .setRequiredElement(this._required);

                for(var value in this._items) {

                    setect.addChildAfter(this._buildItem(value, this._items[value]));
                }

                return setect.getElement();
            },
    
            /**
             * Build html left marker
             * @returns {*|Element}
             * @private
             */
            _buildLeftMarker: function() {
    
                var leftMarker = new ui.Element('span')
                    .addClassElement(ui.CSS.inputGroupAddonClass)
                    .setContentElement(this._leftMarker);
    
                if (typeof this._leftIcon === 'string') {
    
                    leftMarker
                        .addChildBefore(
                            new ui.Element('span')
                                .setIconElement(this._leftIcon)
                                .getElement()
                        )
    
                }
    
                return leftMarker.getElement();
            },
    
            /**
             * Build html right marker
             * @returns {*|Element}
             * @private
             */
            _buildRightMarker: function() {
    
                var rightMarker = new ui.Element('span')
                    .addClassElement(ui.CSS.inputGroupAddonClass)
                    .setContentElement(this._rightMarker);
    
                if (typeof this._rightIcon === 'string') {
    
                    rightMarker
                        .addChildAfter(
                            new ui.Element('span')
                                .setIconElement(this._rightIcon)
                                .getElement()
                        )
    
                }
    
                return rightMarker.getElement();
            },
    
            /**
             * Build html block group
             * @returns {*|Element}
             * @private
             */
            _buildGroupBlock: function() {
    
                var inputGroup = new ui.Element('div')
                    .setSizeElement('input', this._size)
                    .addChildAfter(this._buildField());
    
                if (
                    this._leftMarker  !== null  ||
                    this._rightMarker !== null  ||
                    this._rightIcon   !== null  ||
                    this._leftIcon    !== null
                ) {
                    inputGroup.addClassElement(ui.CSS.inputGroupClass);
                }
    
                if (typeof this._widthCaption === 'number') {
    
                    inputGroup.setWidthElement(12 - this._widthCaption);
                }
    
                if (this._leftMarker !== null || this._leftIcon !== null) {
    
                    inputGroup.addChildBefore(this._buildLeftMarker());
                }
    
                if (this._rightMarker !== null || this._rightIcon !== null) {
    
                    inputGroup.addChildAfter(this._buildRightMarker())
                }
    
                return inputGroup.getElement();
            },
    
            /**
             * Build html prent block
             * @returns {*|Element}
             * @private
             */
            _buildParentBlock: function() {
    
                var parentElement = new ui.Element('div')
                    .addClassElement(ui.CSS.validateFieldBlockClass)
                    .setSkinElement('field', this._skin)
                    .addChildBefore(this._buildGroupBlock())
                    .setPaddingElement(this._padding);
    
                if (this._caption !== null) {
    
                    parentElement.addChildBefore(this._buildCaption());
                }
    
                if (this._width !== null) {
    
                    parentElement.setWidthElement(this._width);
                }
    
                return parentElement.getElement();
            },
    
            /**
             * Get object current element
             * @returns {*|Element}
             * @public
             */
            getElement: function() {
                return this._buildParentBlock();
            },
    
            /**
             * Get html current element
             * @returns {string}
             * @public
             */
            toHTML: function() {
                return this._buildParentBlock().outerHTML;
            },
    
            /**
             * Add element in document
             * @param {string} selector
             * @returns {ui.FFSelect}
             * @public
             */
            appendHTML: function(selector) {
                new ui.$(selector).append(this.getElement());
                return this;
            }
        };
    } (window.ui || {}));