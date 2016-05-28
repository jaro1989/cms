(function(HTML) {

	var TAG_DEFAULT = 'div';

	/**
	 * The generator of the basic elements HTML
	 *
	 * @private
	 * @type {HTML.Basis}
	 */
	var _basis = new HTML.Basis();

	/**
	 * @memberOf HTML
	 * @namespace HTML.Tag
	 * @constructor
	 * @param {string} tagName
	 * @param {boolean} tagClosed
	 */
	HTML.buildTag = function(tagName, tagClosed) {
		this._tagName = _basis.emptyValue(tagName, TAG_DEFAULT);
		this._tagClosed = _basis.emptyValue(tagClosed, true);
	};

	/** @protected */
	HTML.buildTag.prototype = {

		/**
		 * Tag name
		 *
		 * @private
		 * @type {string}
		 */
		_tagName: TAG_DEFAULT,

		/**
		 * Open tag or closed
		 * 
		 * @private
		 * @type {boolean}
		 */
		_tagClosed: true,

		/**
		 * Tag contents
		 * 
		 * @private
		 * @type {string|null}
		 */
		_tagContent: null,

		/**
		 * List attributes
		 * 
		 * @private
		 * @type {object}
		 */
		_attr: {
			'id': null,

			'class': null,

			'name': null,

			'disabled': null,

			'href': null,

			'type': null,

			'value': null,

			'placeholder': null,

			'onclick': null,

			'checked': null,

			'action': null,

			'method': null,

			'required': null,

			'for': null
		},
		
		getAttributes: function() {
			return this._attr;
		},

		/**
		 * Set attributes
		 * 
		 * @public
		 * @param {object} attributes
		 * @returns {HTML.Tag}
		 */
		setAttributes: function(attributes) {
			if (typeof attributes === 'object') {
				var currentObj = this;
				$.each(attributes, function(attrName, attrValue) {
					if (currentObj.attr.hasOwnProperty(attrName)) {
						currentObj.attr[attrName] = attrValue;
					}
				});
			}
			return this;
		},

		/**
		 * Set data in tag
		 * 
		 * @public
		 * @param {string} data
		 * @returns {HTML.Tag}
		 */
		setContent: function(data) {
			this._tagContent = data;
			return this;
		},

		getId: function() {
			return this._attr.id;
		},

		/**
		 * Set attribute "id"
		 * 
		 * @public
		 * @param {string} htmlId
		 * @returns {HTML.Tag}
		 */
		setId: function(htmlId) {
			if (typeof htmlId === 'string') {
				this._attr.id = htmlId;
			} else if (htmlId === null) {
				if (typeof this.name === 'string') {
					this._attr.id = this.name.replace('[', '-').replace(']', '');
				}
			}
			return this;
		},

		getClass: function() {
			return this._attr.class;
		},

			
		/**
		 * Set attribute "class"
		 * 
		 * @public
		 * @param {string} htmlClass
		 * @returns {HTML.Tag}
		 */
		setClass: function(htmlClass) {
			this._attr.class = htmlClass;
			return this;
		},

			
		/**
		 * Add attribute "class"
		 * 
		 * @public
		 * @param {string} htmlClass
		 * @returns {HTML.Tag}
		 */
		addClass: function(htmlClass) {
			this._attr.class = _basis.emptyValue(this._attr.class, '') + ' ' + htmlClass;
			return this;
		},

		getName: function() {
			return this._attr.name;
		},

		/**
		 * Set attribute "name"
		 * 
		 * @public
		 * @param {string} fieldName
		 * @returns {HTML.Tag}
		 */
		setName: function(fieldName) {
			this._attr.name = fieldName;
			return this;
		},

		getDisabled: function() {
			return this._attr.disabled;
		},

		/**
		 * Set attribute "disabled"
		 * 
		 * @public
		 * @param {boolean} state
		 * @returns {HTML.Tag}
		 */
		setDisabled: function(state) {
			if (state === true) {
				this._attr.disabled = 'disabled';
			} else {
				this._attr.disabled = null;
			}
			return this;
		},

		getHref: function() {
			return this._attr.href;
		},

		/**
		 * Set attribute "href"
		 * 
		 * @public
		 * @param {string} link
		 * @returns {HTML.Tag}
		 */
		setHref: function(link) {
			this._attr.href = link;
			return this;
		},

		getType: function() {
			return this._attr.type;
		},

		/**
		 * Set attribute "type"
		 * 
		 * @public
		 * @param {string} typeField
		 * @returns {HTML.Tag}
		 */
		setType: function(typeField) {
			this._attr.type = typeField;
			return this;
		},

		getValue: function() {
			return this._attr.value;
		},

		/**
		 * Set attribute "value"
		 * 
		 * @public
		 * @param {string|number|boolean} value
		 * @returns {HTML.Tag}
		 */
		setValue: function(value) {
			this._attr.value = value;
			return this;
		},

		getPlaceholder: function() {
			return this._attr.placeholder;
		},

		/**
		 * Set attribute "placeholder"
		 * 
		 * @public
		 * @param {string|number} placeholder
		 * @returns {HTML.Tag}
		 */
		setPlaceholder: function(placeholder) {
			this._attr.placeholder = placeholder;
			return this;
		},

		getOnclick: function() {
			return this._attr.onclick;
		},

		/**
		 * Set attribute "onclick"
		 * 
		 * @public
		 * @param {string} dataCallback
		 * @returns {HTML.Tag}
		 */
		setOnclick: function(dataCallback) {
			this._attr.onclick = dataCallback;
			return this;
		},

		getChecked: function() {
			return this._attr.checked;
		},

		/**
		 * Set attribute "checked"
		 * 
		 * @public
		 * @param {boolean} state
		 * @returns {HTML.Tag}
		 */
		setChecked: function(state) {
			if (state === true) {
				this._attr.checked = 'checked';
			} else {
				this._attr.checked = null;
			}
			return this;
		},

		getAction: function() {
			return this._attr.action;
		},

		/**
		 * Set attribute "action"
		 * 
		 * @public
		 * @param {string} link
		 * @returns {HTML.Tag}
		 */
		setAction: function(link) {
			this._attr.action = link;
			return this;
		},

		getMethod: function() {
			return this._attr.method;
		},

		/**
		 * Set attribute "method"
		 * 
		 * @public
		 * @param {string} method
		 * @returns {HTML.Tag}
		 */
		setMethod: function(method) {
			this._attr.method = method;
			return this;
		},

		getRequired: function() {
			return this._attr.required;
		},

		/**
		 * Set attribute "required"
		 * 
		 * @public
		 * @param {boolean} state
		 * @returns {HTML.Tag}
		 */
		setRequired: function(state) {
			if (state === true) {
				this._attr.required = 'required';
			} else {
				this._attr.required = null;
			}
			return this;
		},

		getFor: function() {
			return this._attr.for;
		},

		/**
		 * Set attribute "for"
		 * 
		 * @public
		 * @param {string|number} htmlId
		 * @returns {HTML.Tag}
		 */
		setFor: function(htmlId) {
			this._attr.for = htmlId;
			return this;
		},
		
		/**
		 * Get string with attributes
		 * 
		 * @private
		 * @returns {string} string with html attributes
		 */
		_getStringAttr: function() {
			var str = '';
			$.each(this._attr, function(attrName, attrValue) {

				var value = _basis.emptyValue(attrValue, '');
				if (typeof value === 'string' && value !== '') {
					str += name + '="' + value.replace(/\s{2,}/g, ' ').trim() + '" ';
				} else {
					str += name + '="' + value + '" ';
				}

			});
			if (str !== '') {
				str = ' ' + str.trim();
			}
			return str;
		},

		/**
		 * Build html tag
		 * 
		 * @private
		 * @returns {string} Html tag
		 */
		_buildTag: function() {
			var element = '';
			if (typeof this._tagName === 'string') {

				element = '<' + this._tagName + this._getStringAttr() + '>';
				element += _basis.emptyValue(this._tagContent, '');

				if (this._tagClosed === true) {
					element += '</' + this._tagName + '>';
				}
			}
			return element;
		},

		/**
		 * Compiles and returns HTML tag
		 *
		 * @public
		 * @returns {string} Html tag
		 */
		toHTML: function() {
			return this._buildTag();
		},

		/**
		 * Compiles and appends HTML tag in elements "element"
		 *
		 * @public
		 * @param {string} element {This table will be added in element "element"}
		 * @returns {HTML.Tag}
		 */
		appentTo: function(element) {
			$(element).append(this._buildTag());
			return this;
		}
	}

} (window.HTML || {}));