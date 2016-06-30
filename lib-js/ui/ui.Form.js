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
     * @param {string|null} action
     * @constructor
     */
    ui.Form = function (action) {

        this._action = action;
        this._values   = {};
        this._settings = [];
        this._buttons  = [
            {type: 'button', name: 'btn_save',   leftIcon: 'save',    skin: 'primary', caption: 'Сохранить'},
            {type: 'button', name: 'btn_clean',  leftIcon: 'refresh', skin: 'primary', caption: 'Очистить'},
            {type: 'button', name: 'btn_remove', leftIcon: 'trash',   skin: 'danger'},
            {type: 'button', name: 'btn_back',   leftIcon: 'retweet', skin: 'primary', caption: 'Назад'}
        ];
    };

    /** @protected */
    ui.Form.prototype = {

        _title: null,
        _method: ui.Config.defaultMethodForm,

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

        setMethod: function(method) {

            this._method = ui.api.empty(method, ui.Config.defaultMethodForm);
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
         * @param {string|number} caption
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
                    .addClassElement('row');

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

            parentElement.addChildAfter(
                new ui.FFButton()
                    .addButtonList(this._buttons)
                    .setPaddingBlock('lg')
                    .setActive()
                    .setGroup('toolbar')
                    .getElement()
            );

            return parentElement.getElement();
        },

        _buildForrm: function() {

            var form = new ui.Element('form')
                .setAttrElement('method', this._method)
                .setIdElement(this._id)
                .addChildAfter(this._buildRow());

            if (this._action !== null) {

                form.setAttrElement('action', this._action)
            }

            return form.getElement();
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