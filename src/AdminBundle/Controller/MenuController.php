<?php

namespace AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class MenuController extends Controller
{
    public function leftviewAction(Request $request)
    {
        /** @var $router \Symfony\Component\Routing\Router */
        $router = $this->container->get('router');
        /** @var $collection \Symfony\Component\Routing\RouteCollection */
        $collection = $router->getRouteCollection();
        $allRoutes = $collection->all();

        $menu = [];

        foreach ($allRoutes as $key => $params) {

            if (strripos($key, '_admin') === 0) {

                $menu[$key] =  $this->generateUrl($key);
            }
        }

        $stack = $this->get('request_stack');
        $masterRequest = $stack->getMasterRequest();

        return $this->render(
            'AdminBundle:menu:leftview.html.twig',
            [
                'menu' => $menu,
                'current_route' => $masterRequest->get('_route')
            ]
        );
    }

    public function topviewAction(Request $request)
    {
        return $this->render(
            'AdminBundle:menu:topview.html.twig',
            [
                //'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..'),
            ]
        );
    }
}
