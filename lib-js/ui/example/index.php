<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Example</title>
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css"/>
</head>
    <body style="padding-top: 50px;">

    <div id="element_append"></div>



    <script src="../ui.Config.js" type="text/javascript"></script>
    <script src="../ui.CSS.js" type="text/javascript"></script>
    <script src="../ui.api.js" type="text/javascript"></script>
    <script src="../ui.Element.js" type="text/javascript"></script>
    <script src="../ui.FFText.js" type="text/javascript"></script>


    <?php
    if (isset($_GET['page']) && file_exists($_GET['page'] . '.example.js')) {
        echo '<script src="' . $_GET['page'] . '.example.js' . '" type="text/javascript"></script>';
    }
    ?>

    <script>

    </script>
    </body>
</html>

<?php
