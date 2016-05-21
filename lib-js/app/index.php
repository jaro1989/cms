<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="css/bootstrap.min.css" type="text/css" rel="stylesheet" />
    <link href="css/bootstrap-add.css" type="text/css" rel="stylesheet" />
</head>
<body>

    <div class="">
        <div id="navbar-test" style="height: 50px;"></div>
        <h1>Test</h1>
        <div id="test-table"></div>
        <div id="test-btn"></div>
        <div id="test-tab"></div>


    <script src="js/jquery-1.12.3.min.js" type="text/javascript"></script>
    <script src="js/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/html-builder.js" type="text/javascript"></script>



    <script type="text/javascript">
        //jQuery(document).ready(function() {
            new HTML.Tabs('idBlockTAbs', 'nav')
                .setPadding('lg')
                .addTab(
                    'Кнопки toolbar',
                    new HTML.Button('toolbar', 'ID-BLOCK-TOOLBAR')
                        .setMargin('sm')
                        .setActive(true)
                        .setSize('xs')

                        .addButton('Button-1', 'name_button-1b', 'id-button-1b', 'minus', true)
                        .addButton('Button-2', 'name_button-2b', 'id-button-2b', 'plus', true)
                        .addButton('Button-3', 'name_button-3b', 'id-button-3b', 'star', true)
                        .addButton('Button-4', 'name_button-4b', 'id-button-4b', 'star')
                        .addButton('Button-5', 'name_button-5b', 'id-button-5b', 'star')
                        .addButton('Button-6', 'name_button-6b', 'id-button-6b', 'star')
                        .addButton('Button-7', 'name_button-7b', 'id-button-7b', 'star')
                        .toHtml()

                    +

                    new HTML.Button('toolbar', 'ID-BLOCK-TOOLBAR')
                        .setMargin('sm')
                        .setActive(true)
                        .setSize('xs')

                        .addSubmit('Submit-1', 'name_button-1s', 'id-button-1s', 'minus', true)
                        .addSubmit('Submit-2', 'name_button-2s', 'id-button-2s', 'plus', true)
                        .addSubmit('Submit-3', 'name_button-3s', 'id-button-3s', 'star', true)
                        .addSubmit('Submit-4', 'name_button-4s', 'id-button-4s', 'star')
                        .addSubmit('Submit-5', 'name_button-5s', 'id-button-5s', 'star')
                        .addSubmit('Submit-6', 'name_button-6s', 'id-button-6s', 'star')
                        .addSubmit('Submit-7', 'name_button-7s', 'id-button-7s', 'star')
                        .addSubmit('Submit-8', 'name_button-8s', 'id-button-8s', 'star')
                        .toHtml()

                    +

                    new HTML.Button('toolbar', 'ID-BLOCK-TOOLBAR')
                        .setMargin('sm')
                        .setSize('xs')

                        .addLink('Link-1', 'name_button-1l', 'id-button-1l', 'minus', true)
                        .addLink('Link-2', 'name_button-2l', 'id-button-2l', 'plus', true)
                        .addLink('Link-3', 'name_button-3l', 'id-button-3l', 'star', true)
                        .addLink('Link-4', 'name_button-4l', 'id-button-4l', 'star')
                        .addLink('Link-5', 'name_button-5l', 'id-button-5l', 'star')
                        .addLink('Link-6', 'name_button-6l', 'id-button-6l', 'star')
                        .addLink('Link-7', 'name_button-7l', 'id-button-7l', 'star')
                        .addLink('Link-8', 'name_button-8l', 'id-button-8l', 'star')
                        .addLink('Link-9', 'name_button-9l', 'id-button-9l', 'star')
                        .toHtml()

                    +

                    new HTML.Button('toolbar', 'ID-BLOCK-TOOLBAR')
                        .setMargin('sm')
                        .setSize('xs')
                        .setSkin('link')

                        .addLink('Link-1', 'name_button-1ll', 'id-button-1ll', 'minus', true)
                        .addLink('Link-2', 'name_button-2ll', 'id-button-2ll', 'plus', true)
                        .addLink('Link-3', 'name_button-3ll', 'id-button-3ll', 'star', true)
                        .addLink('Link-4', 'name_button-4ll', 'id-button-4ll', 'star')
                        .addLink('Link-5', 'name_button-5ll', 'id-button-5ll', 'star')
                        .addLink('Link-6', 'name_button-6ll', 'id-button-6ll', 'star')
                        .addLink('Link-7', 'name_button-7ll', 'id-button-7ll', 'star')
                        .addLink('Link-8', 'name_button-8ll', 'id-button-8ll', 'star')
                        .addLink('Link-9', 'name_button-9ll', 'id-button-9ll', 'star')
                        .toHtml()

                    +

                    new HTML.Button('justified', 'ID-BLOCK-JUSTIFIED')
                        .setMargin()
                        .setDisabled(true)
                        .addButton('Название кнопки-4', 'name_button-4', 'id-button-4', 'minus')
                        .addButton('Название кнопки-5', 'name_button-5', 'id-button-5', 'plus')
                        .addButton('Название кнопки-6', 'name_button-6', 'id-button-6', 'star')
                        .setDisabled(false)
                        .addButton('Название кнопки-4/2', 'name_button-4-2', 'id-button-4-2', 'minus')
                        .addButton('Название кнопки-5/2', 'name_button-5-2', 'id-button-5-2', 'plus')
                        .addButton('Название кнопки-6/2', 'name_button-6-2', 'id-button-6-2', 'star')
                        .toHtml()

                    +

                    new HTML.Button('vertical', 'ID-BLOCK-VERTICAL')
                        .setMargin()
                        .addButton('Название кнопки-7', 'name_button-7', 'id-button-7', 'minus')
                        .addButton('Название кнопки-8', 'name_button-8', 'id-button-8', 'plus')

                        .addItem('Item-disable', 'www.google.com', 'star', false, true)
                        .addItem('Item-active', 'www.google.com', 'minus', true)
                        .addDropDown('DropDowns-1', 'ID-DropDowns-1', 'NAME-DropDowns-1', 'star')

                        .addButton('Название кнопки-9', 'name_button-9', 'id-button-9', 'star')
                        .toHtml()

                    +

                    new HTML.Button('vertical', 'ID-BLOCK-VERTICAL')
                        .setMargin()
                        .addButton('Название кнопки-7', 'name_button-7', 'id-button-7', 'minus')
                        .addButton('Название кнопки-8', 'name_button-8', 'id-button-8', 'plus')

                        .addItem('Item-disable', 'www.google.com', 'star', false, true)
                        .addItem('Item-active', 'www.google.com', 'minus', true)
                        .addDropDown('DropDowns-1', 'ID-DropDowns-1', 'NAME-DropDowns-1', 'star')

                        .addButton('Название кнопки-9', 'name_button-9', 'id-button-9', 'star')
                        .toHtml()

                    +

                    new HTML.Button('vertical', 'ID-BLOCK-VERTICAL')
                        .setMargin()
                        .addButton('Название кнопки-7', 'name_button-7', 'id-button-7', 'minus')
                        .addButton('Название кнопки-8', 'name_button-8', 'id-button-8', 'plus')

                        .addItem('Item-disable', 'www.google.com', 'star', false, true)
                        .addItem('Item-active', 'www.google.com', 'minus', true)
                        .addDropDown('DropDowns-1', 'ID-DropDowns-1', 'NAME-DropDowns-1', 'star')

                        .addButton('Название кнопки-9', 'name_button-9', 'id-button-9', 'star')
                        .toHtml()

                    +

                    new HTML.Button('default', 'ID-BLOCK-DEFAULT')
                        .addButton('Название кнопки-10', 'name_button-10', 'id-button-10', 'minus')
                        .addButton('Название кнопки-11', 'name_button-11', 'id-button-11', 'plus')
                        .addButton('Название кнопки-12', 'name_button-12', 'id-button-12', 'star')
                        .toHtml()

                    +

                    new HTML.Button(null, 'ID-BLOCK-DEFAULT-SKIN')
                        .setMargin('sm')
                        .setSize('xs')
                        .setSkin('success')
                        .addButton('Название кнопки-13', 'name_button-13', 'id-button-13', 'minus')
                        .setSkin('warning')
                        .addButton('Название кнопки-14', 'name_button-14', 'id-button-14', 'plus')
                        .setSkin('danger')
                        .addButton('Название кнопки-15', 'name_button-15', 'id-button-15', 'star')
                        .setSkin('info')
                        .addButton('Название кнопки-16', 'name_button-16', 'id-button-16', 'star')
                        .setSkin('default')
                        .addButton('Название кнопки-17', 'name_button-17', 'id-button-17', 'star')
                        .toHtml()

                    +

                    new HTML.Button(null, 'ID-BLOCK-DEFAULT-SKIN-2')
                        .setActive(true)
                        .setMargin('sm')
                        .setSize('xs')
                        .setSkin('success')
                        .addButton('Название кнопки-13', 'name_button-13', 'id-button-13', 'minus')
                        .setSkin('warning')
                        .addButton('Название кнопки-14', 'name_button-14', 'id-button-14', 'plus')
                        .setSkin('danger')
                        .addButton('Название кнопки-15', 'name_button-15', 'id-button-15', 'star')
                        .setSkin('info')
                        .addButton('Название кнопки-16', 'name_button-16', 'id-button-16', 'star')
                        .setSkin('default')
                        .addButton('Название кнопки-17', 'name_button-17', 'id-button-17', 'star')
                        .toHtml()

                    +

                    new HTML.Button(null, 'ID-BLOCK-DEFAULT-SKIN-2')
                        .setActive(true)
                        .setMargin('sm')
                        .setSize('xs')
                        .setSkin('link')
                        .addButton('Название кнопки-18', 'name_button-18', 'id-button-18')
                        .setSkin('link')
                        .addButton('Название кнопки-19', 'name_button-19', 'id-button-19')
                        .setSkin('link')
                        .addButton('Название кнопки-20', 'name_button-20', 'id-button-20')
                        .setSkin('link')
                        .addButton('Название кнопки-21', 'name_button-21', 'id-button-21')
                        .setSkin('link')
                        .addButton('Название кнопки-22', 'name_button-22', 'id-button-22')
                        .toHtml()

                    +

                    new HTML.Button('toolbar')
                        .addItemHeader('Item header', 'star')
                        .addItemSeparator()
                        .addItem('Item-disable', 'www.google.com', 'star', false, true)
                        .addItem('Item-active', 'www.google.com', 'minus', true)
                        .addItem('Item-3', 'www.google.com', 'print')
                        .addItem('Item-4', 'www.google.com', 'plus')
                        .addDropDown('DropDowns-1', 'ID-DropDowns-1', 'NAME-DropDowns-1', 'star')

                        .addItemHeader('Item header', 'star')
                        .addItems(
                            {
                                0: {link: '#', item: 'itemName-1', icon: 'star', active: 's'},
                                1: {link: '#', item: 'itemName-2', icon: 'minus', active: true},
                                2: {link: '#', item: 'itemName-3', icon: 'plus', disable: true}
                            }
                        )
                        .addDropDown('DropDowns-2', 'ID-DropDowns-2', 'NAME-DropDowns-2', 'star')

                        .setSkin('link')
                        .addItem('Item-1', 'www.google.com', 'plus')
                        .addItem('Item-2', 'www.google.com', 'plus')
                        .addItem('Item-3', 'www.google.com', 'plus')
                        .addItem('Item-4', 'www.google.com', 'plus')
                        .addDropDown('DropDowns-3', 'ID-DropDowns-3', 'NAME-DropDowns-3', 'star')
                        .toHtml(),
                    null,
                    'star'
                )
                .addTab(
                    'Panel',
                    new HTML.Panel()
                        .setPadding('sm')
                        .setSkinPanel('primary')
                        .setHeadPanel('title - panel')
                        .setBodyPanel('contemt - panel')
                        .setFootPanel('footer - panel')
                        .toHtml(),
                    null,
                    'star'
                )
                .addTab(
                    'Table',
                    new HTML.Table(null, true, true)
                        .setLinkRow('sdasdasd/asdasd/')
                        .setRowBtnAdd(
                            {
                                0: {
                                    cell_1: new HTML.Table(null, true, true)
                                        .addRow('head')
                                        .addCell('title', 2)
                                        .addRow()
                                        .addCell('asdas')
                                        .addCell('asdas')
                                        .setRowBtnAdd(
                                            {
                                                0: {
                                                    0: 1,
                                                    1: 2
                                                }
                                            }
                                        )
                                        .toHtml(),
                                    cell_2: new HTML.Table(null, true, true)
                                        .addRow('head')
                                        .addCell('title', 2)
                                        .addRow()
                                        .addCell('asdas')
                                        .addCell('asdas')
                                        .setRowBtnAdd(
                                            {
                                                0: {
                                                    0: 3,
                                                    1: 4
                                                }
                                            }
                                        )
                                        .toHtml(),
                                    cell_3: new HTML.Table(null, true, true)
                                        .addRow('head')
                                        .addCell('title', 2)
                                        .addRow()
                                        .addCell('asdas')
                                        .addCell('asdas')
                                        .setRowBtnAdd(
                                            {
                                                0: {
                                                    0: 5,
                                                    1: 6
                                                }
                                            }
                                        )
                                        .toHtml(),
                                    cell_4: new HTML.Table(null, true, true)
                                        .addRow('head')
                                        .addCell('title', 2)
                                        .addRow()
                                        .addCell('asdas')
                                        .addCell('asdas')
                                        .setRowBtnAdd(
                                            {
                                                0: {
                                                    0: 7,
                                                    1: 8
                                                }
                                            }
                                        )
                                        .toHtml(),
                                    cell_5: new HTML.Table(null, true, true)
                                        .addRow('head')
                                        .addCell('title', 2)
                                        .addRow()
                                        .addCell('asdas')
                                        .addCell('asdas')
                                        .setRowBtnAdd(
                                            {
                                                0: {
                                                    0: 9,
                                                    1: 10
                                                }
                                            }
                                        )
                                        .toHtml(),
                                    cell_6: new HTML.Table(null, true, true)
                                        .addRow('head')
                                        .addCell('title', 2)
                                        .addRow()
                                        .addCell('asdas')
                                        .addCell('asdas')
                                        .setRowBtnAdd(
                                            {
                                                0: {
                                                    0: 11,
                                                    1: 12
                                                }
                                            }
                                        )
                                        .toHtml()
                                }
                            }
                        )
                        .setSkinPanel('primary')
                        .setTitleTable('Title table')
                        .setContentBeforeTable('Field search')
                        .addRow('head')
                        .addCell('content', 1, 2)
                        .addCell('content')
                        .addCell('content')
                        .addCell('content')
                        .addCell('content')
                        .addCell('content')
                        .addRow('head')
                        .addCell('content', 5)
                        .addRow()
                        .addCell('content', 6)
                        .addRow()
                        .addCell('content')
                        .addCell('content')
                        .addCell('content')
                        .addCell('content')
                        .addCell('content')
                        .addCell('content')

                        .addDataBody(
                            {
                                0: {
                                    cell_1: '1111',
                                    cell_2: '2222',
                                    cell_3: '3333',
                                    cell_4: '4444',
                                    cell_5: '5555',
                                    cell_6: '6666'
                                },
                                1: {
                                    cell_1: '1111',
                                    cell_2: '2222',
                                    cell_3: '3333',
                                    cell_4: '4444',
                                    cell_5: '5555',
                                    cell_6: '6666'
                                },
                                2: {
                                    cell_1: '1111',
                                    cell_2: '2222',
                                    cell_3: '3333',
                                    cell_4: '4444',
                                    cell_5: '5555',
                                    cell_6: '6666'
                                }
                            }
                        )
                        .setMargin('xs')
                        .setPagination(1, 2, 'http://lib.js/', '?kkk=')
                        .setSkinTable('borderedNone')
                        .toHtml(),
                    null,
                    'star'
                )
                .addTab(
                    'Fields',
                    new HTML.Input(4)
                        .addInput('value', null, 'star', 'success', true)
                        .addInput('value', null, 'minus', 'warning')
                        .addInput('value', null, 'plus', 'error')
                        .addInput('value', null)
                        .addInput('value', null)
                        .addInput('value', null)
                        .addInput('value', null, 'plus', 'success')
                        .addInput('value')
                        .addInput('value')
                        .addInput('value')
                        .addInput('value')
                        .addInput('value')
                        .toHtml()

                    +

                    new HTML.Input(4, 'htmlclass-field', null)
                        .setPlaceholder()
                        .setMargin()
                        .setLineLabel()
                        .addInputLabel('value', 'label', null, 'star')
                        .addInputLabel('value', 'label')
                        .addInputLabel(null, 'label', null, 'star', 'warning', true)
                        .addInputLabel(null, 'label')
                        .addInputLabel('value', 'label', null, 'plus', 'error')
                        .addInputLabel('value', 'label')
                        .addInputLabel(null, 'label')
                        .addInputLabel(null, 'label')
                        .addInputLabel(null, 'label', null, 'minus', 'success')
                        .addInputLabel('value', 'label')
                        .addInputLabel('value', 'label')
                        .addInputLabel(null, 'label')
                        .toHtml()

                    +

                    new HTML.Input(2)
                        .setMargin('sm')
                        .setPlaceholder('Placeholder')
                        .addInputMarker(null, '@', '#', null, 'error', true)
                        .addInputMarker('text', '@', '#')
                        .addInputMarker(null, '@', '#')
                        .addInputMarker('text', '@', '#')
                        .addInputMarker(null, '@', '#', null, 'success')
                        .addInputMarker(null, '@', '#')
                        .addInputMarker('text', '@', '#')
                        .addInputMarker(null, '@', '#')
                        .addInputMarker('text', '@', '#', null, 'warning')
                        .addInputMarker(null, '@', '#')
                        .addInputHidden('=================', '===================')
                        .addInputHidden('=================', '===================')
                        .addInputHidden('=================', '===================')
                        .addInputHidden('=================', '===================')
                        .addInputHidden('=================', '===================')
                        .addInputHidden('=================', '===================')
                        .addInputHidden('=================', '===================')
                        .toHtml()

                    +

                    new HTML.Input(4)
                        .setMargin('sm')
                        .setLineLabel()
                        .addInputRead('label', 'value text - 1', 'name-1', 'readsuccess')
                        .addInputRead('label', 'value text - 2', 'name-2', 'readmuted')
                        .addInputRead('label', 'value text - 3', 'name-3', 'readprimary')
                        .addInputRead('label', 'value text - 4', 'name-4', 'readinfo')
                        .addInputRead('label', 'value text - 5', 'name-5', 'readwarning')
                        .addInputRead('label', 'value text - 6', 'name-6', 'readdanger')
                        .addInputRead('label', 'value text - 6', 'name-6', null)
                        .addInputRead('label', 'value text - 3', 'name-3', 'readprimary')
                        .addInputRead('label', 'value text - 4', 'name-4', 'readinfo')
                        .addInputRead('label', 'value text - 5', 'name-5', 'readwarning')
                        .addInputRead('label', 'value text - 6', 'name-6', 'readdanger')
                        .addInputRead('label', 'value text - 6', 'name-6', null)
                        .toHtml(),
                    null,
                    'star',
                    true
                )
                .addTab(
                    'Fields-dfsdf-asd asas ',
                    'asdasdasd'
                )
                .addTab(
                    'Fields-dfsdf-asd asas ',
                    'asdasdasd'
                )
                .addTab(
                    'Fields-dfsdf-asd asas ',
                    'asdasdasd'
                )
                .appendHtml('#test-tab');

            new HTML.Navbar()
                //Set data for build navbar-menu
                .setDataAjax('./ajax-navbar-top.php')
                //Values default
                .setHomeMenu('home', 'Project name', 'http://lib.js/app/index.php')
                //Add additionally items menu
                .addLeftItem('DropDown', null, 'star', true)
                .addLeftSubItem('Item - 1', '#', 'star')
                .addLeftSubItem('Item - 2', '#', 'star', true)
                .addLeftSubItem('Item - 3', '#', 'star')

                .addLeftItem('Link', '#', 'star', false)

                .setDataLeftMenu(
                    {
                        0: {
                            icon: 'star',
                            name: 'DropDown data',
                            link: '#',
                            active: true,
                            data: {
                                0: {
                                    icon: 'star',
                                    name: 'Item data',
                                    link: '#',
                                    active: false
                                },
                                1: {
                                    icon: 'star',
                                    name: 'Item data',
                                    link: '#',
                                    active: true
                                }
                            }
                        }
                    }
                )
                .setSkinMenu('inverse')
                .setTypeMenu('fixedtop')
                .appendHtml('#navbar-test');
       // });
    </script>
</body>
</html>