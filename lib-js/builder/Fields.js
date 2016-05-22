
    (function(HTML) {

        var TYPE_TEXT = 'text';

        var TYPE_HIDDEN = 'hidden';

        var KEY_LABEL = 'label';

        var KEY_MARKER = 'marker';

        var KEY_INPUT = 'input';

        var KEY_HIDDEN = 'hidden';

        var KEY_READ = 'read';

        var KEY_SELECT_LIST = 'select-list';

        var BLOCK_HIDDEN_FIELDS = 'block-hidden-fields';

        var PLACEHOLDER_DEF = '...';

        var PREFIX = 'text';

        var AFTER_LABEL = ': ';

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

        /**
         * @memberOf HTML
         * @namespace HTML.Input
         * @param {number} group {1|2|3|4|5|6}
         * @param {string|null} htmlClass
         * @param {string|null} size {'lg'|'sm'|null}
         * @constructor
         */
        HTML.Fields = function(group, htmlClass, size) {
            this._group = _basis.emptyProperty(_basis.layoutGroup, group, _basis.layoutGroup[1]);
            this._class = _basis.emptyValue(htmlClass, null);
            this._size = _basis.emptyProperty(_basis.fields.size, size, _basis.fields.size.sm);
            this._paramsInput = {};
        };

        /** @protected */
        HTML.Fields.prototype = {

            /**
             * Alignment label
             *
             * @type {string}
             */
            _labelAlignment: _basis.text_alignment.right,

            /**
             * Skin fields
             *
             * @type {string}
             */
            _skin: false,

            /**
             * Line label/field
             *
             * @private
             * @type {number}
             */
            _line: 0,

            /**
             * after label
             *
             * @private
             * @type {string}
             */
            _afterLabel: '',

            /**
             * Parameters for builder fields
             *
             * @private
             * @type {object}
             */
            _paramsInput: {},

            /**
             * Html ID field
             *
             * @private
             * @type {string|null}
             */
            _id: null,

            /**
             * Size fields current object
             *
             * @private
             * @type {string|null}
             */
            _size: null,

            /**
             * Placeholder fields
             *
             * @type {string|number|null}
             */
            _placeholder: null,

            /**
             * Html class fields current object
             *
             * @private
             * @type {string|null}
             */
            _class: null,

            /**
             * Group count fields
             *
             * @privat
             * @type {number}
             */
            _group: _basis.layoutGroup[1],

            /**
             * Margin field
             *
             * @privat
             * @type {string|null}
             */
            _margin: null,

            /**
             * Html block hidden fialds
             *
             * @privat
             * @type {string}
             */
            _blockHiddenFields: '',

            /**
             * Html input read
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getRead: function(params) {
                var skin = _basis.emptyValue(params.skin, null);
                if (skin !== null) {
                    skin = PREFIX + '-' + skin;
                }

                var html = '';
                var lbl = this._getLabel(params);
                var widthField = lbl.widthField;
                html += lbl.label;

                html += _basis.getTag(
                    'p',
                    {
                        class: params.attr.id + ' ' +
                               skin, id: params.attr.id + ' ' +
                               _basis.emptyValue(widthField, null)
                    },
                    _basis.emptyProperty(params.attr, 'value', '')
                );
                return html;
            },

            /**
             * Html input hidden
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getHidden: function(params) {
                return this._getInput(params);
            },

            /**
             * Html input text
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getInput: function(params) {
                var html = '';
                //Html label
                var label = '';
                if (params.label !== null) {
                    var lbl = this._getLabel(params);
                    label = lbl.label;
                    params['class'] = lbl.widthField;

                }
                //Html lield
                html += _basis.getTag('input', params.attr, null, false);
                var icon = _basis.emptyProperty(params, 'icon', false);
                if (icon !== false) {
                    html += _basis.getIcon(icon, _basis.fields.icon.if);
                }
                //Html block field
                html = _basis.getTag(
                    'div',
                    {
                        class: _basis.fields.icon.bf + ' ' +
                        _basis.emptyValue(this._size, '') + ' ' +
                        _basis.emptyProperty(params, 'class', '')
                    },
                    html
                );
                return label + html;
            },

            /**
             * Build html optionsfor select list
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getItemSelect: function(params) {
                var item = '';
                $.each(params.selectData, function(key, value) {
                    var attr = {
                        value: key
                    };
                    if (params.attr.value === key) {
                        attr['selected'] = 'selected';
                    }
                    item += _basis.getTag('option', attr, value)
                });
                return item;
            },

            /**
             * Build html select list
             *
             * @param {object} params
             * @returns {*|string}
             * @private
             */
            _getSelect: function(params) {
                var html = _basis.getTag('select', params.attr, this._getItemSelect(params), true);
                var icon = _basis.emptyProperty(params, 'icon', false);
                if (icon !== false) {
                    html += _basis.getIcon(icon, _basis.fields.icon.if);
                }
                return _basis.getTag(
                    'div',
                    {
                        class: _basis.fields.icon.bf + ' ' +
                        _basis.emptyValue(this._size, '') + ' ' +
                        _basis.emptyProperty(params, 'class', '')
                    },
                    html
                );
            },

            /**
             * Build Label field
             *
             * @param {object} params
             * @returns {{widthLabel: *, widthField: *, label: string}}
             * @private
             */
            _getLabel: function(params) {
                var widthLabel = null;
                var widthField = null;

                if (this._line > 0) {
                    widthLabel = _basis.layout + '-' + this._line;
                    widthField = _basis.layout + '-' + (12 - this._line);
                }

                var html = '';
                if (params.label !== null) {
                    html += _basis.getTag(
                        'label',
                        {
                            for: params.attr.id,
                            class : _basis.emptyValue(widthLabel, null) + ' ' + this._labelAlignment
                        },
                        params.label + this._afterLabel
                    );
                }
                return {
                    widthLabel: widthLabel,
                    widthField: widthField,
                    label : html
                };
            },

            /**
             * Html input and two markers
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getInputMarker: function(params) {
                var html = '';

                if (params.markerLeft !== null) {
                    html += _basis.getTag('span', {class: _basis.fields.iga}, params.markerLeft);
                }

                html += this._getInput(params);

                if (params.markerRight !== null) {
                    html += _basis.getTag('span', {class: _basis.fields.iga}, params.markerRight);
                }

                return html;
            },

            /**
             * Build select list
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getSelectList: function(params) {
                var html = '';
                if (params.label !== null) {
                    var lbl = this._getLabel(params);
                    html += lbl.label;
                    params['class'] = lbl.widthField;

                }
                html += this._getSelect(params);
                return html;
            },

            /**
             * Html block-group input
             *
             * @param {object} data
             * @returns {string}
             * @private
             */
            _getGroup: function(data) {
                var html = '';
                var currentObj = this;
                $.each(data, function(key, params) {
                    var field = '';
                    var block = _basis.fields.fg;
                    if (key === KEY_INPUT) {
                        field = currentObj._getInput(params);
                    } else if (key === KEY_MARKER) {
                        block = _basis.fields.ig;
                        field = currentObj._getInputMarker(params);
                    } else if (key === KEY_READ) {
                        field = currentObj._getRead(params);
                    } else if (key === KEY_SELECT_LIST) {
                        field = currentObj._getSelectList(params);
                    } else if (key === KEY_HIDDEN) {
                        currentObj._blockHiddenFields += currentObj._getHidden(params);
                    }

                    var line = '';
                    if (currentObj._line > 0) {
                        line = 'form-horizontal';
                    }

                    if (key !== KEY_HIDDEN) {
                        html = _basis.getTag(
                            'div',
                            {
                                class: _basis.layout + '-' + currentObj._group + ' ' +
                                _basis.emptyValue(currentObj._margin, '')
                            },
                            _basis.getTag(
                                'div',
                                {
                                    class: block + ' ' +
                                    _basis.emptyProperty(params, 'skin', '') + ' ' +
                                    _basis.emptyValue(currentObj._size, '') + ' ' + line
                                },
                                field
                            )
                        );
                    }
                });
                return html;
            },

            /**
             * Build block with fields
             *
             * @returns {*|string}
             * @private
             */
            _getBlockInput: function() {
                var html = '';
                var currentObj = this;
                $.each(this._paramsInput, function(key, params) {
                    html += currentObj._getGroup(params);
                });
                html = _basis.getTag('div', {}, html) + _basis.getTag('div', {class: BLOCK_HIDDEN_FIELDS}, this._blockHiddenFields);
                return html;
            },

            /**
             *
             * @param {string|null} skin 'success'|'warning'|'error'|'muted'|'primary'|'info'|'danger'|null}
             * @returns {HTML.Fields}
             */
            setSkin: function(skin) {
                this._skin = _basis.emptyProperty(_basis.fields.skin, skin, false);
                return this;
            },

            /**
             * Set line label - field
             *
             * @public
             * @param {number} widthLabel
             * @param {string} afterLabel
             * @returns {HTML.Input}
             */
            setLineLabel: function(widthLabel, afterLabel) {
                this._line = _basis.emptyValue(widthLabel, 2);
                this._afterLabel = _basis.emptyValue(afterLabel, AFTER_LABEL);
                return this;
            },

            /**
             * Set margin field
             *
             * @public
             * @param {string|null} margin {'lg'|'sm'|'xs'|null}
             * @default 'sm'
             * @returns {HTML.Input}
             */
            setMargin: function(margin) {
                this._margin = _basis.getPadding(margin, _basis.padding.sm);
                return this;
            },

            /**
             * Set placeholder field
             *
             * @public
             * @param {string|number|null} placeholder
             * @default '...'
             * @returns {HTML.Input}
             */
            setPlaceholder: function(placeholder) {
                this._placeholder = _basis.emptyValue(placeholder, PLACEHOLDER_DEF);
                return this;
            },

            /**
             * Set parameters for generating field
             *
             * @param {object} data data = { key: key, value: value, label: label, name: name, leftMarker: leftMarker, rightMarker: rightMarker, icon: icon, skin: skin, type: type, placeholder: placeholder, disabled: disabled }
             * @private
             */
            _setDataParams: function(data) {

                var disabled = _basis.emptyValue(data.disabled, false);
                var counter = Object.keys(this._paramsInput).length++;
                this._paramsInput[counter] = {};
                this._paramsInput[counter][data.key] = {
                    icon:           _basis.emptyValue(data.icon, null),
                    label:          _basis.emptyValue(data.label, null),
                    markerLeft:     _basis.emptyValue(data.leftMarker, null),
                    markerRight:    _basis.emptyValue(data.rightMarker, null),
                    selectData:           _basis.emptyProperty(data, 'selectData', null),
                    skin:           data.skin,
                    attr: {
                        type:        data.type,
                        id:          _basis.getId(this._id, data.name),
                        name:        _basis.emptyValue(data.name, null),
                        value:       _basis.emptyValue(data.value, null),
                        class:       _basis.fields.inp + ' ' +
                                     _basis.emptyValue(this._class, '') + ' ' +
                                     _basis.emptyValue(data.skin, '') + ' ' +
                                     _basis.emptyValue(this._size, '') + ' ' +
                                     (disabled ? _basis.disabled : ''),
                        placeholder: _basis.emptyValue(data.placeholder, null),
                        disabled:    (disabled ? 'disabled' : '')
                    }
                };
            },

            /**
             * Build input with left or right marker
             *
             * @public
             * @param {string|null} value
             * @param {string|null} leftMarker
             * @param {string|null} rightMarker
             * @param {string|null} name
             * @param {boolean} disabled
             * @returns {HTML.Input}
             */
            addInputMarker: function(value, leftMarker, rightMarker, name, disabled) {
                var params = {
                    key: KEY_MARKER,
                    value: value,
                    label: null,
                    name: name,
                    leftMarker: leftMarker,
                    rightMarker: rightMarker,
                    icon: null,
                    skin: this._skin ? _basis.fields.prefix_skin_field + '-' + this._skin : null,
                    type: TYPE_TEXT,
                    placeholder: this._placeholder,
                    disabled: disabled
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Build input hidden
             *
             * @public
             * @param {string|null} value
             * @param {string|null} name
             * @param {boolean} disabled
             * @returns {HTML.Input}
             */
            addInputHidden: function(value, name, disabled) {
                var params = {
                    key: KEY_HIDDEN,
                    value: value,
                    label: null,
                    name: name,
                    leftMarker: null,
                    rightMarker: null,
                    icon: null,
                    skin: null,
                    type: TYPE_HIDDEN,
                    placeholder: null,
                    disabled: disabled
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Build input text
             *
             * @public
             * @param {string|null} value
             * @param {string|null} label
             * @param {string|null} name
             * @param {string|null} icon
             * @param {boolean} disabled
             * @returns {HTML.Input}
             */
            addInput: function(value, label, name, icon, disabled) {
                var params = {
                    key: KEY_INPUT,
                    value: value,
                    label: label,
                    name: name,
                    leftMarker: null,
                    rightMarker: null,
                    icon: icon,
                    skin: this._skin ? _basis.fields.prefix_skin_field + '-' + this._skin : null,
                    type: TYPE_TEXT,
                    placeholder: this._placeholder,
                    disabled: disabled
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Build input read
             *
             * @public
             * @param {string|null} value
             * @param {string|null} label
             * @param {string|null} name
             * @returns {HTML.Input}
             */
            addInputRead: function(label, value, name) {
                var params = {
                    key: KEY_READ,
                    value: value,
                    label: label,
                    name: name,
                    leftMarker: null,
                    rightMarker: null,
                    icon: null,
                    skin: this._skin ? _basis.fields.prefix_skin_text + '-' + this._skin : null,
                    type: TYPE_TEXT,
                    placeholder: null,
                    disabled: null
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Build select list field
             *
             * @param {object} data
             * @param {string|number|null} value
             * @param {string|null} name
             * @param {string|null} label
             * @param {boolean} disabled
             * @returns {HTML.Fields}
             */
            addSelectList: function(data, value, name, label, disabled) {
                var params = {
                    key: KEY_SELECT_LIST,
                    value: value,
                    label: label,
                    name: name,
                    leftMarker: null,
                    rightMarker: null,
                    icon: null,
                    skin: this._skin ? _basis.fields.prefix_skin_field + '-' + this._skin : null,
                    type: TYPE_TEXT,
                    placeholder: this._placeholder,
                    disabled: disabled,
                    selectData: data
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Compiles and returns HTML block inputs
             *
             * @public
             * @returns {*|string}
             */
            toHtml: function() {
                return this._getBlockInput();
            },

            /**
             * Compiles and appends HTML block inputs in elements "element"
             *
             * @public
             * @param {string} element
             * @returns {HTML.Input}
             */
            appendHtml: function(element) {
                $(element).append(this._getBlockInput());
                return this;
            }

        };

    } (window.HTML || {}));