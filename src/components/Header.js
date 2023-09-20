import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown, Modal, Button } from 'react-bootstrap';
import Search from './common/Search';
import Sidebar from './common/Sidebar';
import StickyMenu from './common/StickyMenu';
import MobileMenu from './common/MobileMenu';
import { Styles } from "./styles/header.js";
import RenderOnAnonymous from '../pages/account/RenderOnAnonymous';
import UserService from '../services/UserService';
import RenderOnAuthenticated from '../pages/account/RenderOnAuthenticated';
import $ from 'jquery';
import service from '../services/service';
import { format, render, cancel, register } from 'timeago.js';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import classNames from 'classnames';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import RenderOnRole from '../pages/account/RenderOnRole';
import { useHistory } from 'react-router-dom';
import RenderOnAdmin from '../pages/account/RenderOnAdmin';
import UserActionLogin from '../pages/account/UserActionLogin';
import logoNew from "../assets/images/logo.png"


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
    //     code : 'mr',
    //     name : 'Marathi',
    //     country_code : 'in'
    // }
]

function Header() {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {


        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
        // console.log("CHECKIGN    ======     ", document.title)
    }, [currentLanguage, t])

    // //console.log("instRole", UserService.instRole, "learnerRole", UserService.learnerRole);

    const [announcementData, setAnnouncementData] = useState([]);
    const [msg, setmsg] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true)
        service.AnnouncementByCurrentDataToPublishUpTo()
            .then((res) => {
                setAnnouncementData(res.data);
            }).catch(err => setmsg(t("server_error")))
    }, [])

    useEffect(() => {
        var self = this;
        var notiTabOpened = false;
        var notiCount = window.localStorage.getItem('notiCount');
        if (parseInt(notiCount, 10) > 0) {
            var nodeItems = window.localStorage.getItem('nodeItems');
            $('.noti-count').html(notiCount);
            $('#nav-noti-count').css('display', 'inline-block');
        }

        $('#noti-tab').click(function () {
            notiTabOpened = true;
            if (notiCount) {
                $('#nav-noti-count').fadeOut('slow');
                $('.noti-title').css('display', 'inline-block');
            }
            $('.noti-container').toggle(300);
            return false;
        });

        $('#box-container').click(function () {
            $('.noti-container').hide();
            notiTabOpened = false;
        });

        $('.noti-container').click(function (evt) {
            evt.stopPropagation();
            return false;
        });

        // $('.noti-text').on('click', function (evt) {
        //     addClickListener(evt);
        // });


        // var addClickListener = function (evt) {
        //     evt.stopPropagation();
        //     if (!$(evt.currentTarget).hasClass('has-read')) {
        //         notiCount--;
        //         window.localStorage.setItem('notiCount', notiCount);
        //         $('.noti-count').html(notiCount);
        //         if (notiCount == 0) {
        //             $('.noti-title').hide();
        //         }
        //         $(evt.currentTarget).addClass('has-read');
        //     }
        // }

        $('.noti-footer').click(function () {
            notiCount = 0;
            window.localStorage.setItem('notiCount', notiCount);
            $('.noti-title').hide();
            $('.noti-text').addClass('has-read');
        });

        // window.setInterval(function () {
        //     var randomStr = Date();
        //     var childItem = $('<li>').attr('class', 'noti-text').append("Shekhar Kumar commented on " + randomStr);
        //     childItem = Array.prototype.slice.call(childItem);

        //     $('.noti-body').prepend(childItem);
        //     $('.noti-body .noti-text').on('click', function (evt) {
        //         addClickListener(evt);
        //     });

        //     notiCount++;
        //     $('.noti-count').html(notiCount);

        //     if (notiTabOpened) {
        //         $('.noti-title').css('display', 'inline-block');
        //     } else {
        //         $('#nav-noti-count').css('display', 'inline-block');
        //     }

        //     window.localStorage.setItem('notiCount', notiCount);
        //     if (window.localStorage.getItem('nodeItems')) {
        //         childItem.concat(window.localStorage.getItem('nodeItems'));
        //     }
        //     window.localStorage.setItem('nodeItems', childItem);
        // }, 10000);

    }, [])

    const dateConverter = (dateFormat) => {
        let timeAgo = format(dateFormat, 'en_US');
        return timeAgo;
    }


    const [getAnnouncmentModal, setAnnouncementModal] = useState(false);
    const [announcementData1, setAnnouncementData1] = useState({
        title: '',
        body: '',
        date: ''
    })
    const AnnouncementModal = (title, body, date) => {
        setAnnouncementData1({ title: title, body: body, date: date })
        setAnnouncementModal(true);
    }
    const history = useHistory();
    const afterLogout = () => {
        // alert("Logout")
        let userId = UserService.getUserid();
        let sessionId = UserService.getSessionId();
        ////console.log(userId, sessionId);
        ////console.log("logout here");
        service.updateUserActionDetails(userId, sessionId);
        history.push("/")

    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (UserService.isLoggedIn() === false) {
                history.push("/");
            } else {

            }
        }, 1800000);
        return () => clearInterval(interval);
    }, []);


    // UserService.UserAction();

    return (
        <Styles>
            {msg == null ? null :
                <Toast show={show} style={{ right: 0, backgroundColor: '#17a2b8', color: 'white', width: '300px' }} className="position-absolute top-0 end-0 m-4" onClose={() => setShow(false)} delay={5000} autohide>
                    <Toast.Header style={{ fontSize: '15px' }}>
                        <i class="las la-info-circle"></i>
                        <strong className="mr-auto">{t('info')}</strong>
                        <small>{t('just_now')}</small>
                    </Toast.Header>
                    <Toast.Body >
                        {msg}
                    </Toast.Body>
                </Toast>
            }
            <section className="top-bar">
                <Container>
                    <Row>
                        <Col lg="6" md="5">
                            <div className="bar-left">
                                <ul className="list-unstyled list-inline">
                                    <li className="list-inline-item"><i className="las la-map-marker"></i>{t('cdac_address')} </li>
                                    <li className="list-inline-item"><i className="las la-question"></i><Link to={process.env.PUBLIC_URL + "/faq"}>{t('have_questions')}</Link></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg="6" md="7">
                            <div className="bar-right d-flex justify-content-end">
                                <ul className="list-unstyled list-inline bar-social">
                                <li className="list-inline-item"><a href="https://www.facebook.com/National-Forensic-Sciences-University-109193664143620" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="https://twitter.com/NFSU_Official" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.instagram.com/nfsu.official" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.youtube.com/@nationalforensicsciencesun710" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.linkedin.com/company/gujarat-forensic-sciences-university-gfsu" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></li>
                                </ul>
                                <ul className="list-unstyled list-inline bar-lang">
                                    <li className="list-inline-item">
                                        <Dropdown>
                                            <Dropdown.Toggle as="a"><img src={process.env.PUBLIC_URL + "/assets/images/us.png"} alt="" />{t('language')}<i className="las la-angle-down"></i></Dropdown.Toggle>
                                            <Dropdown.Menu as="ul">
                                                {languages.map(({ code, name, country_code }) => (
                                                    <Dropdown.Item as="li" key={country_code}>
                                                        <a
                                                            href="#"
                                                            className={classNames('dropdown-item', {
                                                                disabled: currentLanguageCode === code,
                                                            })}
                                                            onClick={() => {
                                                                i18next.changeLanguage(code)
                                                            }}
                                                        >
                                                            {name}
                                                        </a>
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        {/* <Dropdown>
                                            <Dropdown.Toggle as="a"><img src={process.env.PUBLIC_URL + "/assets/images/us.png"} alt="" />English<i className="las la-angle-down"></i></Dropdown.Toggle>
                                            <Dropdown.Menu as="ul">
                                                <Dropdown.Item as="li"><img src={process.env.PUBLIC_URL + "/assets/images/us.png"} alt="" /> English</Dropdown.Item>
                                                <Dropdown.Item as="li"><img src={process.env.PUBLIC_URL + "/assets/images/fra.png"} alt="" /> French</Dropdown.Item>
                                                    <Dropdown.Item as="li"><img src={process.env.PUBLIC_URL + "/assets/images/ger.png"} alt="" /> German</Dropdown.Item>
                                                    <Dropdown.Item as="li"><img src={process.env.PUBLIC_URL + "/assets/images/spa.png"} alt="" /> Spanish</Dropdown.Item>
                                                    <Dropdown.Item as="li"><img src={process.env.PUBLIC_URL + "/assets/images/bra.png"} alt="" /> Brazilian</Dropdown.Item> 
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                    </li>
                                </ul>
                                <ul className="list-unstyled list-inline bar-login">
                                    <RenderOnAnonymous>
                                        <li className="list-inline-item"><Link onClick={() => { UserService.doLogin() }}><i className="las la-user"></i>{t('log_in')}</Link></li>
                                    </RenderOnAnonymous>
                                    <RenderOnAuthenticated>
                                        <UserActionLogin />
                                        <li className="list-inline-item"><Link onClick={() => [afterLogout(), UserService.doLogout()]}><i className="las la-sign-out-alt"></i>{t('log_out')}</Link></li>
                                    </RenderOnAuthenticated>
                                    <RenderOnAnonymous>
                                        <li className="list-inline-item"><Link to={process.env.PUBLIC_URL + "/registration"}><i className="las la-user-edit"></i>{t('register')}</Link></li>
                                    </RenderOnAnonymous>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Logo Area */}
            <section className="logo-area">
                <Container>
                    <Row>
                        <Col md="3">
                            <div className="logo">
                                <Link to={process.env.PUBLIC_URL + "/"}><img src={logoNew} style={{ width: "240px", padding: '0px', margin: "0px" }} alt="" /></Link>
                            </div>
                        </Col>
                        <Col md="9">
                            <div className="logo-contact-box d-flex justify-content-end">
                                <div className="emcontact-box d-flex">
                                    <div className="box-icon">
                                        <i class="las la-phone-volume" style={{ fontSize: '30px' }}></i>
                                    </div>
                                    <div className="box-content">
                                        <p>{t('call_us_now')}</p>
                                        <span><p href="tel:(079) 239 77103" style={{ color: "#182B49", fontSize: '17px' }}>{t('call_us_phone')}</p></span>
                                    </div>
                                </div>
                                <div className="emcontact-box d-flex">
                                    <div className="box-icon">
                                        <i class="las la-envelope-open-text" style={{ fontSize: '30px' }}></i>
                                    </div>
                                    <div className="box-content">
                                        <p>{t('enquiry_us')}</p>
                                        <span><p href="mailto: info@nfsu.ac.in" style={{ color: "#182B49", fontSize: '17px' }}>{t('enquiry_us_id')}</p></span>
                                    </div>
                                </div>

                                {/* <div className="apply-btn">
                                    <RenderOnAnonymous>
                                        <Link to={process.env.PUBLIC_URL + "/registration"}><i className="las la-clipboard-list"></i>Apply Now</Link>
                                    </RenderOnAnonymous>
                                </div> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Navbar */}
            <section className="main-menu">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="main-menu-box">
                                <div className="menu-box d-flex justify-content-between">
                                    <ul className="nav menu-nav">
                                        <li className="nav-item dropdown active">
                                            <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">{t('home')} </Link>
                                            {/* <ul className="dropdown list-unstyled">
                                                <li className="nav-item active"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>Home Style 1</Link></li>
                                                <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/home-two"}>Home Style 2</Link></li>
                                            </ul> */}
                                        </li>
                                        {/* <li className="nav-item active"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>{t('home')}</Link></li> */}
                                        {/* <li className="nav-item">
                                                <Link className="nav-link" to={process.env.PUBLIC_URL + "/about"}>About Us</Link>
                                                <ul className="dropdown list-unstyled">
                                                    <li className="nav-item"><Link className="nav-link" >About Us</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/gallery"}>Gallery</Link></li>
                                                    <RenderOnAnonymous>
                                                        <li className="nav-item"><Link className="nav-link" onClick={UserService.doLogin} >Log In</Link></li>
                                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/registration"}>Registration</Link></li>
                                                    </RenderOnAnonymous>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/contact"}>Contact</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/faq"}>Faq</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/404"}>404</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/coming-soon"}>Coming Soon</Link></li>
                                                </ul>
                                            </li> */}
                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/about"}>{t('about_us')}</Link></li>


                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" data-toggle="dropdown">{t('courses')} <i className="las la-angle-down"></i></Link>

                                            <ul className="dropdown list-unstyled">
                                                <RenderOnAuthenticated>
                                                    <RenderOnRole roles={['instructor']}>
                                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/CourseStructureDrive"}>{t('course_Content_Drive')}</Link></li>
                                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/add-course-category"}>{t('course_Category')}</Link></li>
                                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/CreateCourse"}>{t('create_course')}</Link></li>
                                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/ViewCourses"}>{t('authored_Courses')}</Link></li>

                                                    </RenderOnRole>
                                                </RenderOnAuthenticated>
                                                <RenderOnAuthenticated>
                                                    <RenderOnRole roles={['learner']}>
                                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/user-grid"}>{t('my_courses')}</Link></li>
                                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/course-grid"}>{t('all_courses')}</Link></li>
                                                    </RenderOnRole>
                                                </RenderOnAuthenticated>
                                                <RenderOnAnonymous>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/course-grid"}>{t('all_courses')}</Link></li>
                                                </RenderOnAnonymous>
                                                {/* <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/course-details"}>Course Details</Link></li> */}
                                            </ul>
                                        </li>
                                        <RenderOnAuthenticated>
                                            <li className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" data-toggle="dropdown">{t('e-library')}<i className="las la-angle-down"></i></Link>
                                                <ul className="dropdown list-unstyled">
                                                    <RenderOnAuthenticated>
                                                        <RenderOnRole roles={['instructor']}>
                                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/view-library"}>{t('published_book')}</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/create-library"}>{t('create_library')}</Link></li>
                                                        </RenderOnRole>
                                                    </RenderOnAuthenticated>
                                                    <RenderOnAuthenticated>
                                                        <RenderOnRole roles={['learner']}>
                                                            {/* <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/"}>{t("my_book")}</Link></li> */}
                                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/library-content"}>{t("all_book")}</Link></li>
                                                        </RenderOnRole>
                                                    </RenderOnAuthenticated>
                                                </ul>
                                            </li>
                                        </RenderOnAuthenticated>
                                        <li className="nav-item dropdown">
                                            {/* <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/instructor"} data-toggle="dropdown">{t('instructor')} </Link> */}
                                            {/* <ul className="dropdown list-unstyled">
                                                <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/instructor"}>Instructors</Link></li>
                                            </ul> */}
                                        </li>
                                        <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/contact"}>{t('contact')}</Link></li>
                                        {/* <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/faq"}>{t('faq')}</Link></li> */}

                                        <RenderOnAuthenticated>
                                            <li className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" data-toggle="dropdown">{t('dashboard')} <i className="las la-angle-down"></i></Link>
                                                <ul className="dropdown list-unstyled">
                                                    {UserService.hasRole(['instructor']) ?
                                                        <><li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/instructor-dashboard"}>{t('instructor_Dashborad')}</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/dashboard"}>{t('learner_Dashboard')}</Link></li>
                                                        </>
                                                        : UserService.hasRole(['admin']) ? <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/AdminDashBoard"}>{t('admin_Dashborad')}</Link></li>
                                                            : <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/dashboard"}>{t('learner_Dashboard')}</Link></li>}
                                                </ul>
                                            </li>
                                        </RenderOnAuthenticated>

                                        {/* <li className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">Event <i className="las la-angle-down"></i></Link>
                                                <ul className="dropdown list-unstyled">
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/events"}>Events</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/event-details"}>Event Details</Link></li>
                                                </ul>
                                            </li> */}
                                        {/* <li className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">Blog <i className="las la-angle-down"></i></Link>
                                                <ul className="dropdown list-unstyled">
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/blog-classic"}>Blog Classic</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/blog-grid"}>Blog Grid</Link></li>
                                                    <li className="nav-item"><Link className="nav-link" to={process.env.PUBLIC_URL + "/blog-details"}>Blog Details</Link></li>
                                                </ul>
                                            </li> */}
                                    </ul>
                                    <ul className="nav search-cart-bar">
                                        <li className="nav-item cart-box">
                                            <Link className="nav-link nav-cart dropdown" data-toggle="dropdown">
                                                <i className="las la-bell"></i>
                                                {announcementData.length == 0 ? null : <span class="badge1 badge-danger1">{announcementData.length}</span>}
                                            </Link>

                                            <div className=".noti-container">
                                                <ul className="dropdown list-unstyled" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                                    {/* <li onClick={() => CreateModal("PRadeep")} className="nav-item"><Link className="nav-link" >Products</Link></li> */}
                                                    {
                                                        announcementData.map((data, i) => {
                                                            return (
                                                                <li onClick={() => AnnouncementModal(data.title, data.body, dateConverter(data.publihFrom))} className="nav-item">
                                                                    <Link className="nav-link" >{data.title} <span style={{ fontSize: '10px', float: 'right' }}>({dateConverter(data.publihFrom)})</span></Link></li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>

                                        </li>
                                    </ul>
                                    {/* <li className="nav-item cart-box">
                                            <a href="#" className="nav-link nav-cart">
                                                <i onClick={() => AnnouncementService()} id="noti-tab" className="nav-items las la-bell">
                                                    <span className="noti-count noti-count-extend" id="nav-noti-count"></span>
                                                    <div className="noti-container">
                                                        <div className="noti-title">
                                                            <span className="new-noti-title">Notifications </span>
                                                            <span className="noti-count-title" id="nav-noti-count"></span>
                                                        </div>
                                                        <ul class="noti-body">
                                                            {
                                                                announcementData.map((data, i) => {
                                                                    return (
                                                                        <li id="abc" className="noti-text">{data.title}<span style={{ fontSize: '10px', float: 'right' }}>({dateConverter(data.publihFrom)})</span></li>
                                                                    )
                                                                })
                                                            }

                                                        </ul>
                                                        <div className="noti-footer">Mark all as read</div>
                                                    </div>
                                                </i>
                                            </a>
                                        </li> */}
                                    <ul className="nav search-cart-bar">
                                        {/* <li className="nav-item search-box">
                                            <Search />
                                        </li> */}
                                        <li className="nav-item side-box">
                                            <Sidebar />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Sticky Menu */}
            <StickyMenu />

            {/* Mobile Menu */}
            <MobileMenu />


            <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={getAnnouncmentModal} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {announcementData1.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ReactHtmlParser(ReactHtmlParser(announcementData1.body))}
                </Modal.Body>
                <Modal.Footer>
                    <span style={{ fontSize: '10px', position: 'sticky' }}>{announcementData1.date}</span>
                    <Button onClick={() => setAnnouncementModal(false)}>{t('close')}</Button>
                </Modal.Footer>
            </Modal>
        </Styles>
    )
}

export default Header