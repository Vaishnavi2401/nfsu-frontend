import React, { useEffect, useState, Component, useContext } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import IconBox from './components/IconBox';
import AboutUs from './components/AboutUs';
import CourseFilter from './components/CourseFilter';
import TestimonialSlider from './components/TestimonialSlider';
import FaqEvent from './components/FaqEvent';
import TeamSlider from './components/TeamSlider';
import HelpArea from './components/HelpArea';
import HomeBlog from './components/HomeBlog';
import CampusTour from './components/CampusTour';
import NewsletterForm from './components/NewsletterForm';
import Footer from './components/Footer';
import UserService from './services/UserService';
import service from './services/service';
import Setting from './components/common/Setting';
import FooterTwo from './components/FooterTwo';
import { GlobalContext } from './pages/courses/contentdelivery/contexts/GlobalContext';


function HomeOne(props) {

    const { setGlobalContextState } = useContext(GlobalContext)

    useEffect(() => {
        UserService.generateToken();
        const arcane = props.match.params.arcane
        setGlobalContextState(prevState => { return { ...prevState, arcane } })
        sessionStorage.setItem("arcane", arcane)
    }, []);
    // componentDidMount() {
    //     let emailid = UserService.getUserid();
    //     let ipaddress = "0.0.0.0";
    //     let action = "Login";
    //     let os = navigator.platform;
    //     let height = window.innerHeight;
    //     let width = window.innerWidth;
    //     let resolution = height + ' * ' + width;
    //     let browserName = navigator.appCodeName;
    //     let result = 0;
    //     let siteid = "siteid";
    //     let sessionId = UserService.getSessionId();
    //     if (UserService.doLogin) {
    //         service.saveUserActionDetails(emailid, ipaddress, action, os, resolution, browserName, result, siteid, sessionId)
    //             .then(res => {
    //                 
    //             })
    //     }if (UserService.doLogout){
    //         service.updateUserActionDetails(emailid, sessionId)
    //         .then(res=>{
    //             
    //         })
    //     }
    // }

    
    return (
        <div className="main-wrapper" >

            {/* Header */}
            < Header />

            {/* < Setting /> */}

            {/* Hero Slider */}
            < HeroSlider />

            {/* Icon Box */}
            < IconBox />

            {/* About Area */}
            < AboutUs />

            {/* Course Filter */}
            < CourseFilter />

            {/* Testimonial Slider */}
            < TestimonialSlider />

            {/* Faq & Event Area */}
            < FaqEvent />

            {/* Team Slider */}
            {/* < TeamSlider /> */}

            {/* Help Area */}
            {/* < HelpArea /> */}

            {/* Blog Area */}
            {/* < HomeBlog /> */}

            {/* Campus Tour */}
            {/* < CampusTour /> */}

            {/* Newsletter Form */}
            {/* < NewsletterForm /> */}

            {/* Footer */}
            < FooterTwo />
        </div >
    );
}

export default HomeOne;

