<?php

namespace AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
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
        return $this->render(
            'AdminBundle:user:list.html.twig',
            [
                //'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..'),
            ]
        );
    }

    public function trashAction(Request $request)
    {
        return $this->render(
            'AdminBundle:user:trash.html.twig',
            [
                //'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..'),
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
