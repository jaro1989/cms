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
            iconBtnDate: {
                currentDate:      'check',
                calendarDate:     'calendar',
                removeDate:       'refresh',
                calendarDateTime: 'time'
            }
        };

    } (window.ui || {}));