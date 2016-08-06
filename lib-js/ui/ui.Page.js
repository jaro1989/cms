
    (function(ui) {

        var uniqueId = new Date().getTime();

        /**
         * @memberOf ui
         * @namespace ui.Page
         * @param {string} idPage
         * @constructor
         */
        ui.Page = function (idPage) {

            /**
             * @type {string}
             * @private
             */
            this._idPage = ui.api.empty(idPage, 'page-' + uniqueId);
        };

        /** @protected */
        ui.Page.prototype = {

            _title:  null,
            _titleSmall: null,
            _titleSize: 3,
            _header: null,
            _body:   null,
            _footer: null,

            /**
             *
             * @param title
             * @param titleSmall
             * @param size
             * @returns {ui.Page}
             */
            setTitle: function(title, titleSmall, size) {

                this._title = ui.api.empty(title, null);
                this._titleSmall = ui.api.empty(titleSmall, null);

                if (typeof size == 'number') {

                    this._titleSize = size;
                }

                return this;
            },

            /**
             *
             * @param head
             * @returns {ui.Page}
             */
            setHead: function(head) {

                this._header = head;
                return this;
            },

            /**
             * @param {string|number|null} body
             * @returns {ui.Page}
             */
            setBody: function(body) {

                this._body = body;
                return this;
            },

            /**
             *
             * @param footer
             * @returns {ui.Page}
             */
            setFooter: function(footer) {

                this._footer = footer;
                return this;
            },

            _buildTitle: function() {

                return new ui.Element('div')
                    //.addClassElement(ui.CSS.page.header)
                    .addChildAfter(
                        new ui.Element('h' + this._titleSize)
                            .setContentElement(ui.api.empty(this._title, '') + ' ')
                            .addChildAfter(
                                new ui.Element('small')
                                    .setContentElement(this._titleSmall)
                                    .getElement()
                            )
                            .getElement()
                    )
                    .getElement();
            },

            _buildHeader: function() {

                return new ui.Element('div')
                    .addClassElement(ui.CSS.alignClass.block.clear)
                    .setContentElement(this._header)
                    .getElement();
            },

            _buildBody: function() {

                return new ui.Element('div')
                    .addClassElement(ui.CSS.alignClass.block.clear)
                    .setContentElement(this._body)
                    .getElement();
            },

            _buildFooter: function() {

                return new ui.Element('div')
                    .setContentElement(this._footer)
                    .getElement();
            },

            _buildMainBlock: function() {

                var page =  new ui.Element('div')
                    .setIdElement(this._idPage, null)
                    .addClassElement(ui.CSS.alignClass.block.clear)
                    .addClassElement(ui.CSS.page.main);

                if (this._title !== null || this._titleSmall !== null) {

                    page
                        .addChildAfter(this._buildTitle());
                }

                if (this._header !== null) {

                    page
                        .addChildAfter(this._buildHeader());
                }

                if (this._body !== null) {

                    page
                        .addChildAfter(this._buildBody());
                }

                if (this._footer !== null) {

                    page
                        .addChildAfter(this._buildFooter());
                }

                return page.getElement();
            },

            /**
             * Get object current element
             * @returns {*|Element}
             * @public
             */
            getElement: function() {
                return this._buildMainBlock();
            },

            /**
             * Get html current element
             * @returns {string}
             * @public
             */
            toHTML: function() {
                return this._buildMainBlock().outerHTML;
            },

            /**
             * Add element in document
             * @param {string} selector
             * @returns {ui.Page}
             * @public
             */
            appendHTML: function(selector) {

                new ui.$(selector).append(this.getElement());
                return this;
            }
        }

    } (window.ui || {}));