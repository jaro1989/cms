
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.Calendar
         * @constructor
         */
        ui.Calendar = function(date) {

            if (typeof date === 'number') {

                this._date   = new Date();
                this._date.setTime(date * 1000);

            } else if (typeof date === 'string') {

                this._date   = new Date(date);

            } else {

                this._date   = new Date();

            }
            this._date.setDate(1);


            this._choiceDay   = null;

            this._currentDate  = new Date();
            this._currentDay   = this._currentDate.getDate();

            this._year  = this._date.getFullYear();
            this._month = this._date.getMonth();
        };

        /** @protected */
        ui.Calendar.prototype = {

            _width: 255,
            _locale: 'ru',
            _language: {
                ru: {
                    choice:  'Выбранный день',
                    current: 'Текущий день',
                    prev:    'Предыдущий месяц',
                    next:    'Следующий месяц',
                    days:    ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СУБ', 'ВС'],
                    month:   ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
                },
                eu: {
                    choice:  'Selected day',
                    current: 'Current day',
                    prev:    'Previous month',
                    next:    'Next month',
                    days:    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    month:   ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]
                }
            },
            _skinSwitchMonth: 'link',
            _monthClass:  'month-calendar',
            _yearClass:   'year-calendar',
            _prevIcon:    'chevron-left',
            _nextIcon:    'chevron-right',
            _skinBtn:     'default',
            _sizeInput:   'sm',
            _fontSizeDays: 10,
            _listId: 'list-years-calendar',
            _parentBlockClass: 'calendar',

            getDaysInMonth: function() {

                var y = this._date.getFullYear();
                var obj = {
                    R: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                    L: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                };

                var month_length = null;

                if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0) {

                    month_length = obj.L[this._date.getMonth()];

                } else {

                    month_length = obj.R[this._date.getMonth()];
                }

                return month_length;
            },

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
                    .addChildBefore(
                        new ui.Element('input')
                            .setTypeElement('text')
                            .setAttrElement('list', this._listId)
                            .addClassElement(this._yearClass)
                            .addClassElement(ui.CSS.formControlClass)
                            .setSizeElement('field', this._sizeInput)
                            .setAttrElement('value', this._year)
                            .setAttrElement('data-year', this._year)
                            .getElement()
                    )
                    .addChildAfter(dataList.getElement())
                    .toHTML();
            },

            _paramsBtnDay: function(day) {

                var skin = [this._skinBtn, null, null];
                var current = this._currentDay === day ? 'danger' : null;
                var choice  = this._choiceDay === day ? 'primary' : null;

                if (current !== null) {

                    skin = [
                        current,
                        ui.CSS.skinClass.default.active,
                        this._language[this._locale]['current']
                    ];
                }

                if (choice !== null) {

                    skin = [
                        choice,
                        ui.CSS.skinClass.default.active,
                        this._language[this._locale]['choice']
                    ];
                }

                return skin;
            },

            _buildHead: function() {

                return new ui.Element('table')
                    .addRowBody(0)
                    .addCellBody(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.btn.btnClass)
                            .setAttrElement('title', this._language[this._locale]['prev'])
                            .setAttrElement('data-prev-month', this._month)
                            .setAttrElement('onclick', 'new ui.Calendar().onChangeCalendar(this);')
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
                            .setAttrElement('data-month', this._month + 1)
                            .setContentElement(this._language[this._locale]['month'][this._month])
                            .toHTML(),
                        2
                    )
                    .addAttrTable('td', 'width', ((this._width - 2) / 2) + 'px')
                    .addCellBody(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.btn.btnClass)
                            .setAttrElement('title', this._language[this._locale]['next'])
                            .setAttrElement('data-next-month', this._month + 2)
                            .setAttrElement('onclick', 'new ui.Calendar().onChangeCalendar(this);')
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

            _buildCell: function(indexDay) {

                var btn_params = this._paramsBtnDay(indexDay);

                return new ui.Element('div')
                        .addClassElement(ui.CSS.btn.btnClass)
                        .setAttrElement('data-day', indexDay)
                        .setSkinElement('button', btn_params[0])
                        .addClassElement(btn_params[1])
                        .setWidthElement('100%')
                        .setAttrElement('title', btn_params[2])
                        .addStyleElement('padding', '4px')
                        .setContentElement(indexDay)
                        .toHTML()
            },

            _buildBody: function() {

                var days = this._language[this._locale]['days'];

                var table = new ui.Element('table')
                    .addRowHead(0)
                    .addStyleTable('tr', 'font-weight', 'bold')
                    .addStyleTable('tr', 'font-size', this._fontSizeDays + 'px');

                for (var index in days) {
                    table
                        .addCellHead(days[index], index)
                        .addAttrTable('th', 'width', ((this._width - 30) / 7))
                        .addAttrTable('th', 'class', ui.CSS.alignClass.text.center);
                }

                var indexDay = 1;
                // Количество дней в месяце
                var month_length = this.getDaysInMonth();
                // День с которого начинается месяц
                var locale_start_say = (this._locale == 'ru' ? 0 : 1);
                var start_day = this._date.getDay() + locale_start_say;


                table.addBlockBody();
                var indexRow = 0;

                table.addRowBody(indexRow);

                // Отрисовка пустых ячеек
                for (var i = 1; i < start_day; i++) {

                    table.addCellBody('', null);
                }

                // Отрисовка ячеек первой строки
                for (var i = start_day; i < 8; i++) {

                    table.addCellBody(
                        this._buildCell(indexDay),
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
                                this._buildCell(indexDay),
                                null
                            )
                            .addStyleTable('td', 'padding', '1px');

                        indexDay++
                    }


                    for (i; i < 8; i++) {

                        table.addCellBody('', null);
                    }

                    indexRow++;
                }

                return table.getElement();
            },

            _buildPanel: function() {

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
                    .getElement();
            },

            _buildParentBlock: function() {

                return new ui.Element('div')
                    .addClassElement(this._parentBlockClass)
                    .addChildAfter(this._buildPanel())
                    .getElement()
            },

            onChangeCalendar: function(element) {

                var trElement = element.parentNode.parentNode;
                var data_year = trElement.querySelector('.' + this._yearClass).value;
                var data_month = trElement.querySelector('.' + this._monthClass).getAttribute('data-month');
                var newDate = new Date(data_year + '-' + data_month + '-01');

                var parentElem = trElement
                    .parentNode
                    .parentNode
                    .parentNode
                    .parentNode
                    .parentNode;

                var month = 1;
                if (element.hasAttribute('data-next-month')) {

                    newDate.setMonth(newDate.getMonth() + 2);
                    month = (newDate.getMonth() != 0) ? newDate.getMonth() : 1;

                } else if (element.hasAttribute('data-prev-month')) {

                    newDate.setMonth(newDate.getMonth());
                    month = (newDate.getMonth() != 0) ? newDate.getMonth() : 12;

                    if (month == 12) {

                        newDate.setFullYear(newDate.getFullYear() - 1);
                    }
                } else if (element.hasAttribute('data-year')) {

                    yy = element.getAttribute('data-year');
                }

                parentElem.replaceChild(
                    new ui.Calendar(newDate.getFullYear() + '-' + month + '-01')._buildPanel(),
                    parentElem.children[0]
                );
            },

            /**
             * Get html current element
             * @returns {string}
             * @public
             */
            toHTML: function() {
                return this._buildParentBlock().outerHTML;
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