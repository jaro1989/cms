
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
            _skin: _basis.skin.default,

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
                this._skin = _basis.emptyProperty(_basis.skin, skin, _basis.skin.default);
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
