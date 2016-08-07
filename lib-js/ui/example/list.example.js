console.time('test');
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';
var dataTest = [];
for (var i =0; i <500; i++) {

    dataTest.push({
        id: i * 1456,
        name2: 'aasТестовые данные -' + i,
        name3: 'ssasТестовые данные -' + i,
        name4: 'dfaaasaТестовые данные -' + i,
        name5: 'fgfafsdТестовые данные -' + i,
        name6: 'hhhТестовые данные -' + i
    });
}

    new ui.List('id', 'list-user')
        .setLinkEdit('http://symfony.cms/lib-js/ui/example/index.html?page=form')
        .setLinkAdd('http://symfony.cms/lib-js/ui/example/index.html?page=form')
        .setLinkDel('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setLinkPagination('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setTitle('List user', 'description user')
        .setTypeTable('bordered')
        .hideColumnNumber(false)
        .hideColumnCheckbox(false)
        .setSkin('success')

        .setMaxRow(10)

        .newRowHead()
        .addCellHead('Тестовые данные HEADER', 4, 1, false, null, null)

        .newRowHead()
        .addCellHead('Тестовые данные HEADER', 1, 1, true, 2, null)
        .addCellHead('Тестовые данные HEADER', 1, 1, true, 2, null)
        .addCellHead('Тестовые данные HEADER', 1, 1, true, 5, null)
        .addCellHead('Тестовые данные HEADER', 1, 1, true, 3, null)

        .addColumn('name2', null)
        .addColumn('name3', null)
        .addColumn('name4', null)
        .addColumn('name5', null)

        .addRowsBody(dataTest)

        .newRowFoot()
        .addCell('Тестовые данные Foot', 4, 1)

        .appendHTML(APPEND_ELEMENT);

    new ui.List('id', 'list-users')
        .setLinkEdit('http://symfony.cms/lib-js/ui/example/index.html?page=form')
        .setLinkAdd('http://symfony.cms/lib-js/ui/example/index.html?page=form')
        .setLinkDel('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setLinkPagination('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        //.setTitle('List user', 'description user')
        .setSkin('default')
        .setTypeTable('default')
        .hideBtnBack(true)
        .setMaxRow(10)
        .hideColumnNumber(true)
        .hideColumnCheckbox(true)

        .newRowHead()
        .addCellHead('Тестовые данные HEADER', 1, 1, false, 2, null)
        .addCellHead('Тестовые данные HEADER', 1, 1, false, 3, null)
        .addCellHead('Тестовые данные HEADER', 1, 1, false, 5, null)
        .addCellHead('Тестовые данные HEADER', 1, 1, false, 2, null)

        .addColumn('name2', null)
        .addColumn('name3', null)
        .addColumn('name4', null)
        .addColumn('name5', null)

        .addRowsBody(dataTest)

        .newRowFoot()
        .addCell('Тестовые данные Foot', 4, 1)

        .appendHTML(APPEND_ELEMENT);

console.timeEnd('test');
