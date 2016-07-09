
    (function(ui) {

        /**
         * @memberOf ui
         * @namespace ui.CSS
         */
        ui.CSS = {

            /**
             * @public
             * @type {*}
             */
            readOnlyMaxHeight: 'read-only-max-height',

            /**
             * @public
             * @type {*}
             */
            page: {
                main: 'main',
                header: 'page-header'
            },

            /**
             * @public
             * @type {*}
             */
            newLine: 'row',

            /**
             * @public
             * @type {*}
             */
            iconClass: 'glyphicon',

            /**
             * @public
             * @type {*}
             */
            widthClass: 'col-md',

            /**
             * @public
             * @type {*}
             */
            inputGroupClass: 'input-group',

            /**
             * @public
             * @type {*}
             */
            inputGroupAddonClass: 'input-group-addon',

            /**
             * @public
             * @type {*}
             */
            formGroupClass: 'form-group',

            /**
             * @public
             * @type {*}
             */
            formControlClass: 'form-control',

            /**
             * @public
             * @type {*}
             */
            controlLabelClass: 'control-label',

            /**
             * @public
             * @type {*}
             */
            inputGroupBtnClass: 'input-group-btn',

            /**
             * @public
             * @type {*}
             */
            disabledClass: 'disabled',

            /**
             * @public
             * @type {*}
             */
            requiredClass: 'required',

            /**
             * @public
             * @type {*}
             */
            validateErrorClass: 'validate-error',

            /**
             * @public
             * @type {*}
             */
            validateFieldBlockClass: 'validate-field-block',

            /**
             * @public
             * @type {*}
             */
            formBlockHiddenClass: 'form-hidden-data',

            /**
             * @public
             * @type {*}
             */
            checkedClass: 'checked',

            /**
             * @public
             * @type {*}
             */
            satrClass: 'star',

            /**
             * @public
             * @type {*}
             */
            radioClass: 'radio',

            /**
             * @public
             * @type {*}
             */
            radioInlineClass: 'radio-inline',

            /**
             * @public
             * @type {*}
             */
            checkboxClass: 'checkbox',

            /**
             * @public
             * @type {*}
             */
            checkboxInlineClass: 'checkbox-inline',

            /**
             * @public
             * @type { {btnClass: *, btnGroupClass: *, btnGroup: { group: *, toolbar: *, vertical: *, justified: * } } }
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
             * @type { { striped: *, bordered: *, borderedNone: *, hover: *, condensed: * } } }
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
             * @type { { text: { right: *, center: * }, block: { clear: *, left: *, right: *, center: * } } }
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
             * @type { { field: *, text: *, button: * } }
             */
            prefixClass: {
                field: 'has',
                text:  'text',
                button:  'btn'
            },

            /**
             * @public
             * @type { { panel: *, panelBody: *, panelFoot: *, panelHead: *, panelTitle: * } }
             */
            panelClass: {
                panel:      'panel',
                panelBody:  'panel-body',
                panelFoot:  'panel-footer',
                panelHead:  'panel-heading',
                panelTitle: 'panel-title'
            },

            /**
             * @type { { item: { disabled: *, active: * }, side: { left: *, rirht: * } } }
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
             * @type { { default: {disabled: *, active: *, success: *, warning: *, danger: *, info: *, link: *, default: *, error: *, primary: *}, panel: {default: *, primary: *, success: *, warning: *, danger: *, info: *} } }
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
                    primary:  'primary',
                    muted:    'muted'
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
             * @type { { input: { lg: *, sm: * }, button: { lg: *, sm: *, xs: * }, pagination: { lg: *, sm: * }, field: {sm: *}} }
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
             * @type { { lg: *, sm: *, xs: * } }
             */
            paddingClass: {
                lg: 'well-lg',
                sm: 'well-sm',
                xs: 'well-xs'
            },

            /**
             * @public
             * @type { { none: *, vertical: *, horizontal: * } }
             */
            resizeStyle: {
                none: 'none',
                vertical: 'vertical',
                horizontal: 'horizontal'
            }
        };

    } (window.ui || {}));