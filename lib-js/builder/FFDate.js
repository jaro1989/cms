(function(HTML) {

    var CLASS_USER = 'date-user';
    var CLASS_HIDDEN = 'date-hidden';
    var FORMAT_DATE = 'dd.mm.yyyy';

    /**
     * The generator of the basic elements HTML
     *
     * @private
     * @type {HTML.Basis}
     */
    var _basis = new HTML.Basis();

    /**
     * @memberOf HTML
     * @namespace HTML.FFDate
     * @constructor
     * @param {string|null} name
     * @param {string|object|null} value
     *                                  '2000-01-01 00:00:00' |
     *                                  { value: { name: '2000-01-01 00:00:00' } |
     *                                  { value: { timestamp: '1107291600' } } |
     *                                  { value: { name: { timestamp: '1107291600' } } }
     * @param {string|null} label
     * @param {number|null} width
     */
    HTML.FFDate = function(value, name, label, width) {
        this._value = value;
        this._name = name;
        this._label = label;
        this._width = width;
    };

    /** @protected */
    HTML.FFDate.prototype = {

        /**
         * @type {boolean}
         */
        changeMonth: true,

        /**
         * @type {boolean}
         */
        changeYear: true,

        /**
         * @type {string}
         */
        _formatDate: FORMAT_DATE,

        /**
         * @type {number|null}
         */
        _width: null,

        /**
         * @type {string|null}
         */
        _skinField: null,

        /**
         * @type {string|null}
         */
        _skinButtons: null,

        /**
         * @type {string|null}
         */
        _size: null,

        /**
         * @type {string|null}
         */
        _id: null,

        /**
         * @type {string|null}
         */
        _name: null,

        /**
         * @type {boolean}
         */
        _disabled: false,

        /**
         * @type {string|null}
         */
        _value: null,

        /**
         * @type {string|null}
         */
        _label: null,

        /**
         * @type {boolean}
         */
        _lineLabel: false,

        /**
         * @type {number}
         */
        _widthLabel: 4,

        /**
         * @type {string|null}
         */
        _separatorLabel: ':',

        /**
         * Set the date format for the visual field
         *
         * @public
         * @param {string} format
         * @returns {HTML.FFDate}
         */
        setFormatDate: function(format) {
            this._formatDate = format;
            return this;
        },

        /**
         * Width label else field is line
         *
         * @public
         * @param {number} widthLabel
         * @returns {HTML.FFDate}
         */
        setWidthLabel: function(widthLabel) {
            if (widthLabel > 0 && widthLabel <= 6) {
                this._widthLabel = widthLabel;
            }
            return this;
        },

        /**
         * Set label in line
         *
         * @public
         * @returns {HTML.FFDate}
         */
        setLineLabel: function() {
            this._lineLabel = true;
            return this;
        },

        /**
         * Set separator between label and field
         *
         * @public
         * @param {string} separatorLabel
         * @returns {HTML.FFDate}
         */
        setSeparatorLabel: function(separatorLabel) {
            this._separatorLabel = separatorLabel;
            return this;
        },

        /**
         *
         * @private
         * @param {string|null} name
         * @param {string|object|null} value
         *                                  '2000-01-01 00:00:00' |
         *                                  { value: { name: '2000-01-01 00:00:00' } |
         *                                  { value: { timestamp: '1107291600' } } |
         *                                  { value: { name: { timestamp: '1107291600' } } }
         * @returns {object} values {for field with date (user) and date (hidden)}
         */
        _setValue: function(value, name) {
            var res = {};
            res[CLASS_USER] = value;
            res[CLASS_HIDDEN] = value;
            if (typeof value === 'object') {

                var timestamp = _basis.emptyProperty(value, 'timestamp', false);
                if (timestamp !== false) {
                    res[CLASS_USER] = new HTML.FormatDate(timestamp, this._formatDate).getDate();
                    res[CLASS_HIDDEN] = new HTML.FormatDate(timestamp, null).getDate();
                }

                name = _basis.emptyProperty(value, name, false);
                if (typeof name === 'object') {

                    timestamp = _basis.emptyProperty(name, 'timestamp', false);
                    if (timestamp !== false) {
                        res[CLASS_USER] = new HTML.FormatDate(timestamp, this._formatDate).getDate();
                        res[CLASS_HIDDEN] = new HTML.FormatDate(timestamp, null).getDate();
                    }

                } else if (typeof name === 'string') {
                    res[CLASS_USER] = name;
                    res[CLASS_HIDDEN] = name;
                }
            }
            return res;
        },

        /**
         * Get width for parent block| field block | button block
         *
         * @private
         * @returns {{parent: 'string', button: 'string', field: 'string', label: 'string'}}
         */
        _getWidth: function() {
            var _width = {
                parent: _basis.css.width + '-' + _basis.emptyValue(this._width, 12),
                label:  _basis.css.width + '-' + 12,
                field:  _basis.css.width + '-' + 12,
                button: _basis.css.width + '-' + 12
            };
            if (this._width > 2) {
                if (this._lineLabel && this._width > 3) {
                    _width['parent'] = _basis.css.width + '-' + this._width;
                    _width['label'] =  _basis.css.width + '-' + this._widthLabel;
                    _width['field'] =  _basis.css.width + '-' + Math.round(( (12 - this._widthLabel) / 2 ) );
                    _width['button'] = _basis.css.width + '-' + Math.round(( (12 - this._widthLabel) / 2 ) );
                } else if (this._lineLabel && this._width <= 3) {
                    _width['parent'] = _basis.css.width + '-' + this._width;
                    _width['label'] =  _basis.css.width + '-' + 2;
                    _width['field'] =  _basis.css.width + '-' + 4;
                    _width['button'] = _basis.css.width + '-' + 6;
                } else {
                    _width['field'] =  _basis.css.width + '-' + this._width;
                    _width['button'] = _basis.css.width + '-' + Math.round(12 - this._width);
                }
            }
            return _width;
        },

        /**
         * Build html field date
         *
         * @returns {string} html field
         * @private
         */
        _buildField: function () {
            var width = this._getWidth();
            var skin = _basis.getSkin(this._skinField);
            this._value = this._setValue(this._value, this._name);

            var label = '';
            if (this._label !== null) {
                label = new HTML.BuildTag('label', true)
                    .setFor(this._id, this._name)
                    .setContent(this._label + _basis.emptyValue(this._separatorLabel, ''))
                    .setClass(width.label)
                    .addClass((this._lineLabel && this._width > 2) ? _basis.css.align.text.right : null)
                    .toHTML();
            }

            return new HTML.BuildTag('div', true)
                .setClass(_basis.css.formGroup)
                .addClass(width.parent)
                .addClass(skin)
                .setContent(
                    new HTML.BuildTag('div', true)
                        .setContent(

                            label

                            +

                            new HTML.BuildTag('div', true)
                                .setClass(width.field)
                                .addClass(_basis.getSize('input', this._size))
                                .setContent(
                                    new HTML.BuildTag('input', false)
                                        .setClass(_basis.css.formControl)
                                        .addClass(_basis.getDisabled(this._disabled))
                                        .addClass(CLASS_USER)
                                        .setValue(this._value[CLASS_USER])
                                        .setDisabled(this._disabled)
                                        .setId(this._id, this._name)
                                        .setType('text')
                                        .toHTML()

                                    +

                                    new HTML.BuildTag('input', false)
                                        .setClass(CLASS_HIDDEN)
                                        .setValue(this._value[CLASS_HIDDEN])
                                        .setDisabled(this._disabled)
                                        .setName(this._name)
                                        .setType('hidden')
                                        .toHTML()
                                )
                                .toHTML()

                            +

                            new HTML.BuildTag('div', true)
                                .setClass(width.button)
                                .setContent(
                                    new HTML.BuildTag('div', true)
                                        .setClass(_basis.css.inputGroupBtn)
                                        .setContent(
                                            new HTML.Button('toolbar')
                                                .setActive(true)
                                                .setSize(this._size)
                                                .setSkin(this._skinButtons)
                                                .setOnClick('new HTML.FFDate()._setCurrentDate(this, \'' + this._formatDate + '\');')
                                                .addButton(null, null, null, 'saved', this._disabled)
                                                .setOnClick('new HTML.FFDate()._setDate(this, \'' + this._formatDate + '\');')
                                                .addButton(null, null, null, 'calendar', this._disabled)
                                                .setOnClick('new HTML.FFDate()._removeDate(this);')
                                                .addButton(null, null, null, 'remove', this._disabled)
                                                .toHtml()
                                        )
                                        .toHTML()
                                )
                                .toHTML()
                        )
                        .toHTML()
                )
                .toHTML();
        },

        /**
         * Set current date to field date and hidden field date
         *
         * @param {object} element
         * @param {string} format
         * @returns {boolean}
         * @private
         */
        _setCurrentDate: function(element, format) {
            var parentElement = this._parentElement(element);
            parentElement
                .find('.' + CLASS_USER)
                .val(
                    new HTML.FormatDate(null, format)
                        .getCurrentDate()
                );
            parentElement
                .find('.' + CLASS_HIDDEN)
                .val(
                    new HTML.FormatDate(null, null)
                        .getCurrentDate()
                );
            return false;
        },

        /**
         * Set the selected date
         *
         * @param {*} element
         * @param {string} format Format date
         * @returns {boolean}
         * @private
         */
        _setDate: function(element, format) {
            var parentElement = this._parentElement(element);
            var input = parentElement.find('.' + CLASS_USER);

            var formatDatepicker = format;
            if (~format.toLowerCase().indexOf('yyyy')) {
                formatDatepicker = format.replace('yyyy', 'yy');
            } else {
                formatDatepicker = format.replace('yy', 'y');
            }

            input.datepicker(
                {
                    dateFormat: formatDatepicker,
                    changeMonth: this.changeMonth,
                    changeYear: this.changeYear,
                    numberOfMonths: 1,
                    onSelect: function(dateText) {

                        var datepicker = $( this ).data( "datepicker" );
                        var timestamp = new Date();
                        timestamp.setDate(datepicker.selectedDay);
                        timestamp.setMonth(datepicker.selectedMonth);
                        timestamp.setFullYear(datepicker.selectedYear);
                        dateText = timestamp.getTime();

                        if (!isNaN(Number(dateText))) {
                            var date = new HTML.FormatDate(dateText / 1000, format).getDate();
                            input.val(date);
                            parentElement.find('.' + CLASS_HIDDEN).val(new HTML.FormatDate(dateText / 1000, null).getDate());
                        }
                    }
                }
            );

            input.focus();
            return false;
        },

        /**
         * Clean field date
         *
         * @param {*} element
         * @returns {boolean}
         * @private
         */
        _removeDate: function(element) {
            var parentElement = this._parentElement(element);
            parentElement.find('.' + CLASS_USER).val('');
            parentElement.find('.' + CLASS_HIDDEN).val('');
            return false;
        },

        /**
         * Parent block for search fields with date
         *
         * @param {*} element
         * @returns {*}
         * @private
         */
        _parentElement: function(element) {
            var parentElement = $(element).parent().parent();
            var type = $(element).attr('type');
            if (type === 'button' || type == 'submit') {
                return parentElement.parent().parent().parent();
            }
            return parentElement;
        },

        /**
         * Size field
         *
         * @public
         * @param {string|null} size {'lg'|'sm'|'xs'|null}
         * @returns {HTML.FFDate}
         */
        setSize: function(size) {
            this._size = size;
            return this;
        },

        /**
         * Disable field
         *
         * @public
         * @param {boolean} disable
         * @returns {HTML.FFDate}
         */
        setDisabled: function(disable) {
            if (disable === true) {
                this._disabled = disable;
            } else if (disable === false) {
                this._disabled = disable;
            }
            return this;
        },

        /**
         * Set html id field
         *
         * @public
         * @param {string} htmlId
         * @returns {HTML.FFDate}
         */
        setId: function(htmlId) {
            this._id = htmlId;
            return this;
        },

        /**
         * Set width field {2-12}
         *
         * @public
         * @param {number|null} width {2|3|4|5|6|7|8|9|10|11|12}
         * @returns {HTML.FFDate}
         */
        setWidth: function(width) {
            this._width = width;
            return this;
        },

        /**
         * Set skin field and buttons
         *
         * @public
         * @param {string|null} skinField 'success'|'warning'|'error'|'muted'|'primary'|'info'|'danger'|null}
         * @param {string|null} skinButtons {'success'|'warning'|'danger'|'info'|'link'|'default'|'primary'}
         * @returns {HTML.Fields}
         */
        setSkin: function(skinField, skinButtons) {
            this._skinField = skinField;
            this._skinButtons = skinButtons;
            return this;
        },

        /**
         * Hide select list Change Month to calendar
         *
         * @public
         * @returns {HTML.FFDate}
         */
        hideChangeMonth: function() {
            this.changeMonth = false;
            return this;
        },

        /**
         * Hide select list Change Year to calendar
         *
         * @public
         * @returns {HTML.FFDate}
         */
        hideChangeYear: function() {
            this.changeYear = false;
            return this;
        },

        /**
         * Compiles and returns HTML field
         *
         * @public
         * @returns {string} Html field
         */
        toHTML: function() {
            return this._buildField();
        },

        /**
         * Compiles and appends HTML field in elements "element"
         *
         * @public
         * @param {string} element {This table will be added in element "element"}
         * @returns {HTML.FFDate}
         */
        appentTo: function(element) {
            $(element).append(this._buildField());
            return this;
        }
    }


} (window.HTML || {}));