
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.Modal
         * @param {boolean} confirm
         * @constructor
         */
        ui.Modal = function(confirm) {

            /**
             * @type {boolean}
             */
            this._confirm = ui.api.empty(confirm, false);

            /**
             * @type {ui.FFButton}
             */
            this._buttons = new ui.FFButton();
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
            _titleSmall: null,

            /**
             * @type {string|null}
             */
            _content: null,

            /**
             * @type {string|null}
             */
            _size: null,

            /**
             * @param {string|null} onclick
             * @param {string|null} caption
             * @param {string|null} skin - { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
             * @param {boolean} active
             * @param {string|null} icon
             */
            addButton: function(onclick, caption, skin, active, icon) {

                this._buttons
                    .setOnClick(onclick)
                    .addButton(
                        null,
                        null,
                        ui.api.empty(caption, null),
                        ui.api.empty(skin, null),
                        ui.api.empty(active, false),
                        ui.api.empty(icon, null)
                    );

                return this;
            },

            /**
             * @param {string} size 'ls' | 'sm'
             * @returns {ui.Modal}
             */
            setSize: function(size) {

                this._size = ui.api.existProperty(ui.CSS.modal.size, size, null);
                return this;
            },

            /**
             * @param {string} title
             * @param {string} title_small
             * @returns {ui.Modal}
             */
            setTitle: function(title, title_small) {

                this._title = title;
                this._titleSmall = title_small;
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
                                .addChildAfter(
                                    new ui.Element('small')
                                        .setContentElement(this._titleSmall)
                                        .getElement()
                                )
                                .getElement()
                        );
                }

                return head.getElement();
            },

            _buildBody: function() {

                return new ui.Element('div')
                    .addClassElement(ui.CSS.modal.body)
                    .setContentElement(ui.api.empty(this._content, ''))
                    .getElement();
            },

            _buildFoot: function() {

                return new ui.Element('div')
                    .addClassElement(ui.CSS.modal.footer)
                    .addChildAfter(this._buildButtons())
                    .getElement();
            },

            _buildButtons: function() {

                if (this._confirm === false) {

                    this._buttons
                        .setOnClick("new ui.Modal()._removeModal(this);")
                        .addButton(null, null, 'ок', 'default', false, null);
                }

                this._buttons
                    .setGroup('toolbar')
                    .setPositionBlock('right');

                return this._buttons.getElement();
            },

            _buildModal: function() {

                return new ui.Element('div')
                    .addStyleElement('display', 'block')
                    .addClassElement(ui.CSS.modal.modal)
                    .addChildAfter(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.modal.dialog)
                            .addClassElement(this._size)
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