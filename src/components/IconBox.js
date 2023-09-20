import React, { Component, useEffect } from 'react';
import Datas from '../data/icon-box/icon-box.json';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/iconBox.js";
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

function IconBox() {

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

    return (
        <Styles>
            {/* Icon Box */}
            <section className="icon-box-area">
                <Container>
                    <Row>
                        {
                            Datas.map((data, i) => (
                                <Col md="4" key={i}>
                                    <div className="full-icon-box">
                                        <div className="icon-box d-flex">
                                            <div className={data.uniqClass}>
                                                <i className={data.boxIcon} style={{ fontSize: '50px' }}></i>
                                            </div>
                                            <div className="box-title">
                                                <h6>{t(data.title)}</h6>
                                                <p>{t(data.subTitle)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </section>
        </Styles>
    )
}

export default IconBox
