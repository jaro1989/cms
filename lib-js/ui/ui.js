
    /**
     *
     * @namespace ui
     */
    ui = {};
    window.ui = ui;

    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.Basis
         * @constructor
         */
        ui.Basis = function() {

        };

        /** @protected */
        ui.Basis.prototype = {

            getId: function() {
                return '';
            },

            getIcon: function() {
                return '';
            },

            getDisabled: function() {

            },

            getClassDisabled: function() {

            }
        };

    } (window.ui || {}));
