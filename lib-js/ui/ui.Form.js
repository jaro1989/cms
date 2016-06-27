    /**
     * @memberOf ui
     * @namespace ui.Form
     * @constructor
     */
    ui.Form = function (group) {

        this._settings = [
            {
                id: {type: 'number'},
                login: {type: 'varchar'},
                name: {type: 'text'}
            },
            {
                email: {type: 'email'},
                phone: {type: 'select', data: [{vaue: '7980498', text: 7980498}, {vaue: '7980422', text: 7980422}]},
                kod: {type: 'text'}
            },
            {
                description: {type: 'textarea'},
                date: {type: 'date'}
            }
        ];

        this._data = {id: 1, login: 'admin', name: 'Валера', email: '1xvx1@mail.ru', phone: '7980498', kod: '029', description: 'text', date: '2008-04-01'};
    };

    /** @protected */
    ui.Form.prototype = {

        _groupFields: 4,

        setGroup: function() {

            this._groupFields = 4;
            return this;
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

            this.data = data;
            return this;
        },

        _buildRow: function() {

            var pareElement = new ui.Element('div');

            for (var index in this._settings) {

                var elementRow = new ui.Element('div')
                    .addClassElement('row');

                for (var field in this._settings[index]) {

                    var countGroup = 12 / Object.keys(this._settings[index]).length;
                    var dataField = this._settings[index][field];
                    var type = dataField.type;

                    var dataList = {};

                    if (dataField.hasOwnProperty('data')) {

                        dataList = dataField.data
                    }

                    if (type == 'textarea') {

                        elementRow.addChildAfter(
                            new ui.Element('div')
                                .setWidthElement(countGroup)
                                .addChildAfter(
                                    new ui.FFTextarea(this._data, field, 'Caption')
                                        .setResize('vertical')
                                        .getElement()
                                )
                                .getElement()
                        );
                    } else if (type == 'date') {

                        elementRow.addChildAfter(
                            new ui.Element('div')
                                .setWidthElement(countGroup)
                                .addChildAfter(
                                    new ui.FFDate(this._data, field, 'Caption')
                                        .getElement()
                                )
                                .getElement()
                        );
                    } else if (type == 'select') {

                        elementRow.addChildAfter(
                            new ui.Element('div')
                                .setWidthElement(countGroup)
                                .addChildAfter(
                                    new ui.FFSelect(this._data, field, 'Caption')
                                        .setList(dataList)
                                        .getElement()
                                )
                                .getElement()
                        );
                    } else {

                        elementRow.addChildAfter(
                            new ui.Element('div')
                                .setWidthElement(countGroup)
                                .addChildAfter(
                                    new ui.FFText(this._data, field, 'Caption')
                                        .getElement()
                                )
                                .getElement()
                        );
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
