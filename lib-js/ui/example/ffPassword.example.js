
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';

    // Пример - 1
    new ui.FFPassword(null, 'password', null)
        .setWidth(3)
        .setLeftIcon('user')
        .setRightMarker('your password')
        .setSkin('success')
        .setRequired(true)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFPassword(null, 'repeat-password', null)
        .setWidth(3)
        .setLeftIcon('user')
        .setRightMarker('repeat password')
        .setSkin('success')
        .appendHTML(APPEND_ELEMENT);

    // Пример - 2
    new ui.FFPassword('value password', 'name-pass', 'Password')
        .setWidth(3)
        .setWidthCaption(4)
        .setLeftIcon('pencil')
        .setSkin('warning')
        .setRequired(true)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFPassword(null, 'name-pass-repeat', 'Password-repeat')
        .setWidth(3)
        .setWidthCaption(4)
        .setSkin('warning')
        .setRequired(true)
        .appendHTML(APPEND_ELEMENT);

    // Пример - 3
    new ui.FFPassword('value password', 'name-pas', 'Password')
        .setWidth(4)
        .setRequired(true)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFPassword(null, 'name-pas_repeat', 'Password repeat')
        .setWidth(4)
        .setRequired(true)
        .appendHTML(APPEND_ELEMENT);