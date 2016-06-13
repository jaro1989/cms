
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';


    new ui.FFSelect('2', 'name-1', 'Select list')
        .setList(
            [
                {value: null, text: 'Item - 1'},
                {value: 2,    text: 'Item - 2'},
                {value: 3,    text: 'Item - 3'}
            ]
        )
        .addItem(4, 'Item - 4')
        .addItem(4, 'Item - 5')
        .setWidth(2)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFSelect(1, 'nam-2', 'Select list-2')
        .addItem(1, 'Item - 1')
        .addItem(2, 'Item - 2')
        .setWidth(2)
        .setLeftIcon('star')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFSelect(null, 'name-3', 'Select list-3')
        .addItem(1, 'Item - 1')
        .addItem(2, 'Item - 2')
        .setWidth(2)
        .setLeftIcon('star')
        .setRightIcon('trash')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFSelect(null, 'name-4', 'Select list-4')
        .addItem(1, 'Item - 1')
        .addItem(2, 'Item - 2')
        .setWidth(2)
        .setLeftMarker('(8-029)')
        .setRightIcon('phone')
        .setSkin('warning')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFSelect(null, 'name-5', 'Select list-5')
        .addItem(1, 'Item - 1')
        .addItem(2, 'Item - 2')
        .setWidth(4)
        .setLeftMarker('Текст')
        .setRightMarker('Текст')
        .setSkin('success')
        .appendHTML(APPEND_ELEMENT);

    for (var i = 0; i < 4; i++) {

        new ui.FFSelect(1, 'nam-6.' + i, 'Select list-6.' + i)
            .addItem(1, 'Item - 1')
            .addItem(2, 'Item - 2')
            .setWidth(6)
            .setWidthCaption(6)
            .setLeftIcon('star')
            .appendHTML(APPEND_ELEMENT);

        new ui.FFSelect(1, 'nam-7.' + i, 'Select list-7.' + i)
            .addItem(1, 'Item - 1')
            .addItem(2, 'Item - 2')
            .setWidth(6)
            .setWidthCaption(6)
            .setLeftIcon('star')
            .appendHTML(APPEND_ELEMENT);
    }

    for (var a = 0; a < 4; a++) {

        new ui.FFSelect(1, 'nam-8.' + a, 'Select list-8.' + a)
            .addItem(1, 'Item - 1')
            .addItem(2, 'Item - 2')
            .setWidth(3)
            .setWidthCaption(3)
            .setLeftIcon('star')
            .appendHTML(APPEND_ELEMENT);

        new ui.FFSelect(1, 'nam-9.' + a, 'Select list-9.' + a)
            .addItem(1, 'Item - 1')
            .addItem(2, 'Item - 2')
            .setWidth(3)
            .setWidthCaption(3)
            .setLeftIcon('star')
            .appendHTML(APPEND_ELEMENT);
    }