console.time('test');
    // ID элемента для вставки полей
    var APPEND_ELEMENT = '#element_append';
var dataTest = [];
for (var i =0; i <500; i++) {

    dataTest.push({
        id: i * 1456,
        name2: 'Тестовые данные -' + i,
        name3: 'Тестовые данные -' + i,
        name4: 'Тестовые данные -' + i,
        name5: 'Тестовые данные -' + i,
        name6: 'Тестовые данные -' + i
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
        .setMaxRow(10)

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

    new ui.List('id', 'list-users')
        .setLinkEdit('http://symfony.cms/lib-js/ui/example/index.html?page=form')
        .setLinkAdd('http://symfony.cms/lib-js/ui/example/index.html?page=form')
        .setLinkDel('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        .setLinkPagination('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
        //.setTitle('List user', 'description user')
        .setSkinPanel('default')
        .setTypeTable('default')
        .hideBtnBack(true)
        .setMaxRow(10)
        .hideColumnNumber(true)
        .hideColumnCheckbox(true)

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
