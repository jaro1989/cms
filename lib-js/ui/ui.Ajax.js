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