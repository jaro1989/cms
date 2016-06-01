
    (function(HTML) {

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

        /**
         * @memberOf HTML.Grid
         * @constructor
         */
        HTML.Grid = function() {

            this._tableHead = {};
            this._tableBody = {};
            this._tableAddRow = {};
        };

        /** @protected */
        HTML.Grid.prototype = {

            _paginationCurrentPage: 1,

            _paginationCountPage: 0,

            _paginationUrl: window.location.href,

            _paginationLinkParam: null,

            _paginationAlign: null,

            _panelTitle: null,

            _panelMargin: _basis.css.padding.sm,

            _panelPadding: _basis.css.padding.sm,

            _panelSkin: _basis.css.panel.skin.primary,

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
                    .setRowBtnAdd(this._tableAddRow)
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
                    .setLinkParam(this._paginationLinkParam)
                    .setPosition(this._paginationAlign)
                    .setLink(this._paginationUrl)
                    .toHtml();
            },

            /**
             * Get panel with table
             *
             * @private
             */
            _getPanel: function() {
                return new HTML.Panel()
                    .setMargin(this._panelMargin)
                    .setPadding(this._panelPadding)
                    .setSkinPanel(this._panelSkin)
                    .setHeadPanel(this._panelTitle)
                    .setBodyPanel(this._getForm())
                    .setTablePanel(this._getTable())
                    .setFootPanel(this._getPagination())
                    .toHtml();
            },

            /**
             * Set current page
             *
             * @param {number} current
             * @returns {HTML.Grid}
             */
            setCurrentPage: function(current) {
                this._paginationCurrentPage = Number(current);
                return this;
            },

            /**
             * Count pages
             *
             * @param {number|null} count
             * @returns {HTML.Grid}
             */
            setCountPages: function(count) {
                this._paginationCountPage = Number(count);
                return this;
            },

            /**
             * Set link pagination
             *
             * @param {string|null} link
             * @returns {HTML.Pagination}
             */
            setLinkPagination: function(link) {
                this._paginationUrl = link;
                return this;
            },

            /**
             * Set name param page
             *
             * @param {string|null} linkParam
             * @returns {HTML.Grid}
             */
            setLinkParamPagination: function(linkParam){
                this._paginationLinkParam = linkParam;
                return this;
            },

            /**
             * Set position pagination
             *
             * @param {string|null} position {'left'|'right'|null}
             * @returns {HTML.Grid}
             */
            setAlignPagination: function(position) {
                this._paginationAlign = _basis.emptyProperty(_basis.css.align.block, position, null);
                return this;
            },

            /**
             * Set title Grid
             *
             * @param title
             * @returns {HTML.Grid}
             */
            setTitle: function(title) {
                this._panelTitle = title;
                return this;
            },

            /**
             * Set margin Grid
             *
             * @public
             * @param {string|null} margin {'lg'|'sm'|'xs'|null}
             * @default {string} sm
             * @returns {HTML.Grid}
             */
            setMargin: function(margin) {
                this._panelMargin = _basis.emptyProperty(_basis.css.padding, margin, _basis.css.padding.sm);
                return this;
            },

            /**
             * Set padding Grid
             *
             * @public
             * @param {string|null} padding {'lg'|'sm'|'xs'|null}
             * @default {string} sm
             * @returns {HTML.Grid}
             */
            setPadding: function(padding) {
                this._panelPadding = _basis.emptyProperty(_basis.css.padding, padding, _basis.css.padding.sm);
                return this;
            },

            /**
             * Set skin Grid
             *
             * @public
             * @param {string|null} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'|null}
             * @default {string} default
             * @returns {HTML.Grid}
             */
            setSkinPanel: function(skin) {
                this._panelSkin = _basis.emptyProperty(_basis.css.panel.skin, skin, _basis.css.panel.skin.primary);
                return this;
            },

            /**
             * Set html class skin table
             *
             * @public
             * @param {string|null} skin {'striped'|'bordered'|'bordered-none'|'hover'|'condensed'|null}
             * @returns {HTML.Table}
             */
            setSkinTable: function(skin) {
                this._tableSkin = skin;
                return this;
            },

            /**
             * Set margin table
             *
             * @public
             * @param {string|null} margin {'lg'|'sm'|'xs'|null}
             * @default {string} sm
             * @returns {HTML.Grid}
             */
            setMarginTable: function(margin) {
                this._tableMargin = margin;
                return this;
            },

            /**
             * Set link row table
             *
             * @param {string} link
             * @returns {HTML.Grid}
             */
            setLinkRowTable: function(link) {
                this._tableLinkRow = link;
                return this;
            },

            /**
             * Add column numeration cell in table
             *
             * @returns {HTML.Grid}
             */
            addColumnNum: function() {
                this._tableCellNum = true;
                return this;
            },

            /**
             * Add column with buttons
             *
             * @returns {HTML.Grid}
             */
            addColumnBtn: function() {
                this._tableCellBtn = true;
                return this;
            },

            /**
             * Set data for build rows table block HEAD
             *
             * @param {{}} data
             * @returns {HTML.Grid}
             */
            setDataHead: function(data) {
                this._tableHead = data;
                return this;
            },

            /**
             * Set data for build rows table block BODY
             *
             * @param {{}} data
             * @returns {HTML.Grid}
             */
            setDataBody: function(data) {
                this._tableBody = data;
                return this;
            },

            /**
             * Set data for build row table on onclick button add
             *
             * @param {{}} data
             * @returns {HTML.Grid}
             */
            setDataAddRow: function(data) {
                this._tableAddRow = data;
                return this;
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
             * @returns {HTML.Grid}
             */
            appendHtml: function(element) {
                $(element).append(this._getPanel());
                return this;
            }

        };
    } (window.HTML || {}));