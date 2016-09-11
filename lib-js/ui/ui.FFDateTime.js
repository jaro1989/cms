
(function(ui) {
    'use strict';
    var inputClassBlock = 'block-field-date';
    /**
     * @memberOf ui
     * @namespace ui.FFDateTime
     * @param {string|null} value
     * @param {string|null} name
     * @param {string|null} caption
     * @constructor
     */
    ui.FFDateTime = function (value, name, caption) {

        ui.FFDate.apply(this, [value, name, caption]);

        this._formatDateUser = ui.Config.formatDateTimeUser;
        this._formatDateSave = ui.Config.formatDateTimeSave;
        this._time = true;
    };

    ui.FFDateTime.prototype = Object.create(ui.FFDate.prototype);

    ui.FFDateTime.prototype.constructor = ui.FFDateTime;

    /**
     *
     * @returns {*|Element}
     * @private
     */
    ui.FFDateTime.prototype._buildButtons = function() {

        var FFDate = "new ui.FFDateTime()";
        FFDate += ".setDateFormatUser('" + this._formatDateUser + "')";
        FFDate += ".setDateFormatSave('" + this._formatDateSave + "')";

        return new ui.Element('div')
            .addClassElement(ui.CSS.btn.btnGroup.group)
            .setWidthElement(7)
            .addChildAfter(
                new ui.FFButton()
                    .setOnClick(FFDate + '._setCurrentDate(this);')
                    .addButton(null, null, null, null, this._activeBtn, ui.Config.iconBtnDate.currentDate)
                    .setWidth('120px')
                    .setOnClick(FFDate + "._calendar(this, '" + this._id + "');")
                    .addButton(null, null, null, null, this._activeBtn, ui.Config.iconBtnDate.calendarDate)
                    .setWidth('120px')
                    .setOnClick(FFDate + '._clearDate(this);')
                    .addButton(null, null, null, null, this._activeBtn, ui.Config.iconBtnDate.removeDate)
                    .setWidth('120px')
                    .setPaddingBlock(null)
                    .setGroup('justified')
                    .setSize(this._size)
                    .getElement()
            )
            .getElement();
    };

    /**
     * @param {Element} e
     * @param {string} selectorParentField <div id="selectorParentField"><input type="text"><input type="hidden"></div>
     * @private
     */
    ui.FFDateTime.prototype._calendar = function(e, selectorParentField) {

        var parentElement = ui.api.findParent(e, '.' + inputClassBlock);
        var findDate = parentElement.querySelector('#' + selectorParentField + ' > input[type=hidden]').value;

        var date = new Date();

        if (findDate != '') {

            date = new Date(findDate);
        }

        new ui.Calendar(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
            .setFormatUser(this._formatDateUser)
            .setFormatSave(this._formatDateSave)
            .setTime(this._time)
            .addDateUserTo('#' + selectorParentField + ' > input[type=text]')
            .addDateSaveTo('#' + selectorParentField + ' > input[type=hidden]')
            .appendHTML('body');
    };
} (window.ui || {}));