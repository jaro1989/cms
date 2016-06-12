
    (function(ui) {

        var UNIQUE = new Date().getTime();

        /**
         * @memberOf ui
         * @namespace ui.FFRadio
         * @param {string|null} value
         * @param {string|null} name
         * @param {{}} radioList {'htmlId1' => 'caption1', 'htmlId2' => 'caption2', ...}
         * @constructor
         */
        ui.FFRadio = function (value, name, radioList) {

            this._value     = ui.api.empty(value, null);
            this._name      = ui.api.empty(name, null);
            this._radioList = ui.api.empty(radioList, null);

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
             * @type {boolean}
             */
            _horizontal: false,

            /**
             * @private
             * @type { { checked: 1, nochecked: 0 } }
             */
            _radioValue: ui.Config.radioValue,

            /**
             * Set value if checked or nochecked
             * @param {number|string} checked
             * @param {number|string} nochecked
             * @returns {ui.FFRadio}
             */
            setCheckedValue: function(checked, nochecked) {
                this._radioValue['checked']   = ui.api.empty(checked,   ui.Config.radioValue.checked);
                this._radioValue['nochecked'] = ui.api.empty(nochecked, ui.Config.radioValue.checked);
                return this;
            },

            /**
             *
             * @param {string} htmlId
             * @param {string} caption
             * @returns {ui.FFRadio}
             */
            addRadioList: function(htmlId, caption) {
                this._radioList[htmlId] = caption;
                return this;
            },

            /**
             * draw fields horizontal
             * @returns {ui.FFRadio}
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
                UNIQUE++;
                var radio = new ui.Element('input')
                    .setTypeElement('radio')
                    .setNameElement(this._name)
                    .setValueElement(this._value, this._name)
                    .setIdElement(this._name + '-' + UNIQUE, null);

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
                return new ui.Element('label')
                    .addChildAfter(
                        new ui.Element('span')
                            .setContentElement(caption)
                            .addStyleElement('paddingLeft',  '5px')
                            .addStyleElement('paddingRight', '5px')
                            .getElement()
                    )
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
             * @returns {ui.FFRadio}
             */
            appendHTML: function(selector) {
                new ui.$(selector).append(this.getElement());
                return this;
            }

        };
    } (window.ui || {}));