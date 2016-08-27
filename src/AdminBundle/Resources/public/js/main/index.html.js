

console.time('test');
// ID элемента для вставки списка
var APPEND_ELEMENT = '#page-html';
var dataTest = [];
for (var i =0; i <10; i++) {

    dataTest.push({
        id: i * 1456,
        name2: (i + 1) * 423,
        name3: 'Тестовые данные -' + i,
        name4: 'Оптимизация, о которой здесь <span style="color: #f00;">идёт речь, важна</span> в первую очередь для старых <span style="color: #3e8f3e;">браузеров, включая IE9-</span>. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.',
        name5: 'images/sf-icon.png',
        name6: 'hhhТестовые данные -' + i
    });
}

new ui.List('id', 'list-user', null)
    .setSkin('default')
    .setSkinBlockSearch('default')
    .setTitleSearch('search', 'search')
    .setParentBlock(
        null,
        null,
        {
            description_kr1: 'Киселев',
            description_kr2: 'Валерий',
            description_kr3: 'Александрович',
            description_kr4: 'Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.Оптимизация, о которой здесь идёт речь, важна в первую очередь для старых браузеров, включая IE9-. В современных браузерах эффект от нее, как правило, небольшой, а иногда может быть и отрицательным.',
            description_kr5: 'Его «Фишка» заключается в том, что когда DocumentFragment вставляется в DOM – то он исчезает, а вместо него вставляются его дети. Это свойство является уникальной особенностью DocumentFragment.',
            description_kr6: '1xvx1@mail.ru'
        }
    )
    .newLineSearchFields()
    .addTextField('description_kr1', 'Краткое описание1', false)
    .addTextField('description_kr2', 'Краткое описание2', false)
    .addTextField('description_kr3', 'Краткое описание3', false)
    .addTextField('description_kr6', 'Краткое описание3', false)
    .newLineSearchFields()
    .addTextareaField('description_kr4', 'Краткое описание1', false, 50)
    .addTextareaField('description_kr5', 'Краткое описание2', false, 50)

    .setLinkAddEndEdit('http://symfony.cms/lib-js/ui/example/index.html?page=form')
    .setLinkTrash('http://symfony.cms/lib-js/ui/example/index.html?page=form')
    .setAction('http://symfony.cms/lib-js/ui/example/actionFormServer.php')
    .setTitle('List user', 'description user')

    .setTypeTable('bordered')
    .hideColumnNumber(false)
    .hideColumnCheckbox(false)

    .setMaxRow(10)
    .setCountPages(22)
    .setCurrentPage(6)

    .newRowHead()
    .addCellHead('Тестовые данные', 4, 1, false, null, 'text-align: center;')

    .newRowHead()
    .addCellHead('Числа', 1, 1, true, 1, null)
    .addCellHead('Малый текст ссылка', 1, 1, true, 3, null)
    .addCellHead('Большой текст с тэгами', 1, 1, true, 7, null)
    .addCellHead('Картинка', 1, 1, true, 1, null)

    .addColumn('name2', 'number')
    .addColumn('name3', 'link')
    .addColumn('name4', 'text')
    .addColumn('name5', 'image')

    .addRowsBody(dataTest)

    .newRowFoot()
    .addCell('Тестовые данные Foot', 4, 1)

    .appendHTML(APPEND_ELEMENT);

console.timeEnd('test');