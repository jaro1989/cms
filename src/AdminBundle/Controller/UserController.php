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
var_dump($em->getRepository($this->repository)->findListUser(1));
        return $this->render(
            'AdminBundle:user:create.html.twig',
            [
                'user_data'  => $em->getRepository($this->repository)->findOneUser($record),
                'list_roles'  => $em->getRepository('AdminBundle:Role')->findNamesRole()
            ]
        );
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function listAction(Request $request, $page = 1)
    {
        $em = $this->getDoctrine()->getManager();
        $listUsers = $em->getRepository($this->repository)->findListUser($page);

        return $this->render(
            'AdminBundle:user:list.html.twig',
            [
                'data'  => $listUsers['list'],
                'count_page' => $listUsers['count_page'],
                'current_page' => $page
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
        $listUsers = $em->getRepository($this->repository)->findListUser($page, 1);

        return $this->render(
            'AdminBundle:user:trash.html.twig',
            [
                'data'  => $listUsers['list'],
                'count_page' => $listUsers['count_page'],
                'current_page' => $page
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
        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->request->get('data'), true);

        if (!empty($data['id']) && $data['action'] == 'remove') {

            foreach ($data['id'] as $record) {

                $user = $em->getRepository('AdminBundle:User')->find($record);
                $em->remove($user);
                $em->flush();
            }
        }

        $listUsers = $em->getRepository($this->repository)->findListUser($data['page']);

        return $response->setData(
            [
                'data'  => $listUsers['list'],
                'countPages' => $listUsers['count_page']
            ]
        );
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function saveAction(Request $request)
    {
        $response = new JsonResponse();
        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->request->get('data'), true);
        $res = [];

        $user = $em->getRepository('AdminBundle:User')->find($data['id']);
        !$user ? $user = new User() : null;

        $encoder = $this->get('security.password_encoder');

        $user
            ->setUsername($data['username'])
            ->setEmail($data['email'])
            ->setIsActive($data['isActive']);

        if (!empty($data['password'])) {

            $user
                ->setPassword($encoder->encodePassword($user, $data['password']))
                ->setOriginPassword($data['password'])
                ->setConfirmPassword($data['confirmPassword']);
        }

        $user->addRole($em->getRepository('AdminBundle:Role')->find($data['role_id']));
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
