(function(ui) {
    'use strict';

    var _TYPE_TEXT      = '_ffText';
    var _TYPE_PASS      = '_ffPassword';
    var _TYPE_TEXTAREA  = '_ffTextarea';
    var _TYPE_DATE      = '_ffDate';
    var _TYPE_DATETIME  = '_ffDateTime';
    var _TYPE_SELECT    = '_ffSelect';
    var _TYPE_CHECKBOX  = '_ffCheckbox';
    var _TYPE_RADIO     = '_ffRadio';
    var _TYPE_READ_ONLY = '_ffReadonly';

    var _TYPE_CONTENT_DATE = 'date';
    var _TYPE_CONTENT_DATETIME = 'datetime';

    var _OBJECT_NAME  = 'object_name';
    var _PARENT_TITLE = 'parent_title';
    var _BLOCK_ROWS   = 'block_rows';
    var _BLOCK_FIELDS = 'block_fields';

    var _DATA_LAST_ROW_CH = 'data-last-row';
    var _DATA_OBJECT_CH   = 'data-object';
    var _DATA_NAME_FIELD  = 'data-name-field';

    var _CLASS_BTN_ADD     = 'btn_add';
    var _CLASS_BTN_DEL     = 'btn_del';
    var _CLASS_RECORD_ID   = 'record_id';
    var _CLASS_ROW         = 'row-fields';
    var _BLOCK_FIELD       = 'block-field';

    var DATA_JSON_FORM_PR = 'data-json-form-pr';
    var DATA_JSON_FORM_CH = 'data-json-form-ch';

    var uniqueId = new Date().getTime();

    /**
     * @memberOf ui
     * @constructor
     */
    ui.HtmlFields = function () {

        /**
         * @type {{}}
         * @private
         */
        this._settings = {};
        this.widthCaption = null;
        this.maxHeightFields = null;
        this.heightFields = null;
        this.checkboxText = ui.Config.checkboxText;
        this._formatDateUser = ui.Config.formatDateUser;
        this._formatDateSave = ui.Config.formatDateSave;
        this._formatDateTimeUser = ui.Config.formatDateTimeUser;
        this._formatDateTimeSave = ui.Config.formatDateTimeSave;
    };

    /** @public */
    ui.HtmlFields.prototype = {

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffReadonly: function(value, name, params) {

            var dataList = ui.api.existProperty(params, 'list', false);
            var dataValue = ui.api.setValue(value, name, params.defValue);

            if (dataList !== false) {

                value = ui.api.existProperty(dataList, dataValue, null);
            }

            if (params.type === _TYPE_DATE || params.typeContent == _TYPE_CONTENT_DATE) {

                value = new ui.FormatDate(dataValue, this._formatDateUser).getDate();

            } else if (params.type === _TYPE_DATETIME || params.typeContent == _TYPE_CONTENT_DATETIME) {

                value = new ui.FormatDate(dataValue, this._formatDateTimeUser).getDate();

            } else if (params.type === _TYPE_CHECKBOX) {

                value = ui.api.existProperty(this.checkboxText, dataValue, null);

            } else if (params.type === _TYPE_PASS) {

                value = ui.Config.valuePassword;
            }

            var caption = ui.api.existProperty(params, 'caption', null);

            return new ui.FFReadOnly(value, name, caption)
                .setWidthCaption(this.widthCaption)
                .setMaxHeight(ui.api.existProperty(params, 'height', this.maxHeightFields))
                .getElement();
        },

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffText: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            value = ui.api.setValue(value, name, params.defValue);

            return new ui.FFText(value, params['setname'], caption)
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
        _ffPassword: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            value = ui.api.setValue(value, name, params.defValue);

            return new ui.FFPassword(value, params['setname'], caption)
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
        _ffTextarea: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            value = ui.api.setValue(value, name, params.defValue);

            return new ui.FFTextarea(value, params['setname'], caption)
                .setRequired(ui.api.existProperty(params, 'required', false))
                .setHeight(ui.api.existProperty(params, 'height', this.maxHeightFields))
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
        _ffDate: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            value = ui.api.setValue(value, name, params.defValue);

            return new ui.FFDate(value, params['setname'], caption)
                .setRequired(ui.api.existProperty(params, 'required', false))
                .setWidthCaption(this.widthCaption)
                .setDateFormatUser(this._formatDateUser)
                .setDateFormatSave(this._formatDateSave)
                .getElement();
        },

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffDateTime: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            value = ui.api.setValue(value, name, params.defValue);

            return new ui.FFDateTime(value, params['setname'], caption)
                .setRequired(ui.api.existProperty(params, 'required', false))
                .setWidthCaption(this.widthCaption)
                .setDateFormatUser(this._formatDateTimeUser)
                .setDateFormatSave(this._formatDateTimeSave)
                .getElement();
        },

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffSelect: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            var dataList = ui.api.existProperty(params, 'list', {});
            value = ui.api.setValue(value, name, params.defValue);

            return  new ui.FFSelect(value, params['setname'], caption)
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
        _ffCheckbox: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            value = ui.api.setValue(value, name, params.defValue);

            return new ui.FFCheckbox()
                .addCheckbox(value, params['setname'], caption, null)
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
        _ffRadio: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            var dataList = ui.api.existProperty(params, 'list', {});
            value = ui.api.setValue(value, name, params.defValue);

            return  new ui.FFRadio(value, params['setname'], dataList)
                .setRequired(ui.api.existProperty(params, 'required', false))
                .setCaptionBlock(caption, this.widthCaption)
                .setWidthCaptionItem(ui.api.existProperty(params, 'width', 2))
                .setFieldsHorizontal()
                .getElement();
        },

        /**
         * @param {{}} params
         * @param {string} name
         * @returns {boolean}
         * @private
         */
        _setParametersFields: function(params, name) {

            var row = this._settings;
            var blockRows = row[_BLOCK_ROWS];
            var countRow  = Object.keys(blockRows).length - 1;

            if (blockRows[countRow].hasOwnProperty(_BLOCK_ROWS)) {
                // Переход к дочерним ключам
                row = blockRows[countRow];
                blockRows = blockRows[countRow][_BLOCK_ROWS];
                countRow  = Object.keys(blockRows).length - 1;
            }

            if (!blockRows[countRow].hasOwnProperty(_BLOCK_FIELDS)) {

                blockRows[countRow][_BLOCK_FIELDS] = {};
            }

            name = ui.api.empty(name, null);

            if (ui.api.empty(row[_OBJECT_NAME], null) !== null && name !== null) {

                params['object'] = row[_OBJECT_NAME];

            } else {

                params['object'] = null;

            }
            params['name'] = name;

            var blockFields = blockRows[countRow][_BLOCK_FIELDS];

            if (name === null) {

                name = _TYPE_READ_ONLY + '_' + Object.keys(blockFields).length;
            }

            blockFields[name] = params;
            return true;
        },

        /**
         * @param {string} defValue
         * @param {string|null} name
         * @param {string|number|null} caption
         * @param {string|number|null} height
         * @param {string|null} [type] - "date"|"datetime"|null
         * @returns {ui.HtmlFields}
         */
        addReadOnlyField: function(defValue, name, caption, height, type) {

            var params = {
                defValue: defValue,
                type:     _TYPE_READ_ONLY,
                typeContent: type,
                caption:  caption,
                height:   height
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} defValue
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addTextField: function(defValue, name, caption, required) {

            var params = {
                defValue: defValue,
                type:     _TYPE_TEXT,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} defValue
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addPasswordField: function(defValue, name, caption, required) {

            var params = {
                defValue: defValue,
                type:     _TYPE_PASS,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} defValue
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @param {string|number|null} height
         * @returns {ui.HtmlFields}
         */
        addTextareaField: function(defValue, name, caption, required, height) {

            var params = {
                defValue: defValue,
                type:     _TYPE_TEXTAREA,
                caption:  caption,
                required: ui.api.empty(required, false),
                height: ui.api.empty(height, null)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} defValue
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addDateField: function(defValue, name, caption, required) {

            var params = {
                defValue: defValue,
                type:     _TYPE_DATE,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} defValue
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addDateTimeField: function(defValue, name, caption, required) {

            var params = {
                defValue: defValue,
                type:     _TYPE_DATETIME,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} defValue
         * @param {string} name
         * @param {string|number} caption
         * @param {{}|[]} data
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addSelectField: function(defValue, name, caption, data, required) {

            var params = {
                defValue: defValue,
                type:     _TYPE_SELECT,
                caption:  caption,
                required: ui.api.empty(required, false),
                list:     data
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} defValue
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addCheckboxField: function(defValue, name, caption, required) {

            var params = {
                defValue: defValue,
                type:     _TYPE_CHECKBOX,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} defValue
         * @param {string} name
         * @param {string|number|null} caption
         * @param {{}|[]} data
         * @param {boolean} required
         * @param {number|null} width
         * @returns {ui.HtmlFields}
         */
        addRadioField: function(defValue, name, caption, data, required, width) {

            var params = {
                defValue: defValue,
                type:     _TYPE_RADIO,
                caption:  caption,
                required: ui.api.empty(required, false),
                list:     data,
                width:    width
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {number|string} height
         * @returns {ui.HtmlFields}
         */
        setMaxHeightFields: function(height) {
            this.maxHeightFields = height;
            return this;
        },

        /**
         * Set width label field {1-10}
         * @param {number|null} widthCaption {1-10}
         * @returns {ui.HtmlFields}
         * @public
         */
        setWidthCaption: function(widthCaption) {
            this.widthCaption = widthCaption;
            return this;
        },

        /**
         *
         * @param {string} format
         *                      'YYYY-MM-DD' | 'YYYY.MM.DD' | 'YYYY/MM/DD' |
         *                      'DD-MM-YYYY' | 'DD.MM.YYYY' | 'DD/MM/YYYY' |
         *                      'DD-MM-YY'   | 'DD.MM.YY'   | 'DD/MM/YY'   |
         * @returns {ui.HtmlFields}
         * @public
         */
        setFormatDateUser: function(format) {
            if (format.length == 8 ||  format.length == 10) {
                this._formatDateUser = format;
            }
            return this;
        },

        /**
         *
         * @param {string} format
         *                      'YYYY-MM-DD' | 'YYYY.MM.DD' | 'YYYY/MM/DD' |
         *                      'DD-MM-YYYY' | 'DD.MM.YYYY' | 'DD/MM/YYYY' |
         *                      'DD-MM-YY'   | 'DD.MM.YY'   | 'DD/MM/YY'   |
         * @returns {ui.HtmlFields}
         * @public
         */
        setFormatDateSave: function(format) {
            if (format.length == 8 ||  format.length == 10) {
                this._formatDateSave = format;
            }
            return this;
        },

        /**
         *
         * @param {string} format
         *                      'YYYY-MM-DD HH:MI:SS' | 'YYYY.MM.DD HH:MI:SS' | 'YYYY/MM/DD HH:MI:SS' |
         *                      'DD-MM-YYYY HH:MI:SS' | 'DD.MM.YYYY HH:MI:SS' | 'DD/MM/YYYY HH:MI:SS' |
         *                      'DD-MM-YY HH:MI:SS'   | 'DD.MM.YY HH:MI:SS'   | 'DD/MM/YYYY HH:MI:SS' |
         * @returns {ui.HtmlFields}
         * @public
         */
        setFormatDateTimeUser: function(format) {
            if (format.length == 17 || format.length == 19) {
                this._formatDateTimeUser = format;
            }
            return this;
        },

        /**
         *
         * @param {string} format
         *                       'YYYY-MM-DD HH:MI:SS' | 'YYYY.MM.DD HH:MI:SS' | 'YYYY/MM/DD HH:MI:SS' |
         *                       'DD-MM-YYYY HH:MI:SS' | 'DD.MM.YYYY HH:MI:SS' | 'DD/MM/YYYY HH:MI:SS' |
         *                       'DD-MM-YY HH:MI:SS'   | 'DD.MM.YY HH:MI:SS'   | 'DD/MM/YYYY HH:MI:SS' |
         * @returns {ui.HtmlFields}
         * @public
         */
        setFormatDateTimeSave: function(format) {
            if (format.length == 17 || format.length == 19) {
                this._formatDateTimeSave = format;
            }
            return this;
        },

        /**
         * @param {{}|[]} data
         * @example
         *          {0: 'Нет', 1: 'Да'}
         * @returns {ui.HtmlFields}
         */
        setCheckboxValuesRead: function(data) {

            if (typeof data == 'object') {

                this.checkboxText = data;
            }

            return this;
        }
    };

    /**
     * @memberOf ui
     * @param {string} idForm
     * @param {string|null} locale
     * @constructor
     */
    ui.Form = function (idForm, locale) {

        ui.HtmlFields.apply(this, arguments);

        this._parentValues = {};
        this._childrenValues = {};
        this._childrenRecordId = {};

        this._btnLeftTopForm = [];
        this._btnRightTopForm = [];

        this._btnLeftBottomForm = [];
        this._btnRightBottomForm = [];

        this._hideBtnForm = {
            _btnSave:   false,
            _btnClear:  false,
            _btnRemove: false,
            _btnBack:   false,
            _btnReload: false,
            _btnList:   false
        };

        this._idForm = ui.api.empty(idForm, uniqueId);
        uniqueId++;

        this._validation = true;
        this._paddingRelateBlock = 'xs';
        this._fieldRecordForm =   '';
        this._titleForm =      null;
        this._titleFormSmall = null;
        this._skinPanel = 'default';
        this._paddingPanels = 'xs';
        this._paddingChildrenPanel = 'sm';
        this._method = ui.Config.defaultMethodForm;
        this._checkboxText = ui.Config.checkboxText;
        this._urlBack = document.referrer;
        this._urlDel =  null;
        this._urlActionForm = null;
        this._urlList = null;
        this._actions = {
            removeParent: 'remove',
            removeChildren: 'remove'
        };
        this._readOnly = false;
        this._locale = ui.api.empty(locale, ui.Config.lbl[ui.Config.locale]);
        this._lbl = ui.api.existProperty(ui.Config.lbl, this._locale, ui.Config.lbl[ui.Config.locale]);
        this._alertBlockId = 'alert-' + this._idForm;
        this._debug = false;
    };

    ui.Form.prototype = Object.create(ui.HtmlFields.prototype);

    ui.Form.prototype.constructor = ui.Form;

    /**
     * @param {string} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'|'muted'}
     * @returns {ui.Form}
     */
    ui.Form.prototype.setSkin = function(skin) {
        this._skinPanel = skin;
        return this;
    };

    /**
     * @param {boolean} debug
     * @returns {ui.Form}
     */
    ui.Form.prototype.setDebug = function(debug) {
        this._debug = ui.api.empty(debug, true);
        return this;
    };

    /**
     * @private
     * returns {voild}
     */
    ui.Form.prototype._addDefaultBtn = function() {

        if (this._urlList !== null && this._hideBtnForm._btnList === false) {

            this._btnRightTopForm.push(
                {
                    type:     'button',
                    name:     '_list',
                    leftIcon: 'list',
                    skin:     'default',
                    caption:  this._lbl.btn_list,
                    active: false,
                    onclick:  "ui.api.reload('" + this._urlList + "');"
                }
            );
        }

        if (this._hideBtnForm._btnBack === false && this._urlBack != '' && this._urlBack !== window.location.href) {

            this._btnLeftTopForm.push(
                {
                    type:     'button',
                    name:     '_btnBack',
                    leftIcon: 'share-alt',
                    caption:  this._lbl.btn_back,
                    active: false,
                    onclick:  "window.location.href = '" + this._urlBack + "'"
                }
            );
        }

        if (this._hideBtnForm._btnReload === false) {

            this._btnLeftTopForm.push(
                {
                    type: 'button',
                    name: '_reloadPage',
                    leftIcon: 'repeat',
                    active: false,
                    onclick: "ui.api.reload();"
                }
            );
        }

        if (this._hideBtnForm._btnSave === false && this._readOnly === false) {

            this._btnRightBottomForm.push(
                {
                    type: 'button',
                    name: '_btnSave',
                    leftIcon: 'save',
                    skin: 'default',
                    active: false,
                    caption: this._lbl.btn_save,
                    onclick: "new ui.Form('" + this._idForm + "', '" + this._locale + "')._save();"
                }
            );
        }

        if (this._hideBtnForm._btnClear === false && this._readOnly === false) {

            this._btnRightBottomForm.push(
                {
                    type:     'button',
                    name:     '_btnClear',
                    leftIcon: 'refresh',
                    skin:     'default',
                    caption:  this._lbl.btn_clear,
                    active: false,
                    onclick:  "new ui.Form('" + this._idForm + "', '" + this._locale + "')._reset();"
                }
            );
        }

        if (this._hideBtnForm._btnRemove === false && this._parentValues.hasOwnProperty(this._fieldRecordForm) && this._urlDel !== null) {

            this._btnRightBottomForm.push(
                {
                    type:     'button',
                    name:     '_btnRemove',
                    leftIcon: 'trash',
                    skin:     'danger',
                    active: true,
                    caption:  this._lbl.btn_remove,
                    onclick:  "new ui.Form('" + this._idForm + "', '" + this._locale + "')._removeParent();"
                }
            );
        }
    };

    /**
     * @param {number} position 1 - 'top/left'| 2 - top/right | 3 - bottom/left | 4 - bottom/right
     * @param {string|null} typeBtn {'button'|'submit'}
     * @param {string|null} name
     * @param {string} icon
     * @param {string|number} caption
     * @param {string|null} onclick
     * @param {string} skin { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
     * @param {boolean} active
     * @returns {ui.Form}
     */
    ui.Form.prototype.addButton = function(position, typeBtn, name, icon, caption, onclick, skin, active) {

        var obj = {1: '_btnLeftTopForm', 2: '_btnRightTopForm', 3: '_btnLeftBottomForm', 4: '_btnRightBottomForm'};

        if (ui.api.existProperty(obj, position, false)) {

            var sendForm = typeBtn == 'submit' ? 'new ui.Form("' + this._idForm + '", "' + this._locale + '").sendForm(); ' : '';

            this[obj[position]].push(
                {
                    type: ui.api.empty(typeBtn, null),
                    name: ui.api.empty(name, null),
                    leftIcon: ui.api.empty(icon, null),
                    caption: ui.api.empty(caption, null),
                    skin: ui.api.empty(skin, null),
                    onclick: sendForm + ui.api.empty(onclick, null),
                    active: active
                }
            );
        }

        return this;
    };

    /**
     * Send form data to server
     */
    ui.Form.prototype.sendForm = function() {

        var data = new ui.FormData(this._idForm, this._locale).getData();

        if (data.error.length === 0) {

            document.getElementById(this._idForm).submit();
        }

        return false;
    };

    /**
     * @returns {*|Element}
     * @private
     */
    ui.Form.prototype._blockHiddenPr = function() {

        var obj = {
            _urlActionForm: this._urlActionForm,
            _urlDel: this._urlDel,
            _fieldRecordForm: this._fieldRecordForm,
            _idRecord: ui.api.existProperty(this._parentValues, this._fieldRecordForm, null),
            _debug: this._debug,
            _actions: {
                removeParent: this._actions.removeParent
            }
        };

        return new ui.Element('div')
            .setAttrElement('hidden',  true)
            .addClassElement(ui.CSS.formBlockHiddenClass)
            .addChildAfter(
                new ui.Element('div')
                    .setIdElement(DATA_JSON_FORM_PR, null)
                    .setAttrElement(DATA_JSON_FORM_PR, JSON.stringify(obj))
                    .getElement()
            )
            .getElement();
    };

    ui.Form.prototype._blockHiddenCh = function(data) {

        var obj = {
            _objectName:  data['object'],
            _fieldName:   data['record_name'],
            _fieldRecordForm: data['record_field'],
            _idRecord:    data['record'],
            _idForm: this._idForm,
            _debug: this._debug,
            _actions: {
                removeChildren: this._actions.removeChildren
            }
        };

        return new ui.Element('div')
            .setAttrElement('hidden',  true)
            .addClassElement(ui.CSS.formBlockHiddenClass)
            .addChildAfter(
                new ui.Element('div')
                    .addClassElement(DATA_JSON_FORM_CH)
                    .setAttrElement(DATA_JSON_FORM_CH, JSON.stringify(obj))
                    .getElement()
            )
            .getElement();
    };

    /**
     * @param {
     *          {
     *              objectName: 'string|null',
     *              blockRows: {
     *                  row_0: {
     *                      blockFields: {
     *                          nameFields: {
     *                              type: 'string',
     *                              caption: 'string|number',
     *                              required: 'boolean',
     *                              list: {},
     *                              height: 'string|number|null'
     *                          }
     *                      }
     *                  },
     *                  row_1: {
     *                      objectName: 'string|null',
     *                      blockRows: {
     *                          row_0: {
     *                              blockFields: {
     *                                  nameFields: {
     *                                      type: 'string',
     *                                      caption: 'string|number',
     *                                      required: 'boolean',
     *                                      list: {},
     *                                      height: 'string|number|null'
     *                                  }
     *                              }
     *                          },
     *                      }
     *                  }
     *              }
     *          }
     *        } settings
     * @param {boolean} parent If build row for parent object is true else false
     * @returns {*|Element}
     * @private
     */
    ui.Form.prototype._buildBlockRows = function (settings, parent) {

        var objName = settings[_OBJECT_NAME];
        var title   = settings[_PARENT_TITLE];

        var panel = new ui.Element('div')
            .addClassElement(ui.CSS.panelClass.panel)
            .setSkinElement('panel', this._skinPanel);

        if (ui.api.empty(title, false)) {

            panel.addChildBefore(
                new ui.Element('div')
                    .addClassElement(ui.CSS.panelClass.panelHead)
                    .addChildBefore(
                        new ui.Element('h3')
                            .addClassElement(ui.CSS.panelClass.panelTitle)
                            .setContentElement(title)
                            .getElement()
                    )
                    .getElement()
            )
        }

        var panelBody = new ui.Element('div')
            .addClassElement(ui.CSS.panelClass.panelBody);

        var key = null;

        if (parent === true) {

            panelBody.addChildBefore(
                this._buildRow(this._parentValues, settings, null)
            );

        } else {

            if (this._childrenValues.hasOwnProperty(objName)) {

                var values = this._childrenValues[objName];
                var countRecord = Object.keys(values).length;

                for (key in values) {

                    panelBody
                        .setAttrElement(_DATA_LAST_ROW_CH, countRecord)
                        .setAttrElement(_DATA_OBJECT_CH, objName)
                        .addChildAfter(this._buildRow(values[key], settings, key));
                }
            }

            if (key === null) {

                panelBody.addChildBefore(
                    this._buildRow({}, settings, 0)
                );
            }
        }

        if (key === null && this._readOnly === true && parent === false) {

            return new ui.Element('div')
                .getElement();

        } else {

            return panel
                .setPaddingElement(this._paddingPanels)
                .addChildAfter(panelBody.getElement())
                .getElement();
        }
    };

    /**
     * This method build rows and cells with fields also blocks and rows with cells and fields
     * @param {{}} values
     * @param {
     *          {
     *              objectName: 'objectName',
     *              blockRows: {
     *                  row_0: {
     *                      blockFields: {
     *                          nameFields: {
     *                              type: 'string',
     *                              caption: 'string|number',
     *                              required: 'boolean',
     *                              list: {},
     *                              height: 'string|number|null'
     *                          }
     *                      }
     *                  },
     *                  row_1: {
     *                      objectName: 'string|null',
     *                      blockRows: {
     *                          row_0: {
     *                              blockFields: {
     *                                  nameFields: {
     *                                      type: 'string',
     *                                      caption: 'string|number',
     *                                      required: 'boolean',
     *                                      list: {},
     *                                      height: 'string|number|null'
     *                                  }
     *                              }
     *                          }
     *                      }
     *                  }
     *              }
     *          }
     *        } settings
     * @param {number|null} key_record
     * @returns {*|Element}
     * @private
     */
    ui.Form.prototype._buildRow = function(values, settings, key_record) {

        var params  = settings[_BLOCK_ROWS];
        var objName = settings[_OBJECT_NAME];

        var blockRows = new ui.Element('div')
            .addClassElement(_CLASS_ROW);

        if (this._childrenRecordId.hasOwnProperty(objName)) {

            var name = this._childrenRecordId[objName];
            var record_params   = {object: objName, name: name};
            var record = ui.api.setValue(values, name);
            this._setNameField(key_record, record_params);

            blockRows
                .addChildAfter(
                    this._blockHiddenCh(
                        {
                            object: objName,
                            record: record,
                            record_name: record_params['setname'],
                            record_field: name
                        }
                    )
                );
        }

        for (var numRow in params) {

            if (params[numRow].hasOwnProperty(_BLOCK_ROWS)) {

                blockRows
                    .addChildAfter(
                        new ui.Element('div')
                            .setPaddingElement(this._paddingChildrenPanel)
                            .addChildBefore(
                                this._buildBlockRows(params[numRow], false)
                            )
                            .getElement()
                    )

            } else {

                blockRows.addChildAfter(
                    new ui.Element('div')
                        .addClassElement(ui.CSS.newLine)
                        .setPaddingElement(this._paddingRelateBlock)
                        .addChildAfter(
                            this._buildFields(values, objName, params[numRow][_BLOCK_FIELDS], key_record, numRow)
                        )
                        .getElement()
                )
            }
        }

        if (key_record) {

            blockRows
                .addChildAfter(
                    new ui.Element('hr')
                        .getElement()
                );
        }

        return blockRows.getElement();
    };

    /**
     * This method build cell with fields
     *
     * @param {{}} values
     * @param {[]} objectName
     * @param {
     *          {
     *              nameFields: {
     *                  type: 'string',
     *                  caption: 'string|number',
     *                  required: 'boolean',
     *                  list: {},
     *                  height: 'string|number|null'
     *              }
     *          }
     *        } settings
     * @param {number|null} key_record
     * @param {number} numRow
     * @returns {*|Element}
     * @private
     */
    ui.Form.prototype._buildFields = function(values, objectName, settings, key_record, numRow) {

        var blockFields = new ui.Element('div');

        for (var nameField in settings) {

            var params = settings[nameField];

            if (params.hasOwnProperty('type')) {

                var type = params.type;

                if (this._readOnly !== false) {

                    type = _TYPE_READ_ONLY;
                }

                this._setNameField(key_record, params);

                /**
                 * @type Node
                 */
                var field = this[type](values, nameField, params);
                var delimiter = (key_record === null) ? 12 : 10;
                var countGroup = Math.round(delimiter / (Object.keys(settings).length));

                blockFields
                    .addChildAfter(
                        new ui.Element('div')
                            .setAttrElement(_DATA_NAME_FIELD, params['name'])
                            .addClassElement(_BLOCK_FIELD)
                            .setWidthElement(countGroup)
                            .addChildAfter(field)
                            .getElement()
                    );
            }
        }

        if (key_record !== null && numRow == 0 && this._readOnly === false) {

            var btn = new ui.FFButton()
                .setGroup('toolbar')
                .setOnClick("new ui.Form(null, '" + this._locale + "')._addChildren(this);")
                .setClass(_CLASS_BTN_ADD)
                .addButton(null, null, null, null, false, 'plus')
                .setOnClick("new ui.Form(null, '" + this._locale + "')._removeChildren(this);")
                .setClass(_CLASS_BTN_DEL)
                .addButton(null, 'del_record', null, null, false, 'minus')
                .setSize('sm')
                .setPositionBlock('right');

            if (Object.keys(values).length == 0) {

                btn.hide('del_record');
            }

            blockFields
                .addChildAfter(
                    btn.getElement()
                );
        }

        return blockFields.getElement();
    };

    /**
     * @param {number|null} key_record
     * @param {{}} params
     * @private
     */
    ui.Form.prototype._setNameField = function(key_record, params) {

        if (key_record !== null) {

            params['setname'] = params['object'] + '[' + key_record + '][' + params['name'] + ']';

        } else {

            if (params['object'] !== null) {

                params['setname'] = params['object'] + '[' + params['name'] + ']';

            } else {

                params['setname'] = params['name'];
            }
        }
    };

    /**
     * Generate html form
     * @returns {*|Element}
     * @private
     */
    ui.Form.prototype._buildForm = function() {

        var form = new ui.Element('form')
            .setIdElement(this._idForm, null)
            .setAttrElement('method', this._method)
            .addChildBefore(this._blockHiddenPr())
            .addChildAfter(this._buildBlockRows(this._settings, true))
            .setAttrElement('action', this._urlActionForm);

        this._addDefaultBtn();

        var page = new ui.Page(null)
            .setTitle(this._titleForm, this._titleFormSmall, null);

        if (this._btnLeftTopForm.length > 0 || this._btnRightTopForm.length > 0) {

            page.setHead(this._buildRowButtons(this._btnLeftTopForm, this._btnRightTopForm));
        }

        page.setBody(form.toHTML());

        if (this._btnLeftBottomForm.length > 0 || this._btnRightBottomForm.length > 0) {

            page.setFooter(this._buildRowButtons(this._btnLeftBottomForm, this._btnRightBottomForm));
        }

        return page.getElement();
    };

    /**
     * @param {[]} leftBtn
     * @param {[]} rightBtn
     * @returns {string}
     * @private
     */
    ui.Form.prototype._buildRowButtons = function (leftBtn, rightBtn) {

        return new ui.Element('div')
            .addClassElement(ui.CSS.newLine)
            .addChildAfter(
                new ui.Element('div')
                    .setWidthElement(6)
                    .addChildAfter(
                        new ui.FFButton()
                            .addButtonList(leftBtn)
                            .setPositionBlock('left')
                            .setGroup('toolbar')
                            .getElement()
                    )
                    .getElement()
            )
            .addChildAfter(
                new ui.Element('div')
                    .setWidthElement(6)
                    .addChildAfter(
                        new ui.FFButton()
                            .addButtonList(rightBtn)
                            .setPositionBlock('right')
                            .setGroup('toolbar')
                            .getElement()
                    )
                    .getElement()
            ).toHTML();
    };

    /**
     * @returns {boolean}
     */
    ui.Form.prototype._save = function() {

        var dataBlock = document.body.querySelector('#' + this._idForm + ' #' + DATA_JSON_FORM_PR);
        var str = dataBlock.getAttribute(DATA_JSON_FORM_PR);
        var listParams = JSON.parse(str);

        var data = new ui.FormData(this._idForm, this._locale).getData();
        var lbl = ui.api.existProperty(ui.Config.lbl, this._locale, ui.Config.locale);

        if (data.error.length === 0) {

            var curObj = this;
            listParams._debug ? console.log(listParams, data) : null;

            new ui.Ajax()
                .setUrl(listParams._urlActionForm)
                .setParams(data['data'])
                .addParam(listParams._fieldRecordForm, listParams._idRecord)
                .addParam('action', (listParams._idRecord > 0) ? 'edit' : 'save')
                .addCallbackFunction(function (e) {

                    listParams._debug ? console.log(e) : null;

                    try {
                        var response = JSON.parse(e);

                        if (response.record > 0) {

                            listParams._idRecord = response.record;
                            dataBlock.setAttribute(DATA_JSON_FORM_PR, JSON.stringify(listParams));

                            new ui.Alert(curObj._alertBlockId)
                                .addSuccess(lbl.success, lbl.successSave, null)
                                .appendHTML('#' + curObj._idForm, true);

                        } else if ('error' in response) {

                            new ui.Alert(curObj._alertBlockId)
                                .addError(lbl.error, response.error, null)
                                .appendHTML('#' + curObj._idForm, true);
                        }

                    } catch (e) {

                        new ui.Alert(curObj._alertBlockId)
                            .addError(lbl.error, lbl.errorAjaxResponse, null)
                            .appendHTML('#' + curObj._idForm, true);

                    }
                })
                .send();
        } else {

            new ui.Alert(this._alertBlockId)
                .addError(lbl.error, lbl.requiredAlert, null)
                .appendHTML('#' + this._idForm, true);
        }

        return true;
    };

    /**
     * @returns {boolean}
     */
    ui.Form.prototype._removeParent = function() {

        var dataBlock = document.body.querySelector('#' + this._idForm + ' #' + DATA_JSON_FORM_PR);
        var str = dataBlock.getAttribute(DATA_JSON_FORM_PR);
        var listParams = JSON.parse(str);

        if (listParams._idRecord != '' &&  listParams._urlDel != '' && listParams._fieldRecordForm != '') {

            var lbl = ui.api.existProperty(ui.Config.lbl, this._locale, ui.Config.locale);
            var record = {id: [listParams._idRecord], action: listParams._actions.removeParent};
            var curObj = this;

            listParams._debug ? console.log(listParams, record) : null;

            new ui.Ajax()
                .setUrl(listParams._urlDel)
                .setParams(record)
                .addCallbackFunction(
                    function (e) {

                        listParams._debug ? console.log(e) : null;

                        try {

                            var res = JSON.parse(e);

                            if (typeof res == 'object' && ui.api.existProperty(res, 'error', null)) {

                                new ui.Alert(curObj._alertBlockId)
                                    .addError(lbl.error, res.error, null)
                                    .appendHTML('#' + curObj._idForm, true);

                            } else {

                                ui.api.reload(null);
                            }

                        } catch (e) {

                            new ui.Alert(curObj._alertBlockId)
                                .addError(lbl.error, lbl.removingError, null)
                                .appendHTML('#' + curObj._idForm, true);
                        }
                    }
                )
                .send();
        }

        return true
    };

    /**
     * @param {Node} element
     * @private
     */
    ui.Form.prototype._removeChildren = function(element) {

        var block = ui.api.findParent(element, '.' + _CLASS_ROW);
        var dataBlock = block.querySelector('.' + DATA_JSON_FORM_CH);
        var str = dataBlock.getAttribute(DATA_JSON_FORM_CH);
        var parentBlock = block.parentElement;

        try {

            var listParams = JSON.parse(str);
            var dataParentBlock = document.body.querySelector('#' + listParams._idForm + ' #' + DATA_JSON_FORM_PR);
            var listParamsParent = JSON.parse(dataParentBlock.getAttribute(DATA_JSON_FORM_PR));

            var data = {};
            data[listParams._fieldRecordForm] = listParams._idRecord;
            data['object'] = listParams._objectName;
            listParams._debug ? console.log(listParams, data) : null;

            new ui.Ajax()
                .setUrl(listParamsParent._urlDel)
                .setParams(data)
                .addParam('action', listParams._actions.removeChildren)
                .addCallbackFunction(function (e) {

                    listParams._debug ? console.log(e) : null;
                })
                .send();
        } catch (e) {

        }

        if (parentBlock.childElementCount == 2) {

            var children = parentBlock.childNodes, key;

            for (key in children) {

                if (typeof children[key] == 'object') {

                    ui.api.hide(children[key].querySelector('.' + _CLASS_BTN_DEL));
                }
            }
        }

        block.remove();
    };

    /**
     * @param {Node} element
     * @private
     */
    ui.Form.prototype._addChildren = function(element) {

        var block = ui.api.findParent(element, '.' + _CLASS_ROW);
        var parentBlock = block.parentElement;

        var btn = parentBlock.children[0].querySelector('.' + _CLASS_BTN_DEL);
        ui.api.show(btn);

        var rowClone = block.cloneNode(true);
        //Reset data clone
        var dataBlock = rowClone.querySelector('.' + DATA_JSON_FORM_CH);

        var str = dataBlock.getAttribute(DATA_JSON_FORM_CH);
        var listParams = JSON.parse(str);

        for (var property in listParams) {

            listParams[property] = null;
        }
        dataBlock.setAttribute(DATA_JSON_FORM_CH, JSON.stringify(listParams));

        //Find tag with text error in clone
        var errorBlock = rowClone.querySelector('.' + ui.CSS.validateErrorClass);
        errorBlock.innerHTML = '';

        var record = rowClone.querySelector('.' + _CLASS_RECORD_ID);

        if (record !== null) {

            ui.api.findParent(record, '.' + ui.CSS.validateFieldBlockClass).remove();
        }

        //Find fields in clone
        var fields = rowClone.querySelectorAll('input, textarea, select');

        var key = null;
        var object_name = parentBlock.getAttribute(_DATA_OBJECT_CH);
        var lastRow = parentBlock.getAttribute(_DATA_LAST_ROW_CH);

        for (key in fields) {

            if (typeof fields[key] == 'object') {
                //Reset style error
                var skinClass = ui.CSS.prefixClass.field + '-' + ui.CSS.skinClass.default.error;
                fields[key].parentElement.classList.remove(skinClass);

                var block_field = ui.api.findParent(fields[key], '.' + _BLOCK_FIELD);

                if (block_field !== null) {

                    var field_name = block_field.getAttribute(_DATA_NAME_FIELD);
                    fields[key].setAttribute('name', object_name + '[' + lastRow + '][' + field_name + ']');
                    block_field.querySelector('.' + ui.CSS.validateErrorClass).innerHTML = '';
                }

                fields[key].defaultValue = '';
                fields[key].value = '';
                fields[key].innerHTML = '';
            }
        }

        lastRow++;
        parentBlock.setAttribute(_DATA_LAST_ROW_CH, lastRow);

        block.parentElement.insertBefore(rowClone, block.nextSibling);
    };

    /**
     * @returns {boolean}
     */
    ui.Form.prototype._reset = function() {

        document.getElementById(this._idForm).reset();
        new ui.dom('.' + this._alertBlockId).remove();

        var elements = new ui.FormData(this._idForm, this._locale).getFormElements();

        for (var key in elements) {

            var element = elements.item(key);
            ui.api.clear(element);

            if (element.name != '' && !isNaN(Number(key))) {

                if (element.required || element.classList.contains(ui.CSS.requiredClass)) {

                    var parentBlock = ui.api.findParent(element, '.' + ui.CSS.validateFieldBlockClass);
                    var errorBlock = parentBlock.querySelector('.' + ui.CSS.validateErrorClass);
                    var skinClass = ui.CSS.prefixClass.field + '-' + ui.CSS.skinClass.default['error'];

                    element.parentNode.classList.remove(skinClass);
                    errorBlock.innerHTML = '';
                }
            }
        }

        return true;
    };

    /**
     * Shut off validator
     * @returns {ui.Form}
     */
    ui.Form.prototype.disableValidation = function() {

        this._validation = false;
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnSave = function(hide) {

        this._hideBtnForm._btnSave = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnClear = function(hide) {

        this._hideBtnForm._btnClear = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnRemove = function(hide) {

        this._hideBtnForm._btnRemove = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnBack = function(hide) {

        this._hideBtnForm._btnBack = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnReload = function(hide) {

        this._hideBtnForm._btnReload = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnList = function(hide) {

        this._hideBtnForm._btnList = ui.api.empty(hide, true);
        return this;
    };

    /**
     * Add new row for fields
     * @returns {ui.Form}
     * @public
     */
    ui.Form.prototype.newLineParent = function()  {

        var row = this._settings;

        if (!row.hasOwnProperty(_BLOCK_ROWS)) {

            row[_BLOCK_ROWS] = [];
        }

        row[_BLOCK_ROWS].push({});

        return this;
    };

    /**
     * Add new row for children object
     * @returns {ui.Form}
     */
    ui.Form.prototype.newLineChildren = function() {

        var row_parent = this._settings;
        var len_children = Object.keys(row_parent[_BLOCK_ROWS]).length - 1;
        var row_children = row_parent[_BLOCK_ROWS][len_children];

        if (!row_children.hasOwnProperty(_BLOCK_ROWS)) {

            row_children[_BLOCK_ROWS] = [];
        }

        row_children[_BLOCK_ROWS].push({});

        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} record
     * @param {{}} data
     * @returns {ui.Form}
     * @public
     */
    ui.Form.prototype.setParentBlock = function (title, record, data) {

        var obj = {};
        obj[_PARENT_TITLE] = title;

        this._settings = obj;
        this._fieldRecordForm = ui.api.empty(record, 'id');
        this._parentValues = ui.api.empty(data, {});

        return this;
    };

    /**
     * @param {string} objectName
     * @param {string} title
     * @param {string} recordId
     * @param {{}|[]} data
     * @returns {ui.Form}
     * @public
     */
    ui.Form.prototype.addChildrenBlock = function(title, objectName, recordId, data) {

        var obj = {};
        obj[_PARENT_TITLE] = title;
        obj[_OBJECT_NAME] = objectName;
        obj[_BLOCK_ROWS] = [];

        if (!this._settings.hasOwnProperty(_BLOCK_ROWS)) {

            this._settings[_BLOCK_ROWS] = [];
        }

        this._settings[_BLOCK_ROWS].push(obj);
        this._childrenRecordId[objectName] = recordId;
        this._childrenValues[objectName] = ui.api.empty(data, []);

        return this;
    };

    /**
     * @param {string} padding {'sm' | 'lg'}
     * @returns {ui.Form}
     */
    ui.Form.prototype.setPaddingRelateBlock = function(padding) {

        this._paddingRelateBlock = padding;
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} titleSmall
     * @returns {ui.Form}
     */
    ui.Form.prototype.setTitle = function(title, titleSmall) {

        this._titleForm = ui.api.empty(title, null);
        this._titleFormSmall = ui.api.empty(titleSmall, null);
        return this;
    };

    /**
     * @param {string} method {'GET'|'POST'}
     * @returns {ui.Form}
     */
    ui.Form.prototype.setMethod = function(method) {

        this._method = ui.api.empty(method, ui.Config.defaultMethodForm);
        return this;
    };

    /**
     * @param {string} url
     * @returns {ui.Form}
     */
    ui.Form.prototype.setUrlBack = function(url) {

        this._urlBack = url;
        return this
    };

    /**
     * @param {string} url
     * @returns {ui.Form}
     */
    ui.Form.prototype.setUrlActionForm = function(url) {

        this._urlActionForm = url;
        return this;
    };

    /**
     * @param {string} url
     * @returns {ui.Form}
     */
    ui.Form.prototype.setUrtDel = function( url) {

        this._urlDel = url;
        return this;
    };

    /**
     * @param {string} url
     * @returns {ui.Form}
     */
    ui.Form.prototype.setUrtList = function( url) {

        this._urlList = url;
        return this;
    };

    /**
     * @param {boolean} read
     * @returns {ui.Form}
     */
    ui.Form.prototype.setFormReadOnly = function(read) {

        this._readOnly = ui.api.empty(read, true);
        return this;
    };

    /**
     * Get object current element
     * @returns {*|Element}
     * @public
     */
    ui.Form.prototype.getElement = function() {

        return this._buildForm();
    };

    /**
     * Get html current element
     * @returns {string}
     * @public
     */
    ui.Form.prototype.toHTML = function() {

        return this._buildForm().outerHTML;
    };

    /**
     * Add element in document
     * @param {string} selector
     * @returns {ui.Form}
     * @public
     */
    ui.Form.prototype.appendHTML = function(selector) {

        new ui.dom(selector).append(this.getElement());
        return this;
    };

} (window.ui || {}));