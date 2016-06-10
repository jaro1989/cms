<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Example</title>
    <link href="css/bootstrap.css" rel="stylesheet" />
</head>
    <body style="padding-top: 50px;">

    <input list="tri" type="text">
    <datalist id="tri">
        <option>20</option>
        <option>2000</option>
        <option>40</option>
        <option>400</option>
        <option>50</option>
        <option>5000</option>
    </datalist>

        <script src="../ui.Config.js" type="text/javascript"></script>
        <script src="../ui.CSS.js" type="text/javascript"></script>
        <script src="../ui.Lib.js" type="text/javascript"></script>
        <script src="../ui.Element.js" type="text/javascript"></script>
    <script>
        console.log(
            new ui.Element('input')
                .setTypeElement('email')
                .setIdElement('ssssssssssss')
                .addClassElement('sssssssss')
                .addClassElement('asdasd')
                .addClassElement('aaaaaa')
                .setDisabledElement()
                .setIconElement('sss')
                .setSkinElement('field', 'warning')
                .setSizeElement('input', 'lg')
//                .addElementAfter()
            .element
        );
    </script>
    </body>
</html>

<?php
