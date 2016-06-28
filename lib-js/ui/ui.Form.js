    /**
     * @memberOf ui
     * @namespace ui.Form
     * @constructor
     */
    ui.Form = function () {

        this._settings = [
            {
                id:    {type: 'checkbox', caption: 'Record-ID'},
                login: {type: 'text',     caption: 'Логин'},
                date:  {type: 'date',     caption: 'Дата'}
            },
            {
                email: {type: 'text',   caption: 'Email'},
                phone: {type: 'select', caption: 'Телефон', list: [{value: '7980498', text: 7980498}, {value: '7980422', text: 7980422}]},
                kod:   {type: 'text',   caption: 'Код'}
            },
            {
                description: {type: 'textarea', caption: 'Описание'},
                name: {type: 'text', caption: 'Название'}
            },
            {
                radio_1: {
                    type: 'radio',
                    list: {
                        r_1: 'radio_1',
                        r_2: 'radio_2',
                        r_3: 'radio_3'
                    }
                }
            }
        ];

        this._values = {
            id: 1,
            login: 'admin',
            name: 'Валера',
            email: '1xvx1@mail.ru',
            phone: '7980422',
            kod: '029',
            description: 'text',
            date: '2008-04-01',
            checkbox_1: 1,
            checkbox_2: 0,
            checkbox_3: 1,
            checkbox_4: 0,
            radio_1: 'r_2'
        };
    };

    /** @protected */
    ui.Form.prototype = {

        _htmlFields: {

            text: function(value, name, caption) {

                return new ui.FFText(value, name, caption)
                    .getElement();
            },

            password: function(value, name, caption) {

                return new ui.FFPassword(value, name, caption)
                    .getElement();
            },

            textarea: function(value, name, caption) {

                return new ui.FFTextarea(value, name, caption)
                    .setResize('vertical')
                    .getElement();
            },

            date: function(value, name, caption) {

                return new ui.FFDate(value, name, caption)
                    .getElement();
            },

            select: function(value, name, caption, data) {

                var dataList = ui.api.existProperty(data, 'list', {});

                return  new ui.FFSelect(value, name, caption)
                    .setList(dataList)
                    .getElement();
            },

            checkbox: function(value, name, caption, data) {

                return new ui.FFCheckbox()
                    .addCheckbox(value, name, caption)
                    .setFieldsHorizontal()
                    .getElement();
            },

            radio: function(value, name, caption, data) {

                var dataList = ui.api.existProperty(data, 'list', {});

                return  new ui.FFRadio(value, name, dataList)
                    .setFieldsHorizontal()
                    .getElement();
            }
        },

        /**
         * @param field
         * @param {string} type text|textarea|date|checkbox|radio
         * @param {{}} data
         * @returns {ui.Form}
         * @public
         */
        setTypeField: function(field, type, data) {

            this._settings[field] = {type: type, data: data};
            return this;
        },

        setFormatDate: function() {
            return this;
        },

        /**
         *
         * @param {{}} data
         * @returns {ui.Form}
         */
        setDataValues: function(data) {

            this._values = data;
            return this;
        },

        _buildRow: function() {

            var pareElement = new ui.Element('div');

            for (var index in this._settings) {

                var elementRow = new ui.Element('div')
                    .addClassElement('row');

                if (this._settings.hasOwnProperty(index)) {

                    for (var nameField in this._settings[index]) {

                        var countGroup = 12 / Object.keys(this._settings[index]).length;
                        var dataField = this._settings[index][nameField];
                        var type = dataField.type;
                        var caption = ui.api.existProperty(dataField, 'caption', null);

                        if (this._htmlFields.hasOwnProperty(type)) {

                            elementRow.addChildAfter(
                                new ui.Element('div')
                                    .setWidthElement(countGroup)
                                    .addChildAfter(this._htmlFields[type](this._values, nameField, caption, dataField))
                                    .getElement()
                            );
                        }
                    }
                }

                pareElement.addChildAfter(elementRow.getElement());
            }

            return pareElement.getElement();
        },

        _buildForrm: function() {

            return new ui.Element('form')
                .setAttrElement('action', '')
                .setAttrElement('method', '')
                .setIdElement(this._id)
                .addChildAfter(this._buildRow())
                .getElement();
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {
            return this._buildForrm();
        },

        /**
         * Get html current element
         * @returns {string}
         * @public
         */
        toHTML: function() {
            return this._buildForrm().outerHTML;
        },

        /**
         * Add element in document
         * @param {string} selector
         * @returns {ui.FFDate}
         * @public
         */
        appendHTML: function(selector) {

            new ui.$(selector).append(this.getElement());
            return this;
        }
    };
