

(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.Error
     * @constructor
     */
    ui.Error = function () {

        this.error = [];
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Error}
     */
    ui.Error.prototype.addError = function(title, content, link) {

        this._addParams('danger', title, content, link);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Error}
     */
    ui.Error.prototype.addInfo = function(title, content, link) {

        this._addParams('info', title, content, link);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Error}
     */
    ui.Error.prototype.addSuccess = function(title, content, link) {

        this._addParams('success', title, content, link);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Error}
     */
    ui.Error.prototype.addWarning = function(title, content, link) {

        this._addParams('warning', title, content, link);
        return this;
    };

    /**
     * @param {string|null} skin
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Error}
     */
    ui.Error.prototype._addParams = function(skin, title, content, link) {

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
    ui.Error.prototype._buildBlockError = function(data) {

        var error =  new ui.Element('div')
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

            error
                .addChildAfter(
                    new ui.Element('strong')
                        .setContentElement(data.title + ' ')
                        .getElement()
                );
        }

        if (data.content) {

            var tag = data.link ? 'a' : 'span';

            error
                .addChildAfter(
                    new ui.Element(tag)
                        .setUrlElement(data.link)
                        .addClassElement(data.link ? ui.CSS.alert.link : null)
                        .setContentElement(data.content)
                        .getElement()
                );
        }

        return error.getElement();
    };

    /**
     * Build html prent block
     * @returns {*|Element}
     * @private
     */
    ui.Error.prototype._buildParentBlock = function() {

        var error =  new ui.Element('div')
            .addClassElement('errors');

        for (var key in this.error) {

            error.addChildBefore(this._buildBlockError(this.error[key]));
        }

        return error.getElement();
    };

    /**
     * Get object current element
     * @returns {*|Element}
     * @public
     */
    ui.Error.prototype.getElement = function() {

        return this._buildParentBlock();
    };

    /**
     * Get html current element
     * @returns {string}
     * @public
     */
    ui.Error.prototype.toHTML = function() {

        if (this.error.length > 0) {

            return this._buildParentBlock().outerHTML;
        }

        return '';
    };

    /**
     * Add element in document
     * @param {string} selector
     * @returns {ui.Error}
     * @public
     */
    ui.Error.prototype.appendHTML = function(selector) {

        if (this.error.length > 0) {

            new ui.dom(selector).append(this.getElement());
        }

        return this;
    };
} (window.ui || {}));