
    (function(ui) {
        'use strict';

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

            alert: {
                alert: 'alert',
                link: 'alert-link',
                skin: {
                    warning: 'alert-warning',
                    info: 'alert-info',
                    success: 'alert-success',
                    danger: 'alert-danger'
                }
            },

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
                table: 'table',
                skin: {
                    bordered: 'table-bordered',
                    default:  'table-bordered-none'
                },
                striped:    'table-striped',
                condensed:  'table-condensed',
                hover:      'table-hover',
                responsive: 'table-responsive',
                rowNum:     'table-row-number'
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
             * @public
             * @type { { default: {disabled: *, active: *, success: *, warning: *, danger: *, info: *, link: *, default: *, error: *, primary: *}, panel: {default: string, primary: *, success: *, warning: *, danger: *, info: *} } }
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
                }
            },

            pagination: {
                type: {
                    pager: 'pager',
                    default: 'pagination'
                },
                item: {
                    active:   'active',
                    disabled: 'disabled'
                },
                side: {
                    rirht: 'next',
                    left:  'previous'
                },
                size: {
                    lg: 'pagination-lg',
                    sm: 'pagination-sm'
                }
            },

            /**
             * @public
             * @type { { input: { lg: *, sm: * }, button: { lg: *, sm: *, xs: * }, field: {sm: *}} }
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
            },

            modal: {
                modal: 'modal',
                dialog: 'modal-dialog',
                content: 'modal-content',
                header: 'modal-header',
                title: 'modal-title',
                body: 'modal-body',
                footer: 'modal-footer',
                close: 'close',
                size: {
                    lg: 'modal-lg',
                    sm: 'modal-sm'
                }
            },

            progress: {
                striped: 'progress-striped',
                progress: 'progress',
                bar: 'progress-bar',
                active: 'active',
                sr: 'sr-only',
                skin: {
                    success: 'progress-bar-success',
                    info: 'progress-bar-info',
                    warning: 'progress-bar-warning',
                    danger: 'progress-bar-danger'
                }
            }
        };

    } (window.ui || {}));