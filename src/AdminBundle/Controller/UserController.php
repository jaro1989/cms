<?php

namespace AdminBundle\Controller;

use AdminBundle\Entity\User;
use AdminBundle\Entity\Role;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
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

        $currentUser = $this->getUser();
        $listRoles = [];

        if (method_exists($currentUser, 'getId') && $currentUser->getId() == $record) {

            foreach ($currentUser->getRoles() as $role) {

                $listRoles[$role->getId()] = $role->getName();
            }
        } else {

            $listRoles = $em->getRepository('AdminBundle:Role')->findListRolesName();
        }

        return $this->render(
            'AdminBundle:user:create.html.twig',
            [
                'data'   => $em->getRepository($this->repository)->findOneUser($record),
                'list_roles'  => $listRoles
            ]
        );
    }

    /**
     * @param Request $request
     * @param string $type 'list'|'trash'
     * @param int $page
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function listAction(Request $request, $type = 'list', $page = 1)
    {
        $em = $this->getDoctrine()->getManager();
        $listUsers = $em->getRepository($this->repository)->findListUser($page, [], $type == 'list' ? 0 : 1);

        return $this->render(
            'AdminBundle:user:' . $type . '.html.twig',
            [
                'data'  => $listUsers['list'],
                'count_page' => $listUsers['count_page'],
                'current_page' => $page
            ]
        );
    }

    /**
     * @param Request $request
     * @param string $type 'list'|'trash'
     * @param int $page
     * @return JsonResponse
     * @throws \Exception
     */
    public function switchListAction(Request $request, $type = 'list')
    {
        $response = new JsonResponse();
        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->request->get('data'), true);
        $search = [];
        # $data['action'] - search|pagination
        if (isset($data['search'])) {

            $search = $data['search'];
        }

        $page = isset($data['page']) ? $data['page'] : 1;
        $listUsers = $em->getRepository($this->repository)->findListUser($page, $search, $type == 'list' ? 0 : 1);

        return $response->setData(
            [
                'data' => $listUsers['list'],
                'count_page' => $listUsers['count_page']
            ]
        );
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function trashAction(Request $request)
    {
        $response = new JsonResponse();
        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->request->get('data'), true);

        if (!empty($data['id']) && $data['action'] == 'remove') {

            foreach ($data['id'] as $record) {

                $user = $em->getRepository('AdminBundle:User')->find($record);
                $user->setDeleted();
                $user->setIsActive(false);
                $em->flush();
            }
        }

        $listUsers = $em->getRepository($this->repository)->findListUser($data['page']);

        return $response->setData(
            [
                'data'  => $listUsers['list'],
                'count_page' => $listUsers['count_page']
            ]
        );
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function removeAction(Request $request)
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

        $res = ['error' => null];

        if (isset($data['page'])) {

            $listUsers = $em->getRepository($this->repository)->findListUser($data['page'], [], 1);
            $res['data'] = $listUsers['list'];
            $res['count_page'] = $listUsers['count_page'];
        }

        return $response->setData($res);
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
        $record = empty($data['id']) ? 0 : $data['id'];
        $res = [];

        $user = $em->getRepository('AdminBundle:User')->find($record);
        $user ? $user : $user = new User();

        $user
            ->setUsername($data['username'])
            ->setEmail($data['email'])
            ->setIsActive($data['isActive'])
            ->setDeleted($data['deleted']);

        if (!empty($data['password'])) {

            $encoder = $this->get('security.password_encoder');

            $user
                ->setPassword($encoder->encodePassword($user, $data['password']))
                ->setOriginPassword($data['password'])
                ->setConfirmPassword($data['confirmPassword']);
        }

        $user->addRole($em->getRepository('AdminBundle:Role')
            ->find($data['role_id']));
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
