
    (function(HTML) {

        var TYPE_TEXT = 'text';

        var TYPE_HIDDEN = 'hidden';

        var KEY_LABEL = 'label';

        var KEY_MARKER = 'marker';

        var KEY_INPUT = 'input';

        var KEY_HIDDEN = 'hidden';

        var KEY_READ = 'read';

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
        HTML.Input = function(group, htmlClass, size) {
            this._group = _basis.emptyProperty(_basis.layoutGroup, group, _basis.layoutGroup[1]);
            this._class = _basis.emptyValue(htmlClass, null);
            this._size = _basis.emptyProperty(_basis.fields.size, size, _basis.fields.size.sm);
            this._paramsInput = {};
        };

        /** @protected */
        HTML.Input.prototype = {

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
             * Html input text
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getInput: function(params) {
                var html =  _basis.getTag('input', params.attr, null, false);
                var icon = _basis.emptyProperty(params, 'icon', false);
                if (icon !== false) {
                    html += _basis.getIcon(icon, _basis.fields.icon.if);
                }
                    html = _basis.getTag(
                        'div',
                        {
                            class: _basis.fields.icon.bf + ' ' +
                                   _basis.emptyValue(this._size, '') + ' ' +
                                   _basis.emptyProperty(params, 'class', '')
                        },
                        html
                    );
                return html;
            },

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
                            class : _basis.emptyValue(widthLabel, null)
                        },
                        params.label + this._afterLabel
                    );
                }
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
             * Html input and label
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getInputLabel: function(params) {
                var html = '';

                var widthLabel = null;

                if (this._line > 0) {
                    widthLabel = _basis.layout + '-' + this._line;
                    params['class'] = _basis.layout + '-' + (12 - this._line);
                }

                html += _basis.getTag(
                    'label',
                    {
                        for: params.attr.id,
                        class: _basis.emptyValue(widthLabel, '')
                    },
                    params.label + this._afterLabel
                );
                html += this._getInput(params);
                return html;
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
                    if (key === KEY_LABEL) {
                        field = currentObj._getInputLabel(params);
                    } else if (key === KEY_MARKER) {
                        block = _basis.fields.ig;
                        field = currentObj._getInputMarker(params);
                    } else if (key === KEY_INPUT) {
                        field = currentObj._getInput(params);
                    } else if (key === KEY_READ) {
                        field = currentObj._getRead(params);
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
             * @param {string|null} key - 'Key type field'
             * @param {string|number} value
             * @param {string|null} label
             * @param {string|null} name
             * @param {string|null} leftMarker
             * @param {string|null} rightMarker
             * @param {string|null} icon
             * @param {string|null} skin {'success'|'warning'|'error'|null}
             * @param {string} type
             * @param {string|null} placeholder
             * @param {boolean} disabled
             * @private
             */
            _setDataParams: function(key, value, label, name, leftMarker, rightMarker, icon, skin, type, placeholder, disabled) {
                disabled = _basis.emptyValue(disabled, false);
                var counter = Object.keys(this._paramsInput).length++;
                this._paramsInput[counter] = {};
                this._paramsInput[counter][key] = {
                    icon:           _basis.emptyValue(icon, null),
                    label:          _basis.emptyValue(label, null),
                    markerLeft:     _basis.emptyValue(leftMarker, null),
                    markerRight:    _basis.emptyValue(rightMarker, null),
                    skin:           _basis.emptyProperty(_basis.fields.skin, skin, null),
                    attr: {
                        type:        type,
                        id:          _basis.getId(this._id, name),
                        name:        _basis.emptyValue(name, null),
                        value:       _basis.emptyValue(value, null),
                        class:       _basis.fields.inp + ' ' +
                                     _basis.emptyValue(this._class, '') + ' ' +
                                     _basis.emptyValue(skin, '') + ' ' +
                                     _basis.emptyValue(this._size, '') + ' ' +
                                     (disabled ? _basis.disabled : ''),
                        placeholder: _basis.emptyValue(placeholder, null),
                        disabled:    (disabled ? 'disabled' : '')
                    }
                };
            },

            /**
             * Build input with label
             *
             * @public
             * @param {string|null} value
             * @param {string|null} label
             * @param {string|null} name
             * @param {string|null} icon
             * @param {string|null} skin {'success'|'warning'|'error'|null}
             * @param {boolean} disabled
             * @returns {HTML.Input}
             */
            addInputLabel: function(value, label, name, icon, skin, disabled) {
                this._setDataParams(KEY_LABEL, value, label, name, null, null, icon, skin, TYPE_TEXT, this._placeholder, disabled);
                return this;
            },

            /**
             * Build input with left or right marker
             *
             * @public
             * @param {string|null} value
             * @param {string|null} leftMarker
             * @param {string|null} rightMarker
             * @param {string|null} name
             * @param {string|null} skin {'success'|'warning'|'error'|null}
             * @param {boolean} disabled
             * @returns {HTML.Input}
             */
            addInputMarker: function(value, leftMarker, rightMarker, name, skin, disabled) {
                this._setDataParams(KEY_MARKER, value, null, name, leftMarker, rightMarker, null, skin, TYPE_TEXT, this._placeholder, disabled);
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
                this._setDataParams(KEY_HIDDEN, value, null, name, null, null, null, null, TYPE_HIDDEN, null, disabled);
                return this;
            },

            /**
             * Build input text
             *
             * @public
             * @param {string|null} value
             * @param {string|null} name
             * @param {string|null} icon
             * @param {string|null} skin {'success'|'warning'|'error'|null}
             * @param {boolean} disabled
             * @returns {HTML.Input}
             */
            addInput: function(value, name, icon, skin, disabled) {
                this._setDataParams(KEY_INPUT, value, null, name, null, null, icon, skin, TYPE_TEXT, this._placeholder, disabled);
                return this;
            },

            /**
             * Build input read
             *
             * @public
             * @param {string|null} value
             * @param {string|null} label
             * @param {string|null} name
             * @param {string|null} skin {'readsuccess'|'readmuted'|'readprimary'|'readinfo'|'readwarning'|'readdanger'|null}
             * @returns {HTML.Input}
             */
            addInputRead: function(label, value, name, skin) {
                this._setDataParams(KEY_READ, value, label, name, null, null, null, skin, TYPE_TEXT, null, null);
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