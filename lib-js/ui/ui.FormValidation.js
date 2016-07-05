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
                    errorBlock.innerHTML = this._textRequred;
                    element.parentNode.classList.add(skinClass);

                } else {

                    if (element.value == '') {

                        res = false;
                        errorBlock.innerHTML = this._textRequred;
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

                //noinspection JSUnfilteredForInLoop
                var element = this._elementsForm.item(key);

                //noinspection JSUnfilteredForInLoop
                if (element.name != '' && !isNaN(Number(key))) {

                    if (this._disableValidator === false) {

                        if (this.validationField(element) === false && element.type !== 'radio') {

                            this.errorField.push(element.name);
                        }
                    }

                    if (element.type === 'checkbox') {

                        if (element.checked) {

                            this.data[element.name] = ui.Config.checkboxValue.checked;

                        } else {

                            this.data[element.name] = ui.Config.checkboxValue.nochecked;
                        }

                    } else if (element.type === 'radio') {

                        if (!radio.hasOwnProperty(element.name)) {

                            radio[element.name] = [element.checked];

                        } else {

                            radio[element.name].push(element.checked);
                        }

                        if (element.checked) {

                            this.data[element.name] = element.value;
                        }

                    } else {

                        this.data[element.name] = element.value;
                    }
                }
            }

            if (this._disableValidator === false) {

                for (var name in radio) {

                    var i = 0;

                    //noinspection JSUnfilteredForInLoop
                    for (var keyRadio in radio[name]) {

                        //noinspection JSUnfilteredForInLoop
                        if (radio[name][keyRadio] == true) {

                            i++;
                        }
                    }

                    if (i == 0) {

                        element = document.querySelector('input[name=' + name + ']');

                        if (this.validationField(element) === false) {

                            this.errorField.push(element.name);
                        }

                    } else {

                        element = document.querySelectorAll('input[name=' + name + ']');

                        for (var keyEl in element) {

                            //noinspection JSUnfilteredForInLoop
                            if (element[keyEl].checked) {

                                //noinspection JSUnfilteredForInLoop
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
            new ui.Ajax()
                .setUrl('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
                .setParams(data['data'])
                .addParam('action', 'save')
                .addCallbackFunction(function(e) {

                    console.log(e);
                })
                .send();

            return true
        },

        /**
         * @returns {boolean}
         */
        remove: function() {

            this._disableValidator = true;
            var data = this.getDataFields();

            //Ajax
            console.log(data);
            return true
        },

        /**
         * @returns {boolean}
         */
        reset: function() {

            document.getElementById(this._idForm).reset();

            for (var key in this._elementsForm) {

                //noinspection JSUnfilteredForInLoop
                var element = this._elementsForm.item(key);
                element.removeAttribute('value');

                //noinspection JSUnfilteredForInLoop
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