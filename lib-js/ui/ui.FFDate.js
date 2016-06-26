
(function(ui) {

    var counter = new Date().getTime();
    var inputClassUser = 'date-user';
    var inputClassSave = 'date-hidden';
    var inputClassBlock = 'block-field-date';
    var idFieldUser = 'field-date';

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
        this._id = ui.api.empty(this._name, idFieldUser + '-' + counter);

        this._valueForEvent = [];
        counter++;
    };

    /** @protected */
    ui.FFDate.prototype = {

        _formatDateUser: ui.Config.formatDateUser,
        _formatDateSave: ui.Config.formatDateSave,

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
        _activeBtn: false,

        /**
         *
         * @param {string} format
         *                      'YYYY-MM-DD' | 'YYYY-MM-DD HH:MI:SS' | 'YYYY.MM.DD' | 'YYYY.MM.DD HH:MI:SS' | 'YYYY/MM/DD' | 'YYYY/MM/DD HH:MI:SS' |
         *                      'DD-MM-YYYY' | 'DD-MM-YYYY HH:MI:SS' | 'DD.MM.YYYY' | 'DD.MM.YYYY HH:MI:SS' | 'DD/MM/YYYY' | 'DD/MM/YYYY HH:MI:SS' |
         *                      'DD-MM-YY'   | 'DD-MM-YY HH:MI:SS'   | 'DD.MM.YY'   | 'DD.MM.YY HH:MI:SS'   | 'DD/MM/YY'   | 'DD/MM/YYYY HH:MI:SS'
         * @returns {ui.FFDate}
         * @public
         */
        setDateFormatUser: function(format) {

            this._formatDateUser = format;
            return this;
        },

        /**
         *
         * @param {string} format
         *                      'YYYY-MM-DD' | 'YYYY-MM-DD HH:MI:SS' | 'YYYY.MM.DD' | 'YYYY.MM.DD HH:MI:SS' | 'YYYY/MM/DD' | 'YYYY/MM/DD HH:MI:SS' |
         *                      'DD-MM-YYYY' | 'DD-MM-YYYY HH:MI:SS' | 'DD.MM.YYYY' | 'DD.MM.YYYY HH:MI:SS' | 'DD/MM/YYYY' | 'DD/MM/YYYY HH:MI:SS' |
         *                      'DD-MM-YY'   | 'DD-MM-YY HH:MI:SS'   | 'DD.MM.YY'   | 'DD.MM.YY HH:MI:SS'   | 'DD/MM/YY'   | 'DD/MM/YYYY HH:MI:SS'
         * @returns {ui.FFDate}
         * @public
         */
        setDateFormatSave: function(format) {

            this._formatDateSave = format;
            return this;
        },

        /**
         * Set active button
         * @returns {ui.FFDate}
         * @public
         */
        setActive: function() {
            this._activeBtn = true;
            return this;
        },

        /**
         * Set required field
         * @returns {ui.FFDate}
         * @public
         */
        setRequired: function() {
            this._required = true;
            return this;
        },

        /**
         * Set disables field
         * @returns {ui.FFDate}
         * @public
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

            var valueDate = ui.api.setValue(this._value, this._name);

            this._valueForEvent = [
                new ui.FormatDate(valueDate, this._formatDateUser).getDate(),
                new ui.FormatDate(valueDate, this._formatDateSave).getDate()
            ];

            return new ui.Element('div')
                .setSizeElement('input', this._size)
                .addClassElement(ui.CSS.btn.btnGroup.group)
                .setIdElement(this._id, this._name)
                .setWidthElement(5)
                .addChildAfter(
                    new ui.Element('input')
                        .setTypeElement('text')
                        .setDisabledElement(this._disabled)
                        .setRequiredElement(this._required)
                        .setValueElement(this._valueForEvent[0], null)
                        .addClassElement(ui.CSS.formControlClass)
                        .addClassElement(inputClassUser)
                        .setReadOnly()
                        .getElement()
                )
                .addChildAfter(
                    new ui.Element('input')
                        .setTypeElement('hidden')
                        .setNameElement(this._name)
                        .setDisabledElement(this._disabled)
                        .setRequiredElement(this._required)
                        .setValueElement(this._valueForEvent[1], null)
                        .addClassElement(inputClassSave)
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
                .setWidthElement(7)
                .addChildAfter(
                    new ui.FFButton()
                        .setOnClick('new ui.FFDate()._setCurrentDate(this);')
                        .addButton(null, null, null, null, this._activeBtn, ui.Config.iconBtnDate.currentDate)
                        .setWidth('120px')
                        .setOnClick("new ui.FFDate()._calendar(this, '" + this._id + "');")
                        .addButton(null, null, null, null, this._activeBtn, ui.Config.iconBtnDate.calendarDate)
                        .setWidth('120px')
                        .setOnClick('new ui.FFDate()._clearDate(this);')
                        .addButton(null, null, null, null, this._activeBtn, ui.Config.iconBtnDate.removeDate)
                        .setWidth('120px')
                        .setPaddingBlock(null)
                        .setGroup('justified')
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
                .addChildAfter(
                    new ui.Element('div')
                        .addClassElement('row')
                        .addChildAfter(this._buildField())
                        .addChildAfter(this._buildButtons())
                        .getElement()
                );

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
                .addClassElement(inputClassBlock)
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
         * @param {Element} e
         * @private
         */
        _setCurrentDate: function(e) {

            var parentElement = ui.api.findParent(e, '.' + inputClassBlock);
            parentElement.querySelector('input[type=text]').value   = new ui.FormatDate(null, this._formatDateUser).getCurrentDate();
            parentElement.querySelector('input[type=hidden]').value = new ui.FormatDate(null, this._formatDateSave).getCurrentDate();
        },

        /**
         * @param {Element} e
         * @param {string} selectorParentField <div id="selectorParentField"><input type="text"><input type="hidden"></div>
         * @private
         */
        _calendar: function(e, selectorParentField) {

            var position = e.getBoundingClientRect();
            var parentElement = ui.api.findParent(e, '.' + inputClassBlock);
            var findDate = parentElement.querySelector('#' + selectorParentField + ' > input[type=hidden]').value;

            var date = new Date();

            if (findDate != '') {

                date = new Date(findDate);
            }

            new ui.Calendar(date.getFullYear(), date.getMonth(), date.getDate())
                .setPositionLeft(position.left + ((position.right - position.left) / 2))
                .setPositionTop(position.bottom)
                .addDateUserTo('#' + selectorParentField + ' > input[type=text]')
                .addDateSaveTo('#' + selectorParentField + ' > input[type=hidden]')
                .appendHTML('body');
        },

        /**
         * @param {Element} e
         * @private
         */
        _clearDate: function(e) {

            var parentElement = ui.api.findParent(e, '.' + inputClassBlock);
            parentElement.querySelector('input[type=text]').value   = '';
            parentElement.querySelector('input[type=hidden]').value = '';
        },

        /**
         * Add element in document
         * @param {string} selector
         * @returns {ui.FFDate}
         * @public
         */
        appendHTML: function(selector) {

            new ui.$(selector).append(this.getElement());
            return this;
        }
    };
} (window.ui || {}));