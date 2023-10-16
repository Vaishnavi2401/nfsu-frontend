import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Styles } from "./styles/mobileMenu.js";
import RenderOnAnonymous from '../../pages/account/RenderOnAnonymous';
import RenderOnAuthenticated from '../../pages/account/RenderOnAuthenticated'
import UserService from '../../services/UserService'
import service, {USER_API}  from '../../services/service'
import { useHistory } from 'react-router-dom';
import ProfileUpdate from '../User/ProfileUpdate'
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
const languages = [

    {
        code: 'en',
        name: 'English',
        country_code: 'gb',
    },

    {
        code: 'hi',
        name: 'Hindi',
        country_code: 'in'
    },
    // {
    //     code: 'te',
    //     name: 'Telugu',
    //     country_code: 'in'
    // },
      // {
    //     code: 'pu',
    //     name: 'Punjabi',
    //     country_code: 'in'
    // },
    // {
    //     code : 'te',
    //        name : 'Telugu',
    //        country_code : 'in'
    //    },
    // {
    //     code : 'mr',
    //     name : 'Marathi',
    //     country_code : 'in'
    // }
]

function MobileMenu() {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const um_api = USER_API;
    

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])
    useEffect(() => {
        // Mobile Menu
        const hmBtn = document.getElementById("mb-sidebar-btn");

        if (hmBtn) {
            const mdSidebarOverlay = document.getElementById("mb-sidebar-overlay");
            const mdSidebarBody = document.getElementById("mb-sidebar-body");
            const mdSidebarExit = document.getElementById("close-mb-sidebar");

            hmBtn.addEventListener("click", function (e) {
                e.preventDefault();
                mdSidebarOverlay.classList.toggle("visible");
                mdSidebarBody.classList.toggle("opened");
            });

            mdSidebarOverlay.addEventListener("click", function (e) {
                e.preventDefault();
                mdSidebarOverlay.classList.remove("visible");
                mdSidebarBody.classList.remove("opened");
            });

            mdSidebarExit.addEventListener("click", function (e) {
                e.preventDefault();
                mdSidebarOverlay.classList.remove("visible");
                mdSidebarBody.classList.remove("opened");
            });
        }

        // Menu Accordion -----------------
        const menuButton = document.querySelectorAll(".mb-menu-button");
        menuButton.forEach(button => {
            button.addEventListener("click", () => {
                button.classList.toggle("active");
                const content = button.nextElementSibling;

                if (button.classList.contains("active")) {
                    content.className = "mb-menu-content show";
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.className = "mb-menu-content";
                    content.style.maxHeight = "0";
                }
            });
        });
    });

    const addTestimonial = () => {
        history.push(`${process.env.PUBLIC_URL + "/addTestimonial"}`);
    }

    const analytics = () => {
        let emailid = UserService.getUserid();
        let sessionId = UserService.getSessionId();
        var params = new URLSearchParams();
        params.append("emailID", emailid)
        params.append("sessionId", sessionId)
        axios({
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: params,
            url: 'http://tmis1.hyderabad.cdac.in/EventAnalytics/resources/generic/updateuseractiondetails',
        })
    }


    const [getModalState, setModalState] = useState({
        show: false
    });
    const [headerState, setHeaderState] = useState({
        id: UserService.getUserid(),
        img: um_api + "getprofilepic/"
    });
    const history = useHistory();

    const userProfile = (learnerUsername) => {
        history.push(`/userProfile/${learnerUsername}`)
    }

    const handleModal = () => {
        setModalState({ show: true })
    }
    const handleModal2 = () => {
        setModalState({ show: false })
    }
    const feedback = () => {
        history.push(`/feedback`);
    }
    const [getUserDetails, setUserDetails] = useState({});
    let id = UserService.getUserid();
    const sidebarOpen = () => {
        service.getUserById(id)
            .then(res => {
                setUserDetails(res.data);
            })
            .catch(err => {
               
            })
    }

    return (
        <Styles>
            {/* Mobile Menu */}
            <section className="mobile-menu-area">
                <Container>
                    <Row>
                        <Col md="0" sm="12">
                            <div className="mb-topbar d-flex justify-content-between">
                                <div className="topbar-item">
                                    <p><i className="las la-phone"></i>{t('call_us_phone')}</p>
                                </div>
                                <div className="topbar-item">
                                    <ul className="list-unstyled list-inline">
                                        <RenderOnAnonymous>
                                            <li className="list-inline-item"><Link onClick={UserService.doLogin}><i className="las la-user"></i>{t('log_in')}</Link></li>
                                        </RenderOnAnonymous>
                                        <RenderOnAuthenticated>
                                            <li className="list-inline-item"><Link onClick={UserService.doLogout}><i className="las la-sign-out-alt"></i>{t('log_out')}</Link></li>
                                        </RenderOnAuthenticated>
                                        <RenderOnAnonymous>
                                            <li className="list-inline-item">/</li>
                                            <li className="list-inline-item"><Link to={process.env.PUBLIC_URL + "/registration"}><i className="las la-user-edit"></i>{t('register')}</Link></li>
                                        </RenderOnAnonymous>

                                    </ul>
                                </div>
                            </div>
                            <div className="mb-logo-area d-flex justify-content-between">
                                <div className="mb-logo-box d-flex">
                                    <div className="hm-button">
                                        <a href={process.env.PUBLIC_URL + "/"} id="mb-sidebar-btn">
                                            <i className="las la-bars" onClick={() => sidebarOpen()}></i>
                                        </a>
                                    </div>
                                    <div className="mb-logo">
                                        {/* <Link to={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + "/assets/images/logo1.png"} style={{backgroundColor:"rgb(207 207 207)",borderRadius:"5px"}} alt="" /></Link> */}
                                        <Link to={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + "/assets/images/logo1.png"} style={{ backgroundColor: "#ffffff", borderRadius: "5px" }} alt="" /></Link>
                                    </div>
                                </div>
                                <div className="mb-search-box">
                                    <form action="#">
                                        <input type="text" name="search" placeholder="Search Here" />
                                        <button type="submit"><i className="las la-search"></i></button>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Mobile Menu Sidebar */}
            <section className="mb-sidebar" id="mb-sidebar-body">
                <div className="mb-sidebar-heading d-flex justify-content-between">
                    <div><h5>{t('menu')}</h5></div>
                    <div><a href={process.env.PUBLIC_URL + "/"} id="close-mb-sidebar"><i className="las la-times"></i></a></div>
                </div>
                <div className="mb-sidebar-menu">
                    <div className="mb-menu-item">
                        {/* <button className="mb-menu-button active">
                            <p>Home <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content show">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/"}>Home Style 1</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/home-two"}>Home Style 2</Link></li>
                            </ul>
                        </div> */}
                        <RenderOnAuthenticated>
                            <div style={{ textAlign: 'center' }}>
                                <img style={{ width: 150, height: 150, backgroundColor: "white", borderRadius: 150 / 2, overflow: "hidden", borderWidth: 3, borderColor: "green" }} src={`${headerState.img}${headerState.id}`} />
                                <a href="#" onClick={() => handleModal()}><i style={{ fontSize: 30, overflow: "hidden", backgroundColor: "white", border: '2px solid white', boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: 40 / 2, position: 'absolute', top: 220, left: 170, zIndex: 3 }} className="las la-camera"></i></a>
                                {/* <i style={{ width: 40, height: 40, borderRadius: 40 / 2, overflow: "hidden", borderWidth: 5, backgroundColor: "white", position:'absolute', top:230, left:200,zIndex:3}} className="las la-camera"></i> */}
                            </div>
                            <div style={{ textAlign: 'center', color: "black", paddingTop: 40 }}>
                                <h6> {t('welcome')} {getUserDetails.firstName} {getUserDetails.lastName} </h6>
                            </div>
                            <br></br>
                            <div className="mb-menu-content show">
                                <ul className="list-unstyled" >
                                    <li style={{ marginTop: 20 }}>
                                        <h6>    < a href="#" style={{ color: 'black' }} onClick={event => window.location.href = 'http://gfsu2.hyderabad.cdac.in:8080/auth/realms/ngel/account/password'}>{t('reset_password')}</a></h6>
                                    </li>
                                    <li style={{ marginTop: 20 }}>
                                        <h6> < a href="#" style={{ color: 'black' }} onClick={() => userProfile(UserService.getUserid())}>{t('edit_profile')}</a></h6>
                                    </li>
                                    <li style={{ marginTop: 20 }}>
                                        <h6> < a href="#" style={{ color: 'black' }} onClick={() => feedback(2, 0)}>{t('feedback')}</a></h6>
                                    </li>
                                    <li style={{ marginTop: 20 }}>
                                        <h6> < a href="#" style={{ color: 'black' }} onClick={() => addTestimonial()}>{t('add_testimonial')}</a></h6>
                                    </li>
                                    <li style={{ marginTop: 20 }}>
                                        <h6> < a href="#" style={{ color: 'black' }} onClick={() => [UserService.doLogout(), analytics()]}>{t('log_out')}</a></h6>
                                    </li>
                                </ul>
                            </div>

                        </RenderOnAuthenticated>



                    </div>
                    {/* <div className="mb-menu-item">
                        <button className="mb-menu-button active">
                            <p>Pages <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content show">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/about"}>About Us</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/gallery"}>Gallery</Link></li>
                                <RenderOnAnonymous>
                                    <li><Link onClick={UserService.doLogin}>Log In</Link></li>
                                    <li><Link to={process.env.PUBLIC_URL + "/registration"}>Registration</Link></li>
                                </RenderOnAnonymous>
                                <li><Link to={process.env.PUBLIC_URL + "/contact"}>Contact</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/faq"}>Faq</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/404"}>404</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/coming-soon"}>Coming Soon</Link></li>
                            </ul>
                        </div>
                    </div> */}

                    <div className="mb-menu-item">
                        <button className="mb-menu-button active">
                            <p>{t('basic_details')}<i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content show">
                            <ul className="list-unstyled">
                                <li>{getUserDetails.email}</li>

                                <li>{getUserDetails.mobile}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-menu-item">
                        <button className="mb-menu-button active">
                            <p>{t('courses')} <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content show">
                            <ul className="list-unstyled">
                                <RenderOnAuthenticated>
                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/course-grid"}>{t('all_courses')}</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/user-grid/:id"}>{t('my_courses')}</Link></li>
                                </RenderOnAuthenticated>
                                <RenderOnAnonymous>
                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/course-grid"}>{t('all_courses')}</Link></li>

                                </RenderOnAnonymous>
                            </ul>
                        </div>
                    </div>


                    <div className="mb-menu-item side-contact">
                        <h5>{t('contact_us')}</h5>
                        <ul className="list-unstyled">
                            <li><i className="las la-map-marker"></i><p>{t('cdac_full_address')}</p></li>
                            <li><i className="las la-phone"></i>{t('phone')}</li>
                            <li><i className="las la-envelope"></i>{t("itcell_mail")}</li>
                        </ul>
                    </div>
                    <div className="mb-menu-item side-social">
                        <br></br>
                        <ul className="list-unstyled list-inline">
                        <li className="list-inline-item"><a href="https://www.facebook.com/National-Forensic-Sciences-University-109193664143620" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="https://twitter.com/NFSU_Official" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.instagram.com/nfsu.official" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.youtube.com/@nationalforensicsciencesun710" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.linkedin.com/company/gujarat-forensic-sciences-university-gfsu" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></li>
                        </ul>
                    </div>
                    {/* <div className="mb-menu-item">
                        <button className="mb-menu-button">
                            <p>Instructor <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/instructor"}>Instructors</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/instructor-details"}>Instructor Details</Link></li>
                            </ul>
                        </div>
                    </div> */}
                    {/* <div className="mb-menu-item">
                        <button className="mb-menu-button">
                            <p>Event <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/events"}>Events</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/event-details"}>Event Details</Link></li>
                            </ul>
                        </div>
                    </div> */}
                    {/* <div className="mb-menu-item">
                        <button className="mb-menu-button">
                            <p>Blog <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/blog-classic"}>Blog Classic</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/blog-grid"}>Blog Grid</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/blog-details"}>Blog Details</Link></li>
                            </ul>
                        </div>
                    </div> */}
                    {/* <div className="mb-menu-item">
                        <button className="mb-menu-button">
                            <p>Shop <i className="las la-plus"></i></p>
                        </button>
                        <div className="mb-menu-content">
                            <ul className="list-unstyled">
                                <li><Link to={process.env.PUBLIC_URL + "/products"}>Products</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/product-details"}>Product Details</Link></li>
                                <li><Link to={process.env.PUBLIC_URL + "/cart"}>Cart</Link></li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            </section>
            <div className="mb-sidebar-overlay" id="mb-sidebar-overlay"></div>
            <Modal
                centered show={getModalState.show} onHide={() => handleModal2()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('update_profile')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfileUpdate />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleModal2()}>
                        {t('close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Styles>
    )
}

export default MobileMenu