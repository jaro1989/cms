
(function(ui) {

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
        setClassContent(classContent) {
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