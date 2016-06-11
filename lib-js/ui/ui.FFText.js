
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.FFText
         * @constructor
         */
        ui.FFText = function (value, name) {
            this.name  = name;
            this.value = value;
        };

        /** @protected */
        ui.FFText.prototype = {

            _leftMarker: null,

            _rightMarker: null,

            setLeftMarker: function(marker) {

            },

            setRightMarker: function(marker) {

            },

            _buildHtmlInput: function() {
                return new ui.Element('div')
                    .setWidthElement('200px')
                    .addChildBefore(
                        new ui.Element('input')
                            .setTypeElement('text')
                            .setNameElement(this.name)
                            .setValueElement(this.value)
                            .addClassElement(ui.CSS.formControlClass)
                            .getElement()
                    )
                    .getElement()
            },

            /**
             *
             * @returns {ui.FFText}
             */
            toHTML: function() {
                return this;
            },

            appendHTML: function(selector) {
                new ui.$(selector).append(this._buildHtmlInput());
                return this;
            }
        };
    } (window.ui || {}));