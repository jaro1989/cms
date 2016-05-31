
    (function(HTML) {
        /**
         *
         * @memberOf HTML.Grid
         * @constructor
         */
        HTML.Grid = function() {

            this._tableHead = {};
            this._tableBody = {};
        };

        /** @protected */
        HTML.Grid.prototype = {

            _paginationCurrentPage: 1,

            _paginationCountPage: 0,

            _paginationUrl: null,

            _paginationParam: null,

            _paginationAlign: null,

            _panelTitle: null,

            _panelBody: null,

            _tableCellNum: false,

            _tableCellBtn: false,

            _tableLinkRow: null,

            _tableMargin: null,

            _tableSkin: null,

            _getForm: function() {
                return '';
            },

            _getTable: function() {
                return new HTML.Table(null, this._tableCellNum, this._tableCellBtn)
                    .setLinkRow(this._tableLinkRow)
                    .setSkinTable(this._tableSkin)
                    .setMargin(this._tableMargin)
                    .addDataHead(this._tableHead)
                    .addDataBody(this._tableBody)
                    .toHtml()
            },

            /**
             * Get html pagination
             *
             * @returns {string}
             */
            _getPagination: function() {
                return new HTML.Pagination()
                    .setCurrentPage(this._paginationCurrentPage)
                    .setCountPages(this._paginationCountPage)
                    .setLinkParam(this._paginationParam)
                    .setPosition(this._paginationAlign)
                    .setLink(this._paginationUrl)
                    .toHtml();
            },

            /**
             * Get panel with table
             *
             * @returns {*|HTML.Panel}
             * @private
             */
            _getPanel: function() {
                return new HTML.Panel()
                    .setHeadPanel(this._panelTitle)
                    .setBodyPanel(this._getForm())
                    .setTablePanel(this._getTable())
                    .setFootPanel(this._getPagination())
                    .toHtml();
            },

            /**
             * Compiles and returns HTML panel with table
             *
             * @public
             * @returns {string} Html table
             */
            toHtml: function() {
                return this._getPanel();
            },

            /**
             * Compiles and appends HTML panel with table in elements "element"
             *
             * @public
             * @param {string} element {This table will be added in element "element"}
             * @returns {HTML.Table}
             */
            appendHtml: function(element) {
                $(element).append(this._getPanel());
                return this;
            }

        };
    } (window.HTML || {}));