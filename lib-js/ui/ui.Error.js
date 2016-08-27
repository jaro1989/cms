

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

        this.error.push(
            {
                title: ui.api.empty(title, null),
                content: ui.api.empty(content, null),
                link: ui.api.empty(link, null)
            }
        );

        return this;
    };

    /**
     * @param {{}} data
     * @returns {*|Element}
     * @private
     */
    ui.Error.prototype._buildBlockError = function(data) {

        var error =  new ui.Element('div')
            .addClassElement('alert')
            .addClassElement('alert-warning')
            .addChildAfter(
                new ui.Element('button')
                    .addClassElement('close')
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
                        .addClassElement(data.link ? 'alert-link' : null)
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