(function(ui) {
    
    var uniqueId = new Date().getTime();

    var BLOCK_HEAD = 'thead';
    var BLOCK_BODY = 'tbody';
    var BLOCK_FOOT = 'tfoot';

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
            thead: [
                //[
                //    {
                //        content: 'row - 0 / cell - 0',
                //        rowspan: 1,
                //        colspan: 2
                //    }
                //],
                //[
                //    {
                //        content: 'row - 1 / cell - 0',
                //        rowspan: 1,
                //        colspan: 1
                //    },
                //    {
                //        content: 'row - 1 / cell - 1',
                //        rowspan: 1,
                //        colspan: 1
                //    }
                //]
            ],
            tbody: [
                //[
                //    {
                //        content: 'row - 0 / cell - 0',
                //        rowspan: 1,
                //        colspan: 2
                //    }
                //],
                //{
                //        sss: 'row - 1 / cell - 0',
                //        aaaa: 'row - 1 / cell - 1'
                //}
            ],
            tfoot: [
                //[
                //    {
                //        content: 'row - 0 / cell - 0',
                //        rowspan: 1,
                //        colspan: 2
                //    }
                //],
                //[
                //    {
                //        content: 'row - 1 / cell - 0',
                //        rowspan: 1,
                //        colspan: 1
                //    },
                //    {
                //        content: 'row - 1 / cell - 1',
                //        rowspan: 1,
                //        colspan: 1
                //    }
                //]
            ]
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
        _positionBtnTop:    'left',
        _positionBtnBottom: 'right',
        _skinPanel: ui.CSS.skinClass.panel.primary,
        _typeTable: ui.CSS.tableClass.type.striped,

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

        /**
         * @param {string} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'}
         * @returns {ui.List}
         */
        setSkinPanel: function(skin) {

            this._skinPanel = ui.api.existProperty(ui.CSS.skinClass.panel, skin, null);
            return this;
        },

        /**
         * @param {string} type {'striped'|'bordered'|'default'}
         * @returns {ui.List}
         */
        setTypeTable: function(type) {

            this._typeTable = ui.api.existProperty(ui.CSS.tableClass.type, type, null);
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
                .addClassElement(this._typeTable);

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
         * @param {{}} params
         * @param {string} blockName {'head' | 'body' | 'foot'}
         * @returns {*|Element}
         * @private
         */
        _buildRows: function(params, blockName) {

            var row = new ui.Element('tr');

            var cellName = blockName == BLOCK_HEAD ? 'th' : 'td';

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

            return row.getElement();
        },

        /**
         * @param {string} blockName {'head' | 'body' | 'foot'}
         * @returns {*|Element}
         * @private
         */
        _buildBlock: function(blockName) {

            var block = new ui.Element(blockName);

            for (var i in this._settings[blockName]) {

                block.addChildAfter(
                    this._buildRows(this._settings[blockName][i], blockName)
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