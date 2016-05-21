
    (function(HTML) {

        var TABLE = 'table';

        var RESPONSIVE_TABLE = 'table-responsive';

        var CELL_BTN = 'cell-btn';

        var CELL_NUM = 'cell-num';

        var ROW_LINK = 'row-link';

        var unique = 0;

        var globals = {
            addRow: {}
        };

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

        /**
         *
         * @param {object} buttonElement
         * @returns {{tr: (XML|jQuery), block: XML, table: XML}}
         */
        var getDomElementsTable = function(buttonElement) {
            var tr = $(buttonElement)
                .parent()
                .parent()
                .parent()
                .parent();
            var block = tr.parent();
            var table = block.parent();
            return {
                tr: tr,
                block: block,
                table: table
            };
        };

        /**
         *
         * @param {string|null|undefined} idTable { html id table }
         * @param {boolean|undefined} cellNum { show column number }
         * @param {boolean|undefined} cellBtn { show column button }
         * @memberOf HTML
         * @constructor
         */
        HTML.Table = function(idTable, cellNum, cellBtn) {
            unique++;
            this._unique = unique;
            this._id = _basis.emptyValue(idTable, TABLE + '-' + this._unique);
            this._head = {};
            this._body = {};
            this._foot = {};
            this._counterHeadRow = 1;
            this._counterBodyRow = 1;

            this._cellNum = false;
            if (cellNum === true) {
                this._cellNum = true;
            }

            this._cellBtn = false;
            if (cellBtn === true) {
                this._cellBtn = true;
            }
        };

        /** @protected */
        HTML.Table.prototype = {

            _unique: 0,

            /**
             * Html ID table
             *
             * @private
             * @type {string|null}
             */
            _id: null,

            /**
             * Html styles table
             *
             * @private
             * @type {string|null}
             */
            _style: null,

            /**
             * Html class skin table
             *
             * @private
             * @type {string|null}
             */
            _skinTable: _basis.table.bordered,

            /**
             * Html class skin panel table
             *
             * @private
             * @type {string|null}
             */
            _skinPanel: null,

            /**
             * Html class table
             *
             * @private
             * @type {string|null}
             */
            _class: null,

            /**
             * Title table
             *
             * @private
             * @type {string|null}
             */
            _titleTable: null,

            /**
             * Content before table
             *
             * @private
             * @type {string|null}
             */
            _contentBefore: null,

            /**
             * Content after table
             *
             * @private
             * @type {string|null}
             */
            _contentAfter: null,

            /**
             * Padding panel
             *
             * @private
             * @type {string|null}
             */
            _padding: 'xs',

            /**
             * Margin panel
             *
             * @private
             * @type {string|null}
             */
            _margin: null,

            /**
             * Parameters for generation head table
             *
             * @private
             * @type {object}
             */
            _head: {},

            /**
             * Parameters for generation body table
             *
             * @private
             * @type {object}
             */
            _body: {},

            /**
             * Parameters for generation foot table
             *
             * @private
             * @type {object}
             */
            _foot: {},

            /**
             * Cell name { 'th' | 'td' }
             *
             * @private
             * @type {string|null}
             */
            _cellName: 'td',

            /**
             * Key for add row in block
             *
             * @private
             * @type {string|null}
             */
            _key: null,

            /**
             * Counter row in block head
             *
             * @private
             * @type {number}
             */
            _counterHeadRow: 1,

            /**
             * Counter row in block body
             *
             * @private
             * @type {number}
             */
            _counterBodyRow: 1,

            /**
             * Title column number
             *
             * @private
             * @type {string}
             */
            _cellNumTitle: '#',

            /**
             * Show column number cell
             *
             * @private
             * @type {string|boolean}
             */
            _cellNum: false,

            /**
             * Show column button
             *
             * @private
             * @type {object|boolean}
             */
            _cellBtn: false,

            /**
             * Html pagination
             *
             * @private
             * @type {string|null}
             */
            _pagination: null,

            /**
             * Link row
             *
             * @type {string|null}
             */
            _linkRow: null,

            /**
             * Set Line Numbering
             *
             * @private
             * @param {object} element {this button}
             * @param {string} idTable Html ID table
             * @param {object} table
             */
            _autoNumCell: function(element, idTable, table) {
                var i = 1;
                $($(table).find('tbody, tfoot').find('.' + idTable + '-' + CELL_NUM)).each(function() {
                    $(this).text(i);
                    i++;
                });
            },

            /**
             * Add new row in table block body or foot
             *
             * @private
             * @param {object} element {this button}
             * @param {string|number} key {key - object "globals" with unique data}
             * @param {string|number} idTable
             */
            _addRow: function(element, key, idTable) {

                var row = _basis.emptyProperty(globals.addRow, key, false);
                if (row !== false) {
                    var dataTable = getDomElementsTable(element);

                    if ($(dataTable.block).is('thead')) {
                        dataTable.block.parent().children('tbody').prepend(row);
                    } else {
                        dataTable.tr.after(row);
                    }
                    this._autoNumCell(element, idTable, dataTable.table);
                }
                return this;
            },

            /**
             * Deleting row table
             *
             * @private
             * @param {object} element {this button}
             * @param {string|number} idTable
             */
            _delRow: function(element, idTable) {

                var dataTable = getDomElementsTable(element);

                dataTable.tr.remove();
                this._autoNumCell(element, idTable, dataTable.table);
                return this;
            },

            /**
             * The method generating cell with number row or cell with buttons (add/del row)
             *
             * @private
             * @param {number} countRow
             * @param {object} attr
             * @param {*} content
             * @returns {string} Html cell table
             */
            _getFirstOrLastCell: function(countRow, attr, content) {
                var cell = '';
                if (this._counterHeadRow === 1 && this._cellName === 'th') {
                    attr['rowspan'] = countRow;
                    cell = _basis.getTag(this._cellName, attr, content);
                } else if (this._cellName === 'td') {
                    cell = _basis.getTag(this._cellName, attr, content);
                }
                return cell;
            },

            /**
             * The method generating cell with number row
             *
             * @private
             * @returns {string} Html cell table
             */
            _getCellNum: function() {
                var content = '';
                if (this._cellNum === true) {
                    var countRow = Object.keys(this._head).length;
                    if (this._counterHeadRow === 1 && this._cellName === 'th') {
                        content = this._cellNumTitle;
                    } else {
                        content = this._counterBodyRow;
                    }
                    return this._getFirstOrLastCell(countRow, {class: CELL_NUM + ' ' + this._id + '-' + CELL_NUM}, content);
                } else {
                    return '';
                }
            },

            /**
             * The method generating cell with buttons (add/del row)
             *
             * @private
             * @returns {string} Html cell table
             */
            _getCellBtn: function() {
                if (this._cellBtn === true) {
                    var countRow = Object.keys(this._head).length;
                    var content = new HTML.Button('toolbar')
                        .setSize('xs')
                        .setOnClick('var table = new HTML.Table(); table._addRow(this, ' + this._unique + ', \'' + this._id + '\');')
                        .addButton(null, null, null, 'plus');

                    if (this._cellName === 'td') {
                        content
                            .setOnClick('var table = new HTML.Table(); table._delRow(this, \'' + this._id + '\');')
                            .addButton(null, null, null, 'minus');
                    }
                    var cancelEvent = 'event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true)';
                    return this._getFirstOrLastCell(countRow, {class: CELL_BTN, onclick: cancelEvent}, content.toHtml());
                } else {
                    return '';
                }
            },

            /**
             * The method generating cell with content
             *
             * @private
             * @param {object|string} params {parameters for generation cell}
             * @returns {string} Html cell table
             */
            _getCell: function(params) {
                var cellHtml = '';
                if (typeof params === 'object') {

                    cellHtml = _basis.getTag(
                        this._cellName,
                        _basis.emptyProperty(params, 'attr', {}),
                        _basis.emptyProperty(params, 'data', '')
                    );
                } else {

                    cellHtml = _basis.getTag(this._cellName, {}, params);
                }
                return cellHtml;
            },

            /**
             * The method generating row table
             *
             * @private
             * @param {object} params {parameters for generation cell}
             * @returns {string} Html row table
             */
            _getRow: function(params) {

                var cellHtml = '';
                cellHtml += this._getCellNum();

                var currentObj = this;
                $.each(params, function(key, param) {
                    cellHtml += currentObj._getCell(param);
                });

                cellHtml += this._getCellBtn();

                var attr = {};
                var link = _basis.emptyValue(this._linkRow, false);
                if (link !== false && this._cellName === 'td') {
                    attr['onclick'] = "window.location.href='" + link + this._counterBodyRow + "';";
                    attr['class'] = ROW_LINK;
                }

                if (this._cellName === 'th') {
                    this._counterHeadRow++;
                } else {
                    this._counterBodyRow++;
                }

                return _basis.getTag('tr', attr, cellHtml);
            },

            /**
             * The method generating block table with rows
             *
             * @private
             * @param {string} nameBlock { 'thead' | 'tbody' | 'tfoot' }
             * @param {object} params {parameters for generation rows and cell}
             * @returns {string} Html table
             */
            _getBlock: function(nameBlock, params) {
                if (Object.keys(params).length > 0) {
                    var row = '';

                    if (nameBlock === 'thead') {
                        this._cellName = 'th';
                    } else {
                        this._cellName = 'td';
                    }

                    var currentObj = this;
                    $.each(params, function (key, paramCell) {
                        row += currentObj._getRow(paramCell);
                    });

                    var attr = {};
                    return _basis.getTag(nameBlock, attr, row);
                }
                return '';
            },

            /**
             * The method generating table with blocks and rows
             *
             * @private
             * @returns {*|string}
             */
            _getTable: function() {
                var content = '';
                content += this._getBlock('thead', this._head);
                content += this._getBlock('tbody', this._body);
                content += this._getBlock('tfoot', this._foot);

                var attr = {
                    class: TABLE + ' ' + _basis.emptyValue(this._skinTable, '') + ' ' + _basis.emptyValue(this._class, ''),
                    id: this._id,
                    style: this._style
                };

                var table = _basis.getTag('div', {class: RESPONSIVE_TABLE}, _basis.getTag('table', attr, content));

                var footer = {};
                if (this._contentAfter !== null) {
                    footer['data'] = this._contentAfter;
                }
                if (this._pagination !== null) {
                    footer['pagination'] = this._pagination;
                }
                if (Object.keys(footer).length == 0) {
                    footer = null;
                }

                return new HTML.Panel()
                    .setMargin(this._margin)
                    .setPadding(this._padding)
                    .setSkinPanel(this._skinPanel)
                    .setHeadPanel(this._titleTable)
                    .setBodyPanel(this._contentBefore)
                    .setTablePanel(table)
                    .setFootPanel(footer)
                    .toHtml();
            },

            /**
             * Set link row
             *
             * @param {string|null} link
             * @returns {HTML.Table}
             */
            setLinkRow: function(link) {
                this._linkRow = _basis.emptyValue(link, null);
                return this;
            },

            /**
             * Set pagination table
             *
             * @param {number} currentPage
             * @param {number} countPage
             * @param {string|null} link
             * @param {string|null} linkParam
             * @param {string|null} position {'left'|'right'}
             * @param {boolean} show {'show'-true|'hide'-false}
             * @returns {HTML.Table}
             */
            setPagination: function(currentPage, countPage, link, linkParam, position, show) {
                show = _basis.emptyValue(show, true);
                if (show === true) {
                    this._pagination = new HTML.Pagination()
                        .setCurrentPage(currentPage)
                        .setCountPages(countPage)
                        .setPosition(_basis.emptyValue(position, 'right'))
                        .setLinkParam(linkParam)
                        .setLink(link)
                        .toHtml();
                } else if (show === false) {
                    this._pagination = null;
                }
                return this;
            },

            /**
             * Set title column number rows
             *
             * @param {string|null} cellTitle
             * @returns {HTML.Table}
             */
            setTitleNum: function(cellTitle) {
                this._cellNumTitle = _basis.emptyValue(cellTitle, _basis.hrefDefault);
                return this;
            },

            /**
             * Set parameters data for button "add"
             *
             * @param {object} data
             * @returns {HTML.Table}
             */
            setRowBtnAdd: function(data) {
                var rows = '';
                var currentObj = this;
                $.each(data, function (key, paramCell) {
                    rows += currentObj._getRow(paramCell);
                });
                globals['addRow'][this._unique] = rows;
                this._counterHeadRow = 1;
                this._counterBodyRow = 1;
                return this;
            },

            /**
             * Set margin panel
             *
             * @public
             * @param {string|null|undefined} margin {'lg'|'sm'|'xs'|null}
             * @default {string} sm
             * @returns {HTML.Table}
             */
            setMargin: function(margin) {
                var check = _basis.emptyProperty(_basis.padding, margin, false);
                if (check !== false) {
                    this._margin = margin;
                }
                return this;
            },

            /**
             * Set padding panel
             *
             * @public
             * @param {string|null|undefined} padding {'lg'|'sm'|'xs'|null}
             * @default {string} sm
             * @returns {HTML.Table}
             */
            setPadding: function(padding) {
                var check = _basis.emptyProperty(_basis.padding, padding, false);
                if (check !== false) {
                    this._padding = padding;
                }
                return this;
            },

            /**
             * Set html style table
             *
             * @public
             * @param {string|null} style
             * @returns {HTML.Table}
             */
            setStyle: function(style) {
                this._style = _basis.emptyValue(style, null);
                return this;
            },

            /**
             * Set html class skin table
             *
             * @public
             * @param {string|null|undefined} skin {'striped'|'bordered'|'hover'|'condensed'|null}
             * @returns {HTML.Table}
             */
            setSkinTable: function(skin) {
                this._skinTable = _basis.emptyProperty(_basis.table, skin, _basis.table.bordered);
                return this;
            },

            /**
             * Set skin panel
             *
             * @public
             * @param {string|null|undefined} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'|null}
             * @default {string} default
             * @returns {HTML.Table}
             */
            setSkinPanel: function(skin) {
                var check = _basis.emptyProperty(_basis.panel, skin, _basis.panel.default);
                if (check !== false) {
                    this._skinPanel = skin;
                }
                return this;
            },

            /**
             * Set html new class table
             *
             * @public
             * @param {string|null} classTable
             * @returns {HTML.Table}
             */
            setClass: function(classTable) {
                this._class = _basis.emptyValue(classTable, null);
                return this;
            },

            /**
             * Set title table
             *
             * @public
             * @param {string|null} title
             * @returns {HTML.Table}
             */
            setTitleTable: function(title) {
                this._titleTable = _basis.emptyValue(title, null);
                return this;
            },

            /**
             * Set content before table
             *
             * @public
             * @param {*} content
             * @returns {HTML.Table}
             */
            setContentBeforeTable: function(content) {
                this._contentBefore = _basis.emptyValue(content, null);
                return this;
            },

            /**
             * Set content after table
             *
             * @public
             * @param {*} content
             * @returns {HTML.Table}
             */
            setContentAfterTable: function(content) {
                this._contentAfter = _basis.emptyValue(content, null);
                return this;
            },

            /**
             * This method added new row in 'head' or 'body' or 'foot'
             *
             * @public
             * @param {string|undefined} inBlock {'head'|'body'|'foot'}
             * @default {'body'}
             * @returns {HTML.Table}
             */
            addRow: function(inBlock) {
                inBlock = _basis.emptyValue(inBlock, 'body');
                this._key = inBlock;
                var obj = _basis.emptyProperty(this, '_' + inBlock, false);
                if (obj !== false) {
                    var counter = Object.keys(obj).length;
                    obj[counter] = {};
                }
                return this;
            },

            /**
             * This method added new cell in last row in 'head' or 'body' or 'foot'
             *
             * @public
             * @param {*} data - content cell
             * @param {number} colspan - count cell merger upon vertical
             * @param {number} rowspan - count cell merger upon horizontal
             * @returns {HTML.Table}
             */
            addCell: function(data, colspan, rowspan) {
                if (this._key !== null) {
                    var obj = _basis.emptyProperty(this, '_' + this._key, false);
                    if (obj !== false) {
                        var counterRow = --Object.keys(obj).length;
                        var counterCell = Object.keys(obj[counterRow]).length;
                        obj[counterRow][counterCell] = {
                            data: _basis.emptyValue(data, null),
                            attr: {
                                colspan: _basis.emptyValue(colspan, 1),
                                rowspan: _basis.emptyValue(rowspan, 1)
                            }
                        };
                    }
                }
                return this;
            },

            /**
             * Add data for generation rowq body
             *
             * @public
             * @param {object|null} data
             * @returns {HTML.Table}
             */
            addDataBody: function(data) {
                if (typeof data === 'object') {
                    var currentObj = this;
                    $.each(data, function(key, params) {
                        var counter = Object.keys(currentObj._body).length;
                        currentObj._body[counter] = params;
                    });
                }
                return this;
            },

            /**
             * Compiles and returns HTML table
             *
             * @public
             * @returns {string} Html table
             */
            toHtml: function() {
                return this._getTable();
            },

            /**
             * Compiles and appends HTML table in elements "element"
             *
             * @public
             * @param {string} element {This table will be added in element "element"}
             * @returns {HTML.Table}
             */
            appendHtml: function(element) {
                $(element).append(this._getTable());
                return this;
            }
        };

    } (window.HTML || {}));