<?php

namespace AdminBundle\Entity;

use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * UserRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class UserRepository extends \Doctrine\ORM\EntityRepository
{
    private $_max = 3;
    /**
     * @param int $record
     * @return array|null
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findOneUser($record)
    {
        return $this->getEntityManager()
            ->createQuery("
                SELECT u.id,
                       u.username,
                       u.email,
                       u.isActive,
                       u.deleted,
                       r.id AS role_id
                  FROM AdminBundle:User u LEFT JOIN u.roles r
                 WHERE u.id = :id
            ")
            ->setParameter('id', $record)
            ->setMaxResults(1)
            ->getOneOrNullResult();
    }

    /**
     * @param int $page
     * @param array $search
     * @param int $deleted
     * @return array
     */
    public function findListUser($page = 1, $search = [], $deleted = 0)
    {
        $query = $this->getEntityManager()
            ->createQuery("
                SELECT u.id,
                       u.username,
                       u.email,
                       u.isActive
                  FROM AdminBundle:User u
                 WHERE u.deleted = :deleted
                       {$this->getWhere($search)}
            ")
            ->setParameter('deleted', $deleted)
            ->setFirstResult($this->getPage($page))
            ->setMaxResults($this->_max);

        $this->getParameter($query, $search);

        $paginator = new Paginator($query);

        $paginator->setUseOutputWalkers(false);

        return [
            'count_page' => ceil($paginator->count() / $this->_max),
            'list'  => $query->getResult()
        ];
    }

    /**
     * @param $search
     * @return string
     */
    private function getWhere($search)
    {
        $where = '';

        if (!empty($search)) {

            foreach ($search as $field => $value) {

                if (!empty($value)) {

                    $where .= ' AND u.' . $field . ' LIKE :' . $field . ' ';
                }
            }
        }

        return trim($where);
    }

    /**
     * @param new Query $em
     * @param $search
     * @return void
     */
    private function getParameter($query, $search)
    {
        if (!empty($search)) {

            foreach ($search as $field => $value) {

                if (!empty($value)) {

                    $query->setParameter($field, $value . '%');
                }
            }
        }
    }

    private function getPage($page) {

        $page = $page > $this->_max ? $this->_max : $page;
        return $this->_max * ($page < 1 ? 0: $page - 1);
    }
}
