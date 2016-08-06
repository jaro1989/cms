<?php

if (isset($_POST['action']) && $_POST['action'] == 'save') {

    echo 'response ajax POST - ' . $_POST['action'];
}

if (isset($_POST['action']) && $_POST['action'] == 'edit') {

    echo 'response ajax POST - ' . $_POST['action'];
}

if (isset($_POST['action']) && $_POST['action'] == 'remove') {

    echo 'response ajax POST ' . $_POST['action'];
}

if (isset($_POST['action']) && $_POST['action'] == '_remove_list') {

    echo json_encode(['response' => 1]);
    //echo true;//'response ajax POST ' . $_POST['action'];
}

//echo json_encode($_POST);