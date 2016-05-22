
    (function(HTML) {

        var METHOD = 'POST';

        /**
         * The generator of the basic elements HTML
         *
         * @private
         * @type {HTML.Basis}
         */
        var _basis = new HTML.Basis();

        HTML.Form = function() {

        };

        /** @protected */
        HTML.Form.prototype = {

            _action: null,

            _method: METHOD,

            _content: null,

            /**
             * Return html tag form with contents
             *
             * @param {string} content
             * @returns {*|string}
             */
            _getForm: function(content) {
                return _basis.getTag('form', {action: this._action, method: this._method}, this._content, true);

            },

            /**
             * Set content to html form
             *
             * @param {string} content
             * @returns {HTML.Form}
             */
            setContent: function(content) {
                this._content = _basis.emptyValue(content, '');
                return this;
            },

            /**
             * Method send data to server
             *
             * @param {string} method
             * @returns {HTML.Form}
             */
            setMethod: function(method) {
                this._method = _basis.emptyValue(method, METHOD);
                return this;
            },

            /**
             * Set url for send data to server
             *
             * @param {string} action
             * @returns {HTML.Form}
             */
            setAction: function(action) {
                this._action = _basis.emptyValue(action, null);
                return this;
            },


            /**
             * Compiles and returns HTML block panels
             *
             * @public
             * @returns {*|string}
             */
            toHtml: function() {
                return this._getForm();
            },

            /**
             * Compiles and appends HTML block panels in elements "element"
             *
             * @public
             * @param {string} element
             * @returns {HTML.Collapse}
             */
            appendHtml: function(element) {
                $(element).append(this._getForm());
                return this;
            }
        }

    } (window.HTML || {}));