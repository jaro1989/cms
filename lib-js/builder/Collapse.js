
    (function(HTML) {

        var ICON_UP = 'chevron-up';
        var ICON_DOWN = 'chevron-down';

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

        /**
         *
         * @param {string|null} htmlId
         * @param {string|null} skin
         * @param {string|null} iconUp
         * @param {string|null} iconDown
         * @memberOf HTML
         * @namespace HTML.Collapse
         * @constructor
         */
        HTML.Collapse = function(htmlId, skin, iconUp, iconDown) {
            this._skin = _basis.emptyProperty(_basis.panel, skin, _basis.panel.primary);
            this._icon_up = _basis.emptyValue(iconUp, ICON_UP);
            this._icon_down = _basis.emptyValue(iconDown, ICON_DOWN);
            this._id = _basis.emptyValue(htmlId, new Date().getTime());
            this._data = {};
        };

        /** @protected */
        HTML.Collapse.prototype = {

            _showAllPanels: false,

            /**
             * Padding panel collapse
             *
             * @private
             * @type {string|null}
             */
            _padding: _basis.padding.sm,

            /**
             * Margin panel collapse
             *
             * @private
             * @type {string|null}
             */
            _margin: null,

            /**
             * @type {string|null}
             * @private
             */
            _addedPanel: {},

            /**
             * @type {string|null}
             * @private
             */
            _skin: null,

            /**
             * @type {string|null}
             * @private
             */
            _icon_up: ICON_UP,

            /**
             * @type {string|null}
             * @private
             */
            _icon_down: ICON_DOWN,

            /**
             * @type {string|null}
             * @private
             */
            _id: null,

            /**
             * @type {string|null}
             * @private
             */
            _class: null,

            /**
             * Html head panel
             *
             * @param {number} key
             * @param {object} params
             * @returns {*|string}
             * @private
             */
            _getHead: function(key, params) {

                var attr = {
                    'data-parent': this._showAllPanels ? null : '#' + this._id,
                    href:          '#' + _basis.panelClasses.collapse + '-' + key,
                    class:         _basis.panelClasses.title,
                    'data-toggle': _basis.panelClasses.collapse
                };

                var attrParent = attr;
                attrParent['class'] = _basis.panelClasses.heading;
                attrParent['onclick'] = "new HTML.Collapse()._updateIcon(this, '" + this._icon_up + "', '" + this._icon_down + "');";

                var icon = this._icon_down;
                if (params._open === true) {
                    icon = this._icon_up;
                }

                attrParent['data-status-panel'] = icon;

                var html = _basis.getTag(
                    'h5',
                    {class: _basis.panelClasses.title},
                    _basis.getTag('a', attr, _basis.getIcon(icon, null) + ' ' + _basis.emptyValue(params._title, ''))
                );

                return _basis.getTag('div', attrParent, html);
            },

            /**
             * Html body panel
             *
             * @param {number} key
             * @param {object} params
             * @returns {*|string}
             * @private
             */
            _getBody: function(key, params) {
                var open = '';
                if (params._open === true) {
                    open = _basis.panelClasses.open;
                }

                var attr = {
                    id:    _basis.panelClasses.collapse + '-' + key,
                    class: _basis.panelClasses.panelCollapse + ' ' + _basis.panelClasses.collapse + ' ' + open
                };

                var content =  _basis.getTag('div', {class: _basis.panelClasses.body}, _basis.emptyValue(params._body, ''));
                return _basis.getTag('div', attr, content);

            },

            /**
             * Html panel
             *
             * @param {number} key
             * @param {object} params
             * @returns {*|string}
             * @private
             */
            _getPanel: function(key, params) {

                var html = '';
                html += this._getHead(key, params);
                html += this._getBody(key, params);

                return _basis.getTag(
                    'div',
                    {
                        class: _basis.emptyValue(this._skin, '') + ' ' + _basis.panelClasses.class
                    },
                    html
                );

            },

            /**
             * Html block with panels
             *
             * @returns {*|string}
             * @private
             */
            _getBlockPanels: function() {

                var panels = '';
                var currentObj = this;
                $.each(this._addedPanel, function(key, params) {
                    panels += currentObj._getPanel(key, params);
                });

                var block = _basis.getTag(
                    'div',
                    {
                        id:    _basis.emptyValue(this._id, null),
                        class: _basis.emptyValue(this._class, '') + ' ' + _basis.panelClasses.group + ' ' + _basis.emptyValue(this._padding, '')
                    },
                    panels
                );
                return _basis.getTag('div', {class: _basis.emptyValue(this._margin, null)}, block);

            },

            /**
             * Update icon panel
             *
             * @param {object} e Click element
             * @param {string} up Name Icon up
             * @param {string} down Name Icon down
             * @private
             */
            _updateIcon: function(e, up, down) {
                var icon = up;
                var currentIcon = $(e).attr('data-status-panel');
                if (currentIcon === up) {
                    icon = down;
                }
                $(e).find('.' + _basis.iconClass + '-' + currentIcon)
                    .attr({class: _basis.iconClass + ' ' + _basis.iconClass + '-' + icon});

                $(e).attr({'data-status-panel': icon})
            },

            /**
             * Add panel
             *
             * @public
             * @param {string} title
             * @param {string} body
             * @param {boolean} open
             * @returns {HTML.Collapse}
             */
            addPanel: function(title, body, open) {
                var counter =  Object.keys(this._addedPanel).length++;
                this._addedPanel[counter] = {
                    _title: title,
                    _body: body,
                    _open: open
                };
                return this;
            },

            setShowAllPanels: function(show) {
                this._showAllPanels = (show ? true : false);
                return this;
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
             * Set html class block panel
             *
             * @public
             * @param {string} htmlClass
             * @returns {HTML.Collapse}
             */
            setClassPanel: function(htmlClass) {
                this._class = htmlClass;
                return this;
            },

            /**
             * Set html class block panel
             *
             * @public
             * @param {string} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'|null}
             * @returns {HTML.Collapse}
             */
            setSkinPanel: function(skin) {
                this._skin = _basis.emptyProperty(_basis.panel, skin, _basis.panel.default);
                return this;
            },

            /**
             * Compiles and returns HTML block panels
             *
             * @public
             * @returns {*|string}
             */
            toHtml: function() {
                return this._getBlockPanels();
            },

            /**
             * Compiles and appends HTML block panels in elements "element"
             *
             * @public
             * @param {string} element
             * @returns {HTML.Collapse}
             */
            appendHtml: function(element) {
                $(element).append(this._getBlockPanels());
                return this;
            }

        }

    } (window.HTML || {}));
