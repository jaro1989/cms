
    (function(HTML) {

        var maxItem = 3;

        var currentPage = 1;

        var previousName = '&laquo;';

        var nextName = '&raquo;';

        var defaultLinkParam = '?page=';

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

        /**
         * @memberOf HTML
         * @namespace HTML.Pagination
         * @constructor
         */
        HTML.Pagination = function() {

        };

        /** @protected */
        HTML.Pagination.prototype = {

            _link: null,

            _linkParam: null,

            _position: _basis.position.right,

            _maxItem: maxItem,

            _countPages: null,

            _currentPage: 1,

            _size: _basis.pagination.size.sm,

            _skin: _basis.pagination.skin.default,

            _namePrevious: previousName,

            _nameNext: nextName,

            _nameLast: nextName + nextName,

            _nameFirst: previousName + previousName,

            /**
             * Html item return to the first page
             *
             * @param {string|null} type {'l'|'r'|null}
             * @returns {string}
             * @private
             */
            _getFirstItem: function(type) {
                var disabled = null;
                if (this._currentPage == 1) {
                    disabled = true;
                }

                return this._getItem(1, this._nameFirst, disabled, null, type);
            },

            /**
             * Html item return to the last page
             *
             * @param {string|null} type {'l'|'r'|null}
             * @returns {string}
             * @private
             */
            _getLastItem: function(type) {
                var disabled = null;
                if (this._currentPage == this._countPages) {
                    disabled = true;
                }

                return this._getItem(this._countPages, this._nameLast, disabled, null, type);
            },

            /**
             * Html item return to the previous page
             *
             * @param {string|null} type {'l'|'r'|null}
             * @returns {*|string}
             * @private
             */
            _getPrevItem: function(type) {
                var page = (this._currentPage > 1) ? (this._currentPage - 1) : this._countPages;
                return this._getItem(page, this._namePrevious, null, null, type);
            },

            /**
             * Html item return to the next page
             *
             * @param {string|null} type {'l'|'r'|null}
             * @returns {*|string}
             * @private
             */
            _getNextItem: function(type) {
                var page = (this._currentPage < this._countPages) ? (this._currentPage + 1) : 1;
                return this._getItem(page, this._nameNext, null, null, type);
            },

            /**
             * Html item pagination
             *
             * @param {number|string} page
             * @param {number|string} nameItem
             * @param {boolean|null} disabled {true|null}
             * @param {boolean|null} active {true|null}
             * @param {string|null} side {'l'|'r'|null}
             * @returns {string}
             * @private
             */
            _getItem: function(page, nameItem, disabled, active, side) {

                if (disabled === true) {
                    disabled = _basis.pagination.item.disabled;
                } else {
                    disabled = null;
                }

                if (active === true) {
                    active = _basis.pagination.item.active;
                } else {
                    active = null;
                }

                if (side === 'l') {
                    side = _basis.pagination.side.left
                } else if (side === 'r') {
                    side = _basis.pagination.side.rirht
                } else {
                    side = null;
                }

                var attrItem = {
                    class: _basis.emptyValue(active, '') + ' ' +
                           _basis.emptyValue(disabled, '') + ' ' +
                           _basis.emptyValue(side, '')
                };

                var attrHref = {
                    href:  _basis.emptyValue(this._link, '') + _basis.emptyValue(this._linkParam, '') + page
                };

                return _basis.getTag('li', attrItem, _basis.getTag('a', attrHref, nameItem));
            },

            /**
             * Html items pagination
             *
             * @returns {string}
             * @private
             */
            _getItems: function() {
                var item = '';

                var start = 1;
                var minus = this._currentPage - this._maxItem - 1;
                if (minus > 0) {
                    start = this._currentPage - this._maxItem;
                    if ((minus - 5) > 0) {
                        minus = minus - 5;
                    }
                    item += this._getItem(minus, '...', null, null);
                }

                var end = this._countPages;
                var plus = this._currentPage + this._maxItem + 1;
                if ( (this._countPages - plus) > 0 ) {
                    end = this._currentPage + this._maxItem;
                }

                for (var i = start; i <= end; i++) {
                    var active = null;
                    if (i == this._currentPage) {
                        active = true;
                    }
                    item += this._getItem(i, i, null, active);
                }

                if ( (this._countPages - plus) > 0 ) {
                    if ( (this._countPages - (plus + 5)) > 0 ) {
                        plus = plus + 5;
                    }
                    item += this._getItem(plus, '...', null, null);
                }
                return item;
            },

            /**
             * Html block pagination
             *
             * @returns {*|string}
             * @private
             */
            _getPagination: function() {
                if (this._countPages !== null && this._countPages > 1) {
                    var item = '';

                    if (this._countPages > ((maxItem + 1) * 2)) {
                        item += this._getFirstItem(null);
                    }

                    item += this._getPrevItem('l');
                    item += this._getItems();
                    item += this._getNextItem('r');

                    if (this._countPages > ((maxItem + 1) * 2)) {
                        item += this._getLastItem(null);
                    }

                    var attr = {
                        class: this._skin + ' ' +
                        _basis.emptyValue(this._size, '') + ' ' +
                        _basis.emptyValue(this._position, '')
                    };

                    return _basis.getTag('div', {class: _basis.position.clear}, _basis.getTag('ul', attr, item));
                }
                return '';
            },

            /**
             * Set link pagination
             *
             * @param {string|null} link
             * @returns {HTML.Pagination}
             */
            setLink: function(link) {
                this._link = _basis.emptyValue(link, null);
                return this;
            },

            /**
             * Set name param page
             *
             * @param {string|null} linkParam
             * @returns {HTML.Pagination}
             */
            setLinkParam: function(linkParam){
                this._linkParam = _basis.emptyValue(linkParam, defaultLinkParam);
                return this;
            },

            /**
             * Set position pagination
             *
             * @param {string|null} position {'left'|'right'|null}
             * @returns {HTML.Pagination}
             */
            setPosition: function(position) {
                this._position = _basis.emptyProperty(_basis.position, position, null);
                return this;
            },

            /**
             * the maximum number of pages
             *
             * @param {number} max
             * @returns {HTML.Pagination}
             */
            setMaxItem: function(max) {
                this._maxItem = _basis.emptyValue(max, maxItem);
                return this;
            },

            /**
             * Count pages
             *
             * @param {number|null} count
             * @returns {HTML.Pagination}
             */
            setCountPages: function(count) {
                this._countPages = _basis.emptyValue(count, null);
                return this;
            },

            /**
             * Set current page
             *
             * @param {number} current
             * @returns {HTML.Pagination}
             */
            setCurrentPage: function(current) {
                this._currentPage = _basis.emptyValue(current, currentPage);
                return this;
            },

            /**
             * Set size pagination
             *
             * @param {string} size {'lg'|'sm'|null}
             * @default {'sm'}
             * @returns {HTML.Pagination}
             */
            setSize: function(size) {
                this._size = _basis.emptyProperty(_basis.pagination.size, size, null);
                return this;
            },

            /**
             * Set type pagination
             *
             * @param {string|null} skin {'default'|'pager'|null}
             * @default {string} default
             * @returns {HTML.Pagination}
             */
            setSkin: function(skin) {
                this._skin = _basis.emptyProperty(_basis.pagination.skin, skin, _basis.pagination.skin.default);
                return this;
            },

            /**
             * Set item previous
             *
             * @param {string|null} name
             * @param {string|null} nameFirst
             * @returns {HTML.Pagination}
             */
            setNamePrevious: function(name, nameFirst) {
                this._namePrevious = _basis.emptyValue(name, previousName);
                this._nameFirst = _basis.emptyValue(nameFirst, previousName + previousName);
                return this;
            },

            /**
             * Set item next
             *
             * @param {string|null} name
             * @param {string|null} nameLast
             * @returns {HTML.Pagination}
             */
            setNameNext: function(name, nameLast) {
                this._nameNext = _basis.emptyValue(name, nextName);
                this._nameLast = _basis.emptyValue(nameLast, nextName + nextName);
                return this;
            },

            /**
             * Compiles and returns HTML pagination
             *
             * @public
             * @returns {string} Html pagination
             */
            toHtml: function() {
                return this._getPagination();
            },

            /**
             * Compiles and appends HTML pagination in elements "element"
             *
             * @public
             * @param {string} element {This pagination will be added in element "element"}
             * @returns {HTML.Table}
             */
            appendHtml: function(element) {
                $(element).append(this._getPagination());
                return this;
            }


        };
    } (window.HTML || {}));