import React, { Component, useEffect } from 'react';
import Datas from '../data/hero/hero-slider.json';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { Styles } from "./styles/heroSlider.js";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
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
function HeroSlider() {

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

    const settings = {
        slidesPerView: 1,
        loop: true,
        speed: 3000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        watchSlidesVisibility: true,
        effect: 'fade',
        navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev'
        },
        renderPrevButton: () => (
            <div className="swiper-btn slider-button-prev"><i className="flaticon-arrow-left-th"></i></div>
        ),
        renderNextButton: () => (
            <div className="swiper-btn slider-button-next"><i className="flaticon-arrow-right-th"></i></div>
        )
    };

    return (
        <Styles>
            {/* Hero Slider */}
            <section className="hero-slider-area">
                <Swiper {...settings}>
                    {
                        Datas.map((data, i) => (
                            <div className="slider-item" key={i}>
                                <div className="image-container" style={{ textAlign: "center" }}>
                                    <img src={process.env.PUBLIC_URL + `/assets/images/${data.backgroundImage}`} className="slider-image" alt={data.backgroundImage} />
                                </div>
                                <div className="slider-table">
                                    <div className="slider-tablecell">
                                        <Container>
                                            <Row>
                                                <Col md="12">
                                                    <div className={data.uniqClass}>
                                                        <div className="slider-title">
                                                            <p>{t('welcome_to_meghSikshak')}</p>
                                                        </div>
                                                        <div className="slider-desc">
                                                            <h1>{t(data.desc)}</h1>
                                                        </div>
                                                        <div className="slider-btn">
                                                            <Link className="slider-btn1" to={process.env.PUBLIC_URL + `/${data.btnOneLink}`}>{t('our_courses')}</Link>
                                                            <Link className="slider-btn2" to={process.env.PUBLIC_URL + `/${data.btnTwoLink}`}>{t('contact_us')}</Link>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Swiper>
            </section>
        </Styles>
    )
}


export default HeroSlider
