<?php

if (isset($_POST['action']) && $_POST['action'] == 'save') {

    echo 'response ajax POST - ' . $_POST['action'];
}

if (isset($_POST['action']) && $_POST['action'] == 'edit') {

    echo 'response ajax POST - ' . $_POST['action'];
}

if (isset($_POST['action']) && $_POST['action'] == 'remove') {

    $page = $_POST['page'];

    $data = [];

    $ran = rand(1, 500);

    for ($i = $ran; $i < $ran + 50; $i++) {

        $data[] = [
            'id' => $i * 1456,
            'name2' => generatePassword() . ' -' . $i,
            'name3' => generatePassword() . ' -' . $i . ' - ' . $page,
            'name4' => generatePassword() . ' -' . $i,
            'name5' => '/web/apple-touch-icon.png',
            'name6' => generatePassword() . ' -' . $i . ' - ' . $page
        ];
    }



    echo json_encode(
        [
            'data'     => $data,
            'countPages' => rand(1, 50)
        ]
    );
}

if (isset($_POST['action']) && $_POST['action'] == 'search') {

    $data = [];

    $ran = rand(1, 500);

    for ($i = $ran; $i < $ran + 50; $i++) {

        $data[] = [
            'id' => $i * 1456,
            'name2' => generatePassword() . ' -' . $i,
            'name3' => generatePassword() . ' -' . $i . ' - ' . $page,
            'name4' => generatePassword() . ' -' . $i,
            'name5' => null,
            'name6' => generatePassword() . ' -' . $i . ' - ' . $page
        ];
    }

    echo json_encode(['data' => $data, 'countPages' => rand(1, 50)]);
}



if (isset($_POST['action']) && $_POST['action'] == 'pagination') {

    $page = $_POST['page'];

    $data = [];

    $ran = rand(1, 500);

    for ($i = $ran; $i < $ran + 50; $i++) {

        $data[] = [
            'id' => $i * 1456,
            'name2' => generatePassword() . ' -' . $i,
            'name3' => generatePassword() . ' -' . $i . ' - ' . $page,
            'name4' => generatePassword() . ' -' . $i,
            'name5' => null,
            'name6' => generatePassword() . ' -' . $i . ' - ' . $page
        ];
    }

    echo json_encode($data);
}

if (isset($_POST['action']) && ($_POST['action'] == 'removeParent' || $_POST['action'] == 'removeChildren')) {

    echo 1;
}

function generatePassword($length = 8){
    $chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
    $numChars = strlen($chars);
    $string = '';
    for ($i = 0; $i < $length; $i++) {
        $string .= substr($chars, rand(1, $numChars) - 1, 1);
    }
    return $string;
}