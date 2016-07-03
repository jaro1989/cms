(function(ui) {

    var _TYPE_TEXT     = 'text';
    var _TYPE_PASS     = 'password';
    var _TYPE_TEXTAREA = 'textarea';
    var _TYPE_DATE     = 'date';
    var _TYPE_SELECT   = 'select';
    var _TYPE_CHECKBOX = 'checkbox';
    var _TYPE_RADIO    = 'radio';

    var uniqueId = new Date().getTime();

    /**
     * @memberOf ui
     * @namespace ui.Form
     * @param {string} idForm
     * @constructor
     */
    ui.Form = function (idForm) {

        /**
         * @type {{}}
         * @private
         */
        this._values   = {};

        /**
         * @type {Array}
         * @private
         */
        this._settings = [];

        /**
         * @type {Array}
         * @private
         */
        this._addBtnBottom  = [];

        /**
         * @type {Array}
         * @private
         */
        this._addBtnTop     = [];

        /**
         * @type {Array}
         * @private
         */
        this._btnDefaultTop    = [];

        /**
         * @type {Array}
         * @private
         */
        this._btnDefaultBottom = [];

        this._idForm = ui.api.empty(idForm, uniqueId);
        uniqueId++;
    };

    /** @protected */
    ui.Form.prototype = {

        _hideBtn: {
            _btnSave:   false,
            _btnClean:  false,
            _btnRemove: false,
            _btnBack:   false
        },

        _urlBack: document.referrer,

        _positionBtnTop:    'left',
        _positionBtnBottom: 'right',

        _title:      null,
        _titleSmall: null,

        _method: ui.Config.defaultMethodForm,
        _action: null,

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
                    {type: 'button', name: '_btnBack', leftIcon: 'retweet', skin: 'primary', caption: 'Назад', onclick: "window.location.href = '" + this._urlBack + "'"}
                );
            }

            if (this._hideBtn._btnSave === false) {

                this._btnDefaultBottom.push(
                    {type: 'button', name: '_btnSave', leftIcon: 'save', skin: 'primary', caption: 'Сохранить', onclick: "new ui.Form().getDataFields('" + this._idForm + "')"}
                );
            }

            if (this._hideBtn._btnClean === false) {

                this._btnDefaultBottom.push(
                    {type: 'button', name: '_btnClean', leftIcon: 'refresh', skin: 'primary', caption: 'Очистить'}
                );
            }

            if (this._hideBtn._btnRemove === false) {

                this._btnDefaultBottom.push(
                    {type: 'button', name: '_btnRemove', leftIcon: 'trash',   skin: 'danger'}
                );
            }
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
         * @param {string} action
         * @returns {ui.Form}
         */
        setAction: function(action) {

            this._action = action;
            return this;
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

        validationField: function(element) {

            var res = true;

            console.log(element, ui.api.findParent(ui.api.findParent(element, 'div'), 'div'));

            //=========================================

            if (element.required || element.classList.contains(ui.CSS.requiredClass)) {

                if (element.type === 'checkbox' && !element.checked) {

                    res = false;

                } else {

                    if (element.value == '') {

                        res = false;
                    }
                }
            }

            return res;
        },

        /**
         * Get values fields
         * @param {string} idForm
         * @returns {{}}
         */
        getDataFields: function(idForm) {

            var form = document.getElementById(idForm).elements;

            var obj = {fields: {}, validate: []};

            for (var key in form) {

                var element = form.item(key);

                if (element.name != '' && !isNaN(Number(key))) {

                    if (this.validationField(element) === false) {

                        obj.validate.push(element.name);
                    }

                    if (element.type === 'checkbox') {

                        if (element.checked) {

                            obj.fields[element.name] = ui.Config.checkboxValue.checked;

                        } else {

                            obj.fields[element.name] = ui.Config.checkboxValue.nochecked;
                        }

                    } else if (element.type === 'radio') {

                        if (element.checked) {

                            obj.fields[element.name] = element.value;

                        }

                    } else {

                        obj.fields[element.name] = element.value;
                    }
                }
            }
            console.log(obj);
            return obj;
        },

        /**
         *
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
                        var dataField = this._settings[index][nameField];
                        var type = dataField.type;
                        var caption = ui.api.existProperty(dataField, 'caption', null);

                        if (this._htmlFields.hasOwnProperty(type)) {

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

        _buildForrm: function() {

            var form = new ui.Element('form')
                .setIdElement(this._idForm, null)
                .setAttrElement('method', this._method)
                .addChildAfter(this._buildRow());

            if (ui.api.empty(this._action, null) !== null) {

                form.setAttrElement('action', this._action)
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
         * @param {string} url
         * @returns {ui.Form}
         */
        setUrlBack: function(url) {

            this._urlBack = ui.api.empty(url, null);
            return this
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