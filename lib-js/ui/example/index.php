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
//        console.log(
//            new ui.Element('a')
//                .setTypeElement('email')
//                .setUrlElement('ssssss')
//                .setIdElement('ssssssssssss')
//                .addClassElement('sssssssss')
//                .addClassElement('asdasd')
//                .addClassElement('aaaaaa')
//                .setDisabledElement()
//                .setIconElement('sss')
//                .setSkinElement('field', 'warning')
//                .setSizeElement('input', 'lg')
//                .setTextElement('ssssssssssssssssssssssssssssssss')
//                .addChildBefore(
//                    new ui.Element('li')
//                        .setTextElement('sssssssssssssssssffffffff')
//                        .getElement()
//                )
//                .addChildBefore(
//                    new ui.Element('li')
//                        .setTextElement('sssssssssss')
//                        .getElement()
//                )
//                .addChildAfter(
//                    new ui.Element('li')
//                        .setTextElement('sssssssssss222sssssssssss2')
//                        .getElement()
//                )
//                .addChildAfter(
//                    new ui.Element('li')
//                        .setTextElement('sssssssssss2222')
//                        .getElement()
//                )
//                .appendHTML('#element_append, .element_append')
//                .toHTML()
//        );
    </script>
    </body>
</html>

<?php
