(function(ui) {
    
    var uniqueId = new Date().getTime();

    var BLOCK_HEAD = 'thead';
    var BLOCK_BODY = 'tbody';
    var BLOCK_FOOT = 'tfoot';

    var DATA_RECORD_ID = 'data-record';
    var DATA_ACTION = 'data-action';

    var CHOOSE_RECORD_ID = 'choose-record-id';
    var CHOOSE_RECORDS = 'choose_records';

    var DATA_JSON_TABLE = 'data-json-table';

    var SORT_CONTENT = 'sort-content';

    /**
     * @memberOf ui
     * @namespace ui.List
     * @param {string} idList
     * @param {string} record
     * @param {string|null} locale
     * @constructor
     */
    ui.List = function (record, idList, locale) {

        ui.Form.apply(this, ['search-' + idList, locale]);

        this._fieldRecord = ui.api.empty(record, 'id');
        //Buttons
        this._btnRightBottomList = [];
        this._btnLeftBottomList = [];
        this._btnLeftTopList = [];
        this._btnRightTopList = [];
        this._btnLeftTopTable = [];
        this._btnRightTopTable = [];

        this._hideBtnList = {
            _btnBack:   false,
            _btnAdd:    false,
            _btnClear:  false,
            _btnRemove: false,
            _btnSearch: false,
            _btnReload: false,
            _btnTrash:  false
        };
        //List
        this._settingsList = {
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
        this._parentRecords = [];
        //Page
        this._titleList = null;
        this._titleListSmall = null;
        this._skin = null;
        this._typeTable = null;
        this._numCellTitle = '№';
        this._hideColumnNumber = false;
        this._hideColumnCheckbox = false;

        this._rowNum = 1;
        this._maxRow = 50;
        this._currentPage = 1;
        this._countPages = 2;
        //Link
        this._urlAction = null;
        this._urlAddAndEdit = null;
        this._urlTrash = null;
        this._urlBack = document.referrer;
        //Actions
        this._actions = {
            search: 'search',
            pagination: 'pagination',
            remove: 'remove'
        };

        this._idList = ui.api.empty(idList, 'table-' + uniqueId);
        this._lbl = ui.api.existProperty(ui.Config.lbl, locale, ui.Config.lbl[ui.Config.locale]);
        uniqueId++;
    };

    ui.List.prototype = Object.create(ui.Form.prototype);

    ui.List.prototype.constructor = ui.List;

    /**
     * @returns {ui.List}
     */
    ui.List.prototype.newLineSearchFields = function() {

        ui.Form.prototype.newLineParent.apply(this, arguments);
        return this;
    };

    /**
     * @param {number} max
     * @returns {ui.List}
     */
    ui.List.prototype.setMaxRow = function(max) {
        this._maxRow = max;
        return this;
    };

    /**
     * @private
     * returns {voild}
     */
    ui.List.prototype._btnDefault = function() {

        if (this._hideBtnList._btnBack === false && this._urlBack != '' && this._urlBack !== window.location.href) {

            this._btnLeftTopList.push(
                {
                    type:     'button',
                    name:     '_btnBack',
                    leftIcon: 'share-alt',
                    caption:  this._lbl.btn_back,
                    active: false,
                    onclick:  "ui.api.reload('" + this._urlBack + "');"
                }
            );
        }

        if (this._hideBtnList._btnReload === false) {

            this._btnLeftTopList.push(
                {
                    type: 'button',
                    name: '_reloadPage',
                    leftIcon: 'repeat',
                    active: false,
                    onclick: "ui.api.reload();"
                }
            );
        }

        if (this._urlAddAndEdit !== null && this._hideBtnList._btnAdd === false) {

            this._btnRightTopList.push(
                {
                    type:     'button',
                    name:     '_add',
                    leftIcon: 'new-window',
                    skin:     'primary',
                    caption:  this._lbl.btn_add,
                    active: true,
                    onclick:  "ui.api.reload('" + this._urlAddAndEdit + "');"
                }
            );
        }

        if (this._urlTrash !== null && this._hideBtnList._btnTrash === false) {

            this._btnRightTopList.push(
                {
                    type:     'button',
                    name:     '_add',
                    leftIcon: 'trash',
                    caption:  this._lbl.btn_trash,
                    active: false,
                    onclick:  "ui.api.reload('" + this._urlTrash + "');"
                }
            );
        }

        if (this._hideBtnList._btnSearch === false) {

            this._btnRightTopTable.push(
                {
                    type: 'button',
                    name: '_btnSave',
                    leftIcon: 'search',
                    skin: null,
                    active: false,
                    caption: this._lbl.btn_search,
                    onclick: "new ui.List('" + this._fieldRecord + "', '" + this._idList + "', null)._search('" + this._idForm + "');"
                }
            );
        }

        if (this._hideBtnList._btnClear === false) {

            this._btnRightTopTable.push(
                {
                    type: 'button',
                    name: '_btnClear',
                    leftIcon: 'refresh',
                    skin: null,
                    caption: this._lbl.btn_clear,
                    active: false,
                    onclick: "new ui.Form('" + this._idForm + "', null)._reset();"
                }
            );
        }

        if (this._hideColumnCheckbox === false && this._hideBtnList._btnRemove == false && this._fieldRecord !== null) {

            this._btnRightTopTable.push(
                {
                    type:     'button',
                    name:     ui.Config.LIST_BTN_REMOVE,
                    leftIcon: 'remove',
                    skin:     'danger',
                    active: true,
                    caption:  this._lbl.btn_remove,
                    onclick:  "new ui.List('" + this._fieldRecord + "', '" + this._idList + "')._remove();",
                    disabled: true
                }
            );
        }
    };

    /**
     * @param {number} position 1 - 'top/left'| 2 - top/right | 3 - bottom/left | 4 - bottom/right | 5 - top table/left | 6 - top table/right
     * @param {string|null} typeBtn {'button'|'submit'}
     * @param {string|null} name
     * @param {string} icon
     * @param {string|number} caption
     * @param {string|null} onclick
     * @param {string} skin { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
     * @param {boolean} active
     * @returns {ui.List}
     */
    ui.List.prototype.addButton = function(position, typeBtn, name, icon, caption, onclick, skin, active) {

        var obj = {
            1: '_btnLeftTopList',
            2: '_btnRightTopList',
            3: '_btnLeftBottomList',
            4: '_btnRightBottomList',
            5: '_btnRightTopTable',
            6: '_btnLeftTopTable'
        };

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
    ui.List.prototype._buildTable = function() {

        var blockTable = new ui.Element('div');

        if (this._btnLeftTopTable.length > 0 || this._btnRightTopTable.length > 0) {

            blockTable.addChildAfter(this._buildRowButtons(this._btnLeftTopTable, this._btnRightTopTable).getElement());
        }

        blockTable.addChildAfter(
            new ui.Element('table')
                .addClassElement(ui.CSS.tableClass.table)
                .addClassElement(ui.CSS.tableClass.responsive)
                .addClassElement(ui.CSS.tableClass.hover)
                .addClassElement(ui.CSS.tableClass.striped)
                .addClassElement(this._typeTable)
                .addChildAfter(this._buildBlock(BLOCK_HEAD))
                .addChildAfter(this._buildBlock(BLOCK_BODY))
                .addChildAfter(this._buildBlock(BLOCK_FOOT))
                .getElement()
        );

        return blockTable.getElement();
    };

    /**
     * @param {*} content
     * @param {number} fieldName
     * @returns {*}
     * @private
     */
    ui.List.prototype._columnType = function(content, fieldName) {

        var type = ui.api.existProperty(this._column, fieldName, false);

        if (type) {
            //Тип значения
        }

        return content;
    };

    /**
     * @param {{}} params
     * @param {string} blockName {'head' | 'body' | 'foot'}
     * @param {number} fieldName
     * @returns {*}
     * @private
     */
    ui.List.prototype._contentCell = function(params, blockName, fieldName) {

        var content = ui.api.existProperty(params, 'content', params);

        if (blockName == BLOCK_BODY) {

            return this._columnType(content, fieldName);
        }

        return content;
    };

    /**
     * @param {ui.Element} row
     * @param {string} blockName
     * @param {string} cellName
     * @param {number} rowNum
     * @returns {void}
     */
    ui.List.prototype._columnNumber = function(row, blockName, cellName, rowNum) {

        if (!this._hideColumnNumber) {

            var cell = new ui.Element(cellName)
                .addClassElement(ui.CSS.tableClass.rowNum);

            if (blockName == BLOCK_HEAD && rowNum == 0) {

                var countRow = Object.keys(this._settingsList.thead).length;

                row.addChildAfter(
                    cell.setContentElement(this._numCellTitle)
                        .setAttrElement('onclick', 'new ui.SortTable(this).setSkinIcon("' + this._skin + '").sort(0);')
                        .setAttrElement('rowspan', countRow)
                        .getElement()
                );
            } else if (blockName == BLOCK_BODY) {

                var reordID = ui.api.existProperty(this._settingsList.tbody[rowNum], this._fieldRecord, null);

                row.addChildAfter(
                    cell
                        .addChildAfter(
                            new ui.Element('div')
                                .addClassElement(SORT_CONTENT)
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
    };

    /**
     * @param {ui.Element} row
     * @param {string} blockName
     * @param {string} cellName
     * @param {number} rowNum
     * @returns {void}
     */
    ui.List.prototype._columnCheckbox = function(row, blockName, cellName, rowNum) {

        if (!this._hideColumnCheckbox) {

            var cell = new ui.Element(cellName)
                .addClassElement(ui.CSS.tableClass.rowNum);

            var onclick = "new ui.List('" + this._fieldRecord + "', '" + this._idList + "')._choose(this);";

            if (blockName == BLOCK_HEAD && rowNum == 0) {

                var countRow = Object.keys(this._settingsList.thead).length;

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

                var reordID = ui.api.existProperty(this._settingsList.tbody[rowNum], this._fieldRecord, null);

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
    };

    ui.List.prototype._replaceRows = function(data) {

        var bodyDoc = document.body;
        var table = bodyDoc.querySelector('#' + this._idList + ' table');
        var body  = bodyDoc.querySelector('#' + this._idList + ' table>tbody');

        var str = bodyDoc.querySelector('#' + this._idList + ' #' + DATA_JSON_TABLE).getAttribute(DATA_JSON_TABLE);
        var obj = JSON.parse(str);

        for (var property in obj) {

            this[property] = obj[property];
        }

        this._settingsList.tbody = data;

        table.insertBefore(this._buildBlock(BLOCK_BODY), body);
        body ? body.remove() : null;

        var ch = document.body.querySelector('input[' + DATA_ACTION + '="' + CHOOSE_RECORDS + '"]');
        ch.checked ? ch.click() : null;

        ui.api.disabledElement(
            document.body.querySelector('button[name="' + ui.Config.LIST_BTN_REMOVE + '"]'),
            true
        );
    };

    ui.List.prototype._choose = function(element) {

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
    };

    /**
     * @param {{}} params
     * @param {string} blockName {'head' | 'body' | 'foot'}
     * @param {number} rowNum
     * @returns {*|Element}
     * @private
     */
    ui.List.prototype._buildRows = function(params, blockName, rowNum) {

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

            var i = !this._hideColumnNumber ? 1 : 0;

            for (fieldName in params) {

                var paramCell = params[fieldName];

                var sort = ui.api.existProperty(paramCell, 'sort', false) ? 'new ui.SortTable(this).setSkinIcon("' + this._skin + '").sort(' + i + ');' : null;

                row.addChildAfter(
                    new ui.Element(cellName)
                        .setContentElement(this._contentCell(paramCell, blockName, fieldName))
                        .setAttrElement('colspan', ui.api.existProperty(paramCell, 'colspan', 1))
                        .setAttrElement('rowspan', ui.api.existProperty(paramCell, 'rowspan', 1))
                        .setAttrElement('style', ui.api.existProperty(paramCell, 'style', null))
                        .setWidthElement(ui.api.existProperty(paramCell, 'width', null))
                        .setAttrElement('onclick', sort)
                        .getElement()
                );
                i++;
            }
        }

        this._columnCheckbox(row, blockName, cellName, rowNum);

        return row.getElement();
    };

    /**
     * @param {string} blockName {'head' | 'body' | 'foot'}
     * @returns {*|Element}
     * @private
     */
    ui.List.prototype._buildBlock = function(blockName) {

        var block = new ui.Element(blockName);

        var i = 1;

        for (var rowNum in this._settingsList[blockName]) {

            block.addChildAfter(
                this._buildRows(this._settingsList[blockName][rowNum], blockName, rowNum)
            );

            if (this._maxRow == i) {
                break;
            }

            i++;
        }

        return block.getElement();
    };

    /**
     * @returns {*|Element}
     * @private
     */
    ui.List.prototype._blockHidden = function() {

        var obj = {
            _column:  this._column,
            _maxRow:  this._maxRow,
            _urlAddAndEdit:  this._urlAddAndEdit,
            _urlAction: this._urlAction,
            _currentPage: this._currentPage,
            _countPages: this._countPages,
            _actions: {
                search: this._actions.search,
                pagination: this._actions.pagination,
                remove: this._actions.remove
            },
            _fieldRecord: this._fieldRecord,
            _hideColumnCheckbox: this._hideColumnCheckbox,
            _hideColumnNumber:   this._hideColumnNumber
        };

        return new ui.Element('div')
            .setAttrElement('hidden',  true)
            .addClassElement(ui.CSS.formBlockHiddenClass)
            .addChildAfter(
                new ui.Element('div')
                    .setIdElement(DATA_JSON_TABLE, null)
                    .setAttrElement(DATA_JSON_TABLE, JSON.stringify(obj))
                    .getElement()
            )
            .getElement();
    };

    /**
     * @returns {*|Element}
     * @private
     */
    ui.List.prototype._buildPanel = function() {

        var panel = new ui.Element('div')
            .addClassElement(ui.CSS.panelClass.panel)
            .addClassElement(ui.api.existProperty(ui.CSS.skinClass.panel, this._skin, ui.CSS.skinClass.panel.primary));

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

        var onclick = "new ui.List('" + this._fieldRecord + "', '" + this._idList + "')._rebuild";

        this._buildSearchForm(panel);

        panel.addChildAfter(
            new ui.Element('div')
                .addClassElement(ui.CSS.panelClass.panelBody)
                .addChildAfter(this._blockHidden())
                .addChildAfter(this._buildTable())
                .addChildAfter(
                    new ui.Pagination(this._actions.pagination + '-' + this._idList)
                        .setCountPages(this._countPages)
                        .setCallbackFunction(onclick)
                        .setSkin(this._skin)
                        .setAjax()
                        .getElement()
                )
                .getElement()
        );

        return panel.getElement();
    };

    /**
     * @param {ui.Element} panel
     * @private
     */
    ui.List.prototype._buildSearchForm = function(panel) {

        if ('block_rows' in this._settings) {

            ui.Form.prototype.hideBtnBack.call(this, true);
            ui.Form.prototype.hideBtnRemove.call(this, true);
            ui.Form.prototype.hideBtnSave.call(this, true);
            ui.Form.prototype.hideBtnClear.call(this, true);

            panel.addChildAfter(
                new ui.Element('div')
                    .addClassElement(ui.CSS.panelClass.panelBody)
                    .addChildAfter(
                        this._buildForm()
                    )
                    .getElement()
            );
        }
    };

    ui.List.prototype._rebuild = function(element, page) {

        var dataBlock = document.body.querySelector('#' + this._idList + ' #' + DATA_JSON_TABLE);
        var str = dataBlock.getAttribute(DATA_JSON_TABLE);
        var listParams = JSON.parse(str);

        for (var property in listParams) {

            this[property] = listParams[property];
        }

        listParams._currentPage = page;
        dataBlock.setAttribute(DATA_JSON_TABLE, JSON.stringify(listParams));

        var curObj = this;

        new ui.Ajax()
            .setUrl(this._urlAction ? this._urlAction : window.location.href)
            .addParam('action', listParams._actions.pagination)
            .addParam('page', page)
            .addCallbackFunction(
                function (e) {

                    try {

                        curObj._replaceRows(typeof e == 'object' ? e : JSON.parse(e));

                        new ui.SortTable(null).updateSort('#' + curObj._idList);

                    } catch (e) {

                        new ui.Modal(null).error(e.name + ':' + e.message);
                    }
                }
            )
            .send();
    };

    ui.List.prototype._search = function(idForm) {

        var data = new ui.FormData(idForm).getData();
        var dataBlock = document.body.querySelector('#' + this._idList + ' #' + DATA_JSON_TABLE);
        var str = dataBlock.getAttribute(DATA_JSON_TABLE);
        var listParams = JSON.parse(str);

        for (var property in listParams) {

            this[property] = listParams[property];
        }

        var curObj = this;

        if (data.error.length === 0) {

            new ui.Ajax()
                .setUrl(this._urlAction ? this._urlAction : window.location.href)
                .setParams(data['data'])
                .addParam('action', listParams._actions.search)
                .addCallbackFunction(
                    function (e) {

                        try {

                            var response = typeof e == 'object' ? e : JSON.parse(e);

                            listParams._currentPage = 1;
                            listParams._countPages = ui.api.existProperty(response, 'countPages', 1);
                            dataBlock.setAttribute(DATA_JSON_TABLE, JSON.stringify(listParams));

                            curObj._replaceRows(ui.api.existProperty(response, 'data', response));

                            new ui.SortTable(null).updateSort('#' + curObj._idList);

                            new ui.Pagination(curObj._actions.pagination + '-' + curObj._idList)
                                ._rebuild(listParams._currentPage, listParams._countPages);

                        } catch (e) {

                            new ui.Modal(null).error(e.name + ':' + e.message);
                        }
                    }
                )
                .send();
        }

        return true
    };

    ui.List.prototype._remove = function() {

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

        var dataBlock = document.body.querySelector('#' + this._idList + ' #' + DATA_JSON_TABLE);
        var str = dataBlock.getAttribute(DATA_JSON_TABLE);
        var listParams = JSON.parse(str);

        for (var property in listParams) {

            this[property] = listParams[property];
        }

        var curObj = this;

        new ui.Ajax()
            .setUrl(this._urlAction)
            .setParams(delObj)
            .addParam('action', this._actions.remove)
            .addParam('page', this._currentPage)
            .addParam('max', this._maxRow)
            .addCallbackFunction(function (e) {

                try {

                    var response = JSON.parse(e);

                    curObj._replaceRows(ui.api.existProperty(response, 'data', response));

                    new ui.SortTable(null).updateSort('#' + curObj._idList);

                    listParams._currentPage = 1;
                    listParams._countPages = ui.api.existProperty(response, 'countPages', 1);
                    dataBlock.setAttribute(DATA_JSON_TABLE, JSON.stringify(listParams));

                    new ui.Pagination(curObj._actions.pagination + '-' + curObj._idList)
                        ._rebuild(listParams._currentPage, listParams._countPages);

                } catch (e) {

                    new ui.Modal(null).error(e.name + ':' + e.message);
                }
            })
            .send();
    };

    /**
     * Generate html List
     * @returns {*|Element}
     * @private
     */
    ui.List.prototype._buildList = function() {

        var page = new ui.Page('page-' + this._idList)
            .setTitle(this._titleList, this._titleListSmall, null);

        this._btnDefault();

        if (this._btnLeftTopList.length > 0 || this._btnRightTopList.length > 0) {

            page.setHead(this._buildRowButtons(this._btnLeftTopList, this._btnRightTopList).toHTML());
        }

        page.setBody(
            new ui.Element('div')
                .setIdElement(this._idList, null)
                .addChildAfter(this._buildPanel())
                .toHTML()
        );

        if (this._btnLeftBottomList.length > 0 || this._btnRightBottomList.length > 0) {

            page.setFooter(this._buildRowButtons(this._btnLeftBottomList, this._btnRightBottomList).toHTML());
        }

        return page.getElement();
    };

    /**
     * @param {[]} leftBtn
     * @param {[]} rightBtn
     * @returns {string}
     * @private
     */
    ui.List.prototype._buildRowButtons = function (leftBtn, rightBtn) {

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
            );
    };

    /**
     * @param {string} name
     * @param {string|null} type
     * @returns {ui.List}
     */
    ui.List.prototype.addColumn = function(name, type) {
        this._column[name] = ui.api.empty(type, null);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} titleSmall
     * @returns {ui.List}
     */
    ui.List.prototype.setTitle = function(title, titleSmall) {
        this._titleList = ui.api.empty(title, null);
        this._titleListSmall = ui.api.empty(titleSmall, null);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} titleSmall
     * @returns {ui.List}
     */
    ui.List.prototype.setTitleSearch = function(title, titleSmall) {
        ui.Form.prototype.setTitle.apply(this, arguments);
        return this;
    };

    /**
     * @param {string} link
     * @returns {ui.List}
     */
    ui.List.prototype.setLinkAddEndEdit = function(link) {
        this._urlAddAndEdit = link;
        return this;
    };

    /**
     * @param {string} link
     * @returns {ui.List}
     */
    ui.List.prototype.setLinkTrash = function(link) {
        this._urlTrash = link;
        return this;
    };

    /**
     * @param {string} link
     * @returns {ui.List}
     */
    ui.List.prototype.setAction = function(link) {
        this._urlAction = link;
        return this;
    };

    /**
     * @param {string} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'|'muted'}
     * @returns {ui.List}
     */
    ui.List.prototype.setSkin = function(skin) {
        this._skin = skin;
        return this;
    };

    /**
     * @param {string} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'|'muted'}
     * @returns {ui.List}
     */
    ui.List.prototype.setSkinBlockSearch = function(skin) {
        ui.Form.prototype.setSkin.apply(this, arguments);
        return this;
    };

    /**
     * @param {string} skin {'striped'|'bordered'|'default'}
     * @returns {ui.List}
     */
    ui.List.prototype.setTypeTable = function(skin) {
        this._typeTable = ui.api.existProperty(ui.CSS.tableClass.skin, skin, null);
        return this;
    };

    /**
     * @param {string} url
     * @returns {ui.List}
     */
    ui.List.prototype.setUrlBack = function(url) {
        this._urlBack = url;
        return this
    };

    /**
     * @returns {ui.List}
     */
    ui.List.prototype.newRowHead = function() {
        this._settingsList.thead.push([]);
        this._lastSetting.block = BLOCK_HEAD;
        this._lastSetting.row   = Object.keys(this._settingsList.thead).length;
        return this;
    };

    /**
     * @returns {ui.List}
     */
    ui.List.prototype.newRowBody = function() {
        this._settingsList.tbody.push([]);
        this._lastSetting.block = BLOCK_BODY;
        this._lastSetting.row   = Object.keys(this._settingsList.tbody).length;
        return this;
    };

    /**
     * @param {[]|{}} object
     * @returns {ui.List}
     */
    ui.List.prototype.addRowsBody = function(object) {

        for (var i in object) {

            this._settingsList.tbody.push(object[i]);
        }

        return this;
    };

    /**
     * @returns {ui.List}
     */
    ui.List.prototype.newRowFoot = function() {
        this._settingsList.tfoot.push([]);
        this._lastSetting.block = BLOCK_FOOT;
        this._lastSetting.row   = Object.keys(this._settingsList.tfoot).length;
        return this;
    };

    /**
     * @param {string|number} content
     * @param {number} colspan
     * @param {number} rowspan
     * @param {boolean} sort
     * @param {string|number|null} width
     * @param {string|null} style
     * @returns {ui.List}
     */
    ui.List.prototype.addCellHead = function(content, colspan, rowspan, sort, width, style) {

        var block = this._lastSetting.block;
        var row   = this._lastSetting.row - 1;

        this._settingsList[block][row].push(
            {
                sort:    sort,
                width:   width,
                style:   style,
                content: content,
                rowspan: rowspan,
                colspan: colspan
            }
        );

        return this;
    };

    /**
     * @param {string|number} content
     * @param {number} colspan
     * @param {number} rowspan
     * @returns {ui.List}
     */
    ui.List.prototype.addCell = function(content, colspan, rowspan) {

        var block = this._lastSetting.block;
        var row   = this._lastSetting.row - 1;

        this._settingsList[block][row].push(
            {
                content: content,
                rowspan: rowspan,
                colspan: colspan
            }
        );

        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnRemove = function(hide) {

        this._hideBtnList = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnBack = function(hide) {

        this._hideBtnList._btnBack = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnSearch = function(hide) {

        this._hideBtnList._btnSearch = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnClear = function(hide) {

        this._hideBtnList._btnClear = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnAdd = function(hide) {

        this._hideBtnList._btnAdd = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnReload = function(hide) {

        this._hideBtnList._btnReload = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnRemove = function(hide) {

        this._hideBtnList._btnRemove = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnTrash = function(hide) {

        this._hideBtnList._btnTrash = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideColumnNumber = function(hide) {

        this._hideColumnNumber = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideColumnCheckbox = function(hide) {

        this._hideColumnCheckbox = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {number} page
     * @returns {ui.List}
     */
    ui.List.prototype.setCurrentPage = function(page) {

        this._currentPage = page;
        return this;
    };

    /**
     * @param {number} count
     * @returns {ui.List}
     */
    ui.List.prototype.setCountPages = function(count) {

        this._countPages = count;
        return this;
    };

    /**
     * Get object current element
     * @returns {*|Element}
     * @public
     */
    ui.List.prototype.getElement = function() {

        return this._buildList();
    };

    /**
     * Get html current element
     * @returns {string}
     * @public
     */
    ui.List.prototype.toHTML = function() {

        return this._buildList().outerHTML;
    };

    /**
     * Add element in document
     * @param {string} selector
     * @returns {ui.List}
     * @public
     */
    ui.List.prototype.appendHTML = function(selector) {

        new ui.$(selector).append(this.getElement());
        return this;
    };
} (window.ui || {}));