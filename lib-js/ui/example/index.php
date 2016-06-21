<?php
$page = isset($_GET['page']) ? $_GET['page'] : null;
$url = 'http://symfony.cms/lib-js/ui/example/?page=';
$pare = [
    'ffText'     => 'Текстовые поля',
    'ffRadio'    => 'Radio кнопки',
    'ffCheckbox' => 'Checkbox кнопки',
    'ffTextarea' => 'Textarea',
    'ffPassword' => 'Поле пароль',
    'ffSelect'   => 'Select list',
    'ffButton'   => 'Кнопки',
    'ffDate'     => 'Поле дата'
];
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Example</title>
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css"/>
</head>
    <body style="padding-top: 50px;">

    <div id="navbar"></div>
    <div id="element_append" class="container col-md-12 well-lg"></div>
    <div class="clearfix"></div>
    <div id="calendar-test"></div>


    <script src="../ui.Config.js" type="text/javascript"></script>
    <script src="../ui.FormatDate.js" type="text/javascript"></script>
    <script src="../ui.CSS.js" type="text/javascript"></script>
    <script src="../ui.api.js" type="text/javascript"></script>
    <script src="../ui.Element.js" type="text/javascript"></script>
    <script src="../ui.Calendar.js" type="text/javascript"></script>
    <script src="../ui.FFText.js" type="text/javascript"></script>
    <script src="../ui.FFRadio.js" type="text/javascript"></script>
    <script src="../ui.FFCheckbox.js" type="text/javascript"></script>
    <script src="../ui.FFTextarea.js" type="text/javascript"></script>
    <script src="../ui.FFPassword.js" type="text/javascript"></script>
    <script src="../ui.FFSelect.js" type="text/javascript"></script>
    <script src="../ui.FFButton.js" type="text/javascript"></script>
    <script src="../ui.FFDate.js" type="text/javascript"></script>

    <script>
        var key_page = 'page';
        var page = ui.api.getParams(key_page);
        var url = window.location.pathname + '?' + key_page + '=';
        var pages = {
            'ffText':      'Текстовые поля',
            'ffRadio':     'Radio кнопки',
            'ffCheckbox':  'Checkbox кнопки',
            'ffTextarea':  'Textarea',
            'ffPassword':  'Поле пароль',
            'ffSelect':    'Select list',
            'ffButton':    'Кнопки',
            'ffDate':      'Поле дата'
        };

        var ulElement = new ui.Element('ul')
            .addClassElement('nav')
            .addClassElement('navbar-nav');

        for (page_key in pages) {

            var html_class_li = (page_key == page) ? 'active' : null;

            ulElement.addChildAfter(
                new ui.Element('li')
                    .addClassElement(html_class_li)
                    .addChildAfter(
                        new ui.Element('a')
                            .setUrlElement(url + page_key)
                            .setContentElement(pages[page_key])
                            .getElement()
                    )
                    .getElement()
            )
        }

        new ui.Element('nav')
            .addClassElement('navbar')
            .addClassElement('navbar-inverse')
            .addClassElement('navbar-fixed-top')
            .addChildAfter(ulElement.getElement())
            .appendHTML('#navbar');
    </script>

    <?php
    if (file_exists($page . '.example.js')) {
        echo '<script src="' . $page . '.example.js' . '" type="text/javascript"></script>';
    }
    ?>
            <script>
                new ui.Calendar()
                    .appendHTML('#calendar-test')

            </script>
    </body>
</html>