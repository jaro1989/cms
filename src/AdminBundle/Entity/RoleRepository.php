<?php

namespace AdminBundle\Entity;

/**
 * RoleRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class RoleRepository extends \Doctrine\ORM\EntityRepository
{
    /**
     * @return array
     */
    public function findListRoles()
    {
        $arr =  $this->getEntityManager()
            ->createQuery("
                SELECT r.id,
                       r.name
                  FROM AdminBundle:Role r
                 WHERE r.deleted = :deleted
            ")
            ->setParameter('deleted', 0)
            ->getResult();

        $result = [];

        if (!empty($arr)) {

            foreach ($arr as $val) {

                $result[$val['id']] = $val['name'];
            }
        }

        return $result;
    }
}
