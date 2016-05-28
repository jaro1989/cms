<?php
namespace Admin\Home\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="Users")
 * @ORM\HasLifecycleCallbacks()
 */
class Users
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", columnDefinition="INT(1)", options={"default":0})
     */
    private $deleted;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date_entered;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date_modified;

    /**
     * @ORM\Column(type="integer", columnDefinition="INT(2)", options={"default":0})
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=45, nullable=true)
     */
    private $cms_login;

    /**
     * @ORM\Column(type="string", length=45, nullable=true)
     */
    private $cms_email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $cms_password;

    /**
     * @ORM\Column(type="string", length=45, nullable=true)
     */
    private $first_name;

    /**
     * @ORM\Column(type="string", length=45, nullable=true)
     */
    private $last_name;

    /**
     * @ORM\Column(type="string", length=45, nullable=true)
     */
    private $middle_name;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=25, nullable=true)
     */
    private $date_format;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $date_perion_n;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $date_perion_k;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set deleted
     *
     * @param integer $deleted
     *
     * @return Users
     */
    public function setDeleted($deleted)
    {
        $this->deleted = $deleted;

        return $this;
    }

    /**
     * Get deleted
     *
     * @return integer
     */
    public function getDeleted()
    {
        return $this->deleted;
    }

    /**
     * Set dateEntered
     *
     * @ORM\PrePersist()
     * @return Users
     */
    public function setDateEntered()
    {
        $this->date_entered = new \DateTime();;

        return $this;
    }

    /**
     * Get dateEntered
     *
     * @return \DateTime
     */
    public function getDateEntered()
    {
        return $this->date_entered->format('d/m/Y');
    }

    /**
     * Set dateModified
     *
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     * @return Users
     */
    public function setDateModified()
    {
        $this->date_modified = new \DateTime();;

        return $this;
    }

    /**
     * Get dateModified
     *
     * @return \DateTime
     */
    public function getDateModified()
    {
        return $this->date_modified->format('d/m/Y');
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return Users
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return integer
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set cmsLogin
     *
     * @param string $cmsLogin
     *
     * @return Users
     */
    public function setCmsLogin($cmsLogin)
    {
        $this->cms_login = $cmsLogin;

        return $this;
    }

    /**
     * Get cmsLogin
     *
     * @return string
     */
    public function getCmsLogin()
    {
        return $this->cms_login;
    }

    /**
     * Set cmsEmail
     *
     * @param string $cmsEmail
     *
     * @return Users
     */
    public function setCmsEmail($cmsEmail)
    {
        $this->cms_email = $cmsEmail;

        return $this;
    }

    /**
     * Get cmsEmail
     *
     * @return string
     */
    public function getCmsEmail()
    {
        return $this->cms_email;
    }

    /**
     * Set cmsPassword
     *
     * @param string $cmsPassword
     *
     * @return Users
     */
    public function setCmsPassword($cmsPassword)
    {
        $this->cms_password = $cmsPassword;

        return $this;
    }

    /**
     * Get cmsPassword
     *
     * @return string
     */
    public function getCmsPassword()
    {
        return $this->cms_password;
    }

    /**
     * Set firstName
     *
     * @param string $firstName
     *
     * @return Users
     */
    public function setFirstName($firstName)
    {
        $this->first_name = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->first_name;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     *
     * @return Users
     */
    public function setLastName($lastName)
    {
        $this->last_name = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->last_name;
    }

    /**
     * Set middleName
     *
     * @param string $middleName
     *
     * @return Users
     */
    public function setMiddleName($middleName)
    {
        $this->middle_name = $middleName;

        return $this;
    }

    /**
     * Get middleName
     *
     * @return string
     */
    public function getMiddleName()
    {
        return $this->middle_name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Users
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set dateFormat
     *
     * @param string $dateFormat
     *
     * @return Users
     */
    public function setDateFormat($dateFormat)
    {
        $this->date_format = $dateFormat;

        return $this;
    }

    /**
     * Get dateFormat
     *
     * @return string
     */
    public function getDateFormat()
    {
        return $this->date_format;
    }

    /**
     * Set datePerionN
     *
     * @param \DateTime $datePerionN
     * @return Users
     */
    public function setDatePerionN($datePerionN)
    {
        $this->date_perion_n = new \DateTime($datePerionN);

        return $this;
    }

    /**
     * Get datePerionN
     *
     * @return \DateTime
     */
    public function getDatePerionN()
    {
        return $this->date_perion_n->format('d/m/Y');
    }

    /**
     * Set datePerionK
     *
     * @param \DateTime $datePerionK
     * @return Users
     */
    public function setDatePerionK($datePerionK)
    {
        $this->date_perion_k = new \DateTime($datePerionK);

        return $this;
    }

    /**
     * Get datePerionK
     *
     * @return \DateTime
     */
    public function getDatePerionK()
    {
        return $this->date_perion_k->format('Y-m-d');
    }
}
