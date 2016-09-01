<?php

namespace AdminBundle\Controller;

use AdminBundle\Entity\User;
use AdminBundle\Entity\Role;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
//use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{
    protected $repository = 'AdminBundle:User';

    /**
     * @param Request $request
     * @param int $record
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function createAction(Request $request, $record)
    {
        $em = $this->getDoctrine()->getManager();

        return $this->render(
            'AdminBundle:user:create.html.twig',
            [
                'data' => $em->getRepository($this->repository)->findOneUser($record),
                'roles' => $em->getRepository('AdminBundle:Role')->findNamesRole()
            ]
        );
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
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

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function trashAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        return $this->render(
            'AdminBundle:user:trash.html.twig',
            [
                'data' => $em->getRepository($this->repository)->findListUser(1)
            ]
        );
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function deleteAction(Request $request)
    {
        $response = new JsonResponse();

        return $response->setData(array(
            'data' => 123
        ));

        var_dump('delete');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function saveAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $response = new JsonResponse();
        $data = $request->request;
        $res = [];

        $user = $em->getRepository('AdminBundle:User')
            ->find($data->get('id'));

        !$user ? $user = new User() : null;

        $role = $em->getRepository('AdminBundle:Role')
            ->find($data->get('role_id'));

        $encoder = $this->container->get('security.password_encoder');

        $user
            ->setUsername($data->get('username'))
            ->setEmail($data->get('email'))
            ->setIsActive($data->get('isActive'))
//            ->setPassword($encoder->encodePassword($user, $data->get('password')))
            ->setPassword($data->get('password'))
            ->setConfirmPassword($data->get('confirmPassword'))
            ->setRole($role);


        $validator = $this->get('validator');
        $errors = $validator->validate($user);

        if ($errors->count() > 0) {

            $error = '';

            for ($i = 0; $i < $errors->count(); $i++) {

                $property = $errors->get($i)->getPropertyPath();
                $error .= $property . ': ' . $errors->get($i)->getMessage() . "\n";
            }

            return $response->setData(['error' => $error]);
        }

        try {

            $em->persist($user);
            $em->flush();

            $res['record'] = $user->getId();

        } catch (\Exception $e) {

            $res['error'] = $e->getMessage();
        }

        return $response->setData($res);
    }
}
