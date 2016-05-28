
    (function(HTML) {

        var DEFAULT_FORMAT = 'dd-mm-yyyy hh:mi:ss';

        /**
         * @memberOf HTML
         * @namespace HTML.FormatDate
         * @constructor
         */
        HTML.FormatDate = function(timestamp, format) {
            this._timestamp = timestamp;

            if (typeof format === 'string') {
                this._format = format;
            }

            this._arrFormatDate = [];
            this._arrFormatTime = [];

            this._date = new Date();
            this._date.setTime(this._timestamp * 1000);
            var year = this._date.getFullYear();
            this._keysFormat = {
                yyyy: year,
                yy: year,//.substring((year.length - 2)),
                mm: this._date.getMonth(),
                dd: this._date.getDate(),
                hh: this._date.getHours(),
                mi: this._date.getMinutes(),
                ss: this._date.getSeconds()
            };
        };

        /** @protected */
        HTML.FormatDate.prototype = {

            _format: DEFAULT_FORMAT,
            _separatorDate: null,
            _separatorTime: null,
            _strDate: null,

            _parseFormat: function() {
                var arr = this._format.split(' ');
                console.log(arr[1]);

                if (typeof arr[0] === 'string' && ~arr[0].indexOf('.')) {
                    this._arrFormatDate = arr[0].split('.');
                    this._separatorDate = '.';
                }

                if (typeof arr[0] === 'string' && ~arr[0].indexOf('-')) {
                    this._arrFormatDate = arr[0].split('-');
                    this._separatorDate = '-';
                }

                if (typeof arr[0] === 'string' && ~arr[0].indexOf('/')) {
                    this._arrFormatDate = arr[0].split('/');
                    this._separatorDate = '/';
                }

                if (typeof arr[1] === 'string' && ~arr[1].indexOf(':')) {
                    var time = arr[1].split(':');
                    var lenArr = time.length;
                    for (var i = 0; i < lenArr; i++) {
                        this._arrFormatTime.push(time[i]);
                    }
                    this._separatorTime = ':';
                }

                return [this._arrFormatDate, this._arrFormatTime];
            },

            getStrDate: function() {
                this._parseFormat();
                var strDate = '';
                var currentObj = this;
                $.each(this._arrFormatDate, function(key, value) {
                    if (currentObj._keysFormat.hasOwnProperty(value)) {
                        strDate += currentObj._keysFormat[value];
                        strDate += currentObj._separatorDate;
                    }
                });

                var strTime = '';
                $.each(this._arrFormatTime, function(key, value) {
                    if (currentObj._keysFormat.hasOwnProperty(value)) {
                        strTime += currentObj._keysFormat[value];
                        strTime += currentObj._separatorTime;
                    }
                });

                var date = strDate.substring(0, strDate.length - 1);
                var time = strTime.substring(0, strTime.length - 1);
                this._strDate = (date + ' ' + time).replace(/\s{2,}/g, ' ').trim();
                return this._strDate;
            }
        };
    } (window.HTML || {}));
