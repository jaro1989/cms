
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';


    new ui.FFSelect('2', 'name', 'Select list')
        .setList(
            [
                {value: null, text: 1},
                {value: 2, text: 2},
                {value: 3, text: 3}
            ]
        )
        .appendHTML(APPEND_ELEMENT);