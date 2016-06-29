
// ID элемента для вставки полей
var APPEND_ELEMENT = '#element_append';

new ui.Form()
    .newLine()
    .addTextField('surname', 'Фамилия')
    .addTextField('name',    'Имя')
    .addTextField('middlename', 'Отчество')
    .newLine()
    .appendHTML(APPEND_ELEMENT);