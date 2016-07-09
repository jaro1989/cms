console.time('test');

    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';

    // Конфигерируем 4 вертикальных радио кнопки
    new ui.FFRadio({'name-radio-1-1': 'id-3.1'}, 'name-radio-1-1', {})
        .setWidth(2)
        .setRequired(true)
        .setSkin('warning')
        .setCaptionBlock('Caption block radio-1', null)
        .addRadioButton('id-1.1', 'Чекбокс-1.1')
        .addRadioButton('id-2.1', 'Чекбокс-1.2')
        .addRadioButton('id-3.1', 'Чекбокс-1.3')
        .addRadioButton('id-4.1', 'Чекбокс-1.4')
        .appendHTML(APPEND_ELEMENT);

    // Конфигерируем 4 вертикальных заблокированых радио кнопки
    new ui.FFRadio('id-3.2', 'name-radio-1-2', {})
        .setWidth(8)
        .setDisabled()
        .setCaptionBlock('Caption block radio-2', 4)
        .addRadioButton('id-1.2', 'Чекбокс-2.1')
        .addRadioButton('id-2.2', 'Чекбокс-2.2')
        .addRadioButton('id-3.2', 'Чекбокс-2.3')
        .addRadioButton('id-4.2', 'Чекбокс-2.4')
        .appendHTML(APPEND_ELEMENT);

    // Конфигерируем 4 горизонтальных радио кнопки
    new ui.FFRadio('id-3.2.2', 'name-radio-1-2-2', {})
        .setWidth(12)
        .setWidthCaptionItem(3)
        .setFieldsHorizontal()
        .addRadioButton('id-1.2.2', 'Чекбокс-2.1')
        .addRadioButton('id-2.2.2', 'Чекбокс-2.2')
        .addRadioButton('id-3.2.2', 'Чекбокс-2.3')
        .addRadioButton('id-4.2.2', 'Чекбокс-2.4')
        .appendHTML(APPEND_ELEMENT);

    // Собираем массив из которого будем рисовать радио кнопки
    var radioList_1_3 = {};
    var radioList_1_4 = {};

    for (var i = 1; i <= 12; i++) {
        radioList_1_3['id-' + i + '.3'] = 'Label - ' + i;
        radioList_1_4['id-' + i + '.4'] = 'Label - ' + i;
    }

    // Конфигерируем 12 горизонтальных радио кнопок с фиксированной щириной текста
    new ui.FFRadio({'radioList_1_3': 'id-3.3'}, 'radioList_1_3', radioList_1_3)
        .setWidth(3)
        .setRequired(true)
        .setFieldsHorizontal()
        .setWidthCaptionItem(3)
        .setSkin('error')
        .appendHTML(APPEND_ELEMENT);

    // Конфигерируем 12 горизонтальных радио кнопок с фиксированной щириной текста
    new ui.FFRadio('id-4.4', 'radioList_1_4', radioList_1_4)
        .setWidth(6)
        .setWidthCaptionItem(6)
        .setCaptionBlock('', 3)
        .setFieldsHorizontal()
        .setSkin('success')
        .appendHTML(APPEND_ELEMENT);

    var radioList_1_5 = {};
    for (var a = 1; a <= 48; a++) {
        radioList_1_5['id-' + a + '.5'] = 'Label - ' + a;
    }

    // Конфигерируем 48 горизонтальных радио кнопок с фиксированной щириной текста и с заблокированными радио кнопками
    new ui.FFRadio('id-30.5', 'radioList_1_5', radioList_1_5)
        .setFieldsHorizontal()

        .setDisabledIf('id-26.5')
        .setDisabledIf('id-27.5')
        .setDisabledIf('id-28.5')
        .setDisabledIf('id-29.5')
        .setDisabledIf('id-30.5')
        .setDisabledIf('id-31.5')

        .setCaptionBlock('Caption block radio', 3)
        .setWidthCaptionItem(1)
        .setSkin('success')
        .appendHTML(APPEND_ELEMENT);

console.timeEnd('test');
