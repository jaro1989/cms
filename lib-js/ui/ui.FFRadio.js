
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.FFRadio
         * @param {{}|string|null} value
         * @param {string|null} name
         * @param {{}} radioList {'htmlId1' => 'caption1', 'htmlId2' => 'caption2', ...}
         * @constructor
         */
        ui.FFRadio = function (value, name, radioList) {

            this._value      = ui.api.setValue(ui.api.empty(value, null), name);
            this._name       = ui.api.empty(name, null);
            this._radioList  = ui.api.empty(radioList, null);
            this._disabledIf = [];
        };

        /** @protected */
        ui.FFRadio.prototype = {

            /**
             * @private
             * @type {string|null}
             */
            _skin: null,

            /**
             * @private
             * @type {string|number|null}
             */
            _width: null,

            /**
             * @private
             * @type {string|number|null}
             */
            _widthCaptionBlock: null,

            /**
             * @private
             * @type {string|number|null}
             */
            _widthCaptionItem: null,

            /**
             * @private
             * @type {boolean}
             */
            _horizontal: false,

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
             * @private
             * @type {string|null}
             */
            _caption: null,

            /**
             * @private
             * @type {string|null}
             */
            _padding: ui.Config.padding,

            /**
             * @param {string|number|null} caption
             * @param {string|number|null} widthCaption
             * @returns {ui.FFRadio}
             */
            setCaptionBlock: function(caption, widthCaption) {

                this._caption = caption;
                this._widthCaptionBlock = widthCaption;
                return this;
            },

            /**
             * Set width label item field {1-10}
             * @param {string|number|null} widthCaptionItem {1-10}
             * @returns {ui.FFRadio}
             * @public
             */
            setWidthCaptionItem: function(widthCaptionItem) {
                this._widthCaptionItem = widthCaptionItem;
                return this;
            },

            /**
             * Set required field
             * @param {boolean} required
             * @returns {ui.FFRadio}
             */
            setRequired: function(required) {
                this._required = ui.api.empty(required, true);
                return this;
            },

            /**
             * Set disables field
             * @returns {ui.FFRadio}
             */
            setDisabled: function() {
                this._disabled = true;
                return this;
            },

            /**
             * Set disables field
             * @param {string} htmlId
             * @returns {ui.FFRadio}
             */
            setDisabledIf: function(htmlId) {
                this._disabledIf.push(htmlId);
                return this;
            },

            /**
             * Add radio button
             * @param {string} htmlId
             * @param {string} caption
             * @returns {ui.FFRadio}
             * @public
             */
            addRadioButton: function(htmlId, caption) {
                this._radioList[htmlId] = caption;
                return this;
            },

            /**
             * draw fields horizontal
             * @returns {ui.FFRadio}
             * @public
             */
            setFieldsHorizontal: function() {
                this._horizontal = true;
                return this;
            },

            /**
             * Set width block field
             * @param {number|string} width
             * @example
             *      {1-12 | '300px' | '30%'}
             * @returns {ui.FFRadio}
             * @public
             */
            setWidth: function(width) {
                this._width = width;
                return this;
            },

            /**
             * Set skin field
             * @param {string} skinName { 'success' | 'warning' | 'error' }
             * @returns {ui.FFRadio}
             * @public
             */
            setSkin: function(skinName) {
                this._skin = skinName;
                return this;
            },

            /**
             * Build html field
             * @param {string|number} htmlId
             * @returns {*|Element}
             * @private
             */
            _buildField: function(htmlId) {

                var radio = new ui.Element('input')
                    .setTypeElement('radio')
                    .setNameElement(this._name)
                    .addClassElement(this._name)
                    .setValueElement(htmlId, this._name)
                    .setDisabledElement(this._disabled)
                    .setRequiredElement(this._required);

                if (ui.api.inArray(this._disabledIf, htmlId) != -1) {

                    radio.setDisabledElement(true);
                }

                if (htmlId == this._value) {

                    radio
                        .setIdElement(null, this._name)
                        .setCheckedElement(true);
                }

                return radio.getElement();
            },

            /**
             * Build html label block
             * @returns {*|Element}
             * @private
             */
            _buildCaptionBlock: function() {

                var label = new ui.Element('div')
                    .addChildAfter(
                        new ui.Element('label')
                            .setCaptionElement(this._caption, (this._required && ui.api.empty(this._caption, false)))
                            .getElement()
                    );

                if (typeof this._widthCaptionBlock === 'number') {

                    label
                        .setWidthElement(this._widthCaptionBlock)
                        .addClassElement(ui.CSS.alignClass.text.right);
                }

                return label.getElement();
            },

            /**
             * Build html label
             * @param {string|number} htmlId
             * @param {string|number} caption
             * @returns {*|Element}
             * @private
             */
            _buildCaptionItem: function(htmlId, caption) {

                var label = new ui.Element('label')
                    .addChildAfter(
                        new ui.Element('span')
                            .getElement()
                    );

                if (this._required && ui.api.empty(this._caption, false)) {

                    label.setContentElement(caption);

                } else {

                    label.setCaptionRadioElement(caption, this._required);
                }

                if (typeof this._widthCaptionItem === 'number') {

                    label.setWidthElement(this._widthCaptionItem);
                }

                return label
                    .addChildBefore(this._buildField(htmlId))
                    .getElement();
            },

            /**
             * Build html block radio
             * @returns {*|Element}
             * @private
             */
            _buildInlineBlock: function() {

                var iblineBlock = new ui.Element('div')
                    .addClassElement(ui.CSS.radioClass)
                    .addStyleElement('marginTop',  0)
                    .setWidthElement(Math.round(12 - this._widthCaptionBlock))
                    .addClassElement(ui.CSS.radioInlineClass);

                var block = new ui.Element('div')
                    .addClassElement(ui.CSS.radioClass)
                    .addStyleElement('marginTop', 0);

                if (this._horizontal === true) {

                    for(var htmlIda in this._radioList) {

                        block.addChildAfter(this._buildCaptionItem(htmlIda, this._radioList[htmlIda]));
                    }

                    iblineBlock.addChildAfter(block.getElement());

                } else {

                    for(var htmlIdb in this._radioList) {

                        iblineBlock.addChildAfter(
                            new ui.Element('div')
                                //.addClassElement(ui.CSS.radioClass)
                                .addChildAfter(this._buildCaptionItem(htmlIdb, this._radioList[htmlIdb]))
                                .getElement()
                        );
                    }
                }

                return iblineBlock.getElement();
            },

            /**
             * Build html prent block
             * @returns {*|Element}
             * @private
             */
            _buildParentBlock: function() {

                var parentBlock = new ui.Element('div')
                    .addClassElement(ui.CSS.validateFieldBlockClass)
                    .setPaddingElement(this._padding)
                    .setSkinElement('field', this._skin)
                    .setWidthElement(this._width)
                    .addChildBefore(this._buildInlineBlock());

                if (this._caption !== null) {

                    parentBlock
                        .addChildBefore(this._buildCaptionBlock())
                }

                return parentBlock.getElement();
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
             * @returns {ui.FFRadio}
             * @public
             */
            appendHTML: function(selector) {
                new ui.dom(selector).append(this.getElement());
                return this;
            }

        };
    } (window.ui || {}));