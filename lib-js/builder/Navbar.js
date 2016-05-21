
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