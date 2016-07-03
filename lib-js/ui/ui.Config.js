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
            errorTextField: ' Обязательное поле для заполнения '
        };

    } (window.ui || {}));