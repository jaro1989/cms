
(function(ui) {

    var TYPE_SIMPLE = 'simple';
    var TYPE_INLINE = 'inline';

    /**
     * @memberOf ui
     * @namespace ui.FFCheckbox
     * @padding {string|null|undefined} type {'simple'|'inline'}
     * @constructor
     */
    ui.FFCheckbox = function (type) {

        this._type = ui.api.empty(type, TYPE_INLINE);
        this._checkboxList  = [];
        this._disabledIf    = [];
        this._requiredIf    = [];
        this._attr = {};

    };

    /** @protected */
    ui.FFCheckbox.prototype = {

        /**
         * @private
         * @type {string|null}
         */
        _caption: null,

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
         * @type {{checked: 1, nochecked: 0}}
         */
        _checkboxValue: ui.Config.checkboxValue,

        /**
         * @private
         * @type {string|null}
         */
        _padding: ui.Config.padding,

        /**
         * @private
         * @type {string|null}
         */
        _classField: null,

        /**
         * @param {string} name
         * @param {*} value
         * @returns {ui.FFCheckbox}
         */
        setAttr: function(name, value) {

            this._attr[name] = value;
            return this;
        },

        /**
         * @param {string|number|null} caption
         * @param {string|number|null} widthCaption
         * @returns {ui.FFCheckbox}
         */
        setCaptionBlock: function(caption, widthCaption) {

            this._caption = caption;
            this._widthCaptionBlock = widthCaption;
            return this;
        },

        /**
         * Set default value
         * @param {string} checked
         * @param {string} nochecked
         * @returns {ui.FFCheckbox}
         */
        setDefaultValues: function(checked, nochecked) {

            this._checkboxValue.checked   = ui.api.empty(checked, ui.Config.checkboxValue.checked);
            this._checkboxValue.nochecked = ui.api.empty(nochecked, ui.Config.checkboxValue.nochecked);

            return this;
        },

        /**
         * Set required field
         * @param {boolean} required
         * @returns {ui.FFCheckbox}
         */
        setRequired: function(required) {
            this._required = ui.api.empty(required, true);
            return this;
        },

        /**
         * Set disables field
         * @returns {ui.FFCheckbox}
         */
        setDisabled: function() {
            this._disabled = true;
            return this;
        },

        /**
         * Set required field
         * @param {string} htmlId
         * @returns {ui.FFCheckbox}
         */
        setRequiredIf: function(htmlId) {
            this._requiredIf.push(htmlId);
            return this;
        },

        /**
         * Set disables field
         * @param {string} htmlId
         * @returns {ui.FFCheckbox}
         */
        setDisabledIf: function(htmlId) {
            this._disabledIf.push(htmlId);
            return this;
        },

        /**
         * Set width label item field {1-10}
         * @param {string|number|null} widthCaptionItem {1-10}
         * @returns {ui.FFCheckbox}
         * @public
         */
        setWidthCaptionItem: function(widthCaptionItem) {
            this._widthCaptionItem = widthCaptionItem;
            return this;
        },

        /**
         * Add checkbox
         * @param {{}|string|number|null} value
         * @param {string} name
         * @param {string|null} caption
         * @param {string|null} onclick
         * @returns {ui.FFCheckbox}
         * @public
         */
        addCheckbox: function(value, name, caption, onclick) {

            this._checkboxList[this._checkboxList.length] = {
                name:    ui.api.empty(name, null),
                value:   ui.api.empty(value, null),
                caption: ui.api.empty(caption, null),
                onclick: ui.api.empty(onclick, null)
            };

            return this;
        },

        /**
         * Add list checkboxes
         * @param { { 0: { name: 'string', value: '{}|string|number|null', caption: 'string|null', onclick: 'string|null' } } } data
         * @returns {ui.FFCheckbox}
         */
        addCheckboxList: function(data) {

            for(var row in data) {

                this._checkboxList[this._checkboxList.length] = {
                    name:    ui.api.existProperty(data[row], 'name', null),
                    value:   ui.api.existProperty(data[row], 'value', null),
                    caption: ui.api.existProperty(data[row], 'caption', null),
                    onclick: ui.api.existProperty(data[row], 'onclick', null)
                };
            }

            return this;
        },

        /**
         * @param {string} classField
         * @returns {ui.FFCheckbox}
         */
        setClass: function(classField) {

            this._classField = classField;
            return this;
        },

        /**
         * Set html class padding
         * @param {string|null} padding { 'lg' | 'sm' | 'xs' }
         * @returns {ui.FFCheckbox}
         * @public
         */
        setPadding: function(padding) {
            this._padding = padding;
            return this;
        },

        /**
         * draw fields horizontal
         * @returns {ui.FFCheckbox}
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
         * @returns {ui.FFCheckbox}
         * @public
         */
        setWidth: function(width) {
            this._width = width;
            return this;
        },

        /**
         * Set skin field
         * @param {string} skinName { 'success' | 'warning' | 'error' }
         * @returns {ui.FFCheckbox}
         * @public
         */
        setSkin: function(skinName) {
            this._skin = skinName;
            return this;
        },

        /**
         * Build html field
         * @param {{}} params {value: *, name: *, caption: *, onclick: *}
         * @returns {*|Element}
         * @private
         */
        _buildField: function(params) {

            var checkbox = new ui.Element('input')
                .setTypeElement('checkbox')
                .setNameElement(params.name)
                .setDisabledElement(this._disabled)
                .setRequiredElement(this._required)
                .addClassElement(this._classField)
                .setIdElement(null, params.name)
                .setAttrElement('onclick', params.onclick);

            for (var attr in this._attr) {

                var value = this._attr[attr];
                checkbox.setAttrElement(attr, value);
            }

            if (ui.api.inArray(this._disabledIf, params.name) != -1) {

                checkbox.setDisabledElement(true);
            }

            if (ui.api.inArray(this._requiredIf, params.name) != -1) {

                checkbox.setRequiredElement(true);
            }

            if (this._checkboxValue.checked == ui.api.setValue(params.value, params.name)) {

                checkbox
                    .setCheckedElement(true)
                    .setValueElement(this._checkboxValue.checked, null);

            } else {

                checkbox.setValueElement(this._checkboxValue.nochecked, null);
            }

            return checkbox.getElement();
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
         * Build html label item
         * @param {{}} params {value: *, name: *, caption: *, onclick: *}
         * @returns {*|Element}
         * @private
         */
        _buildCaptionItem: function(params) {

            var label = new ui.Element('label')
                .addChildAfter(
                    new ui.Element('span')
                        .getElement()
                );

            if (this._required && ui.api.empty(this._caption, false)) {

                label.setContentElement(params.caption);

            } else {

                var req = (ui.api.inArray(this._requiredIf, params.name) != -1) ? true : this._required;
                label.setCaptionRadioElement(params.caption, req);
            }

            if (typeof this._widthCaptionItem === 'number') {

                label.setWidthElement(this._widthCaptionItem);
            }

            return label
                .addChildBefore(this._buildField(params))
                .getElement();
        },

        /**
         * @returns {*|Element}
         * @private
         */
        _buildSimpleBlock: function() {

            var block = new ui.Element('div');

            for(var htmlIda in this._checkboxList) {

                block.addChildAfter(this._buildCaptionItem(this._checkboxList[htmlIda]));
            }

            return block.getElement();
        },

        /**
         * @returns {*|Element}
         * @private
         */
        _buildInlineBlock: function() {

            var iblineBlock = new ui.Element('div')
                .addClassElement(ui.CSS.checkboxClass)
                .addStyleElement('marginTop',  0)
                .addClassElement(ui.CSS.checkboxInlineClass);

            if (typeof this._widthCaptionBlock === 'number') {

                iblineBlock.setWidthElement(Math.round(12 - this._widthCaptionBlock))
            }

            var block = new ui.Element('div')
                .addClassElement(ui.CSS.checkboxClass)
                .addStyleElement('marginTop', 0);

            if (this._horizontal === true) {

                for(var htmlIda in this._checkboxList) {

                    block.addChildAfter(this._buildCaptionItem(this._checkboxList[htmlIda]));
                }

                iblineBlock.addChildAfter(block.getElement());

            } else {

                for(var htmlIdb in this._checkboxList) {

                    iblineBlock.addChildAfter(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.checkboxClass)
                            .addChildAfter(this._buildCaptionItem(this._checkboxList[htmlIdb]))
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

            var parentBlock =  new ui.Element('div')
                .addClassElement(ui.CSS.validateFieldBlockClass)
                .setPaddingElement(this._padding)
                .setSkinElement('field', this._skin)
                .setWidthElement(this._width)
                .addChildAfter(this._buildInlineBlock());

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

            if (this._type == TYPE_SIMPLE) {

                return this._buildSimpleBlock();
            }

            return this._buildParentBlock();
        },

        /**
         * Get html current element
         * @returns {string}
         * @public
         */
        toHTML: function() {

            if (this._type == TYPE_SIMPLE) {

                return this._buildSimpleBlock().outerHTM;
            }

            return this._buildParentBlock().outerHTML;
        },

        /**
         * Add element in document
         * @param {string} selector
         * @returns {ui.FFCheckbox}
         * @public
         */
        appendHTML: function(selector) {
            new ui.$(selector).append(this.getElement());
            return this;
        }

    };
} (window.ui || {}));