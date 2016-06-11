
    console.log(

        new ui.FFText({'name-field': 'значение объекта'}, 'name-field')
            .setLabel('Test-label')
            .setWidth(3)
            .setWidthLabel(6)
            .setLeftMarker('$')
            .setRightMarker('@')
            .setSkin('success')
            .setSize('lg')
            .appendHTML('#element_append')
            .toHTML()


    );

    new ui.FFText('Просто значение', 'name-field-2')
        .setLabel('Test-label')
        .setWidth(3)
        .setWidthLabel(6)
        .setLeftMarker('$')
        .setRightMarker('@')
        .appendHTML('#element_append')
        .toHTML();

    new ui.FFText('Просто значение', 'name-field-3')
        .setLabel('Test-label')
        .setWidth(3)
        .setWidthLabel(6)
        .setLeftMarker('$')
        .setRightMarker('@')
        .appendHTML('#element_append')
        .toHTML();

    new ui.FFText('Просто значение', 'name-field-4')
        .setLabel('Test-label')
        .setWidth(3)
        .setWidthLabel(6)
        .setLeftMarker('$')
        .setRightMarker('@')
        .appendHTML('#element_append')
        .toHTML();

    new ui.FFText('Просто значение', 'name-field-5')
        .setLabel('Test-label')
        .setWidthLabel(2)
        .setLeftMarker('$')
        .setRightMarker('@')
        .appendHTML('#element_append')
        .toHTML();