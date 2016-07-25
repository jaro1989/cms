
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.Progress
         * @constructor
         */
        ui.Progress = function() {

        };

        /** @protected */
        ui.Progress.prototype = {


            _progress: function() {

                return new ui.Element('div')
                    .addClassElement(ui.CSS.progress.progress)
                    .addClassElement(ui.CSS.progress.striped)
                    .addChildAfter(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.progress.bar)
                            .addStyleElement('width', '50%')
                            .getElement()
                    )
                    .getElement();
            }
        }

    } (window.ui || {}));