    /**
     * @memberOf ui
     * @namespace ui.Form
     * @constructor
     */
    ui.Form = function (group) {

        this._settings = {
            id:          {type: 'number'},
            login:       {type: 'varchar'},
            name:        {type: 'text'},
            email:       {type: 'email'},
            phone:       {type: 'select', item: {'7980498': 7980498, '7980422': 7980422}},
            kod:         {type: 'text'},
            description: {type: 'textarea'},
            date:        {type: 'date'}
        };

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

        /**
         * @returns {{}}
         * @private
         */
        _groupObject: function() {

            var newObj = {};
            var i = 1;
            var a = 0;

            for (field in this._settings) {

                if (!newObj.hasOwnProperty(a)) {

                    newObj[a] = {};
                }

                newObj[a][field] = this._settings[field];

                if (i === 4) {
                    a++;
                    i = 0;
                }
                i++;
            }

            return newObj;
        },

        _buildRow: function() {

            var settings = this._groupObject();
            var pareElement = new ui.Element('div');

            for (var index in settings) {

                var elementRow = new ui.Element('div')
                    .addClassElement('row');

                for (var field in settings[index]) {

                    var type = settings[index][field].type;

                    if (type == 'text') {

                        elementRow.addChildAfter(
                            new ui.Element('div')
                                .setWidthElement(12 / this._groupFields)
                                .addChildAfter(
                                    new ui.FFText(this._data, field, 'Caption')
                                        .getElement()
                                )
                                .getElement()
                        );

                    } else if (type == 'textarea') {

                        elementRow.addChildAfter(
                            new ui.Element('div')
                                .setWidthElement(12 / this._groupFields)
                                .addChildAfter(
                                    new ui.FFTextarea(this._data, field, 'Caption')
                                        .getElement()
                                )
                                .getElement()
                        );

                    } else if (type == 'date') {

                        elementRow.addChildAfter(
                            new ui.Element('div')
                                .setWidthElement(12 / this._groupFields)
                                .addChildAfter(
                                    new ui.FFDate(this._data, field, 'Caption')
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
