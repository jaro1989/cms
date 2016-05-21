
    (function(HTML) {

        var _basis = new HTML.Basis();

        /**
         * Prefix
         *
         * @private
         * @type {string}
         */
        var TAB_PREFIX = 'tab';

        /**
         * Html id block tabs
         *
         * @private
         * @type {string}
         */
        var TAB_BLOCK_ID = 'block-tabs';

        /**
         * Attribute tab toogle
         *
         * @private
         * @type {string}
         */
        var TAB_TOOGLE = 'tab';

        /**
         * HTML CLASS navigation tabs
         *
         * @private
         * @type {string}
         */
        //var TAB_NAV = 'nav nav-pills';//nav-tabs';

        /**
         * HTML CLASS blocks conten
         *
         * @private
         * @type {string}
         */
        var TAB_CONTENT = 'tab-content';

        /**
         * HTML CLASS penels
         *
         * @private
         * @type {string}
         */
        var TAB_CONTENT_PANEL = 'tab-pane fade';

        /**
         * HTML CLASS active tab
         *
         * @private
         * @type {string}
         */
        var TAB_ACTIVE = 'in active';

        /**
         * unique block
         *
         * @private
         * @type {number}
         * @default {1}
         */
        var unique = 1;

        /**
         * Generate HTML tag navigation
         *
         * @private
         * @param {object} params
         * @param {string|null} active
         * @returns {*|string}
         */
        var getNav = function(params, active) {
            var aAttributes = { href: '#' + params.id + '-' + unique, 'data-toggle': TAB_TOOGLE };
            var liAttributes = { class: active };

            var tagA = _basis.getTag('a', aAttributes, (_basis.getIcon(params.icon) + ' ' + params.name).trim());
            return _basis.getTag('li', liAttributes, tagA);
        };

        /**
         * Generate HTML tag content
         *
         * @private
         * @param {object} params
         * @param {string|null} active
         * @returns {*|string}
         */
        var getContent = function(params, active) {
            var content = {
                id: params.id + '-' + unique,
                class: TAB_CONTENT_PANEL + ' ' + _basis.emptyValue(active, '')
            };
            return _basis.getTag('div', content, params.content);
        };

        /**
         * Compiles and returns HTML block with tabs
         *
         * @private
         * @param {object} object Current object
         * @returns {*|string}
         */
        var compileBlockTabs = function(object) {
            var html = '';
            var nav = '';
            var content = '';
            var noActive = Object.keys(object._activeTab).length;

            $.each(object._tabs, function(key, params) {
                var active = _basis.emptyProperty(object._activeTab, key, null);
                if (noActive == 0 && key == 0) {
                    active = TAB_ACTIVE;
                }
                nav += getNav(params, active);
                content += getContent(params, active);
            });

            html += _basis.getTag('ul', { class: _basis.emptyValue(object._typeTabs, _basis.tabs.nJustified) }, nav);
            html += _basis.getTag('div', { class: TAB_CONTENT + ' ' + object._paddingContent }, content);
            return _basis.getTag('div', { id: object._idBlockTabs }, html);
        };

        /**
         *
         * @param {string|null|undefined} htmlIdBlock
         * @param {string|null|undefined} typeTabs {'nJustified'|'pJustified'|'nStacked'|'pStacked'|'nav'|'pills'|null}
         * @memberOf HTML
         * @namespace HTML.Tabs
         * @constructor
         */
        HTML.Tabs = function(htmlIdBlock, typeTabs) {
            this._typeTabs = _basis.emptyProperty(_basis.tabs, typeTabs, null);
            this._idBlockTabs = _basis.emptyValue(htmlIdBlock, TAB_BLOCK_ID + '-' + unique);
            this._activeTab = {};
            this._tabs = {};
            unique++;
        };

        /**
         *
         * @type {{}}
         * @protected
         */
        HTML.Tabs.prototype = {

            /**
             *
             * @private
             * @type {string|null}
             */
            _typeTabs: null,

            /**
             *
             * @private
             * @type {string|null}
             */
            _idBlockTabs: null,

            /**
             * @private
             * @type {string|null}
             * @default {sm}
             */
            _paddingContent: _basis.padding.sm,

            /**
             * @private
             * @type {{}}
             */
            _activeTab: {},

            /**
             * @private
             * @type {{}}
             */
            _tabs: {},

            /**
             * Set padding content tabs
             *
             * @public
             * @param {string|null} padding {'lg'|'sm'|'xs'|null}
             * @returns {HTML.Tabs}
             */
            setPadding: function(padding) {
                this._paddingContent = _basis.emptyProperty(_basis.padding, padding, null);
                return this;
            },

            /**
             * Add tab and content tab
             *
             * @public
             * @param {string|null} tabName
             * @param {string|null} tabContent
             * @param {string|null|undefined} tabId
             * @param {string|null|undefined} tabIcon
             * @param {boolean|undefined} tabActive
             * @returns {HTML.Tabs}
             */
            addTab: function(tabName, tabContent, tabId, tabIcon, tabActive) {
                var counter = Object.keys(this._tabs).length++;
                if (tabActive === true) {
                    this._activeTab[counter] = TAB_ACTIVE;
                } else if (tabActive === false) {
                    this._activeTab[counter] = null;
                }
                this._tabs[counter] = {
                    id: _basis.emptyValue(tabId, TAB_PREFIX + '-' + counter),
                    name: _basis.emptyValue(tabName, null),
                    icon: _basis.emptyValue(tabIcon, null),
                    content: _basis.emptyValue(tabContent, null)
                };
                return this;
            },

            /**
             * Create tabs of the object
             *
             * @public
             * @param {object} obj = { 0: { id: 'tabId', name: 'tabName', icon: 'tabIcon', content: 'tabContent' } }
             * @param {string|number|null|undefined} tabActive {Key row. Example: 0}
             * @returns {HTML.Tabs}
             */
            addTabs: function(obj, tabActive) {
                var counter = Object.keys(this._tabs).length++;
                if (typeof obj === 'object') {

                    var currentObj = this;

                    $.each(obj, function(key, params) {
                        if (tabActive == key) {
                            currentObj._activeTab[counter] = TAB_ACTIVE;
                        }
                        currentObj._tabs[counter] = {
                            id: _basis.emptyProperty(params, 'id', TAB_PREFIX + '-' + counter),
                            name: _basis.emptyProperty(params, 'name', null),
                            icon: _basis.emptyProperty(params, 'icon', null),
                            content: _basis.emptyProperty(params, 'content', null)
                        };
                        counter++;
                    });
                }
                return this;
            },

            /**
             * Compiles and returns HTML block with tabs
             *
             * @public
             * @returns {*|string}
             */
            toHtml: function() {
                return compileBlockTabs(this);
            },

            /**
             * Compiles and appends HTML block with tabs in elements "element"
             *
             * @public
             * @param {string} element
             * @returns {HTML.Tabs}
             */
            appendHtml: function(element) {
                $(element).append(compileBlockTabs(this));
                return this;
            }

        };

    } (window.HTML || {}));