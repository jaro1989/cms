
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.FFText
         * @param {string} value
         * @param {string} name
         * @constructor
         */
        ui.FFText = function (value, name) {
            /**
             * @private
             * @type {string|null}
             */
            this._name  = name;

            /**
             * @private
             * @type {string|null}
             */
            this._value = value;
        };

        /** @protected */
        ui.FFText.prototype = {

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
             * @type {string|null}
             */
            _label: null,

            /**
             * @private
             * @type {number|null}
             */
            _widthLabel: null,

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
            _padding: 'lg',

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
             * Set skin field
             * @param {string} sizeField { 'lg' | 'sm' }
             * @returns {ui.FFText}
             * @public
             */
            setSize: function(sizeField) {
                this._size = sizeField;
                return this;
            },

            /**
             * Set skin field
             * @param {string} skinName { 'success' | 'warning' | 'error' }
             * @returns {ui.FFText}
             * @public
             */
            setSkin: function(skinName) {
                this._skin = skinName;
                return this;
            },

            /**
             * Set left marker field
             * @param {string} textMarker
             * @returns {ui.FFText}
             * @public
             */
            setLeftMarker: function(textMarker) {
                this._leftMarker = textMarker;
                return this;
            },

            /**
             * Set right marker field
             * @param {string} textMarker
             * @returns {ui.FFText}
             * @public
             */
            setRightMarker: function(textMarker) {
                this._rightMarker = textMarker;
                return this;
            },

            /**
             * Set label field
             * @param {string} label
             * @returns {ui.FFText}
             * @public
             */
            setLabel: function(label) {
                this._label = label;
                return this;
            },

            /**
             * Set width label field {1-10}
             * @param {number} widthLabel {1-10}
             * @returns {ui.FFText}
             * @public
             */
            setWidthLabel: function(widthLabel) {
                this._widthLabel = widthLabel;
                return this;
            },

            /**
             * Set width block field
             * @param {number|string} width
             * @example
             *      {1-12 | '300px' | '30%'}
             * @returns {ui.FFText}
             * @public
             */
            setWidth: function(width) {
                this._width = width;
                return this;
            },

            /**
             * Set html ID field
             * @param {string} htmlId
             * @returns {ui.FFText}
             * @public
             */
            setId: function(htmlId) {
                this._id = htmlId;
                return this;
            },

            /**
             * Set html class padding
             * @param {string} padding { 'lg' | 'sm' | 'xs' }
             * @returns {ui.FFText}
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
            _buildLabel: function() {
                var label =  new ui.Element('label')
                    .addClassElement(ui.CSS.controlLabelClass)
                    .setForLabelElement(this._id)
                    .setContentElement(this._label + ': ');

                if (typeof this._widthLabel === 'number') {
                    label
                        .setWidthElement(this._widthLabel)
                        .addClassElement(ui.CSS.alignClass.text.right);
                }

                return label.getElement();
            },

            /**
             * Build html field
             * @returns {*|Element}
             * @private
             */
            _builInput: function() {
                return new ui.Element('input')
                    .setTypeElement('text')
                    .setNameElement(this._name)
                    .setIdElement(this._id, this._name)
                    .setValueElement(this._value, this._name)
                    .addClassElement(ui.CSS.formControlClass)
                    .getElement();
            },

            /**
             * Build html left marker
             * @returns {*|Element}
             * @private
             */
            _buildLeftMarker: function() {
                return new ui.Element('span')
                    .addClassElement(ui.CSS.inputGroupAddonClass)
                    .setContentElement(this._leftMarker)
                    .getElement();
            },

            /**
             * Build html right marker
             * @returns {*|Element}
             * @private
             */
            _buildRightMarker: function() {
                return new ui.Element('span')
                    .addClassElement(ui.CSS.inputGroupAddonClass)
                    .setContentElement(this._rightMarker)
                    .getElement();
            },

            /**
             * Build html block group
             * @returns {*|Element}
             * @private
             */
            _buildGroupBlock: function() {

                var inputGroup = new ui.Element('div')
                    .setSizeElement('input', this._size)
                    .addChildAfter(this._builInput());

                if (this._leftMarker !== null || this._rightMarker !== null) {
                    inputGroup.addClassElement(ui.CSS.inputGroupClass);
                }

                if (typeof this._widthLabel === 'number') {
                    inputGroup.setWidthElement(12 - this._widthLabel);
                }

                if (this._leftMarker !== null) {
                    inputGroup.addChildBefore(this._buildLeftMarker());
                }

                if (this._rightMarker !== null) {
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
                    .setSkinElement('field', this._skin)
                    .addChildBefore(this._buildGroupBlock())
                    .setPaddingElement(this._padding);

                if (this._label !== null) {
                    parentElement.addChildBefore(this._buildLabel());
                }

                if (this._width !== null) {
                    parentElement.setWidthElement(this._width);
                }

                return parentElement.getElement();
            },

            /**
             * Get object current element
             * @returns {*|Element}
             */
            getElement: function() {
                return this._buildParentBlock();
            },

            /**
             * Get html current element
             * @returns {string}
             */
            toHTML: function() {
                return this._buildParentBlock().outerHTML;
            },

            /**
             * Add element in document
             * @param {string} selector
             * @returns {ui.FFText}
             */
            appendHTML: function(selector) {
                new ui.$(selector).append(this.getElement());
                return this;
            }
        };
    } (window.ui || {}));