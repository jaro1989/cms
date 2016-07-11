(function(ui) {

    var _TYPE_TEXT      = 'text';
    var _TYPE_PASS      = 'password';
    var _TYPE_TEXTAREA  = 'textarea';
    var _TYPE_DATE      = 'date';
    var _TYPE_SELECT    = 'select';
    var _TYPE_CHECKBOX  = 'checkbox';
    var _TYPE_RADIO     = 'radio';
    var _TYPE_READ_ONLY = 'readonly';
    var _TYPE_RELATIONSHIP = 'relationship';

    var uniqueId = new Date().getTime();

    /**
     * @memberOf ui
     * @namespace ui.Form
     * @param {string} idForm
     * @constructor
     */
    ui.Form = function (idForm) {

        /**
         * @type {{}|string}
         * @private
         */
        this._values = {};

        /**
         * @type {{}|string}
         * @private
         */
        this._relationValues = {};

        /**
         * @type {[]}
         * @private
         */
        this._settings = [];

        /**
         * @type {[]}
         * @private
         */
        this._addBtnBottom  = [];

        /**
         * @type {[]}
         * @private
         */
        this._addBtnTop = [];

        /**
         * @type {[]}
         * @private
         */
        this._btnDefaultTop = [];

        /**
         * @type {[]}
         * @private
         */
        this._btnDefaultBottom = [];

        this._idForm = ui.api.empty(idForm, uniqueId);
        uniqueId++;
    };

    //noinspection JSUnusedGlobalSymbols
    /** @protected */
    ui.Form.prototype = {

        _validation: true,

        _hideBtn: {
            _btnSave:   false,
            _btnClean:  false,
            _btnRemove: false,
            _btnBack:   false
        },

        _positionBtnTop:    'left',
        _positionBtnBottom: 'right',

        _idRecord:   '',
        _title:      null,
        _titleSmall: null,

        _method: ui.Config.defaultMethodForm,
        _checkboxText: ui.Config.checkboxText,
        _urlBack: document.referrer,
        _urlAdd:  null,
        _urlEdit: null,
        _urlDel:  null,
        _readOnly: false,

        _htmlFields: {

            widthCaption: null,
            maxHeightReeadOnly: null,
            formatDate: ui.Config.formatDateUser,
            checkboxText: ui.Config.checkboxText,

            /**
             * @param {string|number|null} value
             * @param {string|null} name
             * @param {{}} params
             * @returns {*|Element}
             */
            readonly: function(value, name, params) {

                var dataList = ui.api.existProperty(params, 'list', false);
                var dataValue = ui.api.setValue(value, name);

                if (dataList !== false) {

                    value = ui.api.existProperty(dataList, dataValue, null);
                }

                if (params.type === _TYPE_DATE) {

                    value = new ui.FormatDate(dataValue, this.formatDate).getDate();

                } else if (params.type === _TYPE_CHECKBOX) {

                    value = ui.api.existProperty(this.checkboxText, dataValue, null);

                } else if (params.type === _TYPE_PASS) {

                    value = ui.Config.valuePassword;
                }

                var caption = ui.api.existProperty(params, 'caption', null);

                return new ui.FFReadOnly(value, name, caption)
                    .setWidthCaption(this.widthCaption)
                    .setMaxHeight(ui.api.existProperty(params, 'height', this.maxHeightReeadOnly))
                    .getElement();
            },

            /**
             * @param {string|number|null} value
             * @param {string|null} name
             * @param {{}} params
             * @returns {*|Element}
             */
            text: function(value, name, params) {

                var caption = ui.api.existProperty(params, 'caption', null);

                return new ui.FFText(value, name, caption)
                    .setRequired(ui.api.existProperty(params, 'required', false))
                    .setWidthCaption(this.widthCaption)
                    .getElement();
            },

            /**
             * @param {string|number|null} value
             * @param {string|null} name
             * @param {{}} params
             * @returns {*|Element}
             */
            password: function(value, name, params) {

                var caption = ui.api.existProperty(params, 'caption', null);

                return new ui.FFPassword(value, name, caption)
                    .setRequired(ui.api.existProperty(params, 'required', false))
                    .setWidthCaption(this.widthCaption)
                    .getElement();
            },

            /**
             * @param {string|number|null} value
             * @param {string|null} name
             * @param {{}} params
             * @returns {*|Element}
             */
            textarea: function(value, name, params) {

                var caption = ui.api.existProperty(params, 'caption', null);

                return new ui.FFTextarea(value, name, caption)
                    .setRequired(ui.api.existProperty(params, 'required', false))
                    .setWidthCaption(this.widthCaption)
                    .setResize('vertical')
                    .getElement();
            },

            /**
             * @param {string|number|null} value
             * @param {string|null} name
             * @param {{}} params
             * @returns {*|Element}
             */
            date: function(value, name, params) {

                var caption = ui.api.existProperty(params, 'caption', null);

                return new ui.FFDate(value, name, caption)
                    .setRequired(ui.api.existProperty(params, 'required', false))
                    .setWidthCaption(this.widthCaption)
                    .getElement();
            },

            /**
             * @param {string|number|null} value
             * @param {string|null} name
             * @param {{}} params
             * @returns {*|Element}
             */
            select: function(value, name, params) {

                var caption = ui.api.existProperty(params, 'caption', null);
                var dataList = ui.api.existProperty(params, 'list', {});

                return  new ui.FFSelect(value, name, caption)
                    .setRequired(ui.api.existProperty(params, 'required', false))
                    .setWidthCaption(this.widthCaption)
                    .setList(dataList)
                    .getElement();
            },

            /**
             * @param {string|number|null} value
             * @param {string|null} name
             * @param {{}} params
             * @returns {*|Element}
             */
            checkbox: function(value, name, params) {

                var caption = ui.api.existProperty(params, 'caption', null);

                return new ui.FFCheckbox()
                    .addCheckbox(value, name, caption)
                    .setRequired(ui.api.existProperty(params, 'required', false))
                    .setCaptionBlock('', this.widthCaption)
                    .setFieldsHorizontal()
                    .getElement();
            },

            /**
             * @param {string|number|null} value
             * @param {string|null} name
             * @param {{}} params
             * @returns {*|Element}
             */
            radio: function(value, name, params) {

                var caption = ui.api.existProperty(params, 'caption', null);
                var dataList = ui.api.existProperty(params, 'list', {});

                return  new ui.FFRadio(value, name, dataList)
                    .setRequired(ui.api.existProperty(params, 'required', false))
                    .setCaptionBlock(caption, this.widthCaption)
                    .setWidthCaptionItem(ui.api.existProperty(params, 'width', 2))
                    .setFieldsHorizontal()
                    .getElement();
            }
        },

        /**
         * @private
         * returns {voild}
         */
        _addDefaultBtn: function() {

            if (this._hideBtn._btnBack === false && this._urlBack != '') {

                this._btnDefaultTop.push(
                    {
                        type:     'button',
                        name:     '_btnBack',
                        leftIcon: 'retweet',
                        skin:     'primary',
                        caption:  'Назад',
                        onclick:  "window.location.href = '" + this._urlBack + "'"
                    }
                );
            }

            if (this._hideBtn._btnSave === false && this._readOnly === false) {

                this._btnDefaultBottom.push(
                    {
                        type: 'button',
                        name: '_btnSave',
                        leftIcon: 'save',
                        skin: 'primary',
                        caption: 'Сохранить',
                        onclick: "new ui.FormValidation('" + this._idForm + "').save();"
                    }
                );
            }

            if (this._hideBtn._btnClean === false && this._readOnly === false) {

                this._btnDefaultBottom.push(
                    {
                        type:     'button',
                        name:     '_btnClean',
                        leftIcon: 'refresh',
                        skin:     'primary',
                        caption:  'Очистить',
                        onclick:  "new ui.FormValidation('" + this._idForm + "').reset();"
                    }
                );
            }

            if (this._hideBtn._btnRemove === false && this._values.hasOwnProperty(this._idRecord) && this._urlDel !== null) {

                this._btnDefaultBottom.push(
                    {
                        type:     'button',
                        name:     '_btnRemove',
                        leftIcon: 'trash',
                        skin:     'danger',
                        onclick:  "new ui.FormValidation('" + this._idForm + "').remove();"
                    }
                );
            }
        },

        /**
         * @returns {*|Element}
         * @private
         */
        _buildRow: function(settings, values, relation) {

            var parentElement = new ui.Element('div');

            for (var index in settings) {

                var elementRow = new ui.Element('div')
                    .addClassElement(ui.CSS.newLine);

                if (settings.hasOwnProperty(index)) {

                    for (var nameField in settings[index]) {

                        if (nameField === _TYPE_RELATIONSHIP) {

                            //==========================================================================================

                            var relationName = settings[index][nameField]['name'];

                            if (this._relationValues.hasOwnProperty(relationName)) {

                                if (this._relationValues[relationName].length > 0) {

                                    var i = 0;

                                    for (var relationKey in this._relationValues[relationName]) {

                                        elementRow.addChildAfter(
                                            this._buildRow(
                                                settings[index],
                                                this._relationValues[relationName][relationKey],
                                                relationName + '[' + i + ']'
                                            )
                                        );
                                        i++;
                                    }
                                } else {

                                    elementRow.addChildAfter(this._buildRow(settings[index], {}, relationName + '[0]'));
                                }

                            } else {

                                elementRow.addChildAfter(this._buildRow(settings[index], {}, relationName + '[0]'));
                            }
                            //==========================================================================================

                        } else {

                            var params = settings[index][nameField];

                            if (params.hasOwnProperty('type')) {

                                var type = params.type;

                                if (this._readOnly !== false) {

                                    type = _TYPE_READ_ONLY;
                                }

                                //======================================================================================
                                if (relation !== null) {
                                    nameField = relation + '[' + nameField + ']';
                                    //console.log(relation + '[' + nameField + ']', index, nameField);
                                }
                                //======================================================================================

                                //console.log(relation, type, nameField);
                                /**
                                 * @type Node
                                 */
                                var field = this._htmlFields[type](values, nameField, params);
                                var countGroup = Math.round(12 / (Object.keys(settings[index]).length - (index === _TYPE_RELATIONSHIP ? 1 : 0)));

                                elementRow.addChildAfter(
                                    new ui.Element('div')
                                        .setWidthElement(countGroup)
                                        .addChildAfter(field)
                                        .getElement()
                                );
                            }
                        }
                    }
                }

                parentElement.addChildAfter(elementRow.getElement());
            }

            return parentElement.getElement();
        },

        /**
         * @returns {*|Element}
         * @private
         */
        _buildBlockHidden: function() {

            return new ui.Element('div')
                .setAttrElement('hidden',  true)
                .addClassElement(ui.CSS.formBlockHiddenClass)
                .addChildAfter(
                    new ui.FFHidden(this._urlAdd, ui.Config.FORM_URL_ADD)
                        .getElement()
                )
                .addChildAfter(
                    new ui.FFHidden(this._urlEdit, ui.Config.FORM_URL_EDIT)
                        .getElement()
                )
                .addChildAfter(
                    new ui.FFHidden(this._urlDel, ui.Config.FORM_URL_DEL)
                        .getElement()
                )
                .addChildAfter(
                    new ui.FFHidden(this._urlBack, ui.Config.FORM_URL_BACK)
                        .getElement()
                )
                .addChildAfter(
                    new ui.FFHidden(ui.api.existProperty(this._values, this._idRecord, null), ui.Config.FORM_ID_RECORD)
                        .getElement()
                )
                .addChildAfter(
                    new ui.FFHidden(this._idRecord, ui.Config.FORM_FIELD_RECORD)
                        .getElement()
                )
                .getElement();
        },

        /**
         * Generate html form
         * @returns {*|Element}
         * @private
         */
        _buildForm: function() {

            var form = new ui.Element('form')
                .setIdElement(this._idForm, null)
                .setAttrElement('method', this._method)
                .addChildBefore(this._buildBlockHidden())
                .addChildAfter(this._buildRow(this._settings, this._values, null));

            var record = ui.api.existProperty(this._values, this._idRecord, false);

            if (this._urlAdd !== null || this._urlEdit !== null) {

                (this._urlAdd == null)  ? this._urlAdd  = this._urlEdit : '';
                (this._urlEdit == null) ? this._urlEdit = this._urlAdd  : '';

                form.setAttrElement('action', (record === false) ? this._urlEdit : this._urlAdd)
            }

            this._addDefaultBtn();

            var page = new ui.Page()
                .setTitle(this._title, this._titleSmall, null);

            var btnTop = ui.api.arrayMerge(this._btnDefaultTop, this._addBtnTop);

            if (btnTop.length > 0) {

                page
                    .setHead(
                        new ui.FFButton()
                            .addButtonList(btnTop)
                            .setPositionBlock(this._positionBtnTop)
                            .setActive()
                            .setGroup('toolbar')
                            .toHTML()
                    );
            }

            page.setBody(form.toHTML());

            var btnBottom = ui.api.arrayMerge(this._btnDefaultBottom, this._addBtnBottom);

            if (btnBottom.length > 0) {

                page
                    .setFooter(
                        new ui.FFButton()
                            .addButtonList(btnBottom)
                            .setPositionBlock(this._positionBtnBottom)
                            .setPaddingBlock('lg')
                            .setActive()
                            .setGroup('toolbar')
                            .toHTML()
                    );
            }

            return page.getElement();
        },

        /**
         * Shut off validator
         * @returns {ui.Form}
         */
        disableValidation: function() {

            this._validation = false;
            return this;
        },

        /**
         * @param {boolean} hide
         * @returns {ui.Form}
         */
        hideBtnSave: function(hide) {

            this._hideBtn._btnSave = ui.api.empty(hide, true);
            return this;
        },

        /**
         * @param {boolean} hide
         * @returns {ui.Form}
         */
        hideBtnClean: function(hide) {

            this._hideBtn._btnClean = ui.api.empty(hide, true);
            return this;
        },

        /**
         * @param {boolean} hide
         * @returns {ui.Form}
         */
        hideBtnRemove: function(hide) {

            this._hideBtn._btnRemove = ui.api.empty(hide, true);
            return this;
        },

        /**
         * @param {boolean} hide
         * @returns {ui.Form}
         */
        hideBtnBack: function(hide) {

            this._hideBtn._btnBack = ui.api.empty(hide, true);
            return this;
        },

        /**
         * Add new row for fields
         * @returns {ui.Form}
         */
        newLine: function()  {

            this._settings.push({});
            return this;
        },

        /**
         * @param {string} relation_name
         * @returns {ui.Form}
         */
        addRelationship: function(relation_name) {

            var obj = {};
            obj[_TYPE_RELATIONSHIP] = {name: relation_name};
            this._settings.push(obj);

            //console.log(this._settings, obj);
            return this;
        },

        /**
         *
         * @param {{}} row
         * @param {{}} params
         * @param {string} name
         * @returns {{}}
         * @private
         */
        _setParametersFields: function(row, params, name) {

            if (row.hasOwnProperty(_TYPE_RELATIONSHIP)) {

                if (ui.api.empty(name, null) === null) {

                    name = _TYPE_READ_ONLY + '_' + Object.keys(row[_TYPE_RELATIONSHIP]).length;
                }

                row[_TYPE_RELATIONSHIP][name] = params;

            } else {

                if (ui.api.empty(name, null) === null) {

                    name = _TYPE_READ_ONLY + '_' + Object.keys(row).length;
                }

                row[name] = params;
            }

            return row;
        },

        /**
         * @param {string|null} name
         * @param {string|number|null} caption
         * @param {string|number|null} height
         * @returns {ui.Form}
         */
        addReadOnlyField: function(name, caption, height) {

            var countRow  = Object.keys(this._settings).length - 1;

            var params = {
                type: _TYPE_READ_ONLY,
                caption: caption,
                height: height
            };

            this._setParametersFields(this._settings[countRow], params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.Form}
         */
        addTextField: function(name, caption, required) {

            var countRow = this._settings.length - 1;

            var params = {
                type: _TYPE_TEXT,
                caption: caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(this._settings[countRow], params, name);
            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.Form}
         */
        addPasswordField: function(name, caption, required) {

            var countRow = this._settings.length - 1;

            var params = {
                type:     _TYPE_PASS,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(this._settings[countRow], params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.Form}
         */
        addTextareaField: function(name, caption, required) {

            var countRow = this._settings.length - 1;

            var params = {
                type:     _TYPE_TEXTAREA,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(this._settings[countRow], params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.Form}
         */
        addDateField: function(name, caption, required) {

            var countRow = this._settings.length - 1;

            var params = {
                type:     _TYPE_DATE,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(this._settings[countRow], params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {{}|[]} data
         * @param {boolean} required
         * @returns {ui.Form}
         */
        addSelectField: function(name, caption, data, required) {

            var countRow = this._settings.length - 1;

            var params = {
                type:     _TYPE_SELECT,
                caption:  caption,
                required: ui.api.empty(required, false),
                list:     data
            };

            this._setParametersFields(this._settings[countRow], params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.Form}
         */
        addCheckboxField: function(name, caption, required) {

            var countRow = this._settings.length - 1;

            var params = {
                type:     _TYPE_CHECKBOX,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(this._settings[countRow], params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number|null} caption
         * @param {{}|[]} data
         * @param {boolean} required
         * @param {number|null} width
         * @returns {ui.Form}
         */
        addRadioField: function(name, caption, data, required, width) {

            var countRow = this._settings.length - 1;

            var params = {
                type:     _TYPE_RADIO,
                caption:  caption,
                required: ui.api.empty(required, false),
                list:     data,
                width:    width
            };

            this._setParametersFields(this._settings[countRow], params, name);

            return this;
        },

        /**
         * @param {number|string} height
         * @returns {ui.Form}
         */
        setMaxHeightReadOnly: function(height) {

            this._htmlFields.maxHeightReeadOnly = height;
            return this;
        },

        /**
         * @param {{}} data
         * @returns {ui.Form}
         */
        setDataFields: function(data) {

            this._values = data;
            return this;
        },

        /**
         *
         * @param {string} relationName
         * @param {[]|{}|null|boolean} data
         * @returns {ui.Form}
         */
        addRelationDataFields: function(relationName, data) {

            this._relationValues[relationName] = ui.api.empty(data, []);
            return this
        },

        /**
         * @param {string|null} title
         * @param {string|null} titleSmall
         * @returns {ui.Form}
         */
        setTitle: function(title, titleSmall) {

            this._title = ui.api.empty(title, null);
            this._titleSmall = ui.api.empty(titleSmall, null);

            return this;
        },

        /**
         *
         * @param {string} method {'GET'|'POST'}
         * @returns {ui.Form}
         */
        setMethod: function(method) {

            this._method = ui.api.empty(method, ui.Config.defaultMethodForm);
            return this;
        },

        /**
         * Set width label field {1-10}
         * @param {number|null} widthCaption {1-10}
         * @returns {ui.Form}
         * @public
         */
        setWidthCaption: function(widthCaption) {

            this._htmlFields.widthCaption = widthCaption;
            return this;
        },

        /**
         * @param {string} url
         * @returns {ui.Form}
         */
        setUrlBack: function(url) {

            this._urlBack = url;
            return this
        },

        /**
         * @param {string} url
         * @returns {ui.Form}
         */
        setUrlAdd: function(url) {

            this._urlAdd = url;
            return this;
        },

        /**
         * @param {string} url
         * @returns {ui.Form}
         */
        setUrlEdit: function(url) {

            this._urlEdit = url;
            return this;
        },

        /**
         * @param {string} url
         * @param {string} idRecord
         * @returns {ui.Form}
         */
        setUrtDel: function(idRecord, url) {

            this._idRecord = idRecord;
            this._urlDel = url;
            return this;
        },

        /**
         * @param {boolean} read
         * @returns {ui.Form}
         */
        setFormReadOnly: function(read) {

            this._readOnly = ui.api.empty(read, true);
            return this;
        },

        /**
         *
         * @param {string} format
         * @returns {ui.Form}
         */
        setFormatDate: function(format) {

            this._htmlFields.formatDate = format;
            return this;
        },

        /**
         * @param {{}|[]} data
         * @example
         *          {0: 'Нет', 1: 'Да'}
         * @returns {ui.Form}
         */
        setCheckboxValuesRead: function(data) {

            if (typeof data == 'object') {

                this._htmlFields.checkboxText = data;
            }

            return this;
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {
            return this._buildForm();
        },

        /**
         * Get html current element
         * @returns {string}
         * @public
         */
        toHTML: function() {
            return this._buildForm().outerHTML;
        },

        /**
         * Add element in document
         * @param {string} selector
         * @returns {ui.Form}
         * @public
         */
        appendHTML: function(selector) {

            new ui.$(selector).append(this.getElement());
            return this;
        }
    };
} (window.ui || {}));