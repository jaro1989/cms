<?php
namespace Admin\Home\Controller;

use Admin\Home\Entity\Users;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller{

    /**
     * Page edit user
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function editAction(Request $request)
    {
        $request->get('record');
        $role = [
            'ROLE_ADMIN' => 'Администратор',
            'ROLE_USER' => 'Пользователь',
            'ROLE_REDACTOR' => 'Редактор',
        ];
        return $this->render('AdminHome:user:edit.html.twig', ['role' => $role]);
    }

    /**
     * List users
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
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

    /**
     * Save new record
     * @param Request $request
     * @return int
     */
    public function saveAction(Request $request)
    {
        $users = new Users();
        $users->setCmsEmail('1xvx1@mail.ru')
            ->setCmsLogin('admin')
            ->setFirstName('Киселев')
            ->setLastName('Валерий');

        $em = $this
                ->getDoctrine()
                ->getManager();

        $em->persist($users);
        $em->flush();

        return $users->getId();
    }

    /**
     * Update record
     * @param Request $request
     */
    public function updateAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository('AdminHome:Users')->find(1);
        $users->setFirstName('Киселев');
        $em->flush();
        return $users->getId();
    }

}