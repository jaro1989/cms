
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
         * $type { { text: { right: '' } } }
         */
        align: {
            text: {
                right: 'text-right'
            }
        },

        /**
         * $type { { field: '', text: '' } }
         */
        prefix: {
            field: 'has',
            text: 'text'
        },

        /**
         * @type { { disabled: '', active: '', success: '', warning: '', danger: '', info: '', link: '', default: '', error: '', primary: '' } }
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
         * @type { { input: { lg: '..', sm: '..' }, pagination: { lg: '..', sm: '..' }, button: { lg: '..', sm: '..', xs: '..' } } }
         */
        size: {
            input: {
                lg: 'input-group-lg',
                sm: 'input-group-sm'
            },
            pagination: {
                lg: 'pagination-lg',
                sm: 'pagination-sm'
            },
            button: {
                lg: 'btn-lg',
                sm: 'btn-sm',
                xs: 'btn-xs'
            }
        }
    };
} (window.HTML || {}));