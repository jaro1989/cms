<?php
namespace AdminBundle\Service;

class RoleHierarchy extends \Symfony\Component\Security\Core\Role\RoleHierarchy
{
    private $em;

    private $hierarchy;

    public function __construct($hierarchy, \Doctrine\ORM\EntityManager $em)
    {
        $this->hierarchy = $hierarchy;
        $this->em = $em;
        parent::__construct($this->buildRolesTree());
    }

    /**
     * Here we build an array with roles. It looks like a two-levelled tree - just
     * like original Symfony roles are stored in security.yml
     * @return array
     */
    private function buildRolesTree()
    {
        $roles = $this->em
            ->createQuery("
              SELECT r
                FROM AdminBundle:Role r
               WHERE r.deleted = :deleted
            ")
            ->setParameter('deleted', 0)
            ->execute();

        foreach ($roles as $role) {

            /** @var $role Role */
            if ($role->getParent()) {

                if (!isset($this->hierarchy[$role->getParent()->getRole()])) {

                    $this->hierarchy[$role->getParent()->getRole()] = [];
                }

                $this->hierarchy[$role->getParent()->getRole()][] = $role->getRole();

            } else {

                if (!isset($this->hierarchy[$role->getRole()])) {

                    $this->hierarchy[$role->getRole()] = [];
                }
            }
        }

        return $this->hierarchy;
    }
}