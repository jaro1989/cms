<?php
namespace AdminBundle\Entity;

use Symfony\Component\Security\Core\Role\RoleInterface;

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
     * @var string $users
     */
    protected $users;

    /**
     * @var bool
     */
    private $deleted;

    /**
     * @var \DateTime
     */
    private $created_at;

    /**
     * @var \DateTime
     */
    private $updated_at;

    /**
     * @var int
     */
    private $parent;

    /**
     * Role constructor.
     */
    public function __construct()
    {

    }

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

        return $this;
    }

    /**
     * @return string
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * lifecycleCallbacks
     */
    public function prePersist()
    {
        $this->created_at = new \DateTime();
    }

    /**
     * lifecycleCallbacks
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
    public function setDeleted($deleted = true)
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

    /**
     * Add user
     *
     * @param \AdminBundle\Entity\User $user
     *
     * @return Role
     */
    public function addUser(\AdminBundle\Entity\User $user)
    {
        $this->users[] = $user;

        return $this;
    }

    /**
     * Remove user
     *
     * @param \AdminBundle\Entity\User $user
     */
    public function removeUser(\AdminBundle\Entity\User $user)
    {
        $this->users->removeElement($user);
    }

    /**
     * Get users
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * Set parent
     *
     * @param \AdminBundle\Entity\Role $parent
     *
     * @return Role
     */
    public function setParent(\AdminBundle\Entity\Role $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent
     *
     * @return \AdminBundle\Entity\Role
     */
    public function getParent()
    {
        return $this->parent;
    }
}
