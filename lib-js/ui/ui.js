
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

            getIcon: function(iconName) {
                var icon = document.createElement('span');
                icon.className = ui.iconClass + ' ' + ui.iconClass + '-' + iconName;
                return icon;
            },

            getDisabled: function() {

            },

            getClassDisabled: function() {

            }
        };

    } (window.ui || {}));
