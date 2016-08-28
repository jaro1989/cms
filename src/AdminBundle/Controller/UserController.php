<?php

namespace AdminBundle\Controller;

use AdminBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
//use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{
    public function createAction(Request $request, $record)
    {
        $em = $this->getDoctrine()
            ->getManager();

        $query = $em->createQuery("
            SELECT u.id,
                   u.username,
                   u.email,
                   u.isActive
              FROM AdminBundle:User u
             WHERE u.id = :id
        ")->setParameter('id', $record);

        return $this->render(
            'AdminBundle:user:create.html.twig',
            [
                'data' => $query->setMaxResults(1)->getOneOrNullResult()
            ]
        );
    }

    public function listAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery("
            SELECT u.id,
                   u.username,
                   u.email,
                   u.isActive
              FROM AdminBundle:User u
        ");

        return $this->render(
            'AdminBundle:user:list.html.twig',
            [
                'data' => $query->getResult()
            ]
        );
    }

    public function trashAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery("
            SELECT u.id,
                   u.username,
                   u.email,
                   u.isActive
              FROM AdminBundle:User u
        ");

        return $this->render(
            'AdminBundle:user:trash.html.twig',
            [
                'data' => $query->getResult()
            ]
        );
    }

    public function deleteAction(Request $request)
    {
        $response = new JsonResponse();

        return $response->setData(array(
            'data' => 123
        ));

        var_dump('delete');
    }

    public function saveAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $response = new JsonResponse();
        $data = $request->request;

        $res = [
            'record' => null,
            'error' => null
        ];

        if ($data->get('action') == 'save') {

            $user = new User();

            $user
                ->setUsername($data->get('username'))
                ->setEmail($data->get('email'))
                ->setIsActive($data->get('isActive'))
                ->setPassword($data->get('password'));

            try {

                $em->persist($user);
                $em->flush();

                $res['record'] = $user->getId();

            } catch (\Exception $e) {

                $res['error'] = $e->getMessage();
            }
        }

        if ($data->get('action') == 'edit') {

            $user = $em->getRepository('AdminBundle:User')
                ->find($data->get('id'));

            if ($user) {

                $user
                    ->setUsername($data->get('username'))
                    ->setEmail($data->get('email'))
                    ->setIsActive($data->get('isActive'))
                    ->setPassword($data->get('password'));
            }

            $em->flush();

            $res['record'] = $user->getId();
        }

        return $response->setData($res);
    }
}
