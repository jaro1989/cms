
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';

    new ui.FFDate('01/01/2001', 'name-1.1', 'Cption 1.1')
        .setWidthBlock(6)
        .setWidthCaption(2)
        .setRequired()
        .setSkin('error')
        .appendHTML(APPEND_ELEMENT);