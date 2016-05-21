
    (function(HTML) {

        /**
         * HTML Class block panel
         *
         * @private
         * @type {string}
         */
        var PANEL = 'panel';

        /**
         * HTML Class panel body
         *
         * @private
         * @type {string}
         */
        var PANEL_BODY = 'panel-body';

        /**
         * HTML Class panel footer
         *
         * @private
         * @type {string}
         */
        var PANEL_FOOTER = 'panel-footer';

        /**
         * HTML Class panel head
         *
         * @private
         * @type {string}
         */
        var PANEL_HEADING = 'panel-heading';

        /**
         * HTML Class panel title
         *
         * @private
         * @type {string}
         */
        var PANEL_TITLE = 'panel-title';

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

        /**
         * Generate HTML block panel
         *
         * @private
         * @param {object} obj {current object}
         * @param {string} containBlock
         * @returns {*|string}
         */
        var getBlockPanel = function(obj, containBlock) {
            var attr = {
                id: obj._id,
                class: (
                    PANEL + ' ' +
                    _basis.emptyValue(obj._skin, _basis.panel.default) + ' ' +
                    _basis.emptyValue(obj._class, '') + ' ' +
                    _basis.emptyValue(obj._padding, '')
                ).trim()
            };
            var panel = _basis.getTag('div', attr, containBlock);
            if (obj._margin === null) {
                return panel;
            } else {
                return _basis.getTag('div', {class: obj._margin}, panel);
            }
        };

        /**
         * Generate HTML block panel HEAD
         *
         * @private
         * @param {string|null} titleHead
         * @returns {string}
         */
        var getHeadPanel = function(titleHead) {
            var res = '';
            if (titleHead !== null) {
                var title = _basis.getTag('h3', {class: PANEL_TITLE}, titleHead);
                res = _basis.getTag('div', {class: PANEL_HEADING}, title);
            }
            return res;
        };

        /**
         * Generate HTML block panel TABLE
         *
         * @private
         * @returns {string}
         */
        var getTablePanel = function(obj) {
            return _basis.emptyValue(obj._table, '');
        };

        /**
         * Generate HTML block panel BODY
         *
         * @private
         * @param {string|null} containBody
         * @returns {string}
         */
        var getBodyPanel = function(containBody) {
            var res = '';
            if (containBody !== null) {
                res = _basis.getTag('div', {class: PANEL_BODY}, containBody);
            }
            return res;
        };

        /**
         * Generate HTML block panel FOOT
         *
         * @private
         * @param {string|null} containFoot
         * @returns {string}
         */
        var getFootPanel = function(containFoot) {
            var res = '';
            if (containFoot !== null) {
                if (typeof containFoot === 'object') {
                    var len = (12 / Object.keys(containFoot).length);
                    $.each(containFoot, function(key, value) {
                        res += _basis.getTag('div', {class: _basis.layout + '-' + len}, value);
                    });
                    res = _basis.getTag('div', {class: PANEL_FOOTER + ' ' + _basis.position.clear}, res);
                } else {
                    res = _basis.getTag('div', {class: PANEL_FOOTER}, containFoot);
                }
            }
            return res;
        };

        /**
         * Generate HTML FULL panel
         *
         * @private
         * @param {object} obj {current object}
         * @returns {*|string}
         */
        var getHTML = function(obj) {
            var containBlock = '';
            containBlock += getHeadPanel(obj._head);
            containBlock += getBodyPanel(obj._body);
            containBlock += getTablePanel(obj);
            containBlock += getFootPanel(obj._foot);
            return getBlockPanel(obj, containBlock);
        };

        /**
         * @memberOf HTML
         * @namespace HTML.Panel
         * @constructor
         */
        HTML.Panel = function() {

        };

        /** @protected */
        HTML.Panel.prototype = {

            /**
             * Content panel head
             *
             * @private
             * @type {string|null}
             */
            _head: null,

            /**
             * Content panel body
             *
             * @private
             * @type {string|null}
             */
            _body: null,

            /**
             * Content panel footer
             *
             * @private
             * @type {string|null}
             */
            _foot: null,

            /**
             * Content panel for table
             *
             * @private
             * @type {string|null}
             */
            _table: null,

            /**
             * HTML Class skin panel
             *
             * @private
             * @type {string|null}
             */
            _skin: _basis.panel.default,

            /**
             * HTML Class user
             *
             * @private
             * @type {string|null}
             */
            _class: null,

            /**
             * HTML ID panel
             *
             * @private
             * @type {string|null}
             */
            _id: null,

            /**
             * Padding panel
             *
             * @private
             * @type {string|null}
             */
            _padding: _basis.padding.sm,

            /**
             * Margin panel
             *
             * @private
             * @type {string|null}
             */
            _margin: null,

            /**
             * Set margin panel
             *
             * @public
             * @param {string|null|undefined} margin {'lg'|'sm'|'xs'|null}
             * @default {string} sm
             * @returns {HTML.Panel}
             */
            setMargin: function(margin) {
                this._margin = _basis.emptyProperty(_basis.padding, margin, _basis.padding.sm);
                return this;
            },

            /**
             * Set padding panel
             *
             * @public
             * @param {string|null|undefined} padding {'lg'|'sm'|'xs'|null}
             * @default {string} sm
             * @returns {HTML.Panel}
             */
            setPadding: function(padding) {
                this._padding = _basis.emptyProperty(_basis.padding, padding, _basis.padding.sm);
                return this;
            },

            /**
             * HTML ID panel
             *
             * @public
             * @param {string|null} htmlId
             * @returns {HTML.Panel}
             */
            setIdPanel: function(htmlId) {
                this._id = _basis.emptyValue(htmlId, null);
                return this;
            },

            /**
             * HTML CLASS panel
             *
             * @public
             * @param {string|null} htmlClass
             * @returns {HTML.Panel}
             */
            setClassPanel: function(htmlClass) {
                this._class = _basis.emptyValue(htmlClass, null);
                return this;
            },

            /**
             * Set skin panel
             *
             * @public
             * @param {string|null|undefined} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'|null}
             * @default {string} default
             * @returns {HTML.Panel}
             */
            setSkinPanel: function(skin) {
                this._skin = _basis.emptyProperty(_basis.panel, skin, _basis.panel.default);
                return this;
            },

            /**
             * Set table panel
             *
             * @public
             * @param {string|null} contain
             * @returns {HTML.Panel}
             */
            setTablePanel: function(contain) {
                this._table = _basis.emptyValue(contain, null);
                return this;
            },

            /**
             * Set title panel
             *
             * @public
             * @param {string|null} contain
             * @returns {HTML.Panel}
             */
            setHeadPanel: function(contain) {
                this._head = _basis.emptyValue(contain, null);
                return this;
            },

            /**
             * Set body panel
             *
             * @public
             * @param {string|null} contain
             * @returns {HTML.Panel}
             */
            setBodyPanel: function(contain) {
                this._body = _basis.emptyValue(contain, null);
                return this;
            },

            /**
             * Set footer panel
             *
             * @public
             * @param {object|string|null} contain {0: 'content', 1: 'comtent'} or 'content'
             * @returns {HTML.Panel}
             */
            setFootPanel: function(contain) {
                this._foot = _basis.emptyValue(contain, null);
                return this;
            },

            /**
             * Compiles and returns HTML panel
             *
             * @public
             * @returns {string} Html buttons
             */
            toHtml: function() {
                return getHTML(this);
            },

            /**
             * Compiles and appends HTML panel in elements "element"
             *
             * @public
             * @param {string} element {This panel will be added in element "element"}
             * @returns {HTML.Panel}
             */
            appendHtml: function(element) {
                $(element).append(getHTML(this));
                return this;
            }
        };

    } (window.HTML || {}));