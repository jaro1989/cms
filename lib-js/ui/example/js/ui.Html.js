    /**
     * @namespace ui
     * @type {{}}
     */
    ui = {};
    window.ui = ui;

    (function(ui) {
        'use strict';

        /**
         * @memberOf ui
         * @namespace ui.Config
         */
        ui.Config = {

            widthField: '300px',

            padding: 'sm',

            label: {
                required: '*',
                separator: ':',
                colorStar: '#F00'
            },
            radioValue:    {
                'checked':   1,
                'nochecked': 0
            },

            checkboxValue: {
                'checked':   1,
                'nochecked': 0
            },

            checkboxText: {
                0: 'Нет',
                1: 'Да'
            },

            valuePassword: '*********',

            formatDateUser: 'DD.MM.YYYY',
            formatDateSave: 'YYYY-MM-DD',
            formatDateTimeUser: 'DD.MM.YYYY HH:MI:SS',
            formatDateTimeSave: 'YYYY-MM-DD HH:MI:SS',
            separatorDate: ['.', '-', '/', ':'],

            iconBtnDate: {
                currentDate:      'check',
                calendarDate:     'calendar',
                removeDate:       'remove-sign',
                calendarDateTime: 'time'
            },

            defaultMethodForm: 'POST',
            defaultMethodAjax: 'POST',

            skinProgress: 'success',

            noimg: 'images/no-image.png',
            locale: 'ru',

            lbl: {
                ru: {
                    btn_save: 'Сохранить',
                    btn_remove: 'Удалить',
                    btn_clear: 'Очистить',
                    btn_back: 'Назад',
                    btn_add: 'Добавить',
                    btn_list: 'Список',
                    btn_trash: 'Корзина',
                    btn_search: 'Найти',
                    btn_close: 'Закрыть',
                    btn_cancel: 'Отмена',
                    btn_yes: 'Да',
                    btn_no: 'Нет',
                    btn_ok: 'Ок',
                    error: 'Ошибка',
                    message: 'Сообщение',
                    question: 'Вопрос',
                    noimg: 'Картинка не найдена',
                    required: 'Обязательное поле'
                },
                eu: {
                    btn_save: 'Save',
                    btn_remove: 'Delete',
                    btn_clear: 'Clear',
                    btn_back: 'Back',
                    btn_add: 'Add',
                    btn_list: 'List',
                    btn_trash: 'Trash',
                    btn_search: 'Find',
                    btn_close: 'Close',
                    btn_cancel: 'Cancel',
                    btn_yes: 'Yes',
                    btn_no: 'No',
                    btn_ok: 'Ok',
                    error: 'Error',
                    message: 'Message',
                    question: 'Question',
                    noimg: 'Picture not found',
                    required: 'Required field'
                }
            }
        };

    } (window.ui || {}));

    (function(ui) {
        'use strict';

        /**
         * Edit string date from "2000-1-1 00:00:00" to "2000-01-01 00:00:00" or
         *                       "2000-1-1"          to "2000-01-01 00:00:00"
         * @param {string} date
         * @returns {{string: '2000-01-01 00:00:00', array: ['2000', '01', '01', '00', '00', '00']}}
         */
        function editDate(date) {

            if (ui.api.empty(date, null) !== null) {

                var newDate = '';
                var arrParseDate = [];

                var arr = date.split(' ');

                var countArr = arr.length;
                var separatorDate = ui.Config.separatorDate;
                var countSeparator = separatorDate.length;

                for (var i = 0; i < countArr; i++) {

                    for (var a = 0; a < countSeparator; a++) {

                        if (typeof arr[i] === 'string' && ~arr[i].indexOf(separatorDate[a])) {

                            var arrOldDate = arr[i].split(separatorDate[a]);

                            for (var key in arrOldDate) {



                                if (arrOldDate[key].length == 1) {

                                    newDate += '0' + arrOldDate[key] + separatorDate[a];
                                    arrParseDate.push('0' + arrOldDate[key]);

                                } else {

                                    newDate += arrOldDate[key] + separatorDate[a];
                                    arrParseDate.push(arrOldDate[key]);
                                }
                            }

                            newDate = ui.api.trim(newDate, separatorDate[a]) + ' ';
                        }
                    }
                }
            }

            if (countArr == 1) {

                arrParseDate.push('00');
                arrParseDate.push('00');
                arrParseDate.push('00');
            }

            if (newDate == '') {

                newDate = date;
            }

            if (newDate.length < 20) {

                newDate += '00:00:00';
            }

            return {string: ui.api.trim(newDate, ' '), array: arrParseDate};
        }

        /**
         * @memberOf ui
         * @namespace ui.FormatDate
         * @constructor
         */
        ui.FormatDate = function(date, format) {

            (typeof format === 'string') ? this._format = format : this._format = ui.Config.formatDateTimeSave;
            this._arrFormatDate = [];
            this._arrFormatTime = [];
            this._keysFormat    = {};
            this._separator     = ui.Config.separatorDate;

            if (typeof date === 'number') {

                this._date   = new Date();
                this._date.setTime(date * 1000);

            } else if (typeof date === 'string' && date !== '') {

                var newDare = editDate(date)['array'];

                this._date   = new Date(newDare[0], (newDare[1] - 1), newDare[2], newDare[3], newDare[4], newDare[5]);

            } else {

                this._date   = null;
            }
        };

        /** @protected */
        ui.FormatDate.prototype = {

            _separatorDate: null,
            _separatorTime: null,
            _strDate: null,

            _getKeyFormat: function() {

                var year =   this._date.getFullYear();
                var month =  this._date.getMonth() + 1;
                var numDay = this._date.getDate();
                var hour =   this._date.getHours();
                var minute = this._date.getMinutes();
                var second = this._date.getSeconds();

                this._keysFormat = {
                    yyyy: year,
                    yy: String(year).substring((String(year).length - 2)),
                    mm: (month  < 10) ? "0" + month  : month,
                    dd: (numDay < 10) ? "0" + numDay : numDay,
                    hh: (hour   < 10) ? "0" + hour   : hour,
                    mi: (minute < 10) ? "0" + minute : minute,
                    ss: (second < 10) ? "0" + second : second
                };

                return this._keysFormat;
            },

            /**
             * Parse date format and build new array with keys
             *
             * @returns {*[]}
             * @private
             */
            _parseFormat: function() {

                var arr = this._format.toLowerCase().split(' ');
                var countSeparator = this._separator.length;

                for (var a = 0; a < countSeparator; a++) {

                    if (typeof arr[0] === 'string' && ~arr[0].indexOf(this._separator[a])) {

                        this._arrFormatDate = arr[0].split(this._separator[a]);
                        this._separatorDate = this._separator[a];
                    }
                }

                for (var b = 0; b < countSeparator; b++) {

                    if (typeof arr[1] === 'string' && ~arr[1].indexOf(this._separator[b])) {

                        var time = arr[1].split(this._separator[b]);
                        var lenArr = time.length;

                        for (var i = 0; i < lenArr; i++) {

                            this._arrFormatTime.push(time[i]);
                        }

                        this._separatorTime = this._separator[b];
                    }
                }

                return [this._arrFormatDate, this._arrFormatTime];
            },

            /**
             * Build string date in format
             *
             * @returns {null}
             * @private
             */
            _buildStringDate: function() {

                this._getKeyFormat();
                this._parseFormat();

                var strDate = '';
                var strTime = '';

                for(var d in this._arrFormatDate) {

                    if (this._keysFormat.hasOwnProperty(this._arrFormatDate[d])) {

                        strDate += this._keysFormat[this._arrFormatDate[d]];
                        strDate += this._separatorDate;
                    }
                }

                for(var t in this._arrFormatTime) {

                    if (this._keysFormat.hasOwnProperty(this._arrFormatTime[t])) {

                        strTime += this._keysFormat[this._arrFormatTime[t]];
                        strTime += this._separatorTime;
                    }
                }

                var date = strDate.substring(0, strDate.length - 1);
                var time = strTime.substring(0, strTime.length - 1);

                this._strDate = (date + ' ' + time).replace(/\s{2,}/g, ' ').trim();

                return this._strDate;
            },

            /**
             * Generate string date in format
             *
             * @public
             * @returns {string}
             */
            getDate: function() {

                if (this._date !== null) {

                    return this._buildStringDate();
                }

                return null;
            },

            /**
             * Generate string current date in format
             *
             * @public
             * @returns {string}
             */
            getCurrentDate: function() {

                this._date   = new Date();
                return this._buildStringDate();
            }
        };
    } (window.ui || {}));


    (function(ui) {
        'use strict';

        /**
         * @memberOf ui
         * @namespace ui.CSS
         */
        ui.CSS = {

            /**
             * @public
             * @type {*}
             */
            readOnlyMaxHeight: 'read-only-max-height',

            /**
             * @public
             * @type {*}
             */
            page: {
                main: 'main',
                header: 'page-header'
            },

            /**
             * @public
             * @type {*}
             */
            newLine: 'row',

            /**
             * @public
             * @type {*}
             */
            iconClass: 'glyphicon',

            /**
             * @public
             * @type {*}
             */
            widthClass: 'col-md',

            /**
             * @public
             * @type {*}
             */
            inputGroupClass: 'input-group',

            /**
             * @public
             * @type {*}
             */
            inputGroupAddonClass: 'input-group-addon',

            /**
             * @public
             * @type {*}
             */
            formGroupClass: 'form-group',

            /**
             * @public
             * @type {*}
             */
            formControlClass: 'form-control',

            /**
             * @public
             * @type {*}
             */
            controlLabelClass: 'control-label',

            /**
             * @public
             * @type {*}
             */
            inputGroupBtnClass: 'input-group-btn',

            /**
             * @public
             * @type {*}
             */
            disabledClass: 'disabled',

            /**
             * @public
             * @type {*}
             */
            requiredClass: 'required',

            /**
             * @public
             * @type {*}
             */
            validateErrorClass: 'validate-error',

            /**
             * @public
             * @type {*}
             */
            validateFieldBlockClass: 'validate-field-block',

            /**
             * @public
             * @type {*}
             */
            formBlockHiddenClass: 'form-hidden-data',

            /**
             * @public
             * @type {*}
             */
            checkedClass: 'checked',

            /**
             * @public
             * @type {*}
             */
            satrClass: 'star',

            /**
             * @public
             * @type {*}
             */
            radioClass: 'radio',

            /**
             * @public
             * @type {*}
             */
            radioInlineClass: 'radio-inline',

            /**
             * @public
             * @type {*}
             */
            checkboxClass: 'checkbox',

            /**
             * @public
             * @type {*}
             */
            checkboxInlineClass: 'checkbox-inline',

            alert: {
                alert: 'alert',
                link: 'alert-link',
                skin: {
                    warning: 'alert-warning',
                    info: 'alert-info',
                    success: 'alert-success',
                    danger: 'alert-danger'
                }
            },

            /**
             * @public
             * @type { {btnClass: *, btnGroupClass: *, btnGroup: { group: *, toolbar: *, vertical: *, justified: * } } }
             */
            btn: {
                btnClass: 'btn',
                btnBlockClass: 'btn-block',
                btnGroup: {
                    group:     'btn-group',
                    toolbar:   'btn-toolbar',
                    vertical:  'btn-group-vertical',
                    justified: 'btn-group-justified'
                }
            },

            /**
             * @public
             * @type { { striped: *, bordered: *, borderedNone: *, hover: *, condensed: * } } }
             */
            tableClass: {
                table: 'table',
                skin: {
                    bordered: 'table-bordered',
                    default:  'table-bordered-none'
                },
                striped:    'table-striped',
                condensed:  'table-condensed',
                hover:      'table-hover',
                responsive: 'table-responsive',
                rowNum:     'table-row-number'
            },

            /**
             * @public
             * @type { { text: { right: *, center: * }, block: { clear: *, left: *, right: *, center: * } } }
             */
            alignClass: {
                text: {
                    right:  'text-right',
                    center: 'text-center'
                },
                block: {
                    clear:  'clearfix',
                    left:   'pull-left',
                    right:  'pull-right',
                    center: 'center-block'
                }
            },

            /**
             * @public
             * @type { { field: *, text: *, button: * } }
             */
            prefixClass: {
                field: 'has',
                text:  'text',
                button:  'btn'
            },

            /**
             * @public
             * @type { { panel: *, panelBody: *, panelFoot: *, panelHead: *, panelTitle: * } }
             */
            panelClass: {
                panel:      'panel',
                panelBody:  'panel-body',
                panelFoot:  'panel-footer',
                panelHead:  'panel-heading',
                panelTitle: 'panel-title'
            },

            /**
             * @public
             * @type { { default: {disabled: *, active: *, success: *, warning: *, danger: *, info: *, link: *, default: *, error: *, primary: *}, panel: {default: string, primary: *, success: *, warning: *, danger: *, info: *} } }
             */
            skinClass: {
                default: {
                    disabled: 'disabled',
                    active:   'active',
                    success:  'success',
                    warning:  'warning',
                    danger:   'danger',
                    info:     'info',
                    link:     'link',
                    default:  'default',
                    error:    'error',
                    primary:  'primary',
                    muted:    'muted'
                },
                panel: {
                    default: 'panel-default',
                    primary: 'panel-primary',
                    success: 'panel-success',
                    warning: 'panel-warning',
                    danger:  'panel-danger',
                    info:    'panel-info'
                }
            },

            pagination: {
                type: {
                    pager: 'pager',
                    default: 'pagination'
                },
                item: {
                    active:   'active',
                    disabled: 'disabled'
                },
                side: {
                    rirht: 'next',
                    left:  'previous'
                },
                size: {
                    lg: 'pagination-lg',
                    sm: 'pagination-sm'
                }
            },

            /**
             * @public
             * @type { { input: { lg: *, sm: * }, button: { lg: *, sm: *, xs: * }, field: {sm: *}} }
             */
            sizeClass: {
                input: {
                    lg: 'input-group-lg',
                    sm: 'input-group-sm'
                },
                field: {
                    sm: 'input-sm'
                },
                button: {
                    lg: 'btn-lg',
                    sm: 'btn-sm',
                    xs: 'btn-xs'
                }
            },

            /**
             * @public
             * @type { { lg: *, sm: *, xs: * } }
             */
            paddingClass: {
                lg: 'well-lg',
                sm: 'well-sm',
                xs: 'well-xs'
            },

            /**
             * @public
             * @type { { none: *, vertical: *, horizontal: * } }
             */
            resizeStyle: {
                none: 'none',
                vertical: 'vertical',
                horizontal: 'horizontal'
            },

            modal: {
                modal: 'modal',
                dialog: 'modal-dialog',
                content: 'modal-content',
                header: 'modal-header',
                title: 'modal-title',
                body: 'modal-body',
                footer: 'modal-footer',
                close: 'close',
                size: {
                    lg: 'modal-lg',
                    sm: 'modal-sm'
                }
            },

            btnClose: 'close',

            progress: {
                striped: 'progress-striped',
                progress: 'progress',
                bar: 'progress-bar',
                active: 'active',
                sr: 'sr-only',
                skin: {
                    success: 'progress-bar-success',
                    info: 'progress-bar-info',
                    warning: 'progress-bar-warning',
                    danger: 'progress-bar-danger'
                }
            }
        };

    } (window.ui || {}));

(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.dom
     * @constructor
     */
    ui.dom = function (selector) {

        this.elements  = document.querySelectorAll(selector);
    };

    /** @protected */
    ui.dom.prototype = {

        /**
         * @returns {ui.dom}
         */
        before: function(contentElement) {

            for (var i = 0; i < this.elements.length; i++) {

                this.elements[i].insertBefore(contentElement, this.elements[i].firstChild);
            }

            return this;
        },

        /**
         * @returns {ui.dom}
         */
        append: function(contentElement) {


            for (var i = 0; i < this.elements.length; i++) {

                this.elements[i].appendChild(contentElement);
            }

            return this;
        }
    };

    /**
     * @memberOf ui
     * @namespace ui.api
     */
    ui.api = {

        escapeHtml: function (text) {

            var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };

            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        },

        clear: function(element) {

            element.removeAttribute('value');
            element.defaultValue = '';

            return element;
        },

        /**
         * @param {string|null} link
         */
        reload: function(link) {

            window.location.href = this.empty(link, window.location.href);
        },

        reloadBack: function() {

            window.location.href = document.referrer;
        },

        /**
         * @param {string|number} text
         * @returns {boolean}
         */
        isNumeric: function(text) {

            var validChars = '0123456789.';
            var isNumber = true;
            var char, i;

            for (i = 0; i < text.length && isNumber == true; i++) {

                char = text.charAt(i);

                if (validChars.indexOf(char) == -1) {

                    isNumber = false;
                }
            }

            return isNumber;
        },

        /**
         * @param {Element} element
         * @param {boolean} status
         * @returns {boolean}
         */
        disabledElement: function(element, status) {

            if (element !== null) {

                if (status) {

                    element.setAttribute('disabled', 'disabled');
                    element.classList.add(ui.CSS.disabledClass);

                } else {

                    element.removeAttribute('disabled');
                    element.classList.remove(ui.CSS.disabledClass);
                }

                return true;
            } else {

                return false;
            }
        },

        /**
         * Find parent element with attribute
         * @param {*} element
         * @param {string} selector
         * @returns {*}
         */
        findParent: function(element, selector) {

            return element.closest(selector);
        },

        addEvents: function(arrSelector, event, fun, useCapture) {

            if (typeof arrSelector === 'object') {

                for (var i = 0, count = arrSelector.length; i < count; i++) {

                    new ui.dom('#' + arrSelector[i]).on(event, fun, useCapture);
                }
            } else {

                new ui.dom('#' + arrSelector).on(event, fun, useCapture);
            }
        },

        /**
         * Find value in array
         * @param {[]} array
         * @param {string|number} value
         * @returns {number} If found - return key. If did not find - returning false
         * @public
         */
        inArray: function(array, value) {

            for (var i = 0, count = array.length; i < count; i++) {

                if (array[i] === value) {

                    return i;
                }
            }

            return -1;
        },

        /**
         * If "value" not empty and not null - return "value" else "defaultValue"
         * @param {*} value
         * @param {*} defaultValue
         * @returns {*}
         */
        empty: function(value, defaultValue) {

            return (value != undefined && value !== null) ? value : defaultValue;
        },

        trim: function(str, character_mask) {

            character_mask = this.empty(character_mask, '\s');

            var reg = '^' + character_mask + '+|' + character_mask + '+$';

            return str.replace(new RegExp(reg), "");
        },

        /**
         *
         * @param {[]} defaultArr
         * @param {[]} mergeArray
         * @returns {*}
         */
        arrayMerge: function(defaultArr, mergeArray) {

            for (var index in mergeArray) {

                defaultArr.push(mergeArray[index]);
            }

            return defaultArr;
        },

        /**
         * Build object for save data
         * @param {{}} obj
         * @param {string} nameField - fieldName | fieldName[1] | objectName[fieldName][1] | ...
         * @param {{}|[]|string|number|null} valueField
         * @param {number} i
         * @returns {*}
         */
        buildObject: function(obj, nameField, valueField, i) {

            var arr = typeof nameField == 'string' ? ui.api.parseName(nameField) : nameField;

            for (var a = 0; a < i; a++) {
                delete arr[a];
            }

            if (arr.hasOwnProperty(i)) {

                var key = arr[i];
                delete arr[i];
                i++;

                if (Object.keys(arr).length == 0) {

                    if (!ui.api.empty(key, false)) {

                        key = Object.keys(obj).length;
                    }

                    obj[key] = valueField;

                } else {

                    if (!obj.hasOwnProperty(key)) {
                        obj[key] = {};
                    }

                    return this.buildObject(obj[key], arr, valueField, i);
                }
            }
        },

        /**
         * Parse name field
         * @param {string} string name[key1][key2]
         * @returns {[]} ['name', 'key1', 'ke21']
         */
        parseName: function(string) {

            string = string.replace(/]/g, '');
            return string.split('[');
        },

        /**
         * If "property" exist - return "value" else "defaultValue"
         * @param {{}} object
         * @param {string|number|null} property
         * @param {{}|string|number|boolean|null} defaultValue
         * @returns {{}|string|number|boolean}
         */
        existProperty: function(object, property, defaultValue) {

            if (object !== null && object.hasOwnProperty(property)) {

                return object[property];
            }

            return defaultValue;
        },

        /**
         * Set value field
         * @param {string|number} nameValue
         * @param {string} nameField
         * @returns {string|number}
         * @public
         */
        setValue: function(nameValue, nameField) {

            if (typeof nameValue === 'object' && nameValue !== null) {

                if (nameValue.hasOwnProperty(nameField)) {

                    return nameValue[nameField];
                }

                return '';
            }

            nameValue = typeof nameValue == 'boolean' ? Number(nameValue) : nameValue;

            return ui.api.empty(nameValue, '');
        },

        /**
         * GET PARAMETERS
         * @param {string|number|null} key
         *          if type key "string|number" this method is returning value or null
         *          if type key "null" this method is returning object values
         * @returns {*}
         */
        getParams: function (key) {

            var prmstr = window.location.search.substr(1);
            var data   = prmstr != null && prmstr != "" ? prmstr : {};

            if (Object.keys(data).length) {

                var params = {};
                var prmarr = data.split("&");

                for (var i = 0; i < prmarr.length; i++) {

                    var tmparr = prmarr[i].split("=");
                    params[tmparr[0]] = tmparr[1];
                }

                if (this.empty(key, false) !== false) {

                    if (params.hasOwnProperty(key)) {

                        return params[key];
                    }

                    return null;
                }

                return params;
            }
            
            return null;
        },

        /**
         * @param {Element} element
         */
        show: function(element) {

            if (element !== null) {

                element.style.visibility = 'visible';
            }
        },

        /**
         * @param {Element} element
         */
        hide: function(element) {

            if (element !== null) {

                element.style.visibility = 'hidden';
            }
        },

        /**
         * @param {Element} element
         */
        toggle: function(element) {

            if (element !== null) {

                if (element.style.visibility === 'hidden') {

                    element.style.visibility = 'visible';

                } else {

                    element.style.visibility = 'hidden';
                }
            }
        }
    };

} (window.ui || {}));

    (function(ui) {
        'use strict';

        /**
         * @type {[]}
         */
        var TYPES_INPUT = ['text', 'password', 'image', 'button', 'checkbox', 'file', 'hidden', 'radio', 'reset', 'submit', 'week', 'url', 'time', 'tel', 'search', 'range', 'number', 'month', 'email', 'datetime-local', 'color', 'date', 'datetime'];

        var getStar = function() {

            return new ui.Element('span')
                .setContentElement(ui.Config.label.required)
                .addClassElement(ui.CSS.satrClass)
                .addStyleElement('color', ui.Config.label.colorStar)
                .toHTML();
        };

        var getError = function() {

            return new ui.Element('small')
                .addClassElement(ui.CSS.validateErrorClass)
                .addClassElement(ui.CSS.prefixClass.text + '-' + ui.CSS.skinClass.default.danger)
                .toHTML()
        };

        /**
         * @param {string} str {name[0][key]| name | name[key][0][name][key][2]}
         * @returns {string}
         */
        var parseName = function(str) {

            return str.replace(/\[/g, '_').replace(/\]/g, '');
        };

        /**
         * @memberOf ui
         * @namespace ui.Element
         * @constructor
         */
        ui.Element = function(name) {

            /**
             * @type {Node}
             */
            this.element = document.createElement(name);
            this.tag_name = name;
        };

        /** @protected */
        ui.Element.prototype = {

            _thead: null,
            _tbody: null,
            _tfoot: null,
            _tr:    null,
            _th:    null,
            _td:    null,

            /**
             *
             * @param {string|null} action
             * @returns {ui.Element}
             */
            setOnClick: function(action) {

                action = ui.api.empty(action, false);

                if (action !== false) {

                    this.element.setAttribute('onclick', action);
                }

                return this;
            },

            /**
             * Add row table head
             * @param {number} index
             * @returns {ui.Element}
             * @public
             */
            addRowHead: function(index) {

                if (this._thead === null) {

                    this._thead = this.element.createTHead();
                }

                this._tr = this._thead.insertRow(ui.api.empty(index, 0));

                return this;
            },

            /**
             * Add cell table head
             * @param {string|null} content
             * @param {number|null} index
             * @returns {ui.Element}
             * @public
             */
            addCellHead: function(content, index) {

                this._th = this._tr.insertCell(ui.api.empty(index, 0));
                this._th.innerHTML = ui.api.empty(content, '');

                return this;
            },

            /**
             * Add block table body
             * @returns {ui.Element}
             * @public
             */
            addBlockBody: function() {

                this._tbody = this.element.appendChild(document.createElement('tbody'));
                return this;
            },

            /**
             * Add row table body
             * @param {number} index
             * @returns {ui.Element}
             * @public
             */
            addRowBody: function(index) {


                if (this._tbody === null) {
                    this.addBlockBody();
                }

                this._tr = this._tbody.insertRow(ui.api.empty(index, 0));

                return this;
            },

            /**
             * Add cell table body
             * @param {string|null} content
             * @param {number|null} index
             * @returns {ui.Element}
             * @public
             */
            addCellBody: function(content, index) {

                this._td = this._tr.insertCell(ui.api.empty(index, this._tr.children.length));
                this._td.innerHTML = ui.api.empty(content, '');
                return this;
            },

            /**
             *
             * @param {string} type {'table' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'th' | 'td'}
             * @param {string} attrName
             * @param {string|number|null} value
             * @returns {ui.Element}
             */
            addAttrTable: function(type, attrName, value) {

                if (value !== null) {

                    if (type === 'table') {

                        this.element.setAttribute(attrName, value);

                    } else if (type === 'thead') {

                        this._thead.setAttribute(attrName, value);

                    } else if (type === 'tbody') {

                        this._tbody.setAttribute(attrName, value);

                    } else if (type === 'tfoot') {

                        this._tfoot.setAttribute(attrName, value);

                    } else if (type === 'tr') {

                        this._tr.setAttribute(attrName, value);

                    } else if (type === 'th') {

                        this._th.setAttribute(attrName, value);

                    } else if (type === 'td') {

                        this._td.setAttribute(attrName, value);

                    }
                }

                return this;
            },

            /**
             *
             * @param {string} type {'table' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'th' | 'td'}
             * @param {string} attrName
             * @param {string|number} value
             * @returns {ui.Element}
             */
            addStyleTable: function(type, attrName, value) {

                var element = {};

                if (type === 'table') {

                    element = this.element;

                } else if (type === 'thead') {

                    element = this._thead;

                } else if (type === 'tbody') {

                    element = this._tbody;

                } else if (type === 'tfoot') {

                    element = this._tfoot;

                } else if (type === 'tr') {

                    element = this._tr;

                } else if (type === 'th') {

                    element = this._th;

                } else if (type === 'td') {

                    element = this._td;

                }

                if (element.style.hasOwnProperty(attrName)) {

                    element.style[attrName] = value;
                }

                return this;
            },

            /**
             * Set html ID on element
             * @param {string|number|null} htmlId
             * @param {string|null} htmlName
             * @returns {ui.Element}
             * @public
             */
            setIdElement: function(htmlId, htmlName) {

                if (typeof htmlId === 'string' || typeof htmlId === 'number') {

                    this.element.id = htmlId;

                } else {

                    if (typeof htmlName === 'string') {

                        this.element.id = parseName(htmlName);
                    }
                }

                return this;
            },

            /**
             * Set for in label
             * @param htmlId
             * @param {string|null} htmlName
             * @returns {ui.Element}
             */
            setForLabelElement: function(htmlId, htmlName) {

                if (ui.api.inArray(['label'], this.tag_name) != -1) {

                    if (typeof htmlId === 'string') {

                        this.element.setAttribute('for', htmlId);

                    } else {

                        if (typeof htmlName === 'string') {

                            this.element.setAttribute('for', parseName(htmlName));
                        }
                    }
                }

                return this;
            },

            /**
             * Set name field
             * @param {string} nameField
             * @returns {ui.Element}
             * @public
             */
            setNameElement: function(nameField) {

                if (ui.api.inArray(['input', 'textarea', 'select', 'button', 'submit'], this.tag_name) != -1 && nameField !== null) {
                    nameField = nameField.replace(/-/g, "_");
                    this.element.setAttribute('name', nameField);
                }

                return this;
            },

            /**
             * Set value field
             * @param {string|number|null} nameValue
             * @param {string|number|null} nameField
             * @returns {ui.Element}
             * @public
             */
            setValueElement: function(nameValue, nameField) {

                var value = ui.api.setValue(nameValue, nameField);

                if (ui.api.inArray(['input', 'select', 'option', 'button'], this.tag_name) != -1) {

                    if (value != '') {

                        this.element.setAttribute('value', value);
                    }
                } else if (ui.api.inArray(['textarea'], this.tag_name) != -1) {

                    if (value != '') {

                        this.element.innerHTML = value;
                    }
                }

                return this;
            },

            /**
             * Set html attribute checked on element
             * @param {boolean} status
             * @returns {ui.Element}
             * @public
             */
            setCheckedElement: function(status) {

                if (status === true && ui.api.inArray(['input'], this.tag_name) != -1) {

                    this.element.classList.add(ui.CSS.checkedClass);
                    this.element.setAttribute('checked', 'checked');
                }

                return this;
            },

            /**
             * Set html attribute selected on element
             * @param {boolean} status
             * @returns {ui.Element}
             * @public
             */
            setSelectedElement: function(status) {

                if (status === true && ui.api.inArray(['option'], this.tag_name) != -1) {

                    this.element.setAttribute('selected', 'selected');
                }

                return this;
            },

            /**
             * Set content in element
             * @param {string} caption
             * @param {boolean} required
             * @returns {ui.Element}
             * @public
             */
            setCaptionElement: function(caption, required) {

                this.element.innerHTML = caption;

                if (required) {

                    this.element.innerHTML += getStar();
                }

                if (ui.api.empty(caption, false)) {

                    this.element.innerHTML += ui.Config.label.separator + ' ';
                }

                if (required) {

                    this.element.innerHTML += getError();
                }

                return this;
            },

            /**
             * Set content in element
             * @param {string} caption
             * @param {boolean} required
             * @returns {ui.Element}
             * @public
             */
            setCaptionRadioElement: function(caption, required) {

                if (required) {

                    this.element.innerHTML += getStar();
                }

                if (ui.api.empty(caption, false)) {

                    this.element.innerHTML += caption;
                }

                if (required) {

                    this.element.innerHTML += getError();
                }

                return this;
            },

            /**
             * Set content in element
             * @param {string|number|null} contentElement
             * @returns {ui.Element}
             * @public
             */
            setContentElement: function(contentElement) {

                if (contentElement !== null) {

                    this.element.innerHTML = contentElement;
                }

                return this;
            },

            /**
             * Add children element before
             * @param {Node} element
             * @returns {ui.Element}
             * @public
             */
            addChildBefore: function(element) {
                this.element.insertBefore(element, this.element.firstChild);
                return this;
            },

            /**
             * Add children element after
             * @param {Node} element
             * @returns {ui.Element}
             * @public
             */
            addChildAfter: function(element) {
                this.element.appendChild(element);
                return this;
            },

            /**
             * Add HTML Class in element
             * @param {string|null} elementClass
             * @returns {ui.Element}
             * @public
             */
            addClassElement: function(elementClass) {

                if (elementClass !== '' && elementClass !== null) {

                    this.element.classList.add(elementClass);
                }

                return this;
            },

            /**
             * Set html class disabled and attribute disabled on element
             * @param {boolean} status
             * @returns {ui.Element}
             * @public
             */
            setDisabledElement: function(status) {

                if (status === true) {

                    this.element.classList.add(ui.CSS.disabledClass);
                    this.element.setAttribute('disabled', 'disabled');
                }

                return this;
            },

            /**
             * Set a text field to read-only
             * @returns {ui.Element}
             */
            setReadOnly: function() {

                this.element.readOnly = true;
                return this;
            },

            /**
             * Set html class required and attribute required on element
             * @param {boolean} status
             * @returns {ui.Element}
             * @public
             */
            setRequiredElement: function(status) {

                if (status === true) {

                    this.element.classList.add(ui.CSS.requiredClass);
                    this.element.setAttribute('required', 'required');
                }

                return this;
            },

            /**
             * Set html class icon
             * @param {string} iconName
             * @returns {ui.Element}
             * @public
             */
            setIconElement: function(iconName) {

                this.element.classList.add(ui.CSS.iconClass);
                this.element.classList.add(ui.CSS.iconClass + '-' + iconName);

                return this;
            },

            /**
             * Set type element input
             * @param {string} elementType input = 'text'|'password'|'image'|'button'|'checkbox'|'file'|'hidden'|'radio'|'reset'|'submit'|'week'|'url'|'time'|'tel'|'search'|'range'|'number'|'month'|'email'|'datetime-local'|'color'|'date'|'datetime'
             *                             | link = text/css
             *                             | script = text/javascript
             * @returns {ui.Element}
             * @public
             */
            setTypeElement: function(elementType) {

                if (ui.api.inArray(['input', 'button'], this.tag_name) != -1) {

                    if (ui.api.inArray(TYPES_INPUT, elementType) == -1) {

                        elementType = 'text';
                    }

                    this.element.setAttribute('type', elementType);
                }

                if (ui.api.inArray(['link', 'script'], this.tag_name) != -1) {

                    this.element.setAttribute('type', elementType);
                }

                return this;
            },

            /**
             * Set url for element with tag name - "a|src|script|link"
             * @param {string} elementUrl
             * @returns {ui.Element}
             */
            setUrlElement: function(elementUrl) {

                if (ui.api.inArray(['a', 'link'], this.tag_name) != -1) {

                    this.element.setAttribute('href', elementUrl);
                }

                if (ui.api.inArray(['img', 'script'], this.tag_name) != -1) {

                    this.element.setAttribute('src', elementUrl);
                }

                return this;
            },

            /**
             *
             * @param {string} attrName
             * @param {string|number|boolean|null} attrValue
             * @returns {ui.Element}
             * @public
             */
            setAttrElement: function(attrName, attrValue) {

                if (attrValue !== null) {

                    this.element.setAttribute(attrName, attrValue);
                }

                return this;
            },

            /**
             * Set html class - skin element
             * @param {string|null} type {'button'|'default'|'text'|'field'|'panel'|'pagination'}
             * @param {string|null} skin {'disabled'|'active'|'success'|'warning'|'danger'|'info'|'link'|'default'|'error'|'primary'|'muted'}
             * @returns {ui.Element}
             * @public
             */
            setSkinElement: function(type, skin) {

                var skinClass = null;

                if (ui.CSS.skinClass.hasOwnProperty(type) && ui.CSS.skinClass[type].hasOwnProperty(skin)) {

                    skinClass = ui.CSS.skinClass[type][skin];

                } else {

                    if (ui.CSS.skinClass.default.hasOwnProperty(skin)) {

                        if (type === 'text') {

                            skinClass = ui.CSS.prefixClass.text + '-' + ui.CSS.skinClass.default[skin];

                        } else if (type === 'field') {

                            skinClass = ui.CSS.prefixClass.field + '-' + ui.CSS.skinClass.default[skin];

                        } else if (type === 'button') {

                            skinClass = ui.CSS.prefixClass.button + '-' + ui.CSS.skinClass.default[skin];

                        } else {

                            skinClass = ui.CSS.skinClass.default[skin];
                        }
                    }
                }

                if (skinClass !== null) {

                    this.element.classList.add(skinClass);
                }

                return this;
            },

            /**
             * Set html class - size element
             * @param {string} type {'input'|'pagination'|'button'}
             * @param {string} size {'lg'|'sm'|'xs'}
             * @returns {ui.Element}
             * @public
             */
            setSizeElement: function(type, size) {

                if (ui.CSS.sizeClass.hasOwnProperty(type)) {

                    if (ui.CSS.sizeClass[type].hasOwnProperty(size)) {

                        this.element.classList.add(ui.CSS.sizeClass[type][size]);

                    }
                }

                return this;
            },

            /**
             * Set html class - padding element
             * @param {string|null} padding { 'lg' | 'sm' | 'xs' }
             * @returns {ui.Element}
             */
            setPaddingElement: function(padding) {

                if (ui.CSS.paddingClass.hasOwnProperty(padding)) {

                    this.element.classList.add(ui.CSS.paddingClass[padding]);
                }

                return this;
            },

            /**
             * Set html class - Psition element
             * @param {string|null} psition { 'legt' | 'right' | 'center' | 'clear' | null }
             * @returns {ui.Element}
             */
            setPsitionElement: function(psition) {

                if (ui.CSS.alignClass.block.hasOwnProperty(psition)) {

                    this.element.classList.add(ui.CSS.alignClass.block[psition]);
                }

                return this;
            },

            /**
             * Set height element
             * @param {string|number} height
             * @returns {ui.Element}
             */
            setHeightElement: function(height) {

                if (typeof height == 'string') {

                    this.element.style.height = height;

                } if (typeof height == 'number') {

                    this.element.style.height = height  + 'px';
                }
                return this;
            },

            /**
             * Set width element
             * @param {string|number} elementWidth if value - string set attribut width
             *                                     if value - number set html class
             * @returns {ui.Element}
             */
            setWidthElement: function(elementWidth) {

                if (typeof elementWidth === 'number') {

                    this.element.classList.add(ui.CSS.widthClass + '-' + elementWidth);
                }

                if (typeof elementWidth === 'string') {

                    this.element.style.width = elementWidth;
                }

                return this;
            },

            /**
             * Get clone current object
             * @returns {Node}
             */
            getClone: function() {

                return this.element.cloneNode(true);
            },

            /**
             * Add CSS style on element
             * @param {string} property
             * @param {string|number} value
             * @returns {ui.Element}
             */
            addStyleElement: function(property, value) {

                this.element.style[property] = value;
                return this;
            },

            /**
             * Get current object
             * @returns {Element}
             * @public
             */
            getElement: function() {

                return this.element;
            },

            /**
             * Get html element
             * @returns {string}
             * @public
             */
            toHTML: function()  {

                return this.element.outerHTML;
            },

            /**
             * Add html in elements with "selector"
             * @param {string} selector
             * @returns {ui.Element}
             * @public
             */
            appendHTML: function(selector) {

                new ui.dom(selector).append(this.element);
                return this;
            }
        };
    } (window.ui || {}));



