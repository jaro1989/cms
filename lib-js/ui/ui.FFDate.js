
(function(ui) {

    var counter = new Date().getTime();

    /**
     * @memberOf ui
     * @namespace ui.FFDate
     * @param {string|null} value
     * @param {string|null} name
     * @param {string|null} caption
     * @constructor
     */
    ui.FFDate = function (value, name, caption) {

        this._value   = ui.api.empty(value, null);
        this._name    = ui.api.empty(name, null);
        this._caption = ui.api.empty(caption, null);
        this._idbtn = [
            'set-current-date-' + counter,
            'set-calendar-date-' + counter,
            'remove-date-' + counter
        ];
        counter++;
    };

    /** @protected */
    ui.FFDate.prototype = {

        /**
         * @private
         * @type {number|null}
         */
        _widthCaption: null,

        /**
         * @private
         * @type {string}
         */
        _widthField: ui.Config.widthField,

        /**
         * @private
         * @type {string|number|null}
         */
        _widthBlock: null,

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
         * @private
         * @type {boolean}
         */
        _activeBtn: true,

        /**
         * Set active button
         * @returns {ui.FFDate}
         */
        setActive: function() {
            this._activeBtn = true;
            return this;
        },

        /**
         * Set required field
         * @returns {ui.FFDate}
         */
        setRequired: function() {
            this._required = true;
            return this;
        },

        /**
         * Set disables field
         * @returns {ui.FFDate}
         */
        setDisabled: function() {
            this._disabled = true;
            return this;
        },

        /**
         * Set size field
         * @param {string} sizeField { 'lg' | 'sm' }
         * @returns {ui.FFDate}
         * @public
         */
        setSize: function(sizeField) {
            this._size = sizeField;
            return this;
        },

        /**
         * Set skin field
         * @param {string} skinName { 'success' | 'warning' | 'error' }
         * @returns {ui.FFDate}
         * @public
         */
        setSkin: function(skinName) {
            this._skin = skinName;
            return this;
        },

        /**
         * Set width label field {1-10}
         * @param {number} widthCaption {1-10}
         * @returns {ui.FFDate}
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
         * @returns {ui.FFDate}
         * @public
         */
        setWidthBlock: function(width) {
            this._widthBlock = width;
            return this;
        },

        /**
         * Set width block field
         * @param {number|string} width
         * @example
         *      {1-12 | '300px' | '30%'}
         * @returns {ui.FFDate}
         * @public
         */
        setWidthField: function(width) {
            this._widthField = width;
            return this;
        },

        /**
         * Set html ID field
         * @param {string} htmlId
         * @returns {ui.FFDate}
         * @public
         */
        setId: function(htmlId) {
            this._id = htmlId;
            return this;
        },

        /**
         * Set html class padding
         * @param {string} padding { 'lg' | 'sm' | 'xs' }
         * @returns {ui.FFDate}
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
         * Build html field
         * @returns {*|Element}
         * @private
         */
        _buildField: function() {

            return new ui.Element('div')
                .setSizeElement('input', this._size)
                .addClassElement(ui.CSS.btn.btnGroup.group)
                .addChildAfter(
                    new ui.Element('input')
                        .setTypeElement('text')
                        .setNameElement(this._name)
                        .setIdElement(this._id, this._name)
                        .setDisabledElement(this._disabled)
                        .setRequiredElement(this._required)
                        .setValueElement(this._value, this._name)
                        .addClassElement(ui.CSS.formControlClass)
                        .getElement()
                )
                .getElement();
        },

        /**
         *
         * @returns {*|Element}
         * @private
         */
        _buildButtons: function() {

            return new ui.Element('div')
                .addClassElement(ui.CSS.btn.btnGroup.group)
                .addStyleElement('paddingLeft', '5px')
                .addChildAfter(
                    new ui.FFButton()
                        .addButton(null, this._idbtn[0], null, null, this._activeBtn, ui.Config.iconBtnDate.currentDate)
                        .addButton(null, this._idbtn[1], null, null, this._activeBtn, ui.Config.iconBtnDate.calendarDate)
                        .addButton(null, this._idbtn[2], null, null, this._activeBtn, ui.Config.iconBtnDate.removeDate)
                        .setPaddingBlock(null)
                        .setGroup('group')
                        .setSize(this._size)
                        .getElement()
                )
                .getElement();
        },

        /**
         * Build html block group
         * @returns {*|Element}
         * @private
         */
        _buildGroupBlock: function() {

            var inputGroup = new ui.Element('div')
                .addChildAfter(this._buildField())
                //.setWidthElement(this._widthField)
                .addChildAfter(this._buildButtons());

            if (typeof this._widthCaption === 'number') {

                inputGroup.setWidthElement(12 - this._widthCaption);
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

            if (this._caption !== null) {

                parentElement.addChildBefore(this._buildCaption());
            }

            if (this._widthBlock !== null) {

                parentElement.setWidthElement(this._widthBlock);
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
         * @returns {ui.FFDate}
         * @public
         */
        appendHTML: function(selector) {
            new ui.$(selector).append(this.getElement());

            new ui.api.addEvents([this._idbtn[0]], 'click', function() {alert('Current date')});
            new ui.api.addEvents([this._idbtn[1]], 'click', function() {alert('Calendar date')});
            new ui.api.addEvents([this._idbtn[2]], 'click', function() {alert('Remove date')});

            return this;
        }
    };
} (window.ui || {}));