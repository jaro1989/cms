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

    $page = $_POST['page'];

    $data = [];

    $ran = rand(1, 500);

    for ($i = $ran; $i < $ran + 50; $i++) {

        $data[] = [
            'id' => $i * 1456,
            'name2' => 'Тестовые данные -' . $i,
            'name3' => 'Тестовые данные -' . $i . ' - ' . $page,
            'name4' => 'Тестовые данные -' . $i,
            'name5' => 'Тестовые данные -' . $i,
            'name6' => 'Тестовые данные -' . $i . ' - ' . $page
        ];
    }



    echo json_encode(
        [
            'data'     => $data
        ]
    );
}



if (isset($_POST['action']) && $_POST['action'] == '_next_page') {

    $page = $_POST['page'];

    $data = [];

    $ran = rand(1, 500);

    for ($i = $ran; $i < $ran + 50; $i++) {

        $data[] = [
            'id' => $i * 1456,
            'name2' => 'Тестовые данные -' . $i,
            'name3' => 'Тестовые данные -' . $i . ' - ' . $page,
            'name4' => 'Тестовые данные -' . $i,
            'name5' => 'Тестовые данные -' . $i,
            'name6' => 'Тестовые данные -' . $i . ' - ' . $page
        ];
    }



    echo json_encode(
        [
            'data'     => $data
        ]
    );
    //echo true;//'response ajax POST ' . $_POST['action'];
}