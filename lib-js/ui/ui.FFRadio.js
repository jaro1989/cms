
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.FFRadio
         * @param {string|null} value
         * @param {string|null} name
         * @param {{}} radioList {'htmlId1' => 'caption1', 'htmlId2' => 'caption2', ...}
         * @constructor
         */
        ui.FFRadio = function (value, name, radioList) {

            this._value      = ui.api.setValue(ui.api.empty(value, null), name);
            this._name       = ui.api.empty(name, null);
            this._radioList  = ui.api.empty(radioList, null);
            this._disabledIf = [];
            this._requiredIf = [];

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
            _widthCaption: null,

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
             * Set required field
             * @returns {ui.FFRadio}
             */
            setRequired: function() {
                this._required = true;
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
             * Set required field
             * @param {string} htmlId
             * @returns {ui.FFRadio}
             */
            setRequiredIf: function(htmlId) {
                this._requiredIf.push(htmlId);
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
             * Set width label field {1-10}
             * @param {number} widthCaption {1-10}
             * @returns {ui.FFRadio}
             * @public
             */
            setWidthCaption: function(widthCaption) {
                this._widthCaption = widthCaption;
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
                    .setValueElement(this._value, this._name)
                    .setDisabledElement(this._disabled)
                    .setRequiredElement(this._required)
                    .setIdElement(htmlId, null);

                if (ui.api.inArray(this._disabledIf, htmlId) != -1) {

                    radio.setDisabledElement(true);
                }

                if (ui.api.inArray(this._requiredIf, htmlId) != -1) {

                    radio.setRequiredElement(true);
                }

                if (htmlId == this._value) {

                    radio.setCheckedElement(true);
                }

                return radio.getElement();
            },

            /**
             * Build html label
             * @param {string|number} htmlId
             * @param {string|number} caption
             * @returns {*|Element}
             * @private
             */
            _buildCaption: function(htmlId, caption) {

                var req = false;
                if (ui.api.inArray(this._requiredIf, htmlId) != -1 || this._required === true) {

                    req = true;
                }

                var label = new ui.Element('label')
                    .addChildAfter(
                        new ui.Element('span')
                            .setCaptionRadioElement(caption, req)
                            .addStyleElement('paddingLeft',  '5px')
                            .addStyleElement('paddingRight', '5px')
                            .getElement()
                    )
                    .addChildBefore(this._buildField(htmlId));

                if (typeof this._widthCaption === 'number') {

                    label.setWidthElement(this._widthCaption);
                }

                return label.getElement();
            },

            /**
             * Build html block radio
             * @returns {*|Element}
             * @private
             */
            _buildInlineBlock: function() {

                var iblineBlock = new ui.Element('div')
                    .addClassElement(ui.CSS.radioClass)
                    .addClassElement(ui.CSS.radioInlineClass);

                var block = new ui.Element('div')
                    .addClassElement(ui.CSS.radioClass);

                if (this._horizontal === true) {

                    for(var htmlIda in this._radioList) {

                        block.addChildAfter(this._buildCaption(htmlIda, this._radioList[htmlIda]));
                    }

                    iblineBlock.addChildAfter(block.getElement());

                } else {

                    for(var htmlIdb in this._radioList) {

                        iblineBlock.addChildAfter(
                            new ui.Element('div')
                                .addClassElement(ui.CSS.radioClass)
                                .addChildAfter(this._buildCaption(htmlIdb, this._radioList[htmlIdb]))
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

                return new ui.Element('div')
                    .setSkinElement('field', this._skin)
                    .setWidthElement(this._width)
                    .addChildBefore(this._buildInlineBlock())
                    .getElement();
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
                new ui.$(selector).append(this.getElement());
                return this;
            }

        };
    } (window.ui || {}));