
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';

    new ui.FFCheckbox()
        .setCaptionBlock('Caption block Checkbox')
        .addCheckbox(0, 'name-1.1', 'checkbox - 1')
        .addCheckbox(1, 'name-2.1', 'checkbox - 2')
        .addCheckbox(1, 'name-3.1', 'checkbox - 3')
        .addCheckbox(0, 'name-4.1', 'checkbox - 4')

        .setRequiredIf('name-2.1')
        .setRequiredIf('name-4.1')
        .setFieldsHorizontal()
        .setSkin('success')
        .setWidth(3)
        .setWidthCaptionItem(6)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFCheckbox()
        .addCheckbox({'name-1.2': 1},    'name-1.2', 'checkbox - 1')
        .addCheckbox(null, 'name-2_2', 'checkbox - 2')
        .addCheckbox(null, 'name-3.2', 'checkbox - 3')
        .addCheckbox(null, 'name-4.2', 'checkbox - 4')

        .setWidth(1)
        .setRequiredIf('name-2_2')
        .setDisabled()
        .setSkin('warning')
        .appendHTML(APPEND_ELEMENT);

    var checkbox_list_1 = {};
    var checkbox_list_2 = {};

    for (var i = 1; i <= 12; i++) {

        checkbox_list_1[i] = {
            value: 1,
            name: 'name-list-1.' + i,
            caption: 'checkbox list - 1.' + i
        };

        checkbox_list_2[i] = {
            value: 1,
            name: 'name-list-2.' + i,
            caption: 'checkbox list - 2.' + i
        };
    }

    new ui.FFCheckbox()
        .addCheckboxList(checkbox_list_1)
        .setWidth(2)
        .setRequired(true)
        .setSkin('error')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFCheckbox()
        .addCheckboxList(checkbox_list_2)
        .setWidth(6)
        .setRequired(true)
        .setWidthCaptionItem(3)
        .setCaptionBlock('Caption block', 3)
        .setFieldsHorizontal()
        .appendHTML(APPEND_ELEMENT);