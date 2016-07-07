(function(ui) {

    var _TYPE_TEXT     = 'text';
    var _TYPE_PASS     = 'password';
    var _TYPE_TEXTAREA = 'textarea';
    var _TYPE_DATE     = 'date';
    var _TYPE_SELECT   = 'select';
    var _TYPE_CHECKBOX = 'checkbox';
    var _TYPE_RADIO    = 'radio';

    var URL_DEL   = 'urlDel';
    var URL_ADD   = 'urlAdd';
    var URL_BACK  = 'urlBack';
    var URL_EDIT  = 'urlEdit';
    var ID_RECORD = 'idRecord';

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
        this._values   = {};

        /**
         * @type {array}
         * @private
         */
        this._settings = [];

        /**
         * @type {array}
         * @private
         */
        this._addBtnBottom  = [];

        /**
         * @type {array}
         * @private
         */
        this._addBtnTop     = [];

        /**
         * @type {array}
         * @private
         */
        this._btnDefaultTop    = [];

        /**
         * @type {array}
         * @private
         */
        this._btnDefaultBottom = [];

        this._idForm = ui.api.empty(idForm, uniqueId);
        uniqueId++;
    };

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

        _idRecord:   null,
        _title:      null,
        _titleSmall: null,

        _method: ui.Config.defaultMethodForm,
        _urlBack: document.referrer,
        _urlAdd:  null,
        _urlEdit: null,
        _urlDel:  null,

        _htmlFields: {

            text: function(value, name, caption, data) {

                return new ui.FFText(value, name, caption)
                    .setRequired(ui.api.existProperty(data, 'required', false))
                    .getElement();
            },

            password: function(value, name, caption, data) {

                return new ui.FFPassword(value, name, caption)
                    .setRequired(ui.api.existProperty(data, 'required', false))
                    .getElement();
            },

            textarea: function(value, name, caption, data) {

                return new ui.FFTextarea(value, name, caption)
                    .setRequired(ui.api.existProperty(data, 'required', false))
                    .setResize('vertical')
                    .getElement();
            },

            date: function(value, name, caption, data) {

                return new ui.FFDate(value, name, caption)
                    .setRequired(ui.api.existProperty(data, 'required', false))
                    .getElement();
            },

            select: function(value, name, caption, data) {

                var dataList = ui.api.existProperty(data, 'list', {});

                return  new ui.FFSelect(value, name, caption)
                    .setRequired(ui.api.existProperty(data, 'required', false))
                    .setList(dataList)
                    .getElement();
            },

            checkbox: function(value, name, caption, data) {

                return new ui.FFCheckbox()
                    .addCheckbox(value, name, caption)
                    .setRequired(ui.api.existProperty(data, 'required', false))
                    .setFieldsHorizontal()
                    .getElement();
            },

            radio: function(value, name, caption, data) {

                var dataList = ui.api.existProperty(data, 'list', {});

                return  new ui.FFRadio(value, name, dataList)
                    .setRequired(ui.api.existProperty(data, 'required', false))
                    .setCaption(caption)
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

            if (this._hideBtn._btnSave === false) {

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

            if (this._hideBtn._btnClean === false) {

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
         *
         * @param {string} type
         * @param {string|number} caption
         * @param {{}|[]} listData
         * @param {boolean} required
         * @returns {{type: *, caption: *}|{type: *, caption: *, list: {}}}
         * @private
         */
        _getDataField: function(type, caption, listData, required) {

            var data = {
                type:     type,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            if (listData !== null) {

                data['list'] = listData;
            }

            return data;
        },

        /**
         * @returns {*|Element}
         * @private
         */
        _buildRow: function() {

            var parentElement = new ui.Element('div');

            for (var index in this._settings) {

                var elementRow = new ui.Element('div')
                    .addClassElement(ui.CSS.newLine);

                if (this._settings.hasOwnProperty(index)) {

                    for (var nameField in this._settings[index]) {

                        var countGroup = Math.round(12 / Object.keys(this._settings[index]).length);
                        //noinspection JSUnfilteredForInLoop
                        var dataField = this._settings[index][nameField];
                        var type = dataField.type;
                        var caption = ui.api.existProperty(dataField, 'caption', null);

                        if (this._htmlFields.hasOwnProperty(type)) {
                            //noinspection JSUnfilteredForInLoop
                            elementRow.addChildAfter(
                                new ui.Element('div')
                                    .setWidthElement(countGroup)
                                    .addChildAfter(this._htmlFields[type](this._values, nameField, caption, dataField))
                                    .getElement()
                            );
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
        _buildForrm: function() {

            var form = new ui.Element('form')
                .setIdElement(this._idForm, null)
                .setAttrElement('method', this._method)
                .addChildBefore(this._buildBlockHidden())
                .addChildAfter(this._buildRow());

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

            page
                .setBody(form.toHTML());

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
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.Form}
         */
        addTextField: function(name, caption, required) {

            var countRow = this._settings.length - 1;

            this._settings[countRow][name] = this._getDataField(_TYPE_TEXT, caption, null, required);

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

            this._settings[countRow][name] = this._getDataField(_TYPE_PASS, caption, null, required);

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

            this._settings[countRow][name] = this._getDataField(_TYPE_TEXTAREA, caption, null, required);

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

            this._settings[countRow][name] = this._getDataField(_TYPE_DATE, caption, null, required);

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

            this._settings[countRow][name] = this._getDataField(_TYPE_SELECT, caption, data, required);

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

            this._settings[countRow][name] = this._getDataField(_TYPE_CHECKBOX, caption, null, required);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number|null} caption
         * @param {{}|[]} data
         * @param {boolean} required
         * @returns {ui.Form}
         */
        addRadioField: function(name, caption, data, required) {

            var countRow = this._settings.length - 1;

            this._settings[countRow][name] = this._getDataField(_TYPE_RADIO, caption, data, required);

            return this;
        },

        /**
         *
         * @param {{}} data
         * @returns {ui.Form}
         */
        setDataFields: function(data) {

            this._values = data;
            return this;
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
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {
            return this._buildForrm();
        },

        /**
         * Get html current element
         * @returns {string}
         * @public
         */
        toHTML: function() {
            return this._buildForrm().outerHTML;
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