<?php

namespace AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{
    public function createAction(Request $request)
    {
        return $this->render(
            'AdminBundle:user:create.html.twig',
            [
                //'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..'),
            ]
        );
    }

    public function listAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery("
            SELECT u.username,
                   u.email,
                   u.isActive
              FROM AdminBundle:User u
        ");

        return $this->render(
            'AdminBundle:user:list.html.twig',
            [
                'data' =>  $query->getResult()
            ]
        );
    }

    public function trashAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery("
            SELECT u.username,
                   u.email,
                   u.isActive
              FROM AdminBundle:User u
        ");

        return $this->render(
            'AdminBundle:user:trash.html.twig',
            [
                'data' =>  $query->getResult()
            ]
        );
    }

    public function deleteAction(Request $request)
    {
        var_dump('delete');
    }

    public function saveAction(Request $request)
    {
        var_dump('save');
    }
}
