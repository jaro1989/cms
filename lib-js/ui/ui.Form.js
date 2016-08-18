(function(ui) {

    var _TYPE_TEXT      = '_ffText';
    var _TYPE_PASS      = '_ffPassword';
    var _TYPE_TEXTAREA  = '_ffTextarea';
    var _TYPE_DATE      = '_ffDate';
    var _TYPE_SELECT    = '_ffSelect';
    var _TYPE_CHECKBOX  = '_ffCheckbox';
    var _TYPE_RADIO     = '_ffRadio';
    var _TYPE_READ_ONLY = '_ffReadonly';
    //var _TYPE_RELATIONSHIP = 'relationship';

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
        this.formatDate = ui.Config.formatDateUser;
        this.checkboxText = ui.Config.checkboxText;
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
            value = ui.api.setValue(value, name);

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
            value = ui.api.setValue(value, name);

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
            value = ui.api.setValue(value, name);

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
            value = ui.api.setValue(value, name);

            return new ui.FFDate(value, params['setname'], caption)
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
        _ffSelect: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            var dataList = ui.api.existProperty(params, 'list', {});
            value = ui.api.setValue(value, name);

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
            value = ui.api.setValue(value, name);

            return new ui.FFCheckbox()
                .addCheckbox(value, params['setname'], caption)
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
            value = ui.api.setValue(value, name);

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
         * @param {string|null} name
         * @param {string|number|null} caption
         * @param {string|number|null} height
         * @returns {ui.HtmlFields}
         */
        addReadOnlyField: function(name, caption, height) {

            var params = {
                type: _TYPE_READ_ONLY,
                caption: caption,
                height: height
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addTextField: function(name, caption, required) {

            var params = {
                type: _TYPE_TEXT,
                caption: caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addPasswordField: function(name, caption, required) {

            var params = {
                type:     _TYPE_PASS,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @param {string|number|null} height
         * @returns {ui.HtmlFields}
         */
        addTextareaField: function(name, caption, required, height) {

            var params = {
                type:     _TYPE_TEXTAREA,
                caption:  caption,
                required: ui.api.empty(required, false),
                height: ui.api.empty(height, null)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addDateField: function(name, caption, required) {

            var params = {
                type:     _TYPE_DATE,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {{}|[]} data
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addSelectField: function(name, caption, data, required) {

            var params = {
                type:     _TYPE_SELECT,
                caption:  caption,
                required: ui.api.empty(required, false),
                list:     data
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addCheckboxField: function(name, caption, required) {

            var params = {
                type:     _TYPE_CHECKBOX,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number|null} caption
         * @param {{}|[]} data
         * @param {boolean} required
         * @param {number|null} width
         * @returns {ui.HtmlFields}
         */
        addRadioField: function(name, caption, data, required, width) {

            var params = {
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
         * @returns {ui.HtmlFields}
         */
        setFormatDate: function(format) {
            this.formatDate = format;
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
            _btnBack:   false
        };

        this._idForm = ui.api.empty(idForm, uniqueId);
        uniqueId++;

        this._validation = true;
        this._paddingRelateBlock = 'xs';
        this._idRecord =   '';
        this._titleForm =      null;
        this._titleFormSmall = null;
        this._skinPanel = 'primary';
        this._paddingPanels = 'xs';
        this._paddingChildrenPanel = 'sm';
        this._method = ui.Config.defaultMethodForm;
        this._checkboxText = ui.Config.checkboxText;
        this._urlBack = document.referrer;
        this._urlAdd =  null;
        this._urlEdit = null;
        this._urlDel =  null;
        this._readOnly = false;
        this._lbl = ui.api.existProperty(ui.Config.lbl, locale, ui.Config.lbl[ui.Config.locale]);
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
     * @private
     * returns {voild}
     */
    ui.Form.prototype._addDefaultBtn = function() {

        if (this._hideBtnForm._btnBack === false && this._urlBack != '') {

            this._btnLeftTopForm.push(
                {
                    type:     'button',
                    name:     '_btnBack',
                    leftIcon: 'share-alt',
                    skin:     'primary',
                    caption:  this._lbl.btn_back,
                    active: true,
                    onclick:  "window.location.href = '" + this._urlBack + "'"
                }
            );
        }

        if (this._hideBtnForm._btnSave === false && this._readOnly === false) {

            this._btnRightBottomForm.push(
                {
                    type: 'button',
                    name: '_btnSave',
                    leftIcon: 'save',
                    skin: 'primary',
                    active: true,
                    caption: this._lbl.btn_save,
                    onclick: "new ui.FormValidation('" + this._idForm + "').save();"
                }
            );
        }

        if (this._hideBtnForm._btnClear === false && this._readOnly === false) {

            this._btnRightBottomForm.push(
                {
                    type:     'button',
                    name:     '_btnClear',
                    leftIcon: 'refresh',
                    skin:     'primary',
                    caption:  this._lbl.btn_clear,
                    active: true,
                    onclick:  "new ui.FormValidation('" + this._idForm + "').reset();"
                }
            );
        }

        if (this._hideBtnForm._btnRemove === false && this._parentValues.hasOwnProperty(this._idRecord) && this._urlDel !== null) {

            this._btnRightBottomForm.push(
                {
                    type:     'button',
                    name:     '_btnRemove',
                    leftIcon: 'trash',
                    skin:     'danger',
                    active: true,
                    caption:  this._lbl.btn_remove,
                    onclick:  "new ui.FormValidation('" + this._idForm + "').remove();"
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

            this[obj[position]].push(
                {
                    type: ui.api.empty(typeBtn, null),
                    name: ui.api.empty(name, null),
                    leftIcon: ui.api.empty(icon, null),
                    caption: ui.api.empty(caption, null),
                    skin: ui.api.empty(skin, null),
                    onclick: ui.api.empty(onclick, null),
                    active: active
                }
            );
        }

        return this;
    };

    /**
     * @returns {*|Element}
     * @private
     */
    ui.Form.prototype._blockHiddenPr = function() {

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
                new ui.FFHidden(ui.api.existProperty(this._parentValues, this._idRecord, null), ui.Config.FORM_ID_RECORD)
                    .addClass(_CLASS_RECORD_ID)
                    .getElement()
            )
            .addChildAfter(
                new ui.FFHidden(this._idRecord, ui.Config.FORM_FIELD_RECORD)
                    .getElement()
            )
            .getElement();
    };

    ui.Form.prototype._blockHiddenCh = function(data) {

        return new ui.Element('div')
            .setAttrElement('hidden',  true)
            .addClassElement(ui.CSS.formBlockHiddenClass)
            .addChildAfter(
                new ui.FFHidden(data['record'], data['record_name'])
                    .addClass(_CLASS_RECORD_ID)
                    .getElement()
            )
            .addChildAfter(
                new ui.FFHidden(data['record_field'], null)
                    .addClass(ui.Config.FORM_FIELD_RECORD)
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
                        .addChildAfter(
                            this._buildRow(values[key], settings, key)
                        );
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
     * @param {Node} element
     * @private
     */
    ui.Form.prototype._addRecord = function(element) {

        var row = ui.api.findParent(element, '.' + _CLASS_ROW);
        var parentBlock = row.parentElement;

        var btn = parentBlock.children[0].querySelector('.' + _CLASS_BTN_DEL);
        ui.api.show(btn);

        var rowClone = row.cloneNode(true);

        var errorBlock = rowClone.querySelector('.' + ui.CSS.validateErrorClass);
        errorBlock.innerHTML = '';

        var record = rowClone.querySelector('.' + _CLASS_RECORD_ID);

        if (record !== null) {

            ui.api.findParent(record, '.' + ui.CSS.validateFieldBlockClass).remove();
        }

        var fields = rowClone.querySelectorAll('input, textarea, select');

        var key = null;
        var object_name = parentBlock.getAttribute(_DATA_OBJECT_CH);
        var lastRow = parentBlock.getAttribute(_DATA_LAST_ROW_CH);

        for (key in fields) {

            if (typeof fields[key] == 'object') {

                var skinClass = ui.CSS.prefixClass.field + '-' + ui.CSS.skinClass.default.error;
                fields[key].parentElement.classList.remove(skinClass);

                var block_field = ui.api.findParent(fields[key], '.' + _BLOCK_FIELD);

                if (block_field !== null) {

                    var field_name = block_field.getAttribute(_DATA_NAME_FIELD);
                    fields[key].setAttribute('name', object_name + '[' + lastRow + '][' + field_name + ']');
                }

                fields[key].defaultValue = '';
                fields[key].value = '';
                fields[key].innerHTML = '';
            }
        }

        lastRow++;
        parentBlock.setAttribute(_DATA_LAST_ROW_CH, lastRow);

        row.parentElement.insertBefore(rowClone, row.nextSibling);
    };

    /**
     * @param {Node} element
     * @private
     */
    ui.Form.prototype._delRecord = function(element) {

        var row = ui.api.findParent(element, '.' + _CLASS_ROW);
        var record = row.querySelector('.' + _CLASS_RECORD_ID);
        var parentBlock = row.parentElement;


        if (record !== null) {

            var url_del     = document.getElementById(ui.Config.FORM_URL_DEL).value;
            var object_name = parentBlock.getAttribute(_DATA_OBJECT_CH);
            var fieldRecord = parentBlock.querySelector('.' + ui.Config.FORM_FIELD_RECORD).value;

            var data = {};
            data[fieldRecord] = record.value;
            data['object'] = object_name;

            new ui.Ajax()
                .setUrl(url_del)
                .setParams(data)
                .addParam('action', 'remove')
                .addCallbackFunction(function (e) {

                    console.log(e);

                })
                .send();
        }

        if (parentBlock.childElementCount == 2) {

            var children = parentBlock.childNodes, key;

            for (key in children) {

                if (typeof children[key] == 'object') {

                    ui.api.hide(children[key].querySelector('.' + _CLASS_BTN_DEL));
                }
            }
        }
        row.remove();
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

        if (key_record !== null && numRow == 0) {

            var btn = new ui.FFButton()
                .setGroup('toolbar')
                .setOnClick("new ui.Form()._addRecord(this);")
                .setClass(_CLASS_BTN_ADD)
                .addButton(null, null, null, null, false, 'plus')
                .setOnClick("new ui.Form()._delRecord(this);")
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
            .addChildAfter(this._buildBlockRows(this._settings, true));

        var record = ui.api.existProperty(this._parentValues, this._idRecord, false);

        if (this._urlAdd !== null || this._urlEdit !== null) {

            (this._urlAdd == null)  ? this._urlAdd  = this._urlEdit : '';
            (this._urlEdit == null) ? this._urlEdit = this._urlAdd  : '';

            form.setAttrElement('action', (record === false) ? this._urlEdit : this._urlAdd)
        }

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
     * @param {string} title
     * @param {string|null} recordId
     * @param {{}} data
     * @returns {ui.Form}
     * @public
     */
    ui.Form.prototype.setParentBlock = function (title, recordId, data) {

        var obj = {};
        obj[_PARENT_TITLE] = title;

        this._settings = obj;
        this._idRecord = recordId;
        this._parentValues = data;

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
    ui.Form.prototype.setUrlAdd = function(url) {

        this._urlAdd = url;
        return this;
    };

    /**
     * @param {string} url
     * @returns {ui.Form}
     */
    ui.Form.prototype.setUrlEdit = function(url) {

        this._urlEdit = url;
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

        new ui.$(selector).append(this.getElement());
        return this;
    };

} (window.ui || {}));