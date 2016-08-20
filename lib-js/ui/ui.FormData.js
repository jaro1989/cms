(function(ui) {

    /**
     * @memberOf ui
     * @namespace ui.FormData
     * @param {string|number} idForm
     * @param {string|null} locale
     * @constructor
     */
    ui.FormData = function (idForm, locale) {

        this._idForm = idForm;
        this._elements = document.getElementById(idForm).elements;
        this.data = {};
        this.errorField = [];
        this._lbl = ui.api.existProperty(ui.Config.lbl, locale, ui.Config.lbl[ui.Config.locale]);
    };

    /** @protected */
    ui.FormData.prototype = {

        check: false,

        /**
         * @returns {ui.FormData}
         */
        checkReq: function() {

            this.check = true;
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
                    errorBlock.innerHTML = '<br/>' + this._lbl.required;
                    element.parentNode.classList.add(skinClass);

                } else {

                    if (element.value == '') {

                        res = false;
                        errorBlock.innerHTML = '<br/>' + this._lbl.required;
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
        getData: function() {

            var radio = {};

            for (var key in this._elements) {

                var element = this._elements.item(key);

                if (element.name != '' && !isNaN(Number(key))) {

                    if (this.check === false) {

                        if (this.validationField(element) === false && element.type !== 'radio') {

                            this.errorField.push(element.name);
                        }
                    }

                    if (element.type === 'checkbox') {

                        if (element.checked) {

                            ui.api.buildObject(this.data, element.name, ui.Config.checkboxValue.checked, 0);

                        } else {

                            ui.api.buildObject(this.data, element.name, ui.Config.checkboxValue.nochecked, 0);
                        }

                    } else if (element.type === 'radio') {

                        if (!radio.hasOwnProperty(element.name)) {

                            radio[element.name] = [element.checked];

                        } else {

                            radio[element.name].push(element.checked);
                        }

                        if (element.checked) {

                            ui.api.buildObject(this.data, element.name, element.value, 0);
                        }

                    } else {

                        ui.api.buildObject(this.data, element.name, element.value, 0);
                    }
                }
            }

            if (this.check === false) {

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
         * @returns {ui.FormData}
         */
        getFormElements: function() {

            return this._elements;
        }
    };
} (window.ui || {}));