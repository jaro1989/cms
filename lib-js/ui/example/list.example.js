console.time('test');
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';
var dataTest = [];
for (var i =0; i <50; i++) {

    dataTest.push({
        id: i * 1456,
        name2: 'Тестовые данные -' + i,
        name3: 'Тестовые данные -' + i,
        name4: 'Тестовые данные -' + i,
        name5: 'Тестовые данные -' + i,
        name6: 'Тестовые данные -' + i
    });
}

    new ui.List(null, 'list-user')
        .setTitle('List user', 'description user')
        .setTypeTable('bordered')
        .hideColumnNumber(false)
        .hideColumnCheckbox(false)
        .setLinkEdit('asdasdad')

        .newRowHead()
        .addCell('Тестовые данные HEADER', 4, 1)

        .newRowHead()
        .addCell('Тестовые данные HEADER', 2, 1)
        .addCell('Тестовые данные HEADER', 2, 1)

        .addColumn('name2', null)
        .addColumn('name3', null)
        .addColumn('name4', null)
        .addColumn('name5', null)

        .addRowsBody(dataTest)

        .newRowFoot()
        .addCell('Тестовые данные Foot', 4, 1)

        .appendHTML(APPEND_ELEMENT);

console.timeEnd('test');
