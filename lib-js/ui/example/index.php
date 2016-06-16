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

        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">

            <ul class="nav navbar-nav">
                <?php
                    foreach ($pare as $key => $value) {

                        $active = '';
                        if ($key === $page) $active = 'active';
                        echo '<li class="' . $active . '"><a href="' . $url . $key . '">' . $value . '</a></li>';
                    }
                ?>
            </ul>

        </nav>

    <div id="element_append" class="container col-md-12 well-lg"></div>


    <script src="../ui.Config.js" type="text/javascript"></script>
    <script src="../ui.CSS.js" type="text/javascript"></script>
    <script src="../ui.api.js" type="text/javascript"></script>
    <script src="../ui.Element.js" type="text/javascript"></script>
    <script src="../ui.FFText.js" type="text/javascript"></script>
    <script src="../ui.FFRadio.js" type="text/javascript"></script>
    <script src="../ui.FFCheckbox.js" type="text/javascript"></script>
    <script src="../ui.FFTextarea.js" type="text/javascript"></script>
    <script src="../ui.FFPassword.js" type="text/javascript"></script>
    <script src="../ui.FFSelect.js" type="text/javascript"></script>
    <script src="../ui.FFButton.js" type="text/javascript"></script>
    <script src="../ui.FFDate.js" type="text/javascript"></script>


    <?php
    if (file_exists($page . '.example.js')) {
        echo '<script src="' . $page . '.example.js' . '" type="text/javascript"></script>';
    }
    ?>
    </body>
</html>