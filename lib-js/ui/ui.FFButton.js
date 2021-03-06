
(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.FFButton
     * @constructor
     */
    ui.FFButton = function () {

        this._buttonList  = [];
        this._disabledIf  = [];
        this._btnId = [];

        /**
         * @private
         * @type {[]}
         */
        this._class = [];
    };

    /** @protected */
    ui.FFButton.prototype = {

        /**
         * @private
         * @type {string|null}
         */
        _skin: null,

        /**
         * @private
         * @type {string|null}
         */
        _size: null,

        /**
         * @private
         * @type {boolean}
         */
        _block: false,

        /**
         * @private
         * @type {string|null}
         */
        _group: null,

        /**
         * @private
         * @type {boolean}
         */
        _active: false,

        /**
         * @private
         * @type {{}}
         */
        _hide: {},

        /**
         * @private
         * @type {string|number|null}
         */
        _width: null,

        /**
         * @private
         * @type {boolean}
         */
        _disabled: false,

        /**
         * @private
         * @type {string|null}
         */
        _onClick: null,

        /**
         * @private
         * @type {string|null}
         */
        _padding: ui.Config.padding,

        /**
         * @private
         * @type {string|null}
         */
        _position: null,

        /**
         * @param {string} htmlClass
         * @returns {ui.FFButton}
         */
        setClass: function(htmlClass) {

            this._class = [];
            this._class.push(htmlClass);
            return this;
        },

        /**
         * @param {string} htmlClass
         * @returns {ui.FFButton}
         */
        addClass: function(htmlClass) {

            this._class.push(htmlClass);
            return this;
        },


        /**
         * Set psition block button
         * @param {string|null} psition { 'legt' | 'right' | 'center' | 'clear' | null }
         * @returns {ui.FFButton}
         */
        setPositionBlock: function(psition) {

            this._position = psition;
            return this;
        },

        /**
         * Set padding block button
         * @param {string|null} padding { 'lg' | 'sm' | 'xs' }
         * @returns {ui.FFButton}
         */
        setPaddingBlock: function(padding) {

            this._padding = padding;
            return this;
        },

        /**
         * Set active button
         * @returns {ui.FFButton}
         */
        setActive: function() {

            this._active = true;
            return this;
        },

        /**
         * Set active button
         * @returns {ui.FFButton}
         */
        hide: function(name) {

            this._hide[name] = true;
            return this;
        },

        /**
         * Set group button
         * @param {string} typeGroup {'group' | 'toolbar' | 'vertical' | 'justified' }
         * @returns {ui.FFButton}
         * @public
         */
        setGroup: function(typeGroup) {

            this._group = ui.api.existProperty(ui.CSS.btn.btnGroup, typeGroup, null);
            return this;
        },

        /**
         * Set block button
         * @returns {ui.FFButton}
         * @public
         */
        setBlock: function() {

            this._block = true;
            return this;
        },

        /**
         * Set disabled button
         * @returns {ui.FFButton}
         * @public
         */
        setDisabled: function() {

            this._disabled = true;
            return this;
        },

        /**
         * Set disabled button
         * @param {string} name
         * @returns {ui.FFButton}
         * @public
         */
        setDisabledIf: function(name) {

            this._disabledIf.push(name);
            return this;
        },

        /**
         * Add button
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {string|null} caption
         * @param {string|null} skin { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
         * @param {boolean} active
         * @param {string|null} icon
         * @returns {ui.FFButton}
         * @public
         */
        addButton: function(value, name, caption, skin, active, icon) {

            this._buttonList[this._buttonList.length] = {
                type:      'button',
                skin:      ui.api.empty(skin,    null),
                name:      ui.api.empty(name,    null),
                value:     ui.api.empty(value,   null),
                active:    ui.api.empty(active,  null),
                caption:   ui.api.empty(caption, null),
                leftIcon:  ui.api.empty(icon,    null),
                onclick:   this._onClick,
                class:     this._class,
                rightIcon: null,
                disabled:  false
            };

            return this;
        },

        /**
         * Add submit
         * @param {string|number|null} value
         * @param {string} name
         * @param {string} caption
         * @param {string|null} skin { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
         * @param {boolean} active
         * @param {string|null} icon
         * @returns {ui.FFButton}
         * @public
         */
        addSubmit: function(value, name, caption, skin, active, icon) {

            this._buttonList[this._buttonList.length] = {
                type:      'submit',
                skin:      ui.api.empty(skin,    null),
                name:      ui.api.empty(name,    null),
                value:     ui.api.empty(value,   null),
                active:    ui.api.empty(active,  null),
                caption:   ui.api.empty(caption, null),
                leftIcon:  ui.api.empty(icon,    null),
                onclick:   this._onClick,
                class:     this._class,
                rightIcon: null,
                disabled:  false
            };

            return this;
        },

        /**
         * Add list buttons
         * @param { { 0: { type: string, value: string, name: string, caption: string, skin: string, active: boolean, leftIcon: string, rightIcon: string } } | []} data
         * @returns {ui.FFButton}
         * @public
         */
        addButtonList: function(data) {

            for(var row in data) {

                if (data.hasOwnProperty(row)) {

                    this._buttonList[this._buttonList.length] = {
                        type:      ui.api.existProperty(data[row], 'type', 'button'),
                        skin:      ui.api.existProperty(data[row], 'skin',      null),
                        name:      ui.api.existProperty(data[row], 'name',      null),
                        value:     ui.api.existProperty(data[row], 'value',     null),
                        active:    ui.api.existProperty(data[row], 'active',    null),
                        caption:   ui.api.existProperty(data[row], 'caption',   null),
                        leftIcon:  ui.api.existProperty(data[row], 'leftIcon',  null),
                        rightIcon: ui.api.existProperty(data[row], 'rightIcon', null),
                        onclick:   ui.api.existProperty(data[row], 'onclick',   null),
                        disabled:  ui.api.existProperty(data[row], 'disabled',  null),
                        class:     ui.api.existProperty(data[row], 'class',     this._class)
                    };
                }
            }

            return this;
        },

        /**
         * Set width block button
         * @param {number|string} width
         * @example
         *      {1-12 | '300px' | '30%'}
         * @returns {ui.FFButton}
         * @public
         */
        setWidth: function(width) {

            this._width = width;
            return this;
        },

        /**
         * Set skin buttons
         * @param {string} skinName { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
         * @returns {ui.FFButton}
         * @public
         */
        setSkin: function(skinName) {

            this._skin = skinName;
            return this;
        },

        /**
         * Set size button
         * @param {string} sizeBtn { 'lg' | 'sm' }
         * @returns {ui.FFButton}
         * @public
         */
        setSize: function(sizeBtn) {

            this._size = sizeBtn;
            return this;
        },

        /**
         * @param {string} action
         * @returns {ui.FFButton}
         */
        setOnClick: function(action) {

            this._onClick = action;
            return this;
        },

        /**
         * @param {{ caption: string, leftIcon: string|null, rightIcon: string|null }} params
         * @returns {string}
         * @private
         */
        _getCaption: function(params) {

            var caption = '';

            if (params.leftIcon !== null) {

                caption += new ui.Element('span')
                    .setIconElement(params.leftIcon)
                    .toHTML() + ' ';
            }

            caption += (params.caption !== null) ? params.caption : '';

            if (params.rightIcon !== null) {

                caption += ' ' + new ui.Element('span')
                    .setIconElement(params.rightIcon)
                    .toHTML();
            }

            caption.trim();
            return caption;
        },

        /**
         * Build html button
         * @param {{ type: string, value: string, name: string, caption: string, skin: string|null, active: boolean, leftIcon: string|null, rightIcon: string|null, onclick: string }} params
         * @returns {*|Element}
         * @private
         */
        _buildField: function(params) {

            var defaultSkin = ui.CSS.skinClass.default.default;
            var skin = ui.api.empty(this._skin, defaultSkin);

            if (params.skin !== null) {

                skin = ui.api.empty(params.skin, defaultSkin);
            }

            var button = new ui.Element('button')
                .setTypeElement(params.type)
                .setNameElement(params.name)
                .setIdElement(null, params.name)
                .addClassElement(ui.CSS.btn.btnClass)
                .setValueElement(params.value, params.name)
                .setSkinElement('button', skin)
                .setSizeElement('button', this._size)
                .setDisabledElement(this._disabled)
                .setContentElement(this._getCaption(params))
                .setOnClick(params.onclick);

            if (this._active === true || params.active === true) {

                button.addClassElement(ui.CSS.skinClass.default.active);
            }

            if (this._block === true) {

                button.addClassElement(ui.CSS.btn.btnBlockClass);
            }

            if (ui.api.inArray(this._disabledIf, params.name) != -1 || params.disabled === true) {

                button.setDisabledElement(true);
            }

            if (this._group === ui.CSS.btn.btnGroup.justified) {

                button = new ui.Element('div')
                    .addClassElement(ui.CSS.btn.btnGroup.group)
                    .addChildAfter(button.getElement());
            }

            var key = null;

            for (key in params.class) {

                button.addClassElement(params.class[key]);
            }

            var btn = button.getElement();

            if (ui.api.existProperty(this._hide, params.name, false)) {

                ui.api.hide(btn);
            }

            return btn;
        },

        /**
         * Build html block buttons
         * @returns {*|Element}
         * @private
         */
        _buildInlineBlock: function() {

            var inlineBlock = new ui.Element('div')
                .setPsitionElement(this._position)
                .setPaddingElement(this._padding);

            if (this._block === false && this._group !== null) {

                inlineBlock.addClassElement(this._group);
            }

            for(var htmlIda in this._buttonList) {

                inlineBlock.addChildAfter(this._buildField(this._buttonList[htmlIda]));
            }

            return inlineBlock.getElement();
        },

        /**
         * Build html prent block
         * @returns {*|Element}
         * @private
         */
        _buildParentBlock: function() {

            return new ui.Element('div')
                .setWidthElement(this._width)
                .addChildBefore(this._buildInlineBlock())
                .getElement();
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {

            return this._buildParentBlock();
        },

        /**
         * Get html current element
         * @returns {string}
         * @public
         */
        toHTML: function() {

            return this._buildParentBlock().outerHTML;
        },

        /**
         * Add element in document
         * @param {string} selector
         * @returns {ui.FFButton}
         * @public
         */
        appendHTML: function(selector) {

            new ui.dom(selector).append(this.getElement());
            return this;
        }

    };
} (window.ui || {}));