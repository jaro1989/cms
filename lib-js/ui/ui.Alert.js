

(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.Alert
     * @constructor
     */
    ui.Alert = function () {

        this.error = [];
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Alert}
     */
    ui.Alert.prototype.addError = function(title, content, link) {

        this._addParams('danger', title, content, link);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Alert}
     */
    ui.Alert.prototype.addInfo = function(title, content, link) {

        this._addParams('info', title, content, link);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Alert}
     */
    ui.Alert.prototype.addSuccess = function(title, content, link) {

        this._addParams('success', title, content, link);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Alert}
     */
    ui.Alert.prototype.addWarning = function(title, content, link) {

        this._addParams('warning', title, content, link);
        return this;
    };

    /**
     * @param {string|null} skin
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Alert}
     */
    ui.Alert.prototype._addParams = function(skin, title, content, link) {

        if (ui.api.empty(content, null)) {

            this.error.push(
                {
                    skin: ui.CSS.alert.skin[skin],
                    title: ui.api.empty(title, null),
                    content: content,
                    link: ui.api.empty(link, null)
                }
            );
        }

        return this;
    };

    /**
     * @param {{}} data
     * @returns {*|Element}
     * @private
     */
    ui.Alert.prototype._buildBlockAlert = function(data) {

        var Alert =  new ui.Element('div')
            .addClassElement(ui.CSS.alert.alert)
            .addClassElement(data.skin)
            .addChildAfter(
                new ui.Element('button')
                    .addClassElement(ui.CSS.btnClose)
                    .setContentElement('&times;')
                    .setOnClick('this.parentNode.remove()')
                    .getElement()
            );

        if (data.title) {

            Alert
                .addChildAfter(
                    new ui.Element('strong')
                        .setContentElement(data.title + ' ')
                        .getElement()
                );
        }

        if (data.content) {

            var tag = data.link ? 'a' : 'span';

            Alert
                .addChildAfter(
                    new ui.Element(tag)
                        .setUrlElement(data.link)
                        .addClassElement(data.link ? ui.CSS.alert.link : null)
                        .setContentElement(data.content)
                        .getElement()
                );
        }

        return Alert.getElement();
    };

    /**
     * Build html prent block
     * @returns {*|Element}
     * @private
     */
    ui.Alert.prototype._buildParentBlock = function() {

        var alert =  new ui.Element('div')
            .addClassElement('errors');

        for (var key in this.error) {

            alert.addChildBefore(this._buildBlockAlert(this.error[key]));
        }

        return alert.getElement();
    };

    /**
     * Get object current element
     * @returns {*|Element}
     * @public
     */
    ui.Alert.prototype.getElement = function() {

        return this._buildParentBlock();
    };

    /**
     * Get html current element
     * @returns {string}
     * @public
     */
    ui.Alert.prototype.toHTML = function() {

        if (this.error.length > 0) {

            return this._buildParentBlock().outerHTML;
        }

        return '';
    };

    /**
     * Add element in document
     * @param {string} selector
     * @param {boolean} before
     * @returns {ui.Alert}
     * @public
     */
    ui.Alert.prototype.appendHTML = function(selector, before) {

        if (this.error.length > 0) {

            if (before) {

                new ui.dom(selector).before(this.getElement());

            } else {

                new ui.dom(selector).append(this.getElement());
            }
        }

        return this;
    };
} (window.ui || {}));