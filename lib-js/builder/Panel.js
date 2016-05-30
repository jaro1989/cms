
    (function(HTML) {

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

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
            _skin: _basis.css.panel.skin.default,

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
            _padding: _basis.css.padding.sm,

            /**
             * Margin panel
             *
             * @private
             * @type {string|null}
             */
            _margin: null,

            /**
             * Generate HTML block panel HEAD
             *
             * @public
             * @returns {string}
             */
            getHeadPanel: function() {
                if (this._head !== null) {
                    return new HTML.BuildTag('div', true)
                        .setClass(_basis.css.panel.panelHead)
                        .setContent(
                            new HTML.BuildTag('h3', true)
                                .setClass(_basis.css.panel.panelTitle)
                                .setContent(this._head)
                                .toHTML()
                        )
                        .toHTML();
                }
                return '';
            },

            /**
             * Generate HTML block panel TABLE
             *
             * @public
             * @returns {string}
             */
            getTablePanel: function() {
                return new HTML.BuildTag('div', true)
                    .setContent(_basis.emptyValue(this._table, ''))
                    .toHTML();
            },

            /**
             * Generate HTML block panel BODY
             *
             * @public
             * @returns {string}
             */
            getBodyPanel: function() {
                if (this._body !== null) {
                    return new HTML.BuildTag('div', true)
                        .setClass(_basis.css.panel.panelBody)
                        .setContent(this._body)
                        .toHTML();
                }
                return '';
            },

            /**
             * Generate HTML block panel FOOT
             *
             * @public
             * @returns {string}
             */
            getFootPanel: function() {
                var res = '';
                if (this._foot !== null) {
                    if (typeof this._foot === 'object') {

                        var len = (12 / Object.keys(this._foot).length);

                        $.each(this._foot, function(key, value) {
                            res += new HTML.BuildTag('div', true)
                                .setClass(_basis.css.width + '-' + len)
                                .setContent(value)
                                .toHTML();
                        });

                        res = new HTML.BuildTag('div', true)
                            .setClass(_basis.css.panel.panelFoot)
                            .addClass(_basis.css.align.block.clear)
                            .setContent(res)
                            .toHTML();

                    } else {

                        res = new HTML.BuildTag('div', true)
                            .setClass(_basis.css.panel.panelFoot)
                            .setContent(this._foot)
                            .toHTML(res);
                    }
                }
                return res;
            },

            getHTML: function() {
                var containBlock = '';

                containBlock += this.getHeadPanel();
                containBlock += this.getBodyPanel();
                containBlock += this.getTablePanel();
                containBlock += this.getFootPanel();

                return new HTML.BuildTag('div')
                    .setClass(this._margin)
                    .setContent(
                        new HTML.BuildTag('div', true)
                            .setId(this._id)
                            .setClass(_basis.css.panel.panel)
                            .addClass(this._class)
                            .addClass(this._padding)
                            .addClass(_basis.emptyValue(this._skin, _basis.css.panel.skin.default))
                            .setContent(containBlock)
                            .toHTML()
                    )
                    .toHTML();
            },

            /**
             * Set margin panel
             *
             * @public
             * @param {string|null|undefined} margin {'lg'|'sm'|'xs'|null}
             * @default {string} sm
             * @returns {HTML.Panel}
             */
            setMargin: function(margin) {
                this._margin = _basis.emptyProperty(_basis.css.padding, margin, _basis.css.padding.sm);
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
                this._padding = _basis.emptyProperty(_basis.css.padding, padding, _basis.css.padding.sm);
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
                this._id = htmlId;
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
                this._class = htmlClass;
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
                this._skin = _basis.emptyProperty(_basis.css.panel.skin, skin, _basis.css.panel.skin.default);
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
                this._table = contain;
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
                this._head = contain;
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
                this._body = contain;
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
                this._foot = contain;
                return this;
            },

            /**
             * Compiles and returns HTML panel
             *
             * @public
             * @returns {string} Html buttons
             */
            toHtml: function() {
                return this.getHTML();
            },

            /**
             * Compiles and appends HTML panel in elements "element"
             *
             * @public
             * @param {string} element {This panel will be added in element "element"}
             * @returns {HTML.Panel}
             */
            appendHtml: function(element) {
                $(element).append(this.getHTML());
                return this;
            }
        };

    } (window.HTML || {}));