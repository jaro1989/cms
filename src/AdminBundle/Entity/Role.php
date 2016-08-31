<?php
namespace AdminBundle\Entity;

use Symfony\Component\Security\Core\Role\RoleInterface;

/**
 *
 */
class Role implements RoleInterface
{
    /**
     * @var integer $id
     */
    protected $id;

    /**
     * @var string $role
     */
    protected $role;

    /**
     * @var string $name
     */
    protected $name;

    /**
     * @var int
     */
    private $deleted = 0;

    /**
     * @var \DateTime
     */
    private $created_at;

    /**
     * @var \DateTime
     */
    private $updated_at;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param $value
     */
    public function setName($value)
    {
        $this->name = $value;
    }

    /**
     * Role constructor.
     */
    public function __construct()
    {

    }

    /**
     * @return string
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     */
    public function prePersist()
    {
        $this->created_at = new \DateTime();
    }

    /**
     */
    public function preUpdate()
    {
        $this->updated_at = new \DateTime();
    }

    /**
     * Set role
     *
     * @param string $role
     *
     * @return Role
     */
    public function setRole($role)
    {
        $this->role = $role;

        return $this;
    }

    /**
     * Set deleted
     *
     * @param boolean $deleted
     *
     * @return Role
     */
    public function setDeleted($deleted)
    {
        $this->deleted = $deleted;

        return $this;
    }

    /**
     * Get deleted
     *
     * @return boolean
     */
    public function getDeleted()
    {
        return $this->deleted;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Role
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return Role
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updated_at = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }
}
