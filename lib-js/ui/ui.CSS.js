
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.CSS
         */
        ui.CSS = {

            page: {
                main: 'main',
                header: 'page-header'
            },

            newLine: 'row',
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
            inputGroupClass: 'input-group',

            /**
             * @public
             * @type {string}
             */
            inputGroupAddonClass: 'input-group-addon',

            /**
             * @public
             * @type {string}
             */
            formGroupClass: 'form-group',

            /**
             * @public
             * @type {string}
             */
            formControlClass: 'form-control',

            /**
             * @public
             * @type {string}
             */
            controlLabelClass: 'control-label',

            /**
             * @public
             * @type {string}
             */
            inputGroupBtnClass: 'input-group-btn',

            /**
             * @public
             * @type {string}
             */
            disabledClass: 'disabled',

            /**
             * @public
             * @type {string}
             */
            requiredClass: 'required',

            /**
             * @public
             * @type {string}
             */
            validateErrorClass: 'validate-error',

            /**
             * @public
             * @type {string}
             */
            validateFieldBlockClass: 'validate-field-block',

            /**
             * @public
             * @type {string}
             */
            checkedClass: 'checked',

            /**
             * @public
             * @type {string}
             */
            satrClass: 'star',

            /**
             * @public
             * @type {string}
             */
            radioClass: 'radio',

            /**
             * @public
             * @type {string}
             */
            radioInlineClass: 'radio-inline',

            /**
             * @public
             * @type {string}
             */
            checkboxClass: 'checkbox',

            /**
             * @public
             * @type {string}
             */
            checkboxInlineClass: 'checkbox-inline',

            /**
             * @public
             * @type { {btnClass: string, btnGroupClass: string, btnGroup: { group: string, toolbar: string, vertical: string, justified: string } } }
             */
            btn: {
                btnClass: 'btn',
                btnBlockClass: 'btn-block',
                btnGroup: {
                    group:     'btn-group',
                    toolbar:   'btn-toolbar',
                    vertical:  'btn-group-vertical',
                    justified: 'btn-group-justified'
                }
            },

            /**
             * @public
             * @type { { striped: string, bordered: string, borderedNone: string, hover: string, condensed: string } } }
             */
            tableClass: {
                striped:      'table-striped',
                bordered:     'table-bordered',
                borderedNone: 'table-bordered-none',
                hover:        'table-hover',
                condensed:    'table-condensed'
            },

            /**
             * @public
             * @type { { text: { right: string, center: string }, block: { clear: string, left: string, right: string, center: string } } }
             */
            alignClass: {
                text: {
                    right:  'text-right',
                    center: 'text-center'
                },
                block: {
                    clear:  'clearfix',
                    left:   'pull-left',
                    right:  'pull-right',
                    center: 'center-block'
                }
            },

            /**
             * @public
             * @type { { field: string, text: string } }
             */
            prefixClass: {
                field: 'has',
                text:  'text',
                button:  'btn'
            },

            /**
             * @public
             * @type { { panel: string, panelBody: string, panelFoot: string, panelHead: string, panelTitle: string } }
             */
            panelClass: {
                panel:      'panel',
                panelBody:  'panel-body',
                panelFoot:  'panel-footer',
                panelHead:  'panel-heading',
                panelTitle: 'panel-title'
            },

            /**
             * @type { { item: { disabled: string, active: string }, side: { left: string, rirht: string } } }
             */
            paginationClass: {
                item: {
                    active:   'active',
                    disabled: 'disabled'
                },
                side: {
                    rirht: 'next',
                    left:  'previous'
                }
            },

            /**
             * @public
             * @type { { default: {disabled: string, active: string, success: string, warning: string, danger: string, info: string, link: string, default: string, error: string, primary: string}, panel: {default: string, primary: string, success: string, warning: string, danger: string, info: string} } }
             */
            skinClass: {
                default: {
                    disabled: 'disabled',
                    active:   'active',
                    success:  'success',
                    warning:  'warning',
                    danger:   'danger',
                    info:     'info',
                    link:     'link',
                    default:  'default',
                    error:    'error',
                    primary:  'primary'
                },
                panel: {
                    default: 'panel-default',
                    primary: 'panel-primary',
                    success: 'panel-success',
                    warning: 'panel-warning',
                    danger:  'panel-danger',
                    info:    'panel-info'
                },
                pagination: {
                    pager:   'pager',
                    default: 'pagination'
                }
            },

            /**
             * @public
             * @type { { input: { lg: string, sm: string }, button: { lg: string, sm: string, xs: string }, pagination: { lg: string, sm: string }, field: {sm: string}} }
             */
            sizeClass: {
                input: {
                    lg: 'input-group-lg',
                    sm: 'input-group-sm'
                },
                field: {
                    sm: 'input-sm'
                },
                button: {
                    lg: 'btn-lg',
                    sm: 'btn-sm',
                    xs: 'btn-xs'
                },
                pagination: {
                    lg: 'pagination-lg',
                    sm: 'pagination-sm'
                }
            },

            /**
             * @public
             * @type { { lg: string, sm: string, xs: string } }
             */
            paddingClass: {
                lg: 'well-lg',
                sm: 'well-sm',
                xs: 'well-xs'
            },

            /**
             * @public
             * @type { { none: string, vertical: string, horizontal: string } }
             */
            resizeStyle: {
                none: 'none',
                vertical: 'vertical',
                horizontal: 'horizontal'
            }
        };

    } (window.ui || {}));