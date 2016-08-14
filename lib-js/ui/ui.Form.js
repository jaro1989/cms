(function(ui) {

    var _TYPE_TEXT      = 'text';
    var _TYPE_PASS      = 'password';
    var _TYPE_TEXTAREA  = 'textarea';
    var _TYPE_DATE      = 'date';
    var _TYPE_SELECT    = 'select';
    var _TYPE_CHECKBOX  = 'checkbox';
    var _TYPE_RADIO     = 'radio';
    var _TYPE_READ_ONLY = 'readonly';
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
     * @param {string} idForm
     * @constructor
     */
    ui.Form = function (idForm) {

        /**
         * @type {{}}
         * @private
         */
        this._parentValues = {};

        /**
         * @type {{}}
         * @private
         */
        this._childrenValues = {};

        /**
         * @type {{}}
         * @private
         */
        this._childrenRecordId = {};

        /**
         * @type {{}}
         * @private
         */
        this._settings = {};

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

        this._hideBtn = {
            _btnSave:   false,
                _btnClean:  false,
                _btnRemove: false,
                _btnBack:   false
        };

        this._idForm = ui.api.empty(idForm, uniqueId);
        uniqueId++;

        this._validation = true;
        this._positionBtnTop =    'left';
        this._positionBtnBottom = 'right';
        this._paddingRelateBlock = 'xs';
        this._idRecord =   '';
        this._title =      null;
        this._titleSmall = null;
        this._skinPanel = ui.CSS.skinClass.panel.primary;
        this._paddingPanels = 'xs';
        this._paddingChildrenPanel = 'sm';
        this._method = ui.Config.defaultMethodForm;
        this._checkboxText = ui.Config.checkboxText;
        this._urlBack = document.referrer;
        this._urlAdd =  null;
        this._urlEdit = null;
        this._urlDel =  null;
        this._readOnly = false;
    };

    /** @public */
    ui.Form.prototype = {

        _htmlFields: {

            widthCaption: null,
            maxHeightFields: null,
            heightFields: null,
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
                    .setMaxHeight(ui.api.existProperty(params, 'height', this.maxHeightFields))
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
            password: function(value, name, params) {

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
            textarea: function(value, name, params) {

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
            date: function(value, name, params) {

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
            select: function(value, name, params) {

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
            checkbox: function(value, name, params) {

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
            radio: function(value, name, params) {

                var caption = ui.api.existProperty(params, 'caption', null);
                var dataList = ui.api.existProperty(params, 'list', {});
                value = ui.api.setValue(value, name);

                return  new ui.FFRadio(value, params['setname'], dataList)
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
                        leftIcon: 'share-alt',
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

            if (this._hideBtn._btnRemove === false && this._parentValues.hasOwnProperty(this._idRecord) && this._urlDel !== null) {

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
        _blockHiddenPr: function() {

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
        },

        _blockHiddenCh: function(data) {

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
        },

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
        _buildBlockRows: function (settings, parent) {

            var objName = settings[_OBJECT_NAME];
            var title   = settings[_PARENT_TITLE];

            var panel = new ui.Element('div')
                .addClassElement(ui.CSS.panelClass.panel)
                .addClassElement(this._skinPanel);

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
        },

        /**
         * @param {Node} element
         * @private
         */
        _addRecord: function(element) {

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
        },

        /**
         * @param {Node} element
         * @private
         */
        _delRecord: function(element) {

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

                var key = null;
                var children = parentBlock.childNodes;

                for (key in children) {

                    if (typeof children[key] == 'object') {

                        ui.api.hide(children[key].querySelector('.' + _CLASS_BTN_DEL));
                    }
                }
            }
            row.remove();
        },

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
        _buildRow: function(values, settings, key_record) {

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

            blockRows
                .addChildAfter(
                    new ui.Element('hr')
                        .getElement()
                );

            return blockRows.getElement();
        },

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
        _buildFields: function(values, objectName, settings, key_record, numRow) {

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
                    var field = this._htmlFields[type](values, nameField, params);
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
        },

        /**
         * @param {number|null} key_record
         * @param {{}} params
         * @private
         */
        _setNameField: function(key_record, params) {

            if (key_record !== null) {

                params['setname'] = params['object'] + '[' + key_record + '][' + params['name'] + ']';

            } else {

                if (params['object'] !== null) {

                    params['setname'] = params['object'] + '[' + params['name'] + ']';

                } else {

                    params['setname'] = params['name'];
                }
            }
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
                .addChildBefore(this._blockHiddenPr())
                .addChildAfter(this._buildBlockRows(this._settings, true));

            var record = ui.api.existProperty(this._parentValues, this._idRecord, false);

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
         * @public
         */
        newLineParent: function()  {

            var row = this._settings;

            if (!row.hasOwnProperty(_BLOCK_ROWS)) {

                row[_BLOCK_ROWS] = [];
            }

            row[_BLOCK_ROWS].push({});

            return this;
        },

        /**
         * Add new row for children object
         * @returns {ui.Form}
         */
        newLineChildren: function() {

            var row_parent = this._settings;
            var len_children = Object.keys(row_parent[_BLOCK_ROWS]).length - 1;
            var row_children = row_parent[_BLOCK_ROWS][len_children];

            if (!row_children.hasOwnProperty(_BLOCK_ROWS)) {

                row_children[_BLOCK_ROWS] = [];
            }

            row_children[_BLOCK_ROWS].push({});

            return this;
        },

        /**
         * @param {string} title
         * @param {string} recordId
         * @param {{}} data
         * @returns {ui.Form}
         * @public
         */
        setParentBlock: function (title, recordId, data) {

            var obj = {};
            obj[_PARENT_TITLE] = title;

            this._settings = obj;
            this._idRecord = recordId;
            this._parentValues = data;

            return this;
        },

        /**
         * @param {string} objectName
         * @param {string} title
         * @param {string} recordId
         * @param {{}|[]} data
         * @returns {ui.Form}
         * @public
         */
        addChildrenBlock: function(title, objectName, recordId, data) {

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
         * @returns {ui.Form}
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
         * @returns {ui.Form}
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
         * @returns {ui.Form}
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
         * @returns {ui.Form}
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
         * @returns {ui.Form}
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
         * @returns {ui.Form}
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
         * @returns {ui.Form}
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
         * @returns {ui.Form}
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
         * @returns {ui.Form}
         */
        setMaxHeightFields: function(height) {

            this._htmlFields.maxHeightFields = height;
            return this;
        },

        /**
         * @param {string} padding {'sm' | 'lg'}
         * @returns {ui.Form}
         */
        setPaddingRelateBlock: function(padding) {

            this._paddingRelateBlock = padding;
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
         * @returns {ui.Form}
         */
        setUrtDel: function( url) {

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