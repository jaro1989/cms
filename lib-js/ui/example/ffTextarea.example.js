    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';

    var valueText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry";

    // Поле по умолчанию
    new ui.FFTextarea(valueText, 'nameTextarea-1-1', 'Label textarea 1.1')
        .appendHTML(APPEND_ELEMENT);

    // Задан рамер поля и скин
    new ui.FFTextarea(valueText, 'nameTextarea-1-2', 'Label textarea 1.2')
        .setWidth(3)
        .setSkin('success')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFTextarea(valueText, 'nameTextarea-1-3', 'Label textarea 1.3')
        .setWidth(3)
        .setSkin('warning')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFTextarea(valueText, 'nameTextarea-1-3', 'Label textarea 1.3')
        .setWidth(3)
        .setSkin('error')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFTextarea(valueText, 'nameTextarea-1-4', 'Label textarea 1.4')
        .setWidth(3)
        .appendHTML(APPEND_ELEMENT);

    // Название поля в строку
    new ui.FFTextarea(valueText, 'nameTextarea-1-5', 'Label textarea 1.5')
        .setWidth(4)
        .setWidthCaption(3)
        .setSkin('warning')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFTextarea(valueText, 'nameTextarea-1-6', 'Label textarea 1.6')
        .setWidth(4)
        .setWidthCaption(3)
        .setSkin('error')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFTextarea(valueText, 'nameTextarea-1-7', 'Label textarea 1.7')
        .setWidth(4)
        .setWidthCaption(3)
        .appendHTML(APPEND_ELEMENT);

    // Поле с иконнками и статическим текстом
    new ui.FFTextarea(valueText, 'nameTextarea-1-8', null)
        .setWidth(4)
        .setLeftIcon('user')
        .setRightMarker('Некий текст')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFTextarea(valueText, 'nameTextarea-1-9', null)
        .setWidth(4)
        .setLeftIcon('star')
        .setRightIcon('star')
        .setSkin('warning')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFTextarea(valueText, 'nameTextarea-1-10', null)
        .setWidth(4)
        .setLeftMarker('Некий текст')
        .setRightMarker('Некий текст')
        .appendHTML(APPEND_ELEMENT);

    // Нельзя изменять размер textarea
    new ui.FFTextarea(valueText, 'nameTextarea-1-11', 'Label textarea 1.11')
        .setWidth(4)
        .setLeftIcon('star')
        .setRightIcon('star')
        .setSkin('success')
        .setResize('none')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFTextarea(valueText, 'nameTextarea-1-11', 'Label textarea 1.11')
        .setWidth(4)
        .setRequired()
        .setLeftMarker('Некий текст')
        .setRightMarker('Некий текст')
        .setResize('none')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFTextarea(valueText, 'nameTextarea-1-12', 'Label textarea 1.12')
        .setWidth(4)
        .setRequired()
        .setRequired()
        .setLeftMarker('Некий текст')
        .setRightMarker('Некий текст')
        .setSkin('error')
        .setResize('none')
        .setDisabled()
        .appendHTML(APPEND_ELEMENT);

    // Изменение только высоты
    new ui.FFTextarea(' Изменение только высоты', 'nameTextarea-1-13', 'Label textarea 1.13')
        .setWidth(4)
        .setHeight(100)
        .setResize('vertical')
        .appendHTML(APPEND_ELEMENT);

    // Изменение только ширины
    new ui.FFTextarea('Изменение только ширины', 'nameTextarea-1-13', 'Label textarea 1.13')
        .setWidth(4)
        .setHeight(100)
        .setResize('horizontal')
        .appendHTML(APPEND_ELEMENT);

