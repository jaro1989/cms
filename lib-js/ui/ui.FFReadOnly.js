
(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.FFReadOnly
     * @param {string|null} value
     * @param {string|null} name
     * @param {string|null} caption
     * @constructor
     */
    ui.FFReadOnly = function (value, name, caption) {

        this._value   = ui.api.empty(value, null);
        this._name    = ui.api.empty(name, null);
        this._caption = ui.api.empty(caption, null);
    };

    /** @protected */
    ui.FFReadOnly.prototype = {

        /**
         * @private
         * @type {string|null}
         */
        _leftIcon: null,

        /**
         * @private
         * @type {string|null}
         */
        _rightIcon: null,

        /**
         * @private
         * @type {string|null}
         */
        _leftMarker: null,

        /**
         * @private
         * @type {string|null}
         */
        _rightMarker: null,

        /**
         * @private
         * @type {number|null}
         */
        _widthCaption: null,

        /**
         * @private
         * @type {string|number|null}
         */
        _widthBlock: null,

        /**
         * @private
         * @type {string|null}
         */
        _id: null,

        /**
         * @private
         * @type {string|null}
         */
        _padding: ui.Config.padding,

        /**
         * @private
         * @type {string|null}
         */
        _skin: null,

        /**
         * @private
         * @type {string|null}
         */
        _maxHeight: null,

        /**
         *
         * @param {string|number|null} height
         * @returns {ui.FFReadOnly}
         */
        setMaxHeight: function(height) {

            if (typeof height === 'number') {

                height += 'px';
            }

            this._maxHeight = ui.api.empty(height, null);
            return this;
        },

        /**
         * Set skin field
         * @param {string} skinName {'muted'|'primary'|'success'|'info'|'warning'|'danger'}
         * @returns {ui.FFReadOnly}
         * @public
         */
        setSkin: function(skinName) {
            this._skin = skinName;
            return this;
        },

        /**
         * Set left marker field
         * @param {string} textMarker
         * @returns {ui.FFReadOnly}
         * @public
         */
        setLeftMarker: function(textMarker) {
            this._leftMarker = textMarker;
            return this;
        },

        /**
         * Set right marker field
         * @param {string} textMarker
         * @returns {ui.FFReadOnly}
         * @public
         */
        setRightMarker: function(textMarker) {
            this._rightMarker = textMarker;
            return this;
        },

        /**
         * Set left icon field
         * @param {string} iconName
         * @returns {ui.FFReadOnly}
         * @public
         */
        setLeftIcon: function(iconName) {
            this._leftIcon = iconName;
            return this;
        },

        /**
         * Set right icon field
         * @param {string} iconName
         * @returns {ui.FFReadOnly}
         * @public
         */
        setRightIcon: function(iconName) {
            this._rightIcon = iconName;
            return this;
        },

        /**
         * Set width label field {1-10}
         * @param {number|null} widthCaption {1-10}
         * @returns {ui.FFReadOnly}
         * @public
         */
        setWidthCaption: function(widthCaption) {
            this._widthCaption = widthCaption;
            return this;
        },

        /**
         * Set width block field
         * @param {number|string} width
         * @example
         *      {1-12 | '300px' | '30%'}
         * @returns {ui.FFReadOnly}
         * @public
         */
        setWidthBlock: function(width) {
            this._widthBlock = width;
            return this;
        },

        /**
         * Set html ID field
         * @param {string} htmlId
         * @returns {ui.FFReadOnly}
         * @public
         */
        setId: function(htmlId) {
            this._id = htmlId;
            return this;
        },

        /**
         * Set html class padding
         * @param {string} padding { 'lg' | 'sm' | 'xs' }
         * @returns {ui.FFReadOnly}
         * @public
         */
        setPadding: function(padding) {
            this._padding = padding;
            return this;
        },

        /**
         * Build html label
         * @returns {*|Element}
         * @private
         */
        _buildCaption: function() {

            var label =  new ui.Element('label')
                .addClassElement(ui.CSS.controlLabelClass)
                .setCaptionElement(this._caption, false)
                .setForLabelElement(this._id, this._name);

            if (typeof this._widthCaption === 'number') {

                label
                    .setWidthElement(this._widthCaption)
                    .addClassElement(ui.CSS.alignClass.text.right);
            }

            return label.getElement();
        },

        /**
         * Build html field
         * @returns {*|Element}
         * @private
         */
        _buildField: function() {

            var value = ui.api.setValue(this._value, this._name);

            var field = new ui.Element('p')
                .addClassElement(ui.CSS.readOnlyMaxHeight)
                .setSkinElement('text', this._skin)
                .setIdElement(this._id, this._name)
                .setContentElement(value);

            if (this._maxHeight !== null) {

                field.addStyleElement('maxHeight', this._maxHeight)
            }

            if (
                this._leftMarker  !== null || this._leftIcon  !== null ||
                this._rightMarker !== null || this._rightIcon !== null
            ) {

                field.addClassElement(ui.CSS.formControlClass);
            }

            return field.getElement();
        },

        /**
         * Build html left marker
         * @returns {*|Element}
         * @private
         */
        _buildLeftMarker: function() {

            var leftMarker = new ui.Element('span')
                .addClassElement(ui.CSS.inputGroupAddonClass)
                .setContentElement(this._leftMarker);

            if (typeof this._leftIcon === 'string') {

                leftMarker
                    .addChildBefore(
                        new ui.Element('span')
                            .setIconElement(this._leftIcon)
                            .getElement()
                    )

            }

            return leftMarker.getElement();
        },

        /**
         * Build html right marker
         * @returns {*|Element}
         * @private
         */
        _buildRightMarker: function() {

            var rightMarker = new ui.Element('span')
                .addClassElement(ui.CSS.inputGroupAddonClass)
                .setContentElement(this._rightMarker);

            if (typeof this._rightIcon === 'string') {

                rightMarker
                    .addChildAfter(
                        new ui.Element('span')
                            .setIconElement(this._rightIcon)
                            .getElement()
                    )

            }

            return rightMarker.getElement();
        },

        /**
         * Build html block group
         * @returns {*|Element}
         * @private
         */
        _buildGroupBlock: function() {

            var inputGroup = new ui.Element('div')
                .addChildAfter(this._buildField());

            if (
                this._leftMarker  !== null  ||
                this._rightMarker !== null  ||
                this._rightIcon   !== null  ||
                this._leftIcon    !== null
            ) {
                inputGroup.addClassElement(ui.CSS.inputGroupClass);
            }

            if (typeof this._widthCaption === 'number') {

                inputGroup.setWidthElement(12 - this._widthCaption);
            }

            if (this._leftMarker !== null || this._leftIcon !== null) {

                inputGroup.addChildBefore(this._buildLeftMarker());
            }

            if (this._rightMarker !== null || this._rightIcon !== null) {

                inputGroup.addChildAfter(this._buildRightMarker())
            }

            return inputGroup.getElement();
        },

        /**
         * Build html prent block
         * @returns {*|Element}
         * @private
         */
        _buildParentBlock: function() {

            var parentElement = new ui.Element('div')
                .addClassElement(ui.CSS.validateFieldBlockClass)
                .addChildBefore(this._buildGroupBlock())
                .setPaddingElement(this._padding);

            if (this._caption !== null) {

                parentElement.addChildBefore(this._buildCaption());
            }

            if (this._widthBlock !== null) {

                parentElement.setWidthElement(this._widthBlock);
            }

            return parentElement.getElement();
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
         * @returns {ui.FFReadOnly}
         * @public
         */
        appendHTML: function(selector) {
            new ui.dom(selector).append(this.getElement());
            return this;
        }
    };
} (window.ui || {}));