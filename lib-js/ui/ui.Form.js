(function(ui) {

    var _TYPE_TEXT     = 'text';
    var _TYPE_PASS     = 'password';
    var _TYPE_TEXTAREA = 'textarea';
    var _TYPE_DATE     = 'date';
    var _TYPE_SELECT   = 'select';
    var _TYPE_CHECKBOX = 'checkbox';
    var _TYPE_RADIO    = 'radio';

    /**
     * @memberOf ui
     * @namespace ui.Form
     * @constructor
     */
    ui.Form = function () {

        this._values   = {};
        this._settings = [];
        this._addBtnBottom  = [];
        this._addBtnTop     = [];

        this._btnDefaultTop    = [];
        this._btnDefaultBottom = [];
    };

    /** @protected */
    ui.Form.prototype = {

        _hideBtn: {
            _btnSave:   false,
            _btnClean:  false,
            _btnRemove: false,
            _btnBack:   false
        },

        _positionBtnTop:    'left',
        _positionBtnBottom: 'right',

        _title:      null,
        _titleSmall: null,

        _method: ui.Config.defaultMethodForm,
        _action: null,

        _htmlFields: {

            text: function(value, name, caption) {

                return new ui.FFText(value, name, caption)
                    .getElement();
            },

            password: function(value, name, caption) {

                return new ui.FFPassword(value, name, caption)
                    .getElement();
            },

            textarea: function(value, name, caption) {

                return new ui.FFTextarea(value, name, caption)
                    .setResize('vertical')
                    .getElement();
            },

            date: function(value, name, caption) {

                return new ui.FFDate(value, name, caption)
                    .getElement();
            },

            select: function(value, name, caption, data) {

                var dataList = ui.api.existProperty(data, 'list', {});

                return  new ui.FFSelect(value, name, caption)
                    .setList(dataList)
                    .getElement();
            },

            checkbox: function(value, name, caption) {

                return new ui.FFCheckbox()
                    .addCheckbox(value, name, caption)
                    .setFieldsHorizontal()
                    .getElement();
            },

            radio: function(value, name, caption, data) {

                var dataList = ui.api.existProperty(data, 'list', {});

                return  new ui.FFRadio(value, name, dataList)
                    .setFieldsHorizontal()
                    .getElement();
            }
        },

        /**
         * @private
         * returns {voild}
         */
        _addDefaultBtn: function() {

            if (this._hideBtn._btnBack === false) {

                this._btnDefaultTop.push(
                    {type: 'button', name: '_btnBack',   leftIcon: 'retweet', skin: 'primary', caption: 'Назад'}
                );
            }

            if (this._hideBtn._btnSave === false) {

                this._btnDefaultBottom.push(
                    {type: 'button', name: '_btnSave',   leftIcon: 'save',    skin: 'primary', caption: 'Сохранить'}
                );
            }

            if (this._hideBtn._btnClean === false) {

                this._btnDefaultBottom.push(
                    {type: 'button', name: '_btnClean',  leftIcon: 'refresh', skin: 'primary', caption: 'Очистить'}
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
         * @returns {{type: *, caption: *}|{type: *, caption: *, list: {}}}
         * @private
         */
        _getDataField: function(type, caption, listData) {

            var data = {
                type:    type,
                caption: caption
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
         * @returns {ui.Form}
         */
        addTextField: function(name, caption) {

            var countRow = this._settings.length - 1;

            this._settings[countRow][name] = this._getDataField(_TYPE_TEXT, caption, null);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @returns {ui.Form}
         */
        addPasswordField: function(name, caption) {

            var countRow = this._settings.length - 1;

            this._settings[countRow][name] = this._getDataField(_TYPE_PASS, caption, null);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @returns {ui.Form}
         */
        addTextareaField: function(name, caption) {

            var countRow = this._settings.length - 1;

            this._settings[countRow][name] = this._getDataField(_TYPE_TEXTAREA, caption, null);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @returns {ui.Form}
         */
        addDateField: function(name, caption) {

            var countRow = this._settings.length - 1;

            this._settings[countRow][name] = this._getDataField(_TYPE_DATE, caption, null);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {{}|[]} data
         * @returns {ui.Form}
         */
        addSelectField: function(name, caption, data) {

            var countRow = this._settings.length - 1;

            this._settings[countRow][name] = this._getDataField(_TYPE_SELECT, caption, data);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @returns {ui.Form}
         */
        addCheckboxField: function(name, caption) {

            var countRow = this._settings.length - 1;

            this._settings[countRow][name] = this._getDataField(_TYPE_CHECKBOX, caption, null);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number|null} caption
         * @param {{}|[]} data
         * @returns {ui.Form}
         */
        addRadioField: function(name, caption, data) {

            var countRow = this._settings.length - 1;

            this._settings[countRow][name] = this._getDataField(_TYPE_RADIO, caption, data);

            return this;
        },

        /**
         *
         * @param {{}} data
         * @returns {ui.Form}
         */
        setDataValues: function(data) {

            this._values = data;
            return this;
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
                .setAttrElement('method', this._method)
                .setIdElement(this._id)
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