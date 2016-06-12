
    // ID элемента в который будем добавлять текстовые поля
    var APPEND_ELEMENT = '#element_append';

    var radioList = {
        1: 'Label-1',
        2: 'Label-2',
        3: 'Label-3',
        4: 'Label-4',
        5: 'Label-5'
    };
    new ui.FFRadio(22, 'name-radio', radioList)
        .setWidth(2)
        .setFieldsHorizontal()
        .setSkin('error')
        .addRadioList('22', 'sssssssssssssss')
        .appendHTML(APPEND_ELEMENT);