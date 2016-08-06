(function(ui) {
    
    var uniqueId = new Date().getTime();

    var BLOCK_HEAD = 'thead';
    var BLOCK_BODY = 'tbody';
    var BLOCK_FOOT = 'tfoot';

    var DATA_RECORD_ID = 'data-record';
    var DATA_ACTION = 'data-action';

    var CHOOSE_RECORD_ID = 'choose-record-id';
    var CHOOSE_RECORDS = 'choose_records';

    /**
     * @memberOf ui
     * @namespace ui.List
     * @param {string} idList
     * @param {string} record
     * @constructor
     */
    ui.List = function (record, idList) {

        this._fieldRecord = ui.api.empty(record, 'id');

        /**
         * @type {[]}
         * @private
         */
        this._addBtnLeftTop = [];

        this._addBtnRightTop = [];

        /**
         * @type {[]}
         * @private
         */
        this._addBtnBottom  = [];

        /**
         * @type {[]}
         * @private
         */
        this._btnDefaultLeftTop = [];

        /**
         * @type {[]}
         * @private
         */
        this._btnDefaultRightTop = [];

        /**
         * @type {[]}
         * @private
         */
        this._btnDefaultBottom = [];

        /**
         * @type {{}}
         * @private
         */
        this._hideBtn = {
            _btnBack:   false
        };

        /**
         * @type {{}}
         * @private
         */
        this._settings = {
            thead: [],
            tbody: [],
            tfoot: []
        };

        this._lastSetting = {
            block: BLOCK_HEAD,
            row:   0,
            cell:  0
        };

        this._columnTypeData = {};

        this._column = {};

        /**
         * @type {[]|{}}
         * @private
         */
        this._parentRecords = [];

        /**
         * @type {string}
         * @private
         */
        this._idList = ui.api.empty(idList, 'table-' + uniqueId);
        uniqueId++;
    };

    /** @protected */
    ui.List.prototype = {

        _title:      null,
        _titleSmall: null,
        _urlBack: document.referrer,
        _positionBtnLeftTop:    'left',
        _positionBtnRightTop:   'right',
        _positionBtnBottom: 'right',
        _skinPanel: ui.CSS.skinClass.panel.primary,
        _skinTable: null,
        _numCellTitle: '№',
        _fieldRecord: null,
        _hideColumnNumber: false,
        _hideColumnCheckbox: false,
        _urlEdit: null,
        _urlAdd: null,
        _urlDel: null,
        _btnRemove: false,
        _rowNum: 1,
        _maxRow: 50,
        _currentPage: 1,
        _urlPage: null,

        /**
         * @param {number} max
         * @returns {ui.List}
         */
        setMaxRow: function(max) {
            this._maxRow = max;
            return this;
        },

        /**
         * @private
         * returns {voild}
         */
        _addDefaultLeftBtn: function() {

            if (this._hideBtn._btnBack === false && this._urlBack != '') {

                this._btnDefaultLeftTop.push(
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
        },

        /**
         * @private
         * returns {voild}
         */
        _addDefaultRightBtn: function() {

            if (this._urlAdd !== null) {

                this._btnDefaultRightTop.push(
                    {
                        type:     'button',
                        name:     '_add',
                        leftIcon: 'new-window',
                        skin:     'primary',
                        caption:  'Добавить',
                        onclick:  "window.location.href = '" + this._urlAdd + "'"
                    }
                );
            }

            if (this._hideColumnCheckbox === false && this._btnRemove == false && this._urlDel !== null && this._fieldRecord !== null) {

                this._btnDefaultRightTop.push(
                    {
                        type:     'button',
                        name:     ui.Config.LIST_BTN_REMOVE,
                        leftIcon: 'trash',
                        skin:     'danger',
                        onclick:  "new ui.List('" + this._fieldRecord + "', '" + this._idList + "')._remove();",
                        disabled: true
                    }
                );
            }
        },

        /**
         * @param {string|null} typeBtn {'button'|'submit'}
         * @param {string|null} name
         * @param {string} icon
         * @param {string|number} caption
         * @param {string|null} onclick
         * @param {string} skin { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
         * @returns {ui.List}
         */
        addButtonTopLeft: function(typeBtn, name, icon, caption, onclick, skin) {

            this._btnDefaultLeftTop.push(
                {
                    type:     ui.api.empty(typeBtn, null),
                    name:     ui.api.empty(name, null),
                    leftIcon: ui.api.empty(icon, null),
                    caption:  ui.api.empty(caption, null),
                    skin:     ui.api.empty(skin, null),
                    onclick:  ui.api.empty(onclick, null)
                }
            );

            return this;
        },

        /**
         * @param {string|null} typeBtn {'button'|'submit'}
         * @param {string|null} name
         * @param {string} icon
         * @param {string|number} caption
         * @param {string|null} onclick
         * @param {string} skin { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
         * @returns {ui.List}
         */
        addButtonTopRight: function(typeBtn, name, icon, caption, onclick, skin) {

            this._btnDefaultRightTop.push(
                {
                    type:     ui.api.empty(typeBtn, null),
                    name:     ui.api.empty(name, null),
                    leftIcon: ui.api.empty(icon, null),
                    caption:  ui.api.empty(caption, null),
                    skin:     ui.api.empty(skin, null),
                    onclick:  ui.api.empty(onclick, null)
                }
            );

            return this;
        },

        /**
         * @returns {*|Element}
         * @private
         */
        _buildTable: function() {

            var table = new ui.Element('table')
                .addClassElement(ui.CSS.tableClass.table)
                .addClassElement(ui.CSS.tableClass.responsive)
                .addClassElement(ui.CSS.tableClass.hover)
                .addClassElement(ui.CSS.tableClass.striped)
                .addClassElement(this._skinTable);

            table.addChildAfter(this._buildBlock(BLOCK_HEAD));
            table.addChildAfter(this._buildBlock(BLOCK_BODY));
            table.addChildAfter(this._buildBlock(BLOCK_FOOT));

            return table.getElement();
        },

        /**
         * @param {*} content
         * @param {number} fieldName
         * @returns {*}
         * @private
         */
        _columnType: function(content, fieldName) {

            var type = ui.api.existProperty(this._column, fieldName, false);

            if (type) {

            }

            return content;
        },

        /**
         * @param {{}} params
         * @param {string} blockName {'head' | 'body' | 'foot'}
         * @param {number} fieldName
         * @returns {*}
         * @private
         */
        _contentCell: function(params, blockName, fieldName) {

            var content = ui.api.existProperty(params, 'content', params);

            if (blockName == BLOCK_BODY) {

                return this._columnType(content, fieldName);
            }

            return content;
        },

        /**
         * @param {ui.Element} row
         * @param {string} blockName
         * @param {string} cellName
         * @param {number} rowNum
         * @returns {void}
         */
        _columnNumber: function(row, blockName, cellName, rowNum) {

            if (!this._hideColumnNumber) {

                var cell = new ui.Element(cellName)
                    .addClassElement(ui.CSS.tableClass.rowNum);

                if (blockName == BLOCK_HEAD && rowNum == 0) {

                    var countRow = Object.keys(this._settings.thead).length;

                    row.addChildAfter(
                        cell.setContentElement(this._numCellTitle)
                            .setAttrElement('rowspan', countRow)
                            .getElement()
                    );
                } else if (blockName == BLOCK_BODY) {

                    var reordID = ui.api.existProperty(this._settings.tbody[rowNum], this._fieldRecord, null);

                    row.addChildAfter(
                        cell
                            .addChildAfter(
                                new ui.Element('div')
                                    .setContentElement(this._rowNum)
                                    .setAttrElement('title', reordID)
                                    .getElement()
                            )
                            .addChildAfter(
                                new ui.Element('div')
                                    .getElement()
                            )
                            .getElement()
                    );

                } else if (blockName == BLOCK_FOOT) {

                    row.addChildAfter(
                        cell.setContentElement(null).getElement()
                    );
                }
            }
        },

        /**
         * @param {ui.Element} row
         * @param {string} blockName
         * @param {string} cellName
         * @param {number} rowNum
         * @returns {void}
         */
        _columnCheckbox: function(row, blockName, cellName, rowNum) {

            if (!this._hideColumnCheckbox) {

                var cell = new ui.Element(cellName)
                    .addClassElement(ui.CSS.tableClass.rowNum);

                var onclick = "new ui.List('" + this._fieldRecord + "', '" + this._idList + "')._choose(this);";

                if (blockName == BLOCK_HEAD && rowNum == 0) {

                    var countRow = Object.keys(this._settings.thead).length;

                    row.addChildAfter(
                        cell
                            .addChildAfter(
                                new ui.FFCheckbox('simple')
                                    .setAttr(DATA_ACTION, CHOOSE_RECORDS)
                                    .addCheckbox(null, CHOOSE_RECORDS, null, onclick)
                                    .getElement()
                            )
                            .setAttrElement('rowspan', countRow)
                            .getElement()
                    );
                } else if (blockName == BLOCK_BODY) {

                    var reordID = ui.api.existProperty(this._settings.tbody[rowNum], this._fieldRecord, null);

                    row.addChildAfter(
                        cell
                            .addChildAfter(
                                new ui.FFCheckbox('simple')
                                    .setAttr(DATA_RECORD_ID, reordID)
                                    .setAttr(DATA_ACTION, CHOOSE_RECORD_ID)
                                    .addCheckbox(reordID, this._fieldRecord + '[' + rowNum + ']', null, onclick)
                                    .getElement()
                            )
                            .getElement()
                    );

                } else if (blockName == BLOCK_FOOT) {

                    row.addChildAfter(
                        cell.setContentElement(null).getElement()
                    );
                }
            }
        },

        _remove: function() {

            var checkboxRecord = document.body.querySelectorAll('#' + this._idList + ' input[' + DATA_ACTION + '="' + CHOOSE_RECORD_ID + '"]');

            var delObj = {};
            var rowObj = [];

            for (var i in checkboxRecord) {

                if (typeof checkboxRecord[i] == 'object') {

                    if (checkboxRecord[i].checked === true) {

                        rowObj.push(checkboxRecord[i]);
                        var value = checkboxRecord[i].getAttribute(DATA_RECORD_ID);
                        var name = checkboxRecord[i].getAttribute('name');
                        ui.api.buildObject(delObj, name, value, 0);
                    }
                }
            }

            var urlDel = document.body.querySelector('#' + this._idList + ' #' + ui.Config.FORM_URL_DEL).value;
            var page = document.body.querySelector('#' + this._idList + ' #' + ui.Config.CURRENT_PAGE).value;
            var max = document.body.querySelector('#' + this._idList + ' #' + ui.Config.MAX_ROW).value;

            var curObj = this;


            new ui.Ajax()
                .setUrl(urlDel)
                .setParams(delObj)
                .addParam('action', ui.Config.ACTION_LIST_REMOVE)
                .addParam('page', page)
                .addParam('max', max)
                .addCallbackFunction(function (e) {

                    var obj = JSON.parse(e);

                    if (obj.hasOwnProperty('data')) {

                        curObj._replaceRows(obj.data);

                    } else {

                        for (var i in rowObj) {

                            if (typeof rowObj[i] == 'object') {

                                ui.api.findParent(rowObj[i], 'tr').remove();
                            }
                        }
                    }
                })
                .send();
        },

        _replaceRows: function(data) {

            var bodyDoc = document.body;
            var table = bodyDoc.querySelector('#' + this._idList + ' table');
            var body  = bodyDoc.querySelector('#' + this._idList + ' table>tbody');

            this._hideColumnCheckbox = Boolean(bodyDoc.querySelector('#' + ui.Config.HIDE_COLUMN_CHECKBOX).value);
            this._hideColumnNumber = Boolean(bodyDoc.querySelector('#' + ui.Config.HIDE_COLUMN_NUMBER).value);
            this._fieldRecord = bodyDoc.querySelector('#' + ui.Config.FIELD_RECORD).value;
            this._column = JSON.parse(bodyDoc.querySelector('#' + ui.Config.SHOW_COLUMN).value);
            this._settings.tbody = data;

            table.insertBefore(this._buildBlock(BLOCK_BODY), body);
            body ? body.remove() : null;

            var ch = document.body.querySelector('input[' + DATA_ACTION + '="' + CHOOSE_RECORDS + '"]');
            ch.checked ? ch.click() : null;

            ui.api.disabledElement(
                document.body.querySelector('button[name="' + ui.Config.LIST_BTN_REMOVE + '"]'),
                true
            );
        },

        _choose: function(element) {

            var action = element.getAttribute(DATA_ACTION);
            var checkboxRecord = document.body.querySelectorAll('#' + this._idList + ' input[' + DATA_ACTION + '="' + CHOOSE_RECORD_ID + '"]');
            var btnRemove = document.body.querySelector('#page-' + this._idList + ' button[name="' + ui.Config.LIST_BTN_REMOVE + '"]');

            var i = null;

            var btnDisabled = false;

            if (action == CHOOSE_RECORDS) {

                if (checkboxRecord.length == 0) {

                    btnDisabled = true;
                }

                for (i in checkboxRecord) {

                    if (typeof checkboxRecord[i] == 'object') {

                        if (element.checked === false) {

                            btnDisabled = true;
                            checkboxRecord[i].removeAttribute('checked');
                            checkboxRecord[i].checked = false;

                        } else {

                            checkboxRecord[i].setAttribute('checked', 'checked');
                            checkboxRecord[i].checked = true;
                        }
                    }
                }
            } else if (action == CHOOSE_RECORD_ID) {

                var checkboxChoose = document.body.querySelector('#' + this._idList + ' input[' + DATA_ACTION + '="' + CHOOSE_RECORDS + '"]');

                var checked = 0;

                for (i in checkboxRecord) {

                    if (typeof checkboxRecord[i] == 'object' && checkboxRecord[i].checked === true) {

                        checked++;
                    }
                }

                if (element.checked === false) {

                    checkboxChoose.removeAttribute('checked');
                    checkboxChoose.checked = false;
                    btnDisabled = (checked == 0)

                } else {

                    if (checkboxRecord.length == checked) {

                        checkboxChoose.setAttribute('checked', 'checked');
                        checkboxChoose.checked = true;
                    }
                }
            }

            ui.api.disabledElement(btnRemove, btnDisabled);
        },

        /**
         * @param {{}} params
         * @param {string} blockName {'head' | 'body' | 'foot'}
         * @param {number} rowNum
         * @returns {*|Element}
         * @private
         */
        _buildRows: function(params, blockName, rowNum) {

            var row = new ui.Element('tr');
            var cellName = blockName == BLOCK_HEAD ? 'th' : 'td';

            this._columnNumber(row, blockName, cellName, rowNum);
            blockName == BLOCK_BODY ? this._rowNum++ : null;

            var fieldName = null;

            if (blockName == BLOCK_BODY) {

                for (fieldName in this._column) {

                    if (params.hasOwnProperty(fieldName)) {

                        row.addChildAfter(
                            new ui.Element(cellName)
                                .setContentElement(this._columnType(params[fieldName], fieldName))
                                .getElement()
                        );
                    }
                }

            } else {

                for (fieldName in params) {

                    var paramCell = params[fieldName];

                    row.addChildAfter(
                        new ui.Element(cellName)
                            .setContentElement(this._contentCell(paramCell, blockName, fieldName))
                            .setAttrElement('colspan', ui.api.existProperty(paramCell, 'colspan', 1))
                            .setAttrElement('rowspan', ui.api.existProperty(paramCell, 'rowspan', 1))
                            .getElement()
                    );
                }
            }

            this._columnCheckbox(row, blockName, cellName, rowNum);

            return row.getElement();
        },

        /**
         * @param {string} blockName {'head' | 'body' | 'foot'}
         * @returns {*|Element}
         * @private
         */
        _buildBlock: function(blockName) {

            var block = new ui.Element(blockName);

            var i = 1;

            for (var rowNum in this._settings[blockName]) {

                block.addChildAfter(
                    this._buildRows(this._settings[blockName][rowNum], blockName, rowNum)
                );

                if (this._maxRow == i) {
                    break;
                }

                i++;
            }

            return block.getElement();
        },

        /**
         * @returns {*|Element}
         * @private
         */
        _blockHidden: function() {

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
                    new ui.FFHidden(this._currentPage, ui.Config.CURRENT_PAGE)
                        .getElement()
                )
                .addChildAfter(
                    new ui.FFHidden(this._fieldRecord, ui.Config.FIELD_RECORD)
                        .getElement()
                )
                .addChildAfter(
                    new ui.FFHidden(this._hideColumnCheckbox, ui.Config.HIDE_COLUMN_CHECKBOX)
                        .getElement()
                )
                .addChildAfter(
                    new ui.FFHidden(this._hideColumnNumber, ui.Config.HIDE_COLUMN_NUMBER)
                        .getElement()
                )
                .addChildAfter(
                    new ui.FFHidden(JSON.stringify(this._column), ui.Config.SHOW_COLUMN)
                        .getElement()
                )
                .addChildAfter(
                    new ui.FFHidden(this._maxRow, ui.Config.MAX_ROW)
                        .getElement()
                )
                .addChildAfter(
                    new ui.FFHidden(this._urlPage, ui.Config.URL_PAGINATION)
                        .getElement()
                )
                .getElement();
        },

        /**
         * @returns {*|Element}
         * @private
         */
        _buildPanel: function() {

            var panel = new ui.Element('div')
                .addClassElement(ui.CSS.panelClass.panel)
                .addClassElement(this._skinPanel);

            panel.addChildBefore(
                new ui.Element('div')
                    .addClassElement(ui.CSS.panelClass.panelHead)
                    .addChildBefore(
                        new ui.Element('h3')
                            .addClassElement(ui.CSS.panelClass.panelTitle)
                            .setContentElement('title')
                            .getElement()
                    )
                    .getElement()
            );

            var onclick = "new ui.List('" + this._fieldRecord + "', '" + this._idList + "')._setPage";

            panel.addChildAfter(
                new ui.Element('div')
                    .addClassElement(ui.CSS.panelClass.panelBody)
                    .addChildAfter(this._blockHidden())
                    .addChildAfter(this._buildTable())
                    .addChildAfter(
                        new ui.Pagination()
                            .setCountPages(20)
                            .setCallbackFunction(onclick)
                            .setAjax()
                            .setMaxItem(10)
                            .setCurrentPage(2)
                            .getElement()
                    )
                    .getElement()
            );

            return panel.getElement();
        },

        _setPage: function(element, page) {

            document.body.querySelector('#' + ui.Config.CURRENT_PAGE).value = page;
            var url = document.body.querySelector('#' + ui.Config.URL_PAGINATION).value;

            var curObj = this;

            new ui.Ajax()
                .setUrl(url ? url : window.location.href)
                .addParam('action', ui.Config.ACTION_NEXT_PAGE)
                .addParam('page', page)
                .addCallbackFunction(function (e) {

                    var obj = JSON.parse(e);

                    if (obj.hasOwnProperty('data')) {

                        curObj._replaceRows(obj.data);
                    }
                })
                .send();
        },

        /**
         * Generate html List
         * @returns {*|Element}
         * @private
         */
        _buildList: function() {

            var page = new ui.Page('page-' + this._idList)
                .setTitle(this._title, this._titleSmall, null);

            this._addDefaultLeftBtn();
            this._addDefaultRightBtn();

            var btnLeftTop = ui.api.arrayMerge(this._btnDefaultLeftTop, this._addBtnLeftTop);
            var btnRightTop = ui.api.arrayMerge(this._btnDefaultRightTop, this._addBtnRightTop);

            page.setHead(
                new ui.Element('div')
                    .addClassElement(ui.CSS.newLine)
                    .addChildAfter(
                        new ui.Element('div')
                            .setWidthElement(6)
                            .addChildAfter(
                                new ui.FFButton()
                                    .addButtonList(btnLeftTop)
                                    .setPositionBlock(this._positionBtnLeftTop)
                                    .setActive()
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
                                    .addButtonList(btnRightTop)
                                    .setPositionBlock(this._positionBtnRightTop)
                                    .setActive()
                                    .setGroup('toolbar')
                                    .getElement()
                            )
                            .getElement()
                    ).toHTML()
                );

            page.setBody(
                new ui.Element('div')
                    .setIdElement(this._idList, null)
                    .addChildAfter(this._buildPanel())
                    .toHTML()
            );

            var btnBottom = ui.api.arrayMerge(this._btnDefaultBottom, this._addBtnBottom);

            if (btnBottom.length > 0) {

                page.setFooter(
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
         * @param {string} name
         * @param {string|null} type
         * @returns {ui.List}
         */
        addColumn: function(name, type) {

            this._column[name] = ui.api.empty(type, null);
            return this;
        },

        /**
         * @param {string|null} title
         * @param {string|null} titleSmall
         * @returns {ui.List}
         */
        setTitle: function(title, titleSmall) {

            this._title = ui.api.empty(title, null);
            this._titleSmall = ui.api.empty(titleSmall, null);
            return this;
        },

        /**
         * @param {string} link
         * @returns {ui.List}
         */
        setLinkEdit: function(link) {

            this._urlEdit = link;
            return this;
        },

        /**
         * @param {string} link
         * @returns {ui.List}
         */
        setLinkAdd: function(link) {

            this._urlAdd = link;
            return this;
        },

        /**
         * @param {string} link
         * @returns {ui.List}
         */
        setLinkDel: function(link) {

            this._urlDel = link;
            return this;
        },

        /**
         * @param {string} link
         * @returns {ui.List}
         */
        setLinkPagination: function(link) {

            this._urlPage = link;
            return this;
        },

        /**
         * @param {string} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'}
         * @returns {ui.List}
         */
        setSkinPanel: function(skin) {

            this._skinPanel = ui.api.existProperty(ui.CSS.skinClass.panel, skin, null);
            return this;
        },

        /**
         * @param {string} skin {'striped'|'bordered'|'default'}
         * @returns {ui.List}
         */
        setTypeTable: function(skin) {

            this._skinTable = ui.api.existProperty(ui.CSS.tableClass.skin, skin, null);
            return this;
        },

        /**
         * @param {string} url
         * @returns {ui.List}
         */
        setUrlBack: function(url) {

            this._urlBack = url;
            return this
        },

        /**
         * @returns {ui.List}
         */
        newRowHead: function() {

            this._settings.thead.push([]);

            this._lastSetting.block = BLOCK_HEAD;
            this._lastSetting.row   = Object.keys(this._settings.thead).length;

            return this;
        },

        /**
         * @returns {ui.List}
         */
        newRowBody: function() {

            this._settings.tbody.push([]);
            this._lastSetting.block = BLOCK_BODY;
            this._lastSetting.row   = Object.keys(this._settings.tbody).length;

            return this;
        },

        /**
         * @param {[]|{}} object
         * @returns {ui.List}
         */
        addRowsBody: function(object) {

            for (var i in object) {

                this._settings.tbody.push(object[i]);
            }

            return this;
        },

        /**
         * @returns {ui.List}
         */
        newRowFoot: function() {

            this._settings.tfoot.push([]);

            this._lastSetting.block = BLOCK_FOOT;
            this._lastSetting.row   = Object.keys(this._settings.tfoot).length;

            return this;
        },

        /**
         * @param {string|number} content
         * @param {number} colspan
         * @param {number} rowspan
         * @returns {ui.List}
         */
        addCell: function(content, colspan, rowspan) {

            var block = this._lastSetting.block;
            var row   = this._lastSetting.row - 1;

            this._settings[block][row].push(
                {
                    content: content,
                    rowspan: rowspan,
                    colspan: colspan
                }
            );

            return this;
        },

        /**
         * @param {boolean} hide
         * @returns {ui.List}
         */
        hideBtnRemove: function(hide) {

            this._btnRemove = ui.api.empty(hide, true);
            return this;
        },

        /**
         * @param {boolean} hide
         * @returns {ui.List}
         */
        hideBtnBack: function(hide) {

            this._hideBtn._btnBack = ui.api.empty(hide, true);
            return this;
        },

        /**
         * @param {boolean} hide
         * @returns {ui.List}
         */
        hideColumnNumber: function(hide) {

            this._hideColumnNumber = ui.api.empty(hide, true);
            return this;
        },

        /**
         * @param {boolean} hide
         * @returns {ui.List}
         */
        hideColumnCheckbox: function(hide) {

            this._hideColumnCheckbox = ui.api.empty(hide, true);
            return this;
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {

            return this._buildList();
        },

        /**
         * Get html current element
         * @returns {string}
         * @public
         */
        toHTML: function() {

            return this._buildList().outerHTML;
        },

        /**
         * Add element in document
         * @param {string} selector
         * @returns {ui.List}
         * @public
         */
        appendHTML: function(selector) {

            new ui.$(selector).append(this.getElement());
            return this;
        }
    };
} (window.ui || {}));