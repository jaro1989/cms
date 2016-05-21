<?php
$arr = [
    'brandIcon' => 'home',
    'brandName' => 'My Lib-JS',
    'brandLink' => 'http://lib.js/app/index.php',
    'leftMenu' => [
        [
            'icon' => 'star',
            'name' => 'DropDown ajax',
            'link' => '#',
            'active' => false,
            'data' => [
                [
                    'icon' => 'star',
                    'name' => 'Item ajax',
                    'link' => '#',
                    'active' => false
                ],
                [
                    'icon' => 'star',
                    'name' => 'Item ajax',
                    'link' => '#',
                    'active' => false
                ]
            ]
        ],
        [
            'icon' => 'star',
            'name' => 'Link ajax',
            'link' => '#',
            'active' => false
        ]
    ],
    'rightMenu' => [
        [
            'icon' => 'star',
            'name' => 'DropDown ajax',
            'link' => '#',
            'active' => true,
            'data' => [
                [
                    'icon' => 'star',
                    'name' => 'Item ajax',
                    'link' => '#',
                    'active' => false
                ],
                [
                    'icon' => 'star',
                    'name' => 'Item ajax',
                    'link' => '#',
                    'active' => true
                ]
            ]
        ],
        [
            'name' => 'Link ajax',
            'link' => '#',
        ]
    ]
];

echo json_encode($arr);