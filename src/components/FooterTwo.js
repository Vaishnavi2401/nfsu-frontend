import React, { useEffect } from 'react';
import Datas from '../data/footer/footer2.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BackToTop from './common/BackToTop';
import { Styles } from "./styles/footerTwo.js";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import logo from "../../src/assets/images/logo.png"
import logo2 from "../../src/assets/images/logo2.png";
import UserService from '../services/UserService';

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

function FooterTwo() {

    useEffect(() => {
        UserService.generateToken();
    }, []);

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
    }, [currentLanguage, t])

    useEffect(() => {
        const form = document.getElementById("form4");
        const email = document.getElementById("email4");

        form.addEventListener("submit", formSubmit);

        function formSubmit(e) {
            e.preventDefault();

            const emailValue = email.value.trim();

            if (emailValue === "") {
                setError(email, t('email_error1'));
            } else if (!isEmail(emailValue)) {
                setError(email, t('email_error2'));
            } else {
                setSuccess(email);
            }
        }

        function setError(input, message) {
            const formControl = input.parentElement;
            const errorMsg = formControl.querySelector(".input-msg4");
            formControl.className = "form-control error";
            errorMsg.innerText = message;
        }

        function setSuccess(input) {
            const formControl = input.parentElement;
            formControl.className = "form-control success";
        }

        function isEmail(email) {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
        }
    });

    return (
        <Styles>
            {/* Footer Two */}
            <footer className="footer2" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${Datas.backgroundImage})` }}>
                <Container>
                    <Row>
                        <Col md="3">
                            <div className="footer-logo-info">
                                {/* <img src={process.env.PUBLIC_URL + "/assets/images/f-logo.png"} alt="" className="img-fluid" /> */}
                                {/* <img src={logo} alt="" style={{background : "#fffff66"}} className="img-fluid" /> */}
                                {/* <p>Lorem ipsum dolor sit amet, consectet adipisicing elit. Saepe porro neque a nam null quos.</p> */}
                                <ul className="list-unstyled">
                                    {/* <li><i className="las la-map-marker"></i><p>{t('cdac_full_address')}</p></li> */}
                                    <li><div><Row><Col sm={1}><i className="las la-map-marker" style={{ paddingTop: '8px' }}></i></Col><Col sm={10}><p>{t('cdac_full_address')}</p></Col></Row></div></li>
                                    <li><i className="las la-envelope"></i>{t("enquiry_us_id")}</li>
                                    <li><i className="las la-phone"></i>{t("call_us_phone")}</li>
                                </ul>
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="f-links">
                                <h5>{t('usefull_links')}</h5>
                                <ul className="list-unstyled">
                                    <li><a href="https://www.nfsu.ac.in/"><i className="las la-angle-right"></i>{t('meghsikshak')}</a></li>
                                    {/* <li><a href="https://www.nfsu.ac.in/"><i className="las la-angle-right"></i>{t('cdac_official_site')}</a></li>
                                    <li><a href="https://www.nfsu.ac.in/"><i className="las la-angle-right"></i>{t('chariot')}</a></li>
                                    <li><a href="https://www.nfsu.ac.in/"><i className="las la-angle-right"></i>{t('privacy_policy')}</a></li> */}
                                    {/* <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>General Information</Link></li>
                                    <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Help Center</Link></li>
                                    <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Our Services</Link></li>
                                    <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Privacy Policy</Link></li>
                                    <li><Link to={process.env.PUBLIC_URL + "/"}><i className="las la-angle-right"></i>Online Support</Link></li> */}
                                </ul>
                            </div>
                        </Col>
                        {/* <Col md="3">
                            <div className="f-post">
                                <h5>Twitter Post</h5>
                                <div className="post-box d-flex">
                                    <div className="po-icon">
                                        <i className="fab fa-twitter"></i>
                                    </div>
                                    <div className="po-content">
                                        <Link to={process.env.PUBLIC_URL + "/blog-details"}>Lorem ipsum dolor sit ...</Link>
                                        <span>Mar 30, 2019</span>
                                    </div>
                                </div>
                                <div className="post-box d-flex">
                                    <div className="po-icon">
                                        <i className="fab fa-twitter"></i>
                                    </div>
                                    <div className="po-content">
                                        <Link to={process.env.PUBLIC_URL + "/blog-details"}>Lorem ipsum dolor sit ...</Link>
                                        <span>Mar 30, 2019</span>
                                    </div>
                                </div>
                                <div className="post-box d-flex">
                                    <div className="po-icon">
                                        <i className="fab fa-twitter"></i>
                                    </div>
                                    <div className="po-content">
                                        <Link to={process.env.PUBLIC_URL + "/blog-details"}>Lorem ipsum dolor sit ...</Link>
                                        <span>Mar 30, 2019</span>
                                    </div>
                                </div>
                            </div>
                        </Col> */}
                        <Col md="3">
                            <div className="f-newsletter">
                                {/* <h5>Newsletter</h5> */}
                                {/* <p>Lorem ipsum dolor sit amet, consectet adipisicing elit.</p> */}

                                <form id="form4" className="form">
                                    {/* <p className="form-control">
                                        <input type="email" placeholder="Enter email here" id="email4" />
                                        <span className="input-msg4"></span>
                                    </p>
                                    <button>Submit</button> */}
                                </form>
                            </div>
                        </Col>
                        <Col md="12">
                            <div className="copytext-area text-center">
                                <p>{t('copyright')} &copy; {new Date().getFullYear()}{" "} {t('powerby')}<a href='https://meghsikshak.in/'>{t('megh')}</a> {t('design_develop')}<a href='https://www.cdac.in/'>({t('cdac')})</a></p>
                                <p>
                                    {/* <a target="_blank" href="https://www.cdac.in/"><img src={process.env.PUBLIC_URL + "/assets/images/cdac2.png"} alt="" style={{ height: '50px', width: '70px' }} /></a> */}
                                    {/* <a target="_blank" href="https://www.cdac.in/"><img src={logo2} alt="" style={{ height: '95px', width: '70px' }} /></a> */}
                                </p>
                                <ul className="social list-unstyled list-inline">
                                    <li className="list-inline-item"><a href="https://www.facebook.com/National-Forensic-Sciences-University-109193664143620" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="https://twitter.com/NFSU_Official" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.instagram.com/nfsu.official" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.youtube.com/@nationalforensicsciencesun710" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                                    <li className="list-inline-item"><a href="https://www.linkedin.com/company/gujarat-forensic-sciences-university-gfsu" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></li>
                                    {/* <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-dribbble"></i></a></li> */}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>

                {/* Back To Top  */}
                <BackToTop />
            </footer>
        </Styles>
    );
}

export default FooterTwo
