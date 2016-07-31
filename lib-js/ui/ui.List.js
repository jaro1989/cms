(function(ui) {
    
    var uniqueId = new Date().getTime();

    var BLOCK_HEAD = 'thead';
    var BLOCK_BODY = 'tbody';
    var BLOCK_FOOT = 'tfoot';
    var CHECKBOX_CHOICE_ALL = '_choice_all_row';
    var CHECKBOX_CHOICE_ROW = '_choice_row';

    /**
     * @memberOf ui
     * @namespace ui.List
     * @param {string} idList
     * @constructor
     */
    ui.List = function (idList) {

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

        /**
         * @type {[]|{}}
         * @private
         */
        this._parentRecords = [];

        this._idList = ui.api.empty(idList, uniqueId);
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
        _fieldRecordId: null,
        _hideColumnNumber: false,
        _hideColumnCheckbox: false,
        _linkEdit: null,

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

            if (this._hideColumnCheckbox === false && this._remove != '') {

                this._btnDefaultRightTop.push(
                    {
                        type:     'button',
                        name:     '_remove',
                        leftIcon: 'trash',
                        skin:     'danger',
                        onclick:  "alert(111);"
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
         * @param {number} column
         * @returns {*}
         * @private
         */
        _columnType: function(content, column) {

            var type = ui.api.existProperty(this._columnTypeData, column, false);

            if (type) {

            }

            return content;
        },

        /**
         * @param {{}} params
         * @param {string} blockName {'head' | 'body' | 'foot'}
         * @param {number} column
         * @returns {*}
         * @private
         */
        _contentCell: function(params, blockName, column) {

            var content = ui.api.existProperty(params, 'content', params);

            if (blockName == BLOCK_BODY) {

                return this._columnType(content, column);
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

                    var reordID = ui.api.existProperty(this._settings.tbody[rowNum], this._fieldRecordId, null);

                    row.addChildAfter(
                        cell
                            .addChildAfter(
                                new ui.Element('div')
                                    .setContentElement(rowNum)
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

                if (blockName == BLOCK_HEAD && rowNum == 0) {

                    var countRow = Object.keys(this._settings.thead).length;

                    row.addChildAfter(
                        cell
                            .addChildAfter(
                                new ui.FFCheckbox('simple')
                                    .setPadding(null)
                                    .addCheckbox(null, CHECKBOX_CHOICE_ALL, null)
                                    .getElement()
                            )
                            .setAttrElement('rowspan', countRow)
                            .getElement()
                    );
                } else if (blockName == BLOCK_BODY) {

                    var reordID = ui.api.existProperty(this._settings.tbody[rowNum], this._fieldRecordId, null);

                    row.addChildAfter(
                        cell
                            .addChildAfter(
                                new ui.FFCheckbox('simple')
                                    .setPadding(null)
                                    .addCheckbox(reordID, CHECKBOX_CHOICE_ROW + '[' + rowNum + ']', null)
                                    .setClass(CHECKBOX_CHOICE_ROW)
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

            for (var i in params) {

                var paramCell = params[i];

                row.addChildAfter(
                    new ui.Element(cellName)
                        .setContentElement(this._contentCell(paramCell, blockName, i))
                        .setAttrElement('colspan', ui.api.existProperty(paramCell, 'colspan', 1))
                        .setAttrElement('rowspan', ui.api.existProperty(paramCell, 'rowspan', 1))
                        .getElement()
                );
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

            for (var rowNum in this._settings[blockName]) {

                block.addChildAfter(
                    this._buildRows(this._settings[blockName][rowNum], blockName, rowNum)
                );
            }

            return block.getElement();
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

            panel.addChildAfter(
                new ui.Element('div')
                    .addClassElement(ui.CSS.panelClass.panelBody)
                    .addChildAfter(this._buildTable())
                    .getElement()
            );

            return panel.getElement();
        },

        /**
         * Generate html List
         * @returns {*|Element}
         * @private
         */
        _buildList: function() {

            var page = new ui.Page()
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
         * @param {string|number|null} fieldRecordId
         * @param {string} link
         * @returns {ui.List}
         */
        setLinkEdit: function(fieldRecordId, link) {

            this._fieldRecordId = fieldRecordId;
            this._linkEdit = link;
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