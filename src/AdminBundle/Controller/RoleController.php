<?php

namespace AdminBundle\Controller;

use AdminBundle\Entity\User;
use AdminBundle\Entity\Role;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class RoleController extends Controller
{
    protected $repository = 'AdminBundle:Role';

    /**
     * @param Request $request
     * @param int $record
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function createAction(Request $request, $record)
    {
        $em = $this->getDoctrine()->getManager();

        return $this->render(
            'AdminBundle:role:create.html.twig',
            [
                'data' => $em->getRepository($this->repository)->findOneRole($record)
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
        $listRoles = $em->getRepository($this->repository)->findListRoles($page, [], $type == 'list' ? 0 : 1);

        return $this->render(
            'AdminBundle:role:' . $type . '.html.twig',
            [
                'data'  => $listRoles['list'],
                'count_page' => $listRoles['count_page'],
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
        $listUsers = $em->getRepository($this->repository)->findListRoles($page, $search, $type == 'list' ? 0 : 1);

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

                $user = $em->getRepository($this->repository)->find($record);
                $user->setDeleted();
                $em->flush();
            }
        }

        $listUsers = $em->getRepository($this->repository)->findListRoles($data['page']);

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

                $user = $em->getRepository($this->repository)->find($record);
                $em->remove($user);
                $em->flush();
            }
        }

        $res = ['error' => null];

        if (isset($data['page'])) {

            $listUsers = $em->getRepository($this->repository)->findListRoles($data['page'], [], 1);
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

        $role = $em->getRepository($this->repository)->find($record);
        $role ? $role : $role = new Role();

        $role
            ->setName($data['name'])
            ->setRole($data['role'])
            ->setDeleted($data['deleted']);

        $validator = $this->get('validator');
        $errors = $validator->validate($role);

        if ($errors->count() > 0) {

            $error = '';

            for ($i = 0; $i < $errors->count(); $i++) {

                $property = $errors->get($i)->getPropertyPath();
                $error .= $property . ': ' . $errors->get($i)->getMessage() . "\n";
            }

            return $response->setData(['error' => $error]);
        }

        try {

            $em->persist($role);
            $em->flush();
            $res['record'] = $role->getId();

        } catch (\Exception $e) {

            $res['error'] = $e->getMessage();
        }

        return $response->setData($res);
    }
}
