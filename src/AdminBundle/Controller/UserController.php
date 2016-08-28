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
    protected $repository = 'AdminBundle:User';

    public function createAction(Request $request, $record)
    {
        $em = $this->getDoctrine()->getManager();

        return $this->render(
            'AdminBundle:user:create.html.twig',
            [
                'data' => $em->getRepository($this->repository)->findOneUser($record)
            ]
        );
    }

    public function listAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        return $this->render(
            'AdminBundle:user:list.html.twig',
            [
                'data' => $em->getRepository($this->repository)->findListUser()
            ]
        );
    }

    public function trashAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        return $this->render(
            'AdminBundle:user:trash.html.twig',
            [
                'data' => $em->getRepository($this->repository)->findListUser()
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

        $res = [];

        $unique = $em->getRepository($this->repository)->findUniqueUser($data->get('username'), $data->get('email'), $data->get('id'));

        if (empty($unique)) {

            $user = $em->getRepository('AdminBundle:User')
                ->find($data->get('id'));


            !$user ? $user = new User() : null;

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
        } else {

            $res['error'] = 'В системе пользователь с такими данными уже существует';
        }

        return $response->setData($res);
    }
}
