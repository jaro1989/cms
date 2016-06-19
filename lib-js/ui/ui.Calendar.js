
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
            _year:      2010,
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
            _minthClass: 'month-calendar',
            _yearClass: 'year-calendar',
            _sizeInput: 'sm',
            _prevIcon: 'chevron-left',
            _nextIcon: 'chevron-right',

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
                            .setContentElement(this._year)
                            .setAttrElement('list', this._listId)
                            .addClassElement(this._yearClass)
                            .addClassElement(ui.CSS.formControlClass)
                            .setSizeElement('field', this._sizeInput)
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
                    .setAttrTable('td', 'width', '10px')
                    .addCellBody(this._buildInput(), 1)
                    .setAttrTable('td', 'width', ((this._width - 2) / 2) + 'px')
                    .addCellBody(
                        new ui.Element('div')
                            .addClassElement('text-center')
                            .addClassElement(this._minthClass)
                            .addStyleElement('fontWeight', 'bold')
                            .setContentElement('Апрель')
                            .toHTML(),
                        2
                    )
                    .setAttrTable('td', 'width', ((this._width - 2) / 2) + 'px')
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
                    .setAttrTable('td', 'width', '10px')
                    .getElement();
            },

            _buildBody: function() {
                var table = new ui.Element('table')
                    .getElement();

                return table;
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