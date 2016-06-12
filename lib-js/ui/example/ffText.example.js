
    // ID элемента в который будем добавлять текстовые поля
    var APPEND_ELEMENT = '#element_append';

    // Собираем массив из которого будем рисовать текстовые поля
    var values = {};
    for (var i = 1; i <= 12; i++) {
        values['name-field-' + i] = 'value-' + i;
    }

    // Пример - 1
    for(var a in values) {
        if (values.hasOwnProperty(a)) {
            // Конфигурируем текстовое поле
            new ui.FFText('a' + values[a], 'a' + a, 'Label -' + a)
                .setWidth(3)
                .setWidthCaption(6)
                .setLeftIcon('earphone')
                .setRightMarker('(8-029)')
                .setSkin('success')
                .setRequired(true)
                .appendHTML(APPEND_ELEMENT);

        }
    }

    // Пример - 2
    for(var b in values) {
        if (values.hasOwnProperty(b)) {
            // Конфигурируем текстовое поле
            new ui.FFText('b' + values[b], 'b' + b, 'Label -' + b)
                .setWidth(3)
                .setLeftIcon('phone-alt')
                .setRightMarker('(+375 29)')
                .setSkin('warning')
                .setRequired(true)
                .appendHTML(APPEND_ELEMENT);

        }
    }

    // Пример - 3
    for(var c in values) {
        if (values.hasOwnProperty(c)) {
            // Конфигурируем текстовое поле
            new ui.FFText('c' + values[c], 'c' + c, 'Label -' + c)
                .setWidth(2)
                .setLeftIcon('euro')
                .setSkin('error')
                .setRequired(true)
                .appendHTML(APPEND_ELEMENT);

        }
    }

    // Пример - 4
    for(var e in values) {
        if (values.hasOwnProperty(e)) {
            // Конфигурируем текстовое поле
            new ui.FFText('e' + values[e], 'e' + e, 'Label -' + e)
                .setWidth(4)
                .setWidthCaption(4)
                .setRequired(true)
                .appendHTML(APPEND_ELEMENT);

        }
    }