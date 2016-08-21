<?php

if (isset($_GET['action'])) {

    echo 'response ajax GET ' . $_GET['action'];
}

if (isset($_POST['action'])) {

    echo 'response ajax POST ' . $_POST['action'];
}