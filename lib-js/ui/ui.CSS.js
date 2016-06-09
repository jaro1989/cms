
    /**
     * @namespace ui
     */
    ui = {
        /**
         * @public
         * @type {string}
         */
        iconClass: 'glyphicon',

        /**
         * @public
         * @type {string}
         */
        widthClass: 'col-md',

        /**
         * @public
         * @type {string}
         */
        inputGroup: 'input-group',

        /**
         * @public
         * @type {string}
         */
        formGroup: 'form-group',

        /**
         * @public
         * @type {string}
         */
        formControl: 'form-control',

        /**
         * @public
         * @type {string}
         */
        inputGroupBtn: 'input-group-btn',

        /**
         * @public
         * @type {string}
         */
        disabled: 'disabled',

        /**
         * @public
         * @type { { striped: string, bordered: string, borderedNone: string, hover: string, condensed: string } } }
         */
        table: {
            striped: 'table-striped',
            bordered: 'table-bordered',
            borderedNone: 'table-bordered-none',
            hover: 'table-hover',
            condensed: 'table-condensed'
        },

        /**
         * @public
         * @type { { text: { right: string, center: string }, block: { clear: string, left: string, right: string, center: string } } }
         */
        align: {
            text: {
                right: 'text-right',
                center: 'text-center'
            },
            block: {
                clear: 'clearfix',
                left: 'pull-left',
                right: 'pull-right',
                center: 'center-block'
            }
        },

        /**
         * @public
         * @type { { field: string, text: string } }
         */
        prefix: {
            field: 'has',
            text: 'text'
        },

        /**
         * @public
         * @type { { panel: string, panelBody: string, panelFoot: string, panelHead: string, panelTitle: string, skin: {default: string, primary: string, success: string, warning: string, danger: string, info: string} } }
         */
        panel: {
            skin: {
                default: 'panel-default',
                primary: 'panel-primary',
                success: 'panel-success',
                warning: 'panel-warning',
                danger: 'panel-danger',
                info: 'panel-info'
            },
            panel: 'panel',
            panelBody: 'panel-body',
            panelFoot: 'panel-footer',
            panelHead: 'panel-heading',
            panelTitle: 'panel-title'
        },

        /**
         * @type { { skin: { default: string,  pager: string }, item: { disabled: string, active: string }, size: { lg: string, sm: string }, side: { left: string, rirht: string } } }
         */
        pagination: {
            skin: {
                pager: 'pager',
                default: 'pagination'
            },
            item: {
                active: 'active',
                disabled: 'disabled'
            },
            size: {
                lg: 'pagination-lg',
                sm: 'pagination-sm'
            },
            side: {
                rirht: 'next',
                left: 'previous'
            }
        },

        /**
         * @public
         * @type { { disabled: string, active: string, success: string, warning: string, danger: string, info: string, link: string, default: string, error: string, primary: string } }
         */
        skin: {
            disabled: 'disabled',
            active: 'active',
            success: 'success',
            warning: 'warning',
            danger: 'danger',
            info: 'info',
            link: 'link',
            default: 'default',
            error: 'error',
            primary: 'primary'
        },

        /**
         * @public
         * @type { { input: { lg: string, sm: string }, button: { lg: string, sm: string, xs: string } } }
         */
        size: {
            input: {
                lg: 'input-group-lg',
                sm: 'input-group-sm'
            },
            button: {
                lg: 'btn-lg',
                sm: 'btn-sm',
                xs: 'btn-xs'
            }
        },

        /**
         * @public
         * @type { { lg: string, sm: string, xs: string } }
         */
        padding: {
            lg: 'well-lg',
            sm: 'well-sm',
            xs: 'well-xs'
        },

        /**
         * Find value in array
         * @param {[]} array
         * @param {string|number} value
         * @returns {boolean|number} If found - return key. If did not find - returning false
         * @public
         */
        findValueArray: function(array, value) {

            for (var i = 0; i < array.length; i++) {
                if (array[i] === value) return i;
            }
            return false;

        }
    };

    window.ui = ui;