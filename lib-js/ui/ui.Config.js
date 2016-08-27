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
                en: {
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