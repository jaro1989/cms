
    (function(HTML) {

        var TABLE = 'table';

        var RESPONSIVE_TABLE = 'table-responsive';

        var CELL_BTN = 'cell-btn';

        var CELL_NUM = 'cell-num';

        var CELL_CHECKBOX = 'cell-checkbox';

        var ROW_LINK = 'row-link';

        var SEPARATOR_URL_PARAMS = '/';

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
         * @param {{}} buttonElement
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
         * @param {string|null} idTable { html id table }
         * @memberOf HTML.Table
         * @constructor
         */
        HTML.Table = function(idTable) {
            unique++;
            this._unique = unique;
            this._id = _basis.emptyValue(idTable, TABLE + '-' + this._unique);
            /**
             * Parameters for generation head table
             *
             * @private
             * @type {{}}
             */
            this._head = {};

            /**
             * Parameters for generation body table
             *
             * @private
             * @type {{}}
             */
            this._body = {};

            this._paramsLink = {id: SEPARATOR_URL_PARAMS};

            this._arrayKeyHead = [];

            /**
             * Parameters for generation foot table
             *
             * @private
             * @type {{}}
             */
            this._foot = {};
            this._counterHeadRow = 1;
            this._counterBodyRow = 1;
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
            _skinTable: _basis.css.table.bordered,

            /**
             * Html class table
             *
             * @private
             * @type {string|null}
             */
            _class: null,

            /**
             * Margin table
             *
             * @private
             * @type {string|null}
             */
            _margin: null,

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
             * Show column checkbox
             *
             * @private
             * @type {boolean}
             */
            _cellCheckBox: false,

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
             * @param {{}} element {this button}
             * @param {string} idTable Html ID table
             * @param {{}} table
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
             * @param {{}} element {this button}
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
             * @param {{}} element {this button}
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
             * @param {{}} attr
             * @param {*} content
             * @returns {string} Html cell table
             */
            _getFirstOrLastCell: function(countRow, attr, content) {
                var cell = '';
                if (this._counterHeadRow === 1 && this._cellName === 'th') {
                    attr['rowspan'] = countRow;
                    cell = new HTML.BuildTag(this._cellName, true)
                        .setAttributes(attr)
                        .setContent(content)
                        .toHTML();
                } else if (this._cellName === 'td') {
                    cell = new HTML.BuildTag(this._cellName, true)
                        .setAttributes(attr)
                        .setContent(content)
                        .toHTML();
                }
                return cell;
            },

            /**
             * The method generating cell with CheckBox
             *
             * @private
             * @returns {string} Html cell table
             */
            _getCellCheckBox: function() {

                var content = '';
                if (this._cellCheckBox === true) {
                    var countRow = Object.keys(this._head).length;
                    var onclick = '';

                    if (this._counterHeadRow === 1 && this._cellName === 'th') {
                        onclick = _basis.cancelEventOnClick() + ' new HTML.Table()._changeAll(this, \'' + this._id + '\');';
                    }

                    if (this._cellName === 'td') {
                        onclick = _basis.cancelEventOnClick() + ' new HTML.Table()._notChange(this, \'' + this._id + '\');';
                    }

                    content = new HTML.BuildTag('input', false)
                        .setType('checkbox')
                        .setOnclick(onclick)
                        .toHTML();

                    return this._getFirstOrLastCell(
                        countRow,
                        {
                            class: CELL_CHECKBOX + ' ' + this._id + '-' + CELL_CHECKBOX + ' ' + _basis.css.align.text.center,
                            onclick: _basis.cancelEventOnClick() + ' new HTML.Table()._changeCurrent(this);'
                        },
                        content
                    );
                } else {
                    return '';
                }
            },

            /**
             * Change checkbox else click on cell with checkbox
             *
             * @param {{}} element - Element cell
             * @private
             */
            _changeCurrent: function(element) {
                var checkBox = $(element).find('input');
                checkBox.click();
            },

            /**
             * Selected all checkbox
             *
             * @param {{}} element
             * @param {string} idTable
             * @private
             */
            _changeAll: function(element, idTable) {
                var checkBox = $('#' + idTable).find('.' + CELL_CHECKBOX);
                var status = false;
                if ($(element).prop( "checked")) {
                    status = true;
                }
                checkBox.find('input').prop('checked', status);
            },

            /**
             * Not selected checkbox to head
             *
             * @param {{}} element
             * @param {string} idTable
             * @private
             */
            _notChange: function(element, idTable) {
                var table = $('#' + idTable);
                var c_head = table.find('thead').find('.' + CELL_CHECKBOX).find('input');
                var c_body = table.find('tbody').find('.' + CELL_CHECKBOX).find('input');

                if (!$(element).prop( "checked")) {
                    c_head.prop('checked', false);
                } else {
                    var i = 0;

                    $.each(c_body, function(num, field) {
                        if (!$(field).prop( "checked" )) {
                            i++;
                            c_head.prop('checked', false);
                        }
                    });

                    if (i === 0) {
                        c_head.prop('checked', true);
                    }
                }
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

                    cellHtml = new HTML.BuildTag(this._cellName, true)
                        .setAttributes(_basis.emptyProperty(params, 'attr', {}))
                        .setContent(_basis.emptyProperty(params, 'data', ''))
                        .toHTML();

                } else {

                    cellHtml = new HTML.BuildTag(this._cellName, true)
                        .setContent(params)
                        .toHTML();
                }
                return cellHtml;
            },

            /**
             * Sort and filter data object for build cell
             *
             * @param {{}} params
             * @returns {{}}
             * @private
             */
            _sortAndFilterDataCell: function(params) {
                var obj = {};
                $.each(this._arrayKeyHead, function(key, param) {
                    if (params.hasOwnProperty(param)) {
                        obj[param] = params[param];
                    }
                });

                return obj;
            },

            /**
             * The method generating row table
             *
             * @private
             * @param {{}} params {parameters for generation cell}
             * @returns {string} Html row table
             */
            _getRow: function(params) {
                var row = new HTML.BuildTag('tr', true);

                var cellHtml = this._getCellNum();
                var currentObj = this;

                if (this._cellName === 'td' && this._arrayKeyHead.length > 0) {
                    params = this._sortAndFilterDataCell(params);
                }

                $.each(params, function(key, param) {
                    cellHtml += currentObj._getCell(param);
                });
                cellHtml += this._getCellCheckBox();
                cellHtml += this._getCellBtn();
                row.setContent(cellHtml);

                var link = _basis.emptyValue(this._linkRow, false);
                if (link !== false && this._cellName === 'td') {

                    var parametersUrl = '';
                    if (Object.keys(this._paramsLink).length > 0) {
                        $.each(this._paramsLink, function(keyParam, valueParam) {
                            if (params.hasOwnProperty(keyParam)) {
                                parametersUrl += valueParam + params[keyParam];
                            }
                        });
                    }

                    row
                        .setClass(ROW_LINK)
                        .setOnclick("window.location.href='" + link + parametersUrl + "';");
                }

                if (this._cellName === 'th') {
                    this._counterHeadRow++;
                } else {
                    this._counterBodyRow++;
                }
                return row.toHTML();
            },

            /**
             * The method generating block table with rows
             *
             * @private
             * @param {string} nameBlock { 'thead' | 'tbody' | 'tfoot' }
             * @param {{}} params {parameters for generation rows and cell}
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

                    return new HTML.BuildTag(nameBlock, true)
                        .setContent(row)
                        .toHTML();
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

                return new HTML.BuildTag('div', true)
                    .setClass(RESPONSIVE_TABLE)
                    .addClass(this._margin)
                    .setContent(
                        new HTML.BuildTag('table', true)
                            .setId(this._id)
                            .setStyle(this._style)
                            .addClass(this._class)
                            .addClass(this._skinTable)
                            .setClass(TABLE)
                            .setContent(content)
                            .toHTML()
                    )
                    .toHTML();
            },

            /**
             * Set link row
             *
             * @param {string|null} link
             * @returns {HTML.Table}
             */
            setLinkRow: function(link) {
                this._linkRow = link;
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
             * @param {{}} data
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
             * Set margin table
             *
             * @public
             * @param {string|null|undefined} margin {'lg'|'sm'|'xs'|null}
             * @default {string} sm
             * @returns {HTML.Table}
             */
            setMargin: function(margin) {
                this._margin = _basis.emptyProperty(_basis.css.padding, margin, null);
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
             * @param {string|null|undefined} skin {'striped'|'bordered'|'bordered-none'|'hover'|'condensed'|null}
             * @returns {HTML.Table}
             */
            setSkinTable: function(skin) {
                this._skinTable = _basis.emptyProperty(_basis.css.table, skin, _basis.css.table.bordered);
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
                    obj[Object.keys(obj).length] = {};
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
             * @param {string|number} width - width cell
             * @returns {HTML.Table}
             */
            addCell: function(data, colspan, rowspan, width) {
                if (this._key !== null) {
                    var obj = _basis.emptyProperty(this, '_' + this._key, false);
                    if (obj !== false) {
                        var counterRow = --Object.keys(obj).length;
                        var counterCell = Object.keys(obj[counterRow]).length;
                        obj[counterRow][counterCell] = {
                            data: _basis.emptyValue(data, null),
                            attr: {
                                colspan: _basis.emptyValue(colspan, 1),
                                rowspan: _basis.emptyValue(rowspan, 1),
                                width:   _basis.emptyValue(width, null)
                            }
                        };
                    }
                }
                return this;
            },

            /**
             * Add data for generation rows head
             *
             * @public
             * @param {object|null} data
             * @returns {HTML.Table}
             */
            addDataHead: function(data) {
                if (typeof data === 'object') {
                    var currentObj = this;
                    $.each(data, function(key, params) {
                        var counter = Object.keys(currentObj._head).length;
                        currentObj._head[counter] = params;
                        $.each(params, function(name) {
                            currentObj._arrayKeyHead.push(name);
                        });
                    });
                }
                return this;
            },

            /**
             * Add data for generation rows body
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
             * Add parameter to link row table
             *
             * @param {string} paramName - key cell from which the value will be taken
             * @param {string} separator - separator before parameter
             * @returns {HTML.Table}
             */
            addParamsLink: function(paramName, separator) {
                var name = _basis.emptyValue(paramName, false);
                if (name !== false) {
                    this._paramsLink[name] = _basis.emptyValue(separator, SEPARATOR_URL_PARAMS);
                }
                return this;
            },

            /**
             * Add column with checkbox
             *
             * @public
             * @param {boolean} show
             * @returns {HTML.Table}
             */
            addColumnCheckbox: function(show) {
                this._cellCheckBox = show;
                return this;
            },

            /**
             * Add column with cell number row
             *
             * @public
             * @param {boolean} show
             * @returns {HTML.Table}
             */
            addColumnNum: function(show) {
                this._cellNum = show;
                return this;
            },

            /**
             * Add column with buttons add/del
             *
             * @public
             * @param {boolean} show
             * @returns {HTML.Table}
             */
            addColumnBtn: function(show) {
                this._cellBtn = show;
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