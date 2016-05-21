<?php
namespace Admin\Home\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller{

    public function editAction(Request $request)
    {
        return $this->render('AdminHome:user:edit.html.twig', []);
    }

    public function listAction(Request $request)
    {
        $data['title'] = 'Список пользователей';
        $data['head'] = ['ФИО', 'Username', 'Email', 'Password'];
        $data['body'] = [
            '1s' => [
                '2sd' => '111',
                1 => '111',
                2 => '111',
                3 => '111'
            ],
            1 => [
                0 => '111',
                1 => '111',
                2 => '111',
                3 => '111'
            ],
            2 => [
                0 => '111',
                1 => '111',
                2 => '111',
                3 => '111'
            ],
            3 => [
                0 => '111',
                1 => '111',
                2 => '111',
                3 => '111'
            ],
            4 => [
                0 => '111',
                1 => '111',
                2 => '111',
                3 => '111'
            ],
            5 => [
                0 => '111',
                1 => '111',
                2 => '111',
                3 => '111'
            ],
            6 => [
                0 => '111',
                1 => '111',
                2 => '111',
                3 => '111'
            ],
            7 => [
                0 => '111',
                1 => '111',
                2 => '111',
                3 => '111'
            ],
            8 => [
                0 => '111',
                1 => '111',
                2 => '111',
                3 => '111'
            ],
            9 => [
                0 => '111',
                1 => '111',
                2 => '111',
                3 => '111'
            ],
            10 => [
                0 => '111',
                1 => '111',
                2 => '111',
                3 => '111'
            ]
        ];
        $data['pagination'] = [
            'currentPage' => $request->get('page'),
            'countPage' => 30
        ];
        return $this->render('AdminHome:user:list.html.twig', $data);
    }

}