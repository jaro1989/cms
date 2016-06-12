
    // ID элемента в который будем добавлять текстовые поля
    var APPEND_ELEMENT = '#element_append';

    new ui.FFRadio({'name-radio-1-1': 'id-3.1'}, 'name-radio-1-1', {})
        .setWidth(3)
        .setSkin('warning')
        .addRadioList('id-1.1', 'Чекбокс-1.1')
        .addRadioList('id-2.1', 'Чекбокс-1.2')
        .addRadioList('id-3.1', 'Чекбокс-1.3')
        .addRadioList('id-4.1', 'Чекбокс-1.4')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFRadio('id-3.2', 'name-radio-1-2', {})
        .setWidth(3)
        .addRadioList('id-1.2', 'Чекбокс-2.1')
        .addRadioList('id-2.2', 'Чекбокс-2.2')
        .addRadioList('id-3.2', 'Чекбокс-2.3')
        .addRadioList('id-4.2', 'Чекбокс-2.4')
        .appendHTML(APPEND_ELEMENT);

    // Собираем массив из которого будем рисовать радио кнопки поля
    var radioList_1_3 = {};
    var radioList_1_4 = {};

    for (var i = 1; i <= 12; i++) {
        radioList_1_3['id-' + i + '.3'] = 'Label - ' + i;
        radioList_1_4['id-' + i + '.4'] = 'Label - ' + i;
    }

    new ui.FFRadio({'radioList_1_3': 'id-3.3'}, 'radioList_1_3', radioList_1_3)
        .setWidth(3)
        .setFieldsHorizontal()
        .setWidthCaption(3)
        .setSkin('error')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFRadio('id-4.4', 'radioList_1_4', radioList_1_4)
        .setWidth(2)
        .setWidthCaption(6)
        .setFieldsHorizontal()
        .setSkin('success')
        .appendHTML(APPEND_ELEMENT);

    var radioList_1_5 = {};
    for (var a = 1; a <= 48; a++) {
        radioList_1_5['id-' + a + '.5'] = 'Label - ' + a;
    }

    new ui.FFRadio('id-22.5', 'radioList_1_5', radioList_1_5)
        .setFieldsHorizontal()
        .setWidthCaption(2)
        .setSkin('success')
        .appendHTML(APPEND_ELEMENT);