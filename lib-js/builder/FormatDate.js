
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

            var year =   this._date.getFullYear();
            var month =  this._date.getMonth();
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
        };

        /** @protected */
        HTML.FormatDate.prototype = {

            _format: DEFAULT_FORMAT,
            _separatorDate: null,
            _separatorTime: null,
            _strDate: null,
            _separator: ['.', '-', '/', ':'],

            /**
             * Parse date format and build new array with keys
             *
             * @returns {*[]}
             * @private
             */
            _parseFormat: function() {
                var arr = this._format.split(' ');

                for (var a = 0; a < this._separator.length; a++) {
                    if (typeof arr[0] === 'string' && ~arr[0].indexOf(this._separator[a])) {
                        this._arrFormatDate = arr[0].split(this._separator[a]);
                        this._separatorDate = this._separator[a];
                    }
                }

                for (var b = 0; b < this._separator.length; b++) {
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
             * Generate string date in forma
             *
             * @returns {string}
             */
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
