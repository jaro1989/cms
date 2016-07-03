
(function(ui) {

    /**
     * @memberOf ui
     * @namespace ui.FFCheckbox
     * @constructor
     */
    ui.FFCheckbox = function () {

        this._checkboxList  = [];
        this._disabledIf    = [];
        this._requiredIf    = [];

    };

    /** @protected */
    ui.FFCheckbox.prototype = {

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
         * @private
         * @type {{checked: 1, nochecked: 0}}
         */
        _checkboxValue: ui.Config.checkboxValue,

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
         * Set width label field {1-10}
         * @param {number} widthCaption {1-10}
         * @returns {ui.FFCheckbox}
         * @public
         */
        setWidthCaption: function(widthCaption) {
            this._widthCaption = widthCaption;
            return this;
        },

        /**
         * Add checkbox
         * @param {number|null} value
         * @param {string} name
         * @param {string} caption
         * @returns {ui.FFCheckbox}
         * @public
         */
        addCheckbox: function(value, name, caption) {

            this._checkboxList[this._checkboxList.length] = {
                name:    ui.api.empty(name, null),
                value:   ui.api.empty(value, null),
                caption: ui.api.empty(caption, null)
            };

            return this;
        },

        /**
         * Add list checkboxes
         * @param { { 0: { name: '..', value: '..', caption: '..' } } } data
         * @returns {ui.FFCheckbox}
         */
        addCheckboxList: function(data) {

            for(var row in data) {

                this._checkboxList[this._checkboxList.length] = {
                    name:    ui.api.existProperty(data[row], 'name', null),
                    value:   ui.api.existProperty(data[row], 'value', null),
                    caption: ui.api.existProperty(data[row], 'caption', null)
                };
            }

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
         * @param {{}} params {value: '..', name: '..', caption: '..'}
         * @returns {*|Element}
         * @private
         */
        _buildField: function(params) {

            var checkbox = new ui.Element('input')
                .setTypeElement('checkbox')
                .setNameElement(params.name)
                .addClassElement(params.name)
                .setDisabledElement(this._disabled)
                .setRequiredElement(this._required)
                .setIdElement(null, params.name);

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
         * Build html label
         * @param {{}} params {value: '..', name: '..', caption: '..'}
         * @returns {*|Element}
         * @private
         */
        _buildCaption: function(params) {

            var req = false;
            if (ui.api.inArray(this._requiredIf, params.name) != -1 || this._required === true) {

                req = true;
            }

            var label = new ui.Element('label')
                .addChildAfter(
                    new ui.Element('span')
                        .setCaptionRadioElement(params.caption, req)
                        .addStyleElement('paddingLeft',  '5px')
                        .addStyleElement('paddingRight', '5px')
                        .getElement()
                )
                .addChildBefore(this._buildField(params));

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
                .addClassElement(ui.CSS.checkboxClass)
                .addClassElement(ui.CSS.checkboxInlineClass);


            var block = new ui.Element('div')
                .addClassElement(ui.CSS.checkboxClass);

            if (this._horizontal === true) {

                for(var htmlIda in this._checkboxList) {

                    block.addChildAfter(this._buildCaption(this._checkboxList[htmlIda]));
                }

                iblineBlock.addChildAfter(block.getElement());

            } else {

                for(var htmlIdb in this._checkboxList) {

                    iblineBlock.addChildAfter(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.checkboxClass)
                            .addChildAfter(this._buildCaption(this._checkboxList[htmlIdb]))
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
                .addClassElement(ui.CSS.validateFieldBlockClass)
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
         * @returns {ui.FFCheckbox}
         * @public
         */
        appendHTML: function(selector) {
            new ui.$(selector).append(this.getElement());
            return this;
        }

    };
} (window.ui || {}));