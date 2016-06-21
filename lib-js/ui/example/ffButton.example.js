
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';

    new ui.FFButton()
        .addButton({name_1: 'value-btn'}, 'name_1', 'Название кнопки - 1', 'primary', true, 'star'    )
        .addButton({name_2: 'value-btn'}, 'name-2', 'Название кнопки - 2', 'success', true, 'envelope')
        .addButton({name_3: 'value-btn'}, 'name-3', 'Название кнопки - 3', 'info',    true, 'minus'   )
        .addButton({name_4: 'value-btn'}, 'name-4', 'Название кнопки - 4', 'warning', true, 'plus'    )
        .addButton({name_5: 'value-btn'}, 'name_5', 'Название кнопки - 5', 'danger',  true, 'user'    )
        .addButton({name_6: 'value-btn'}, 'name-6', 'Название кнопки - 6', null,      true, 'search'  )
        .setGroup('vertical')
        .setSize('sm')
        .setWidth(2)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('value-1.1', 'name-1.1', null, 'primary', false, 'star' )
        .addButton('value-1.2', 'name-1.2', null, 'success', false, 'trash')
        .addButton('value-1.3', 'name-1.3', null, 'info',    false, 'home' )
        .addButton('value-1.4', 'name-1.4', 'Название кнопки - 1.4', 'warning', false, null)
        .addButton('value-1.5', 'name-1.5', 'Название кнопки - 1.5', 'danger',  false, null)
        .addButton('value-1.6', 'name-1.6', 'Название кнопки - 1.6', null,      false, null)
        .setGroup('vertical')
        .setWidth(2)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('value-2.1', 'name-2.1', 'Название кнопки - 2.1', 'primary', false, null)
        .addButton('value-2.2', 'name-2.2', 'Название кнопки - 2.2', 'success', false, null)
        .addButton('value-2.3', 'name-2.3', 'Название кнопки - 2.3', 'info',    false, null)
        .addButton('value-2.4', 'name-2.4', 'Название кнопки - 2.4', 'warning', false, null)
        .addButton('value-2.5', 'name-2.5', 'Название кнопки - 2.5', 'danger',  false, null)
        .addButton('value-2.6', 'name-2.6', 'Название кнопки - 2.6', null,      false, null)
        .setBlock()
        .setWidth(2)
        .setActive()
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('value-3.1', 'name-3.1', 'Название кнопки - 3.1', 'primary', false, null)
        .addButton('value-3.2', 'name-3.2', 'Название кнопки - 3.2', 'success', false, null)
        .addButton('value-3.3', 'name-3.3', 'Название кнопки - 3.3', 'info',    false, null)
        .addButton('value-3.4', 'name-3.4', 'Название кнопки - 3.4', 'warning', false, null)
        .addButton('value-3.5', 'name-3.5', 'Название кнопки - 3.5', 'danger',  false, null)
        .addButton('value-3.6', 'name-3.6', 'Название кнопки - 3.6', null,      false, null)
        .setBlock()
        .setWidth(2)
        .setDisabledIf('name-3.1')
        .setDisabledIf('name-3.3')
        .setDisabledIf('name-3.5')
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('Кнопка-4.1', 'name-4.1', 'Название кнопки - 4.1', 'primary', false, null)
        .addButton('Кнопка-4.2', 'name-4.2', 'Название кнопки - 4.2', 'success', false, null)
        .addButton('Кнопка-4.3', 'name-4.3', 'Название кнопки - 4.3', 'info',    false, null)
        .addButton('Кнопка-4.4', 'name-4.4', 'Название кнопки - 4.4', 'warning', false, null)
        .addButton('Кнопка-4.5', 'name-4.5', 'Название кнопки - 4.5', 'danger',  false, null)
        .addButton('Кнопка-4.6', 'name-4.6', 'Название кнопки - 4.6', null,      false, null)
        .setActive()
        .setWidth(12)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('Кнопка-5.1', 'name-5.1', 'Название кнопки - 5.1', 'primary', false, null)
        .addButton('Кнопка-5.2', 'name-5.2', 'Название кнопки - 5.2', 'success', false, null)
        .addButton('Кнопка-5.3', 'name-5.3', 'Название кнопки - 5.3', 'info',    false, null)
        .addButton('Кнопка-5.4', 'name-5.4', 'Название кнопки - 5.4', 'warning', false, null)
        .addButton('Кнопка-5.5', 'name-5.5', 'Название кнопки - 5.5', 'danger',  false, null)
        .addButton('Кнопка-5.6', 'name-5.6', 'Название кнопки - 5.6', null,      false, null)
        .setGroup('group')
        .setActive()
        .setWidth(12)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('Кнопка-6.1', 'name-6.1', null, 'primary', false, 'star'  )
        .addButton('Кнопка-6.2', 'name-6.2', null, 'success', false, 'trash' )
        .addButton('Кнопка-6.3', 'name-6.3', null, 'info',    false, 'user'  )
        .addButton('Кнопка-6.4', 'name-6.4', null, 'warning', false, 'cog'   )
        .addButton('Кнопка-6.5', 'name-6.5', null, 'danger',  false, 'file'  )
        .addButton('Кнопка-6.6', 'name-6.6', null, null,      false, 'remove')
        .setGroup('toolbar')
        .setActive()
        .setWidth(12)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('Кнопка-7.1', 'name-7.1', 'Название кнопки - 7.1', 'primary', false, null)
        .addButton('Кнопка-7.2', 'name-7.2', 'Название кнопки - 7.2', 'success', false, null)
        .addButton('Кнопка-7.3', 'name-7.3', 'Название кнопки - 7.3', 'info',    false, null)
        .addButton('Кнопка-7.4', 'name-7.4', 'Название кнопки - 7.4', 'warning', false, null)
        .addButton('Кнопка-7.5', 'name-7.5', 'Название кнопки - 7.5', 'danger',  false, null)
        .addButton('Кнопка-7.6', 'name-7.6', 'Название кнопки - 7.6', null,      false, null)
        .setGroup('justified')
        .setActive()
        .setWidth(12)
        .appendHTML(APPEND_ELEMENT);

    new ui.FFButton()
        .addButton('Кнопка-8.1', 'name-8.1', 'Название кнопки - 8.1', null, false, null)
        .addButton('Кнопка-8.2', 'name-8.2', 'Название кнопки - 8.2', null, false, null)
        .addButton('Кнопка-8.3', 'name-8.3', 'Название кнопки - 8.3', null, false, null)
        .addButton('Кнопка-8.4', 'name-8.4', 'Название кнопки - 8.4', null, false, null)
        .addButton('Кнопка-8.5', 'name-8.5', 'Название кнопки - 8.5', null, false, null)
        .addButton('Кнопка-8.6', 'name-8.6', 'Название кнопки - 8.6', null, false, null)
        .setGroup('justified')
        .setWidth(12)
        .appendHTML(APPEND_ELEMENT);

    var buttons = [
        {type: 'button', value: 'Button-9.1', name: 'name-9.1', caption: 'Кнопка объекта - 9.1', leftIcon: 'star', rightIcon: 'star'},
        {type: 'button', value: 'Button-9.2', name: 'name-9.2', caption: 'Кнопка объекта - 9.2', active: true, leftIcon: 'star', rightIcon: 'star'},
        {type: 'button', value: 'Button-9.3', name: 'name-9.3', caption: 'Кнопка объекта - 9.3', skin: 'success', leftIcon: 'star', rightIcon: 'star'},
        {type: 'button', value: 'Button-9.4', name: 'name-9.4', caption: 'Кнопка объекта - 9.4', skin: 'success', active: true, leftIcon: 'star', rightIcon: 'star'}
    ];

    new ui.FFButton()
        .addButtonList(buttons)
        .setGroup('justified')
        .appendHTML(APPEND_ELEMENT);