
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.Modal
         * @constructor
         */
        ui.Modal = function () {

        };

        /** @protected */
        ui.Modal.prototype = {

            /**
             * @type {string|null}
             */
            _title: null,

            /**
             * @type {string|null}
             */
            _content: null,

            /**
             * @param {string} title
             * @returns {ui.Modal}
             */
            setTitle: function(title) {

                this._title = title;
                return this;
            },

            /**
             * @param {string} content
             * @returns {ui.Modal}
             */
            setContent: function(content) {

                this._content = content;
                return this;
            },

            _buildHead: function() {

                var head = new ui.Element('div')
                    .addClassElement(ui.CSS.modal.header)
                    .addChildAfter(
                        new ui.FFButton()
                            .addClass(ui.CSS.modal.close)
                            .setOnClick("new ui.Modal()._removeModal(this);")
                            .addButton(null, null, '&times;', null, null, null)
                            .getElement()
                    );

                if (this._title !== null) {

                    head
                        .addChildAfter(
                            new ui.Element('h4')
                                .setContentElement(this._title)
                                .getElement()
                        );
                }

                return head.getElement();
            },

            _buildBody: function() {

                var body = new ui.Element('div')
                    .addClassElement(ui.CSS.modal.body)
                    .addChildAfter(
                        new ui.Element('p')
                            .setContentElement(ui.api.empty(this._content, ''))
                            .getElement()
                    );

                return body.getElement();
            },

            _buildFoot: function() {

                var foot = new ui.Element('div')
                    .addClassElement(ui.CSS.modal.footer)
                    .addChildAfter(
                        new ui.FFButton()
                            .setOnClick("new ui.Modal()._removeModal(this);")
                            .addButton(null, null, 'ок', 'default', false, null)
                            .setGroup('toolbar')
                            .setPositionBlock('right')
                            .getElement()
                    );

                return foot.getElement();
            },

            _buildModal: function() {

                return new ui.Element('div')
                    .addStyleElement('display', 'block')
                    .addClassElement(ui.CSS.modal.modal)
                    .addChildAfter(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.modal.dialog)
                            .addChildAfter(
                                new ui.Element('div')
                                    .addClassElement(ui.CSS.modal.content)
                                    .addChildAfter(this._buildHead())
                                    .addChildAfter(this._buildBody())
                                    .addChildAfter(this._buildFoot())
                                    .getElement()
                            )
                            .getElement()
                    )
                    .getElement();
            },

            _removeModal: function(element) {

                var modal = ui.api.findParent(element, '.' + ui.CSS.modal.modal);
                modal.remove();
            },

            /**
             * Get object current element
             * @returns {*|Element}
             * @public
             */
            getElement: function() {

                return this._buildModal();
            },

            /**
             * Get html current element
             * @returns {string}
             * @public
             */
            toHTML: function() {

                return this._buildModal().outerHTML;
            },

            /**
             * Add element in document
             * @param {string} selector
             * @returns {ui.Modal}
             * @public
             */
            appendHTML: function(selector) {

                new ui.$(selector).append(this.getElement());
                return this;
            }
        }
    } (window.ui || {}));