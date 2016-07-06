
(function(ui) {

    /**
     * @memberOf ui
     * @namespace ui.FFHidden
     * @param {string|null} value
     * @param {string|null} name
     * @constructor
     */
    ui.FFHidden = function (value, name) {

        this._value   = ui.api.empty(value, null);
        this._name    = ui.api.empty(name, null);
    };

    /** @protected */
    ui.FFHidden.prototype = {

        /**
         * @private
         * @type {string|null}
         */
        _id: null,

        /**
         * @private
         * @type {boolean}
         */
        _disabled: false,

        /**
         * @private
         * @type {boolean}
         */
        _required: false,

        /**
         * Set required field
         * @returns {ui.FFHidden}
         */
        setRequired: function(required) {
            this._required = ui.api.empty(required, true);
            return this;
        },

        /**
         * Set disables field
         * @returns {ui.FFHidden}
         */
        setDisabled: function() {
            this._disabled = true;
            return this;
        },

        /**
         * Set html ID field
         * @param {string} htmlId
         * @returns {ui.FFHidden}
         * @public
         */
        setId: function(htmlId) {
            this._id = htmlId;
            return this;
        },

        /**
         * Build html field
         * @returns {*|Element}
         * @private
         */
        _buildField: function() {

            return new ui.Element('input')
                .setTypeElement('hidden')
                .setNameElement(this._name)
                .setIdElement(this._id, this._name)
                .setValueElement(this._value, this._name)
                .setDisabledElement(this._disabled)
                .setRequiredElement(this._required)
                .getElement();
        },

        /**
         * Build html prent block
         * @returns {*|Element}
         * @private
         */
        _buildParentBlock: function() {

            return new ui.Element('div')
                .addClassElement(ui.CSS.validateFieldBlockClass)
                .addChildBefore(this._buildField())
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
         * @returns {ui.FFHidden}
         * @public
         */
        appendHTML: function(selector) {
            new ui.$(selector).append(this.getElement());
            return this;
        }
    };
} (window.ui || {}));