<?php

namespace AdminBundle\Controller;

use AdminBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
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

        if ($data->get('action') == 'save') {

            $user = new User();

            $user
                ->setUsername($data->get('username'))
                ->setEmail($data->get('email'))
                ->setIsActive($data->get('isActive'))
                ->setPassword($data->get('password'));

            $em->persist($user);
            $em->flush();

            $res = [
                'record' => $user->getId(),
                'error' => null
            ];
        }

        if ($request->request->get('action') == 'edit') {

            return $response->setData(array(
                'data' => $request->request->get('action')
            ));
        }

        return $response->setData($res);
    }
}
