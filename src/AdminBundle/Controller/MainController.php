<?php

namespace AdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class MainController extends Controller
{
    public function indexAction(Request $request)
    {

        return $this->render(
            'AdminBundle:main:index.html.php',
            [
                'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..'),
            ]
        );
    }
}
