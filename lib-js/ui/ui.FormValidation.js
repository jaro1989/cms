(function(ui) {

    /**
     * @memberOf ui
     * @namespace ui.FormValidation
     * @param {string|number} idForm
     * @constructor
     */
    ui.FormValidation = function (idForm) {

        this._idForm = idForm;
        this._elementsForm = document.getElementById(idForm).elements;
        this.data = {};
        this.errorField = [];
    };

    /** @protected */
    ui.FormValidation.prototype = {

        _disableValidator: false,
        _textRequred: ui.Config.errorTextRequred,

        /**
         * @returns {ui.FormValidation}
         */
        setDisableValidator: function() {

            this._disableValidator = true;
            return this;
        },

        /**
         * @param {*} element
         * @returns {boolean}
         */
        validationField: function(element) {

            var res = true;

            if (element.required || element.classList.contains(ui.CSS.requiredClass)) {

                var parentBlock = ui.api.findParent(element, '.' + ui.CSS.validateFieldBlockClass);
                var errorBlock  = parentBlock.querySelector('.' + ui.CSS.validateErrorClass);
                var skinClass   = ui.CSS.prefixClass.field + '-' + ui.CSS.skinClass.default['error'];

                element.parentNode.classList.remove(skinClass);
                errorBlock.innerHTML = '';

                if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {

                    res = false;
                    errorBlock.innerHTML = '<br/>' + this._textRequred;
                    element.parentNode.classList.add(skinClass);

                } else {

                    if (element.value == '') {

                        res = false;
                        errorBlock.innerHTML = '<br/>' + this._textRequred;
                        element.parentNode.classList.add(skinClass);
                    }
                }
            }

            return res;
        },

        /**
         * Get values fields
         * @returns {{fields: {}, validate: []}}
         */
        getDataFields: function() {

            var radio = {};

            for (var key in this._elementsForm) {

                var element = this._elementsForm.item(key);

                if (element.name != '' && !isNaN(Number(key))) {

                    if (this._disableValidator === false) {

                        if (this.validationField(element) === false && element.type !== 'radio') {

                            this.errorField.push(element.name);
                        }
                    }

                    if (element.type === 'checkbox') {

                        if (element.checked) {


                            ui.api.buildObject(this.data, ui.api.parseName(element.name), ui.Config.checkboxValue.checked, 0);
                            //this.data[element.name] = ui.Config.checkboxValue.checked;

                        } else {

                            ui.api.buildObject(this.data, ui.api.parseName(element.name), ui.Config.checkboxValue.nochecked, 0);
                            //this.data[element.name] = ui.Config.checkboxValue.nochecked;
                        }

                    } else if (element.type === 'radio') {

                        if (!radio.hasOwnProperty(element.name)) {

                            radio[element.name] = [element.checked];

                        } else {

                            radio[element.name].push(element.checked);
                        }

                        if (element.checked) {

                            ui.api.buildObject(this.data, ui.api.parseName(element.name), element.value, 0);
                            //this.data[element.name] = element.value;
                        }

                    } else {

                        ui.api.buildObject(this.data, ui.api.parseName(element.name), element.value, 0);
                        //this.data[element.name] = element.value;
                    }
                }
            }

            if (this._disableValidator === false) {

                for (var name in radio) {

                    var i = 0;

                    for (var keyRadio in radio[name]) {

                        if (radio[name][keyRadio] == true) {

                            i++;
                        }
                    }

                    if (i == 0) {

                        element = document.querySelector('input[name="' + name + '"]');

                        if (this.validationField(element) === false) {

                            this.errorField.push(element.name);
                        }

                    } else {

                        element = document.querySelectorAll('input[name="' + name + '"]');

                        for (var keyEl in element) {

                            if (element[keyEl].checked) {

                                this.validationField(element[keyEl]);
                            }
                        }
                    }
                }
            }

            return {
                data: this.data,
                error: this.errorField
            };
        },

        /**
         * @returns {boolean}
         */
        save: function() {

            var data = this.getDataFields();
            var add  = document.getElementById(ui.Config.FORM_URL_ADD).value;
            var edit = document.getElementById(ui.Config.FORM_URL_EDIT).value;
            var record = document.getElementById(ui.Config.FORM_ID_RECORD).value;

            console.log(data);
            if (data.error.length === 0) {

                new ui.Ajax()
                    .setUrl((record == '') ? add : edit)
                    .setParams(data['data'])
                    .addParam('action', (record == '') ? 'save' : 'edit')
                    .addCallbackFunction(function (e) {

                        console.log(e);
                        new ui.Modal()
                            .alert('Данные успешно сохранены!')
                            .appendHTML('body');

                    })
                    .send();
            } else {

                new ui.Modal()
                    .error('Заполните обязательные поля и повторите!')
                    .appendHTML('body');
            }

            return true
        },

        /**
         * @returns {boolean}
         */
        remove: function() {

            var obj = {};
            var urlDel = document.getElementById(ui.Config.FORM_URL_DEL).value;
            var idRecord = document.getElementById(ui.Config.FORM_ID_RECORD).value;
            var fieldRecord = document.getElementById(ui.Config.FORM_FIELD_RECORD).value;

            if (idRecord != '' &&  urlDel != '' && fieldRecord != '') {

                new ui.Modal(true)
                    .setTitle('Подтверждение', null)
                    .addButton('alert(1)', 'Да', null, false, null)
                    .addButton('alert(2)', 'Нет', null, false, null)
                    .setContent('Вы уверенны что хотите удалить?')
                    .appendHTML('body');

                obj[fieldRecord] = idRecord;

                new ui.Ajax()
                    .setUrl(urlDel)
                    .setParams(obj)
                    .addParam('action', 'remove')
                    .addCallbackFunction(function (e) {

                        console.log(e);

                    })
                    .send();
            }

            return true
        },

        /**
         * @returns {boolean}
         */
        reset: function() {

            document.getElementById(this._idForm).reset();

            for (var key in this._elementsForm) {

                var element = this._elementsForm.item(key);
                element.removeAttribute('value');

                if (element.name != '' && !isNaN(Number(key))) {

                    if (element.required || element.classList.contains(ui.CSS.requiredClass)) {

                        var parentBlock = ui.api.findParent(element, '.' + ui.CSS.validateFieldBlockClass);
                        var errorBlock = parentBlock.querySelector('.' + ui.CSS.validateErrorClass);
                        var skinClass = ui.CSS.prefixClass.field + '-' + ui.CSS.skinClass.default['error'];

                        element.parentNode.classList.remove(skinClass);
                        errorBlock.innerHTML = '';
                    }
                }
            }

            return true;
        }
    };
} (window.ui || {}));