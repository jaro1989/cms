<?php
namespace Admin\Home\Controller;

//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

    class HomeController extends Controller{

        public function indexAction(Request $request)
        {
            // AdminMainBundle:Main:main.html.twig
            return $this->render('AdminHome:home:index.html.twig', []);
        }

    }