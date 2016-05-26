<?php
namespace Admin\Home\Controller;

use Admin\Home\Entity\Users;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGenerator;


class UserController extends Controller{

    /**
     * Page edit user
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function formAction(Request $request)
    {
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

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('AdminHome:Users')->find($request->get('record'));

        $serializer = $this->get('serializer');

        if (empty($user)) {
            $action = '_user_save';
        } else {
            $action = '_user_update';
        }

        return $this->render(
            'AdminHome:user:edit.html.twig',
            [
                'vlt' => $vlt,
                'role' => $role,
                'status' => $status,
                'formatDate' => $formatDate,
                'action' => $this->generateUrl($action, ['record' => $request->get('record')]),
                'userData' => $serializer->serialize($user, 'json')
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
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function saveAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $user = new Users();

        foreach($request->request->all() as $key => $value){

            $method = 'set' . str_replace('_', '', $key);
            if (method_exists($user, $method)) {
                $user->$method($value);
            }
        }

        $em->persist($user);
        $em->flush();

        return $this->redirect(
            $this->generateUrl(
                '_user_form',
                ['record' => $user->getId() === null ? -1 : $user->getId()]
            )
        );

        //Example matadata
        //$metadata = $em->getClassMetadata('Admin\Home\Entity\Users');
        //var_dump($metadata->getFieldNames());
        //var_dump($metadata->getTypeOfField('id'));
        //var_dump($metadata->isIdentifier('id'));
        //var_dump($metadata->getIdentifierFieldNames());
        //var_dump($metadata->fieldMappings);
        //var_dump($metadata->table);
    }

    /**
     * Update record
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function updateAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('AdminHome:Users')->find($request->get('record'));

        foreach($request->request->all() as $key => $value) {

            $method = 'set' . str_replace('_', '', $key);
            if (method_exists($user, $method)) {
                $user->$method($value);
            }
        }
        $em->flush();

        return $this->redirect(
            $this->generateUrl(
                '_user_form',
                ['record' => $user === null ? $request->get('record') : $user->getId()]
            )
        );
    }

}