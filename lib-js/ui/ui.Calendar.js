
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.Calendar
         * @constructor
         */
        ui.Calendar = function(yyyy, mm, dd) {

            if (Number(yyyy) > 9999) {

                yyyy = 3000;
            }

            this._date = new Date();
            this._date.setFullYear(ui.api.empty(yyyy, this._date.getFullYear()));
            this._date.setMonth(ui.api.empty(mm, this._date.getMonth()));
            this._date.setDate(ui.api.empty(dd, 1));

            this._year  = this._date.getFullYear();
            this._month = this._date.getMonth();

            this._currentDate  = new Date();

            if (this._currentDate.getFullYear() === this._year && this._currentDate.getMonth() === this._month) {
                this._currentDay = this._currentDate.getDate();
            }

            this._choiceDay = ui.api.empty(dd, null);
        };

        /** @protected */
        ui.Calendar.prototype = {


            _x: 400,
            _y: 200,

            _formatUser: ui.Config.formatDateUser,
            _formatSave: ui.Config.formatDateSave,
            _selectorUser: null,
            _selectorSave: null,
            // Текущий день
            _currentDay: null,
            // Выбранный день
            _choiceDay:  null,
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
                    month:   ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                }
            },
            _skinSwitchMonth: 'link',
            _yearClass:   'year-calendar',
            _prevIcon:    'chevron-left',
            _nextIcon:    'chevron-right',
            _skinBtn:     'default',
            _sizeInput:   'sm',
            _fontSizeDays: 10,
            _listId: 'list-years-calendar',
            _parentBlockClass: 'calendar',

            /**
             * Set date in element
             * @param {string|null} selector
             * @returns {ui.Calendar}
             * @public
             */
            addDateUserTo: function(selector) {

                this._selectorUser = ui.api.empty(selector, null);
                return this;
            },

            /**
             * Set date in element
             * @param {string|null} selector
             * @returns {ui.Calendar}
             * @public
             */
            addDateSaveTo: function(selector) {

                this._selectorSave = ui.api.empty(selector, null);
                return this;
            },

            /**
             * Set position left
             * @param {number|null} x
             * @returns {ui.Calendar}
             * @public
             */
            setPositionLeft: function(x) {

                this._x = ui.api.empty(x, null);
                return this;
            },

            /**
             * Set position top
             * @param {number|null} y
             * @returns {ui.Calendar}
             * @public
             */
            setPositionTop: function(y) {

                this._y = ui.api.empty(y, null);
                return this;
            },

            /**
             * Get count day in month
             * @returns {*}
             * @public
             */
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

            /**
             *
             * @param day
             * @returns {null[]}
             * @private
             */
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

            /**
             * Build html input and list help
             * @returns {*|string}
             * @private
             */
            _buildInput: function() {

                var dataList = new ui.Element('datalist')
                    .setIdElement(this._listId, null);

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
                            .addClassElement(ui.CSS.formControlClass)
                            .addClassElement(this._yearClass)
                            .setSizeElement('field', this._sizeInput)
                            .setAttrElement('value', this._year)
                            .setAttrElement('data-action', 'year')
                            .setAttrElement('maxLength', 4)
                            .setAttrElement('onchange', 'new ui.Calendar()._onChangeCalendar(this);')
                            .getElement()
                    )
                    .addChildAfter(dataList.getElement())
                    .toHTML();
            },

            /**
             * Build html icon next or prev
             * @param {string} type 'prev'|'next'
             * @param {string} icon_name
             * @returns {*|string}
             * @private
             */
            _buildIcon: function(type, icon_name) {

                return new ui.Element('div')
                    .addChildAfter(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.btn.btnClass)
                            .setAttrElement('title', this._language[this._locale][type])
                            .setAttrElement('data-action', type)
                            .setAttrElement('onclick', 'new ui.Calendar()._onChangeCalendar(this);')
                            .setSkinElement('button', this._skinSwitchMonth)
                            .addStyleElement('padding', 0)
                            .addChildAfter(
                                new ui.Element('span')
                                    .setIconElement(icon_name)
                                    .getElement()
                            )
                            .getElement()
                    )
                    .toHTML();
            },

            /**
             * Build html month name
             * @returns {*|string}
             * @private
             */
            _buildMonthName: function() {

                return new ui.Element('div')
                    .addClassElement(ui.CSS.alignClass.text.center)
                    .addStyleElement('font-weight', 'bold')
                    .setContentElement(this._language[this._locale]['month'][this._month])
                    .toHTML();
            },

            /**
             *
             * @returns {*|Element}
             * @private
             */
            _buildHead: function() {

                return new ui.Element('table')
                    .addRowBody(0)
                    .addAttrTable('tr', 'data-month', this._month)
                    .addAttrTable('tr', 'data-year', this._year)
                    .addAttrTable('tr', 'date-setDateUser', this._selectorUser)
                    .addAttrTable('tr', 'date-setDateSave', this._selectorSave)

                    // ICON PREVIOUS
                    .addCellBody(this._buildIcon('prev', this._prevIcon), 0)
                    .addAttrTable('td', 'width', '10px')

                    // INPUT YEAR
                    .addCellBody(this._buildInput(), 1)
                    .addAttrTable('td', 'width', ((this._width - 2) / 2) + 'px')

                    // MONTH NAME
                    .addCellBody(this._buildMonthName(), 2)
                    .addAttrTable('td', 'width', ((this._width - 2) / 2) + 'px')

                    // ICON NEXT
                    .addCellBody(this._buildIcon('next', this._nextIcon), 3)
                    .addAttrTable('td', 'width', '10px')

                    .getElement();
            },

            /**
             *
             * @param {number} indexDay
             * @returns {*|string}
             * @private
             */
            _buildCell: function(indexDay) {

                var btn_params = this._paramsBtnDay(indexDay);

                return new ui.Element('div')
                        .addClassElement(ui.CSS.btn.btnClass)
                        .setAttrElement('data-day',   indexDay)
                        .setAttrElement('data-month', this._month)
                        .setAttrElement('data-year',  this._year)
                        .setAttrElement('date-setDateUser', this._selectorUser)
                        .setAttrElement('date-setDateSave', this._selectorSave)
                        .setSkinElement('button', btn_params[0])
                        .addClassElement(btn_params[1])
                        .setWidthElement('100%')
                        .setAttrElement('title', btn_params[2])
                        .addStyleElement('padding', '4px')
                        .setAttrElement('onclick', "new ui.Calendar().setDateIn(this);")
                        .setContentElement(indexDay)
                        .toHTML()
            },

            /**
             *
             * @returns {*|Element}
             * @private
             */
            _buildBody: function() {

                var days = this._language[this._locale]['days'];

                var table = new ui.Element('table')
                    .addRowHead(0)
                    .addStyleTable('tr', 'font-weight', 'bold')
                    .addStyleTable('tr', 'font-size', this._fontSizeDays + 'px');

                for (var index in days) {

                    if (days.hasOwnProperty(index)) {

                        table
                            .addCellHead(days[index], index)
                            .addAttrTable('th', 'width', ((this._width - 30) / 7))
                            .addAttrTable('th', 'class', ui.CSS.alignClass.text.center);
                    }
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
                start_day = (start_day === 0) ? 1 : start_day;
                for (var a = start_day; a < 8; a++) {

                    table.addCellBody(this._buildCell(indexDay), null);

                    indexDay++;
                }

                indexRow++;

                // Отрисовка всех ячеек месяца
                while (indexDay <= month_length) {

                    table.addRowBody(indexRow);

                    for (var c = 1; c <= 7 && indexDay <= month_length; c++) {

                        table.addCellBody(this._buildCell(indexDay), null)
                            .addStyleTable('td', 'padding', '1px');

                        indexDay++
                    }

                    for (c; c < 8; c++) {

                        table.addCellBody('', null);
                    }

                    indexRow++;
                }

                return table.getElement();
            },

            /**
             *
             * @returns {*|Element}
             * @private
             */
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

            /**
             *
             * @returns {*|Element}
             * @private
             */
            _buildParentBlock: function() {

                var parentElement = new ui.Element('div')
                    .addClassElement(this._parentBlockClass)
                    .addChildAfter(this._buildPanel());

                if (this._x !== null || this._y !== null) {

                    parentElement
                        .addStyleElement('position', 'absolute')
                        .addStyleElement('left', (Number(this._x) - (this._width / 2)) + 'px')
                        .addStyleElement('top', (Number(this._y) + 20) + 'px')
                        .addStyleElement('z-index', 10000);
                }

                return parentElement.getElement();
            },

            /**
             * Update calendar
             * @param element
             * @returns voild
             * @private
             */
            _onChangeCalendar: function(element) {

                var parentElement = element.parentNode.parentNode.parentNode;
                var data_year  = parentElement.querySelector('.' + this._yearClass).value;
                var data_month = parentElement.getAttribute('data-month');

                this._selectorUser = parentElement.getAttribute('date-setDateUser');
                this._selectorSave = parentElement.getAttribute('date-setDateSave');

                if (Number(data_year) > 9999) {

                    data_year = 3000;
                }

                var date = new Date(data_year, data_month, 1);

                if (element.hasAttribute('data-action')) {

                    var action = element.getAttribute('data-action');

                    if (action === 'next') {

                        date.setMonth(date.getMonth() + 1);

                    } else if (action === 'prev') {

                        date.setMonth(date.getMonth() - 1);
                    }
                }

                var parentElem = ui.api.findParent(element, '.calendar');

                parentElem.replaceChild(
                    new ui.Calendar(date.getFullYear(), date.getMonth(), 1)
                        .addDateUserTo(this._selectorUser)
                        .addDateSaveTo(this._selectorSave)
                        ._buildPanel(),
                    parentElem.children[0]);
            },

            /**
             * Set date in element input
             * @param {string} element
             */
            setDateIn: function (element) {

                if (element.hasAttribute('data-day')) {

                    var year  = element.getAttribute('data-year');
                    var month = element.getAttribute('data-month');
                    var day   = element.getAttribute('data-day');

                    this._selectorUser = element.getAttribute('date-setDateUser');
                    this._selectorSave = element.getAttribute('date-setDateSave');

                    var date = new Date(year, month, day);
                    var setDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

                    if (this._selectorUser !== null) {

                        document.body.querySelector(this._selectorUser).value = new ui.FormatDate(setDate, this._formatUser).getDate();
                    }

                    if (this._selectorSave !== null) {

                        document.body.querySelector(this._selectorSave).value = new ui.FormatDate(setDate, this._formatSave).getDate();
                    }
                }

                document.body.removeChild(document.body.querySelector('.' + this._parentBlockClass))
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