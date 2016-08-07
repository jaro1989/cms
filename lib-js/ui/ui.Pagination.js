
(function(ui) {

    var uniqueId = new Date().getTime();
    var DATA_JSON_PAGINATION = 'data-json-pagination';

    /**
     * @memberOf ui
     * @namespace ui.Pagination
     * @param {string|null} id
     * @constructor
     */
    ui.Pagination = function(id) {

        /**
         * @type {string}
         * @private
         */
        this._id = ui.api.empty(id, 'pagination-' + uniqueId);
        uniqueId++;
    };

    /** @protected */
    ui.Pagination.prototype = {

        _linkParam: '?page=',
        _nameNext: '&raquo;',
        _namePrevious: '&laquo;',
        _nameNextTwo: '&raquo;&raquo;',
        _namePreviousTwo: '&laquo;&laquo;',
        _maxItem: 3,
        _currentPage: 1,
        _size: ui.CSS.pagination.size.sm,
        _skin: null,
        _type: ui.CSS.pagination.type.default,
        _position: ui.CSS.alignClass.block.right,
        _link: null,
        _callback: null,
        _countPages: null,
        _ajaxUrl: false,

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

            return this._getItem(1, this._namePreviousTwo, disabled, null, type);
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

            return this._getItem(this._countPages, this._nameNextTwo, disabled, null, type);
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
         * @param {number|string|null} page
         * @param {number|string} nameItem
         * @param {boolean|null} disabled {true|null}
         * @param {boolean|null} active {true|null}
         * @param {string|null} side {'l'|'r'|null}
         * @returns {string}
         * @private
         */
        _getItem: function(page, nameItem, disabled, active, side) {

            disabled = disabled ? ui.CSS.pagination.item.disabled : null;
            active = active ? ui.CSS.pagination.item.active : null;

            if (side === 'l') {

                side = ui.CSS.pagination.side.left

            } else if (side === 'r') {

                side = ui.CSS.pagination.side.rirht

            } else {

                side = null;
            }

            var href = null;
            var onclick = this._callback + '(' + page + '); new ui.Pagination("' + this._id + '")._rebuild(' + page + ');';

            if (this._ajaxUrl == false) {

                href = ui.api.empty(this._link, '') + ui.api.empty(this._linkParam, '') + page;
                onclick = null;
            }

            return new ui.Element('li')
                .addClassElement(active)
                .addClassElement(disabled)
                .addClassElement(side)
                .addChildAfter(
                    new ui.Element('a')
                        .setAttrElement('href', href)
                        .setAttrElement('onclick', onclick)
                        .setContentElement(nameItem)
                        .getElement()
                )
                .getElement();
        },

        /**
         * Html items pagination
         * @param {ui.Element} block
         * @returns {void}
         * @private
         */
        _getItems: function(block) {

            var start = 1;
            var minus = this._currentPage - this._maxItem - 1;

            if (minus > 0) {

                start = this._currentPage - this._maxItem;

                if ((minus - 5) > 0) {

                    minus = minus - 5;
                }

                block.addChildAfter(this._getItem(minus, '...', null, null, null));
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

                block.addChildAfter(this._getItem(i, i, null, active, null));
            }

            if ( (this._countPages - plus) > 0 ) {

                if ( (this._countPages - (plus + 5)) > 0 ) {

                    plus = plus + 5;
                }

                block.addChildAfter(this._getItem(plus, '...', null, null, null));
            }
        },

        _buildPagination: function() {

            var ul = new ui.Element('ul')
                .addClassElement(this._type)
                .setSkinElement('text', this._skin)
                .addClassElement(this._size)
                .addClassElement(this._position);

            if (this._countPages > ((this._maxItem + 1) * 2)) {

                ul.addChildAfter(this._getFirstItem(null));
            }

            ul.addChildAfter(this._getPrevItem('l'));

            this._getItems(ul);

            ul.addChildAfter(this._getNextItem('r'));

            if (this._countPages > ((this._maxItem + 1) * 2)) {

                ul.addChildAfter(this._getLastItem(null));
            }

            return ul.getElement();
        },

        /**
         * Html block pagination
         *
         * @returns {*|string}
         * @private
         */
        _buildBlock: function() {

            return new ui.Element('div', true)
                .addClassElement(ui.CSS.alignClass.block.clear)
                .setIdElement(this._id, null)
                .setAttrElement(DATA_JSON_PAGINATION, JSON.stringify(this))
                .addChildAfter(this._buildPagination())
                .getElement();
        },

        _rebuild: function(page) {

            var pag = document.body.querySelector('#' + this._id);
            var str = pag.getAttribute(DATA_JSON_PAGINATION);
            var obj = JSON.parse(str);

            for (var property in obj) {

                this[property] = obj[property];
            }

            this._currentPage = page;

            pag.parentNode.insertBefore(this._buildBlock(), pag);
            pag.remove();
        },

        /**
         * @returns {ui.Pagination}
         */
        setAjax: function() {
            this._ajaxUrl = true;
            return this;
        },

        /**
         * Set link pagination
         *
         * @param {string|null} link
         * @returns {ui.Pagination}
         */
        setLink: function(link) {
            this._link = link;
            return this;
        },

        /**
         * Set name param page
         *
         * @param {string|null} linkParam
         * @returns {ui.Pagination}
         */
        setLinkParam: function(linkParam){
            this._linkParam = linkParam;
            return this;
        },

        /**
         * Set position pagination
         *
         * @param {string|null} position {'left'|'right'|null}
         * @returns {ui.Pagination}
         */
        setPosition: function(position) {
            this._position = ui.api.existProperty(ui.CSS.alignClass.block, position, null);
            return this;
        },

        /**
         * the maximum number of pages
         *
         * @param {number} max
         * @returns {ui.Pagination}
         */
        setMaxItem: function(max) {
            this._maxItem = max;
            return this;
        },

        /**
         * Count pages
         *
         * @param {number|null} count
         * @returns {ui.Pagination}
         */
        setCountPages: function(count) {
            this._countPages = count;
            return this;
        },

        /**
         * Set current page
         *
         * @param {number} current
         * @returns {ui.Pagination}
         */
        setCurrentPage: function(current) {
            this._currentPage = ui.api.empty(current, this._currentPage);
            return this;
        },

        /**
         * Set size pagination
         *
         * @param {string} size {'lg'|'sm'|null}
         * @default {'sm'}
         * @returns {ui.Pagination}
         */
        setSize: function(size) {
            this._size = ui.api.existProperty(ui.CSS.pagination.size, size, null);
            return this;
        },

        /**
         * Set type pagination
         *
         * @param {string|null} skin {'disabled'|'active'|'success'|'warning'|'danger'|'info'|'link'|'default'|'error'|'primary'|'muted'}
         * @default {string} default
         * @returns {ui.Pagination}
         */
        setSkin: function(skin) {
            this._skin = skin;
            return this;
        },

        /**
         * Set type pagination
         *
         * @param {string|null} type {'default'|'pager'|null}
         * @default {string} default
         * @returns {ui.Pagination}
         */
        setType: function(type) {
            this._type = ui.api.existProperty(ui.CSS.pagination.type, null);
            return this;
        },

        /**
         * Set item previous
         *
         * @param {string|null} namePrevious
         * @param {string|null} namePreviousTwo
         * @returns {ui.Pagination}
         */
        setNameSwitches: function(namePrevious, namePreviousTwo) {

            this._namePrevious = ui.api.empty(namePrevious, this._namePrevious);

            this._namePreviousTwo = ui.api.empty(namePreviousTwo, this._namePreviousTwo);

            return this;
        },

        /**
         * Set item next
         *
         * @param {string|null} nameNext
         * @param {string|null} nameNextTwo
         * @returns {ui.Pagination}
         */
        setNameNext: function(nameNext, nameNextTwo) {

            this._nameNext = ui.api.empty(nameNext, this._nameNext);

            this._nameNextTwo = ui.api.empty(nameNextTwo, this._nameNextTwo);

            return this;
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {

            return this._buildBlock();
        },

        /**
         * @param {string} callback
         * @returns {ui.Pagination}
         */
        setCallbackFunction: function(callback) {

            this._callback = callback;
            return this;
        },

        /**
         * Get html current element
         * @returns {string}
         * @public
         */
        toHTML: function() {

            return this._buildBlock().outerHTML;
        },

        /**
         * Add element in document
         * @param {string|number|null} selector
         * @returns {ui.Pagination}
         * @public
         */
        appendHTML: function(selector) {

            new ui.$(selector).append(this.getElement());
            return this;
        },

        /**
         * Add element in document
         * @param {string|number|null} selector
         * @returns {ui.Pagination}
         * @public
         */
        beforeHTML: function(selector) {

            new ui.$(selector).before(this.getElement());
            return this;
        }
    }
} (window.ui || {}));