
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';

    new ui.FFButton()
        .addButton({name_1: 'value-btn'}, 'name_1', 'Название кнопки - 1', 'primary', true)
        .addButton({name_2: 'value-btn'}, 'name-2', 'Название кнопки - 2', 'success', true)
        .addButton({name_3: 'value-btn'}, 'name-3', 'Название кнопки - 3', 'info', true)
        .addButton({name_4: 'value-btn'}, 'name-4', 'Название кнопки - 4', 'warning', true)
        .addButton({name_5: 'value-btn'}, 'name_5', 'Название кнопки - 5', 'danger', true)
        .addButton({name_6: 'value-btn'}, 'name-6', 'Название кнопки - 6', null, true)
        .setGroup('vertical')
        .setWidth(2)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('value-1.1', 'name-1.1', 'Название кнопки - 1.1', 'primary', false)
        .addButton('value-1.2', 'name-1.2', 'Название кнопки - 1.2', 'success', false)
        .addButton('value-1.3', 'name-1.3', 'Название кнопки - 1.3', 'info', false)
        .addButton('value-1.4', 'name-1.4', 'Название кнопки - 1.4', 'warning', false)
        .addButton('value-1.5', 'name-1.5', 'Название кнопки - 1.5', 'danger', false)
        .addButton('value-1.6', 'name-1.6', 'Название кнопки - 1.6', null, false)
        .setGroup('vertical')
        .setWidth(2)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('value-2.1', 'name-2.1', 'Название кнопки - 2.1', 'primary', false)
        .addButton('value-2.2', 'name-2.2', 'Название кнопки - 2.2', 'success', false)
        .addButton('value-2.3', 'name-2.3', 'Название кнопки - 2.3', 'info', false)
        .addButton('value-2.4', 'name-2.4', 'Название кнопки - 2.4', 'warning', false)
        .addButton('value-2.5', 'name-2.5', 'Название кнопки - 2.5', 'danger', false)
        .addButton('value-2.6', 'name-2.6', 'Название кнопки - 2.6', null, false)
        .setBlock()
        .setWidth(2)
        .setActive()
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('value-3.1', 'name-3.1', 'Название кнопки - 3.1', 'primary', false)
        .addButton('value-3.2', 'name-3.2', 'Название кнопки - 3.2', 'success', false)
        .addButton('value-3.3', 'name-3.3', 'Название кнопки - 3.3', 'info', false)
        .addButton('value-3.4', 'name-3.4', 'Название кнопки - 3.4', 'warning', false)
        .addButton('value-3.5', 'name-3.5', 'Название кнопки - 3.5', 'danger', false)
        .addButton('value-3.6', 'name-3.6', 'Название кнопки - 3.6', null, false)
        .setBlock()
        .setWidth(2)
        .setDisabledIf('name-3.1')
        .setDisabledIf('name-3.3')
        .setDisabledIf('name-3.5')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('Кнопка-4.1', 'name-4.1', 'Название кнопки - 4.1', 'primary', false)
        .addButton('Кнопка-4.2', 'name-4.2', 'Название кнопки - 4.2', 'success', false)
        .addButton('Кнопка-4.3', 'name-4.3', 'Название кнопки - 4.3', 'info', false)
        .addButton('Кнопка-4.4', 'name-4.4', 'Название кнопки - 4.4', 'warning', false)
        .addButton('Кнопка-4.5', 'name-4.5', 'Название кнопки - 4.5', 'danger', false)
        .addButton('Кнопка-4.6', 'name-4.6', 'Название кнопки - 4.6', null, false)
        .setActive()
        .setWidth(12)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('Кнопка-5.1', 'name-5.1', 'Название кнопки - 5.1', 'primary', false)
        .addButton('Кнопка-5.2', 'name-5.2', 'Название кнопки - 5.2', 'success', false)
        .addButton('Кнопка-5.3', 'name-5.3', 'Название кнопки - 5.3', 'info', false)
        .addButton('Кнопка-5.4', 'name-5.4', 'Название кнопки - 5.4', 'warning', false)
        .addButton('Кнопка-5.5', 'name-5.5', 'Название кнопки - 5.5', 'danger', false)
        .addButton('Кнопка-5.6', 'name-5.6', 'Название кнопки - 5.6', null, false)
        .setGroup('group')
        .setActive()
        .setWidth(12)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('Кнопка-6.1', 'name-6.1', 'Название кнопки - 6.1', 'primary', false)
        .addButton('Кнопка-6.2', 'name-6.2', 'Название кнопки - 6.2', 'success', false)
        .addButton('Кнопка-6.3', 'name-6.3', 'Название кнопки - 6.3', 'info', false)
        .addButton('Кнопка-6.4', 'name-6.4', 'Название кнопки - 6.4', 'warning', false)
        .addButton('Кнопка-6.5', 'name-6.5', 'Название кнопки - 6.5', 'danger', false)
        .addButton('Кнопка-6.6', 'name-6.6', 'Название кнопки - 6.6', null, false)
        .setGroup('toolbar')
        .setActive()
        .setWidth(12)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('Кнопка-7.1', 'name-7.1', 'Название кнопки - 7.1', 'primary', false)
        .addButton('Кнопка-7.2', 'name-7.2', 'Название кнопки - 7.2', 'success', false)
        .addButton('Кнопка-7.3', 'name-7.3', 'Название кнопки - 7.3', 'info', false)
        .addButton('Кнопка-7.4', 'name-7.4', 'Название кнопки - 7.4', 'warning', false)
        .addButton('Кнопка-7.5', 'name-7.5', 'Название кнопки - 7.5', 'danger', false)
        .addButton('Кнопка-7.6', 'name-7.6', 'Название кнопки - 7.6', null, false)
        .setGroup('justified')
        .setActive()
        .setWidth(12)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('Кнопка-8.1', 'name-8.1', 'Название кнопки - 8.1', null, false)
        .addButton('Кнопка-8.2', 'name-8.2', 'Название кнопки - 8.2', null, false)
        .addButton('Кнопка-8.3', 'name-8.3', 'Название кнопки - 8.3', null, false)
        .addButton('Кнопка-8.4', 'name-8.4', 'Название кнопки - 8.4', null, false)
        .addButton('Кнопка-8.5', 'name-8.5', 'Название кнопки - 8.5', null, false)
        .addButton('Кнопка-8.6', 'name-8.6', 'Название кнопки - 8.6', null, false)
        .setGroup('justified')
        .setWidth(12)
        .appendHTML(APPEND_ELEMENT);

    var buttons = [
        {type: 'button', value: 'Button-9.1', name: 'name-9.1', caption: 'Кнопка объекта - 9.1'},
        {type: 'button', value: 'Button-9.2', name: 'name-9.2', caption: 'Кнопка объекта - 9.2', active: true},
        {type: 'button', value: 'Button-9.3', name: 'name-9.3', caption: 'Кнопка объекта - 9.3', skin: 'success'},
        {type: 'button', value: 'Button-9.4', name: 'name-9.4', caption: 'Кнопка объекта - 9.4', skin: 'success', active: true}
    ];

    new ui.FFButton()
        .addButtonList(buttons)
        .setGroup('justified')
        .appendHTML(APPEND_ELEMENT);