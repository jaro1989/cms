
    (function(ui) {
        'use strict';

        var uniqueId = new Date().getTime();

        /**
         * @memberOf ui
         * @namespace ui.Modal
         * @param {string|number|null} id
         * @param {string|null} locale
         * @constructor
         */
        ui.Modal = function(id, locale) {

            this._title = null;
            this._titleSmall = null;
            this._icon = null;
            this._content = null;
            this._size = null;
            this._skin = null;
            this._locale = ui.api.empty(locale, ui.Config.lbl[ui.Config.locale]);
            this._lbl = ui.api.existProperty(ui.Config.lbl, this._locale, ui.Config.lbl[ui.Config.locale]);

            this._buttons = new ui.FFButton();
            this._id = ui.api.empty(id, uniqueId);
            uniqueId++;
        };

        /** @protected */
        ui.Modal.prototype = {

            /**
             * @returns {string|number}
             */
            getId: function() {

                return this._id;
            },

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
                            .setOnClick("new ui.Modal(null, null)._removeModal(this);")
                            .addButton(null, null, '&times;', null, null, null)
                            .getElement()
                    );

                if (this._title !== null) {

                    head
                        .addChildAfter(
                            new ui.Element('h4')
                                .setSkinElement('text', this._skin)
                                .addChildAfter(
                                    new ui.Element('span')
                                        .setIconElement(this._icon)
                                        .getElement()
                                )
                                .addChildAfter(
                                    new ui.Element('span')
                                        .setContentElement(' ' + this._title + ' ')
                                        .getElement()
                                )
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

                this._buttons
                    .setGroup('toolbar')
                    .setPositionBlock('right');

                return this._buttons.getElement();
            },

            _buildModal: function() {

                return new ui.Element('div')
                    .addStyleElement('display', 'block')
                    .addClassElement(ui.CSS.modal.modal)
                    .setIdElement(this._id, null)
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

            /**
             * @param {string} message
             * @returns {ui.Modal}
             */
            alert: function(message) {

                this.removeModal(null);

                this._title = this._lbl.message;
                this._icon  = 'envelope';
                this._skin = ui.CSS.skinClass.default.primary;
                this._content = message;

                this._buttons
                    .setOnClick("new ui.Modal()._removeModal(this);")
                    .addButton(null, null, this._lbl.btn_close, 'default', false, null);

                this.appendHTML('body');
                return this;
            },

            /**
             *
             * @param {string} message
             * @param {string} callbackYes
             * @param {string} callbackNo
             * @returns {ui.Modal}
             */
            confirm: function(message, callbackYes, callbackNo) {

                this.removeModal(null);

                this._title = this._lbl.question;
                this._icon  = 'question-sign';
                this._skin = ui.CSS.skinClass.default.primary;
                this._content = message;

                this._buttons
                    .setOnClick("new ui.Modal()._removeModal(this);" + callbackYes)
                    .addButton(null, null, this._lbl.btn_yes, 'default', false, null)
                    .setOnClick("new ui.Modal()._removeModal(this);" + callbackNo)
                    .addButton(null, null, this._lbl.btn_no, 'default', false, null);

                this.appendHTML('body');
                return this;
            },

            /**
             * @param {string} message
             * @returns {ui.Modal}
             */
            error: function(message) {

                this.removeModal(null);

                this._title = this._lbl.error;
                this._icon  = 'ban-circle';
                this._skin = ui.CSS.skinClass.default.danger;
                this._content = message;

                this._buttons
                    .setOnClick("new ui.Modal()._removeModal(this);")
                    .addButton(null, null, this._lbl.btn_yes, 'default', false, null);

                this.appendHTML('body');
                return this;
            },

            _removeModal: function(element) {

                var modal = ui.api.findParent(element, '.' + ui.CSS.modal.modal);
                modal.remove();
            },

            /**
             * @param {string|number|null} idModal
             * @returns {ui.Modal}
             */
            removeModal: function(idModal) {

                var modal = document.getElementById(ui.api.empty(idModal, this._id));

                if (modal) {

                    modal.remove();
                }

                return this;
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
             * @param {string|number|null} selector
             * @returns {ui.Modal}
             * @public
             */
            appendHTML: function(selector) {

                new ui.dom(selector)
                    .append(this.getElement());

                return this;
            }
        }
    } (window.ui || {}));