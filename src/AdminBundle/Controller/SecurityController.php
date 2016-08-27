<?php

namespace AdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class SecurityController extends Controller
{
    public function loginAction(Request $request)
    {
        if ($this->getUser()) {

            return $this->redirect($this->generateUrl('_admin'));
        }

        $authenticationUtils = $this->get('security.authentication_utils');

        return $this->render(
            'AdminBundle:security:login.html.twig',
            [
                'error' => $authenticationUtils->getLastAuthenticationError(),
                'username' => $authenticationUtils->getLastUsername()
            ]
        );
    }
}