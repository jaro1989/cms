
(function(HTML) {

    /**
     * @memberOf HTML
     * @namespace HTML.CssClasses
     * @constructor
     */
    HTML.CssClasses = function() {

    };

    /** @protected */
    HTML.CssClasses.prototype = {
        width: 'col-md',
        inputGroup: 'input-group',
        formGroup: 'form-group',
        formControl: 'form-control',
        inputGroupBtn: 'input-group-btn',
        disabled: 'disabled',

        /**
         * @public
         * @type { { text: { right: '' }, block: { clear: '..', left: '..', right: '..', center: '..' } } }
         */
        align: {
            text: {
                right: 'text-right'
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
         * @type { { field: '', text: '' } }
         */
        prefix: {
            field: 'has',
            text: 'text'
        },

        /**
         * @public
         * @type { { panel: '..', panelBody: '..', panelFoot: '..', panelHead: '..', panelTitle: '..', skin: {default: '..', primary: '..', success: '..', warning: '..', danger: '..', info: '..'} } }
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
         * @type { { skin: { default: '..',  pager: '..' }, item: { disabled: '..', active: ' ..' }, size: { lg: '..', sm: '..' }, side: { left: '..', rirht: '..' } } }
         */
        pagination: {
            skin: {
                default: 'pagination',
                pager: 'pager'
            },
            item: {
                disabled: 'disabled',
                active: 'active'
            },
            size: {
                lg: 'pagination-lg',
                sm: 'pagination-sm'
            },
            side: {
                left: 'previous',
                rirht: 'next'
            }
        },

        /**
         * @public
         * @type { { pagination: {default: '..', pager: '..' }, disabled: '', active: '', success: '', warning: '', danger: '', info: '', link: '', default: '', error: '', primary: '' } }
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
         * @type { { input: { lg: '..', sm: '..' }, pagination: { lg: '..', sm: '..' }, button: { lg: '..', sm: '..', xs: '..' } } }
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
         * @type { { lg: '..', sm: '..', xs: '..' } }
         */
        padding: {
            lg: 'well-lg',
            sm: 'well-sm',
            xs: 'well-xs'
        }
    };
} (window.HTML || {}));