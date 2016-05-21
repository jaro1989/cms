<?php
namespace Admin\Home\Controller;

//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class NavbarController extends Controller{

    public function topAction(Request $request)
    {
        // AdminMainBundle:Main:main.html.twig
        //return $this->render('AdminHome:navbar:top.html.twig', []);
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
        return new JsonResponse($arr);
    }

}