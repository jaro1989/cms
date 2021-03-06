
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
