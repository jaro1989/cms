
    /**
     *
     * @namespace HTML
     */
    HTML = {};
    window.HTML = HTML;

    (function(HTML) {

        var CLASS_ICON = 'glyphicon';

        /**
         * @memberOf HTML
         * @namespace HTML.Basis
         * @constructor
         */
        HTML.Basis = function() {

        };

        /** @protected */
        HTML.Basis.prototype = {
            iconClass: CLASS_ICON,
            fluid: 'container-fluid',
            text_alignment: {
                right: 'text-right'
            },
            afterLabel: ':',

            navbar: {
                nav: 'nav',
                navbar: 'navbar',
                navbarnav: 'navbar-nav',
                fluid: 'container-fluid',
                iconbar: 'icon-bar',
                collapse: 'collapse',
                brand: 'navbar-brand',
                toogle: 'navbar-toggle',
                skin: {
                    inverse: 'navbar-inverse',
                    default: 'navbar-default'
                },
                position: {
                    statictop: 'navbar-static-top',
                    staticbottom: 'navbar-static-bottom',
                    fixedtop: 'navbar-fixed-top',
                    fixedbottom: 'navbar-fixed-bottom',
                    fixedleft: 'navbar-left',
                    fixedright: 'navbar-right'
                },
                block: {
                    collapse: 'navbar-collapse',
                    header: 'navbar-header'
                }

            },

            fields: {
                fg: 'form-group',
                ig: 'input-group',
                inp: 'form-control',
                iga: 'input-group-addon',
                size: {
                    lg: 'input-group-lg',
                    sm: 'input-group-sm'
                },
                prefix_skin_field: 'has',
                prefix_skin_text: 'text',
                skin: {
                    success: 'success',
                    warning: 'warning',
                    error: 'error',
                    muted: 'muted',
                    primary: 'primary',
                    info: 'info',
                    danger: 'danger'
                },
                icon: {
                    bf: 'has-feedback',
                    if: 'form-control-feedback'
                }
            },

            layout: 'col-md',


            layoutGroup: {
                1: 12,
                2: 6,
                3: 4,
                4: 3,
                5: 2,
                6: 1
            },

            position: {
                clear: 'clearfix',
                left: 'pull-left',
                right: 'pull-right',
                center: 'center-block'
            },

            pagination: {
                skin: {
                    default: 'pagination',
                    pager: 'pager'
                },
                item: {
                    disabled: 'disabled',
                    active: 'active'
                },
                size: {
                    lg: 'pagination-lg',
                    sm: 'pagination-sm'
                },
                side: {
                    left: 'previous',
                    rirht: 'next'
                }
            },

            table: {
                striped: 'table-striped',
                bordered: 'table-bordered',
                'bordered-none': 'table-bordered-none',
                hover: 'table-hover',
                condensed: 'table-condensed'

            },

            panelClasses: {
                open: 'in',
                class: 'panel',
                group: 'panel-group',
                heading: 'panel-heading',
                title: 'panel-title',
                collapse: 'collapse',
                panelCollapse: 'panel-collapse',
                body: 'panel-body'
            },

            /**
             * HTML Class skin panel
             *
             * @public
             * @type {object}
             */
            panel: {
                default: 'panel-default',
                primary: 'panel-primary',
                success: 'panel-success',
                warning: 'panel-warning',
                danger: 'panel-danger',
                info: 'panel-info'
            },

            /**
             * Html class type tabs panel
             *
             * @public
             * @type {object}
             */
            tabs: {
                nJustified: 'nav nav-tabs nav-justified',
                pJustified: 'nav nav-pills nav-justified',
                nStacked: 'nav nav-tabs nav-stacked',
                pStacked: 'nav nav-pills nav-stacked',
                nav: 'nav nav-tabs',
                pills: 'nav nav-pills'
            },

            /**
             * Html class disabled
             *
             * @public
             * @type {string}
             */
            disabled: 'disabled',

            /**
             * Href default
             *
             * @public
             * @type {string}
             */
            hrefDefault: '#',

            /**
             * Html classes drop-down
             *
             * @public
             * @type {object}
             */
            dropDown: {
                caret: 'caret',
                dataToggle: 'dropdown',
                classToggle: 'dropdown-toggle',
                classDropdown: 'dropdown',
                menu: 'dropdown-menu',
                menuPosition: 'dropup',
                itemType: {
                    separator: 'divider',
                    header: 'dropdown-header',
                    disable: 'disabled',
                    active: 'active'
                }
            },

            /**
             * Html classes skins
             *
             * @public
             * @type {object}
             */
            skin: {
                disabled: 'disabled',
                active: 'active',
                success: 'success',
                warning: 'warning',
                danger: 'danger',
                info: 'info',
                link: 'link',
                default: 'default',
                error: 'error',
                primary: 'primary'
            },

            /**
             * Html classes size buttons
             *
             * @public
             * @type {object}
             */
            btnSize: {
                lg: 'btn-lg',
                sm: 'btn-sm',
                xs: 'btn-xs'
            },

            /**
             * Html classes padding
             *
             * @public
             * @type {object}
             */
            padding: {
                lg: 'well-lg',
                sm: 'well-sm',
                xs: 'well-xs'
            },

            /**
             * Html classes group buttons
             *
             * @public
             * @type {object}
             */
            group: {
                justified: 'btn-group btn-group-justified',
                vertical: 'btn-group-vertical',
                toolbar: 'btn-toolbar',
                default: 'btn-group'
            },

            /**
             * Get error text response ajax
             *
             * @param {object} jqXHR response AJAX
             * @returns {string}
             */
            getTextErrorAjax: function(jqXHR) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                return msg;
            },

            /**
             * Set parameter padding
             *
             * @param {string|null} padding {'lg'|'sm'|'xs'|null}
             * @param {string|null|boolean} def {default value}
             * @returns {*}
             */
            getPadding: function(padding, def) {
                return this.emptyProperty(this.padding, padding, def);
            },

            /**
             * Determine whether a property is empty
             *
             * @public
             * @param {object} obj
             * @param {string|number|null|undefined} property
             * @param {object|string|number|boolean|null} defaultValue
             * @returns {*}
             */
            emptyProperty: function(obj, property, defaultValue) {
                var res = defaultValue;
                if (obj !== null) {
                    if (obj.hasOwnProperty(property) && this.emptyValue(obj[property], null) !== null) {
                        res = obj[property];
                    }
                }
                return res;
            },

            /**
             * Determine whether a variable is empty
             *
             * @public
             * @param {*} value
             * @param {*} defaultValue
             * @returns {*} return value or defaultValue
             */
            emptyValue: function(value, defaultValue) {
                var res = defaultValue;
                if (value !== null && value !== '' && value !== undefined) {
                    res = value;
                }
                return res;
            },

            /**
             * Generate html tag
             *
             * @public
             * @param {string} tagName
             * @param {object|undefined} attributes
             * @param {string|number|null|undefined} content
             * @param {boolean} closed
             * @returns {string}
             */
            getTag: function(tagName, attributes, content, closed) {
                var element = '';
                if (typeof tagName === 'string') {
                    element = '<' + tagName + this.getAttr(attributes) + '>';
                    closed = this.emptyValue(closed, true);
                    if (closed === true) {
                        element += this.emptyValue(content, '') + '</' + tagName + '>';
                    }
                }
                return element;
            },

            /**
             * Generate html attributes
             *
             * @public
             * @param {object|undefined} attributes
             * @returns {string}
             */
            getAttr: function(attributes) {
                var str = '';
                var obj = this;
                $.each(attributes, function(name, value) {
                    if (obj.emptyValue(value, null) !== null && typeof value !== 'boolean') {
                        if (typeof value === 'string') {
                            str += name + '="' + value.replace(/\s{2,}/g, ' ').trim() + '" ';
                        } else {
                            str += name + '="' + value + '" ';
                        }
                    }
                });
                if (str !== '') {
                    str = ' ' + str.trim();
                }
                return str;
            },

            /**
             * Generate html ID
             *
             * @public
             * @param {string|null} htmlId
             * @param {string|null} htmlName
             * @returns {string|null}
             */
            getId: function(htmlId, htmlName) {
                var _id = null;
                if (typeof htmlId === 'string') {
                    _id = htmlId;
                } else if (htmlId === null) {
                    if (typeof htmlName === 'string') {
                        _id = htmlName.replace('[', '-').replace(']', '');
                    } else {
                        _id = null;
                    }
                }
                return _id;
            },

            /**
             * Generate html icon
             *
             * @public
             * @param {string|null} iconName
             * @param {string|null} htmlClass
             * @returns {string}
             */
            getIcon: function(iconName, htmlClass) {
                var icon = '';
                iconName = this.emptyValue(iconName, null);
                if (iconName !== null) {
                    icon = this.getTag(
                        'span',
                        {
                            class: CLASS_ICON + ' ' + CLASS_ICON + '-' + iconName + ' ' +
                                   this.emptyValue(htmlClass, '')
                        },
                        ''
                    );
                }
                return icon;
            },

            /**
             * Get html class style
             *
             * @param {string|null} skin
             * @returns {*}
             */
            getSkin: function(skin) {
                var style = this.emptyProperty(this.fields.skin, skin, false);
                var res = '';
                if (style !== false) {
                    res = this.fields.prefix_skin_text + '-' + style + ' ' + this.fields.prefix_skin_field + '-' + style;
                }
                return res;
            },

            /**
             * Get disabled element
             *
             * @public
             * @param {boolean} disabled
             * @param {string|boolean} defaultValue
             * @returns {*}
             */
            getDisabled: function(disabled, defaultValue) {
                var sost = defaultValue;
                if (disabled === true) {
                    sost = this.disabled
                }
                return sost;
            }
        };

    } (window.HTML || {}));

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

    (function(HTML) {

        var BTN_BUTTON = 'button';
        var BTN_SUBMIT = 'submit';
        var BTN_LINK = 'link';
        var BTN_DROPDOWN = 'dropDown';
        var CLASS_DEFAULT = 'btn';

        var _basis = new HTML.Basis();

        /**
         * Get name and icon button
         *
         * @private
         * @param {object} obj {icon: 'iconname', attr: {value: 'btnname'}}
         * @returns {string}
         */
        var getNameIcon = function(obj) {
            return  (
                    _basis.getIcon(obj.icon) + ' ' +
                    _basis.emptyValue(obj.attr.value, '') + ' ' +
                    getCaretDropDown(obj)
                )
                .replace(/\s+/g," ")
                .trim();
        };

        /**
         * Get caret dropdown
         *
         * @private
         * @param obj
         * @returns {string}
         */
        var getCaretDropDown = function(obj) {
            var html = '';
            var caret = _basis.emptyProperty(obj, 'caret', false);
            if (caret !== false) {
                html = _basis.getTag('span', {class: _basis.dropDown.caret}, '');
            }
            return html;
        };

        /**
         * Get html button
         *
         * @private
         * @param {object} obj { icon: 'iconname', attr: {value: 'btnname', ib: 'btnid', class: 'btnclass', ...} }
         * @returns {*|string}
         */
        var getButton = function(obj) {
            return _basis.getTag('button', obj.attr, getNameIcon(obj));
        };

        /**
         * Get html button Link
         *
         * @private
         * @param {object} obj { icon: 'iconname', attr: {value: 'btnname', ib: 'btnid', class: 'btnclass', ...} }
         * @returns {*|string}
         */
        var getLink = function(obj) {
            return _basis.getTag('a', obj.attr, getNameIcon(obj));
        };

        /**
         * Get html item dropdown
         *
         * @private
         * @param {object} data
         * @returns {string}
         */
        var getItemData = function(data) {
            var item = '';
                $.each(data, function(key, param) {
                    var link = '';
                    var li_param = {};
                    var value = _basis.emptyProperty(param, 'item', null);
                    var icon = _basis.emptyProperty(param, 'icon', null);
                    var header = _basis.emptyProperty(param, 'header', null);

                    var desable = _basis.emptyProperty(param, 'disable', false);
                    var separator = _basis.emptyProperty(param, 'separator', false);
                    var active = _basis.emptyProperty(param, 'active', false);

                    if (value !== null) {
                        var href = _basis.emptyProperty(param, 'link', _basis.hrefDefault);
                        if (desable === true) {
                            href = _basis.hrefDefault;
                        }
                        link = _basis.getTag('a', { href: href }, (_basis.getIcon(icon) + ' ' + value).trim());
                    }

                    if (header !== null) {
                        li_param['class'] = _basis.dropDown.itemType.header;
                        link = _basis.getIcon(icon) + header;
                    }

                    if (separator === true) {
                        li_param['class'] = _basis.dropDown.itemType.separator;
                    }

                    if (desable === true) {
                        li_param['class'] = _basis.dropDown.itemType.disable;
                    }

                    if (active === true) {
                        li_param['class'] = _basis.dropDown.itemType.active;
                    }

                    item += _basis.getTag('li', li_param, link);
                });
            return item;
        };

        /**
         * Get html dropdown
         *
         * @private
         * @param {object} obj
         * @param {object} items
         * @returns {string}
         */
        var getDropDown = function(obj, items) {
            var html = '';
            html += getButton(obj);
            html += _basis.getTag('ul', {class: _basis.dropDown.menu}, getItemData(items));
            return html;
        };

        /**
         * Compile html buttons
         *
         * @private
         * @param {object} obj { button|submit|link|...: {icon: 'iconname', attr: {value: 'btnname', ib: 'btnid', class: 'btnclass', ...} } }
         * @param {object} items
         * @returns {string}
         */
        var compileButton = function(obj, items) {
            var html = '';
            $.each(obj, function(type, params) {
                var btn = '';
                if (type ===  BTN_LINK) {
                    btn += getLink(params);
                } else if (type ===  BTN_DROPDOWN) {
                    btn += getDropDown(params, items);
                } else {
                    btn += getButton(params);
                }
                html += _basis.getTag('div', { class: _basis.group.default }, btn);
            });

            return html;
        };

        /**
         * Compile html block buttons
         *
         * @private
         * @param {object} obj {current object}
         * @returns {*|string}
         */
        var compileBlock = function(obj) {
            var html = '';
            $.each(obj._paramsButtons, function(key, button) {
                html += compileButton(button, _basis.emptyProperty(obj._itemData, key, {}), obj);
            });
            return _basis.getTag(
                'div',
                {
                    id: obj._parentBlockId,
                    class: _basis.emptyValue(obj._typeGroup, '') + ' ' +
                           _basis.emptyValue(obj._margin, '') + ' ' +
                           _basis.emptyValue(obj._positionBlock, '')
                },
                html
            );
        };

        /**
         *
         * @param {string|null|undefined} group {'justified'|'vertical'|'toolbar'|'default'|null}
         * @param {string|null|undefined} idBlock
         * @memberOf HTML
         * @namespace HTML.Button
         * @constructor
         */
        HTML.Button = function(group, idBlock) {
            this._parentBlockId = _basis.emptyValue(idBlock, null);
            this._typeGroup = _basis.emptyProperty(_basis.group, group, _basis.group.default);
            this._paramsButtons = {};
            this._itemData = {};
        };

        /** @protected */
        HTML.Button.prototype = {

            /**
             * Position block buttons
             *
             * @type {string|null}
             */
            _positionBlock: null,

            /**
             * html ID block buttons
             *
             * @private
             * @type {string|null}
             */
            _parentBlockId: null,

            /**
             * Parameters for generation button
             *
             * @private
             * @type {object}
             */
            _paramsButtons: {},

            /**
             * Items dropdown
             *
             * @private
             * @type {object}
             */
            _itemData: {},

            /**
             * Type grouping
             *
             * @private
             * @type {string|null}
             */
            _typeGroup: null,

            /**
             * html Class buttons
             *
             * @private
             * @type {string|null}
             */
            _class: null,

            /**
             * html Class skin-buttons
             *
             * @private
             * @type {string}
             * @default {HTML.Basis.skin.primary}
             */
            _skin: _basis.skin.primary,

            /**
             * disable buttons
             *
             * @type {boolean|null}
             * @private
             */
            _disabled: null,

            /**
             * html Class size-buttons HTML.Basis.btnSize.lg|sm|xs
             *
             * @private
             * @type {string|null}
             */
            _size: null,

            /**
             * html Class active buttons HTML.Basis.skin.active
             *
             * @private
             * @type {string|null}
             */
            _active: null,

            /**
             *
             * @private
             * @type {string|null}
             */
            _onClick: null,

            /**
             * html margin block buttons
             *
             * @private
             * @type {string|null}
             */
            _margin: null,

            /**
             * Set position block buttons
             *
             * @param {string} position 'left'|'right'|'center'
             * @returns {HTML.Button}
             */
            setPositionBlock:function(position) {
                this._positionBlock =  _basis.emptyProperty(_basis.position, position, null);
                return this;
            },

            /**
             * Set margin block html
             *
             * @public
             * @param {string|null} margin {'lg'|'sm'|'xs'|null}
             * @default {string} xs
             */
            setMargin: function(margin) {
                this._margin = _basis.emptyProperty(_basis.padding, margin, _basis.padding.sm);
                return this;
            },

            /**
             * Set active button (added style button active)
             *
             * @public
             * @param {boolean} active
             * @returns {HTML.Button}
             */
            setActive: function(active) {
                if (active === true) {
                    this._active = _basis.skin.active;
                } else if (active === false) {
                    this._active = null;
                }
                return this;
            },

            /**
             * Set zise for buttons|button
             *
             * @public
             * @param {string|null} size {'lg'|'sm'|'xs'|null}
             * @returns {HTML.Button}
             */
            setSize: function(size) {
                this._size = _basis.emptyProperty(_basis.btnSize, size, null);
                return this;
            },

            /**
             * Set onClick function
             *
             * @public
             * @param {string|null} onClick
             * @returns {HTML.Button}
             */
            setOnClick: function(onClick) {
                this._onClick = _basis.emptyValue(onClick, null);
                return this;
            },

            /**
             * Disabled for buttons|button
             *
             * @public
             * @param {boolean} disabled
             * @returns {HTML.Button}
             */
            setDisabled: function(disabled) {
                if (disabled === true) {
                    this._disabled = true;
                } else if (disabled === false){
                    this._disabled = false;
                }
                return this;
            },

            /**
             * Set skin for buttons|button
             *
             * @public
             * @param {string|null} skin {'success'|'warning'|'danger'|'info'|'link'|'default'|'primary'}
             * @returns {HTML.Button}
             */
            setSkin: function(skin) {
                this._skin = _basis.emptyProperty(_basis.skin, skin, _basis.skin.primary);
                return this;
            },

            /**
             * Set html class for buttons|button
             *
             * @public
             * @param htmlClass
             * @returns {HTML.Button}
             */
            setClass: function(htmlClass) {
                this._class = _basis.emptyValue(htmlClass, null);
                return this;
            },

            /**
             * Get disabled attr or html class
             *
             * @private
             * @param {boolean} disabled
             * @param {string|null} defaulValue
             * @returns {*}
             */
            _getDisabled: function(disabled, defaulValue) {
                return  _basis.getDisabled(
                    disabled,
                    _basis.getDisabled(
                        _basis.emptyValue(this._disabled, null),
                        defaulValue
                    )
                );
            },

            /**
             * Get all html classes for buttons
             *
             * @private
             * @returns {string}
             */
            _getClass: function(disabled) {

                var skin = _basis.emptyProperty(_basis.skin, this._skin, _basis.skin.default);
                var htmlClass = CLASS_DEFAULT + '-' + skin;

                htmlClass += ' ' + _basis.emptyValue(this._size, '');
                htmlClass += ' ' + _basis.emptyValue(this._class, '');
                htmlClass += ' ' + _basis.emptyValue(this._active, '');
                htmlClass += ' ' + this._getDisabled(disabled, '');
                htmlClass += ' ' + _basis.emptyValue(CLASS_DEFAULT, '');

                var size = _basis.emptyProperty(_basis.btnSize, this._size, false);
                if (size !== false) {
                    htmlClass += ' ' + skin;
                }

                return htmlClass.replace(/\s+/g," ").trim();
            },

            /**
             * Build button type="button"
             *
             * @public
             * @param {string|null} value {Name button}
             * @param {string|null|undefined} name {Html name button}
             * @param {string|null|undefined} id {Html id button}
             * @param {string|null|undefined} icon
             * @param {boolean|undefined} disabled
             * @returns {HTML.Button}
             */
            addButton: function(value, name, id, icon, disabled) {

                var counter = Object.keys(this._paramsButtons).length++;

                this._paramsButtons[counter] = {};
                this._paramsButtons[counter][BTN_BUTTON] = {
                    attr: {
                        type: BTN_BUTTON,
                        class: this._getClass(_basis.emptyValue(disabled, false)),
                        id: _basis.getId(id, name),
                        name: _basis.emptyValue(name, null),
                        value: _basis.emptyValue(value, null),
                        onclick: this._onClick,
                        disabled: this._getDisabled(disabled, null)
                    },
                    icon: _basis.emptyValue(icon, null)
                };

                return this;
            },

            /**
             * Build button type="submit"
             *
             * @public
             * @param {string|null} value {Name button}
             * @param {string|null|undefined} name {Html name button}
             * @param {string|null|undefined} id {Html id button}
             * @param {string|null|undefined} icon
             * @param {undefined|boolean} disabled {undefined}
             * @returns {HTML.Button}
             */
            addSubmit: function(value, name, id, icon, disabled) {

                var counter = Object.keys(this._paramsButtons).length++;

                this._paramsButtons[counter] = {};
                this._paramsButtons[counter][BTN_SUBMIT] = {
                    attr: {
                        type: BTN_SUBMIT,
                        class: this._getClass(_basis.emptyValue(disabled, false)),
                        id: _basis.getId(id, name),
                        name: _basis.emptyValue(name, null),
                        value: _basis.emptyValue(value, null),
                        onclick: this._onClick,
                        disabled: this._getDisabled(disabled, null)
                    },
                    icon: _basis.emptyValue(icon, null)
                };

                return this;
            },

            /**
             * Build button a href="#"
             *
             * @public
             * @param {string|null} value
             * @param {string|null} href
             * @param {string|null|undefined} id
             * @param {string|null|undefined} icon
             * @param {boolean|undefined} disabled
             * @returns {HTML.Button}
             */
            addLink: function(value, href, id, icon, disabled) {

                var counter = Object.keys(this._paramsButtons).length++;

                this._paramsButtons[counter] = {};
                this._paramsButtons[counter][BTN_LINK] = {
                    attr: {
                        href: _basis.emptyValue(href, _basis.hrefDefault),
                        class: this._getClass(_basis.emptyValue(disabled, false)),
                        id: _basis.getId(id, name),
                        value: _basis.emptyValue(value, null),
                        onclick: this._onClick,
                        disabled: this._getDisabled(disabled, null)
                    },
                    icon: _basis.emptyValue(icon, null)
                };

                return this;
            },


            /**
             * Build button dropdown
             * added item methods HTML.Button.addItem('typeItem', 'itemName') or HTML.Button.addItems( { 0: {nameItem: '', typeItem: ''}, 1: {...} })
             *
             * @public
             * @param {string|null} value {Name button}
             * @param {string|null|undefined} name {Html name button}
             * @param {string|null|undefined} id {Html id button}
             * @param {string|null|undefined} icon
             * @param {undefined|boolean} disabled {undefined}
             * @returns {HTML.Button}
             */
            addDropDown: function(value, name, id, icon, disabled) {
                disabled = _basis.emptyValue(disabled, false);

                var counter = Object.keys(this._paramsButtons).length++;

                this._paramsButtons[counter] = {};
                this._paramsButtons[counter][BTN_DROPDOWN] = {
                    attr: {
                        type: BTN_SUBMIT,
                        name: _basis.emptyValue(name, null),

                        class: (
                            this._getClass(disabled) + ' ' +
                            _basis.dropDown.classToggle
                        ).trim(),

                        id: _basis.getId(id, name),
                        value: _basis.emptyValue(value, null),
                        disabled: this._getDisabled(disabled, null),
                        onclick: this._onClick,
                        'data-toggle': _basis.dropDown.dataToggle
                    },
                    caret: _basis.dropDown.caret,
                    icon: _basis.emptyValue(icon, null)
                };

                return this;
            },

            /**
             * Build itam button dropdown
             *
             * @public
             * @param {string} item
             * @param {string|null} link
             * @param {string|null} icon
             * @param {boolean} active
             * @param {boolean} disable
             * @returns {HTML.Button}
             */
            addItem: function(item, link, icon, active, disable) {

                var counterBtn = Object.keys(this._paramsButtons).length;

                var items = {
                    link: _basis.emptyValue(link, null),
                    item: _basis.emptyValue(item, null),
                    icon: _basis.emptyValue(icon, null)
                };

                if (active === true) {
                    items['active'] = true;
                } else if (active === false) {
                    items['active'] = false;
                }

                if (disable === true) {
                    items['disable'] = true;
                } else if (disable === false) {
                    items['disable'] = false;
                }

                if (this._itemData[counterBtn] === undefined) {
                    this._itemData[counterBtn] = [];
                }

                this._itemData[counterBtn].push(items);

                return this;
            },

            /**
             * Build itam separator button dropdown
             *
             * @public
             * @returns {HTML.Button}
             */
            addItemSeparator: function() {
                var counterBtn = Object.keys(this._paramsButtons).length;

                if (this._itemData[counterBtn] === undefined) {
                    this._itemData[counterBtn] = [];
                }

                this._itemData[counterBtn].push({separator: true});

                return this;
            },

            /**
             * Build itam header button dropdown
             *
             * @public
             * @param {string|null} header
             * @param {string|null|undefined} icon
             * @returns {HTML.Button}
             */
            addItemHeader: function (header, icon) {

                var counterBtn = Object.keys(this._paramsButtons).length;

                if (this._itemData[counterBtn] === undefined) {
                    this._itemData[counterBtn] = [];
                }

                this._itemData[counterBtn].push(
                    {
                        header: _basis.emptyValue(header, null),
                        icon: _basis.emptyValue(icon, null)
                    }
                );

                return this;
            },

            /**
             * Build itams button dropdown of object
             *
             * @public
             * @param {object} obj { 0: {link: '#', item: 'itemName', icon: 'iconName', active: true, disable: false} }
             * @returns {HTML.Button}
             */
            addItems: function(obj) {

                var counterBtn = Object.keys(this._paramsButtons).length;

                if (this._itemData[counterBtn] === undefined) {
                    this._itemData[counterBtn] = [];
                }

                var currentObj = this;

                $.each(obj, function(key, params) {
                    var items = {
                        link: _basis.emptyProperty(params, 'link', _basis.hrefDefault),
                        item: _basis.emptyProperty(params, 'item', null),
                        icon: _basis.emptyProperty(params, 'icon', null),
                        active: _basis.emptyProperty(params, 'active', false),
                        disable: _basis.emptyProperty(params, 'disable', false)
                    };

                    currentObj._itemData[counterBtn].push(items);
                });
                return this;
            },

            /**
             * Compiles and returns HTML block with battons
             *
             * @public
             * @returns {string} Html buttons
             */
            toHtml: function() {
                return compileBlock(this);
            },

            /**
             * Compiles and appends HTML block with battons in elements "element"
             *
             * @public
             * @param {string} element This buttons will be added in element "element"
             * @returns {HTML.Button}
             */
            appendHtml: function(element) {
                $(element).append(compileBlock(this));
                return this;
            }
        };

    } (window.HTML || {}));


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

    (function(HTML) {

        var TABLE = 'table';

        var RESPONSIVE_TABLE = 'table-responsive';

        var CELL_BTN = 'cell-btn';

        var CELL_NUM = 'cell-num';

        var ROW_LINK = 'row-link';

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
         * @param {object} buttonElement
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
         * @param {string|null|undefined} idTable { html id table }
         * @param {boolean|undefined} cellNum { show column number }
         * @param {boolean|undefined} cellBtn { show column button }
         * @memberOf HTML
         * @constructor
         */
        HTML.Table = function(idTable, cellNum, cellBtn) {
            unique++;
            this._unique = unique;
            this._id = _basis.emptyValue(idTable, TABLE + '-' + this._unique);
            this._head = {};
            this._body = {};
            this._foot = {};
            this._counterHeadRow = 1;
            this._counterBodyRow = 1;

            this._cellNum = false;
            if (cellNum === true) {
                this._cellNum = true;
            }

            this._cellBtn = false;
            if (cellBtn === true) {
                this._cellBtn = true;
            }
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
            _skinTable: _basis.table.bordered,

            /**
             * Html class skin panel table
             *
             * @private
             * @type {string|null}
             */
            _skinPanel: null,

            /**
             * Html class table
             *
             * @private
             * @type {string|null}
             */
            _class: null,

            /**
             * Title table
             *
             * @private
             * @type {string|null}
             */
            _titleTable: null,

            /**
             * Content before table
             *
             * @private
             * @type {string|null}
             */
            _contentBefore: null,

            /**
             * Content after table
             *
             * @private
             * @type {string|null}
             */
            _contentAfter: null,

            /**
             * Padding panel
             *
             * @private
             * @type {string|null}
             */
            _padding: 'xs',

            /**
             * Margin panel
             *
             * @private
             * @type {string|null}
             */
            _margin: null,

            /**
             * Parameters for generation head table
             *
             * @private
             * @type {object}
             */
            _head: {},

            /**
             * Parameters for generation body table
             *
             * @private
             * @type {object}
             */
            _body: {},

            /**
             * Parameters for generation foot table
             *
             * @private
             * @type {object}
             */
            _foot: {},

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
             * @param {object} element {this button}
             * @param {string} idTable Html ID table
             * @param {object} table
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
             * @param {object} element {this button}
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
             * @param {object} element {this button}
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
             * @param {object} attr
             * @param {*} content
             * @returns {string} Html cell table
             */
            _getFirstOrLastCell: function(countRow, attr, content) {
                var cell = '';
                if (this._counterHeadRow === 1 && this._cellName === 'th') {
                    attr['rowspan'] = countRow;
                    cell = _basis.getTag(this._cellName, attr, content);
                } else if (this._cellName === 'td') {
                    cell = _basis.getTag(this._cellName, attr, content);
                }
                return cell;
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

                    cellHtml = _basis.getTag(
                        this._cellName,
                        _basis.emptyProperty(params, 'attr', {}),
                        _basis.emptyProperty(params, 'data', '')
                    );
                } else {

                    cellHtml = _basis.getTag(this._cellName, {}, params);
                }
                return cellHtml;
            },

            /**
             * The method generating row table
             *
             * @private
             * @param {object} params {parameters for generation cell}
             * @returns {string} Html row table
             */
            _getRow: function(params) {

                var cellHtml = '';
                cellHtml += this._getCellNum();

                var currentObj = this;
                $.each(params, function(key, param) {
                    cellHtml += currentObj._getCell(param);
                });

                cellHtml += this._getCellBtn();

                var attr = {};
                var link = _basis.emptyValue(this._linkRow, false);
                if (link !== false && this._cellName === 'td') {
                    attr['onclick'] = "window.location.href='" + link + this._counterBodyRow + "';";
                    attr['class'] = ROW_LINK;
                }

                if (this._cellName === 'th') {
                    this._counterHeadRow++;
                } else {
                    this._counterBodyRow++;
                }

                return _basis.getTag('tr', attr, cellHtml);
            },

            /**
             * The method generating block table with rows
             *
             * @private
             * @param {string} nameBlock { 'thead' | 'tbody' | 'tfoot' }
             * @param {object} params {parameters for generation rows and cell}
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

                    var attr = {};
                    return _basis.getTag(nameBlock, attr, row);
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

                var attr = {
                    class: TABLE + ' ' + _basis.emptyValue(this._skinTable, '') + ' ' + _basis.emptyValue(this._class, ''),
                    id: this._id,
                    style: this._style
                };

                var table = _basis.getTag('div', {class: RESPONSIVE_TABLE}, _basis.getTag('table', attr, content));

                var footer = {};
                if (this._contentAfter !== null) {
                    footer['data'] = this._contentAfter;
                }
                if (this._pagination !== null) {
                    footer['pagination'] = this._pagination;
                }
                if (Object.keys(footer).length == 0) {
                    footer = null;
                }

                return new HTML.Panel()
                    .setMargin(this._margin)
                    .setPadding(this._padding)
                    .setSkinPanel(this._skinPanel)
                    .setHeadPanel(this._titleTable)
                    .setBodyPanel(this._contentBefore)
                    .setTablePanel(table)
                    .setFootPanel(footer)
                    .toHtml();
            },

            /**
             * Set link row
             *
             * @param {string|null} link
             * @returns {HTML.Table}
             */
            setLinkRow: function(link) {
                this._linkRow = _basis.emptyValue(link, null);
                return this;
            },

            /**
             * Set pagination table
             *
             * @param {number} currentPage
             * @param {number} countPage
             * @param {string|null} link
             * @param {string|null} linkParam
             * @param {string|null} position {'left'|'right'}
             * @param {boolean} show {'show'-true|'hide'-false}
             * @returns {HTML.Table}
             */
            setPagination: function(currentPage, countPage, link, linkParam, position, show) {
                show = _basis.emptyValue(show, true);
                if (show === true) {
                    this._pagination = new HTML.Pagination()
                        .setCurrentPage(currentPage)
                        .setCountPages(countPage)
                        .setPosition(_basis.emptyValue(position, 'right'))
                        .setLinkParam(linkParam)
                        .setLink(link)
                        .toHtml();
                } else if (show === false) {
                    this._pagination = null;
                }
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
             * @param {object} data
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
             * Set margin panel
             *
             * @public
             * @param {string|null|undefined} margin {'lg'|'sm'|'xs'|null}
             * @default {string} sm
             * @returns {HTML.Table}
             */
            setMargin: function(margin) {
                var check = _basis.emptyProperty(_basis.padding, margin, false);
                if (check !== false) {
                    this._margin = margin;
                }
                return this;
            },

            /**
             * Set padding panel
             *
             * @public
             * @param {string|null|undefined} padding {'lg'|'sm'|'xs'|null}
             * @default {string} sm
             * @returns {HTML.Table}
             */
            setPadding: function(padding) {
                var check = _basis.emptyProperty(_basis.padding, padding, false);
                if (check !== false) {
                    this._padding = padding;
                }
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
                this._skinTable = _basis.emptyProperty(_basis.table, skin, _basis.table.bordered);
                return this;
            },

            /**
             * Set skin panel
             *
             * @public
             * @param {string|null|undefined} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'|null}
             * @default {string} default
             * @returns {HTML.Table}
             */
            setSkinPanel: function(skin) {
                var check = _basis.emptyProperty(_basis.panel, skin, _basis.panel.default);
                if (check !== false) {
                    this._skinPanel = skin;
                }
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
             * Set title table
             *
             * @public
             * @param {string|null} title
             * @returns {HTML.Table}
             */
            setTitleTable: function(title) {
                this._titleTable = _basis.emptyValue(title, null);
                return this;
            },

            /**
             * Set content before table
             *
             * @public
             * @param {*} content
             * @returns {HTML.Table}
             */
            setContentBeforeTable: function(content) {
                this._contentBefore = _basis.emptyValue(content, null);
                return this;
            },

            /**
             * Set content after table
             *
             * @public
             * @param {*} content
             * @returns {HTML.Table}
             */
            setContentAfterTable: function(content) {
                this._contentAfter = _basis.emptyValue(content, null);
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
                    var counter = Object.keys(obj).length;
                    obj[counter] = {};
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
                                width: _basis.emptyValue(width, null)
                            }
                        };
                    }
                }
                return this;
            },

            /**
             * Add data for generation rowq body
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


    (function(HTML) {

        var ICON_CURRENT = 'saved';
        var ICON_DATE = 'calendar';
        var ICON_REMOVE = 'remove';
        var CLASS_DATE = 'calendar-date';

        var TYPE_DATE = 'date';

        var VALUE_CHECKBOX_TRUE = 1;

        var VALUE_CHECKBOX_FALSE = 0;

        var KEY_CHECKBOX = 'checkbox';

        var TYPE_TEXT = 'text';

        var TYPE_HIDDEN = 'hidden';

        var TYPE_PASSWORD = 'password';

        var KEY_MARKER = 'marker';

        var KEY_INPUT = 'input';

        var KEY_HIDDEN = 'hidden';

        var KEY_READ = 'read';

        var KEY_SELECT_LIST = 'select-list';

        var BLOCK_HIDDEN_FIELDS = 'block-hidden-fields';

        var PLACEHOLDER_DEF = '...';

        var PREFIX = 'text';

        var AFTER_LABEL = ': ';

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

        /**
         * @memberOf HTML
         * @namespace HTML.Fields
         * @param {number} group {1|2|3|4|5|6}
         * @param {string|null} htmlClass
         * @param {string|null} size {'lg'|'sm'|null}
         * @constructor
         */
        HTML.Fields = function(group, htmlClass, size) {
            this._group = _basis.emptyProperty(_basis.layoutGroup, group, _basis.layoutGroup[1]);
            this._class = _basis.emptyValue(htmlClass, null);
            this._size = _basis.emptyProperty(_basis.fields.size, size, _basis.fields.size.sm);
            this._parametersFieldForBuild = {};
        };

        /** @protected */
        HTML.Fields.prototype = {

            /**
             * value Checkbox if checked
             *
             * @private
             * @type {string|number}
             */
            _valueTrue: VALUE_CHECKBOX_TRUE,

            /**
             * value Checkbox if not checked
             *
             * @private
             * @type {string|number}
             */
            _valueFalse: VALUE_CHECKBOX_FALSE,

            /**
             * Alignment label
             *
             * @private
             * @type {string}
             */
            _labelAlignment: _basis.text_alignment.right,

            /**
             * Skin fields
             *
             * @private
             * @type {string}
             */
            _skin: null,

            /**
             * Line label/field
             *
             * @private
             * @type {number}
             */
            _line: 0,

            /**
             * after label
             *
             * @private
             * @type {string}
             */
            _afterLabel: '',

            /**
             * Parameters for builder fields
             *
             * @private
             * @type {object}
             */
            _parametersFieldForBuild: {},

            /**
             * Html ID field
             *
             * @private
             * @type {string|null}
             */
            _id: null,

            /**
             * Size fields current object
             *
             * @private
             * @type {string|null}
             */
            _size: null,

            /**
             * Placeholder fields
             *
             * @type {string|number|null}
             */
            _placeholder: null,

            /**
             * Html class fields current object
             *
             * @private
             * @type {string|null}
             */
            _class: null,

            /**
             * Group count fields
             *
             * @privat
             * @type {number}
             */
            _group: _basis.layoutGroup[1],

            /**
             * Margin field
             *
             * @privat
             * @type {string|null}
             */
            _margin: null,

            /**
             * Html block hidden fialds
             *
             * @privat
             * @type {string}
             */
            _blockHiddenFields: '',

            /**
             * Build html checkbox
             *
             * @param {object} params
             * @returns {*|string}
             * @private
             */
            _getCheckbox: function(params) {
                params.attr.class = null;
                params.attr.value = this._valueFalse;
                if (params.attr.checked === 'checked') {
                    params.attr.value = this._valueTrue;
                }
                params.attr.onclick = "new HTML.Fields()._clickCheckbox(this, '" + this._valueTrue + "', '" + this._valueFalse + "');";
                return this._getInput(params);
            },

            /**
             *
             * @param {object} e Click element "Checkbox"
             * @param {string|number} t set value if checked
             * @param {string|number} f set value if not checked
             * @private
             */
            _clickCheckbox: function(e, t, f) {
                if ($(e).prop( "checked" ) === true) {
                    $(e).val(t);
                } else {
                    $(e).val(f);
                }
            },

            /**
             * Html input read
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getRead: function(params) {
                var skin = _basis.emptyValue(params.skin, '');
                if (skin !== '') {
                    skin = PREFIX + '-' + skin;
                }

                return _basis.getTag(
                    'p',
                    {
                        class: params.attr.id + ' ' +
                               skin, id: params.attr.id
                    },
                    _basis.emptyProperty(params.attr, 'value', '')
                );
            },

            /**
             * Html input hidden
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getHidden: function(params) {
                return this._getInput(params);
            },

            /**
             * Html input text
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getInput: function(params) {
                var html = '';
                //Html lield
                html += _basis.getTag('input', params.attr, null, false);
                var icon = _basis.emptyProperty(params, 'icon', false);
                if (icon !== false) {
                    html += _basis.getIcon(icon, _basis.fields.icon.if);
                }
                //Html block field
                html = _basis.getTag(
                    'div',
                    {
                        class: _basis.fields.icon.bf + ' ' +
                        _basis.emptyValue(this._size, '') + ' ' +
                        _basis.emptyProperty(params, 'class', '')
                    },
                    html
                );
                return html;
            },

            /**
             * Build html optionsfor select list
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getItemSelect: function(params) {
                var item = '';
                $.each(params.selectData, function(key, value) {
                    var attr = {
                        value: key
                    };
                    if (params.attr.value === key) {
                        attr['selected'] = 'selected';
                    }
                    item += _basis.getTag('option', attr, value)
                });
                return item;
            },

            /**
             * Build html select list
             *
             * @param {object} params
             * @returns {*|string}
             * @private
             */
            _getSelect: function(params) {
                var html = _basis.getTag('select', params.attr, this._getItemSelect(params), true);
                var icon = _basis.emptyProperty(params, 'icon', false);
                if (icon !== false) {
                    html += _basis.getIcon(icon, _basis.fields.icon.if);
                }
                return _basis.getTag(
                    'div',
                    { class: _basis.fields.icon.bf + ' ' + _basis.emptyValue(this._size, '') + ' ' + _basis.emptyProperty(params, 'class', '') },
                    html
                );
            },

            /**
             * Build Label field
             *
             * @param {object} params
             * @returns {{widthLabel: *, widthField: *, label: string}}
             * @private
             */
            _getLabel: function(params) {
                var widthLabel = null;
                var widthField = null;

                if (this._line > 0) {
                    widthLabel = _basis.layout + '-' + this._line;
                    widthField = _basis.layout + '-' + (12 - this._line);
                }

                var html = '';
                if (params.label !== null) {
                    html += _basis.getTag(
                        'label',
                        { for: params.attr.id, class : _basis.emptyValue(widthLabel, '') + ' ' + this._labelAlignment },
                        params.label + this._afterLabel
                    );
                }
                return {
                    widthLabel: widthLabel,
                    widthField: widthField,
                    label : html
                };
            },

            /**
             * Bulid input date
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getInputDate: function(params) {
                var html = '';
                var oldClass = params.attr.class;
                var oldName = params.attr.name;

                params.attr.class = oldClass + ' ' + CLASS_DATE;
                params.attr.name = null;
                html += this._getInput(params);

                params.attr.class = CLASS_DATE + '-' + TYPE_HIDDEN;
                params.attr.type = TYPE_HIDDEN;
                params.attr.name = oldName;
                params.attr.id = null;
                html += this._getInput(params);

                html += _basis.getTag(
                    'span',
                    {
                        class: _basis.fields.iga,
                        onclick: "new HTML.Fields()._setCurrentDate(this);"
                    },
                    _basis.getIcon(ICON_CURRENT)
                );
                html += _basis.getTag(
                    'span',
                    {
                        class: _basis.fields.iga,
                        onclick: "new HTML.Fields()._setDate(this);"
                    },
                    _basis.getIcon(ICON_DATE)
                );
                html += _basis.getTag(
                    'span',
                    {
                        class: _basis.fields.iga,
                        onclick: "new HTML.Fields()._removeDate(this);"
                    },
                    _basis.getIcon(ICON_REMOVE)
                );

                return html;
            },

            _setCurrentDate: function(element) {
                this._setDate(element);
                var input = $(element).parent('div').find('.' + CLASS_DATE);
                input.datepicker("setDate", new Date());
                input.datepicker("hide") ;
            },

            _setDate: function(element) {
                var input = $(element).parent('div').find('.' + CLASS_DATE);
                input.datepicker(
                    {
                        changeMonth: true,
                        changeYear: true,
                        dateFormat: 'dd.mm.yy',
                        altField: '.' + CLASS_DATE + '-' + TYPE_HIDDEN,
                        altFormat: 'yy-mm-dd 00:00:00'
                    }
                );
                input.focus();
            },

            _removeDate: function(element) {
                var input = $(element).parent('div').find('.' + CLASS_DATE);
                input.val('');
            },

            /**
             * Html input and two markers
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getInputMarker: function(params) {
                var html = '';

                if (params.markerLeft !== null) {
                    html += _basis.getTag('span', {class: _basis.fields.iga}, params.markerLeft);
                }

                html += this._getInput(params);

                if (params.markerRight !== null) {
                    html += _basis.getTag('span', {class: _basis.fields.iga}, params.markerRight);
                }

                return html;
            },

            /**
             * Build select list
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getSelectList: function(params) {
                return this._getSelect(params);
            },

            /**
             * Html block-group input
             *
             * @param {object} data
             * @returns {string}
             * @private
             */
            _getGroup: function(data) {

                var html = '';
                var currentObj = this;
                $.each(data, function(key, params) {
                    //Html label
                    var label = '';
                    if (params.label !== null) {
                        var lbl = currentObj._getLabel(params);
                        label = lbl.label;
                        params['class'] = lbl.widthField;

                    }

                    //Html field
                    var field = '';
                    var block = _basis.fields.fg;
                    if (key === KEY_INPUT) {

                        field = currentObj._getInput(params);

                    } else if (key === TYPE_DATE) {

                        block = _basis.fields.ig;
                        field = currentObj._getInputDate(params);

                    } else if (key === KEY_MARKER) {

                        block = _basis.fields.ig;
                        field = currentObj._getInputMarker(params);

                    } else if (key === KEY_READ) {

                        field = currentObj._getRead(params);

                    } else if (key === KEY_SELECT_LIST) {

                        field = currentObj._getSelectList(params);

                    } else if (key === KEY_CHECKBOX) {

                        field = currentObj._getCheckbox(params)

                    } else if (key === KEY_HIDDEN) {

                        currentObj._blockHiddenFields += currentObj._getHidden(params);

                    }

                    var line = '';
                    if (currentObj._line > 0) {
                        line = 'form-horizontal';
                    }

                    if (key !== KEY_HIDDEN) {
                        html = _basis.getTag(
                            'div',
                            {
                                class: _basis.layout + '-' + currentObj._group + ' ' +
                                _basis.emptyValue(currentObj._margin, '')
                            },
                            label + _basis.getTag(
                                'div',
                                {
                                    class: block + ' ' +
                                    _basis.emptyProperty(params, 'skin', '') + ' ' +
                                    _basis.emptyValue(currentObj._size, '') + ' ' + line
                                },
                                field
                            )
                        );
                    }
                });
                return html;
            },

            /**
             * Build block with fields
             *
             * @returns {*|string}
             * @private
             */
            _getBlockInput: function() {
                var html = '';
                var currentObj = this;
                $.each(this._parametersFieldForBuild, function(key, params) {
                    html += currentObj._getGroup(params);
                });
                html = _basis.getTag('div', {}, html) + _basis.getTag('div', {class: BLOCK_HIDDEN_FIELDS}, this._blockHiddenFields);
                return html;
            },

            /**
             * Set skin fields
             *
             * @public
             * @param {string|null} skin 'success'|'warning'|'error'|'muted'|'primary'|'info'|'danger'|null}
             * @returns {HTML.Fields}
             */
            setSkin: function(skin) {
                this._skin = _basis.getSkin(skin);
                return this;
            },

            /**
             * Set line label - field
             *
             * @public
             * @param {number} widthLabel
             * @param {string} afterLabel
             * @returns {HTML.Fields}
             */
            setLineLabel: function(widthLabel, afterLabel) {
                this._line = _basis.emptyValue(widthLabel, 2);
                this._afterLabel = _basis.emptyValue(afterLabel, AFTER_LABEL);
                return this;
            },

            /**
             * Set margin field
             *
             * @public
             * @param {string|null} margin {'lg'|'sm'|'xs'|null}
             * @default 'sm'
             * @returns {HTML.Fields}
             */
            setMargin: function(margin) {
                this._margin = _basis.getPadding(margin, _basis.padding.sm);
                return this;
            },

            /**
             * Set placeholder field
             *
             * @public
             * @param {string|number|null} placeholder
             * @default '...'
             * @returns {HTML.Fields}
             */
            setPlaceholder: function(placeholder) {
                this._placeholder = _basis.emptyValue(placeholder, PLACEHOLDER_DEF);
                return this;
            },

            /**
             * Set parameters for generating field
             *
             * @param {object} data data = { key: key, value: value, label: label, name: name, leftMarker: leftMarker, rightMarker: rightMarker, icon: icon, skin: skin, type: type, placeholder: placeholder, disabled: disabled }
             * @private
             */
            _setDataParams: function(data) {
                var name = _basis.emptyProperty(data, 'name', null);
                var disabled = _basis.emptyProperty(data, 'disabled', false);
                var checked =  _basis.emptyProperty(data, 'checked', false);

                var counter =  Object.keys(this._parametersFieldForBuild).length++;
                this._parametersFieldForBuild[counter] = {};

                this._parametersFieldForBuild[counter][data.key] = {
                    icon:            _basis.emptyProperty(data, 'icon', null),
                    label:           _basis.emptyProperty(data, 'label', null),
                    markerLeft:      _basis.emptyProperty(data, 'leftMarker', null),
                    markerRight:     _basis.emptyProperty(data, 'rightMarker', null),
                    selectData:      _basis.emptyProperty(data, 'selectData', null),
                    skin:            this._skin,
                    attr: {
                        name:        name,
                        type:        _basis.emptyProperty(data, 'type', null),
                        id:          _basis.getId(this._id, name),
                        value:       _basis.emptyProperty(data, 'value', null),
                        placeholder: _basis.emptyProperty(data, 'placeholder', null),
                        onclick:     _basis.emptyProperty(data, 'onclick', null),
                        class:       _basis.fields.inp + ' ' +
                                     _basis.emptyValue(this._class, '') + ' ' +
                                     _basis.emptyValue(this._skin, '') + ' ' +
                                     _basis.emptyValue(this._size, '') + ' ' +
                                     (disabled ? _basis.disabled : ''),
                        checked:     (checked ? 'checked' : ''),
                        disabled:    (disabled ? 'disabled' : '')
                    }
                };
            },

            /**
             * Build input with left or right marker
             *
             * @public
             * @param {string|null} value
             * @param {string|null} leftMarker
             * @param {string|null} rightMarker
             * @param {string|null} name
             * @param {boolean} disabled
             * @returns {HTML.Fields}
             */
            addInputMarker: function(value, leftMarker, rightMarker, name, disabled) {
                var params = {
                    key: KEY_MARKER,
                    value: value,
                    name: name,
                    leftMarker: leftMarker,
                    rightMarker: rightMarker,
                    type: TYPE_TEXT,
                    placeholder: this._placeholder,
                    disabled: disabled
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Build input hidden
             *
             * @public
             * @param {string|null} value
             * @param {string|null} name
             * @param {boolean} disabled
             * @returns {HTML.Fields}
             */
            addInputHidden: function(value, name, disabled) {
                var params = {
                    key: KEY_HIDDEN,
                    value: value,
                    name: name,
                    type: TYPE_HIDDEN,
                    disabled: disabled
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Build input text
             *
             * @public
             * @param {string|null} value
             * @param {string|null} label
             * @param {string|null} name
             * @param {string|null} icon
             * @param {boolean} disabled
             * @returns {HTML.Fields}
             */
            addInput: function(value, label, name, icon, disabled) {
                var params = {
                    key: KEY_INPUT,
                    value: value,
                    label: label,
                    name: name,
                    icon: icon,
                    type: TYPE_TEXT,
                    placeholder: this._placeholder,
                    disabled: disabled
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Build input password
             *
             * @public
             * @param {string|null} value
             * @param {string|null} label
             * @param {string|null} name
             * @param {string|null} icon
             * @param {boolean} disabled
             * @returns {HTML.Fields}
             */
            addInputPassword: function(value, label, name, icon, disabled) {
                var params = {
                    key: KEY_INPUT,
                    value: value,
                    label: label,
                    name: name,
                    icon: icon,
                    type: TYPE_PASSWORD,
                    placeholder: this._placeholder,
                    disabled: disabled
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Build input read
             *
             * @public
             * @param {string|null} value
             * @param {string|null} label
             * @param {string|null} name
             * @returns {HTML.Fields}
             */
            addInputRead: function(label, value, name) {
                var params = {
                    key: KEY_READ,
                    value: value,
                    label: label,
                    name: name,
                    type: TYPE_TEXT
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Build select list field
             *
             * @param {object} data
             * @param {string|number|null} value
             * @param {string|null} name
             * @param {string|null} label
             * @param {boolean} disabled
             * @returns {HTML.Fields}
             */
            addSelectList: function(data, value, name, label, disabled) {
                var params = {
                    key: KEY_SELECT_LIST,
                    value: value,
                    label: label,
                    name: name,
                    placeholder: this._placeholder,
                    disabled: disabled,
                    selectData: data
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Add Checkbox
             *
             * @param {string|null} name
             * @param {string|null} label
             * @param {boolean} checked
             * @param {boolean} disabled
             * @returns {HTML.Fields}
             */
            addCheckbox: function(name, label, checked, disabled) {
                var params = {
                    key: KEY_CHECKBOX,
                    type: KEY_CHECKBOX,
                    label: label,
                    name: name,
                    checked: checked,
                    disabled: disabled
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Build input date
             *
             * @public
             * @param {string|null} value
             * @param {string|null} label
             * @param {string|null} name
             * @param {boolean} disabled
             * @returns {HTML.Fields}
             */
            addInputDate: function(value, label, name, disabled) {
                var params = {
                    key: TYPE_DATE,
                    value: value,
                    label: label,
                    name: name,
                    type: 'text',
                    disabled: disabled
                };
                this._setDataParams(params);
                return this;
            },

            /**
             * Compiles and returns HTML block inputs
             *
             * @public
             * @returns {*|string}
             */
            toHtml: function() {
                return this._getBlockInput();
            },

            /**
             * Compiles and appends HTML block inputs in elements "element"
             *
             * @public
             * @param {string} element
             * @returns {HTML.Fields}
             */
            appendHtml: function(element) {
                $(element).append(this._getBlockInput());
                return this;
            }

        };

    } (window.HTML || {}));

    (function(HTML) {

        var METHOD = 'POST';

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

        HTML.Form = function() {

        };

        /** @protected */
        HTML.Form.prototype = {

            _action: null,

            _method: METHOD,

            _content: null,

            /**
             * Return html tag form with contents
             *
             * @param {string} content
             * @returns {*|string}
             */
            _getForm: function(content) {
                return _basis.getTag('form', {action: this._action, method: this._method}, this._content, true);

            },

            /**
             * Set content to html form
             *
             * @param {string} content
             * @returns {HTML.Form}
             */
            setContent: function(content) {
                this._content = _basis.emptyValue(content, '');
                return this;
            },

            /**
             * Method send data to server
             *
             * @param {string} method
             * @returns {HTML.Form}
             */
            setMethod: function(method) {
                this._method = _basis.emptyValue(method, METHOD);
                return this;
            },

            /**
             * Set url for send data to server
             *
             * @param {string} action
             * @returns {HTML.Form}
             */
            setAction: function(action) {
                this._action = _basis.emptyValue(action, null);
                return this;
            },


            /**
             * Compiles and returns HTML block panels
             *
             * @public
             * @returns {*|string}
             */
            toHtml: function() {
                return this._getForm();
            },

            /**
             * Compiles and appends HTML block panels in elements "element"
             *
             * @public
             * @param {string} element
             * @returns {HTML.Collapse}
             */
            appendHtml: function(element) {
                $(element).append(this._getForm());
                return this;
            }
        }

    } (window.HTML || {}));

    (function(HTML) {

        var NAV_BUTTON = 'button';

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

        /**
         * @memberOf HTML
         * @namespace HTML.Navbar
         * @constructor
         * @param {boolean} hideBrendMenu
         * @param {boolean} hideLeftMenu
         * @param {boolean} hideRightMenu
         */
        HTML.Navbar = function(hideBrendMenu, hideLeftMenu, hideRightMenu) {
            this._hideBrandMenu = _basis.emptyValue(hideBrendMenu, false);
            this._hideLeftMenu  = _basis.emptyValue(hideLeftMenu, false);
            this._hideRightMenu = _basis.emptyValue(hideRightMenu, false);
            this._leftMenu      = {};
            this._rightMenu     = {};
        };

        /** @protected */
        HTML.Navbar.prototype = {

            /**
             * Get data ajax
             *
             * @type {boolean}
             */
            _ajax: false,

            /**
             * Url ajax
             *
             * @type {string}
             */
            _ajaxUrl: window.location.href,

            /**
             * Method send data
             *
             * @type {string} 'POST'|'GET'
             */
            _ajaxMethod: 'POST',

            /**
             * Send data to server
             *
             * @type {object}
             */
            _sendToServer: {},

            /**
             * Hide block brand menu
             *
             * @type {boolean}
             * @private
             */
            _hideBrandMenu: false,

            /**
             * Hide block left menu
             *
             * @type {boolean}
             * @private
             */
            _hideLeftMenu: false,

            /**
             * Hide block right menu
             *
             * @type {boolean}
             * @private
             */
            _hideRightMenu: false,

            /**
             * position and type menu
             *
             * @type {string}
             * @private
             */
            _position: _basis.navbar.position.statictop,

            /**
             * skin menu
             *
             * @type {string}
             * @private
             */
            _skin: _basis.navbar.skin.default,

            /**
             * Icon brand menu
             *
             * @type {string|null}
             * @private
             */
            _brandIcon: null,

            /**
             * Html class nav-menu
             *
             * @type {string|null}
             * @private
             */
            _class: null,

            /**
             * Brand link
             *
             * @type {string|null}
             * @private
             */
            _brandLink: null,

            /**
             * brand menu
             *
             * @type {string|null}
             * @private
             */
            _brandName: null,

            /**
             * Data left menu
             *
             * @type {object}
             * @example
             *          { 0: { icon: 'icon', name: 'name', link: 'link', active: true, data: { 0: { icon: 'icon', name: 'name', link: 'link', active: true} } } }
             */
            _leftMenu: {},

            /**
             * Data right menu
             *
             * @type {object}
             * @example
             *          { 0: { icon: 'icon', name: 'name', link: 'link', active: true, data: { 0: { icon: 'icon', name: 'name', link: 'link', active: true} } } }
             */
            _rightMenu: {},

            /**
             * Add Item in Object - "data"
             *
             * @param {object} data
             * @param {string} name
             * @param {string} link
             * @param {string} icon
             * @param {boolean} active
             * @returns {HTML.Navbar}
             * @private
             */
            _addSubItem: function(data, name, link, icon, active) {
                var numLastItem = Object.keys(data).length;
                var item = _basis.emptyProperty(data[numLastItem], 'data', false);

                if (item === false) {
                    data[numLastItem]['data'] = {}
                }

                var numLastSubItem = ++Object.keys(data[numLastItem]['data']).length;

                data[numLastItem]['data'][numLastSubItem] = {
                    icon: _basis.emptyValue(icon, null),
                    name: _basis.emptyValue(name, null),
                    link: _basis.emptyValue(link, null),
                    active: ( active ? active : false )
                };
                return this;
            },

            /**
             * Add Sub-Item in Object - "data"
             *
             * @public
             * @param {object} data
             * @param {string} name
             * @param {string} link
             * @param {string} icon
             * @param {boolean} active
             * @returns {HTML.Navbar}
             * @private
             */
            _addItem: function(data, name, link, icon, active) {
                var count = ++Object.keys(data).length;

                data[count] = {
                    icon: _basis.emptyValue(icon, null),
                    name: _basis.emptyValue(name, null),
                    link: _basis.emptyValue(link, null),
                    active: ( active ? active : false )
                };
                return this;
            },

            /**
             * Get html block nav-bar
             *
             * @returns {*|string}
             * @private
             */
            _getBlockNavbar: function() {
                var content = '';
                content += this._getBrandMenu();
                content += _basis.getTag(
                    'div',
                    {
                        class: _basis.navbar.block.collapse + ' ' +
                               _basis.navbar.collapse
                    },
                    this._getLeftMenu() +
                    this._getRightMenu()
                );

                return _basis.getTag(
                    'div',
                    {
                        class: _basis.emptyValue(_basis.navbar.navbar, '') + ' ' +
                               _basis.emptyValue(this._position, '') + ' ' +
                               _basis.emptyValue(this._skin, '') + ' ' +
                               _basis.emptyValue(this._class, '')
                    },
                    _basis.getTag(
                        'div',
                        {
                            class: _basis.emptyValue(_basis.navbar.fluid, null)
                        },
                        content
                    )
                );
            },

            /**
             * Get html block brand-menu
             *
             * @returns {*|string}
             * @private
             */
            _getBrandMenu: function() {
                if (this._hideBrandMenu === false) {
                    var icon = _basis.getIcon(this._brandIcon, '');
                    var home = _basis.getTag(
                        'a',
                        {
                            href: _basis.emptyValue(this._brandLink, _basis.hrefDefault),
                            class: _basis.navbar.brand
                        },
                        icon + ' ' + _basis.emptyValue(this._brandName, '')
                    );

                    var btn = _basis.getTag('span', {class: _basis.navbar.iconbar}, '');

                    return _basis.getTag(
                        'div',
                        {
                            class: _basis.navbar.block.header
                        },
                        _basis.getTag(
                            'button',
                            {
                                class: _basis.navbar.toogle,
                                type: NAV_BUTTON,
                                'data-toggle': _basis.navbar.collapse,
                                'data-target': '.' + _basis.navbar.block.collapse
                            },
                            btn + btn + btn
                        ) + home
                    );
                }
                return '';
            },

            /**
             * Get html items menu
             *
             * @param {object} params
             * @returns {string}
             * @private
             */
            _getItemMenu: function(params) {
                var item = '';
                var currentObj = this;
                $.each(params, function(key, value) {

                    var data = _basis.emptyProperty(value, 'data', false);

                    var attrItem = {class: ''};
                    if (_basis.emptyProperty(value, 'active', false) === true) {
                        attrItem['class'] = _basis.dropDown.itemType.active;
                    }

                    var caret = '';
                    var attrLink = {};
                    var newDropDown = '';

                    if (data !== false) {
                        caret = _basis.getTag('b', {class: _basis.dropDown.caret}, '');
                        attrItem['class'] = attrItem['class'] + ' ' + _basis.dropDown.classDropdown;
                        attrLink = {
                            href: _basis.hrefDefault,
                            class: _basis.dropDown.classToggle,
                            'data-toggle': _basis.dropDown.dataToggle
                        };
                        newDropDown = _basis.getTag('ul', {class: _basis.dropDown.menu}, currentObj._getItemMenu(data))
                    } else {
                        attrLink = {href: _basis.emptyProperty(value, 'link', null)};
                    }

                    var link = _basis.getTag(
                        'a',
                        attrLink,
                        _basis.getIcon(_basis.emptyProperty(value, 'icon', '')) + ' ' +
                        _basis.emptyProperty(value, 'name', '') + ' ' +
                        caret
                    );

                    item += _basis.getTag('li', attrItem, link + newDropDown);
                });

                return item;
            },

            /**
             * Get html block left menu
             *
             * @returns {*|string}
             * @private
             */
            _getLeftMenu: function() {
                if (this._hideLeftMenu === false) {
                    return _basis.getTag(
                        'ul',
                        {
                            class: _basis.navbar.nav + ' ' +
                                   _basis.navbar.navbarnav + ' ' +
                                   _basis.navbar.position.fixedleft
                        },
                        this._getItemMenu(this._leftMenu)
                    );
                }
                return '';
            },

            /**
             * Get html block right menu
             *
             * @returns {*|string}
             * @private
             */
            _getRightMenu: function() {
                if (this._hideRightMenu === false) {
                    return _basis.getTag(
                        'ul',
                        {
                            class: _basis.navbar.nav + ' ' +
                                   _basis.navbar.navbarnav + ' ' +
                                   _basis.navbar.position.fixedright
                        },
                        this._getItemMenu(this._rightMenu)
                    );
                }
            },

            /**
             * Get data for build navbar-menu
             *
             * @private
             */
            _getDataAjax: function(element) {
                var currentObj = this;
                $.ajax({
                    type: this._ajaxMethod,
                    url: this._ajaxUrl,
                    data: this._sendToServer,
                    dataType: 'json',

                    success: function (response) {
                        var res = response;
                        if (typeof response === 'string') {
                            res = JSON.parse(response);
                        }
                        //Set parameters
                        currentObj._brandIcon = _basis.emptyProperty(res, 'brandIcon', currentObj._brandIcon);
                        currentObj._brandLink = _basis.emptyProperty(res, 'brandLink', currentObj._brandLink);
                        currentObj._brandName = _basis.emptyProperty(res, 'brandName', currentObj._brandName);
                        //Add parameters
                        currentObj.setDataLeftMenu(_basis.emptyProperty(res, 'leftMenu', false));
                        currentObj.setDataRightMenu(_basis.emptyProperty(res, 'rightMenu', false));
                        //Build navbar and append to "element"
                        $(element).append(currentObj._getBlockNavbar());
                    },

                    error: function (xhr) {
                        $(element).append(_basis.getTextErrorAjax(xhr));
                    }
                });
            },

            /**
             * Set custom html class nav-menu
             *
             * @param {string} htmlClass
             * @returns {HTML.Navbar}
             */
            setClassMenu: function(htmlClass) {
                this._class = _basis.emptyValue(htmlClass, null);
                return this;
            },

            /**
             * Set skin menu
             *
             * @public
             * @param {string} skin {'inverse'|'default'}
             * @returns {HTML.Navbar}
             */
            setSkinMenu: function(skin) {
                this._skin = _basis.emptyProperty(_basis.navbar.skin, skin, _basis.navbar.skin.default);
                return this;
            },

            /**
             * Set tupe menu
             *
             * @public
             * @param {string} type {'statictop'|'fixedtop'|'fixedbottom'}
             * @returns {HTML.Navbar}
             */
            setTypeMenu: function(type) {
                this._position = _basis.emptyProperty(_basis.navbar.position, type, _basis.navbar.position.statictop);
                return this;
            },

            /**
             * Set param brand
             *
             * @public
             * @param {null|string} icon
             * @param {null|string} brandName
             * @param {null|string} brandLink
             * @returns {HTML.Navbar}
             */
            setHomeMenu: function(icon, brandName, brandLink) {
                this._brandName = _basis.emptyValue(brandName, null);
                this._brandLink = _basis.emptyValue(brandLink, null);
                this._brandIcon = _basis.emptyValue(icon, null);
                return this;
            },

            /**
             * Set data in left menu
             *
             * @public
             * @param {object} data
             * @example
             *          { 0: { icon: 'icon', name: 'name', link: 'link', active: true, data: { 0: { icon: 'icon', name: 'name', link: 'link', active: true} } } }
             * @returns {HTML.Navbar}
             */
            setDataLeftMenu: function(data) {
                if (typeof data === 'object') {

                    var count = ++Object.keys(this._leftMenu).length;
                    var currentObj = this;

                    $.each(data, function(key, params) {
                        currentObj._leftMenu[count] = params;
                        count++;
                    });
                }
                return this;
            },

            /**
             * Set data in right menu
             *
             * @public
             * @param {object} data
             * @example
             *          { 0: { icon: 'icon', name: 'name', link: 'link', active: true, data: { 0: { icon: 'icon', name: 'name', link: 'link', active: true} } } }
             * @returns {HTML.Navbar}
             */
            setDataRightMenu: function(data) {
                if (typeof data === 'object') {

                    var count = ++Object.keys(this._rightMenu).length;
                    var currentObj = this;

                    $.each(data, function(key, params) {
                        currentObj._rightMenu[count] = params;
                        count++;
                    });
                }
                return this;
            },

            /**
             * Add data for build nav bar menu. Used last method ".appendHtml(element)"
             *
             * @param {string} url - Link server
             * @param {object} sendToServer send data to server
             * @returns {HTML.Navbar}
             * @example
             *      response Ajax
             *      json data = {
             *          brandName: 'name',
             *          brandLink: 'link',
             *          brandIcon: 'icon',
             *          leftMenu: { 0: { icon: 'icon', name: 'name', link: 'link', active: true, data: { 0: { icon: 'icon', name: 'name', link: 'link', active: true} } } }
             *          rightMenu: { 0: { icon: 'icon', name: 'name', link: 'link', active: true, data: { 0: { icon: 'icon', name: 'name', link: 'link', active: true} } } }
             *      }
             *
             */
            setDataAjax: function(url, sendToServer) {
                this._ajax = true;
                this._ajaxUrl = _basis.emptyValue(url, window.location.href);
                this._sendToServer = _basis.emptyValue(sendToServer, {});
                return this;
            },

            /**
             * Add item in left menu
             *
             * @public
             * @param {null|string} name
             * @param {null|string} link
             * @param {null|string} icon
             * @param {boolean} active
             * @returns {HTML.Navbar}
             */
            addLeftItem: function(name, link, icon, active) {
                active = _basis.emptyValue(active, false);
                this._addItem(this._leftMenu, name, link, icon, active);
                return this;
            },

            /**
             * Add sub-item in left menu
             *
             * @public
             * @param {null|string} name
             * @param {null|string} link
             * @param {null|string} icon
             * @param {boolean} active
             * @returns {HTML.Navbar}
             */
            addLeftSubItem: function(name, link, icon, active) {
                active = _basis.emptyValue(active, false);
                this._addSubItem(this._leftMenu, name, link, icon, active);
                return this;
            },

            /**
             * Add item in right menu
             *
             * @public
             * @param {null|string} name
             * @param {null|string} link
             * @param {null|string} icon
             * @param {boolean} active
             * @returns {HTML.Navbar}
             */
            addRightItem: function(name, link, icon, active) {
                active = _basis.emptyValue(active, false);
                this._addItem(this._rightMenu, name, link, icon, active);
                return this;
            },

            /**
             * Add sub-item in right menu
             *
             * @public
             * @param {null|string} name
             * @param {null|string} link
             * @param {null|string} icon
             * @param {boolean} active
             * @returns {HTML.Navbar}
             */
            addRightSubItem: function(name, link, icon, active) {
                active = _basis.emptyValue(active, false);
                this._addSubItem(this._rightMenu, name, link, icon, active);
                return this;
            },

            /**
             * Compiles and returns HTML block nav-bar
             *
             * @public
             * @returns {*|string}
             */
            toHtml: function() {
                return this._getBlockNavbar();
            },

            /**
             * Compiles and appends HTML block nav-bar in elements "element"
             *
             * @public
             * @param {string} element
             * @returns {HTML.Navbar}
             */
            appendHtml: function(element) {
                if (this._ajax === true) {
                    this._getDataAjax(element);
                } else {
                    $(element).append(this._getBlockNavbar());
                }
                return this;
            }
        };

    } (window.HTML || {}));

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