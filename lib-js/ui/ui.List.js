(function(ui) {
    
    var uniqueId = new Date().getTime();

    var BLOCK_HEAD = 'head';
    var BLOCK_BODY = 'body';
    var BLOCK_FOOT = 'foot';

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
        this._addBtnTop = [];

        /**
         * @type {[]}
         * @private
         */
        this._addBtnBottom  = [];

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
            head: [
                [
                    {
                        content: 'row - 0 / cell - 0',
                        rowspan: 1,
                        colspan: 2
                    }
                ],
                [
                    {
                        content: 'row - 1 / cell - 0',
                        rowspan: 1,
                        colspan: 1
                    },
                    {
                        content: 'row - 1 / cell - 1',
                        rowspan: 1,
                        colspan: 1
                    }
                ]
            ],
            body: [
                [
                    {
                        content: 'row - 0 / cell - 0',
                        rowspan: 1,
                        colspan: 2
                    }
                ],
                [
                    {
                        content: 'row - 1 / cell - 0',
                        rowspan: 1,
                        colspan: 1
                    },
                    {
                        content: 'row - 1 / cell - 1',
                        rowspan: 1,
                        colspan: 1
                    }
                ]
            ],
            foot: {}
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
        _positionBtnTop:    'left',
        _positionBtnBottom: 'right',

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
        },

        _buildTable: function() {

            var table = new ui.Element('table')
                .addClassElement(ui.CSS.tableClass.table)
                .addClassElement(ui.CSS.tableClass.type.striped)
                .addClassElement(ui.CSS.tableClass.type.responsive)
                .addClassElement(ui.CSS.tableClass.type.hover);

            this._buildRows(table, BLOCK_HEAD);
            this._buildRows(table, BLOCK_BODY);
            this._buildRows(table, BLOCK_FOOT);

            return table.getElement();
        },

        /**
         * @param {*} content
         * @param {number} column
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
         * @param {ui.Element} table
         * @param {{}} params
         * @param {string} blockName {'head' | 'body' | 'foot'}
         * @private
         */
        _buildCell: function(table, params, blockName) {

            var cellName = blockName == BLOCK_HEAD ? 'th' : 'td';
            var addCellType = (blockName == BLOCK_HEAD) ? 'addCellHead' : 'addCellBody';

            var countCell = Object.keys(params).length;

            for (var i = 0; i < countCell; i++) {

                var paramCell = params[i];

                table[addCellType](this._contentCell(paramCell, blockName, i), i)
                    .addAttrTable(cellName, 'colspan', ui.api.existProperty(paramCell, 'colspan', 1))
                    .addAttrTable(cellName, 'rowspan', ui.api.existProperty(paramCell, 'rowspan', 1));
            }
        },

        /**
         * @param {ui.Element} table
         * @param {string} blockName {'head' | 'body' | 'foot'}
         * @private
         */
        _buildRows: function(table, blockName) {

            var countRow = Object.keys(this._settings[blockName]).length;

            for (var i = 0; i < countRow; i++) {

                (blockName == BLOCK_HEAD) ? table.addRowHead(i) : table.addRowBody(i);

                this._buildCell(table, this._settings[blockName][i], blockName);
            }
        },

        _skinPanel: ui.CSS.skinClass.panel.primary,

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

            page.setBody(
                new ui.Element('div')
                    .setIdElement(this._idList, null)
                    .addChildAfter(this._buildPanel())
                    .toHTML()
            );

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
         * @param {string} url
         * @returns {ui.List}
         */
        setUrlBack: function(url) {

            this._urlBack = url;
            return this
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