<?php
$page = isset($_GET['page']) ? $_GET['page'] : null;
$url = 'http://symfony.cms/lib-js/ui/example/?page=';
$pare = [
    'ffText'     => 'Текстовые поля',
    'ffRadio'    => 'Radio кнопки',
    'ffCheckbox' => 'Checkbox кнопки'
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



    <div class="has-warning col-md-3">
        <div class="checkbox checkbox-inline">
            <div class="checkbox">
                <label>
                    <input type="checkbox"  name="checkbox-1" > Запомнить меня
                </label>
                <label>
                    <input type="checkbox" name="checkbox-2"> Запомнить меня
                </label>
                <label>
                    <input type="checkbox" name="checkbox-3"> Запомнить меня
                </label>
                <label>
                    <input type="checkbox" name="checkbox-4"> Запомнить меня
                </label>
                <label>
                    <input type="checkbox" name="checkbox-5"> Запомнить меня
                </label>
                <label>
                    <input type="checkbox" name="checkbox-6"> Запомнить меня
                </label>
            </div>
        </div>
    </div>

    <div class="has-warning col-md-3">
        <div class="checkbox checkbox-inline">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="checkbox-7"> Запомнить меня
                </label>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="checkbox-8"> Запомнить меня
                </label>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="checkbox-9"> Запомнить меня
                </label>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="checkbox-10"> Запомнить меня
                </label>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="checkbox-11"> Запомнить меня
                </label>
            </div>
        </div>
    </div>

    <div class="has-warning col-md-3">
        <div class="radio radio-inline">
            <div class="radio">
                <label>
                    <input type="radio" name="radio-2"> Запомнить меня
                </label>
                <label>
                    <input type="radio" name="radio-2"> Запомнить меня
                </label>
                <label>
                    <input type="radio" name="radio-2"> Запомнить меня
                </label>
                <label>
                    <input type="radio" name="radio-2"> Запомнить меня
                </label>
                <label>
                    <input type="radio" name="radio-2"> Запомнить меня
                </label>
                <label>
                    <input type="radio" name="radio-2"> Запомнить меня
                </label>
            </div>
        </div>
    </div>


    <div class="has-warning col-md-3">
        <div class="radio radio-inline">
            <div class="radio">
                <label>
                    <input type="radio" name="radio-1"> Запомнить меня
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="radio-1"> Запомнить меня
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="radio-1"> Запомнить меня
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="radio-1"> Запомнить меня
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="radio-1"> Запомнить меня
                </label>
            </div>
        </div>
    </div>



    <script src="../ui.Config.js" type="text/javascript"></script>
    <script src="../ui.CSS.js" type="text/javascript"></script>
    <script src="../ui.api.js" type="text/javascript"></script>
    <script src="../ui.Element.js" type="text/javascript"></script>
    <script src="../ui.FFText.js" type="text/javascript"></script>
    <script src="../ui.FFRadio.js" type="text/javascript"></script>


    <?php
    if (file_exists($page . '.example.js')) {
        echo '<script src="' . $page . '.example.js' . '" type="text/javascript"></script>';
    }
    ?>

    <script>

    </script>
    </body>
</html>

<?php
