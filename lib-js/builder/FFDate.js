(function(HTML) {

    /**
     * The generator of the basic elements HTML
     *
     * @private
     * @type {HTML.Basis}
     */
    var _basis = new HTML.Basis();

    /**
     * @memberOf HTML
     * @namespace HTML.Tag
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
        this._value = this._setValue(value, name);
        this._name = name;
        this._label = label;
        this._width = width;
    };

    /** @protected */
    HTML.FFDate.prototype = {

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
         * Width label else field is line
         *
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
         * @returns {HTML.FFDate}
         */
        setLineLabel: function() {
            this._lineLabel = true;
            return this;
        },

        /**
         * Set separator between label and field
         *
         * @param {string} separatorLabel
         * @returns {HTML.FFDate}
         */
        setSeparatorLabel: function(separatorLabel) {
            this._separatorLabel = separatorLabel;
            return this;
        },

        formatDate: function(timestamp, format) {

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
         * @returns {string}
         */
        _setValue: function(value, name) {
            var res = null;
            if (typeof value === 'object') {

                var timestamp = _basis.emptyProperty(value, 'timestamp', false);
                if (timestamp !== false) {
                    res = new HTML.FormatDate(timestamp, 'dd.mm.yyyy').getStrDate();
                }

                name = _basis.emptyProperty(value, name, false);
                if (typeof name === 'object') {

                    timestamp = _basis.emptyProperty(name, 'timestamp', false);
                    if (timestamp !== false) {
                        res = new HTML.FormatDate(timestamp, 'dd.mm.yyyy').getStrDate();
                        //var date = new Date();
                        ////27/05/2016
                        //date.setTime(timestamp * 1000);
                        //var hours = date.getHours();
                        //var minutes = date.getMinutes();
                        //var seconds = date.getSeconds();
                        //var day = date.getDate();
                        //var month = date.getMonth();
                        //var yyyy = date.getFullYear();
                        //
                        //console.log(day, month, yyyy, hours, minutes, seconds);
                    }

                } else if (typeof name === 'string') {
                    res = name;
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
                                        .setValue(this._value)
                                        .setDisabled(this._disabled)
                                        .setName(this._name)
                                        .setId(this._id)
                                        .setType('text')
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
                                                .addButton(null, null, null, 'saved', this._disabled)
                                                .addButton(null, null, null, 'calendar', this._disabled)
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
         * Compiles and returns HTML field
         *
         * @public
         * @returns {string} Html tag
         */
        toHTML: function() {
            return this._buildField();
        },

        /**
         * Compiles and appends HTML field in elements "element"
         *
         * @public
         * @param {string} element {This table will be added in element "element"}
         * @returns {HTML.Tag}
         */
        appentTo: function(element) {
            $(element).append(this._buildField());
            return this;
        }
    }


} (window.HTML || {}));