(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.Error
     * @constructor
     */
    ui.Error = function () {

        this.error = [];
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Error}
     */
    ui.Error.prototype.addError = function(title, content, link) {

        this._addParams('danger', title, content, link);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Error}
     */
    ui.Error.prototype.addInfo = function(title, content, link) {

        this._addParams('info', title, content, link);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Error}
     */
    ui.Error.prototype.addSuccess = function(title, content, link) {

        this._addParams('success', title, content, link);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Error}
     */
    ui.Error.prototype.addWarning = function(title, content, link) {

        this._addParams('warning', title, content, link);
        return this;
    };

    /**
     * @param {string|null} skin
     * @param {string|null} title
     * @param {string|null} content
     * @param {string|null} link
     * @returns {ui.Error}
     */
    ui.Error.prototype._addParams = function(skin, title, content, link) {

        if (ui.api.empty(content, null)) {

            this.error.push(
                {
                    skin: ui.CSS.alert.skin[skin],
                    title: ui.api.empty(title, null),
                    content: content,
                    link: ui.api.empty(link, null)
                }
            );
        }

        return this;
    };

    /**
     * @param {{}} data
     * @returns {*|Element}
     * @private
     */
    ui.Error.prototype._buildBlockError = function(data) {

        var error =  new ui.Element('div')
            .addClassElement(ui.CSS.alert.alert)
            .addClassElement(data.skin)
            .addChildAfter(
                new ui.Element('button')
                    .addClassElement(ui.CSS.btnClose)
                    .setContentElement('&times;')
                    .setOnClick('this.parentNode.remove()')
                    .getElement()
            );

        if (data.title) {

            error
                .addChildAfter(
                    new ui.Element('strong')
                        .setContentElement(data.title + ' ')
                        .getElement()
                );
        }

        if (data.content) {

            var tag = data.link ? 'a' : 'span';

            error
                .addChildAfter(
                    new ui.Element(tag)
                        .setUrlElement(data.link)
                        .addClassElement(data.link ? ui.CSS.alert.link : null)
                        .setContentElement(data.content)
                        .getElement()
                );
        }

        return error.getElement();
    };

    /**
     * Build html prent block
     * @returns {*|Element}
     * @private
     */
    ui.Error.prototype._buildParentBlock = function() {

        var error =  new ui.Element('div')
            .addClassElement('errors');

        for (var key in this.error) {

            error.addChildBefore(this._buildBlockError(this.error[key]));
        }

        return error.getElement();
    };

    /**
     * Get object current element
     * @returns {*|Element}
     * @public
     */
    ui.Error.prototype.getElement = function() {

        return this._buildParentBlock();
    };

    /**
     * Get html current element
     * @returns {string}
     * @public
     */
    ui.Error.prototype.toHTML = function() {

        if (this.error.length > 0) {

            return this._buildParentBlock().outerHTML;
        }

        return '';
    };

    /**
     * Add element in document
     * @param {string} selector
     * @returns {ui.Error}
     * @public
     */
    ui.Error.prototype.appendHTML = function(selector) {

        if (this.error.length > 0) {

            new ui.dom(selector).append(this.getElement());
        }

        return this;
    };
} (window.ui || {}));

    (function(ui) {
        'use strict';

        var MIN_YEAR = 1000;
        var MAX_YEAR = 3000;
        var CALENDAR = 'calendar';

        function setYear(year) {

            year = Number(year);

            if (year < MIN_YEAR || year > MAX_YEAR || isNaN(year)) {

                return  MIN_YEAR;
            }

            return year
        }

        function removeCalendar(e) {

            if(!e.target.matches('.btn, .' + CALENDAR + ', .btn *, .' + CALENDAR + ' *')) {

                var calendar = document.querySelector('.' + CALENDAR);

                if (calendar !== null) {

                    calendar.remove();
                    this.removeEventListener('click', removeCalendar);
                }
            }
        }

        /**
         * @memberOf ui
         * @namespace ui.Calendar
         * @constructor
         */
        ui.Calendar = function(yyyy, mm, dd) {

            this._date = new Date();
            this._date.setFullYear(ui.api.empty(setYear(yyyy), this._date.getFullYear()));
            this._date.setMonth(ui.api.empty(mm, this._date.getMonth()));
            this._date.setDate(ui.api.empty(dd, 1));

            this._year  = this._date.getFullYear();
            this._month = this._date.getMonth();

            this._currentDate  = new Date();

            if (this._currentDate.getFullYear() === this._year && this._currentDate.getMonth() === this._month) {
                this._currentDay = this._currentDate.getDate();
            }

            this._day = ui.api.empty(dd, this._date.getDate);
        };

        /** @protected */
        ui.Calendar.prototype = {

            _x: null,
            _y: null,

            _formatUser: ui.Config.formatDateUser,
            _formatSave: ui.Config.formatDateSave,

            _selectorUser: null,
            _selectorSave: null,

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
            _prevIcon:    'chevron-left',
            _nextIcon:    'chevron-right',
            _skinBtn:     'default',
            _sizeInput:   'sm',
            _fontSizeDays: 10,
            _listId: 'list-years-calendar',
            _monthId: 'month-name-calendar',

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
                var choice  = this._day === day ? 'primary' : null;

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

            _buildDataList: function() {

                var dataList = new ui.Element('datalist')
                    .setIdElement(this._listId, null);

                for (var i = (this._year - 10), last = (this._year + 10); i <= last; i++) {
                    dataList.addChildAfter(
                        new ui.Element('option')
                            .setContentElement(i)
                            .getElement()
                    );
                }

                return dataList.getElement();
            },

            /**
             * Build html input and list help
             * @returns {*|string}
             * @private
             */
            _buildInput: function() {

                return new ui.Element('div')
                    .addStyleElement('paddingLeft', '10px')
                    .addChildBefore(
                        new ui.Element('input')
                            .setTypeElement('text')
                            .setAttrElement('list', this._listId)
                            .addClassElement(ui.CSS.formControlClass)
                            .setSizeElement('field', this._sizeInput)
                            .setAttrElement('value', this._year)
                            .setAttrElement('maxLength', 4)
                            .setAttrElement('oninput', 'new ui.Calendar().changeYear(this);')
                            .getElement()
                    )
                    .addChildAfter(this._buildDataList())
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
                            .setAttrElement('onclick', "new ui.Calendar().changeMonth(this, '" + type + "');")
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
                    .setIdElement(this._monthId, null)
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
                        .setSkinElement('button', btn_params[0])
                        .addClassElement(btn_params[1])
                        .setWidthElement('100%')
                        .setAttrElement('title', btn_params[2])
                        .addStyleElement('padding', '4px')
                        .setAttrElement('onclick', "new ui.Calendar()._setDateIn(this);")
                        .setContentElement(indexDay)
                        .toHTML();
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
                this._date.setDate(1);
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

                var calendar = document.querySelector('.' + CALENDAR);

                if (calendar !== null) {

                    calendar.remove();
                }

                var parentElement = new ui.Element('div')
                    .setWidthElement(this._width + 'px')
                    .addClassElement(CALENDAR)
                    .setAttrElement('data-month', this._month)
                    .setAttrElement('data-year',  this._year)
                    .setAttrElement('data-day',  this._day)
                    .addChildAfter(this._buildPanel());

                if (this._selectorUser !== null) {

                    parentElement.setAttrElement('data-selector-user',  this._selectorUser);
                    parentElement.setAttrElement('date-format-user', this._formatUser)
                }

                if (this._selectorSave !== null) {

                    parentElement.setAttrElement('data-selector-save',  this._selectorSave);
                    parentElement.setAttrElement('date-format-save', this._formatSave)
                }

                if (this._x !== null || this._y !== null) {

                    parentElement
                        .addStyleElement('left', (Number(this._x) - (this._width / 2)) + 'px')
                        .addStyleElement('top', (Number(this._y)) + 'px')
                        .addStyleElement('position', 'absolute')
                        .addStyleElement('z-index', 10000);
                }

                window.addEventListener('click', removeCalendar);

                return parentElement.getElement();
            },

            changeMonth: function(element, side) {

                var parentElement = ui.api.findParent(element, '.' + CALENDAR);
                var panel_body = parentElement.querySelector('.' + ui.CSS.panelClass.panelBody);
                var oldMonthName = parentElement.querySelector('#' + this._monthId);
                var oldDataList = parentElement.querySelector('#' + this._listId);
                var oldYaer = parentElement.querySelector('input[list=' + this._listId + ']');

                var month = parentElement.getAttribute('data-month');
                var year  = parentElement.getAttribute('data-year');
                var day   = parentElement.getAttribute('data-day');

                var date = new Date(year, month, day);

                if (side === 'next') {

                    date.setMonth(date.getMonth() + 1);

                } else if (side === 'prev') {

                    date.setMonth(date.getMonth() - 1);
                }

                var newMonth = date.getMonth();
                var newYear  = date.getFullYear();
                var newDay   = date.getDate();

                parentElement.setAttribute('data-month', newMonth);
                parentElement.setAttribute('data-year', newYear);
                parentElement.setAttribute('data-day', newDay);

                var newCalendar = new ui.Calendar(newYear, newMonth, newDay);
                // Set new name month
                oldMonthName.innerHTML = this._language[this._locale]['month'][newMonth];
                // Set new table days
                panel_body.replaceChild(newCalendar._buildBody(), panel_body.children[0]);
                // Set new data list
                oldDataList.parentNode.replaceChild(newCalendar._buildDataList(), oldDataList);
                // Set new Year
                oldYaer.value = newYear;
            },

            changeYear: function(element) {

                var parentElement = ui.api.findParent(element, '.' + CALENDAR);

                if (String(element.value).length == 4) {

                    parentElement.setAttribute('data-year', setYear(element.value));
                    parentElement.className = CALENDAR + ' has-success';
                    this.changeMonth(element, null);

                } else {

                    parentElement.className = CALENDAR + ' has-error';
                }
            },

            /**
             * Set date in element input
             * @param {Element} element
             */
            _setDateIn: function (element) {

                var parentElement = ui.api.findParent(element, '.' + CALENDAR);

                var month = parentElement.getAttribute('data-month');
                var year  = parentElement.getAttribute('data-year');
                var day   = element.getAttribute('data-day');

                var date = new Date(year, month, day);
                var setDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

                if (parentElement.hasAttribute('data-selector-user')) {

                    var selectorUser = parentElement.getAttribute('data-selector-user');
                    var formatUser = parentElement.getAttribute('date-format-user');
                    document.body.querySelector(selectorUser).setAttribute('value', new ui.FormatDate(setDate, formatUser).getDate());
                }

                if (parentElement.hasAttribute('data-selector-save')) {

                    var selectorSave = parentElement.getAttribute('data-selector-save');
                    var formatSave = parentElement.getAttribute('date-format-save');
                    document.body.querySelector(selectorSave).setAttribute('value', new ui.FormatDate(setDate, formatSave).getDate());
                }

                parentElement.remove();
                window.removeEventListener('click', removeCalendar);
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

                new ui.dom(selector).append(this._buildParentBlock());
                return this;
            }
        };

    } (window.ui || {}));



    (function(ui) {
        'use strict';

        /**
         * @memberOf ui
         * @namespace ui.FFText
         * @param {string|null} value
         * @param {string|null} name
         * @param {string|null} caption
         * @constructor
         */
        ui.FFText = function (value, name, caption) {

            this._value   = ui.api.empty(value, null);
            this._name    = ui.api.empty(name, null);
            this._caption = ui.api.empty(caption, null);
        };

        /** @protected */
        ui.FFText.prototype = {

            /**
             * @private
             * @type {string|null}
             */
            _leftIcon: null,

            /**
             * @private
             * @type {string|null}
             */
            _rightIcon: null,

            /**
             * @private
             * @type {string|null}
             */
            _leftMarker: null,

            /**
             * @private
             * @type {string|null}
             */
            _rightMarker: null,

            /**
             * @private
             * @type {number|null}
             */
            _widthCaption: null,

            /**
             * @private
             * @type {string|number|null}
             */
            _widthBlock: null,

            /**
             * @private
             * @type {string|null}
             */
            _id: null,

            /**
             * @private
             * @type {string|null}
             */
            _padding: ui.Config.padding,

            /**
             * @private
             * @type {string|null}
             */
            _skin: null,

            /**
             * @private
             * @type {string|null}
             */
            _size: null,

            /**
             * @private
             * @type {boolean}
             */
            _disabled: false,

            /**
             * @private
             * @type {boolean}
             */
            _required: false,

            /**
             * Set required field
             * @returns {ui.FFText}
             */
            setRequired: function(required) {
                this._required = ui.api.empty(required, true);
                return this;
            },

            /**
             * Set disables field
             * @returns {ui.FFText}
             */
            setDisabled: function() {
                this._disabled = true;
                return this;
            },

            /**
             * Set skin field
             * @param {string} sizeField { 'lg' | 'sm' }
             * @returns {ui.FFText}
             * @public
             */
            setSize: function(sizeField) {
                this._size = sizeField;
                return this;
            },

            /**
             * Set skin field
             * @param {string} skinName { 'success' | 'warning' | 'error' }
             * @returns {ui.FFText}
             * @public
             */
            setSkin: function(skinName) {
                this._skin = skinName;
                return this;
            },

            /**
             * Set left marker field
             * @param {string} textMarker
             * @returns {ui.FFText}
             * @public
             */
            setLeftMarker: function(textMarker) {
                this._leftMarker = textMarker;
                return this;
            },

            /**
             * Set right marker field
             * @param {string} textMarker
             * @returns {ui.FFText}
             * @public
             */
            setRightMarker: function(textMarker) {
                this._rightMarker = textMarker;
                return this;
            },

            /**
             * Set left icon field
             * @param {string} iconName
             * @returns {ui.FFText}
             * @public
             */
            setLeftIcon: function(iconName) {
                this._leftIcon = iconName;
                return this;
            },

            /**
             * Set right icon field
             * @param {string} iconName
             * @returns {ui.FFText}
             * @public
             */
            setRightIcon: function(iconName) {
                this._rightIcon = iconName;
                return this;
            },

            /**
             * Set width label field {1-10}
             * @param {number|null} widthCaption {1-10}
             * @returns {ui.FFText}
             * @public
             */
            setWidthCaption: function(widthCaption) {
                this._widthCaption = widthCaption;
                return this;
            },

            /**
             * Set width block field
             * @param {number|string} width
             * @example
             *      {1-12 | '300px' | '30%'}
             * @returns {ui.FFText}
             * @public
             */
            setWidthBlock: function(width) {
                this._widthBlock = width;
                return this;
            },

            /**
             * Set html ID field
             * @param {string} htmlId
             * @returns {ui.FFText}
             * @public
             */
            setId: function(htmlId) {
                this._id = htmlId;
                return this;
            },

            /**
             * Set html class padding
             * @param {string} padding { 'lg' | 'sm' | 'xs' }
             * @returns {ui.FFText}
             * @public
             */
            setPadding: function(padding) {
                this._padding = padding;
                return this;
            },

            /**
             * Build html label
             * @returns {*|Element}
             * @private
             */
            _buildCaption: function() {

                var label =  new ui.Element('label')
                    .addClassElement(ui.CSS.controlLabelClass)
                    .setForLabelElement(this._id, this._name)
                    .setCaptionElement(this._caption, this._required);

                if (typeof this._widthCaption === 'number') {

                    label
                        .setWidthElement(this._widthCaption)
                        .addClassElement(ui.CSS.alignClass.text.right);
                }

                return label.getElement();
            },

            /**
             * Build html field
             * @returns {*|Element}
             * @private
             */
            _buildField: function() {

                return new ui.Element('input')
                    .setTypeElement('text')
                    .setNameElement(this._name)
                    .setIdElement(this._id, this._name)
                    .setValueElement(this._value, this._name)
                    .addClassElement(ui.CSS.formControlClass)
                    .setDisabledElement(this._disabled)
                    .setRequiredElement(this._required)
                    .getElement();
            },

            /**
             * Build html left marker
             * @returns {*|Element}
             * @private
             */
            _buildLeftMarker: function() {

                var leftMarker = new ui.Element('span')
                    .addClassElement(ui.CSS.inputGroupAddonClass)
                    .setContentElement(this._leftMarker);

                if (typeof this._leftIcon === 'string') {

                    leftMarker
                        .addChildBefore(
                            new ui.Element('span')
                                .setIconElement(this._leftIcon)
                                .getElement()
                        )

                }

                return leftMarker.getElement();
            },

            /**
             * Build html right marker
             * @returns {*|Element}
             * @private
             */
            _buildRightMarker: function() {

                var rightMarker = new ui.Element('span')
                    .addClassElement(ui.CSS.inputGroupAddonClass)
                    .setContentElement(this._rightMarker);

                if (typeof this._rightIcon === 'string') {

                    rightMarker
                        .addChildAfter(
                            new ui.Element('span')
                                .setIconElement(this._rightIcon)
                                .getElement()
                        )

                }

                return rightMarker.getElement();
            },

            /**
             * Build html block group
             * @returns {*|Element}
             * @private
             */
            _buildGroupBlock: function() {

                var inputGroup = new ui.Element('div')
                    .setSizeElement('input', this._size)
                    .addChildAfter(this._buildField());

                if (
                    this._leftMarker  !== null  ||
                    this._rightMarker !== null  ||
                    this._rightIcon   !== null  ||
                    this._leftIcon    !== null
                ) {
                    inputGroup.addClassElement(ui.CSS.inputGroupClass);
                }

                if (typeof this._widthCaption === 'number') {

                    inputGroup.setWidthElement(12 - this._widthCaption);
                }

                if (this._leftMarker !== null || this._leftIcon !== null) {

                    inputGroup.addChildBefore(this._buildLeftMarker());
                }

                if (this._rightMarker !== null || this._rightIcon !== null) {

                    inputGroup.addChildAfter(this._buildRightMarker())
                }

                return inputGroup.getElement();
            },

            /**
             * Build html prent block
             * @returns {*|Element}
             * @private
             */
            _buildParentBlock: function() {

                var parentElement = new ui.Element('div')
                    .addClassElement(ui.CSS.validateFieldBlockClass)
                    .setSkinElement('field', this._skin)
                    .addChildBefore(this._buildGroupBlock())
                    .setPaddingElement(this._padding);

                if (this._caption !== null) {

                    parentElement.addChildBefore(this._buildCaption());
                }

                if (this._widthBlock !== null) {

                    parentElement.setWidthElement(this._widthBlock);
                }

                return parentElement.getElement();
            },

            /**
             * Get object current element
             * @returns {*|Element}
             * @public
             */
            getElement: function() {
                return this._buildParentBlock();
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
             * @returns {ui.FFText}
             * @public
             */
            appendHTML: function(selector) {
                new ui.dom(selector).append(this.getElement());
                return this;
            }
        };
    } (window.ui || {}));

(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.FFReadOnly
     * @param {string|null} value
     * @param {string|null} name
     * @param {string|null} caption
     * @constructor
     */
    ui.FFReadOnly = function (value, name, caption) {

        this._value   = ui.api.empty(value, null);
        this._name    = ui.api.empty(name, null);
        this._caption = ui.api.empty(caption, null);
    };

    /** @protected */
    ui.FFReadOnly.prototype = {

        /**
         * @private
         * @type {string|null}
         */
        _leftIcon: null,

        /**
         * @private
         * @type {string|null}
         */
        _rightIcon: null,

        /**
         * @private
         * @type {string|null}
         */
        _leftMarker: null,

        /**
         * @private
         * @type {string|null}
         */
        _rightMarker: null,

        /**
         * @private
         * @type {number|null}
         */
        _widthCaption: null,

        /**
         * @private
         * @type {string|number|null}
         */
        _widthBlock: null,

        /**
         * @private
         * @type {string|null}
         */
        _id: null,

        /**
         * @private
         * @type {string|null}
         */
        _padding: ui.Config.padding,

        /**
         * @private
         * @type {string|null}
         */
        _skin: null,

        /**
         * @private
         * @type {string|null}
         */
        _maxHeight: null,

        /**
         *
         * @param {string|number|null} height
         * @returns {ui.FFReadOnly}
         */
        setMaxHeight: function(height) {

            if (typeof height === 'number') {

                height += 'px';
            }

            this._maxHeight = ui.api.empty(height, null);
            return this;
        },

        /**
         * Set skin field
         * @param {string} skinName {'muted'|'primary'|'success'|'info'|'warning'|'danger'}
         * @returns {ui.FFReadOnly}
         * @public
         */
        setSkin: function(skinName) {
            this._skin = skinName;
            return this;
        },

        /**
         * Set left marker field
         * @param {string} textMarker
         * @returns {ui.FFReadOnly}
         * @public
         */
        setLeftMarker: function(textMarker) {
            this._leftMarker = textMarker;
            return this;
        },

        /**
         * Set right marker field
         * @param {string} textMarker
         * @returns {ui.FFReadOnly}
         * @public
         */
        setRightMarker: function(textMarker) {
            this._rightMarker = textMarker;
            return this;
        },

        /**
         * Set left icon field
         * @param {string} iconName
         * @returns {ui.FFReadOnly}
         * @public
         */
        setLeftIcon: function(iconName) {
            this._leftIcon = iconName;
            return this;
        },

        /**
         * Set right icon field
         * @param {string} iconName
         * @returns {ui.FFReadOnly}
         * @public
         */
        setRightIcon: function(iconName) {
            this._rightIcon = iconName;
            return this;
        },

        /**
         * Set width label field {1-10}
         * @param {number|null} widthCaption {1-10}
         * @returns {ui.FFReadOnly}
         * @public
         */
        setWidthCaption: function(widthCaption) {
            this._widthCaption = widthCaption;
            return this;
        },

        /**
         * Set width block field
         * @param {number|string} width
         * @example
         *      {1-12 | '300px' | '30%'}
         * @returns {ui.FFReadOnly}
         * @public
         */
        setWidthBlock: function(width) {
            this._widthBlock = width;
            return this;
        },

        /**
         * Set html ID field
         * @param {string} htmlId
         * @returns {ui.FFReadOnly}
         * @public
         */
        setId: function(htmlId) {
            this._id = htmlId;
            return this;
        },

        /**
         * Set html class padding
         * @param {string} padding { 'lg' | 'sm' | 'xs' }
         * @returns {ui.FFReadOnly}
         * @public
         */
        setPadding: function(padding) {
            this._padding = padding;
            return this;
        },

        /**
         * Build html label
         * @returns {*|Element}
         * @private
         */
        _buildCaption: function() {

            var label =  new ui.Element('label')
                .addClassElement(ui.CSS.controlLabelClass)
                .setCaptionElement(this._caption, false)
                .setForLabelElement(this._id, this._name);

            if (typeof this._widthCaption === 'number') {

                label
                    .setWidthElement(this._widthCaption)
                    .addClassElement(ui.CSS.alignClass.text.right);
            }

            return label.getElement();
        },

        /**
         * Build html field
         * @returns {*|Element}
         * @private
         */
        _buildField: function() {

            var value = ui.api.setValue(this._value, this._name);

            var field = new ui.Element('p')
                .addClassElement(ui.CSS.readOnlyMaxHeight)
                .setSkinElement('text', this._skin)
                .setIdElement(this._id, this._name)
                .setContentElement(value);

            if (this._maxHeight !== null) {

                field.addStyleElement('maxHeight', this._maxHeight)
            }

            if (
                this._leftMarker  !== null || this._leftIcon  !== null ||
                this._rightMarker !== null || this._rightIcon !== null
            ) {

                field.addClassElement(ui.CSS.formControlClass);
            }

            return field.getElement();
        },

        /**
         * Build html left marker
         * @returns {*|Element}
         * @private
         */
        _buildLeftMarker: function() {

            var leftMarker = new ui.Element('span')
                .addClassElement(ui.CSS.inputGroupAddonClass)
                .setContentElement(this._leftMarker);

            if (typeof this._leftIcon === 'string') {

                leftMarker
                    .addChildBefore(
                        new ui.Element('span')
                            .setIconElement(this._leftIcon)
                            .getElement()
                    )

            }

            return leftMarker.getElement();
        },

        /**
         * Build html right marker
         * @returns {*|Element}
         * @private
         */
        _buildRightMarker: function() {

            var rightMarker = new ui.Element('span')
                .addClassElement(ui.CSS.inputGroupAddonClass)
                .setContentElement(this._rightMarker);

            if (typeof this._rightIcon === 'string') {

                rightMarker
                    .addChildAfter(
                        new ui.Element('span')
                            .setIconElement(this._rightIcon)
                            .getElement()
                    )

            }

            return rightMarker.getElement();
        },

        /**
         * Build html block group
         * @returns {*|Element}
         * @private
         */
        _buildGroupBlock: function() {

            var inputGroup = new ui.Element('div')
                .addChildAfter(this._buildField());

            if (
                this._leftMarker  !== null  ||
                this._rightMarker !== null  ||
                this._rightIcon   !== null  ||
                this._leftIcon    !== null
            ) {
                inputGroup.addClassElement(ui.CSS.inputGroupClass);
            }

            if (typeof this._widthCaption === 'number') {

                inputGroup.setWidthElement(12 - this._widthCaption);
            }

            if (this._leftMarker !== null || this._leftIcon !== null) {

                inputGroup.addChildBefore(this._buildLeftMarker());
            }

            if (this._rightMarker !== null || this._rightIcon !== null) {

                inputGroup.addChildAfter(this._buildRightMarker())
            }

            return inputGroup.getElement();
        },

        /**
         * Build html prent block
         * @returns {*|Element}
         * @private
         */
        _buildParentBlock: function() {

            var parentElement = new ui.Element('div')
                .addClassElement(ui.CSS.validateFieldBlockClass)
                .addChildBefore(this._buildGroupBlock())
                .setPaddingElement(this._padding);

            if (this._caption !== null) {

                parentElement.addChildBefore(this._buildCaption());
            }

            if (this._widthBlock !== null) {

                parentElement.setWidthElement(this._widthBlock);
            }

            return parentElement.getElement();
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {
            return this._buildParentBlock();
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
         * @returns {ui.FFReadOnly}
         * @public
         */
        appendHTML: function(selector) {
            new ui.dom(selector).append(this.getElement());
            return this;
        }
    };
} (window.ui || {}));

(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.FFHidden
     * @param {string|number|null} value
     * @param {string|null} name
     * @constructor
     */
    ui.FFHidden = function (value, name) {

        this._value = value;
        this._name  = name;

        /**
         * @private
         * @type {[]}
         */
        this._class = [];
    };

    /** @protected */
    ui.FFHidden.prototype = {

        /**
         * @private
         * @type {string|null}
         */
        _id: null,

        /**
         * @private
         * @type {boolean}
         */
        _disabled: false,

        /**
         * @private
         * @type {boolean}
         */
        _required: false,

        /**
         * Set required field
         * @returns {ui.FFHidden}
         */
        setRequired: function(required) {
            this._required = ui.api.empty(required, true);
            return this;
        },

        /**
         * Set disables field
         * @returns {ui.FFHidden}
         */
        setDisabled: function() {
            this._disabled = true;
            return this;
        },

        /**
         * Set html ID field
         * @param {string} htmlId
         * @returns {ui.FFHidden}
         * @public
         */
        setId: function(htmlId) {
            this._id = htmlId;
            return this;
        },

        /**
         * @param {string} htmlClass
         * @returns {ui.FFHidden}
         */
        addClass: function(htmlClass) {

            this._class.push(htmlClass);
            return this;
        },

        /**
         * Build html field
         * @returns {*|Element}
         * @private
         */
        _buildField: function() {

            var field = new ui.Element('input')
                .setTypeElement('hidden')
                .setNameElement(this._name)
                .setIdElement(this._id, this._name)
                .setValueElement(this._value, this._name)
                .setDisabledElement(this._disabled)
                .setRequiredElement(this._required);

            var key = null;

            for (key in this._class) {

                field.addClassElement(this._class[key]);
            }

            return field.getElement();
        },

        /**
         * Build html prent block
         * @returns {*|Element}
         * @private
         */
        _buildParentBlock: function() {

            return new ui.Element('div')
                .addClassElement(ui.CSS.validateFieldBlockClass)
                .addChildBefore(this._buildField())
                .getElement();
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {
            return this._buildParentBlock();
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
         * @returns {ui.FFHidden}
         * @public
         */
        appendHTML: function(selector) {
            new ui.dom(selector).append(this.getElement());
            return this;
        }
    };
} (window.ui || {}));

    (function(ui) {
        'use strict';

        /**
         * @memberOf ui
         * @namespace ui.FFRadio
         * @param {{}|string|null} value
         * @param {string|null} name
         * @param {{}} radioList {'htmlId1' => 'caption1', 'htmlId2' => 'caption2', ...}
         * @constructor
         */
        ui.FFRadio = function (value, name, radioList) {

            this._value      = ui.api.setValue(ui.api.empty(value, null), name);
            this._name       = ui.api.empty(name, null);
            this._radioList  = ui.api.empty(radioList, null);
            this._disabledIf = [];
        };

        /** @protected */
        ui.FFRadio.prototype = {

            /**
             * @private
             * @type {string|null}
             */
            _skin: null,

            /**
             * @private
             * @type {string|number|null}
             */
            _width: null,

            /**
             * @private
             * @type {string|number|null}
             */
            _widthCaptionBlock: null,

            /**
             * @private
             * @type {string|number|null}
             */
            _widthCaptionItem: null,

            /**
             * @private
             * @type {boolean}
             */
            _horizontal: false,

            /**
             * @private
             * @type {boolean}
             */
            _disabled: false,

            /**
             * @private
             * @type {boolean}
             */
            _required: false,

            /**
             * @private
             * @type {string|null}
             */
            _caption: null,

            /**
             * @private
             * @type {string|null}
             */
            _padding: ui.Config.padding,

            /**
             * @param {string|number|null} caption
             * @param {string|number|null} widthCaption
             * @returns {ui.FFRadio}
             */
            setCaptionBlock: function(caption, widthCaption) {

                this._caption = caption;
                this._widthCaptionBlock = widthCaption;
                return this;
            },

            /**
             * Set width label item field {1-10}
             * @param {string|number|null} widthCaptionItem {1-10}
             * @returns {ui.FFRadio}
             * @public
             */
            setWidthCaptionItem: function(widthCaptionItem) {
                this._widthCaptionItem = widthCaptionItem;
                return this;
            },

            /**
             * Set required field
             * @param {boolean} required
             * @returns {ui.FFRadio}
             */
            setRequired: function(required) {
                this._required = ui.api.empty(required, true);
                return this;
            },

            /**
             * Set disables field
             * @returns {ui.FFRadio}
             */
            setDisabled: function() {
                this._disabled = true;
                return this;
            },

            /**
             * Set disables field
             * @param {string} htmlId
             * @returns {ui.FFRadio}
             */
            setDisabledIf: function(htmlId) {
                this._disabledIf.push(htmlId);
                return this;
            },

            /**
             * Add radio button
             * @param {string} htmlId
             * @param {string} caption
             * @returns {ui.FFRadio}
             * @public
             */
            addRadioButton: function(htmlId, caption) {
                this._radioList[htmlId] = caption;
                return this;
            },

            /**
             * draw fields horizontal
             * @returns {ui.FFRadio}
             * @public
             */
            setFieldsHorizontal: function() {
                this._horizontal = true;
                return this;
            },

            /**
             * Set width block field
             * @param {number|string} width
             * @example
             *      {1-12 | '300px' | '30%'}
             * @returns {ui.FFRadio}
             * @public
             */
            setWidth: function(width) {
                this._width = width;
                return this;
            },

            /**
             * Set skin field
             * @param {string} skinName { 'success' | 'warning' | 'error' }
             * @returns {ui.FFRadio}
             * @public
             */
            setSkin: function(skinName) {
                this._skin = skinName;
                return this;
            },

            /**
             * Build html field
             * @param {string|number} htmlId
             * @returns {*|Element}
             * @private
             */
            _buildField: function(htmlId) {

                var radio = new ui.Element('input')
                    .setTypeElement('radio')
                    .setNameElement(this._name)
                    .addClassElement(this._name)
                    .setValueElement(htmlId, this._name)
                    .setDisabledElement(this._disabled)
                    .setRequiredElement(this._required);

                if (ui.api.inArray(this._disabledIf, htmlId) != -1) {

                    radio.setDisabledElement(true);
                }

                if (htmlId == this._value) {

                    radio
                        .setIdElement(null, this._name)
                        .setCheckedElement(true);
                }

                return radio.getElement();
            },

            /**
             * Build html label block
             * @returns {*|Element}
             * @private
             */
            _buildCaptionBlock: function() {

                var label = new ui.Element('div')
                    .addChildAfter(
                        new ui.Element('label')
                            .setCaptionElement(this._caption, (this._required && ui.api.empty(this._caption, false)))
                            .getElement()
                    );

                if (typeof this._widthCaptionBlock === 'number') {

                    label
                        .setWidthElement(this._widthCaptionBlock)
                        .addClassElement(ui.CSS.alignClass.text.right);
                }

                return label.getElement();
            },

            /**
             * Build html label
             * @param {string|number} htmlId
             * @param {string|number} caption
             * @returns {*|Element}
             * @private
             */
            _buildCaptionItem: function(htmlId, caption) {

                var label = new ui.Element('label')
                    .addChildAfter(
                        new ui.Element('span')
                            .getElement()
                    );

                if (this._required && ui.api.empty(this._caption, false)) {

                    label.setContentElement(caption);

                } else {

                    label.setCaptionRadioElement(caption, this._required);
                }

                if (typeof this._widthCaptionItem === 'number') {

                    label.setWidthElement(this._widthCaptionItem);
                }

                return label
                    .addChildBefore(this._buildField(htmlId))
                    .getElement();
            },

            /**
             * Build html block radio
             * @returns {*|Element}
             * @private
             */
            _buildInlineBlock: function() {

                var iblineBlock = new ui.Element('div')
                    .addClassElement(ui.CSS.radioClass)
                    .addStyleElement('marginTop',  0)
                    .setWidthElement(Math.round(12 - this._widthCaptionBlock))
                    .addClassElement(ui.CSS.radioInlineClass);

                var block = new ui.Element('div')
                    .addClassElement(ui.CSS.radioClass)
                    .addStyleElement('marginTop', 0);

                if (this._horizontal === true) {

                    for(var htmlIda in this._radioList) {

                        block.addChildAfter(this._buildCaptionItem(htmlIda, this._radioList[htmlIda]));
                    }

                    iblineBlock.addChildAfter(block.getElement());

                } else {

                    for(var htmlIdb in this._radioList) {

                        iblineBlock.addChildAfter(
                            new ui.Element('div')
                                //.addClassElement(ui.CSS.radioClass)
                                .addChildAfter(this._buildCaptionItem(htmlIdb, this._radioList[htmlIdb]))
                                .getElement()
                        );
                    }
                }

                return iblineBlock.getElement();
            },

            /**
             * Build html prent block
             * @returns {*|Element}
             * @private
             */
            _buildParentBlock: function() {

                var parentBlock = new ui.Element('div')
                    .addClassElement(ui.CSS.validateFieldBlockClass)
                    .setPaddingElement(this._padding)
                    .setSkinElement('field', this._skin)
                    .setWidthElement(this._width)
                    .addChildBefore(this._buildInlineBlock());

                if (this._caption !== null) {

                    parentBlock
                        .addChildBefore(this._buildCaptionBlock())
                }

                return parentBlock.getElement();
            },

            /**
             * Get object current element
             * @returns {*|Element}
             * @public
             */
            getElement: function() {
                return this._buildParentBlock();
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
             * @returns {ui.FFRadio}
             * @public
             */
            appendHTML: function(selector) {
                new ui.dom(selector).append(this.getElement());
                return this;
            }

        };
    } (window.ui || {}));

(function(ui) {
    'use strict';

    var TYPE_SIMPLE = 'simple';
    var TYPE_INLINE = 'inline';

    /**
     * @memberOf ui
     * @namespace ui.FFCheckbox
     * @padding {string|null|undefined} type {'simple'|'inline'}
     * @constructor
     */
    ui.FFCheckbox = function (type) {

        this._type = ui.api.empty(type, TYPE_INLINE);
        this._checkboxList  = [];
        this._disabledIf    = [];
        this._requiredIf    = [];
        this._attr = {};

    };

    /** @protected */
    ui.FFCheckbox.prototype = {

        /**
         * @private
         * @type {string|null}
         */
        _caption: null,

        /**
         * @private
         * @type {string|null}
         */
        _skin: null,

        /**
         * @private
         * @type {string|number|null}
         */
        _width: null,

        /**
         * @private
         * @type {string|number|null}
         */
        _widthCaptionBlock: null,

        /**
         * @private
         * @type {string|number|null}
         */
        _widthCaptionItem: null,

        /**
         * @private
         * @type {boolean}
         */
        _horizontal: false,

        /**
         * @private
         * @type {boolean}
         */
        _disabled: false,

        /**
         * @private
         * @type {boolean}
         */
        _required: false,

        /**
         * @private
         * @type {{checked: 1, nochecked: 0}}
         */
        _checkboxValue: ui.Config.checkboxValue,

        /**
         * @private
         * @type {string|null}
         */
        _padding: ui.Config.padding,

        /**
         * @private
         * @type {string|null}
         */
        _classField: null,

        /**
         * @param {string} name
         * @param {*} value
         * @returns {ui.FFCheckbox}
         */
        setAttr: function(name, value) {

            this._attr[name] = value;
            return this;
        },

        /**
         * @param {string|number|null} caption
         * @param {string|number|null} widthCaption
         * @returns {ui.FFCheckbox}
         */
        setCaptionBlock: function(caption, widthCaption) {

            this._caption = caption;
            this._widthCaptionBlock = widthCaption;
            return this;
        },

        /**
         * Set default value
         * @param {string} checked
         * @param {string} nochecked
         * @returns {ui.FFCheckbox}
         */
        setDefaultValues: function(checked, nochecked) {

            this._checkboxValue.checked   = ui.api.empty(checked, ui.Config.checkboxValue.checked);
            this._checkboxValue.nochecked = ui.api.empty(nochecked, ui.Config.checkboxValue.nochecked);

            return this;
        },

        /**
         * Set required field
         * @param {boolean} required
         * @returns {ui.FFCheckbox}
         */
        setRequired: function(required) {
            this._required = ui.api.empty(required, true);
            return this;
        },

        /**
         * Set disables field
         * @returns {ui.FFCheckbox}
         */
        setDisabled: function() {
            this._disabled = true;
            return this;
        },

        /**
         * Set required field
         * @param {string} htmlId
         * @returns {ui.FFCheckbox}
         */
        setRequiredIf: function(htmlId) {
            this._requiredIf.push(htmlId);
            return this;
        },

        /**
         * Set disables field
         * @param {string} htmlId
         * @returns {ui.FFCheckbox}
         */
        setDisabledIf: function(htmlId) {
            this._disabledIf.push(htmlId);
            return this;
        },

        /**
         * Set width label item field {1-10}
         * @param {string|number|null} widthCaptionItem {1-10}
         * @returns {ui.FFCheckbox}
         * @public
         */
        setWidthCaptionItem: function(widthCaptionItem) {
            this._widthCaptionItem = widthCaptionItem;
            return this;
        },

        /**
         * Add checkbox
         * @param {{}|string|number|null} value
         * @param {string} name
         * @param {string|null} caption
         * @param {string|null} onclick
         * @returns {ui.FFCheckbox}
         * @public
         */
        addCheckbox: function(value, name, caption, onclick) {

            this._checkboxList[this._checkboxList.length] = {
                name:    ui.api.empty(name, null),
                value:   ui.api.empty(value, null),
                caption: ui.api.empty(caption, null),
                onclick: ui.api.empty(onclick, null)
            };

            return this;
        },

        /**
         * Add list checkboxes
         * @param { { 0: { name: 'string', value: '{}|string|number|null', caption: 'string|null', onclick: 'string|null' } } } data
         * @returns {ui.FFCheckbox}
         */
        addCheckboxList: function(data) {

            for(var row in data) {

                this._checkboxList[this._checkboxList.length] = {
                    name:    ui.api.existProperty(data[row], 'name', null),
                    value:   ui.api.existProperty(data[row], 'value', null),
                    caption: ui.api.existProperty(data[row], 'caption', null),
                    onclick: ui.api.existProperty(data[row], 'onclick', null)
                };
            }

            return this;
        },

        /**
         * @param {string} classField
         * @returns {ui.FFCheckbox}
         */
        setClass: function(classField) {

            this._classField = classField;
            return this;
        },

        /**
         * Set html class padding
         * @param {string|null} padding { 'lg' | 'sm' | 'xs' }
         * @returns {ui.FFCheckbox}
         * @public
         */
        setPadding: function(padding) {
            this._padding = padding;
            return this;
        },

        /**
         * draw fields horizontal
         * @returns {ui.FFCheckbox}
         * @public
         */
        setFieldsHorizontal: function() {
            this._horizontal = true;
            return this;
        },

        /**
         * Set width block field
         * @param {number|string} width
         * @example
         *      {1-12 | '300px' | '30%'}
         * @returns {ui.FFCheckbox}
         * @public
         */
        setWidth: function(width) {
            this._width = width;
            return this;
        },

        /**
         * Set skin field
         * @param {string} skinName { 'success' | 'warning' | 'error' }
         * @returns {ui.FFCheckbox}
         * @public
         */
        setSkin: function(skinName) {
            this._skin = skinName;
            return this;
        },

        /**
         * Build html field
         * @param {{}} params {value: *, name: *, caption: *, onclick: *}
         * @returns {*|Element}
         * @private
         */
        _buildField: function(params) {

            var checkbox = new ui.Element('input')
                .setTypeElement('checkbox')
                .setNameElement(params.name)
                .setDisabledElement(this._disabled)
                .setRequiredElement(this._required)
                .addClassElement(this._classField)
                .setIdElement(null, params.name)
                .setAttrElement('onclick', params.onclick);

            for (var attr in this._attr) {

                var value = this._attr[attr];
                checkbox.setAttrElement(attr, value);
            }

            if (ui.api.inArray(this._disabledIf, params.name) != -1) {

                checkbox.setDisabledElement(true);
            }

            if (ui.api.inArray(this._requiredIf, params.name) != -1) {

                checkbox.setRequiredElement(true);
            }

            if (this._checkboxValue.checked == ui.api.setValue(params.value, params.name)) {

                checkbox
                    .setCheckedElement(true)
                    .setValueElement(this._checkboxValue.checked, null);

            } else {

                checkbox.setValueElement(this._checkboxValue.nochecked, null);
            }

            return checkbox.getElement();
        },

        /**
         * Build html label block
         * @returns {*|Element}
         * @private
         */
        _buildCaptionBlock: function() {

            var label = new ui.Element('div')
                .addChildAfter(
                    new ui.Element('label')
                        .setCaptionElement(this._caption, (this._required && ui.api.empty(this._caption, false)))
                        .getElement()
                );

            if (typeof this._widthCaptionBlock === 'number') {

                label
                    .setWidthElement(this._widthCaptionBlock)
                    .addClassElement(ui.CSS.alignClass.text.right);
            }

            return label.getElement();
        },

        /**
         * Build html label item
         * @param {{}} params {value: *, name: *, caption: *, onclick: *}
         * @returns {*|Element}
         * @private
         */
        _buildCaptionItem: function(params) {

            var label = new ui.Element('label')
                .addChildAfter(
                    new ui.Element('span')
                        .getElement()
                );

            if (this._required && ui.api.empty(this._caption, false)) {

                label.setContentElement(params.caption);

            } else {

                var req = (ui.api.inArray(this._requiredIf, params.name) != -1) ? true : this._required;
                label.setCaptionRadioElement(params.caption, req);
            }

            if (typeof this._widthCaptionItem === 'number') {

                label.setWidthElement(this._widthCaptionItem);
            }

            return label
                .addChildBefore(this._buildField(params))
                .getElement();
        },

        /**
         * @returns {*|Element}
         * @private
         */
        _buildSimpleBlock: function() {

            var block = new ui.Element('div');

            for(var htmlIda in this._checkboxList) {

                block.addChildAfter(this._buildCaptionItem(this._checkboxList[htmlIda]));
            }

            return block.getElement();
        },

        /**
         * @returns {*|Element}
         * @private
         */
        _buildInlineBlock: function() {

            var iblineBlock = new ui.Element('div')
                .addClassElement(ui.CSS.checkboxClass)
                .addStyleElement('marginTop',  0)
                .addClassElement(ui.CSS.checkboxInlineClass);

            if (typeof this._widthCaptionBlock === 'number') {

                iblineBlock.setWidthElement(Math.round(12 - this._widthCaptionBlock))
            }

            var block = new ui.Element('div')
                .addClassElement(ui.CSS.checkboxClass)
                .addStyleElement('marginTop', 0);

            if (this._horizontal === true) {

                for(var htmlIda in this._checkboxList) {

                    block.addChildAfter(this._buildCaptionItem(this._checkboxList[htmlIda]));
                }

                iblineBlock.addChildAfter(block.getElement());

            } else {

                for(var htmlIdb in this._checkboxList) {

                    iblineBlock.addChildAfter(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.checkboxClass)
                            .addChildAfter(this._buildCaptionItem(this._checkboxList[htmlIdb]))
                            .getElement()
                    );
                }
            }

            return iblineBlock.getElement();
        },

        /**
         * Build html prent block
         * @returns {*|Element}
         * @private
         */
        _buildParentBlock: function() {

            var parentBlock =  new ui.Element('div')
                .addClassElement(ui.CSS.validateFieldBlockClass)
                .setPaddingElement(this._padding)
                .setSkinElement('field', this._skin)
                .setWidthElement(this._width)
                .addChildAfter(this._buildInlineBlock());

            if (this._caption !== null) {

                parentBlock
                    .addChildBefore(this._buildCaptionBlock())
            }

            return parentBlock.getElement();
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {

            if (this._type == TYPE_SIMPLE) {

                return this._buildSimpleBlock();
            }

            return this._buildParentBlock();
        },

        /**
         * Get html current element
         * @returns {string}
         * @public
         */
        toHTML: function() {

            if (this._type == TYPE_SIMPLE) {

                return this._buildSimpleBlock().outerHTM;
            }

            return this._buildParentBlock().outerHTML;
        },

        /**
         * Add element in document
         * @param {string} selector
         * @returns {ui.FFCheckbox}
         * @public
         */
        appendHTML: function(selector) {
            new ui.dom(selector).append(this.getElement());
            return this;
        }

    };
} (window.ui || {}));

(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.FFTextarea
     * @param {string|null} value
     * @param {string|null} name
     * @param {string|null} caption
     * @constructor
     */
    ui.FFTextarea = function (value, name, caption) {

        this._value   = ui.api.empty(value, null);
        this._name    = ui.api.empty(name, null);
        this._caption = ui.api.empty(caption, null);
    };

    /** @protected */
    ui.FFTextarea.prototype = {

        /**
         * @private
         * @type {string|null}
         */
        _leftIcon: null,

        /**
         * @private
         * @type {string|null}
         */
        _rightIcon: null,

        /**
         * @private
         * @type {string|null}
         */
        _leftMarker: null,

        /**
         * @private
         * @type {string|null}
         */
        _rightMarker: null,

        /**
         * @private
         * @type {number|null}
         */
        _widthCaption: null,

        /**
         * @private
         * @type {string|number|null}
         */
        _width: null,

        /**
         * @private
         * @type {string|null}
         */
        _id: null,

        /**
         * @private
         * @type {string|null}
         */
        _padding: ui.Config.padding,

        /**
         * @private
         * @type {string|null}
         */
        _skin: null,

        /**
         * @private
         * @type {string|null}
         */
        _size: null,

        /**
         * @private
         * @type {boolean}
         */
        _disabled: false,

        /**
         * @private
         * @type {boolean}
         */
        _required: false,

        /**
         * @private
         * @type {string|null}
         */
        _resize: null,

        /**
         * @private
         * @type {string|number|null}
         */
        _height: null,

        /**
         *
         * @param {string|number|null} height
         * @returns {ui.FFTextarea}
         */
        setHeight: function(height) {

            this._height = height;
            return this;
        },

        /**
         * Set resize textarea
         * @param {string|null} resize { 'none' | 'vertical' | 'horizontal' | null }
         * @default {string} resize { 'none' }
         * @returns {ui.FFTextarea}
         */
        setResize: function(resize) {

            this._resize = ui.api.existProperty(ui.CSS.resizeStyle, resize, ui.CSS.resizeStyle.none);
            return this;
        },

        /**
         * Set required field
         * @param {boolean} required
         * @returns {ui.FFTextarea}
         */
        setRequired: function(required) {

            this._required = ui.api.empty(required, true);
            return this;
        },

        /**
         * Set disables field
         * @returns {ui.FFTextarea}
         */
        setDisabled: function() {

            this._disabled = true;
            return this;
        },

        /**
         * Set skin field
         * @param {string} sizeField { 'lg' | 'sm' }
         * @returns {ui.FFTextarea}
         * @public
         */
        setSize: function(sizeField) {

            this._size = sizeField;
            return this;
        },

        /**
         * Set skin field
         * @param {string} skinName { 'success' | 'warning' | 'error' }
         * @returns {ui.FFTextarea}
         * @public
         */
        setSkin: function(skinName) {

            this._skin = skinName;
            return this;
        },

        /**
         * Set left marker field
         * @param {string} textMarker
         * @returns {ui.FFTextarea}
         * @public
         */
        setLeftMarker: function(textMarker) {

            this._leftMarker = textMarker;
            return this;
        },

        /**
         * Set right marker field
         * @param {string} textMarker
         * @returns {ui.FFTextarea}
         * @public
         */
        setRightMarker: function(textMarker) {

            this._rightMarker = textMarker;
            return this;
        },

        /**
         * Set left icon field
         * @param {string} iconName
         * @returns {ui.FFTextarea}
         * @public
         */
        setLeftIcon: function(iconName) {

            this._leftIcon = iconName;
            return this;
        },

        /**
         * Set right icon field
         * @param {string} iconName
         * @returns {ui.FFTextarea}
         * @public
         */
        setRightIcon: function(iconName) {

            this._rightIcon = iconName;
            return this;
        },

        /**
         * Set width label field {1-10}
         * @param {number|null} widthCaption {1-10}
         * @returns {ui.FFTextarea}
         * @public
         */
        setWidthCaption: function(widthCaption) {

            this._widthCaption = widthCaption;
            return this;
        },

        /**
         * Set width block field
         * @param {number|string} width
         * @example
         *      {1-12 | '300px' | '30%'}
         * @returns {ui.FFTextarea}
         * @public
         */
        setWidth: function(width) {

            this._width = width;
            return this;
        },

        /**
         * Set html ID field
         * @param {string} htmlId
         * @returns {ui.FFTextarea}
         * @public
         */
        setId: function(htmlId) {

            this._id = htmlId;
            return this;
        },

        /**
         * Set html class padding
         * @param {string} padding { 'lg' | 'sm' | 'xs' }
         * @returns {ui.FFTextarea}
         * @public
         */
        setPadding: function(padding) {

            this._padding = padding;
            return this;
        },

        /**
         * Build html label
         * @returns {*|Element}
         * @private
         */
        _buildCaption: function() {

            var label =  new ui.Element('label')
                .addClassElement(ui.CSS.controlLabelClass)
                .setForLabelElement(this._id, this._name)
                .setCaptionElement(this._caption, this._required);

            if (typeof this._widthCaption === 'number') {

                label
                    .setWidthElement(this._widthCaption)
                    .addClassElement(ui.CSS.alignClass.text.right);
            }

            return label.getElement();
        },

        /**
         * Build html field
         * @returns {*|Element}
         * @private
         */
        _buildField: function() {

            var textarea = new ui.Element('textarea')
                .setNameElement(this._name)
                .setIdElement(this._id, this._name)
                .setValueElement(this._value, this._name)
                .addClassElement(ui.CSS.formControlClass)
                .setHeightElement(this._height)
                .setDisabledElement(this._disabled)
                .setRequiredElement(this._required);

            if (typeof this._resize === 'string') {

                textarea.addStyleElement('resize', this._resize)
            }

            return textarea.getElement();
        },

        /**
         * Build html left marker
         * @returns {*|Element}
         * @private
         */
        _buildLeftMarker: function() {

            var leftMarker = new ui.Element('span')
                .addClassElement(ui.CSS.inputGroupAddonClass)
                .setContentElement(this._leftMarker);

            if (typeof this._leftIcon === 'string') {

                leftMarker
                    .addChildBefore(
                        new ui.Element('span')
                            .setIconElement(this._leftIcon)
                            .getElement()
                    )

            }

            return leftMarker.getElement();
        },

        /**
         * Build html right marker
         * @returns {*|Element}
         * @private
         */
        _buildRightMarker: function() {

            var rightMarker = new ui.Element('span')
                .addClassElement(ui.CSS.inputGroupAddonClass)
                .setContentElement(this._rightMarker);

            if (typeof this._rightIcon === 'string') {

                rightMarker
                    .addChildAfter(
                        new ui.Element('span')
                            .setIconElement(this._rightIcon)
                            .getElement()
                    )
            }

            return rightMarker.getElement();
        },

        /**
         * Build html block group
         * @returns {*|Element}
         * @private
         */
        _buildGroupBlock: function() {

            var inputGroup = new ui.Element('div')
                .setSizeElement('input', this._size)
                .addChildAfter(this._buildField());

            if (
                this._leftMarker  !== null  ||
                this._rightMarker !== null  ||
                this._rightIcon   !== null  ||
                this._leftIcon    !== null
            ) {
                inputGroup.addClassElement(ui.CSS.inputGroupClass);
            }

            if (typeof this._widthCaption === 'number') {

                inputGroup.setWidthElement(12 - this._widthCaption);
            }

            if (this._leftMarker !== null || this._leftIcon !== null) {

                inputGroup.addChildBefore(this._buildLeftMarker());
            }

            if (this._rightMarker !== null || this._rightIcon !== null) {

                inputGroup.addChildAfter(this._buildRightMarker())
            }

            return inputGroup.getElement();
        },

        /**
         * Build html prent block
         * @returns {*|Element}
         * @private
         */
        _buildParentBlock: function() {

            var parentElement = new ui.Element('div')
                .addClassElement(ui.CSS.validateFieldBlockClass)
                .setSkinElement('field', this._skin)
                .addChildBefore(this._buildGroupBlock())
                .setPaddingElement(this._padding);

            if (this._caption !== null) {

                parentElement.addChildBefore(this._buildCaption());
            }

            if (this._width !== null) {

                parentElement.setWidthElement(this._width);
            }

            return parentElement.getElement();
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {

            return this._buildParentBlock();
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
         * @returns {ui.FFTextarea}
         * @public
         */
        appendHTML: function(selector) {

            new ui.dom(selector).append(this.getElement());
            return this;
        }
    };
} (window.ui || {}));
    
    (function(ui) {
        'use strict';
    
        /**
         * @memberOf ui
         * @namespace ui.FFPassword
         * @param {string|null} value
         * @param {string|null} name
         * @param {string|null} caption
         * @constructor
         */
        ui.FFPassword = function (value, name, caption) {
    
            this._value   = ui.api.empty(value, null);
            this._name    = ui.api.empty(name, null);
            this._caption = ui.api.empty(caption, null);
        };
    
        /** @protected */
        ui.FFPassword.prototype = {
    
            /**
             * @private
             * @type {string|null}
             */
            _leftIcon: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _rightIcon: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _leftMarker: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _rightMarker: null,
    
            /**
             * @private
             * @type {number|null}
             */
            _widthCaption: null,
    
            /**
             * @private
             * @type {string|number|null}
             */
            _width: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _id: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _padding: ui.Config.padding,
    
            /**
             * @private
             * @type {string|null}
             */
            _skin: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _size: null,
    
            /**
             * @private
             * @type {boolean}
             */
            _disabled: false,
    
            /**
             * @private
             * @type {boolean}
             */
            _required: false,

            /**
             * Set required field
             * @returns {ui.FFPassword}
             */
            setRequired: function(required) {
                this._required = ui.api.empty(required, true);
                return this;
            },
    
            /**
             * Set disables field
             * @returns {ui.FFPassword}
             */
            setDisabled: function() {
                this._disabled = true;
                return this;
            },
    
            /**
             * Set skin field
             * @param {string} sizeField { 'lg' | 'sm' }
             * @returns {ui.FFPassword}
             * @public
             */
            setSize: function(sizeField) {
                this._size = sizeField;
                return this;
            },
    
            /**
             * Set skin field
             * @param {string} skinName { 'success' | 'warning' | 'error' }
             * @returns {ui.FFPassword}
             * @public
             */
            setSkin: function(skinName) {
                this._skin = skinName;
                return this;
            },
    
            /**
             * Set left marker field
             * @param {string} textMarker
             * @returns {ui.FFPassword}
             * @public
             */
            setLeftMarker: function(textMarker) {
                this._leftMarker = textMarker;
                return this;
            },
    
            /**
             * Set right marker field
             * @param {string} textMarker
             * @returns {ui.FFPassword}
             * @public
             */
            setRightMarker: function(textMarker) {
                this._rightMarker = textMarker;
                return this;
            },
    
            /**
             * Set left icon field
             * @param {string} iconName
             * @returns {ui.FFPassword}
             * @public
             */
            setLeftIcon: function(iconName) {
                this._leftIcon = iconName;
                return this;
            },
    
            /**
             * Set right icon field
             * @param {string} iconName
             * @returns {ui.FFPassword}
             * @public
             */
            setRightIcon: function(iconName) {
                this._rightIcon = iconName;
                return this;
            },
    
            /**
             * Set width label field {1-10}
             * @param {number|null} widthCaption {1-10}
             * @returns {ui.FFPassword}
             * @public
             */
            setWidthCaption: function(widthCaption) {
                this._widthCaption = widthCaption;
                return this;
            },
    
            /**
             * Set width block field
             * @param {number|string} width
             * @example
             *      {1-12 | '300px' | '30%'}
             * @returns {ui.FFPassword}
             * @public
             */
            setWidth: function(width) {
                this._width = width;
                return this;
            },
    
            /**
             * Set html ID field
             * @param {string} htmlId
             * @returns {ui.FFPassword}
             * @public
             */
            setId: function(htmlId) {
                this._id = htmlId;
                return this;
            },
    
            /**
             * Set html class padding
             * @param {string} padding { 'lg' | 'sm' | 'xs' }
             * @returns {ui.FFPassword}
             * @public
             */
            setPadding: function(padding) {
                this._padding = padding;
                return this;
            },
    
            /**
             * Build html label
             * @returns {*|Element}
             * @private
             */
            _buildCaption: function() {
    
                var label =  new ui.Element('label')
                    .addClassElement(ui.CSS.controlLabelClass)
                    .setForLabelElement(this._id, this._name)
                    .setCaptionElement(this._caption, this._required);
    
                if (typeof this._widthCaption === 'number') {
    
                    label
                        .setWidthElement(this._widthCaption)
                        .addClassElement(ui.CSS.alignClass.text.right);
                }
    
                return label.getElement();
            },
    
            /**
             * Build html field
             * @returns {*|Element}
             * @private
             */
            _buildField: function() {
    
                return new ui.Element('input')
                    .setTypeElement('password')
                    .setNameElement(this._name)
                    .setIdElement(this._id, this._name)
                    .setValueElement(this._value, this._name)
                    .addClassElement(ui.CSS.formControlClass)
                    .setDisabledElement(this._disabled)
                    .setRequiredElement(this._required)
                    .getElement();
            },
    
            /**
             * Build html left marker
             * @returns {*|Element}
             * @private
             */
            _buildLeftMarker: function() {
    
                var leftMarker = new ui.Element('span')
                    .addClassElement(ui.CSS.inputGroupAddonClass)
                    .setContentElement(this._leftMarker);
    
                if (typeof this._leftIcon === 'string') {
    
                    leftMarker
                        .addChildBefore(
                            new ui.Element('span')
                                .setIconElement(this._leftIcon)
                                .getElement()
                        )
    
                }
    
                return leftMarker.getElement();
            },
    
            /**
             * Build html right marker
             * @returns {*|Element}
             * @private
             */
            _buildRightMarker: function() {
    
                var rightMarker = new ui.Element('span')
                    .addClassElement(ui.CSS.inputGroupAddonClass)
                    .setContentElement(this._rightMarker);
    
                if (typeof this._rightIcon === 'string') {
    
                    rightMarker
                        .addChildAfter(
                            new ui.Element('span')
                                .setIconElement(this._rightIcon)
                                .getElement()
                        )
    
                }
    
                return rightMarker.getElement();
            },
    
            /**
             * Build html block group
             * @returns {*|Element}
             * @private
             */
            _buildGroupBlock: function() {
    
                var inputGroup = new ui.Element('div')
                    .setSizeElement('input', this._size)
                    .addChildAfter(this._buildField());
    
                if (
                    this._leftMarker  !== null  ||
                    this._rightMarker !== null  ||
                    this._rightIcon   !== null  ||
                    this._leftIcon    !== null
                ) {
                    inputGroup.addClassElement(ui.CSS.inputGroupClass);
                }
    
                if (typeof this._widthCaption === 'number') {
    
                    inputGroup.setWidthElement(12 - this._widthCaption);
                }
    
                if (this._leftMarker !== null || this._leftIcon !== null) {
    
                    inputGroup.addChildBefore(this._buildLeftMarker());
                }
    
                if (this._rightMarker !== null || this._rightIcon !== null) {
    
                    inputGroup.addChildAfter(this._buildRightMarker())
                }
    
                return inputGroup.getElement();
            },
    
            /**
             * Build html prent block
             * @returns {*|Element}
             * @private
             */
            _buildParentBlock: function() {
    
                var parentElement = new ui.Element('div')
                    .addClassElement(ui.CSS.validateFieldBlockClass)
                    .setSkinElement('field', this._skin)
                    .addChildBefore(this._buildGroupBlock())
                    .setPaddingElement(this._padding);
    
                if (this._caption !== null) {
    
                    parentElement.addChildBefore(this._buildCaption());
                }
    
                if (this._width !== null) {
    
                    parentElement.setWidthElement(this._width);
                }
    
                return parentElement.getElement();
            },
    
            /**
             * Get object current element
             * @returns {*|Element}
             * @public
             */
            getElement: function() {
                return this._buildParentBlock();
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
             * @returns {ui.FFPassword}
             * @public
             */
            appendHTML: function(selector) {
                new ui.dom(selector).append(this.getElement());
                return this;
            }
        };
    } (window.ui || {}));
    
    (function(ui) {
        'use strict';
    
        /**
         * @memberOf ui
         * @namespace ui.FFSelect
         * @param {string|null} value
         * @param {string|null} name
         * @param {string|null} caption
         * @constructor
         */
        ui.FFSelect = function (value, name, caption) {
    
            this._value   = ui.api.empty(value, null);
            this._name    = ui.api.empty(name, null);
            this._caption = ui.api.empty(caption, null);
            this._items   = {};
        };
    
        /** @protected */
        ui.FFSelect.prototype = {
    
            /**
             * @private
             * @type {string|null}
             */
            _leftIcon: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _rightIcon: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _leftMarker: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _rightMarker: null,
    
            /**
             * @private
             * @type {number|null}
             */
            _widthCaption: null,
    
            /**
             * @private
             * @type {string|number|null}
             */
            _width: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _id: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _padding: ui.Config.padding,
    
            /**
             * @private
             * @type {string|null}
             */
            _skin: null,
    
            /**
             * @private
             * @type {string|null}
             */
            _size: null,
    
            /**
             * @private
             * @type {boolean}
             */
            _disabled: false,
    
            /**
             * @private
             * @type {boolean}
             */
            _required: false,

            /**
             *
             * Set data list
             * @param {[]|{}} data [ 'valu-1', 'valu-2', 'valu-3', ... ]
             * @returns {ui.FFSelect}
             */
            setList: function(data) {
                this._items = data;
                return this;
            },

            /**
             * Add item in list
             * @param {string|number} value
             * @param {string|number} text
             * @returns {ui.FFSelect}
             */
            addItem: function(value, text) {
                this._items[value] = text;
                return this;
            },
    
            /**
             * Set required field
             * @param {boolean} required
             * @returns {ui.FFSelect}
             */
            setRequired: function(required) {
                this._required = ui.api.empty(required, true);
                return this;
            },
    
            /**
             * Set disables field
             * @returns {ui.FFSelect}
             */
            setDisabled: function() {
                this._disabled = true;
                return this;
            },
    
            /**
             * Set skin field
             * @param {string} sizeField { 'lg' | 'sm' }
             * @returns {ui.FFSelect}
             * @public
             */
            setSize: function(sizeField) {
                this._size = sizeField;
                return this;
            },
    
            /**
             * Set skin field
             * @param {string} skinName { 'success' | 'warning' | 'error' }
             * @returns {ui.FFSelect}
             * @public
             */
            setSkin: function(skinName) {
                this._skin = skinName;
                return this;
            },
    
            /**
             * Set left marker field
             * @param {string} textMarker
             * @returns {ui.FFSelect}
             * @public
             */
            setLeftMarker: function(textMarker) {
                this._leftMarker = textMarker;
                return this;
            },
    
            /**
             * Set right marker field
             * @param {string} textMarker
             * @returns {ui.FFSelect}
             * @public
             */
            setRightMarker: function(textMarker) {
                this._rightMarker = textMarker;
                return this;
            },
    
            /**
             * Set left icon field
             * @param {string} iconName
             * @returns {ui.FFSelect}
             * @public
             */
            setLeftIcon: function(iconName) {
                this._leftIcon = iconName;
                return this;
            },
    
            /**
             * Set right icon field
             * @param {string} iconName
             * @returns {ui.FFSelect}
             * @public
             */
            setRightIcon: function(iconName) {
                this._rightIcon = iconName;
                return this;
            },
    
            /**
             * Set width label field {1-10}
             * @param {number|null} widthCaption {1-10}
             * @returns {ui.FFSelect}
             * @public
             */
            setWidthCaption: function(widthCaption) {
                this._widthCaption = widthCaption;
                return this;
            },
    
            /**
             * Set width block field
             * @param {number|string} width
             * @example
             *      {1-12 | '300px' | '30%'}
             * @returns {ui.FFSelect}
             * @public
             */
            setWidth: function(width) {
                this._width = width;
                return this;
            },
    
            /**
             * Set html ID field
             * @param {string} htmlId
             * @returns {ui.FFSelect}
             * @public
             */
            setId: function(htmlId) {
                this._id = htmlId;
                return this;
            },
    
            /**
             * Set html class padding
             * @param {string} padding { 'lg' | 'sm' | 'xs' }
             * @returns {ui.FFSelect}
             * @public
             */
            setPadding: function(padding) {
                this._padding = padding;
                return this;
            },
    
            /**
             * Build html label
             * @returns {*|Element}
             * @private
             */
            _buildCaption: function() {
    
                var label =  new ui.Element('label')
                    .addClassElement(ui.CSS.controlLabelClass)
                    .setForLabelElement(this._id, this._name)
                    .setCaptionElement(this._caption, this._required);
    
                if (typeof this._widthCaption === 'number') {
    
                    label
                        .setWidthElement(this._widthCaption)
                        .addClassElement(ui.CSS.alignClass.text.right);
                }
    
                return label.getElement();
            },

            /**
             * Build html option
             * @param {string|number} value
             * @param {string|number} text
             * @returns {*|Element}
             * @private
             */
            _buildItem: function(value, text) {

                var option = new ui.Element('option')
                    .setValueElement(value, null)
                    .setContentElement(text);

                if (ui.api.setValue(this._value, this._name) == value) {

                    option.setSelectedElement(true);
                }

                return option.getElement();
            },
    
            /**
             * Build html field
             * @returns {*|Element}
             * @private
             */
            _buildField: function() {
    
                var setect = new ui.Element('select')
                    .setNameElement(this._name)
                    .setIdElement(this._id, this._name)
                    .addClassElement(ui.CSS.formControlClass)
                    .setDisabledElement(this._disabled)
                    .setRequiredElement(this._required);

                for(var value in this._items) {

                    setect.addChildAfter(this._buildItem(value, this._items[value]));
                }

                return setect.getElement();
            },
    
            /**
             * Build html left marker
             * @returns {*|Element}
             * @private
             */
            _buildLeftMarker: function() {
    
                var leftMarker = new ui.Element('span')
                    .addClassElement(ui.CSS.inputGroupAddonClass)
                    .setContentElement(this._leftMarker);
    
                if (typeof this._leftIcon === 'string') {
    
                    leftMarker
                        .addChildBefore(
                            new ui.Element('span')
                                .setIconElement(this._leftIcon)
                                .getElement()
                        )
    
                }
    
                return leftMarker.getElement();
            },
    
            /**
             * Build html right marker
             * @returns {*|Element}
             * @private
             */
            _buildRightMarker: function() {
    
                var rightMarker = new ui.Element('span')
                    .addClassElement(ui.CSS.inputGroupAddonClass)
                    .setContentElement(this._rightMarker);
    
                if (typeof this._rightIcon === 'string') {
    
                    rightMarker
                        .addChildAfter(
                            new ui.Element('span')
                                .setIconElement(this._rightIcon)
                                .getElement()
                        )
    
                }
    
                return rightMarker.getElement();
            },
    
            /**
             * Build html block group
             * @returns {*|Element}
             * @private
             */
            _buildGroupBlock: function() {
    
                var inputGroup = new ui.Element('div')
                    .setSizeElement('input', this._size)
                    .addChildAfter(this._buildField());
    
                if (
                    this._leftMarker  !== null  ||
                    this._rightMarker !== null  ||
                    this._rightIcon   !== null  ||
                    this._leftIcon    !== null
                ) {
                    inputGroup.addClassElement(ui.CSS.inputGroupClass);
                }
    
                if (typeof this._widthCaption === 'number') {
    
                    inputGroup.setWidthElement(12 - this._widthCaption);
                }
    
                if (this._leftMarker !== null || this._leftIcon !== null) {
    
                    inputGroup.addChildBefore(this._buildLeftMarker());
                }
    
                if (this._rightMarker !== null || this._rightIcon !== null) {
    
                    inputGroup.addChildAfter(this._buildRightMarker())
                }
    
                return inputGroup.getElement();
            },
    
            /**
             * Build html prent block
             * @returns {*|Element}
             * @private
             */
            _buildParentBlock: function() {
    
                var parentElement = new ui.Element('div')
                    .addClassElement(ui.CSS.validateFieldBlockClass)
                    .setSkinElement('field', this._skin)
                    .addChildBefore(this._buildGroupBlock())
                    .setPaddingElement(this._padding);
    
                if (this._caption !== null) {
    
                    parentElement.addChildBefore(this._buildCaption());
                }
    
                if (this._width !== null) {
    
                    parentElement.setWidthElement(this._width);
                }
    
                return parentElement.getElement();
            },
    
            /**
             * Get object current element
             * @returns {*|Element}
             * @public
             */
            getElement: function() {
                return this._buildParentBlock();
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
             * @returns {ui.FFSelect}
             * @public
             */
            appendHTML: function(selector) {
                new ui.dom(selector).append(this.getElement());
                return this;
            }
        };
    } (window.ui || {}));

(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.FFButton
     * @constructor
     */
    ui.FFButton = function () {

        this._buttonList  = [];
        this._disabledIf  = [];
        this._btnId = [];

        /**
         * @private
         * @type {[]}
         */
        this._class = [];
    };

    /** @protected */
    ui.FFButton.prototype = {

        /**
         * @private
         * @type {string|null}
         */
        _skin: null,

        /**
         * @private
         * @type {string|null}
         */
        _size: null,

        /**
         * @private
         * @type {boolean}
         */
        _block: false,

        /**
         * @private
         * @type {string|null}
         */
        _group: null,

        /**
         * @private
         * @type {boolean}
         */
        _active: false,

        /**
         * @private
         * @type {{}}
         */
        _hide: {},

        /**
         * @private
         * @type {string|number|null}
         */
        _width: null,

        /**
         * @private
         * @type {boolean}
         */
        _disabled: false,

        /**
         * @private
         * @type {string|null}
         */
        _onClick: null,

        /**
         * @private
         * @type {string|null}
         */
        _padding: ui.Config.padding,

        /**
         * @private
         * @type {string|null}
         */
        _position: null,

        /**
         * @param {string} htmlClass
         * @returns {ui.FFButton}
         */
        setClass: function(htmlClass) {

            this._class = [];
            this._class.push(htmlClass);
            return this;
        },

        /**
         * @param {string} htmlClass
         * @returns {ui.FFButton}
         */
        addClass: function(htmlClass) {

            this._class.push(htmlClass);
            return this;
        },


        /**
         * Set psition block button
         * @param {string|null} psition { 'legt' | 'right' | 'center' | 'clear' | null }
         * @returns {ui.FFButton}
         */
        setPositionBlock: function(psition) {

            this._position = psition;
            return this;
        },

        /**
         * Set padding block button
         * @param {string|null} padding { 'lg' | 'sm' | 'xs' }
         * @returns {ui.FFButton}
         */
        setPaddingBlock: function(padding) {

            this._padding = padding;
            return this;
        },

        /**
         * Set active button
         * @returns {ui.FFButton}
         */
        setActive: function() {

            this._active = true;
            return this;
        },

        /**
         * Set active button
         * @returns {ui.FFButton}
         */
        hide: function(name) {

            this._hide[name] = true;
            return this;
        },

        /**
         * Set group button
         * @param {string} typeGroup {'group' | 'toolbar' | 'vertical' | 'justified' }
         * @returns {ui.FFButton}
         * @public
         */
        setGroup: function(typeGroup) {

            this._group = ui.api.existProperty(ui.CSS.btn.btnGroup, typeGroup, null);
            return this;
        },

        /**
         * Set block button
         * @returns {ui.FFButton}
         * @public
         */
        setBlock: function() {

            this._block = true;
            return this;
        },

        /**
         * Set disabled button
         * @returns {ui.FFButton}
         * @public
         */
        setDisabled: function() {

            this._disabled = true;
            return this;
        },

        /**
         * Set disabled button
         * @param {string} name
         * @returns {ui.FFButton}
         * @public
         */
        setDisabledIf: function(name) {

            this._disabledIf.push(name);
            return this;
        },

        /**
         * Add button
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {string|null} caption
         * @param {string|null} skin { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
         * @param {boolean} active
         * @param {string|null} icon
         * @returns {ui.FFButton}
         * @public
         */
        addButton: function(value, name, caption, skin, active, icon) {

            this._buttonList[this._buttonList.length] = {
                type:      'button',
                skin:      ui.api.empty(skin,    null),
                name:      ui.api.empty(name,    null),
                value:     ui.api.empty(value,   null),
                active:    ui.api.empty(active,  null),
                caption:   ui.api.empty(caption, null),
                leftIcon:  ui.api.empty(icon,    null),
                onclick:   this._onClick,
                class:     this._class,
                rightIcon: null,
                disabled:  false
            };

            return this;
        },

        /**
         * Add submit
         * @param {string|number|null} value
         * @param {string} name
         * @param {string} caption
         * @param {string|null} skin { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
         * @param {boolean} active
         * @param {string|null} icon
         * @returns {ui.FFButton}
         * @public
         */
        addSubmit: function(value, name, caption, skin, active, icon) {

            this._buttonList[this._buttonList.length] = {
                type:      'submit',
                skin:      ui.api.empty(skin,    null),
                name:      ui.api.empty(name,    null),
                value:     ui.api.empty(value,   null),
                active:    ui.api.empty(active,  null),
                caption:   ui.api.empty(caption, null),
                leftIcon:  ui.api.empty(icon,    null),
                onclick:   this._onClick,
                class:     this._class,
                rightIcon: null,
                disabled:  false
            };

            return this;
        },

        /**
         * Add list buttons
         * @param { { 0: { type: string, value: string, name: string, caption: string, skin: string, active: boolean, leftIcon: string, rightIcon: string } } | []} data
         * @returns {ui.FFButton}
         * @public
         */
        addButtonList: function(data) {

            for(var row in data) {

                if (data.hasOwnProperty(row)) {

                    this._buttonList[this._buttonList.length] = {
                        type:      ui.api.existProperty(data[row], 'type', 'button'),
                        skin:      ui.api.existProperty(data[row], 'skin',      null),
                        name:      ui.api.existProperty(data[row], 'name',      null),
                        value:     ui.api.existProperty(data[row], 'value',     null),
                        active:    ui.api.existProperty(data[row], 'active',    null),
                        caption:   ui.api.existProperty(data[row], 'caption',   null),
                        leftIcon:  ui.api.existProperty(data[row], 'leftIcon',  null),
                        rightIcon: ui.api.existProperty(data[row], 'rightIcon', null),
                        onclick:   ui.api.existProperty(data[row], 'onclick',   null),
                        disabled:  ui.api.existProperty(data[row], 'disabled',  null),
                        class:     ui.api.existProperty(data[row], 'class',     this._class)
                    };
                }
            }

            return this;
        },

        /**
         * Set width block button
         * @param {number|string} width
         * @example
         *      {1-12 | '300px' | '30%'}
         * @returns {ui.FFButton}
         * @public
         */
        setWidth: function(width) {

            this._width = width;
            return this;
        },

        /**
         * Set skin buttons
         * @param {string} skinName { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
         * @returns {ui.FFButton}
         * @public
         */
        setSkin: function(skinName) {

            this._skin = skinName;
            return this;
        },

        /**
         * Set size button
         * @param {string} sizeBtn { 'lg' | 'sm' }
         * @returns {ui.FFButton}
         * @public
         */
        setSize: function(sizeBtn) {

            this._size = sizeBtn;
            return this;
        },

        /**
         * @param {string} action
         * @returns {ui.FFButton}
         */
        setOnClick: function(action) {

            this._onClick = action;
            return this;
        },

        /**
         * @param {{ caption: string, leftIcon: string|null, rightIcon: string|null }} params
         * @returns {string}
         * @private
         */
        _getCaption: function(params) {

            var caption = '';

            if (params.leftIcon !== null) {

                caption += new ui.Element('span')
                    .setIconElement(params.leftIcon)
                    .toHTML() + ' ';
            }

            caption += (params.caption !== null) ? params.caption : '';

            if (params.rightIcon !== null) {

                caption += ' ' + new ui.Element('span')
                    .setIconElement(params.rightIcon)
                    .toHTML();
            }

            caption.trim();
            return caption;
        },

        /**
         * Build html button
         * @param {{ type: string, value: string, name: string, caption: string, skin: string|null, active: boolean, leftIcon: string|null, rightIcon: string|null, onclick: string }} params
         * @returns {*|Element}
         * @private
         */
        _buildField: function(params) {

            var defaultSkin = ui.CSS.skinClass.default.default;
            var skin = ui.api.empty(this._skin, defaultSkin);

            if (params.skin !== null) {

                skin = ui.api.empty(params.skin, defaultSkin);
            }

            var button = new ui.Element('button')
                .setTypeElement(params.type)
                .setNameElement(params.name)
                .setIdElement(null, params.name)
                .addClassElement(ui.CSS.btn.btnClass)
                .setValueElement(params.value, params.name)
                .setSkinElement('button', skin)
                .setSizeElement('button', this._size)
                .setDisabledElement(this._disabled)
                .setContentElement(this._getCaption(params))
                .setOnClick(params.onclick);

            if (this._active === true || params.active === true) {

                button.addClassElement(ui.CSS.skinClass.default.active);
            }

            if (this._block === true) {

                button.addClassElement(ui.CSS.btn.btnBlockClass);
            }

            if (ui.api.inArray(this._disabledIf, params.name) != -1 || params.disabled === true) {

                button.setDisabledElement(true);
            }

            if (this._group === ui.CSS.btn.btnGroup.justified) {

                button = new ui.Element('div')
                    .addClassElement(ui.CSS.btn.btnGroup.group)
                    .addChildAfter(button.getElement());
            }

            var key = null;

            for (key in params.class) {

                button.addClassElement(params.class[key]);
            }

            var btn = button.getElement();

            if (ui.api.existProperty(this._hide, params.name, false)) {

                ui.api.hide(btn);
            }

            return btn;
        },

        /**
         * Build html block buttons
         * @returns {*|Element}
         * @private
         */
        _buildInlineBlock: function() {

            var inlineBlock = new ui.Element('div')
                .setPsitionElement(this._position)
                .setPaddingElement(this._padding);

            if (this._block === false && this._group !== null) {

                inlineBlock.addClassElement(this._group);
            }

            for(var htmlIda in this._buttonList) {

                inlineBlock.addChildAfter(this._buildField(this._buttonList[htmlIda]));
            }

            return inlineBlock.getElement();
        },

        /**
         * Build html prent block
         * @returns {*|Element}
         * @private
         */
        _buildParentBlock: function() {

            return new ui.Element('div')
                .setWidthElement(this._width)
                .addChildBefore(this._buildInlineBlock())
                .getElement();
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {

            return this._buildParentBlock();
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
         * @returns {ui.FFButton}
         * @public
         */
        appendHTML: function(selector) {

            new ui.dom(selector).append(this.getElement());
            return this;
        }

    };
} (window.ui || {}));

(function(ui) {
    'use strict';

    var counter = new Date().getTime();
    var inputClassUser = 'date-user';
    var inputClassSave = 'date-hidden';
    var inputClassBlock = 'block-field-date';
    var idFieldUser = 'field-date';

    /**
     * @memberOf ui
     * @namespace ui.FFDate
     * @param {string|null} value
     * @param {string|null} name
     * @param {string|null} caption
     * @constructor
     */
    ui.FFDate = function (value, name, caption) {

        this._value   = ui.api.empty(value, null);
        this._name    = ui.api.empty(name, null);
        this._caption = ui.api.empty(caption, null);
        this._id = ui.api.empty(this._name, idFieldUser + '-' + counter);

        this._valueForEvent = [];
        counter++;
    };

    /** @protected */
    ui.FFDate.prototype = {

        _formatDateUser: ui.Config.formatDateUser,
        _formatDateSave: ui.Config.formatDateSave,

        /**
         * @private
         * @type {number|null}
         */
        _widthCaption: null,

        /**
         * @private
         * @type {string}
         */
        _widthField: ui.Config.widthField,

        /**
         * @private
         * @type {string|number|null}
         */
        _widthBlock: null,

        /**
         * @private
         * @type {string|null}
         */
        _id: null,

        /**
         * @private
         * @type {string|null}
         */
        _padding: ui.Config.padding,

        /**
         * @private
         * @type {string|null}
         */
        _skin: null,

        /**
         * @private
         * @type {string|null}
         */
        _size: null,

        /**
         * @private
         * @type {boolean}
         */
        _disabled: false,

        /**
         * @private
         * @type {boolean}
         */
        _required: false,

        /**
         * @private
         * @type {boolean}
         */
        _activeBtn: false,

        /**
         *
         * @param {string} format
         *                      'YYYY-MM-DD' | 'YYYY-MM-DD HH:MI:SS' | 'YYYY.MM.DD' | 'YYYY.MM.DD HH:MI:SS' | 'YYYY/MM/DD' | 'YYYY/MM/DD HH:MI:SS' |
         *                      'DD-MM-YYYY' | 'DD-MM-YYYY HH:MI:SS' | 'DD.MM.YYYY' | 'DD.MM.YYYY HH:MI:SS' | 'DD/MM/YYYY' | 'DD/MM/YYYY HH:MI:SS' |
         *                      'DD-MM-YY'   | 'DD-MM-YY HH:MI:SS'   | 'DD.MM.YY'   | 'DD.MM.YY HH:MI:SS'   | 'DD/MM/YY'   | 'DD/MM/YYYY HH:MI:SS'
         * @returns {ui.FFDate}
         * @public
         */
        setDateFormatUser: function(format) {

            this._formatDateUser = format;
            return this;
        },

        /**
         *
         * @param {string} format
         *                      'YYYY-MM-DD' | 'YYYY-MM-DD HH:MI:SS' | 'YYYY.MM.DD' | 'YYYY.MM.DD HH:MI:SS' | 'YYYY/MM/DD' | 'YYYY/MM/DD HH:MI:SS' |
         *                      'DD-MM-YYYY' | 'DD-MM-YYYY HH:MI:SS' | 'DD.MM.YYYY' | 'DD.MM.YYYY HH:MI:SS' | 'DD/MM/YYYY' | 'DD/MM/YYYY HH:MI:SS' |
         *                      'DD-MM-YY'   | 'DD-MM-YY HH:MI:SS'   | 'DD.MM.YY'   | 'DD.MM.YY HH:MI:SS'   | 'DD/MM/YY'   | 'DD/MM/YYYY HH:MI:SS'
         * @returns {ui.FFDate}
         * @public
         */
        setDateFormatSave: function(format) {

            this._formatDateSave = format;
            return this;
        },

        /**
         * Set active button
         * @returns {ui.FFDate}
         * @public
         */
        setActive: function() {
            this._activeBtn = true;
            return this;
        },

        /**
         * Set required field
         * @param {boolean} required
         * @returns {ui.FFDate}
         * @public
         */
        setRequired: function(required) {
            this._required = ui.api.empty(required, true);
            return this;
        },

        /**
         * Set disables field
         * @returns {ui.FFDate}
         * @public
         */
        setDisabled: function() {
            this._disabled = true;
            return this;
        },

        /**
         * Set size field
         * @param {string} sizeField { 'lg' | 'sm' }
         * @returns {ui.FFDate}
         * @public
         */
        setSize: function(sizeField) {
            this._size = sizeField;
            return this;
        },

        /**
         * Set skin field
         * @param {string} skinName { 'success' | 'warning' | 'error' }
         * @returns {ui.FFDate}
         * @public
         */
        setSkin: function(skinName) {
            this._skin = skinName;
            return this;
        },

        /**
         * Set width label field {1-10}
         * @param {number|null} widthCaption {1-10}
         * @returns {ui.FFDate}
         * @public
         */
        setWidthCaption: function(widthCaption) {
            this._widthCaption = widthCaption;
            return this;
        },

        /**
         * Set width block field
         * @param {number|string} width
         * @example
         *      {1-12 | '300px' | '30%'}
         * @returns {ui.FFDate}
         * @public
         */
        setWidthBlock: function(width) {
            this._widthBlock = width;
            return this;
        },

        /**
         * Set width block field
         * @param {number|string} width
         * @example
         *      {1-12 | '300px' | '30%'}
         * @returns {ui.FFDate}
         * @public
         */
        setWidthField: function(width) {
            this._widthField = width;
            return this;
        },

        /**
         * Set html ID field
         * @param {string} htmlId
         * @returns {ui.FFDate}
         * @public
         */
        setId: function(htmlId) {
            this._id = htmlId;
            return this;
        },

        /**
         * Set html class padding
         * @param {string} padding { 'lg' | 'sm' | 'xs' }
         * @returns {ui.FFDate}
         * @public
         */
        setPadding: function(padding) {
            this._padding = padding;
            return this;
        },

        /**
         * Build html label
         * @returns {*|Element}
         * @private
         */
        _buildCaption: function() {

            var label =  new ui.Element('label')
                .addClassElement(ui.CSS.controlLabelClass)
                .setForLabelElement(this._id, this._name)
                .setCaptionElement(this._caption, this._required);

            if (typeof this._widthCaption === 'number') {

                label
                    .setWidthElement(this._widthCaption)
                    .addClassElement(ui.CSS.alignClass.text.right);
            }

            return label.getElement();
        },

        /**
         * Build html field
         * @returns {*|Element}
         * @private
         */
        _buildField: function() {

            var valueDate = ui.api.setValue(this._value, this._name);

            this._valueForEvent = [
                new ui.FormatDate(valueDate, this._formatDateUser).getDate(),
                new ui.FormatDate(valueDate, this._formatDateSave).getDate()
            ];

            return new ui.Element('div')
                .setSizeElement('input', this._size)
                .addClassElement(ui.CSS.btn.btnGroup.group)
                .setIdElement(this._id, this._name)
                .setWidthElement(5)
                .addChildAfter(
                    new ui.Element('input')
                        .setTypeElement('text')
                        .setDisabledElement(this._disabled)
                        .setRequiredElement(this._required)
                        .setAttrElement('value', this._valueForEvent[0])
                        .addClassElement(ui.CSS.formControlClass)
                        .addClassElement(inputClassUser)
                        .setReadOnly()
                        .getElement()
                )
                .addChildAfter(
                    new ui.Element('input')
                        .setTypeElement('hidden')
                        .setNameElement(this._name)
                        .setDisabledElement(this._disabled)
                        .setRequiredElement(this._required)
                        .setAttrElement('value', this._valueForEvent[1])
                        .addClassElement(inputClassSave)
                        .getElement()
                )
                .getElement();
        },

        /**
         *
         * @returns {*|Element}
         * @private
         */
        _buildButtons: function() {

            return new ui.Element('div')
                .addClassElement(ui.CSS.btn.btnGroup.group)
                .setWidthElement(7)
                .addChildAfter(
                    new ui.FFButton()
                        .setOnClick('new ui.FFDate()._setCurrentDate(this);')
                        .addButton(null, null, null, null, this._activeBtn, ui.Config.iconBtnDate.currentDate)
                        .setWidth('120px')
                        .setOnClick("new ui.FFDate()._calendar(this, '" + this._id + "');")
                        .addButton(null, null, null, null, this._activeBtn, ui.Config.iconBtnDate.calendarDate)
                        .setWidth('120px')
                        .setOnClick('new ui.FFDate()._clearDate(this);')
                        .addButton(null, null, null, null, this._activeBtn, ui.Config.iconBtnDate.removeDate)
                        .setWidth('120px')
                        .setPaddingBlock(null)
                        .setGroup('justified')
                        .setSize(this._size)
                        .getElement()
                )
                .getElement();
        },

        /**
         * Build html block group
         * @returns {*|Element}
         * @private
         */
        _buildGroupBlock: function() {

            var inputGroup = new ui.Element('div')
                .addChildAfter(this._buildField())
                .addChildAfter(this._buildButtons());

            if (typeof this._widthCaption === 'number') {

                inputGroup.setWidthElement(12 - this._widthCaption);
            }

            return inputGroup.getElement();
        },

        /**
         * Build html prent block
         * @returns {*|Element}
         * @private
         */
        _buildParentBlock: function() {

            var parentElement = new ui.Element('div')
                .addClassElement(ui.CSS.validateFieldBlockClass)
                .addClassElement(inputClassBlock)
                .setSkinElement('field', this._skin)
                .addChildBefore(this._buildGroupBlock())
                .setPaddingElement(this._padding);

            if (this._caption !== null) {

                parentElement.addChildBefore(this._buildCaption());
            }

            if (this._widthBlock !== null) {

                parentElement.setWidthElement(this._widthBlock);
            }

            return parentElement.getElement();
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {
            return this._buildParentBlock();
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
         * @param {Element} e
         * @private
         */
        _setCurrentDate: function(e) {

            var parentElement = ui.api.findParent(e, '.' + inputClassBlock);
            parentElement.querySelector('input[type=text]').setAttribute('value', new ui.FormatDate(null, this._formatDateUser).getCurrentDate());
            parentElement.querySelector('input[type=hidden]').setAttribute('value', new ui.FormatDate(null, this._formatDateSave).getCurrentDate());
        },

        /**
         * @param {Element} e
         * @param {string} selectorParentField <div id="selectorParentField"><input type="text"><input type="hidden"></div>
         * @private
         */
        _calendar: function(e, selectorParentField) {

            var position = e.getBoundingClientRect();
            var parentElement = ui.api.findParent(e, '.' + inputClassBlock);
            var findDate = parentElement.querySelector('#' + selectorParentField + ' > input[type=hidden]').value;

            var date = new Date();

            if (findDate != '') {

                date = new Date(findDate);
            }

            new ui.Calendar(date.getFullYear(), date.getMonth(), date.getDate())
                .setPositionLeft(position.left + ((position.right - position.left) / 2))
                .setPositionTop(position.bottom)
                .addDateUserTo('#' + selectorParentField + ' > input[type=text]')
                .addDateSaveTo('#' + selectorParentField + ' > input[type=hidden]')
                .appendHTML('body');
        },

        /**
         * @param {Element} e
         * @private
         */
        _clearDate: function(e) {

            var parentElement = ui.api.findParent(e, '.' + inputClassBlock);
            parentElement.querySelector('input[type=text]').removeAttribute('value');
            parentElement.querySelector('input[type=hidden]').removeAttribute('value');
        },

        /**
         * Add element in document
         * @param {string} selector
         * @returns {ui.FFDate}
         * @public
         */
        appendHTML: function(selector) {

            new ui.dom(selector).append(this.getElement());
            return this;
        }
    };
} (window.ui || {}));

    (function(ui) {
        'use strict';

        var uniqueId = new Date().getTime();

        /**
         * @memberOf ui
         * @namespace ui.Modal
         * @param {string|number|null} id
         * @param {string|null} locale
         * @constructor
         */
        ui.Modal = function(id, locale) {

            this._title = null;
            this._titleSmall = null;
            this._icon = null;
            this._content = null;
            this._size = null;
            this._skin = null;
            this._locale = ui.api.empty(locale, ui.Config.lbl[ui.Config.locale]);
            this._lbl = ui.api.existProperty(ui.Config.lbl, this._locale, ui.Config.lbl[ui.Config.locale]);

            this._buttons = new ui.FFButton();
            this._id = ui.api.empty(id, uniqueId);
            uniqueId++;
        };

        /** @protected */
        ui.Modal.prototype = {

            /**
             * @returns {string|number}
             */
            getId: function() {

                return this._id;
            },

            /**
             * @param {string|null} onclick
             * @param {string|null} caption
             * @param {string|null} skin - { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
             * @param {boolean} active
             * @param {string|null} icon
             */
            addButton: function(onclick, caption, skin, active, icon) {

                this._buttons
                    .setOnClick(onclick)
                    .addButton(
                        null,
                        null,
                        ui.api.empty(caption, null),
                        ui.api.empty(skin, null),
                        ui.api.empty(active, false),
                        ui.api.empty(icon, null)
                    );

                return this;
            },

            /**
             * @param {string} size 'ls' | 'sm'
             * @returns {ui.Modal}
             */
            setSize: function(size) {

                this._size = ui.api.existProperty(ui.CSS.modal.size, size, null);
                return this;
            },

            /**
             * @param {string} title
             * @param {string} title_small
             * @returns {ui.Modal}
             */
            setTitle: function(title, title_small) {

                this._title = title;
                this._titleSmall = title_small;
                return this;
            },

            /**
             * @param {string} content
             * @returns {ui.Modal}
             */
            setContent: function(content) {

                this._content = content;
                return this;
            },

            _buildHead: function() {

                var head = new ui.Element('div')
                    .addClassElement(ui.CSS.modal.header)
                    .addChildAfter(
                        new ui.FFButton()
                            .addClass(ui.CSS.modal.close)
                            .setOnClick("new ui.Modal(null, null)._removeModal(this);")
                            .addButton(null, null, '&times;', null, null, null)
                            .getElement()
                    );

                if (this._title !== null) {

                    head
                        .addChildAfter(
                            new ui.Element('h4')
                                .setSkinElement('text', this._skin)
                                .addChildAfter(
                                    new ui.Element('span')
                                        .setIconElement(this._icon)
                                        .getElement()
                                )
                                .addChildAfter(
                                    new ui.Element('span')
                                        .setContentElement(' ' + this._title + ' ')
                                        .getElement()
                                )
                                .addChildAfter(
                                    new ui.Element('small')
                                        .setContentElement(this._titleSmall)
                                        .getElement()
                                )
                                .getElement()
                        );
                }

                return head.getElement();
            },

            _buildBody: function() {

                return new ui.Element('div')
                    .addClassElement(ui.CSS.modal.body)
                    .setContentElement(ui.api.empty(this._content, ''))
                    .getElement();
            },

            _buildFoot: function() {

                return new ui.Element('div')
                    .addClassElement(ui.CSS.modal.footer)
                    .addChildAfter(this._buildButtons())
                    .getElement();
            },

            _buildButtons: function() {

                this._buttons
                    .setGroup('toolbar')
                    .setPositionBlock('right');

                return this._buttons.getElement();
            },

            _buildModal: function() {

                return new ui.Element('div')
                    .addStyleElement('display', 'block')
                    .addClassElement(ui.CSS.modal.modal)
                    .setIdElement(this._id, null)
                    .addChildAfter(
                        new ui.Element('div')
                            .addClassElement(ui.CSS.modal.dialog)
                            .addClassElement(this._size)
                            .addChildAfter(
                                new ui.Element('div')
                                    .addClassElement(ui.CSS.modal.content)
                                    .addChildAfter(this._buildHead())
                                    .addChildAfter(this._buildBody())
                                    .addChildAfter(this._buildFoot())
                                    .getElement()
                            )
                            .getElement()
                    )
                    .getElement();
            },

            /**
             * @param {string} message
             * @returns {ui.Modal}
             */
            alert: function(message) {

                this.removeModal(null);

                this._title = this._lbl.message;
                this._icon  = 'envelope';
                this._skin = ui.CSS.skinClass.default.primary;
                this._content = message;

                this._buttons
                    .setOnClick("new ui.Modal()._removeModal(this);")
                    .addButton(null, null, this._lbl.btn_close, 'default', false, null);

                this.appendHTML('body');
                return this;
            },

            /**
             *
             * @param {string} message
             * @param {string} callbackYes
             * @param {string} callbackNo
             * @returns {ui.Modal}
             */
            confirm: function(message, callbackYes, callbackNo) {

                this.removeModal(null);

                this._title = this._lbl.question;
                this._icon  = 'question-sign';
                this._skin = ui.CSS.skinClass.default.primary;
                this._content = message;

                this._buttons
                    .setOnClick("new ui.Modal()._removeModal(this);" + callbackYes)
                    .addButton(null, null, this._lbl.btn_yes, 'default', false, null)
                    .setOnClick("new ui.Modal()._removeModal(this);" + callbackNo)
                    .addButton(null, null, this._lbl.btn_no, 'default', false, null);

                this.appendHTML('body');
                return this;
            },

            /**
             * @param {string} message
             * @returns {ui.Modal}
             */
            error: function(message) {

                this.removeModal(null);

                this._title = this._lbl.error;
                this._icon  = 'ban-circle';
                this._skin = ui.CSS.skinClass.default.danger;
                this._content = message;

                this._buttons
                    .setOnClick("new ui.Modal()._removeModal(this);")
                    .addButton(null, null, this._lbl.btn_yes, 'default', false, null);

                this.appendHTML('body');
                return this;
            },

            _removeModal: function(element) {

                var modal = ui.api.findParent(element, '.' + ui.CSS.modal.modal);
                modal.remove();
            },

            /**
             * @param {string|number|null} idModal
             * @returns {ui.Modal}
             */
            removeModal: function(idModal) {

                var modal = document.getElementById(ui.api.empty(idModal, this._id));

                if (modal) {

                    modal.remove();
                }

                return this;
            },

            /**
             * Get object current element
             * @returns {*|Element}
             * @public
             */
            getElement: function() {

                return this._buildModal();
            },

            /**
             * Get html current element
             * @returns {string}
             * @public
             */
            toHTML: function() {

                return this._buildModal().outerHTML;
            },

            /**
             * Add element in document
             * @param {string|number|null} selector
             * @returns {ui.Modal}
             * @public
             */
            appendHTML: function(selector) {

                new ui.dom(selector)
                    .append(this.getElement());

                return this;
            }
        }
    } (window.ui || {}));

(function(ui) {
    'use strict';

    var uniqueId = new Date().getTime();

    /**
     * @memberOf ui
     * @namespace ui.Progress
     * @param {string|number|null} id
     * @constructor
     */
    ui.Progress = function(id) {

        /**
         * @type {string|number}
         */
        this._id = ui.api.empty(id, uniqueId);
        uniqueId++;
    };

    /** @protected */
    ui.Progress.prototype = {

        /**
         * @type {string|null}
         */
        _skin: ui.api.existProperty(ui.CSS.progress.skin, ui.Config.skinProgress, null),

        /**
         * @param {string} skin {'success' | 'info' | 'warning' | 'danger'}
         * @returns {ui.Progress}
         */
        setSkin: function(skin) {

            this._skin = ui.api.existProperty(ui.CSS.progress.skin, skin, this._skin);
            return this;
        },

        /**
         * @returns {string|number}
         */
        getId: function() {

            return this._id;
        },

        /**
         * @returns {ui.Progress}
         */
        _buildProgress: function() {

            return new ui.Element('div')
                .addStyleElement('display', 'block')
                .addStyleElement('paddingTop', '50px')
                .addClassElement(ui.CSS.modal.modal)
                .setIdElement(this._id, null)
                .addChildAfter(
                    new ui.Element('div')
                        .addStyleElement('height', '5px')
                        .addClassElement(ui.CSS.progress.progress)
                        .addClassElement(ui.CSS.progress.striped)
                        .addClassElement(ui.CSS.progress.active)
                        .addChildAfter(
                            new ui.Element('div')
                                .addClassElement(ui.CSS.progress.bar)
                                .addClassElement(this._skin)
                                .addStyleElement('width', '1%')
                                .getElement()
                        )
                        .getElement()

                )
                .getElement();
        },

        /**
         * @param {number} time
         * @returns {ui.Progress}
         */
        updateProgress: function(time) {

            var Progress = document.getElementById(this._id);
            var progress = Progress.querySelector('.' + ui.CSS.progress.bar);
            progress.style['width'] = time + '%';

            return this;
        },

        /**
         * @returns {ui.Progress}
         */
        setProgress: function() {

            this.beforeHTML('body');
            return this;
        },

        /**
         * @param {string|number|null} idProgress
         * @returns {ui.Progress}
         */
        removeProgress: function(idProgress) {

            var progress = document.getElementById(ui.api.empty(idProgress, this._id));

            if (progress) {
                progress.remove();
            }

            return this;
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {

            return this._buildProgress();
        },

        /**
         * Get html current element
         * @returns {string}
         * @public
         */
        toHTML: function() {

            return this._buildProgress().outerHTML;
        },

        /**
         * Add element in document
         * @param {string|number|null} selector
         * @returns {ui.Progress}
         * @public
         */
        appendHTML: function(selector) {

            new ui.dom(selector).append(this.getElement());
            return this;
        },

        /**
         * Add element in document
         * @param {string|number|null} selector
         * @returns {ui.Progress}
         * @public
         */
        beforeHTML: function(selector) {

            new ui.dom(selector).before(this.getElement());
            return this;
        }
    }
} (window.ui || {}));
(function(ui) {
    'use strict';

    /**
     * @memberOf ui
     * @namespace ui.Ajax
     * @constructor
     */
    ui.Ajax = function (data) {

        this._xhr = new XMLHttpRequest();
        this._callback = [];
        this._params = {};
        /**
         * @type {ui.Progress}
         */
        this._progress = new ui.Progress(null);
        this._progressLine = null;

    };

    /** @protected */
    ui.Ajax.prototype = {

        _method: ui.Config.defaultMethodAjax,
        _async: true,

        _skinProgress: 'warning',

        /**
         * @param {string} skin {'success' | 'info' | 'warning' | 'danger'}
         * @returns {ui.Ajax}
         */
        setSkin: function(skin) {

            this._skinProgress = skin;
            return this;
        },

        /**
         * @param {string} url
         * @returns {ui.Ajax}
         */
        setUrl: function(url) {

            this._url = url;
            return this;
        },

        /**
         * @param {string} method
         * @returns {ui.Ajax}
         */
        setMethod: function(method) {

            this._method = method;
            return this;
        },

        /**
         * @param {{}} object
         * @returns {ui.Ajax}
         */
        setParams: function(object) {

            this._params = object;
            return this;
        },

        /**
         * @param {string|number} key
         * @param {string|number|boolean|null} value
         * @returns {ui.Ajax}
         */
        addParam: function(key, value) {

            this._params[key] = value;
            return this;
        },

        /**
         * @returns {ui.Ajax}
         */
        asyncOff: function() {

            this._async = false;
            return this;
        },

        /**
         * @param {function} callback
         * @returns {ui.Ajax}
         */
        addCallbackFunction: function(callback) {

            this._callback.push(callback);
            return this;
        },

        /**
         * @returns {string|string|*}
         * @private
         */
        _parseParams: function() {

            var i = 0;
            var delimiter = '';
            var str = '';

            for (var key in this._params) {

                if (i == 1) {

                    delimiter = '&';
                }

                str += (delimiter + key + '=' + encodeURIComponent(this._params[key]));
                i++;
            }

            return str;
        },

        /**
         * Set progress send data to server
         */
        progress: function() {

            this._progressLine = this._progress
                .setSkin(this._skinProgress)
                .setProgress();

            var xhr = this;

            this._xhr.upload.onprogress = function(event) {

                var time = (event.loaded / event.total * 100 / 2);

                xhr._progressLine.updateProgress(time);

                if (event.total == event.loaded) {

                    var time_on = time;

                    xhr._xhr.onprogress = function(event) {

                        if (event.lengthComputable) {

                            time_on = time + ((event.loaded / event.total * 100) / 2);
                            xhr._progressLine.updateProgress(time + (time_on / 2));
                        }
                    };
                }
            };
        },

        /**
         * @returns {ui.Ajax}
         */
        send: function() {

            var params = this._parseParams();

            if (this._method == 'GET') {

                this._url += ('?' + params);
            }

            this._xhr.open(this._method, this._url, this._async);
            this._xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            this._xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

            if (this._method == 'POST') {

                this._xhr.send(params);

            } else {

                this._xhr.send(params);
            }

            this.progress();

            var currentObj = this;

            this._xhr.onreadystatechange = function() {

                if (this.readyState === 4 && this.status === 200) {

                    for (var key in currentObj._callback) {

                        currentObj._callback[key](this.responseText, this);
                    }

                    if (currentObj._progressLine) {

                        currentObj._progressLine.removeProgress(null);
                    }

                } else if (this.readyState === 4 && this.status !== 200) {

                    console.info(this.status + ': ' + this.statusText);

                    if (currentObj._progressLine) {

                        currentObj._progressLine.removeProgress(null);
                    }
                }
            };

            return this;
        }
    }
} (window.ui || {}));
(function(ui) {
    'use strict';

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
        this._locale = ui.api.empty(locale, ui.Config.lbl[ui.Config.locale]);
        this._lbl = ui.api.existProperty(ui.Config.lbl, this._locale, ui.Config.lbl[ui.Config.locale]);
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
(function(ui) {
    'use strict';

    var _TYPE_TEXT      = '_ffText';
    var _TYPE_PASS      = '_ffPassword';
    var _TYPE_TEXTAREA  = '_ffTextarea';
    var _TYPE_DATE      = '_ffDate';
    var _TYPE_SELECT    = '_ffSelect';
    var _TYPE_CHECKBOX  = '_ffCheckbox';
    var _TYPE_RADIO     = '_ffRadio';
    var _TYPE_READ_ONLY = '_ffReadonly';

    var _OBJECT_NAME  = 'object_name';
    var _PARENT_TITLE = 'parent_title';
    var _BLOCK_ROWS   = 'block_rows';
    var _BLOCK_FIELDS = 'block_fields';

    var _DATA_LAST_ROW_CH = 'data-last-row';
    var _DATA_OBJECT_CH   = 'data-object';
    var _DATA_NAME_FIELD  = 'data-name-field';

    var _CLASS_BTN_ADD     = 'btn_add';
    var _CLASS_BTN_DEL     = 'btn_del';
    var _CLASS_RECORD_ID   = 'record_id';
    var _CLASS_ROW         = 'row-fields';
    var _BLOCK_FIELD       = 'block-field';

    var DATA_JSON_FORM_PR = 'data-json-form-pr';
    var DATA_JSON_FORM_CH = 'data-json-form-ch';

    var uniqueId = new Date().getTime();

    /**
     * @memberOf ui
     * @constructor
     */
    ui.HtmlFields = function () {

        /**
         * @type {{}}
         * @private
         */
        this._settings = {};
        this.widthCaption = null;
        this.maxHeightFields = null;
        this.heightFields = null;
        this.formatDate = ui.Config.formatDateUser;
        this.checkboxText = ui.Config.checkboxText;
    };

    /** @public */
    ui.HtmlFields.prototype = {

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffReadonly: function(value, name, params) {

            var dataList = ui.api.existProperty(params, 'list', false);
            var dataValue = ui.api.setValue(value, name);

            if (dataList !== false) {

                value = ui.api.existProperty(dataList, dataValue, null);
            }

            if (params.type === _TYPE_DATE) {

                value = new ui.FormatDate(dataValue, this.formatDate).getDate();

            } else if (params.type === _TYPE_CHECKBOX) {

                value = ui.api.existProperty(this.checkboxText, dataValue, null);

            } else if (params.type === _TYPE_PASS) {

                value = ui.Config.valuePassword;
            }

            var caption = ui.api.existProperty(params, 'caption', null);

            return new ui.FFReadOnly(value, name, caption)
                .setWidthCaption(this.widthCaption)
                .setMaxHeight(ui.api.existProperty(params, 'height', this.maxHeightFields))
                .getElement();
        },

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffText: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            value = ui.api.setValue(value, name);

            return new ui.FFText(value, params['setname'], caption)
                .setRequired(ui.api.existProperty(params, 'required', false))
                .setWidthCaption(this.widthCaption)
                .getElement();
        },

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffPassword: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            value = ui.api.setValue(value, name);

            return new ui.FFPassword(value, params['setname'], caption)
                .setRequired(ui.api.existProperty(params, 'required', false))
                .setWidthCaption(this.widthCaption)
                .getElement();
        },

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffTextarea: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            value = ui.api.setValue(value, name);

            return new ui.FFTextarea(value, params['setname'], caption)
                .setRequired(ui.api.existProperty(params, 'required', false))
                .setHeight(ui.api.existProperty(params, 'height', this.maxHeightFields))
                .setWidthCaption(this.widthCaption)
                .setResize('vertical')
                .getElement();
        },

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffDate: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            value = ui.api.setValue(value, name);

            return new ui.FFDate(value, params['setname'], caption)
                .setRequired(ui.api.existProperty(params, 'required', false))
                .setWidthCaption(this.widthCaption)
                .getElement();
        },

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffSelect: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            var dataList = ui.api.existProperty(params, 'list', {});
            value = ui.api.setValue(value, name);

            return  new ui.FFSelect(value, params['setname'], caption)
                .setRequired(ui.api.existProperty(params, 'required', false))
                .setWidthCaption(this.widthCaption)
                .setList(dataList)
                .getElement();
        },

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffCheckbox: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            value = ui.api.setValue(value, name);

            return new ui.FFCheckbox()
                .addCheckbox(value, params['setname'], caption, null)
                .setRequired(ui.api.existProperty(params, 'required', false))
                .setCaptionBlock('', this.widthCaption)
                .setFieldsHorizontal()
                .getElement();
        },

        /**
         * @param {string|number|null} value
         * @param {string|null} name
         * @param {{}} params
         * @returns {*|Element}
         */
        _ffRadio: function(value, name, params) {

            var caption = ui.api.existProperty(params, 'caption', null);
            var dataList = ui.api.existProperty(params, 'list', {});
            value = ui.api.setValue(value, name);

            return  new ui.FFRadio(value, params['setname'], dataList)
                .setRequired(ui.api.existProperty(params, 'required', false))
                .setCaptionBlock(caption, this.widthCaption)
                .setWidthCaptionItem(ui.api.existProperty(params, 'width', 2))
                .setFieldsHorizontal()
                .getElement();
        },

        /**
         * @param {{}} params
         * @param {string} name
         * @returns {boolean}
         * @private
         */
        _setParametersFields: function(params, name) {

            var row = this._settings;
            var blockRows = row[_BLOCK_ROWS];
            var countRow  = Object.keys(blockRows).length - 1;

            if (blockRows[countRow].hasOwnProperty(_BLOCK_ROWS)) {
                // Переход к дочерним ключам
                row = blockRows[countRow];
                blockRows = blockRows[countRow][_BLOCK_ROWS];
                countRow  = Object.keys(blockRows).length - 1;
            }

            if (!blockRows[countRow].hasOwnProperty(_BLOCK_FIELDS)) {

                blockRows[countRow][_BLOCK_FIELDS] = {};
            }

            name = ui.api.empty(name, null);

            if (ui.api.empty(row[_OBJECT_NAME], null) !== null && name !== null) {

                params['object'] = row[_OBJECT_NAME];

            } else {

                params['object'] = null;

            }
            params['name'] = name;

            var blockFields = blockRows[countRow][_BLOCK_FIELDS];

            if (name === null) {

                name = _TYPE_READ_ONLY + '_' + Object.keys(blockFields).length;
            }

            blockFields[name] = params;

            return true;
        },

        /**
         * @param {string|null} name
         * @param {string|number|null} caption
         * @param {string|number|null} height
         * @returns {ui.HtmlFields}
         */
        addReadOnlyField: function(name, caption, height) {

            var params = {
                type: _TYPE_READ_ONLY,
                caption: caption,
                height: height
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addTextField: function(name, caption, required) {

            var params = {
                type: _TYPE_TEXT,
                caption: caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addPasswordField: function(name, caption, required) {

            var params = {
                type:     _TYPE_PASS,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @param {string|number|null} height
         * @returns {ui.HtmlFields}
         */
        addTextareaField: function(name, caption, required, height) {

            var params = {
                type:     _TYPE_TEXTAREA,
                caption:  caption,
                required: ui.api.empty(required, false),
                height: ui.api.empty(height, null)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addDateField: function(name, caption, required) {

            var params = {
                type:     _TYPE_DATE,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {{}|[]} data
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addSelectField: function(name, caption, data, required) {

            var params = {
                type:     _TYPE_SELECT,
                caption:  caption,
                required: ui.api.empty(required, false),
                list:     data
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number} caption
         * @param {boolean} required
         * @returns {ui.HtmlFields}
         */
        addCheckboxField: function(name, caption, required) {

            var params = {
                type:     _TYPE_CHECKBOX,
                caption:  caption,
                required: ui.api.empty(required, false)
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {string} name
         * @param {string|number|null} caption
         * @param {{}|[]} data
         * @param {boolean} required
         * @param {number|null} width
         * @returns {ui.HtmlFields}
         */
        addRadioField: function(name, caption, data, required, width) {

            var params = {
                type:     _TYPE_RADIO,
                caption:  caption,
                required: ui.api.empty(required, false),
                list:     data,
                width:    width
            };

            this._setParametersFields(params, name);

            return this;
        },

        /**
         * @param {number|string} height
         * @returns {ui.HtmlFields}
         */
        setMaxHeightFields: function(height) {
            this.maxHeightFields = height;
            return this;
        },

        /**
         * Set width label field {1-10}
         * @param {number|null} widthCaption {1-10}
         * @returns {ui.HtmlFields}
         * @public
         */
        setWidthCaption: function(widthCaption) {
            this.widthCaption = widthCaption;
            return this;
        },

        /**
         *
         * @param {string} format
         * @returns {ui.HtmlFields}
         */
        setFormatDate: function(format) {
            this.formatDate = format;
            return this;
        },

        /**
         * @param {{}|[]} data
         * @example
         *          {0: 'Нет', 1: 'Да'}
         * @returns {ui.HtmlFields}
         */
        setCheckboxValuesRead: function(data) {

            if (typeof data == 'object') {

                this.checkboxText = data;
            }

            return this;
        }
    };

    /**
     * @memberOf ui
     * @param {string} idForm
     * @param {string|null} locale
     * @constructor
     */
    ui.Form = function (idForm, locale) {

        ui.HtmlFields.apply(this, arguments);

        this._parentValues = {};
        this._childrenValues = {};
        this._childrenRecordId = {};

        this._btnLeftTopForm = [];
        this._btnRightTopForm = [];

        this._btnLeftBottomForm = [];
        this._btnRightBottomForm = [];

        this._hideBtnForm = {
            _btnSave:   false,
            _btnClear:  false,
            _btnRemove: false,
            _btnBack:   false,
            _btnReload: false,
            _btnList:   false
        };

        this._idForm = ui.api.empty(idForm, uniqueId);
        uniqueId++;

        this._validation = true;
        this._paddingRelateBlock = 'xs';
        this._fieldRecordForm =   '';
        this._titleForm =      null;
        this._titleFormSmall = null;
        this._skinPanel = 'primary';
        this._paddingPanels = 'xs';
        this._paddingChildrenPanel = 'sm';
        this._method = ui.Config.defaultMethodForm;
        this._checkboxText = ui.Config.checkboxText;
        this._urlBack = document.referrer;
        this._urlDel =  null;
        this._urlActionForm = null;
        this._urlList = null;
        this._actions = {
            removeParent: 'removeParent',
            removeChildren: 'removeChildren'
        };
        this._readOnly = false;
        this._locale = ui.api.empty(locale, ui.Config.lbl[ui.Config.locale]);
        this._lbl = ui.api.existProperty(ui.Config.lbl, this._locale, ui.Config.lbl[ui.Config.locale]);
    };

    ui.Form.prototype = Object.create(ui.HtmlFields.prototype);

    ui.Form.prototype.constructor = ui.Form;

    /**
     * @param {string} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'|'muted'}
     * @returns {ui.Form}
     */
    ui.Form.prototype.setSkin = function(skin) {
        this._skinPanel = skin;
        return this;
    };

    /**
     * @private
     * returns {voild}
     */
    ui.Form.prototype._addDefaultBtn = function() {

        if (this._urlList !== null && this._hideBtnForm._btnList === false) {

            this._btnRightTopForm.push(
                {
                    type:     'button',
                    name:     '_list',
                    leftIcon: 'list',
                    skin:     'primary',
                    caption:  this._lbl.btn_list,
                    active: true,
                    onclick:  "ui.api.reload('" + this._urlList + "');"
                }
            );
        }

        if (this._hideBtnForm._btnBack === false && this._urlBack != '' && this._urlBack !== window.location.href) {

            this._btnLeftTopForm.push(
                {
                    type:     'button',
                    name:     '_btnBack',
                    leftIcon: 'share-alt',
                    caption:  this._lbl.btn_back,
                    active: false,
                    onclick:  "window.location.href = '" + this._urlBack + "'"
                }
            );
        }

        if (this._hideBtnForm._btnReload === false) {

            this._btnLeftTopForm.push(
                {
                    type: 'button',
                    name: '_reloadPage',
                    leftIcon: 'repeat',
                    active: false,
                    onclick: "ui.api.reload();"
                }
            );
        }

        if (this._hideBtnForm._btnSave === false && this._readOnly === false) {

            this._btnRightBottomForm.push(
                {
                    type: 'button',
                    name: '_btnSave',
                    leftIcon: 'save',
                    skin: 'primary',
                    active: true,
                    caption: this._lbl.btn_save,
                    onclick: "new ui.Form('" + this._idForm + "', '" + this._locale + "')._save();"
                }
            );
        }

        if (this._hideBtnForm._btnClear === false && this._readOnly === false) {

            this._btnRightBottomForm.push(
                {
                    type:     'button',
                    name:     '_btnClear',
                    leftIcon: 'refresh',
                    skin:     'primary',
                    caption:  this._lbl.btn_clear,
                    active: true,
                    onclick:  "new ui.Form('" + this._idForm + "', '" + this._locale + "')._reset();"
                }
            );
        }

        if (this._hideBtnForm._btnRemove === false && this._parentValues.hasOwnProperty(this._fieldRecordForm) && this._urlDel !== null) {

            this._btnRightBottomForm.push(
                {
                    type:     'button',
                    name:     '_btnRemove',
                    leftIcon: 'trash',
                    skin:     'danger',
                    active: true,
                    caption:  this._lbl.btn_remove,
                    onclick:  "new ui.Form('" + this._idForm + "', '" + this._locale + "')._removeParent();"
                }
            );
        }
    };

    /**
     * @param {number} position 1 - 'top/left'| 2 - top/right | 3 - bottom/left | 4 - bottom/right
     * @param {string|null} typeBtn {'button'|'submit'}
     * @param {string|null} name
     * @param {string} icon
     * @param {string|number} caption
     * @param {string|null} onclick
     * @param {string} skin { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
     * @param {boolean} active
     * @returns {ui.Form}
     */
    ui.Form.prototype.addButton = function(position, typeBtn, name, icon, caption, onclick, skin, active) {

        var obj = {1: '_btnLeftTopForm', 2: '_btnRightTopForm', 3: '_btnLeftBottomForm', 4: '_btnRightBottomForm'};

        if (ui.api.existProperty(obj, position, false)) {

            var sendForm = typeBtn == 'submit' ? 'new ui.Form("' + this._idForm + '", "' + this._locale + '").sendForm(); ' : '';

            this[obj[position]].push(
                {
                    type: ui.api.empty(typeBtn, null),
                    name: ui.api.empty(name, null),
                    leftIcon: ui.api.empty(icon, null),
                    caption: ui.api.empty(caption, null),
                    skin: ui.api.empty(skin, null),
                    onclick: sendForm + ui.api.empty(onclick, null),
                    active: active
                }
            );
        }

        return this;
    };

    /**
     * Send form data to server
     */
    ui.Form.prototype.sendForm = function() {

        var data = new ui.FormData(this._idForm, this._locale).getData();

        if (data.error.length === 0) {

            document.getElementById(this._idForm).submit();
        }

        return false;
    };

    /**
     * @returns {*|Element}
     * @private
     */
    ui.Form.prototype._blockHiddenPr = function() {

        var obj = {
            _urlActionForm: this._urlActionForm,
            _urlDel: this._urlDel,
            _fieldRecordForm: this._fieldRecordForm,
            _idRecord: ui.api.existProperty(this._parentValues, this._fieldRecordForm, null),
            _actions: {
                removeParent: this._actions.removeParent
            }
        };

        return new ui.Element('div')
            .setAttrElement('hidden',  true)
            .addClassElement(ui.CSS.formBlockHiddenClass)
            .addChildAfter(
                new ui.Element('div')
                    .setIdElement(DATA_JSON_FORM_PR, null)
                    .setAttrElement(DATA_JSON_FORM_PR, JSON.stringify(obj))
                    .getElement()
            )
            .getElement();
    };

    ui.Form.prototype._blockHiddenCh = function(data) {

        var obj = {
            _objectName:  data['object'],
            _fieldName:   data['record_name'],
            _fieldRecordForm: data['record_field'],
            _idRecord:    data['record'],
            _idForm: this._idForm,
            _actions: {
                removeChildren: this._actions.removeChildren
            }
        };

        return new ui.Element('div')
            .setAttrElement('hidden',  true)
            .addClassElement(ui.CSS.formBlockHiddenClass)
            .addChildAfter(
                new ui.Element('div')
                    .addClassElement(DATA_JSON_FORM_CH)
                    .setAttrElement(DATA_JSON_FORM_CH, JSON.stringify(obj))
                    .getElement()
            )
            .getElement();
    };

    /**
     * @param {
     *          {
     *              objectName: 'string|null',
     *              blockRows: {
     *                  row_0: {
     *                      blockFields: {
     *                          nameFields: {
     *                              type: 'string',
     *                              caption: 'string|number',
     *                              required: 'boolean',
     *                              list: {},
     *                              height: 'string|number|null'
     *                          }
     *                      }
     *                  },
     *                  row_1: {
     *                      objectName: 'string|null',
     *                      blockRows: {
     *                          row_0: {
     *                              blockFields: {
     *                                  nameFields: {
     *                                      type: 'string',
     *                                      caption: 'string|number',
     *                                      required: 'boolean',
     *                                      list: {},
     *                                      height: 'string|number|null'
     *                                  }
     *                              }
     *                          },
     *                      }
     *                  }
     *              }
     *          }
     *        } settings
     * @param {boolean} parent If build row for parent object is true else false
     * @returns {*|Element}
     * @private
     */
    ui.Form.prototype._buildBlockRows = function (settings, parent) {

        var objName = settings[_OBJECT_NAME];
        var title   = settings[_PARENT_TITLE];

        var panel = new ui.Element('div')
            .addClassElement(ui.CSS.panelClass.panel)
            .setSkinElement('panel', this._skinPanel);

        if (ui.api.empty(title, false)) {

            panel.addChildBefore(
                new ui.Element('div')
                    .addClassElement(ui.CSS.panelClass.panelHead)
                    .addChildBefore(
                        new ui.Element('h3')
                            .addClassElement(ui.CSS.panelClass.panelTitle)
                            .setContentElement(title)
                            .getElement()
                    )
                    .getElement()
            )
        }

        var panelBody = new ui.Element('div')
            .addClassElement(ui.CSS.panelClass.panelBody);

        var key = null;

        if (parent === true) {

            panelBody.addChildBefore(
                this._buildRow(this._parentValues, settings, null)
            );

        } else {

            if (this._childrenValues.hasOwnProperty(objName)) {

                var values = this._childrenValues[objName];
                var countRecord = Object.keys(values).length;

                for (key in values) {

                    panelBody
                        .setAttrElement(_DATA_LAST_ROW_CH, countRecord)
                        .setAttrElement(_DATA_OBJECT_CH, objName)
                        .addChildAfter(this._buildRow(values[key], settings, key));
                }
            }

            if (key === null) {

                panelBody.addChildBefore(
                    this._buildRow({}, settings, 0)
                );
            }
        }

        if (key === null && this._readOnly === true && parent === false) {

            return new ui.Element('div')
                .getElement();

        } else {

            return panel
                .setPaddingElement(this._paddingPanels)
                .addChildAfter(panelBody.getElement())
                .getElement();
        }
    };

    /**
     * This method build rows and cells with fields also blocks and rows with cells and fields
     * @param {{}} values
     * @param {
     *          {
     *              objectName: 'objectName',
     *              blockRows: {
     *                  row_0: {
     *                      blockFields: {
     *                          nameFields: {
     *                              type: 'string',
     *                              caption: 'string|number',
     *                              required: 'boolean',
     *                              list: {},
     *                              height: 'string|number|null'
     *                          }
     *                      }
     *                  },
     *                  row_1: {
     *                      objectName: 'string|null',
     *                      blockRows: {
     *                          row_0: {
     *                              blockFields: {
     *                                  nameFields: {
     *                                      type: 'string',
     *                                      caption: 'string|number',
     *                                      required: 'boolean',
     *                                      list: {},
     *                                      height: 'string|number|null'
     *                                  }
     *                              }
     *                          }
     *                      }
     *                  }
     *              }
     *          }
     *        } settings
     * @param {number|null} key_record
     * @returns {*|Element}
     * @private
     */
    ui.Form.prototype._buildRow = function(values, settings, key_record) {

        var params  = settings[_BLOCK_ROWS];
        var objName = settings[_OBJECT_NAME];

        var blockRows = new ui.Element('div')
            .addClassElement(_CLASS_ROW);

        if (this._childrenRecordId.hasOwnProperty(objName)) {

            var name = this._childrenRecordId[objName];
            var record_params   = {object: objName, name: name};
            var record = ui.api.setValue(values, name);
            this._setNameField(key_record, record_params);

            blockRows
                .addChildAfter(
                    this._blockHiddenCh(
                        {
                            object: objName,
                            record: record,
                            record_name: record_params['setname'],
                            record_field: name
                        }
                    )
                );
        }

        for (var numRow in params) {

            if (params[numRow].hasOwnProperty(_BLOCK_ROWS)) {

                blockRows
                    .addChildAfter(
                        new ui.Element('div')
                            .setPaddingElement(this._paddingChildrenPanel)
                            .addChildBefore(
                                this._buildBlockRows(params[numRow], false)
                            )
                            .getElement()
                    )

            } else {

                blockRows.addChildAfter(
                    new ui.Element('div')
                        .addClassElement(ui.CSS.newLine)
                        .setPaddingElement(this._paddingRelateBlock)
                        .addChildAfter(
                            this._buildFields(values, objName, params[numRow][_BLOCK_FIELDS], key_record, numRow)
                        )
                        .getElement()
                )
            }
        }

        if (key_record) {

            blockRows
                .addChildAfter(
                    new ui.Element('hr')
                        .getElement()
                );
        }

        return blockRows.getElement();
    };

    /**
     * This method build cell with fields
     *
     * @param {{}} values
     * @param {[]} objectName
     * @param {
     *          {
     *              nameFields: {
     *                  type: 'string',
     *                  caption: 'string|number',
     *                  required: 'boolean',
     *                  list: {},
     *                  height: 'string|number|null'
     *              }
     *          }
     *        } settings
     * @param {number|null} key_record
     * @param {number} numRow
     * @returns {*|Element}
     * @private
     */
    ui.Form.prototype._buildFields = function(values, objectName, settings, key_record, numRow) {

        var blockFields = new ui.Element('div');

        for (var nameField in settings) {

            var params = settings[nameField];

            if (params.hasOwnProperty('type')) {

                var type = params.type;

                if (this._readOnly !== false) {

                    type = _TYPE_READ_ONLY;
                }

                this._setNameField(key_record, params);

                /**
                 * @type Node
                 */
                var field = this[type](values, nameField, params);
                var delimiter = (key_record === null) ? 12 : 10;
                var countGroup = Math.round(delimiter / (Object.keys(settings).length));

                blockFields
                    .addChildAfter(
                        new ui.Element('div')
                            .setAttrElement(_DATA_NAME_FIELD, params['name'])
                            .addClassElement(_BLOCK_FIELD)
                            .setWidthElement(countGroup)
                            .addChildAfter(field)
                            .getElement()
                    );
            }
        }

        if (key_record !== null && numRow == 0 && this._readOnly === false) {

            var btn = new ui.FFButton()
                .setGroup('toolbar')
                .setOnClick("new ui.Form(null, '" + this._locale + "')._addChildren(this);")
                .setClass(_CLASS_BTN_ADD)
                .addButton(null, null, null, null, false, 'plus')
                .setOnClick("new ui.Form(null, '" + this._locale + "')._removeChildren(this);")
                .setClass(_CLASS_BTN_DEL)
                .addButton(null, 'del_record', null, null, false, 'minus')
                .setSize('sm')
                .setPositionBlock('right');

            if (Object.keys(values).length == 0) {

                btn.hide('del_record');
            }

            blockFields
                .addChildAfter(
                    btn.getElement()
                );
        }

        return blockFields.getElement();
    };

    /**
     * @param {number|null} key_record
     * @param {{}} params
     * @private
     */
    ui.Form.prototype._setNameField = function(key_record, params) {

        if (key_record !== null) {

            params['setname'] = params['object'] + '[' + key_record + '][' + params['name'] + ']';

        } else {

            if (params['object'] !== null) {

                params['setname'] = params['object'] + '[' + params['name'] + ']';

            } else {

                params['setname'] = params['name'];
            }
        }
    };

    /**
     * Generate html form
     * @returns {*|Element}
     * @private
     */
    ui.Form.prototype._buildForm = function() {

        var form = new ui.Element('form')
            .setIdElement(this._idForm, null)
            .setAttrElement('method', this._method)
            .addChildBefore(this._blockHiddenPr())
            .addChildAfter(this._buildBlockRows(this._settings, true))
            .setAttrElement('action', this._urlActionForm);

        this._addDefaultBtn();

        var page = new ui.Page(null)
            .setTitle(this._titleForm, this._titleFormSmall, null);

        if (this._btnLeftTopForm.length > 0 || this._btnRightTopForm.length > 0) {

            page.setHead(this._buildRowButtons(this._btnLeftTopForm, this._btnRightTopForm));
        }

        page.setBody(form.toHTML());

        if (this._btnLeftBottomForm.length > 0 || this._btnRightBottomForm.length > 0) {

            page.setFooter(this._buildRowButtons(this._btnLeftBottomForm, this._btnRightBottomForm));
        }

        return page.getElement();
    };

    /**
     * @param {[]} leftBtn
     * @param {[]} rightBtn
     * @returns {string}
     * @private
     */
    ui.Form.prototype._buildRowButtons = function (leftBtn, rightBtn) {

        return new ui.Element('div')
            .addClassElement(ui.CSS.newLine)
            .addChildAfter(
                new ui.Element('div')
                    .setWidthElement(6)
                    .addChildAfter(
                        new ui.FFButton()
                            .addButtonList(leftBtn)
                            .setPositionBlock('left')
                            .setGroup('toolbar')
                            .getElement()
                    )
                    .getElement()
            )
            .addChildAfter(
                new ui.Element('div')
                    .setWidthElement(6)
                    .addChildAfter(
                        new ui.FFButton()
                            .addButtonList(rightBtn)
                            .setPositionBlock('right')
                            .setGroup('toolbar')
                            .getElement()
                    )
                    .getElement()
            ).toHTML();
    };

    /**
     * @returns {boolean}
     */
    ui.Form.prototype._save = function() {

        var dataBlock = document.body.querySelector('#' + this._idForm + ' #' + DATA_JSON_FORM_PR);
        var str = dataBlock.getAttribute(DATA_JSON_FORM_PR);
        var listParams = JSON.parse(str);

        var data = new ui.FormData(this._idForm, this._locale).getData();

        if (data.error.length === 0) {

            var curObj = this;

            new ui.Ajax()
                .setUrl(listParams._urlActionForm)
                .setParams(data['data'])
                .addParam('action', (listParams._idRecord > 0) ? 'save' : 'edit')
                .addCallbackFunction(function (e) {

                    e == 0 ? new ui.Modal(null, curObj._locale).error('Сохранение невозможно!') : new ui.Modal(null, curObj._locale).alert('Данные успешно сохранены!');
                })
                .send();
        } else {

            new ui.Modal(null, this._locale).error('Заполните обязательные поля и повторите!');
        }

        return true;
    };

    /**
     * @returns {boolean}
     */
    ui.Form.prototype._removeParent = function() {

        var dataBlock = document.body.querySelector('#' + this._idForm + ' #' + DATA_JSON_FORM_PR);
        var str = dataBlock.getAttribute(DATA_JSON_FORM_PR);
        var listParams = JSON.parse(str);

        if (listParams._idRecord != '' &&  listParams._urlDel != '' && listParams._fieldRecordForm != '') {

            var obj = {};
            obj[listParams._fieldRecordForm] = listParams._idRecord;
            var curObj = this;

            new ui.Ajax()
                .setUrl(listParams._urlDel)
                .setParams(obj)
                .addParam('action', listParams._actions.removeParent)
                .addCallbackFunction(
                    function (e) {

                        e == 0 ? new ui.Modal(null, curObj._locale).error('Удаление невозможно!') : ui.api.reload(null);
                    }
                )
                .send();
        }

        return true
    };

    /**
     * @param {Node} element
     * @private
     */
    ui.Form.prototype._removeChildren = function(element) {

        var block = ui.api.findParent(element, '.' + _CLASS_ROW);
        var dataBlock = block.querySelector('.' + DATA_JSON_FORM_CH);
        var str = dataBlock.getAttribute(DATA_JSON_FORM_CH);
        var parentBlock = block.parentElement;

        try {

            var listParams = JSON.parse(str);
            var dataParentBlock = document.body.querySelector('#' + listParams._idForm + ' #' + DATA_JSON_FORM_PR);
            var listParamsParent = JSON.parse(dataParentBlock.getAttribute(DATA_JSON_FORM_PR));

            var data = {};
            data[listParams._fieldRecordForm] = listParams._idRecord;
            data['object'] = listParams._objectName;

            new ui.Ajax()
                .setUrl(listParamsParent._urlDel)
                .setParams(data)
                .addParam('action', listParams._actions.removeChildren)
                .addCallbackFunction(function (e) {

                    console.log(e);
                })
                .send();
        } catch (e) {

        }

        if (parentBlock.childElementCount == 2) {

            var children = parentBlock.childNodes, key;

            for (key in children) {

                if (typeof children[key] == 'object') {

                    ui.api.hide(children[key].querySelector('.' + _CLASS_BTN_DEL));
                }
            }
        }

        block.remove();
    };

    /**
     * @param {Node} element
     * @private
     */
    ui.Form.prototype._addChildren = function(element) {

        var block = ui.api.findParent(element, '.' + _CLASS_ROW);
        var parentBlock = block.parentElement;

        var btn = parentBlock.children[0].querySelector('.' + _CLASS_BTN_DEL);
        ui.api.show(btn);

        var rowClone = block.cloneNode(true);
        //Reset data clone
        var dataBlock = rowClone.querySelector('.' + DATA_JSON_FORM_CH);

        var str = dataBlock.getAttribute(DATA_JSON_FORM_CH);
        var listParams = JSON.parse(str);

        for (var property in listParams) {

            listParams[property] = null;
        }
        dataBlock.setAttribute(DATA_JSON_FORM_CH, JSON.stringify(listParams));

        //Find tag with text error in clone
        var errorBlock = rowClone.querySelector('.' + ui.CSS.validateErrorClass);
        errorBlock.innerHTML = '';

        var record = rowClone.querySelector('.' + _CLASS_RECORD_ID);

        if (record !== null) {

            ui.api.findParent(record, '.' + ui.CSS.validateFieldBlockClass).remove();
        }

        //Find fields in clone
        var fields = rowClone.querySelectorAll('input, textarea, select');

        var key = null;
        var object_name = parentBlock.getAttribute(_DATA_OBJECT_CH);
        var lastRow = parentBlock.getAttribute(_DATA_LAST_ROW_CH);

        for (key in fields) {

            if (typeof fields[key] == 'object') {
                //Reset style error
                var skinClass = ui.CSS.prefixClass.field + '-' + ui.CSS.skinClass.default.error;
                fields[key].parentElement.classList.remove(skinClass);

                var block_field = ui.api.findParent(fields[key], '.' + _BLOCK_FIELD);

                if (block_field !== null) {

                    var field_name = block_field.getAttribute(_DATA_NAME_FIELD);
                    fields[key].setAttribute('name', object_name + '[' + lastRow + '][' + field_name + ']');
                    block_field.querySelector('.' + ui.CSS.validateErrorClass).innerHTML = '';
                }

                fields[key].defaultValue = '';
                fields[key].value = '';
                fields[key].innerHTML = '';
            }
        }

        lastRow++;
        parentBlock.setAttribute(_DATA_LAST_ROW_CH, lastRow);

        block.parentElement.insertBefore(rowClone, block.nextSibling);
    };

    /**
     * @returns {boolean}
     */
    ui.Form.prototype._reset = function() {

        document.getElementById(this._idForm).reset();

        var elements = new ui.FormData(this._idForm, this._locale).getFormElements();

        for (var key in elements) {

            var element = elements.item(key);
            ui.api.clear(element);

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
    };

    /**
     * Shut off validator
     * @returns {ui.Form}
     */
    ui.Form.prototype.disableValidation = function() {

        this._validation = false;
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnSave = function(hide) {

        this._hideBtnForm._btnSave = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnClear = function(hide) {

        this._hideBtnForm._btnClear = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnRemove = function(hide) {

        this._hideBtnForm._btnRemove = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnBack = function(hide) {

        this._hideBtnForm._btnBack = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnReload = function(hide) {

        this._hideBtnForm._btnReload = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.Form}
     */
    ui.Form.prototype.hideBtnList = function(hide) {

        this._hideBtnForm._btnList = ui.api.empty(hide, true);
        return this;
    };

    /**
     * Add new row for fields
     * @returns {ui.Form}
     * @public
     */
    ui.Form.prototype.newLineParent = function()  {

        var row = this._settings;

        if (!row.hasOwnProperty(_BLOCK_ROWS)) {

            row[_BLOCK_ROWS] = [];
        }

        row[_BLOCK_ROWS].push({});

        return this;
    };

    /**
     * Add new row for children object
     * @returns {ui.Form}
     */
    ui.Form.prototype.newLineChildren = function() {

        var row_parent = this._settings;
        var len_children = Object.keys(row_parent[_BLOCK_ROWS]).length - 1;
        var row_children = row_parent[_BLOCK_ROWS][len_children];

        if (!row_children.hasOwnProperty(_BLOCK_ROWS)) {

            row_children[_BLOCK_ROWS] = [];
        }

        row_children[_BLOCK_ROWS].push({});

        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} record
     * @param {{}} data
     * @returns {ui.Form}
     * @public
     */
    ui.Form.prototype.setParentBlock = function (title, record, data) {

        var obj = {};
        obj[_PARENT_TITLE] = title;

        this._settings = obj;
        this._fieldRecordForm = ui.api.empty(record, 'id');
        this._parentValues = ui.api.empty(data, {});

        return this;
    };

    /**
     * @param {string} objectName
     * @param {string} title
     * @param {string} recordId
     * @param {{}|[]} data
     * @returns {ui.Form}
     * @public
     */
    ui.Form.prototype.addChildrenBlock = function(title, objectName, recordId, data) {

        var obj = {};
        obj[_PARENT_TITLE] = title;
        obj[_OBJECT_NAME] = objectName;
        obj[_BLOCK_ROWS] = [];

        if (!this._settings.hasOwnProperty(_BLOCK_ROWS)) {

            this._settings[_BLOCK_ROWS] = [];
        }

        this._settings[_BLOCK_ROWS].push(obj);
        this._childrenRecordId[objectName] = recordId;
        this._childrenValues[objectName] = ui.api.empty(data, []);

        return this;
    };

    /**
     * @param {string} padding {'sm' | 'lg'}
     * @returns {ui.Form}
     */
    ui.Form.prototype.setPaddingRelateBlock = function(padding) {

        this._paddingRelateBlock = padding;
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} titleSmall
     * @returns {ui.Form}
     */
    ui.Form.prototype.setTitle = function(title, titleSmall) {

        this._titleForm = ui.api.empty(title, null);
        this._titleFormSmall = ui.api.empty(titleSmall, null);
        return this;
    };

    /**
     * @param {string} method {'GET'|'POST'}
     * @returns {ui.Form}
     */
    ui.Form.prototype.setMethod = function(method) {

        this._method = ui.api.empty(method, ui.Config.defaultMethodForm);
        return this;
    };

    /**
     * @param {string} url
     * @returns {ui.Form}
     */
    ui.Form.prototype.setUrlBack = function(url) {

        this._urlBack = url;
        return this
    };

    /**
     * @param {string} url
     * @returns {ui.Form}
     */
    ui.Form.prototype.setUrlActionForm = function(url) {

        this._urlActionForm = url;
        return this;
    };

    /**
     * @param {string} url
     * @returns {ui.Form}
     */
    ui.Form.prototype.setUrtDel = function( url) {

        this._urlDel = url;
        return this;
    };

    /**
     * @param {string} url
     * @returns {ui.Form}
     */
    ui.Form.prototype.setUrtList = function( url) {

        this._urlList = url;
        return this;
    };

    /**
     * @param {boolean} read
     * @returns {ui.Form}
     */
    ui.Form.prototype.setFormReadOnly = function(read) {

        this._readOnly = ui.api.empty(read, true);
        return this;
    };

    /**
     * Get object current element
     * @returns {*|Element}
     * @public
     */
    ui.Form.prototype.getElement = function() {

        return this._buildForm();
    };

    /**
     * Get html current element
     * @returns {string}
     * @public
     */
    ui.Form.prototype.toHTML = function() {

        return this._buildForm().outerHTML;
    };

    /**
     * Add element in document
     * @param {string} selector
     * @returns {ui.Form}
     * @public
     */
    ui.Form.prototype.appendHTML = function(selector) {

        new ui.dom(selector).append(this.getElement());
        return this;
    };

} (window.ui || {}));

    (function(ui) {
        'use strict';

        var uniqueId = new Date().getTime();

        /**
         * @memberOf ui
         * @namespace ui.Page
         * @param {string|null} idPage
         * @constructor
         */
        ui.Page = function (idPage) {

            /**
             * @type {string}
             * @private
             */
            this._idPage = ui.api.empty(idPage, 'page-' + uniqueId);
        };

        /** @protected */
        ui.Page.prototype = {

            _title:  null,
            _titleSmall: null,
            _titleSize: 3,
            _header: null,
            _body:   null,
            _footer: null,

            /**
             *
             * @param title
             * @param titleSmall
             * @param size
             * @returns {ui.Page}
             */
            setTitle: function(title, titleSmall, size) {

                this._title = ui.api.empty(title, null);
                this._titleSmall = ui.api.empty(titleSmall, null);

                if (typeof size == 'number') {

                    this._titleSize = size;
                }

                return this;
            },

            /**
             *
             * @param head
             * @returns {ui.Page}
             */
            setHead: function(head) {

                this._header = head;
                return this;
            },

            /**
             * @param {string|number|null} body
             * @returns {ui.Page}
             */
            setBody: function(body) {

                this._body = body;
                return this;
            },

            /**
             *
             * @param footer
             * @returns {ui.Page}
             */
            setFooter: function(footer) {

                this._footer = footer;
                return this;
            },

            _buildTitle: function() {

                return new ui.Element('div')
                    //.addClassElement(ui.CSS.page.header)
                    .addChildAfter(
                        new ui.Element('h' + this._titleSize)
                            .setContentElement(ui.api.empty(this._title, '') + ' ')
                            .addChildAfter(
                                new ui.Element('small')
                                    .setContentElement(this._titleSmall)
                                    .getElement()
                            )
                            .getElement()
                    )
                    .getElement();
            },

            _buildHeader: function() {

                return new ui.Element('div')
                    .addClassElement(ui.CSS.alignClass.block.clear)
                    .setContentElement(this._header)
                    .getElement();
            },

            _buildBody: function() {

                return new ui.Element('div')
                    .addClassElement(ui.CSS.alignClass.block.clear)
                    .setContentElement(this._body)
                    .getElement();
            },

            _buildFooter: function() {

                return new ui.Element('div')
                    .setContentElement(this._footer)
                    .getElement();
            },

            _buildMainBlock: function() {

                var page =  new ui.Element('div')
                    .setIdElement(this._idPage, null)
                    .addClassElement(ui.CSS.alignClass.block.clear)
                    .addClassElement(ui.CSS.page.main);

                if (this._title !== null || this._titleSmall !== null) {

                    page
                        .addChildAfter(this._buildTitle());
                }

                if (this._header !== null) {

                    page
                        .addChildAfter(this._buildHeader());
                }

                if (this._body !== null) {

                    page
                        .addChildAfter(this._buildBody());
                }

                if (this._footer !== null) {

                    page
                        .addChildAfter(this._buildFooter());
                }

                return page.getElement();
            },

            /**
             * Get object current element
             * @returns {*|Element}
             * @public
             */
            getElement: function() {
                return this._buildMainBlock();
            },

            /**
             * Get html current element
             * @returns {string}
             * @public
             */
            toHTML: function() {
                return this._buildMainBlock().outerHTML;
            },

            /**
             * Add element in document
             * @param {string} selector
             * @returns {ui.Page}
             * @public
             */
            appendHTML: function(selector) {

                new ui.dom(selector).append(this.getElement());
                return this;
            }
        }

    } (window.ui || {}));

(function(ui) {
    'use strict';

    var uniqueId = new Date().getTime();
    var DATA_JSON_PAGINATION = 'data-json-pagination';

    /**
     * @memberOf ui
     * @namespace ui.Pagination
     * @param {string|null} id
     * @constructor
     */
    ui.Pagination = function(id) {

        /**
         * @type {string}
         * @private
         */
        this._id = ui.api.empty(id, 'pagination-' + uniqueId);
        uniqueId++;
    };

    /** @protected */
    ui.Pagination.prototype = {

        _linkParam: '?page=',
        _nameNext: '&raquo;',
        _namePrevious: '&laquo;',
        _nameNextTwo: '&raquo;&raquo;',
        _namePreviousTwo: '&laquo;&laquo;',
        _maxItem: 3,
        _currentPage: 1,
        _size: ui.CSS.pagination.size.sm,
        _skin: null,
        _type: ui.CSS.pagination.type.default,
        _position: ui.CSS.alignClass.block.right,
        _link: null,
        _callback: '',
        _countPages: null,
        _ajaxUrl: false,

        /**
         * Html item return to the first page
         *
         * @param {string|null} type {'l'|'r'|null}
         * @returns {string}
         * @private
         */
        _getFirstItem: function(type) {

            var disabled = null;

            if (this._currentPage == 1) {

                disabled = true;
            }

            return this._getItem(1, this._namePreviousTwo, disabled, null, type);
        },

        /**
         * Html item return to the last page
         *
         * @param {string|null} type {'l'|'r'|null}
         * @returns {string}
         * @private
         */
        _getLastItem: function(type) {

            var disabled = null;

            if (this._currentPage == this._countPages) {

                disabled = true;
            }

            return this._getItem(this._countPages, this._nameNextTwo, disabled, null, type);
        },

        /**
         * Html item return to the previous page
         *
         * @param {string|null} type {'l'|'r'|null}
         * @returns {*|string}
         * @private
         */
        _getPrevItem: function(type) {

            var page = (this._currentPage > 1) ? (this._currentPage - 1) : this._countPages;

            return this._getItem(page, this._namePrevious, null, null, type);
        },

        /**
         * Html item return to the next page
         *
         * @param {string|null} type {'l'|'r'|null}
         * @returns {*|string}
         * @private
         */
        _getNextItem: function(type) {

            var page = (this._currentPage < this._countPages) ? (this._currentPage + 1) : 1;

            return this._getItem(page, this._nameNext, null, null, type);
        },

        /**
         * Html item pagination
         *
         * @param {number|string|null} page
         * @param {number|string} nameItem
         * @param {string|null} disabled {true|null}
         * @param {boolean|null} active {true|null}
         * @param {string|null} side {'l'|'r'|null}
         * @returns {string}
         * @private
         */
        _getItem: function(page, nameItem, disabled, active, side) {

            disabled = disabled ? ui.CSS.pagination.item.disabled : null;
            active = active ? ui.CSS.pagination.item.active : null;

            if (side === 'l') {

                side = ui.CSS.pagination.side.left

            } else if (side === 'r') {

                side = ui.CSS.pagination.side.rirht

            } else {

                side = null;
            }

            var href = null;
            var onclick = null;

            if (active == null && disabled == null) {

                onclick = this._callback + '(this, ' + page + '); new ui.Pagination("' + this._id + '")._rebuild(' + page + ', ' + this._countPages + ');';
            }

            if (this._ajaxUrl == false) {

                href = ui.api.empty(this._link, '') + ui.api.empty(this._linkParam, '') + page;
            }

            return new ui.Element('li')
                .addClassElement(active)
                .addClassElement(disabled)
                .addClassElement(side)
                .addChildAfter(
                    new ui.Element('a')
                        .setAttrElement('href', href)
                        .setAttrElement('onclick', onclick)
                        .setContentElement(nameItem)
                        .getElement()
                )
                .getElement();
        },

        /**
         * Html items pagination
         * @param {ui.Element} block
         * @returns {void}
         * @private
         */
        _getItems: function(block) {

            var start = 1;
            var minus = this._currentPage - this._maxItem - 1;

            if (minus > 0) {

                start = this._currentPage - this._maxItem;

                if ((minus - 5) > 0) {

                    minus = minus - 5;
                }

                block.addChildAfter(this._getItem(minus, '...', null, null, null));
            }

            var end = this._countPages;
            var plus = this._currentPage + this._maxItem + 1;

            if ( (this._countPages - plus) > 0 ) {

                end = this._currentPage + this._maxItem;
            }

            for (var i = start; i <= end; i++) {

                var active = null;

                if (i == this._currentPage) {

                    active = true;
                }

                block.addChildAfter(this._getItem(i, i, null, active, null));
            }

            if ( (this._countPages - plus) > 0 ) {

                if ( (this._countPages - (plus + 5)) > 0 ) {

                    plus = plus + 5;
                }

                block.addChildAfter(this._getItem(plus, '...', null, null, null));
            }
        },

        _buildPagination: function() {

            var ul = new ui.Element('ul')
                .addClassElement(this._type)
                .setSkinElement('text', this._skin)
                .addClassElement(this._size)
                .addClassElement(this._position);

            if (this._countPages > ((this._maxItem + 1) * 2)) {

                ul.addChildAfter(this._getFirstItem(null));
            }

            ul.addChildAfter(this._getPrevItem('l'));

            this._getItems(ul);

            ul.addChildAfter(this._getNextItem('r'));

            if (this._countPages > ((this._maxItem + 1) * 2)) {

                ul.addChildAfter(this._getLastItem(null));
            }

            return ul.getElement();
        },

        /**
         * Html block pagination
         *
         * @returns {*|string}
         * @private
         */
        _buildBlock: function() {

            var pagination = new ui.Element('div', true);

            if (this._countPages > 1) {

                pagination
                    .addClassElement(ui.CSS.alignClass.block.clear)
                    .setIdElement(this._id, null)
                    .setAttrElement(DATA_JSON_PAGINATION, JSON.stringify(this))
                    .addChildAfter(this._buildPagination());
            }

            return pagination.getElement();
        },

        _rebuild: function(page, countPages) {

            var pag = document.body.querySelector('#' + this._id);
            var str = pag.getAttribute(DATA_JSON_PAGINATION);
            var obj = JSON.parse(str);

            for (var property in obj) {

                this[property] = obj[property];
            }

            this._currentPage = page;
            this._countPages = countPages;

            pag.parentNode.insertBefore(this._buildBlock(), pag);
            pag.remove();
        },

        /**
         * @returns {ui.Pagination}
         */
        setAjax: function() {
            this._ajaxUrl = true;
            return this;
        },

        /**
         * Set link pagination
         *
         * @param {string|null} link
         * @returns {ui.Pagination}
         */
        setLink: function(link) {
            this._link = link;
            return this;
        },

        /**
         * Set name param page
         *
         * @param {string|null} linkParam
         * @returns {ui.Pagination}
         */
        setLinkParam: function(linkParam){
            this._linkParam = linkParam;
            return this;
        },

        /**
         * Set position pagination
         *
         * @param {string|null} position {'left'|'right'|null}
         * @returns {ui.Pagination}
         */
        setPosition: function(position) {
            this._position = ui.api.existProperty(ui.CSS.alignClass.block, position, null);
            return this;
        },

        /**
         * the maximum number of pages
         *
         * @param {number} max
         * @returns {ui.Pagination}
         */
        setMaxItem: function(max) {
            this._maxItem = max;
            return this;
        },

        /**
         * Count pages
         *
         * @param {number|null} count
         * @returns {ui.Pagination}
         */
        setCountPages: function(count) {
            this._countPages = count;
            return this;
        },

        /**
         * Set current page
         *
         * @param {number} current
         * @returns {ui.Pagination}
         */
        setCurrentPage: function(current) {
            this._currentPage = ui.api.empty(current, this._currentPage);
            return this;
        },

        /**
         * Set size pagination
         *
         * @param {string} size {'lg'|'sm'|null}
         * @default {'sm'}
         * @returns {ui.Pagination}
         */
        setSize: function(size) {
            this._size = ui.api.existProperty(ui.CSS.pagination.size, size, null);
            return this;
        },

        /**
         * Set type pagination
         *
         * @param {string|null} skin {'disabled'|'active'|'success'|'warning'|'danger'|'info'|'link'|'default'|'error'|'primary'|'muted'}
         * @default {string} default
         * @returns {ui.Pagination}
         */
        setSkin: function(skin) {
            this._skin = skin;
            return this;
        },

        /**
         * Set type pagination
         *
         * @param {string|null} type {'default'|'pager'|null}
         * @default {string} default
         * @returns {ui.Pagination}
         */
        setType: function(type) {
            this._type = ui.api.existProperty(ui.CSS.pagination.type, null);
            return this;
        },

        /**
         * Set item previous
         *
         * @param {string|null} namePrevious
         * @param {string|null} namePreviousTwo
         * @returns {ui.Pagination}
         */
        setNameSwitches: function(namePrevious, namePreviousTwo) {

            this._namePrevious = ui.api.empty(namePrevious, this._namePrevious);

            this._namePreviousTwo = ui.api.empty(namePreviousTwo, this._namePreviousTwo);

            return this;
        },

        /**
         * Set item next
         *
         * @param {string|null} nameNext
         * @param {string|null} nameNextTwo
         * @returns {ui.Pagination}
         */
        setNameNext: function(nameNext, nameNextTwo) {

            this._nameNext = ui.api.empty(nameNext, this._nameNext);

            this._nameNextTwo = ui.api.empty(nameNextTwo, this._nameNextTwo);

            return this;
        },

        /**
         * Get object current element
         * @returns {*|Element}
         * @public
         */
        getElement: function() {

            return this._buildBlock();
        },

        /**
         * @param {string} callback
         * @returns {ui.Pagination}
         */
        setCallbackFunction: function(callback) {

            this._callback = callback;
            return this;
        },

        /**
         * Get html current element
         * @returns {string}
         * @public
         */
        toHTML: function() {

            return this._buildBlock().outerHTML;
        },

        /**
         * Add element in document
         * @param {string|number|null} selector
         * @returns {ui.Pagination}
         * @public
         */
        appendHTML: function(selector) {

            new ui.dom(selector).append(this.getElement());
            return this;
        },

        /**
         * Add element in document
         * @param {string|number|null} selector
         * @returns {ui.Pagination}
         * @public
         */
        beforeHTML: function(selector) {

            new ui.dom(selector).before(this.getElement());
            return this;
        }
    }
} (window.ui || {}));
(function(ui) {
    'use strict';

    var SORT_ASC  = 'ASC';
    var SORT_DESC = 'DESC';

    /**
     * @memberOf ui
     * @namespace ui.SortTable
     * @param {Element} element
     * @constructor
     */
    ui.SortTable = function (element) {

        this.element = element;
    };

    /** @protected */
    ui.SortTable.prototype = {

        _contentClass: 'sort-content',
        _dataSort: 'data-sort',
        _activeColumn: 'data-sort-active',
        _skinIcon: 'muted',
        _up: 'chevron-up',
        _down: 'chevron-down',

        /**
         * @param {string} skin {'success'|'warning'|'danger'|'info'|'primary'|'muted'}
         * @returns {ui.SortTable}
         */
        setSkinIcon: function(skin) {
            this._skinIcon = skin;
            return this;
        },

        /**
         * @param {string} up - nameIcon
         * @param {string} down - nameIcon
         * @returns {ui.SortTable}
         */
        setIcon: function(up, down) {
            this._up = ui.api.empty(up, 'chevron-up');
            this._down = ui.api.empty(down, 'chevron-down');
            return this;
        },

        /**
         * @param {string} classContent
         * @returns {ui.SortTable.setClassContent}
         */
        setClassContent: function(classContent) {
            this._classContent = classContent;
            return this;
        },

        /**
         * @param {string} selectorTable ID table or ID parent element table
         */
        updateSort: function(selectorTable) {

            var sort_active = document.body.querySelector(selectorTable + ' th[' + this._activeColumn + '="true"]');

            if (sort_active) {

                sort_active.click();
                sort_active.click();
            }
        },

        /**
         * @param {number} numberColumn
         */
        sort: function(numberColumn) {

            var table = ui.api.findParent(this.element, 'table');
            var tbody = table.querySelector('tbody');
            var tr = tbody.querySelectorAll('tr');

            var arr = [];

            for (var i = 0; i < tbody.rows.length; i++) {

                var item = tbody.rows[i].getElementsByTagName('td').item(numberColumn);
                var sort_content = item.querySelector('.' + this._contentClass);
                var content = sort_content ? sort_content.innerHTML : item.innerHTML;

                arr[i] = [];
                arr[i][0] = content;
                arr[i][1] = tbody.rows[i];

            }

            var dataSort = this.element.hasAttribute(this._dataSort);
            var type = SORT_ASC;

            if (dataSort) {

                type = this.element.getAttribute(this._dataSort);

                if (type == SORT_ASC) {

                    this.element.setAttribute(this._dataSort, SORT_DESC);
                    this._setIcon(this._down);

                } else {

                    this.element.setAttribute(this._dataSort, SORT_ASC);
                    this._setIcon(this._up);
                }

            } else {

                this.element.setAttribute(this._dataSort, SORT_DESC);
                this._setIcon(this._down);
            }

            if (ui.api.isNumeric(arr[0][0])) {

                if (type == SORT_ASC) {

                    arr.sort(this._desc);

                } else {

                    arr.sort(this._asc);
                }

            } else {

                arr.sort();

                if (type == SORT_ASC) {

                    arr.reverse();
                }
            }

            for(i = 0; i < arr.length; i++) {

                tbody.appendChild(arr[i][1]);
            }
        },

        /**
         * @param {string} icon
         * @private
         */
        _setIcon: function(icon) {

            var thead = this.element.parentNode.parentNode;
            var cellHead = thead.querySelectorAll('th, td');
            var i, a;

            for (a in cellHead) {

                if (typeof cellHead[a] == 'object') {

                    cellHead[a].setAttribute(this._activeColumn, 'false');
                }
            }

            this.element.setAttribute(this._activeColumn, 'true');

            var span = thead.querySelectorAll('.' + ui.CSS.iconClass);

            for (i in span) {

                if (typeof span[i] == 'object') {

                    span[i].remove();
                }
            }

            var newSpan = new ui.Element('span')
                .setSkinElement('text', this._skinIcon)
                .setIconElement(icon)
                .toHTML();

            this.element.innerHTML = newSpan + this.element.innerHTML;
        },

        /**
         * @param {[]} a
         * @param {[]} b
         * @returns {number}
         * @private
         */
        _asc: function(a, b) {

            return(a[0]-b[0]);
        },

        /**
         * @param {[]} a
         * @param {[]} b
         * @returns {number}
         * @private
         */
        _desc: function(a, b) {

            return(b[0]-a[0]);
        }
    }

} (window.ui || {}));
(function(ui) {
    'use strict';
    
    var uniqueId = new Date().getTime();

    var BLOCK_HEAD = 'thead';
    var BLOCK_BODY = 'tbody';
    var BLOCK_FOOT = 'tfoot';
    var DATA_RECORD_ID   = 'data-record';
    var DATA_ACTION      = 'data-action';
    var CHOOSE_RECORD_ID = 'choose-record-id';
    var CHOOSE_RECORDS   = 'choose_records';
    var DATA_JSON_TABLE  = 'data-json-table';
    var SORT_CONTENT     = 'sort-content';

    /**
     * @memberOf ui
     * @namespace ui.List
     * @param {string} idList
     * @param {string} record
     * @param {string|null} locale
     * @constructor
     */
    ui.List = function (record, idList, locale) {

        ui.Form.apply(this, ['search-' + idList, locale]);

        this._fieldRecordList = ui.api.empty(record, 'id');
        //Buttons
        this._btnRightBottomList = [];
        this._btnLeftBottomList = [];
        this._btnLeftTopList = [];
        this._btnRightTopList = [];
        this._btnLeftTopTable = [];
        this._btnRightTopTable = [];

        this._hideBtnList = {
            _btnBack:   false,
            _btnAdd:    false,
            _btnClear:  false,
            _btnRemove: false,
            _btnSearch: false,
            _btnReload: false,
            _btnTrash:  false
        };
        //List
        this._settingsList = {
            thead: [],
            tbody: [],
            tfoot: []
        };
        this._lastSetting = {
            block: BLOCK_HEAD,
            row:   0,
            cell:  0
        };
        //this._columnType = {};
        this._column = {};
        this._parentRecords = [];
        //Page
        this._titleList = null;
        this._titleListSmall = null;
        this._skin = null;
        this._typeTable = null;
        this._numCellTitle = '№';
        this._hideColumnNumber = false;
        this._hideColumnCheckbox = false;

        this._rowNum = 1;
        this._maxRow = 50;
        this._currentPage = 1;
        this._countPages = 1;
        //Link
        this._urlAction = null;
        this._urlAddAndEdit = null;
        this._urlTrash = null;
        this._urlBack = document.referrer;
        //Actions
        this._actions = {
            search: 'search',
            pagination: 'pagination',
            remove: 'remove'
        };

        this.urlNoImg = ui.Config.noimg;

        this._idList = ui.api.empty(idList, 'table-' + uniqueId);
        this._locale = ui.api.empty(locale, ui.Config.lbl[ui.Config.locale]);
        this._lbl = ui.api.existProperty(ui.Config.lbl, this._locale, ui.Config.lbl[ui.Config.locale]);
        uniqueId++;

        this._columnType = {

            number: function(params) {

                return new ui.Element('div')
                    .addClassElement('sort-content')
                    .setPsitionElement('right')
                    .setContentElement(params.value)
                    .toHTML()
            },

            text: function(params) {

                return new ui.Element('div')
                    .addStyleElement('maxHeight', params.height)
                    .addStyleElement('overflow', 'auto')
                    .addClassElement('sort-content')
                    .setContentElement(params.value)
                    .toHTML()
            },

            link: function(params) {

                return new ui.Element('div')
                    .addChildAfter(
                        new ui.Element('a')
                            .addClassElement('sort-content')
                            .setUrlElement(params.href)
                            .setContentElement(params.value)
                            .getElement()
                    )
                    .toHTML()
            },

            image: function(params) {

                return new ui.Element('div')
                    .addStyleElement('maxHeight', params.height)
                    .addChildAfter(
                        new ui.Element('a')
                            .addClassElement('thumbnail')
                            .setUrlElement(params.href)
                            .addChildAfter(
                                new ui.Element('img')
                                    .addClassElement('sort-content')
                                    .addStyleElement('maxHeight', params.height)
                                    .setAttrElement('alt', params.alt)
                                    .setUrlElement(ui.api.empty(params.value, params.hrefNoImg))
                                    .getElement()
                            )
                            .getElement()
                    )
                    .toHTML()
            },

            code: function(params) {

                return new ui.Element('code')
                    .addStyleElement('maxHeight', params.height)
                    .addStyleElement('overflow', 'auto')
                    .addClassElement('sort-content')
                    .setContentElement(ui.api.escapeHtml(params.value))
                    .toHTML()
            },

            html: function(params) {

                return new ui.Element('div')
                    .addStyleElement('maxHeight', params.height)
                    .addStyleElement('overflow', 'auto')
                    .addClassElement('sort-content')
                    .setContentElement(ui.api.escapeHtml(params.value))
                    .toHTML()
            }
        };

        this._maxHeightRow = '150px';
    };

    ui.List.prototype = Object.create(ui.Form.prototype);

    ui.List.prototype.constructor = ui.List;

    /**
     * @returns {ui.List}
     */
    ui.List.prototype.newLineSearchFields = function() {

        ui.Form.prototype.newLineParent.apply(this, arguments);
        return this;
    };

    /**
     *
     * @param {string|number|null} height
     * @returns {ui.List}
     */
    ui.List.prototype.setMaxHeightRow = function(height) {

        if (typeof height === 'number') {

            height += 'px';
        }

        this._maxHeightRow = ui.api.empty(height, null);
        return this;
    };

    /**
     * @param {number} max
     * @returns {ui.List}
     */
    ui.List.prototype.setMaxRow = function(max) {
        this._maxRow = max;
        return this;
    };

    /**
     * @private
     * returns {voild}
     */
    ui.List.prototype._btnDefault = function() {

        if (this._hideBtnList._btnBack === false && this._urlBack != '' && this._urlBack !== window.location.href) {

            this._btnLeftTopList.push(
                {
                    type:     'button',
                    name:     '_btnBack',
                    leftIcon: 'share-alt',
                    caption:  this._lbl.btn_back,
                    active: false,
                    onclick:  "ui.api.reload('" + this._urlBack + "');"
                }
            );
        }

        if (this._hideBtnList._btnReload === false) {

            this._btnLeftTopList.push(
                {
                    type: 'button',
                    name: '_reloadPage',
                    leftIcon: 'repeat',
                    active: false,
                    onclick: "ui.api.reload();"
                }
            );
        }

        if (this._urlAddAndEdit !== null && this._hideBtnList._btnAdd === false) {

            this._btnRightTopList.push(
                {
                    type:     'button',
                    name:     '_add',
                    leftIcon: 'new-window',
                    skin:     'primary',
                    caption:  this._lbl.btn_add,
                    active: true,
                    onclick:  "ui.api.reload('" + this._urlAddAndEdit + "');"
                }
            );
        }

        if (this._urlTrash !== null && this._hideBtnList._btnTrash === false) {

            this._btnRightTopList.push(
                {
                    type:     'button',
                    name:     '_trash',
                    leftIcon: 'trash',
                    caption:  this._lbl.btn_trash,
                    active: false,
                    onclick:  "ui.api.reload('" + this._urlTrash + "');"
                }
            );
        }

        if (this._hideBtnList._btnSearch === false) {

            this._btnRightTopTable.push(
                {
                    type: 'button',
                    name: '_btnSave',
                    leftIcon: 'search',
                    skin: null,
                    active: false,
                    caption: this._lbl.btn_search,
                    onclick: "new ui.List('" + this._fieldRecordList + "', '" + this._idList + "', '" + this._locale + "')._search('" + this._idForm + "');"
                }
            );
        }

        if (this._hideBtnList._btnClear === false) {

            this._btnRightTopTable.push(
                {
                    type: 'button',
                    name: '_btnClear',
                    leftIcon: 'refresh',
                    skin: null,
                    caption: this._lbl.btn_clear,
                    active: false,
                    onclick: "new ui.Form('" + this._idForm + "', '" + this._locale + "')._reset();"
                }
            );
        }

        if (this._hideColumnCheckbox === false && this._hideBtnList._btnRemove === false) {

            this._btnRightTopTable.push(
                {
                    type:     'button',
                    name:     '_btnRemove',
                    leftIcon: 'remove',
                    skin:     'danger',
                    active: true,
                    caption:  this._lbl.btn_remove,
                    onclick:  "new ui.List('" + this._fieldRecordList + "', '" + this._idList + "', '" + this._locale + "')._remove();",
                    disabled: true
                }
            );
        }
    };

    /**
     * @param {number} position 1 - 'top/left'| 2 - top/right | 3 - bottom/left | 4 - bottom/right | 5 - top table/left | 6 - top table/right
     * @param {string|null} typeBtn {'button'|'submit'}
     * @param {string|null} name
     * @param {string} icon
     * @param {string|number} caption
     * @param {string|null} onclick
     * @param {string} skin { 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'info' | 'link'}
     * @param {boolean} active
     * @returns {ui.List}
     */
    ui.List.prototype.addButton = function(position, typeBtn, name, icon, caption, onclick, skin, active) {

        var obj = {
            1: '_btnLeftTopList',
            2: '_btnRightTopList',
            3: '_btnLeftBottomList',
            4: '_btnRightBottomList',
            5: '_btnRightTopTable',
            6: '_btnLeftTopTable'
        };

        if (ui.api.existProperty(obj, position, false)) {

            this[obj[position]].push(
                {
                    type: ui.api.empty(typeBtn, null),
                    name: ui.api.empty(name, null),
                    leftIcon: ui.api.empty(icon, null),
                    caption: ui.api.empty(caption, null),
                    skin: ui.api.empty(skin, null),
                    onclick: ui.api.empty(onclick, null),
                    active: active
                }
            );
        }

        return this;
    };

    /**
     * @returns {*|Element}
     * @private
     */
    ui.List.prototype._buildTable = function() {

        var blockTable = new ui.Element('div');

        if (this._btnLeftTopTable.length > 0 || this._btnRightTopTable.length > 0) {

            blockTable.addChildAfter(this._buildRowButtons(this._btnLeftTopTable, this._btnRightTopTable).getElement());
        }

        blockTable.addChildAfter(
            new ui.Element('div')
                .addClassElement(ui.CSS.tableClass.responsive)
                .addChildAfter(
                    new ui.Element('table')
                        .addClassElement(ui.CSS.tableClass.table)
                        .addClassElement(ui.CSS.tableClass.hover)
                        .addClassElement(ui.CSS.tableClass.striped)
                        .addClassElement(this._typeTable)
                        .addChildAfter(this._buildBlock(BLOCK_HEAD))
                        .addChildAfter(this._buildBlock(BLOCK_BODY))
                        .addChildAfter(this._buildBlock(BLOCK_FOOT))
                        .getElement()
                )
                .getElement()
        );

        return blockTable.getElement();
    };

    /**
     * @param {*} content
     * @param {number} fieldName
     * @returns {*}
     * @private
     */
    ui.List.prototype._getColumnType = function(content, fieldName) {

        var type = ui.api.existProperty(this._column, fieldName, false);

        if (type in this._columnType) {

            var params = {
                value: content,
                href: this._urlAddAndEdit,
                alt: this._lbl.noimg,
                hrefNoImg: this.urlNoImg,
                height: this._maxHeightRow
            };

            content = this._columnType[type].call(this, params);
        }

        return content;
    };

    /**
     * @param {{}} params
     * @param {string} blockName {'head' | 'body' | 'foot'}
     * @param {number} fieldName
     * @returns {*}
     * @private
     */
    ui.List.prototype._contentCell = function(params, blockName, fieldName) {

        var content = ui.api.existProperty(params, 'content', params);

        if (blockName == BLOCK_BODY) {

            return this._getColumnType(content, fieldName);
        }

        return content;
    };

    /**
     * @param {ui.Element} row
     * @param {string} blockName
     * @param {string} cellName
     * @param {number} rowNum
     * @returns {void}
     */
    ui.List.prototype._columnNumber = function(row, blockName, cellName, rowNum) {

        if (!this._hideColumnNumber) {

            var cell = new ui.Element(cellName)
                .addClassElement(ui.CSS.tableClass.rowNum);

            if (blockName == BLOCK_HEAD && rowNum == 0) {

                var countRow = Object.keys(this._settingsList.thead).length;

                row.addChildAfter(
                    cell.setContentElement(this._numCellTitle)
                        .setAttrElement('onclick', 'new ui.SortTable(this).setSkinIcon("' + this._skin + '").sort(0);')
                        .setAttrElement('rowspan', countRow)
                        .getElement()
                );
            } else if (blockName == BLOCK_BODY) {

                var reordID = ui.api.existProperty(this._settingsList.tbody[rowNum], this._fieldRecordList, null);

                row.addChildAfter(
                    cell
                        .addChildAfter(
                            new ui.Element('div')
                                .addClassElement(SORT_CONTENT)
                                .setContentElement(this._rowNum)
                                .setAttrElement('title', reordID)
                                .getElement()
                        )
                        .addChildAfter(
                            new ui.Element('div')
                                .getElement()
                        )
                        .getElement()
                );

            } else if (blockName == BLOCK_FOOT) {

                row.addChildAfter(
                    cell.setContentElement(null).getElement()
                );
            }
        }
    };

    /**
     * @param {ui.Element} row
     * @param {string} blockName
     * @param {string} cellName
     * @param {number} rowNum
     * @returns {void}
     */
    ui.List.prototype._columnCheckbox = function(row, blockName, cellName, rowNum) {

        if (!this._hideColumnCheckbox) {

            var cell = new ui.Element(cellName)
                .addClassElement(ui.CSS.tableClass.rowNum);

            var onclick = "new ui.List('" + this._fieldRecordList + "', '" + this._idList + "', '" + this._locale + "')._choose(this);";

            if (blockName == BLOCK_HEAD && rowNum == 0) {

                var countRow = Object.keys(this._settingsList.thead).length;

                row.addChildAfter(
                    cell
                        .addChildAfter(
                            new ui.FFCheckbox('simple')
                                .setAttr(DATA_ACTION, CHOOSE_RECORDS)
                                .addCheckbox(null, CHOOSE_RECORDS, null, onclick)
                                .getElement()
                        )
                        .setAttrElement('rowspan', countRow)
                        .getElement()
                );
            } else if (blockName == BLOCK_BODY) {

                var reordID = ui.api.existProperty(this._settingsList.tbody[rowNum], this._fieldRecordList, null);

                row.addChildAfter(
                    cell
                        .addChildAfter(
                            new ui.FFCheckbox('simple')
                                .setAttr(DATA_RECORD_ID, reordID)
                                .setAttr(DATA_ACTION, CHOOSE_RECORD_ID)
                                .addCheckbox(reordID, this._fieldRecordList + '[' + rowNum + ']', null, onclick)
                                .getElement()
                        )
                        .getElement()
                );

            } else if (blockName == BLOCK_FOOT) {

                row.addChildAfter(
                    cell.setContentElement(null).getElement()
                );
            }
        }
    };

    ui.List.prototype._replaceRows = function(data) {

        var bodyDoc = document.body;
        var table = bodyDoc.querySelector('#' + this._idList + ' table');
        var body  = bodyDoc.querySelector('#' + this._idList + ' table>tbody');

        var str = bodyDoc.querySelector('#' + this._idList + ' #' + DATA_JSON_TABLE).getAttribute(DATA_JSON_TABLE);
        var obj = JSON.parse(str);

        for (var property in obj) {

            this[property] = obj[property];
        }

        this._settingsList.tbody = data;

        table.insertBefore(this._buildBlock(BLOCK_BODY), body);
        body ? body.remove() : null;

        var ch = document.body.querySelector('input[' + DATA_ACTION + '="' + CHOOSE_RECORDS + '"]');
        ch.checked ? ch.click() : null;

        ui.api.disabledElement(document.body.querySelector('button[name="_btnRemove"]'), true);
    };

    ui.List.prototype._choose = function(element) {

        var action = element.getAttribute(DATA_ACTION);
        var checkboxRecord = document.body.querySelectorAll('#' + this._idList + ' input[' + DATA_ACTION + '="' + CHOOSE_RECORD_ID + '"]');
        var btnRemove = document.body.querySelector('#page-' + this._idList + ' button[name="_btnRemove"]');
        var i = null;

        var btnDisabled = false;

        if (action == CHOOSE_RECORDS) {

            if (checkboxRecord.length == 0) {

                btnDisabled = true;
            }

            for (i in checkboxRecord) {

                if (typeof checkboxRecord[i] == 'object') {

                    if (element.checked === false) {

                        btnDisabled = true;
                        checkboxRecord[i].removeAttribute('checked');
                        checkboxRecord[i].checked = false;

                    } else {

                        checkboxRecord[i].setAttribute('checked', 'checked');
                        checkboxRecord[i].checked = true;
                    }
                }
            }
        } else if (action == CHOOSE_RECORD_ID) {

            var checkboxChoose = document.body.querySelector('#' + this._idList + ' input[' + DATA_ACTION + '="' + CHOOSE_RECORDS + '"]');

            var checked = 0;

            for (i in checkboxRecord) {

                if (typeof checkboxRecord[i] == 'object' && checkboxRecord[i].checked === true) {

                    checked++;
                }
            }

            if (element.checked === false) {

                checkboxChoose.removeAttribute('checked');
                checkboxChoose.checked = false;
                btnDisabled = (checked == 0)

            } else {

                if (checkboxRecord.length == checked) {

                    checkboxChoose.setAttribute('checked', 'checked');
                    checkboxChoose.checked = true;
                }
            }
        }

        ui.api.disabledElement(btnRemove, btnDisabled);
    };

    /**
     * @param {{}} params
     * @param {string} blockName {'head' | 'body' | 'foot'}
     * @param {number} rowNum
     * @returns {*|Element}
     * @private
     */
    ui.List.prototype._buildRows = function(params, blockName, rowNum) {

        var row = new ui.Element('tr');

        var cellName = blockName == BLOCK_HEAD ? 'th' : 'td';

        this._columnNumber(row, blockName, cellName, rowNum);
        blockName == BLOCK_BODY ? this._rowNum++ : null;

        var fieldName = null;

        if (blockName == BLOCK_BODY) {

            for (fieldName in this._column) {

                if (params.hasOwnProperty(fieldName)) {

                    row.addChildAfter(
                        new ui.Element(cellName)
                            .setContentElement(this._getColumnType(params[fieldName], fieldName))
                            .getElement()
                    );
                }
            }

        } else {

            var i = !this._hideColumnNumber ? 1 : 0;

            for (fieldName in params) {

                var paramCell = params[fieldName];

                var sort = ui.api.existProperty(paramCell, 'sort', false) ? 'new ui.SortTable(this).setSkinIcon("' + this._skin + '").sort(' + i + ');' : null;

                row.addChildAfter(
                    new ui.Element(cellName)
                        .setContentElement(this._contentCell(paramCell, blockName, fieldName))
                        .setAttrElement('colspan', ui.api.existProperty(paramCell, 'colspan', 1))
                        .setAttrElement('rowspan', ui.api.existProperty(paramCell, 'rowspan', 1))
                        .setAttrElement('style', ui.api.existProperty(paramCell, 'style', null))
                        .setWidthElement(ui.api.existProperty(paramCell, 'width', null))
                        .setAttrElement('onclick', sort)
                        .getElement()
                );
                i++;
            }
        }

        this._columnCheckbox(row, blockName, cellName, rowNum);

        return row.getElement();
    };

    /**
     * @param {string} blockName {'head' | 'body' | 'foot'}
     * @returns {*|Element}
     * @private
     */
    ui.List.prototype._buildBlock = function(blockName) {

        var block = new ui.Element(blockName);

        var i = 1;

        for (var rowNum in this._settingsList[blockName]) {

            block.addChildAfter(
                this._buildRows(this._settingsList[blockName][rowNum], blockName, rowNum)
            );

            if (this._maxRow == i) {
                break;
            }

            i++;
        }

        return block.getElement();
    };

    /**
     * @returns {*|Element}
     * @private
     */
    ui.List.prototype._blockHidden = function() {

        var obj = {
            _column:  this._column,
            _maxRow:  this._maxRow,
            _urlAddAndEdit:  this._urlAddAndEdit,
            _urlAction: this._urlAction,
            _currentPage: this._currentPage,
            _countPages: this._countPages,
            _actions: {
                search: this._actions.search,
                pagination: this._actions.pagination,
                remove: this._actions.remove
            },
            _fieldRecordList: this._fieldRecordList,
            _hideColumnCheckbox: this._hideColumnCheckbox,
            _hideColumnNumber:   this._hideColumnNumber
        };

        return new ui.Element('div')
            .setAttrElement('hidden',  true)
            .addClassElement(ui.CSS.formBlockHiddenClass)
            .addChildAfter(
                new ui.Element('div')
                    .setIdElement(DATA_JSON_TABLE, null)
                    .setAttrElement(DATA_JSON_TABLE, JSON.stringify(obj))
                    .getElement()
            )
            .getElement();
    };

    /**
     * @returns {*|Element}
     * @private
     */
    ui.List.prototype._buildPanel = function() {

        var panel = new ui.Element('div')
            .addClassElement(ui.CSS.panelClass.panel)
            .addClassElement(ui.api.existProperty(ui.CSS.skinClass.panel, this._skin, ui.CSS.skinClass.panel.primary));

        panel.addChildBefore(
            new ui.Element('div')
                .addClassElement(ui.CSS.panelClass.panelHead)
                .addChildBefore(
                    new ui.Element('h3')
                        .addClassElement(ui.CSS.panelClass.panelTitle)
                        .setContentElement('title')
                        .getElement()
                )
                .getElement()
        );

        var onclick = "new ui.List('" + this._fieldRecordList + "', '" + this._idList + "', '" + this._locale + "')._rebuild";

        this._buildSearchForm(panel);

        panel.addChildAfter(
            new ui.Element('div')
                .addClassElement(ui.CSS.panelClass.panelBody)
                .addChildAfter(this._blockHidden())
                .addChildAfter(this._buildTable())
                .addChildAfter(
                    new ui.Pagination(this._actions.pagination + '-' + this._idList)
                        .setCountPages(this._countPages)
                        .setCurrentPage(this._currentPage)
                        .setCallbackFunction(onclick)
                        .setSkin(this._skin)
                        .setAjax()
                        .getElement()
                )
                .getElement()
        );

        return panel.getElement();
    };

    /**
     * @param {ui.Element} panel
     * @private
     */
    ui.List.prototype._buildSearchForm = function(panel) {

        if ('block_rows' in this._settings) {

            ui.Form.prototype.hideBtnBack.call(this, true);
            ui.Form.prototype.hideBtnRemove.call(this, true);
            ui.Form.prototype.hideBtnSave.call(this, true);
            ui.Form.prototype.hideBtnClear.call(this, true);
            ui.Form.prototype.hideBtnReload.call(this, true);

            panel.addChildAfter(
                new ui.Element('div')
                    .addClassElement(ui.CSS.panelClass.panelBody)
                    .addChildAfter(
                        this._buildForm()
                    )
                    .getElement()
            );
        }
    };

    ui.List.prototype._rebuild = function(element, page) {

        var dataBlock = document.body.querySelector('#' + this._idList + ' #' + DATA_JSON_TABLE);
        var str = dataBlock.getAttribute(DATA_JSON_TABLE);
        var listParams = JSON.parse(str);

        for (var property in listParams) {

            this[property] = listParams[property];
        }

        listParams._currentPage = page;
        dataBlock.setAttribute(DATA_JSON_TABLE, JSON.stringify(listParams));

        var curObj = this;

        new ui.Ajax()
            .setUrl(this._urlAction ? this._urlAction : window.location.href)
            .addParam('action', listParams._actions.pagination)
            .addParam('page', page)
            .addCallbackFunction(
                function (e) {

                    try {

                        curObj._replaceRows(typeof e == 'object' ? e : JSON.parse(e));

                        new ui.SortTable(null).updateSort('#' + curObj._idList);

                    } catch (e) {

                        new ui.Modal(null, curObj._locale).error(e.name + ':' + e.message);
                    }
                }
            )
            .send();
    };

    ui.List.prototype._search = function(idForm) {

        var data = new ui.FormData(idForm, this._locale).getData();
        var dataBlock = document.body.querySelector('#' + this._idList + ' #' + DATA_JSON_TABLE);
        var str = dataBlock.getAttribute(DATA_JSON_TABLE);
        var listParams = JSON.parse(str);

        for (var property in listParams) {

            this[property] = listParams[property];
        }

        var curObj = this;

        if (data.error.length === 0) {

            new ui.Ajax()
                .setUrl(this._urlAction ? this._urlAction : window.location.href)
                .setParams(data['data'])
                .addParam('action', listParams._actions.search)
                .addCallbackFunction(
                    function (e) {

                        try {

                            var response = typeof e == 'object' ? e : JSON.parse(e);

                            listParams._currentPage = 1;
                            listParams._countPages = ui.api.existProperty(response, 'countPages', 1);
                            dataBlock.setAttribute(DATA_JSON_TABLE, JSON.stringify(listParams));

                            curObj._replaceRows(ui.api.existProperty(response, 'data', response));

                            new ui.SortTable(null).updateSort('#' + curObj._idList);

                            new ui.Pagination(curObj._actions.pagination + '-' + curObj._idList)
                                ._rebuild(listParams._currentPage, listParams._countPages);

                        } catch (e) {

                            new ui.Modal(null, curObj._locale).error(e.name + ':' + e.message);
                        }
                    }
                )
                .send();
        }

        return true
    };

    ui.List.prototype._remove = function() {

        var checkboxRecord = document.body.querySelectorAll('#' + this._idList + ' input[' + DATA_ACTION + '="' + CHOOSE_RECORD_ID + '"]');

        var delObj = {};
        var rowObj = [];

        for (var i in checkboxRecord) {

            if (typeof checkboxRecord[i] == 'object') {

                if (checkboxRecord[i].checked === true) {

                    rowObj.push(checkboxRecord[i]);
                    var value = checkboxRecord[i].getAttribute(DATA_RECORD_ID);
                    var name = checkboxRecord[i].getAttribute('name');
                    ui.api.buildObject(delObj, name, value, 0);
                }
            }
        }

        var dataBlock = document.body.querySelector('#' + this._idList + ' #' + DATA_JSON_TABLE);
        var str = dataBlock.getAttribute(DATA_JSON_TABLE);
        var listParams = JSON.parse(str);

        for (var property in listParams) {

            this[property] = listParams[property];
        }

        var curObj = this;

        new ui.Ajax()
            .setUrl(this._urlAction)
            .setParams(delObj)
            .addParam('action', this._actions.remove)
            .addParam('page', this._currentPage)
            .addParam('max', this._maxRow)
            .addCallbackFunction(function (e) {

                try {

                    var response = JSON.parse(e);

                    curObj._replaceRows(ui.api.existProperty(response, 'data', response));

                    new ui.SortTable(null).updateSort('#' + curObj._idList);

                    listParams._currentPage = 1;
                    listParams._countPages = ui.api.existProperty(response, 'countPages', 1);
                    dataBlock.setAttribute(DATA_JSON_TABLE, JSON.stringify(listParams));

                    new ui.Pagination(curObj._actions.pagination + '-' + curObj._idList)
                        ._rebuild(listParams._currentPage, listParams._countPages);

                } catch (e) {

                    new ui.Modal(null, curObj._locale).error(e.name + ':' + e.message);
                }
            })
            .send();
    };

    /**
     * Generate html List
     * @returns {*|Element}
     * @private
     */
    ui.List.prototype._buildList = function() {

        var page = new ui.Page('page-' + this._idList)
            .setTitle(this._titleList, this._titleListSmall, null);

        this._btnDefault();

        if (this._btnLeftTopList.length > 0 || this._btnRightTopList.length > 0) {

            page.setHead(this._buildRowButtons(this._btnLeftTopList, this._btnRightTopList).toHTML());
        }

        page.setBody(
            new ui.Element('div')
                .setIdElement(this._idList, null)
                .addChildAfter(this._buildPanel())
                .toHTML()
        );

        if (this._btnLeftBottomList.length > 0 || this._btnRightBottomList.length > 0) {

            page.setFooter(this._buildRowButtons(this._btnLeftBottomList, this._btnRightBottomList).toHTML());
        }

        return page.getElement();
    };

    /**
     * @param {[]} leftBtn
     * @param {[]} rightBtn
     * @returns {string}
     * @private
     */
    ui.List.prototype._buildRowButtons = function (leftBtn, rightBtn) {

        return new ui.Element('div')
            .addClassElement(ui.CSS.newLine)
            .addChildAfter(
                new ui.Element('div')
                    .setWidthElement(6)
                    .addChildAfter(
                        new ui.FFButton()
                            .addButtonList(leftBtn)
                            .setPositionBlock('left')
                            .setGroup('toolbar')
                            .getElement()
                    )
                    .getElement()
            )
            .addChildAfter(
                new ui.Element('div')
                    .setWidthElement(6)
                    .addChildAfter(
                        new ui.FFButton()
                            .addButtonList(rightBtn)
                            .setPositionBlock('right')
                            .setGroup('toolbar')
                            .getElement()
                    )
                    .getElement()
            );
    };

    /**
     * @param {string} name
     * @param {string|null} type
     * @returns {ui.List}
     */
    ui.List.prototype.addColumn = function(name, type) {
        this._column[name] = ui.api.empty(type, null);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} titleSmall
     * @returns {ui.List}
     */
    ui.List.prototype.setTitle = function(title, titleSmall) {
        this._titleList = ui.api.empty(title, null);
        this._titleListSmall = ui.api.empty(titleSmall, null);
        return this;
    };

    /**
     * @param {string|null} title
     * @param {string|null} titleSmall
     * @returns {ui.List}
     */
    ui.List.prototype.setTitleSearch = function(title, titleSmall) {
        ui.Form.prototype.setTitle.apply(this, arguments);
        return this;
    };

    /**
     * @param {string} link
     * @returns {ui.List}
     */
    ui.List.prototype.setLinkAddEndEdit = function(link) {
        this._urlAddAndEdit = link;
        return this;
    };

    /**
     * @param {string} link
     * @returns {ui.List}
     */
    ui.List.prototype.setLinkTrash = function(link) {
        this._urlTrash = link;
        return this;
    };

    /**
     * @param {string} link
     * @returns {ui.List}
     */
    ui.List.prototype.setAction = function(link) {
        this._urlAction = link;
        return this;
    };

    /**
     * @param {string} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'|'muted'}
     * @returns {ui.List}
     */
    ui.List.prototype.setSkin = function(skin) {
        this._skin = skin;
        return this;
    };

    /**
     * @param {string} skin {'default'|'primary'|'success'|'warning'|'danger'|'info'|'muted'}
     * @returns {ui.List}
     */
    ui.List.prototype.setSkinBlockSearch = function(skin) {
        ui.Form.prototype.setSkin.apply(this, arguments);
        return this;
    };

    /**
     * @param {string} skin {'striped'|'bordered'|'default'}
     * @returns {ui.List}
     */
    ui.List.prototype.setTypeTable = function(skin) {
        this._typeTable = ui.api.existProperty(ui.CSS.tableClass.skin, skin, null);
        return this;
    };

    /**
     * @param {string} url
     * @returns {ui.List}
     */
    ui.List.prototype.setUrlBack = function(url) {
        this._urlBack = url;
        return this
    };

    /**
     * @returns {ui.List}
     */
    ui.List.prototype.newRowHead = function() {
        this._settingsList.thead.push([]);
        this._lastSetting.block = BLOCK_HEAD;
        this._lastSetting.row   = Object.keys(this._settingsList.thead).length;
        return this;
    };

    /**
     * @returns {ui.List}
     */
    ui.List.prototype.newRowBody = function() {
        this._settingsList.tbody.push([]);
        this._lastSetting.block = BLOCK_BODY;
        this._lastSetting.row   = Object.keys(this._settingsList.tbody).length;
        return this;
    };

    /**
     * @param {[]|{}} object
     * @returns {ui.List}
     */
    ui.List.prototype.addRowsBody = function(object) {

        for (var i in object) {

            this._settingsList.tbody.push(object[i]);
        }

        return this;
    };

    /**
     * @returns {ui.List}
     */
    ui.List.prototype.newRowFoot = function() {
        this._settingsList.tfoot.push([]);
        this._lastSetting.block = BLOCK_FOOT;
        this._lastSetting.row   = Object.keys(this._settingsList.tfoot).length;
        return this;
    };

    /**
     * @param {string|number} content
     * @param {number} colspan
     * @param {number} rowspan
     * @param {boolean} sort
     * @param {string|number|null} width
     * @param {string|null} style
     * @returns {ui.List}
     */
    ui.List.prototype.addCellHead = function(content, colspan, rowspan, sort, width, style) {

        var block = this._lastSetting.block;
        var row   = this._lastSetting.row - 1;

        this._settingsList[block][row].push(
            {
                sort:    sort,
                width:   width,
                style:   style,
                content: content,
                rowspan: rowspan,
                colspan: colspan
            }
        );

        return this;
    };

    /**
     * @param {string|number} content
     * @param {number} colspan
     * @param {number} rowspan
     * @returns {ui.List}
     */
    ui.List.prototype.addCell = function(content, colspan, rowspan) {

        var block = this._lastSetting.block;
        var row   = this._lastSetting.row - 1;

        this._settingsList[block][row].push(
            {
                content: content,
                rowspan: rowspan,
                colspan: colspan
            }
        );

        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnRemove = function(hide) {

        this._hideBtnList = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnBack = function(hide) {

        this._hideBtnList._btnBack = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnSearch = function(hide) {

        this._hideBtnList._btnSearch = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnClear = function(hide) {

        this._hideBtnList._btnClear = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnAdd = function(hide) {

        this._hideBtnList._btnAdd = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnReload = function(hide) {

        this._hideBtnList._btnReload = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnRemove = function(hide) {

        this._hideBtnList._btnRemove = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideBtnTrash = function(hide) {

        this._hideBtnList._btnTrash = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideColumnNumber = function(hide) {

        this._hideColumnNumber = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {boolean} hide
     * @returns {ui.List}
     */
    ui.List.prototype.hideColumnCheckbox = function(hide) {

        this._hideColumnCheckbox = ui.api.empty(hide, true);
        return this;
    };

    /**
     * @param {number} page
     * @returns {ui.List}
     */
    ui.List.prototype.setCurrentPage = function(page) {

        this._currentPage = page;
        return this;
    };

    /**
     * @param {number} count
     * @returns {ui.List}
     */
    ui.List.prototype.setCountPages = function(count) {

        this._countPages = count;
        return this;
    };

    /**
     * Get object current element
     * @returns {*|Element}
     * @public
     */
    ui.List.prototype.getElement = function() {

        return this._buildList();
    };

    /**
     * Get html current element
     * @returns {string}
     * @public
     */
    ui.List.prototype.toHTML = function() {

        return this._buildList().outerHTML;
    };

    /**
     * Add element in document
     * @param {string} selector
     * @returns {ui.List}
     * @public
     */
    ui.List.prototype.appendHTML = function(selector) {

        new ui.dom(selector).append(this.getElement());
        return this;
    };
} (window.ui || {}));