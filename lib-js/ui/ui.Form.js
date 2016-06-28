    /**
     * @memberOf ui
     * @namespace ui.Form
     * @constructor
     */
    ui.Form = function (group) {

        this._settings = [
            {
                id: {type: 'text'},
                login: {type: 'text'},
                date: {type: 'date'}
            },
            {
                email: {type: 'text'},
                phone: {type: 'select', list: [{value: '7980498', text: 7980498}, {value: '7980422', text: 7980422}]},
                kod: {type: 'text'}
            },
            {
                description: {type: 'textarea'},
                name: {type: 'text'}
            }
        ];

        this._values = {id: 1, login: 'admin', name: 'Валера', email: '1xvx1@mail.ru', phone: '7980422', kod: '029', description: 'text', date: '2008-04-01'};
    };

    /** @protected */
    ui.Form.prototype = {

        _fields: {

            text: function(value, name, caption, data) {

                return new ui.FFText(value, name, caption)
                    .getElement();
            },

            password: function(value, name, caption, data) {

                return new ui.FFPassword(value, name, caption)
                    .getElement();
            },

            textarea: function(value, name, caption, data) {

                return new ui.FFTextarea(value, name, caption)
                    .setResize('vertical')
                    .getElement();
            },

            date: function(value, name, caption, data) {

                return new ui.FFDate(value, name, caption)
                    .getElement();
            },

            select: function(value, name, caption, data) {

                return  new ui.FFSelect(value, name, caption)
                    .setList(ui.api.existProperty(data, 'list', {}))
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

                for (var nameField in this._settings[index]) {

                    var countGroup = 12 / Object.keys(this._settings[index]).length;
                    var dataField = this._settings[index][nameField];
                    var type = dataField.type;
                    var caption = ui.api.existProperty(dataField, 'caption', null);

                    if (this._fields.hasOwnProperty(type)) {

                        elementRow.addChildAfter(
                            new ui.Element('div')
                                .setWidthElement(countGroup)
                                .addChildAfter(this._fields[type](this._values, nameField, caption, dataField))
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
