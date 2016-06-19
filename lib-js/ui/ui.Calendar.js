
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.Calendar
         * @constructor
         */
        ui.Calendar = function() {

        };

        /** @protected */
        ui.Calendar.prototype = {
            _width: 255,
            _year:  2010,
            _day:   1,
            _month: 'Апрель',
            _language: {
                ru: {
                    prev: 'Предыдущий месяц',
                    next: 'Следующий месяц',
                    days:  ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СУБ', 'ВС'],
                    month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
                }
            },
            _listId: 'list-years-calendar',
            _skinSwitchMonth: 'link',
            _monthClass: 'month-calendar',
            _yearClass:  'year-calendar',
            _prevIcon:   'chevron-left',
            _nextIcon:   'chevron-right',
            _skinBtn:    'default',
            _sizeInput:  'sm',
            _sizeDays:   10,

            _buildInput: function() {

                var dataList = new ui.Element('datalist')
                    .setIdElement(this._listId);

                for (var i = (this._year - 10), last = (this._year + 10); i <= last; i++) {
                    dataList.addChildAfter(
                        new ui.Element('option')
                            .setContentElement(i)
                            .getElement()
                    );
                }

                return new ui.Element('div')
                    .addStyleElement('paddingLeft', '10px')
                    .addChildAfter(
                        new ui.Element('input')
                            .setTypeElement('text')
                            .setAttrElement('list', this._listId)
                            .addClassElement(this._yearClass)
                            .addClassElement(ui.CSS.formControlClass)
                            .setSizeElement('field', this._sizeInput)
                            .setValueElement(this._year, null)
                            .getElement()
                    )
                    .addChildAfter(dataList.getElement())
                    .toHTML();
            },

            _buildHead: function() {

                return new ui.Element('table')
                    .addRowBody(0)
                    .addCellBody(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.btn.btnClass)
                            .setAttrElement('title', this._language.ru.prev)
                            .setSkinElement('button', this._skinSwitchMonth)
                            .addStyleElement('padding', 0)
                            .addChildAfter(
                                new ui.Element('span')
                                    .setIconElement(this._prevIcon)
                                    .getElement()
                            )
                            .toHTML(),
                        0
                    )
                    .addAttrTable('td', 'width', '10px')
                    .addCellBody(this._buildInput(), 1)
                    .addAttrTable('td', 'width', ((this._width - 2) / 2) + 'px')
                    .addCellBody(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.alignClass.text.center)
                            .addClassElement(this._monthClass)
                            .addStyleElement('font-weight', 'bold')
                            .setContentElement(this._month)
                            .toHTML(),
                        2
                    )
                    .addAttrTable('td', 'width', ((this._width - 2) / 2) + 'px')
                    .addCellBody(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.btn.btnClass)
                            .setAttrElement('title', this._language.ru.next)
                            .setSkinElement('button', this._skinSwitchMonth)
                            .addStyleElement('padding', 0)
                            .addChildAfter(
                                new ui.Element('span')
                                    .setIconElement(this._nextIcon)
                                    .getElement()
                            )
                            .toHTML(),
                        3
                    )
                    .addAttrTable('td', 'width', '10px')
                    .getElement();
            },

            _buildBody: function() {

                var days = this._language.ru.days;

                var table = new ui.Element('table')
                    .addRowHead(0)
                    .addStyleTable('tr', 'font-weight', 'bold')
                    .addStyleTable('tr', 'font-size', this._sizeDays + 'px');

                for (var index in days) {
                    table
                        .addCellHead(days[index], index)
                        .addAttrTable('th', 'width', ((this._width - 30) / 7))
                        .addAttrTable('th', 'class', ui.CSS.alignClass.text.center);
                }

                var indexDay = 1;
                var month_length = 31;
                var start_day = 4;

                table.addBlockBody();
                var indexRow = 0;

                table.addRowBody(indexRow);

                // Отрисовка пустых ячеек
                for (var i = 1; i < start_day; i++) {

                    table.addCellBody(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.btn.btnClass)
                            .setSkinElement('button', this._skinBtn)
                            .setWidthElement('100%')
                            .addStyleElement('padding', '4px')
                            .setContentElement('&nbsp;')
                            .toHTML(),
                        null
                    );
                }

                // Отрисовка ячеек первой строки
                for (var i = start_day; i < 8; i++) {

                    table.addCellBody(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.btn.btnClass)
                            .setSkinElement('button', this._skinBtn)
                            .setWidthElement('100%')
                            .addStyleElement('padding', '4px')
                            .setContentElement(indexDay)
                            .toHTML(),
                        null
                    );

                    indexDay++;
                }

                indexRow++;

                // Отрисовка всех ячеек месяца
                while (indexDay <= month_length) {

                    table.addRowBody(indexRow);

                    for (var i = 1; i <= 7 && indexDay <= month_length; i++) {

                        table.addCellBody(
                                new ui.Element('div')
                                    .addClassElement(ui.CSS.btn.btnClass)
                                    .setSkinElement('button', this._skinBtn)
                                    .setWidthElement('100%')
                                    .addStyleElement('padding', '4px')
                                    .setContentElement(indexDay)
                                    .toHTML(),
                                null
                            )
                            .addStyleTable('td', 'padding', '1px');

                        indexDay++
                    }

                    if (i < 8) {

                        for (i; i < 8; i++) {

                            table.addCellBody(
                                new ui.Element('div')
                                    .addClassElement(ui.CSS.btn.btnClass)
                                    .setSkinElement('button', this._skinBtn)
                                    .setWidthElement('100%')
                                    .addStyleElement('padding', '4px')
                                    .setContentElement('&nbsp;')
                                    .toHTML(),
                                null
                            );
                        }
                    }



                    indexRow++;
                }

                return table.getElement();
            },

            _buildParentBlock: function() {

                return new ui.Element('div')
                    .addClassElement(ui.CSS.panelClass.panel)
                    .addClassElement(ui.CSS.skinClass.panel.default)
                    .setWidthElement(this._width + 'px')
                    .addChildBefore(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.panelClass.panelHead)
                            .addChildAfter(this._buildHead())
                            .getElement()
                    )
                    .addChildAfter(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.panelClass.panelBody)
                            .addChildAfter(this._buildBody())
                            .getElement()
                    )
                    .getElement()
            },

            /**
             * Add element in document
             * @param {string} selector
             * @returns {ui.FFDate}
             * @public
             */
            appendHTML: function(selector) {

                new ui.$(selector).append(this._buildParentBlock());
                return this;
            }
        };

    } (window.ui || {}));