<?php
namespace Admin\Home\Controller;

use Admin\Home\Entity\Users;
use Doctrine\ORM\Mapping\ClassMetadataInfo;
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
        $action = '_user_update';
        if ($request->get('record') == -1) {
            $action = '_user_save';
        }
        $role = [
            'ROLE_ADMIN' => 'Администратор',
            'ROLE_USER' => 'Пользователь',
            'ROLE_REDACTOR' => 'Редактор',
        ];

        $formatDate = [
            'DD.MM.YYYY',
            'DD-MM-YYYY',
            'DD.MM.YYYY H24.MI.SS',
            'DD-MM-YYYY H24-MI-SS'
        ];
        $status = [
            'Астывный',
            'Заблокированный',
            'Ожидает активацию',
        ];

        $vlt = [
            'USD',
            'EURO',
            'RU',
        ];

        return $this->render(
            'AdminHome:user:edit.html.twig',
            [
                'vlt' => $vlt,
                'role' => $role,
                'status' => $status,
                'formatDate' => $formatDate,
                'action' => $this->generateUrl($action)
            ]
        );
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

        foreach($request->request->all() as $key => $value){

            $method = 'set' . str_replace('_', '', $key);

            if (method_exists($users, $method)) {
                $users->$method($value);
            }
        }

        $em = $this->getDoctrine()->getManager();

        //$em->persist($users);
        //$em->flush();
//        var_dump($users->getId());










        $metadata = $em->getClassMetadata('Admin\Home\Entity\Users');


        //var_dump($metadata->getFieldNames());
        //var_dump($metadata->getTypeOfField('id'));
        //var_dump($metadata->isIdentifier('id'));
        //var_dump($metadata->getIdentifierFieldNames());
        //var_dump($metadata->fieldMappings);
        //var_dump($metadata->table);


    }

    /**
     * Update record
     * @param Request $request
     */
    public function updateAction(Request $request)
    {
        var_dump($request);
//        $em = $this->getDoctrine()->getManager();
//        $users = $em->getRepository('AdminHome:Users')->find(1);
//        $users->setFirstName('Киселев');
//        $em->flush();
//        return $users->getId();
    }

}