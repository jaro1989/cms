console.time('test');
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';
var dataTest = [];
for (var i =0; i < 10; i++) {

    dataTest.push({
        id: i * 1456,
        name2: 'Тестовые данные -' + i,
        name3: 'Тестовые данные -' + i,
        name4: 'Тестовые данные -' + i
    });
}

    new ui.List('list-user')
        .setTitle('List user', 'description user')
        .setTypeTable('bordered')
        .hideColumnNumber(false)
        //.hideColumnCheckbox(true)
        .setLinkEdit('id', 'asdasdad')

        .newRowHead()
        .addCell('Тестовые данные HEADER', 4, 1)

        .newRowHead()
        .addCell('Тестовые данные HEADER', 2, 1)
        .addCell('Тестовые данные HEADER', 2, 1)

        //.newRowHead()
        //.addCell('Text-1', 1, 1)
        //.addCell('Text-2', 1, 1)
        //.addCell('Text-3', 1, 1)
        //.addCell('Text-4', 1, 1)
        //
        //
        //
        //.newRowBody()
        //.addCell('Text-1', 1, 1)
        //.addCell('Text-2', 1, 1)
        //.addCell('Text-3', 1, 1)
        //.addCell('Text-4', 1, 1)


        .addRowsBody(dataTest)

        .newRowBody()
        .addCell('Text-1', 1, 1)
        .addCell('Text-2', 1, 1)
        .addCell('Text-3', 1, 1)
        .addCell('Text-4', 1, 1)

        .addRowsBody(dataTest)

        .newRowBody()
        .addCell('Text-1', 1, 1)
        .addCell('Text-2', 1, 1)
        .addCell('Text-3', 1, 1)
        .addCell('Text-4', 1, 1)


        //
        //
        //
        //.newRowFoot()
        //.addCell('Тестовые данные FOOTER', 2, 1)
        //.addCell('Тестовые данные FOOTER', 2, 1)

        .appendHTML(APPEND_ELEMENT);

console.timeEnd('test');
