    /**
     * @namespace ui
     * @type {{}}
     */
    ui = {};
    window.ui = ui;

    (function(ui) {

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
            errorTextRequred: ' Обязательное поле для заполнения ',

            FORM_URL_DEL:      '_del',
            FORM_URL_ADD:      '_add',
            FORM_URL_BACK:     '_back',
            FORM_URL_EDIT:     '_edit',
            FORM_ID_RECORD:    '_record',
            FORM_FIELD_RECORD: '_record_name',
            FORM_CH_OBJECT :   '_ch',
            FORM_CH_LAST_ROW:  '_last_row',

            modal: {
                ru: {
                    error: {
                        icon: 'ban-circle',
                        title: 'Ошибка!',
                        btnYes: 'Закрыть'
                    },
                    alert: {
                        icon: 'envelope',
                        title: 'Сообщение!',
                        btnYes: 'Закрыть'
                    },
                    confirm: {
                        icon: 'question-sign',
                        title: 'Внимание!',
                        btnYes: 'Да',
                        btnNo: 'Нее'
                    },
                    progress: {
                        btnCancel: 'Отмена'
                    }
                }
            }
        };

    } (window.ui || {}));