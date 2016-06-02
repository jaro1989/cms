
    /**
     *
     * @namespace HTML
     */
    HTML = {};
    window.HTML = HTML;

    (function(HTML) {

        var CLASS_ICON = 'glyphicon';

        /**
         * @memberOf HTML
         * @namespace HTML.Basis
         * @constructor
         */
        HTML.Basis = function() {
            this.css = new HTML.CssClasses();
        };

        /** @protected */
        HTML.Basis.prototype = {
            /**
             * @type {HTML.CssClasses}
             */
            css: null,

            iconClass: CLASS_ICON,
            fluid: 'container-fluid',
            text_alignment: {
                right: 'text-right'
            },
            afterLabel: ':',

            navbar: {
                nav: 'nav',
                navbar: 'navbar',
                navbarnav: 'navbar-nav',
                fluid: 'container-fluid',
                iconbar: 'icon-bar',
                collapse: 'collapse',
                brand: 'navbar-brand',
                toogle: 'navbar-toggle',
                skin: {
                    inverse: 'navbar-inverse',
                    default: 'navbar-default'
                },
                position: {
                    statictop: 'navbar-static-top',
                    staticbottom: 'navbar-static-bottom',
                    fixedtop: 'navbar-fixed-top',
                    fixedbottom: 'navbar-fixed-bottom',
                    fixedleft: 'navbar-left',
                    fixedright: 'navbar-right'
                },
                block: {
                    collapse: 'navbar-collapse',
                    header: 'navbar-header'
                }

            },

            fields: {
                fg: 'form-group',
                ig: 'input-group',
                inp: 'form-control',
                iga: 'input-group-addon',
                size: {
                    lg: 'input-group-lg',
                    sm: 'input-group-sm'
                },
                prefix_skin_field: 'has',
                prefix_skin_text: 'text',
                skin: {
                    success: 'success',
                    warning: 'warning',
                    error: 'error',
                    muted: 'muted',
                    primary: 'primary',
                    info: 'info',
                    danger: 'danger'
                },
                icon: {
                    bf: 'has-feedback',
                    if: 'form-control-feedback'
                }
            },

            layout: 'col-md',


            layoutGroup: {
                1: 12,
                2: 6,
                3: 4,
                4: 3,
                5: 2,
                6: 1
            },

            position: {
                clear: 'clearfix',
                left: 'pull-left',
                right: 'pull-right',
                center: 'center-block'
            },

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

            table: {
                striped: 'table-striped',
                bordered: 'table-bordered',
                'bordered-none': 'table-bordered-none',
                hover: 'table-hover',
                condensed: 'table-condensed'

            },

            panelClasses: {
                open: 'in',
                class: 'panel',
                group: 'panel-group',
                heading: 'panel-heading',
                title: 'panel-title',
                collapse: 'collapse',
                panelCollapse: 'panel-collapse',
                body: 'panel-body'
            },

            /**
             * HTML Class skin panel
             *
             * @public
             * @type {object}
             */
            panel: {
                default: 'panel-default',
                primary: 'panel-primary',
                success: 'panel-success',
                warning: 'panel-warning',
                danger: 'panel-danger',
                info: 'panel-info'
            },

            /**
             * Html class type tabs panel
             *
             * @public
             * @type {object}
             */
            tabs: {
                nJustified: 'nav nav-tabs nav-justified',
                pJustified: 'nav nav-pills nav-justified',
                nStacked: 'nav nav-tabs nav-stacked',
                pStacked: 'nav nav-pills nav-stacked',
                nav: 'nav nav-tabs',
                pills: 'nav nav-pills'
            },

            /**
             * Html class disabled
             *
             * @public
             * @type {string}
             */
            disabled: 'disabled',


            /**
             * Html classes drop-down
             *
             * @public
             * @type {object}
             */
            dropDown: {
                caret: 'caret',
                dataToggle: 'dropdown',
                classToggle: 'dropdown-toggle',
                classDropdown: 'dropdown',
                menu: 'dropdown-menu',
                menuPosition: 'dropup',
                itemType: {
                    separator: 'divider',
                    header: 'dropdown-header',
                    disable: 'disabled',
                    active: 'active'
                }
            },

            /**
             * Html classes skins
             *
             * @public
             * @type {object}
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
             * Html classes size buttons
             *
             * @public
             * @type {object}
             */
            btnSize: {
                lg: 'btn-lg',
                sm: 'btn-sm',
                xs: 'btn-xs'
            },

            /**
             * Html classes padding
             *
             * @public
             * @type {object}
             */
            padding: {
                lg: 'well-lg',
                sm: 'well-sm',
                xs: 'well-xs'
            },

            /**
             * Html classes group buttons
             *
             * @public
             * @type {object}
             */
            group: {
                justified: 'btn-group btn-group-justified',
                vertical: 'btn-group-vertical',
                toolbar: 'btn-toolbar',
                default: 'btn-group'
            },

            /**
             * Href default
             *
             * @public
             * @type {string}
             */
            hrefDefault: '#',

            cancelEventOnClick: function() {
                return 'event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);';s
            },

            /**
             * Get error text response ajax
             *
             * @param {object} jqXHR response AJAX
             * @returns {string}
             */
            getTextErrorAjax: function(jqXHR) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                return msg;
            },

            /**
             * Set parameter padding
             *
             * @param {string|null} padding {'lg'|'sm'|'xs'|null}
             * @param {string|null|boolean} def {default value}
             * @returns {*}
             */
            getPadding: function(padding, def) {
                return this.emptyProperty(this.padding, padding, def);
            },

            /**
             * Determine whether a property is empty
             *
             * @public
             * @param {object} obj
             * @param {string|number|null|undefined} property
             * @param {object|string|number|boolean|null} defaultValue
             * @returns {*}
             */
            emptyProperty: function(obj, property, defaultValue) {
                var res = defaultValue;
                if (obj !== null) {
                    if (obj.hasOwnProperty(property) && this.emptyValue(obj[property], null) !== null) {
                        res = obj[property];
                    }
                }
                return res;
            },

            /**
             * Determine whether a variable is empty
             *
             * @public
             * @param {*} value
             * @param {*} defaultValue
             * @returns {*} return value or defaultValue
             */
            emptyValue: function(value, defaultValue) {
                var res = defaultValue;
                if (value !== null && value !== '' && value !== undefined) {
                    res = value;
                }
                return res;
            },

            /**
             * Generate html tag
             *
             * @public
             * @param {string} tagName
             * @param {object|undefined} attributes
             * @param {string|number|null|undefined} content
             * @param {boolean} closed
             * @returns {string}
             */
            getTag: function(tagName, attributes, content, closed) {
                var element = '';
                if (typeof tagName === 'string') {
                    element = '<' + tagName + this.getAttr(attributes) + '>';
                    closed = this.emptyValue(closed, true);
                    if (closed === true) {
                        element += this.emptyValue(content, '') + '</' + tagName + '>';
                    }
                }
                return element;
            },

            /**
             * Generate html attributes
             *
             * @public
             * @param {object|undefined} attributes
             * @returns {string}
             */
            getAttr: function(attributes) {
                var str = '';
                var obj = this;
                $.each(attributes, function(name, value) {
                    if (obj.emptyValue(value, null) !== null && typeof value !== 'boolean') {
                        if (typeof value === 'string') {
                            str += name + '="' + value.replace(/\s{2,}/g, ' ').trim() + '" ';
                        } else {
                            str += name + '="' + value + '" ';
                        }
                    }
                });
                if (str !== '') {
                    str = ' ' + str.trim();
                }
                return str;
            },

            /**
             * Generate html ID
             *
             * @public
             * @param {string|null} htmlId
             * @param {string|null} htmlName
             * @returns {string|null}
             */
            getId: function(htmlId, htmlName) {
                var _id = null;
                if (typeof htmlId === 'string') {
                    _id = htmlId;
                } else if (htmlId === null) {
                    if (typeof htmlName === 'string') {
                        _id = htmlName.replace('[', '-').replace(']', '');
                    } else {
                        _id = null;
                    }
                }
                return _id;
            },

            /**
             * Generate html icon
             *
             * @public
             * @param {string|null} iconName
             * @param {string|null} htmlClass
             * @returns {string}
             */
            getIcon: function(iconName, htmlClass) {
                var icon = '';
                iconName = this.emptyValue(iconName, null);
                if (iconName !== null) {
                    icon = this.getTag(
                        'span',
                        {
                            class: CLASS_ICON + ' ' + CLASS_ICON + '-' + iconName + ' ' +
                                   this.emptyValue(htmlClass, '')
                        },
                        ''
                    );
                }
                return icon;
            },

            //==========================================================================================================
            /**
             * Get html class - skin
             *
             * @param {string|null} skin
             * @returns {string|null}
             */
            getSkin: function(skin) {
                var style = this.emptyProperty(this.css.skin, skin, false);
                var res = null;
                if (style !== false) {
                    res = this.css.prefix.text + '-' + style + ' ' + this.css.prefix.field + '-' + style;
                }
                return res;
            },

            /**
             * Get html class - size
             *
             * @param {string} type {'input'|'pagination'|'button'}
             * @param {string} size {'lg'|'sm'|'xs'}
             * @returns {string}
             */
            getSize: function(type, size) {
                var cssSize = this.emptyProperty(this.css.size, type, false);
                if (cssSize !== false) {
                    return this.emptyProperty(cssSize, size, cssSize.xs);
                }
                return null;
            },

            /**
             * Get disabled element
             *
             * @public
             * @param {boolean} disabled
             * @returns {*}
             */
            getDisabled: function(disabled) {
                if (disabled === true) {
                    return this.css.disabled;
                }
                return null;
            }
        };

    } (window.HTML || {}));