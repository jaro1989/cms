
(function(ui) {

    var uniqueId = new Date().getTime();

    /**
     * @memberOf ui
     * @namespace ui.Progress
     * @param {string|number|null} id
     * @constructor
     */
    ui.Progress = function(id) {

        /**
         * @type {string|number}
         */
        this._id = ui.api.empty(id, uniqueId);
        uniqueId++;
    };

    /** @protected */
    ui.Progress.prototype = {

        /**
         * @type {string|null}
         */
        _skin: null,

        /**
         * @returns {string|number}
         */
        getId: function() {

            return this._id;
        },

        /**
         * @returns {ui.Progress}
         */
        _buildProgress: function() {

            return new ui.Element('div')
                .setIdElement(this._id, null)
                .addClassElement(ui.CSS.progress.progress)
                .addClassElement(ui.CSS.progress.striped)
                .addClassElement(ui.CSS.progress.active)
                .addChildAfter(
                    new ui.Element('div')
                        .addClassElement(ui.CSS.progress.bar)
                        .addStyleElement('width', '1%')
                        .getElement()
                )
                .getElement();
        },

        /**
         * @param {number} time
         * @returns {ui.Progress}
         */
        updateProgress: function(time) {

            var Progress = document.getElementById(this._id);
            var progress = Progress.querySelector('.' + ui.CSS.progress.bar);
            progress.style['width'] = time + '%';

            return this;
        },

        /**
         * @returns {ui.Progress}
         */
        setProgress: function() {

            this.appendHTML('body');
            return this;
        },

        /**
         * @param {string|number|null} idProgress
         * @returns {ui.Progress}
         */
        removeProgress: function(idProgress) {

            var progress = document.getElementById(ui.api.empty(idProgress, this._id));

            if (progress) {
                progress.remove();
            }

            return this;
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {

            return this._buildProgress();
        },

        /**
         * Get html current element
         * @returns {string}
         * @public
         */
        toHTML: function() {

            return this._buildProgress().outerHTML;
        },

        /**
         * Add element in document
         * @param {string|number|null} selector
         * @returns {ui.Progress}
         * @public
         */
        appendHTML: function(selector) {

            new ui.$(selector).append(this.getElement());
            return this;
        }
    }
} (window.ui || {}));