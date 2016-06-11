
    var APPEND_ELEMENT = '#element_append';

    var values = {};

    for (var i = 1; i <= 30; i++) {
        values['name-field-' + i] = 'value-' + i;
    }

    for(var index in values) {
        if (values.hasOwnProperty(index)) {

            new ui.FFText(values[index], index, 'Label -' + index)
                .setWidth(3)
                .setWidthCaption(6)
                .setLeftIcon('earphone')
                .setRightMarker('@')
                .setSkin('success')
                .appendHTML(APPEND_ELEMENT);

        }
    }

    new ui.FFText({'name-field': 'значение объекта'}, 'name-field')
        .setWidth(3)
        .setDisabled()
        .setLeftIcon('user')
        .setRightMarker('@')
        .setSkin('warning')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFText('Просто значение', 'name-field-2')
        .setWidth(3)
        .setRightIcon('signal')
        .setSkin('error')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFText('Просто значение', 'name-field-3')
        .setWidth(3)
        .setLeftMarker('$')
        .setRightMarker('@')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFText('Просто значение', 'name-field-4', 'Test-label')
        .setWidth(3)
        .setWidthCaption(6)
        .setLeftIcon('phone-alt')
        .setRightMarker('@')
        .appendHTML(APPEND_ELEMENT);