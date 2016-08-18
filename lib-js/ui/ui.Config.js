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

            LIST_BTN_REMOVE: '_remove',

            ACTION_LIST_REMOVE: '_remove_list',
            ACTION_NEXT_PAGE: '_next_page',

            skinProgress: 'success',
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
            },

            locale: 'ru',

            lbl: {
                ru: {
                    btn_save: 'Сохранить',
                    btn_remove: 'Удалить',
                    btn_clear: 'Очистить',
                    btn_back: 'Назад',
                    btn_add: 'Добавить',
                    btn_trash: 'Карзина',
                    btn_search: 'Найти',
                    btn_close: 'Закрыть',
                    btn_cancel: 'Отмена',
                    btn_yes: 'Да',
                    btn_no: 'Нет',
                    error: 'Ошибка',
                    message: 'Сообщение'
                },
                eu: {
                    btn_save: 'Save',
                    btn_remove: 'Delete',
                    btn_clear: 'Clear',
                    btn_back: 'Back',
                    btn_add: 'Add',
                    btn_trash: 'Trash',
                    btn_search: 'Find',
                    btn_close: 'Close',
                    btn_cancel: 'Cancel',
                    btn_yes: 'Yes',
                    btn_no: 'No',
                    error: 'Error',
                    message: 'Message'
                }
            }
        };

    } (window.ui || {}));