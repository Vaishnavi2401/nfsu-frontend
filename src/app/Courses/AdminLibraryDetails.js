import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Card, Modal, OverlayTrigger, Tooltip, TabPane, Dropdown, NavDropdown } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/course1.js';
import { Styles1 } from './styles/reviewForm.js';
import service from '../../services/service';
import UserService from '../../services/UserService';
import ReplyForm from '../../pages/courses/components/ReplyForm';
import UpdateReviewform from '../../pages/courses/components/UpdateReviewForm';
import { useHistory } from 'react-router-dom';
import RenderOnAuthenticated from '../../pages/account/RenderOnAuthenticated';
import RenderOnAnonymous from '../../pages/account/RenderOnAnonymous';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import Modal1 from "react-modal";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DataTableAssessment from '../../pages/assessment/DataTableAssessment';
import DiscussionMain from '../../pages/discussion/DiscussionMain';
import { format, render, cancel, register } from 'timeago.js';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { Spinner } from 'react-bootstrap';
import CourseFeedback from '../../pages/account/CourseFeedback';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { FacebookIcon, FacebookShareButton, LinkedinShareButton, TwitterIcon, TwitterShareButton, LinkedinIcon, WhatsappIcon, WhatsappShareButton } from 'react-share';
import Timer from 'react-compound-timer';
import learnerService from '../../services/learnerService';
import instructorService from '../../services/instructorService';
import Videojs from '../../pages/instructor/instCourses/video'
import ModalVideo from 'react-modal-video';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import EnrolledAssignment from '../../pages/courses/enrolledAssignment/EnrolledAssignment';
import moment from 'moment';
import { colors } from "../../components/common/element/elements.js";
import Query from '../../pages/courses/Query/Query';
import logo from "../../assets/images/logo.png";
import CryptoJS from "crypto-js";
import {DMS_URL, COURSE_URL, PAYMENT, USER_API, Frontend_UI, COURSE_CLUG, CERTIFICATION} from "./../../services/service";


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



function AdminLibraryDetails(props) {

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
    Modal1.setAppElement('*');
    const history = useHistory();

    const decipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded => encoded.match(/.{1,2}/g)
            .map(hex => parseInt(hex, 32))
            .map(applySaltToChar)
            .map(charCode => String.fromCharCode(charCode))
            .join('');
    }

    let courseID = props.match.params.id;
    let tenantID = props.match.params.tid;
    let hashcode = tenantID.substring(0, 10);
    const myDecipher = decipher(`${hashcode}`);
    let CID = courseID.substring(10);
    let TID = tenantID.substring(10);
    let courseId = myDecipher(`${CID}`);
    let tenantId = myDecipher(`${TID}`);
    // let courseId = courseID.substring(10);
    // let tenantId = tenantID.substring(10);;
    let mainurl = `${Frontend_UI}/course-details/`;
    let url = mainurl + courseID + '/' + tenantID;
    // //console.log("tenantId in course details file" + tenantId);
    const um_api = USER_API;
    
    //

    const initialStateId = {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        gender: '',
        dob: '',
        instituteName: '',
        eduQualification: '',
        address: '',
        city: '',
        pincode: '',
        countryId: '',
        stateId: '',
        districtId: '',
        updateBy: props.match.params.updateBy,
        learnerUsername: props.match.params.learnerUsername,
        firstNameError: '',
        lastNameError: '',
        genderError: '',
        dobError: '',
        mobileError: '',
        eduQualificationError: '',
        instituteNameError: '',
        addressError: '',
        cityError: '',
        pincodeError: '',
        countryIdError: '',
        stateIdError: '',
        districtIdError: '',
        facebookId: '',
        twitterId: '',
        linkedinId: '',
        youtubeId: '',
        skypeId: '',
        facebookIdError: '',
        twitterIdError: '',
        linkedinIdError: '',
        youtubeIdError: '',
        skypeIdError: ''
    };

    const [getCourseDetails, setCourseDetails] = useState([]);
    const [getCourseStructureJson, setCourseStructureJson] = useState([]);
    const [ratingCount, setRatingCount] = useState(0);
    const [startDate, setStartDate] = useState();
    const [check, setCheck] = useState(0)
    const [courseValue, setCourseValue] = useState([]);
    const [visibility, setVisibility] = useState(true);
    const [reviewvisibility, setReviewVisibility] = useState(false);
    const [reviewvisibilitybfrlgin, setreviewvisibilitybfrlgin] = useState(false);
    const [getcourseStructure, setcourseStructure] = useState([]);
    const [getcourseStructure1, setcourseStructure1] = useState([])
    const [assessDetails, setAssessDetails] = useState([]);
    const [getCourseAnnouncement, setCourseAnnouncement] = useState([]);
    const [apiError, setApiError] = useState();
    const [msg, setmsg] = useState();
    const [msgshow, setMsgShow] = useState(true);
    const [getCertiStatus, setCertiStatus] = useState();
    const [getCertificateURl, setCertificateURL] = useState();
    const [getInstructor, setInstructor] = useState([]);
    const [getViewModalState, setViewModalState] = useState();
    const [getServerTime, setServerTime] = useState();
    const [number, setNumber] = useState();
    const [getInstCourseStatus, setInstCourseStatus] = useState();
    const [userCount, setUserCount] = useState();
    const [feeStatus, setFeesStatus] = useState(false);
    const [getUserDetails, setUserDetails] = useState(initialStateId);

    useEffect(() => {
        const fatchCourseData = async () => {
            try {
                const res = await instructorService.getCourseById(courseId);
                setCourseDetails(res.data);
                setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
            } catch (e) {
                
            }
        }
        const fatchUserCount = async () => {
            try {
                const res = await service.userCount(courseId, tenantId);
                setUserCount(res.data.userCount);
            } catch (error) {
                
            }
        }

        // const fatchRatingData = async () => {
        //     try {
        //         const res = await service.getoverallRating(courseId, tenantId);
        //         setRating(res.data);
        //         setRatingCount(res.data.length);
        //         
        //     } catch (e) {
        //         
        //     }
        // }
        // const fatchServerTime = async () => {
        //     try {
        //         const res = await instructorService.getServerTime();
        //         setStartDate(new Date(res.data));
        //     } catch (e) {
        //         
        //     }
        // }

        fatchCourseData();
        //fatchRatingData();
        // fatchServerTime();
        fatchUserCount();
    }, [])


    useEffect(() => {
        // learnerService.getCourseMetadataById(courseId)
        //     .then(res => {
        //         ////console.log('RESPPPPPP', res.data)
        //         setCourseValue(JSON.parse(res.data));
        //     }).catch(err => {
        //         swal({
        //             title: t('service_maintainance_down_alert'),
        //             text: 'Redirect to Course List',
        //             timer: 5000,

        //         }).then(() => {
        //             history.push(`${process.env.PUBLIC_URL + "/course-grid/"}`);
        //         })
        //         //setmsg(t('service_maintainance_down_alert'));                
        //     })
        //callCourseDelievery();

        // service.getCoursesById(courseId, tenantId)
        //     .then(res => {
        //         setCourseValue(res.data);
        //     })
        //     .catch(err => {
        //         setmsg(t('service_maintainance_down_alert'));
        //     })
        // if (userId) {
        //     service.getUserEnrollmentStatus(courseId, userId, 1, tenantId)
        //         .then(res => {
        //             if (res.data.courseEnrolled === true) {
        //                 setVisibility(false);
        //             }
        //             setInstCourseStatus(res.data.instCourseStatus);
        //             //setCertiStatus(res.data.certificateGenerated);
        //         })
        //         .catch(err => {
        //             //setmsg(t('service_maintainance_down_alert'));
        //             //console.log('service_maintainance_down_alert');
        //         })
        // }

        learnerService.getCourseStructureById(courseId)
            .then(res => {
                if (res.data == "Course Structure is yet to publish") {
                    swal("Message", "Please Wait Course Structure is yet to publish", "warning");
                }
                else {
                    setcourseStructure(res.data);
                    setcourseStructure1(res.data.nodes);
                    ////console.log("Folder Structure => "+res.data);
                    ////console.log('JAVA_______________', res.data)
                }

            }).catch(err => {
                setmsg(t('service_maintainance_down_alert'));
            })

        // instructorService.getServerTime()
        //     .then(res => {
        //         let serTime = res.data;
        //         setServerTime(serTime.replace(/\s/g, 'T'))
        //     })
        // service.getCourseStructure(courseId, tenantId)
        //     .then(res => {
        //         setcourseStructure(res.data)
        //         // //console.log("course items", getcourseStructure.items);
        //     }).catch(err => {
        //         setmsg(t('service_maintainance_down_alert'));
        //     })
        // service.averageRating()
        //     .then(res => {
        //         setAvgRating(res.data);
        //     }).catch(error =>
        //         //console.log(('service_maintainance_down_alert')));

        // service.courseAnnouncement(courseId, tenantId)
        //     .then(res => {
        //         setCourseAnnouncement(res.data);
        //     }).catch(error => setmsg(t('service_maintainance_down_alert')));

        // service.userCount(courseId, tenantId)
        //     .then(res => {
        //         setUserCount(res.data.userCount);
        //     }).catch(error =>
        //         
        //     )

        const accordionButton = document.querySelectorAll(".accordion-button");
        // accordionButton.forEach(button => {
        //     button.addEventListener("click", () => {
        //         button.classList.toggle("active");
        //         const content = button.nextElementSibling;

        //         if (button.classList.contains("active")) {
        //             content.className = "accordion-content show";
        //             content.style.maxHeight = content.scrollHeight + "px";
        //         } else {
        //             content.className = "accordion-content";
        //             content.style.maxHeight = "0";
        //         }


        //     });
        // });

        service.getUserById(userId)
            .then(res => {
                setUserDetails(res.data);
                ////console.log('UserDetail-------------'+res.data);
            })
            .catch(err => {
               
            });

        ////console.log("input data "+ userId + courseId + tenantId);

        // service.getPaymentDetails(userId, courseId, 1)
        //     .then(res => {
        //         ////console.log("inside");
        //         ////console.log("payment details " + res.data.status);
        //         if (res.data.status === "paid") {
        //             setFeesStatus(true);
        //         }
        //         ////console.log(JSON.stringify(res.data));
        //     })
        //     .catch(err => {
        //         //console.log("payment details error" + err);
        //     });

        getbyCourseIdandUserId();

    }, [])

    const [roleId, setRoleId] = useState("");

    const publishCourseButton = (cId) => {
        instructorService.coursePublish(cId)
            .then(async res => {
                if (res.data === "Course Published Successfully!!") {
                    await swal("Success!", "Course Published Successfully!!", "success");
                    instructorService.getCourseById(courseId)
                        .then(res => {
                            setCourseDetails(res.data);
                            setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                        })
                } else {
                    
                }
            }).catch(err => {
               
            })
    }

    const unPublishCourseButton = (cId) => {
        instructorService.courseUnPublish(cId)
            .then(async res => {
                if (res.data === "Course UnPublished Successfully!!") {
                    await swal("Success!", "Course UnPublished Successfully!!", "success");
                    instructorService.getCourseById(courseId)
                        .then(res => {
                            setCourseDetails(res.data);
                            setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                        })
                } else {
                    
                }
            }).catch(err => {
               
            })
    }

    /* course Disable funcation */
    const disableCourseButton = (cId) => {
        instructorService.CourseDisable(cId)
            .then(async res => {
                if (res.data === "Course Disabled Successfully!!") {
                    await swal("Success!", "Course Disabled Successfully!!", "success");
                    instructorService.getCourseById(courseId)
                        .then(res => {
                            setCourseDetails(res.data);
                            setCourseStructureJson(JSON.parse(res.data.courseStructureJson));
                        })
                } else {
                    
                }
            }).catch(err => {
               
            })
    }

    const getbyCourseIdandUserId = () => {

        if (userId !== " ") {
            service.getRoleIdbyCourseIdandUserId(courseId, userId)
                .then((res) => {
                    if (res.status === 200) {
                        setRoleId(res.data);
                    }
                    else {
                    }
                })
                .catch((err) => {
                })
        }
    }


    let [certificateViewButton2, setCertificateViewButton2] = useState(true);
    let [certificateViewButton, setCertificateViewButton] = useState(false);
    let [statusCer, setStatusCer] = useState(false);

    // //console.log("Course Value"+ courseValue.courseName);
    // useEffect(() => {
    //     //console.log("State Changeddddd ", certificateViewButton2);
    // }, [certificateViewButton2])

    const getQuizzesStatus = async (userId, courseId) => {
        await learnerService.getAssignedQuizzesStatus(userId, courseId)
            .then(res => {
                res.data.assignedQuizzes.map((data) => {

                    if (data.isPassed === true) {
                        setCertificateViewButton(true);
                        setStatusCer(true);
                        
                    }
                    else {
                        
                        setCertificateViewButton2(false);
                    }
                    
                    
                   
                })

            })
            .catch(err => {
               
            })
    }

    useEffect(() => {
        getQuizzesStatus(userId, courseId);
        handleContentDependOnDate();
        instructorData();
        
    }, [statusCer])

    useEffect(() => {
        handleContentDependOnDate();
    })



    // const convertDate = (dateFormat) => {
    //     let timestamp = Date.parse(dateFormat);
    //     let d = new Intl.DateTimeFormat('en-in', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(timestamp);
    //     return d;
    // }

    const convertDate = (dateFormat) => {
        // //console.log(dateFormat);
        let timestamp = Date.parse(dateFormat);
        let date = new Date(timestamp);
        let d = date.toLocaleString('en-IN', { hour12: false, timeZone: 'IST' });
        // let d = new Intl.DateTimeFormat('en-in', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(timestamp);
        return d;
    }

    const fee_validator = (fees) => {
        if (fees === 0) {
            return <p>Free</p>
        }
        else {
            return <p>&#8377;{fees}</p>
        }
    }

    const [CourseEnrollment, setCourseEnrollment] = useState({
        isLoading: false
    })

    const [getModalState2, setModalState2] = useState({
        show: false,
        path: "",
        id: ""
    })
    const [getModalState5, setModalState5] = useState({
        show: false,
        path: ""
    })


    const paymentReceiptViewHide = () => {
        setStatusForCourse({ show: false })
    }

    const redirecrToCourse = (id, tid) => {
        // var result = '';
        // let length = 10;
        // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // var charactersLength = characters.length;
        // for (var i = 0; i < length; i++) {
        //     result += characters.charAt(Math.floor(Math.random() *
        //         charactersLength));
        // }
        // const myCipher = cipher(`${result}`)
        // let cid = myCipher(`${id}`);
        // let tId = myCipher(`${tid}`);
        // let rNumber = Math.floor(Math.random() * 10000000000);
        // history.push(`${process.env.PUBLIC_URL + "/course-details/"}${rNumber}${cid}/${result}${tId}`);
        //window.location.href = `${process.env.PUBLIC_URL}/course-details/${courseId}/${tenantID}`;

        const secretKey = "cdac@123"

        const encodedCourseId = CryptoJS.AES.encrypt(
            `${id}`,
            secretKey
        ).toString();
        const safeEncodedCourseId = encodedCourseId
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        const encodedTenantId = CryptoJS.AES.encrypt(
            `${tid}`,
            secretKey
        ).toString();
        const safeEncodedTenantId = encodedTenantId
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        history.push(`${process.env.PUBLIC_URL + "/course-details/"}${safeEncodedCourseId}/${safeEncodedTenantId}`);

    }

    //const [generatedOrderId, setGenratedOrderId] = useState();
    const [clientId, setClientId] = useState();
    const [statusForCourse, setStatusForCourse] = useState({
        show: false
    });

    const [getModalState, setModalState] = useState({
        show: false
    })


    const [getModalState1, setModalState1] = useState({
        show: false
    })

    const [getcourseId, setCourseId] = useState(0);
    const [getRating, setRating] = useState([]);
    const [getreviewText, setReviewText] = useState(0)
    const [getreviewId, setreviewId] = useState(0)
    const [getureviewId, setureviewId] = useState(0)

    const [getstarrate, setstarrate] = useState(0)
    let userId = UserService.getUserid();
    let username = UserService.getUsername();
    let userEmail = UserService.getEmail();
    let id = 12;

    let reviewId = { getreviewId }

    const state = {
        rating: '',
        reviewText: '',
        learnerId: userId,
        itemId: courseId,
        reviewStatus: 'Done',
        reviewType: 1,
        ratingError: '',
        reviewTextError: '',
        tenantId: tenantId,

    }

    const [getRate, setRate] = useState(state);

    // useEffect(() => {
    //     const form = document.getElementById("form6");
    //     const desc = document.getElementById("desc6");
    //     function setError(input, message) {
    //         const formControl = input.parentElement;
    //         const errorMsg = formControl.querySelector(".input-msg6");
    //         formControl.className = "form-control error";
    //         errorMsg.innerText = message;
    //     }
    //     function setSuccess(input) {
    //         const formControl = input.parentElement;
    //         formControl.className = "form-control success";
    //     }
    // }, []);

    const validate = () => {
        let ratingError = '';
        let reviewTextError = '';
        if (!getRate.rating) {
            ratingError = t('rating_cannot_be_blank');
        }
        if (ratingError != '') {
            setRate({ ...getRate, ratingError });
            return false;
        }
        if (!getRate.reviewText) {
            reviewTextError = t('comment_cant_be_blank');
        }
        if (reviewTextError != '') {
            setRate({ ...getRate, reviewTextError });
            return false;
        }
        return true;
    }

    const [loading, setLoading] = useState();
    const saverating = () => {
        if (validate()) {
            setLoading(true);
            let review = { rating: getRate.rating, reviewText: getRate.reviewText, learnerId: getRate.learnerId, itemId: getRate.itemId, reviewStatus: getRate.reviewStatus, reviewType: getRate.reviewType, tenantId: getRate.tenantId, reviewId: 0 };
            service.createrating(review).then(async response => {
                setLoading(false);
                await swal(t('review_submited_succesfully'), t('review_submited_succesfully_alert'), "success");
                getOverAllRating();
            }).catch(err => {
                setLoading(false);
               
            });
        }
    }


    useEffect(() => {
        const courseButton = document.querySelectorAll(".course-button");
        courseButton.forEach(button => {
            button.addEventListener("click", () => {
                button.classList.toggle("active");
                const content = button.nextElementSibling;

                if (button.classList.contains("active")) {
                    content.className = "course-content show";
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.className = "course-content";
                    content.style.maxHeight = "0";
                }
            });
        });

        getOverAllRating()
    }, []);

    function getOverAllRating() {
        service.getoverallRating(courseId, tenantId)
            .then(res => {
                ////console.log("testing-------------------------"+res.data.profilePicUrl);
                setRating(res.data.filter(function (ele) {
                    return ele.tenantId == tenantId
                }))
                _checkthis(res.data);
            })
            .catch(err => {
               
            })
    }

    function _checkthis(_thisrating) {
        {
            _thisrating.map((item) => {
                if (item.learnerId == userId) {
                    setReviewVisibility(true);
                }
                if (userId == undefined) {
                    setreviewvisibilitybfrlgin(true);
                }
            })
        }
    }
    const handleModal = (rrId) => {
        setModalState({ show: true })
        setreviewId(rrId);
        //alert("reviewID:::::" + rrId);
    }

    const handleModal2 = () => {
        setModalState({ show: false })
    }

    const handleModal3 = () => {
        setModalState1({ show: false })
    }
    const handleModal4 = () => {
        setModalState2({ show: false })
    }

    const handleModal5 = () => {
        setModalState5({ show: false })
    }



    const UpdateReview = (reviewText, starrating, urid, userId) => {
        // //console.log("starrating:", starrating);
        setModalState1({ show: true })
        setReviewText(reviewText);
        setstarrate(starrating);
        setCourseId(courseId);
        setureviewId(urid);

    }

    const refreshPage = () => {
        //alert("check");
        window.location.reload();
    }



    const DeleteReview = (reviewId) => {
        //setModalState5({ show: true })
        service.deleterating(reviewId)
            .then(async res => {
                await swal(t('review_deleted_successfully'), t('You_can_check_in_the_reviews'), "success");
                refreshPage();
            })
            .catch(err => {
               
            })
        //swal("Review deleted  Successfully!", "You can check in the  Reviews!", "success");
    }
    //end of review code


    const [show, setShow] = useState(false)

    //scrolling 
    const scrollWin = () => {
        document.getElementById('Main').scrollIntoView({ behavior: 'smooth' })
        //window.scrollTo(0, 290);
    }

    const [getAvgRating, setAvgRating] = useState([]);

    const dateConverter = (dateFormat) => {
        let timeAgo = format(dateFormat, 'en_US');
        return timeAgo;
    }

    const [getAnnouncmentModal, setAnnouncementModal] = useState(false);
    const [announcementData, setAnnouncementData] = useState({
        title: '',
        body: '',
        date: ''
    })
    const AnnouncementModal = (title, body, date) => {
        setAnnouncementData({ title: title, body: body, date: date })
        setAnnouncementModal(true);
    }
    const openFeedback = (typeid, cid) => {
        history.push(`${process.env.PUBLIC_URL + "/feedback/"}${typeid}/${cid}`);
    }

    const certificateDownload = () => {
        axios({
            method: 'post',
            url: `${COURSE_CLUG}/CourseCatalouge/certificate?tenantId=${tenantId}&courseId=${courseId}&emailId=${userId}&name=${username}`,
            responseType: 'blob'
        })
            .then((res) => {
                const file = new Blob(
                    [res.data],
                    { type: 'application/pdf' });
                // const fileURL = URL.createObjectURL(file);
                // fileURL.download = "certificate";
                //setCertificateURL(fileURL);
                const url = URL.createObjectURL(file);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${courseValue.courseName} Certificate.pdf`;
                a.click();
            })
    }

    const certificateView = () => {
        setViewModalState(true);
        axios({
            method: 'post',
            url: `${COURSE_CLUG}/CourseCatalouge/certificate?tenantId=${tenantId}&courseId=${courseId}&emailId=${userId}&name=${username}`,
            responseType: 'blob'
        })
            .then((res) => {
                const file = new Blob(
                    [res.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                setCertificateURL(fileURL);
            })
    }

    const [getInstructorImg, setInstructorImg] = useState({
        img: um_api + "getprofilepic/"
    });

    const instructorData = () => {
        service.getInstructorDetails(courseId, tenantId)
            .then((res) => {
                setInstructor(res.data);
            })
            .catch(err => {
               
            })
    }

    const [getUrlModal, setUrlModal] = useState({
        show: false
    })
    const UrlModalHide = () => {
        setUrlModal({ show: false })
    }

    const [getCertificateView, setCertificateView] = useState({
        show: false
    });

    const [certificateUrl, setCertificateUrl] = useState("");
    // to download certificate 

    const [getFileURL, setFileURL] = useState(null);

    const certificateDownloadFunction = (userId, courseId, tenantId) => {

        setFileURL(null);

        learnerService.toGenerateCertificate(userId, courseId, tenantId)
            .then(res => {
                if (res.status == '200') {

                    ////console.log("toGenerateCertificate123", res);
                    
                    setCertificateUrl(res.data);


                    // var file = new File([res.data], "tempName.pdf", {
                    //     type: "application/pdf"
                    //   });
                    //   const fileURL = URL.createObjectURL(file);
                    //   //console.log("FileURL", fileURL);
                    //   setFileURL(fileURL);
                }

            }).catch(err => {
                swal("Error!", `${err} Try after sometime.`, "error");
            })

    }

    // Certificate Modal show and hide
    const handleCertificateView = () => {
        let userId = UserService.getUserid();
        let tenantId = 1;
        certificateDownloadFunction(userId, courseId, tenantId);
        setCertificateView({ show: true })
    }

    const CertificateViewHide = () => {
        setCertificateView({ show: false })
    }

    const [getUrl, setUrl] = useState();
    const [getContentType, setContentType] = useState();
    const courseStructurContentView = (contentType, fileUrl) => {
        if (contentType == "youtube") {
            setUrl(fileUrl);
            setContentType(contentType);
            setUrlModal({ show: true });
        } else {
            instructorService.contentAccess(DMS_URL+"/" + fileUrl)
                .then(res => {
                    setUrl(res.data);
                    setContentType(contentType);
                    setUrlModal({ show: true });
                }).catch(err => {
                    swal("Error!", `${err} Try after sometime.`, "error");
                })
        }
    }

    const videoJsOptions = {
        autoplay: false,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        width: 1100,
        height: 800,
        controls: true,
        sources: [
            {
                src: DMS_URL+`/${getUrl}`,
                type: 'video/mp4',
            },
        ]
    };

    const Tree = ({ data }) => (
        <Styles>
            <div className="course-content show">
                <ul class="tree1 list-unstyled">
                    {data && data.map(item => (
                        visibility === true ? <li style={{ fontSize: "16px" }}>
                            {item.nodetype == "folder" ?
                                <p style={{ borderBottom: '1px solid #dddddd' }}><span className="play-icon"><i className="las la-book-open"></i>{item.label}&nbsp;&nbsp;</span></p>
                                : null
                            }
                            {item.nodes &&
                                <ul>
                                    {<Tree data={item.nodes} />}
                                </ul>
                            }
                        </li> :
                            // <li style={{ fontSize: "16px" }}>
                            //     {item.nodetype == "folder" ?
                            //         <p style={{ borderBottom: '1px solid #dddddd' }}><span className="play-icon"><i className="las la-book-open"></i>{item.label}&nbsp;&nbsp;</span></p>
                            //         : item.nodetype == "html" ? < span className="play-icon"><i className="lab la-html5" style={{ fontSize: "25px", color: "#e54c21" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a> <span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //             : item.nodetype == "png" || item.nodetype == "jpg" ? < span className="play-icon"><i className="las la-image" style={{ fontSize: "25px", color: "#b2b1ff" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //                 : item.nodetype == "pdf" ? < span className="play-icon"><i className="las la-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //                     : item.nodetype == "mp4" ? < span className="play-icon"><i className="las la-video" style={{ fontSize: "25px", color: "#8cee02" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //                         : item.nodetype == "zip" ? < span className="play-icon"><i className="las la-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //                             : item.nodetype == "scorm" ? < span className="play-icon"><i className="las la-file-archive" style={{ fontSize: "25px", color: "green" }}></i> <a href='#' onClick={() => CourseDelivery(courseValue.courseId, 1)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                            //                                 : <span>{item.label}</span>
                            //     }
                            //     {item.nodes &&
                            //         <ul>
                            //             {<Tree data={item.nodes} />}
                            //         </ul>
                            //     }
                            // </li>
                            <li style={{ fontSize: "16px" }}>
                                {item.nodetype == "folder" ?
                                    <p style={{ borderBottom: '1px solid #dddddd' }}><span className="play-icon"><i className="las la-book-open"></i>{item.label}&nbsp;&nbsp;</span></p>
                                    : item.nodetype == "html" ? < span className="play-icon"><i className="lab la-html5" style={{ fontSize: "25px", color: "#e54c21" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a> <span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                                        : item.nodetype == "png" || item.nodetype == "jpg" ? < span className="play-icon"><i className="las la-image" style={{ fontSize: "25px", color: "#b2b1ff" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                                            : item.nodetype == "pdf" ? < span className="play-icon"><i className="las la-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                                                : item.nodetype == "mp4" ? < span className="play-icon"><i className="las la-video" style={{ fontSize: "25px", color: "#8cee02" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                                                    : item.nodetype == "zip" ? < span className="play-icon"><i className="las la-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                                                        : item.nodetype == "scorm" ? < span className="play-icon"><i className="las la-file-archive" style={{ fontSize: "25px", color: "green" }}></i> <a href='#' onClick={() => courseStructurContentView(item.nodetype, item.filePath)}>{item.label}&nbsp;&nbsp; </a><span className="lecture-duration">{item.duration == undefined ? null : <p>Duration {item.duration}</p>}</span></span>
                                                            : <span>{item.label}</span>
                                }
                                {item.nodes &&
                                    <ul>
                                        {<Tree data={item.nodes} />}
                                    </ul>
                                }
                            </li>
                    ))}
                </ul>

            </div>
        </Styles >
    );

    let sTime = getServerTime;
    let cTime = courseValue.closingDate;
    let d1 = new Date(sTime);
    let d2 = new Date(cTime);
    let diffTime = Math.abs(d2.getTime() - d1.getTime());
    let n = new Number(diffTime)
    let arrrr = [
        {
            time: 123132132
        }
    ]


    const toggleHandler = (key) => {
        const updatedCourseStructure = getcourseStructure1.map((singleData, index) => {
            if (singleData.key === key) {
                return { ...singleData, isActive: !(singleData.isActive) }
            }
            return singleData;
        })

        setcourseStructure1(updatedCourseStructure)
    }

    function sumOfAllContentDuration(data) {
        if (data.length === 0) {
            data = "";
        } else {
            var res = data && data.map(d => d.duration).reduce((a, b) => b + a);
            return res;
        }
    }

    function dateCompareFunction(sysDate, enrolmentSDate) {
        const x = new Date(sysDate);
        const y = new Date(enrolmentSDate);
        return (x >= y);
    }

    function getVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    const [fullscreen, setFullscreen] = useState(true);
    const [show2, setShow2] = useState(false);

    function handleShow() {
        setShow2(true);
    }

    const cipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const byteHex = n => ("0" + Number(n).toString(32)).substr(-2);
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return text => text.split('')
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join('');
    }

    const callCourseDelievery = () => {

        // if (showContentDependOnDate === true && visibility !== true) {
        //     if (setCheck == 1) {
        //         history.goForward();
        //     }
        //     else {
        CourseDelivery(courseValue.courseId, 1);
        //     }
        // }
    }
    ////console.log("course structure"+getcourseStructure1);

    const CourseDelivery = (id, tid) => {
        setCheck(1);
        var result = '';
        let length = 10;
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        const myCipher = cipher(`${result}`)
        let cid = myCipher(`${id}`);
        let tId = myCipher(`${tid}`);
        let rNumber = Math.floor(Math.random() * 10000000000);
        history.push(`${process.env.PUBLIC_URL + "/ContentDelivery/"}${rNumber}${cid}/${result}${tId}`);
    }

    // data filter depend on end date
    const [showContentDependOnDate, ContentDependOnDate] = useState(true);
    const dateLimit = moment(courseValue.closingDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    const now = moment();

    const handleContentDependOnDate = () => {
        ////console.log("----------------------------------");
        const dateLimit = moment(courseValue.closingDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
        const now = moment();
        ////console.log(courseValue.closingDate);
        ////console.log(now, dateLimit);
        //let dateNew = new Date();
        ////console.log(convertDate(dateNew) , convertDate(courseValue.closingDate))
        if (dateLimit.isValid() && dateLimit.isAfter(now)) { ContentDependOnDate(true); } // show content if current date is less than end date
    };

    function changeBackgroundOver(e) {
        e.target.style.background = 'linear-gradient(90deg, #009444 0%, #11B67A 100%)';
        e.target.style.border = '0px';
    }

    function changeBackgroundOut(e) {
        e.target.style.background = 'linear-gradient(90deg, #11B67A 0%, #009444 100%)';
        e.target.style.border = '0px';
    }

    const [downloadCertificateicon, setDownloadCertificateicon] = useState(false);

    function changeBackgroundOverCertiButton(e) {
        //e.target.style.background = 'linear-gradient(90deg, #009444 0%, #11B67A 100%)';
        e.target.style.border = '0px';
        setDownloadCertificateicon(true);
    }

    function changeBackgroundOutCertiButton(e) {
        e.target.style.background = 'linear-gradient(90deg, #11B67A 0%, #009444 100%)';
        e.target.style.border = '0px';
        setDownloadCertificateicon(false);
    }

    ////console.log("CourseMeta Data-----------"+courseValue.courseFee);

    const scrollToView = () => {
        const ele = document.getElementById('Tab');
        ele.scrollIntoView({ behavior: 'smooth' })
        //ele.scrollIntoView({behavior : 'smooth'})
        ////console.log("SCROLLLLLLL")
    }

    ////console.log("new role id ----------------" + roleId);

    return (
        <div className="main-wrapper course-details-page" onLoad={() => scrollWin()}>

            {/* Header 2 */}
            < HeaderTwo />

            {/* Breadcroumb */}
            {/* < BreadcrumbBox title="Course Details" bannerUrl={`${COURSE_URL}/${courseValue.banner}`} /> */}
            < BreadcrumbBox title={courseValue.categoryName} />


            <Styles>
                {/* Course Details */}
                {msg == null ? null :
                    <Toast show={msgshow} style={{ right: 0, backgroundColor: '#17a2b8', color: 'white', width: '300px' }} className="position-absolute top-0 end-0 m-4" onClose={() => setMsgShow(false)} delay={5000} autohide>
                        <Toast.Header style={{ fontSize: '15px' }}>
                            <i class="las la-info-circle"></i>
                            <strong className="mr-auto">Info</strong>
                            <small>Just Now</small>
                        </Toast.Header>
                        <Toast.Body >
                            {msg}
                        </Toast.Body>
                    </Toast>
                }
                <section className="course-details-area" id='Main'>
                    <Container>
                        <Row>
                            {/* <Col lg="8" md="7" sm="12"> */}
                            <div className="course-details-top">
                                <Col lg="8" md="7" sm="12">
                                    <div className="heading">
                                        <h4 dangerouslySetInnerHTML={{ __html: courseValue.courseName }}></h4>
                                        {/* <p dangerouslySetInnerHTML={{ __html: getCourseDetails.generalDetails }}></p> */}
                                    </div>

                                    <div className="course-top-overview">
                                        <div className="d-flex overviews">
                                            {/* <div className="author">
                                                <img src={process.env.PUBLIC_URL + `/assets/images/author.jpg`} alt="" />
                                                <i className="las la-chalkboard-teacher" style={{ fontSize: "32px", marginLeft: "10px" }}></i>
                                                <div className="author-name">
                                                    <h6>{t('author')}</h6>
                                                    <p>-</p>
                                                </div>
                                            </div> */}


                                            <div className="category">
                                                <h6>{t('category')}</h6>
                                                <p dangerouslySetInnerHTML={{ __html: courseValue.categoryName }}></p>
                                            </div>
                                            <div className="rating">
                                                <h6>{t('rating')}</h6>
                                                <ul className="list-unstyled list-inline">
                                                    {
                                                        getAvgRating.map((d) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 1 ?
                                                                            <>
                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                            </>
                                                                            : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 1.1 || d.avgScore == 1.2 || d.avgScore == 1.3 || d.avgScore == 1.4 || d.avgScore == 1.5 || d.avgScore == 1.6 || d.avgScore == 1.7 || d.avgScore == 1.8 || d.avgScore == 1.9 ?
                                                                                <>
                                                                                    <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                    <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                </>

                                                                                : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 2 ?
                                                                                    <>
                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                    </>

                                                                                    : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 2.1 || d.avgScore == 2.2 || d.avgScore == 2.3 || d.avgScore == 2.4 || d.avgScore == 2.5 || d.avgScore == 2.6 || d.avgScore == 2.7 || d.avgScore == 2.8 || d.avgScore == 2.9 ?
                                                                                        <>
                                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                            <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                        </>
                                                                                        : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 3 ?
                                                                                            <>
                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                            </>
                                                                                            : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 3.1 || d.avgScore == 3.2 || d.avgScore == 3.3 || d.avgScore == 3.4 || d.avgScore == 3.5 || d.avgScore == 3.6 || d.avgScore == 3.7 || d.avgScore == 3.8 || d.avgScore == 3.9 ?
                                                                                                <>
                                                                                                    <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                                </>
                                                                                                : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 4 ?
                                                                                                    <>
                                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    </>
                                                                                                    : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 4.1 || d.avgScore == 4.2 || d.avgScore == 4.3 || d.avgScore == 4.4 || d.avgScore == 4.5 || d.avgScore == 4.6 || d.avgScore == 4.7 || d.avgScore == 4.8 || d.avgScore == 4.9 ?
                                                                                                        <>
                                                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                                        </>
                                                                                                        : tenantId == d.tenantId && courseId == d.itemId ? d.avgScore == 5 ?
                                                                                                            <>
                                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({tenantId == d.tenantId && courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                            </>
                                                                                                            : null : null : null : null : null : null : null : null : null : null
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <div className="price">
                                                <h6>{t('course_fee')}</h6>
                                                {fee_validator(courseValue.courseFee)}
                                            </div>


                                            <div style={{ position: 'absolute', left: '90%' }}>
                                                {certificateViewButton && certificateViewButton2 && (<RenderOnAuthenticated>
                                                    {
                                                        visibility === true ?
                                                            (dateCompareFunction(convertDate(getServerTime), convertDate(courseValue.enrollmentEndDate)) ?
                                                                " " :
                                                                getInstCourseStatus == 2 ? " " :
                                                                    " ")
                                                            : <button type="button" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)', borderRadius: '5px', border: '0px' }} onClick={handleCertificateView} onMouseOver={changeBackgroundOverCertiButton} onMouseOut={changeBackgroundOutCertiButton}>
                                                                {!downloadCertificateicon && (
                                                                    <i class="las la-certificate la-3x" style={{ color: 'white' }}></i>
                                                                )}
                                                                {downloadCertificateicon && (
                                                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Course Certificate</Tooltip>}>
                                                                        <i class="las la-download la-3x" style={{ color: 'white' }}></i>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </button>

                                                    }
                                                    {/* {getFileURL !== null && <iframe src={`http://gfsu2.hyderabad.cdac.in:8083/certificate/gencert/687b7083-fda7-461c-b25a-dc142b906a8f/1/1`} style={{width:'0px', height:'0px', color:"white",backgroundColor:"white"}}></iframe>} */}
                                                    <br></br>
                                                </RenderOnAuthenticated>)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="course-details-banner">
                                        <img src={`${COURSE_URL}/${courseValue.imageUrl}`} alt="" className="img-fluid" style={{ height: 425, width: 825 }} />
                                    </div>
                                </Col>

                                <Col lg="4" md="5" sm="12">
                                    <div className="single-details-sidbar-courseDetails">
                                        <Row>
                                            <Col md="12">
                                                <div className="course-details-feature">
                                                    <h5 className="title">Course Details</h5>
                                                    {/* <div className="event-sidebar-timer text-center">
                                                    <Timer initialTime={1040 * 970 * 980} direction="backward">
                                                        <p><Timer.Days /><span>Days</span></p>
                                                        <p><Timer.Hours /><span>Hours</span></p>
                                                        <p><Timer.Minutes /><span>Minutes</span></p>
                                                    </Timer>
                                                </div> */}
                                                    <ul className="list-unstyled feature-list">
                                                        <li><i className="far fa-calendar-check"></i> {t('enrollment_start_date')}: <span>{convertDate(getCourseDetails.enrollStartDate)}</span></li>
                                                        <li><i className="far fa-calendar-check"></i> {t('enrollment_end_date')}: <span>{convertDate(getCourseDetails.enrollEndDate)}</span></li>
                                                        <li><i className="far fa-calendar-check"></i> {t('course_Publish_Date')}: <span>{convertDate(getCourseDetails.publishDate)}</span></li>
                                                        <li><i className="far fa-calendar-check"></i> Commence Date: <span>{convertDate(getCourseDetails.commenceDate)}</span></li>
                                                        <li><i className="far fa-calendar-check"></i> Closing Date: <span>{convertDate(getCourseDetails.closingDate)}</span></li>
                                                        <li><i className="far fa-clock"></i> {t('duration')}: <span>{getCourseDetails.duration == 1825 ? "Unlimited" : getCourseDetails.duration} Days</span></li>
                                                        <li><i className="fas fa-globe-asia"></i> {t('language1')}: <span>{t('english')}</span></li>
                                                        <li><i className="far fa-bookmark"></i> {t('enrolled')}: <span>{userCount}</span></li>
                                                        <li><i className="fas fa-certificate"></i> {t('certification')}: <span>{t('yes')}</span></li>
                                                    </ul>
                                                    <ul className="feature-list">
                                                        {
                                                            getCourseDetails.status === "C" ?
                                                                <>
                                                                    <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">Disable Course</button></li>
                                                                    <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">Request to Publish Course</button></li>
                                                                </> : getCourseDetails.status === "P" ?
                                                                    <>
                                                                        {userCount == 0 ? <li><button type="button" onClick={() => unPublishCourseButton(courseId)} className="enroll-btn">UnPublish Course</button></li> : null}
                                                                        <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">Disable Course</button></li>
                                                                        <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">Course Published</button></li>
                                                                    </>
                                                                    : getCourseDetails.status === "U" ?
                                                                        <>
                                                                            <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">Disable Course</button></li>
                                                                            <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">Request to Publish Course</button></li>
                                                                        </>
                                                                        : getCourseDetails.status === "D" ?
                                                                            <>
                                                                                <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">Enable Course</button></li>
                                                                            </>
                                                                            : getCourseDetails.status === "R" ?
                                                                                <>
                                                                                    <>
                                                                                        {userCount == 0 ? <li><button type="button" onClick={() => unPublishCourseButton(courseId)} className="enroll-btn">UnPublish Course</button></li> : null}
                                                                                        <li><button type="button" onClick={() => disableCourseButton(courseId)} className="enroll-btn">Disable Course</button></li>
                                                                                        <li><button type="button" onClick={() => publishCourseButton(courseId)} className="enroll-btn">Publish Course</button></li>
                                                                                    </>
                                                                                </>
                                                                                : null
                                                        }



                                                    </ul>
                                                    <ul className="list-unstyled feature-list">
                                                        {getCourseStructureJson.lastPublishedDate == undefined ? null :
                                                            <li>Last Published Date: <span>{getCourseStructureJson.lastPublishedDate}</span></li>
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div className='single-details-sidbar-announcement'>
                                        {/* <Col md="12">
                                                <PopularCourse />
                                            </Col> */}
                                        <Row>
                                            <RenderOnAuthenticated>
                                                {visibility ?
                                                    null
                                                    :
                                                    <Col md="12" >
                                                        <div>
                                                            <div className="course-details-feature">
                                                                <Dropdown autoClose='inside' >
                                                                    <h5 className="title">{t('announcement')}
                                                                        <i style={{ marginLeft: '110px' }} className="las la-bullhorn la-lg " >
                                                                        </i>{
                                                                            getCourseAnnouncement.length == 0
                                                                                ?
                                                                                null
                                                                                :
                                                                                <span className="badge">{getCourseAnnouncement.length}</span>
                                                                        }
                                                                    </h5>
                                                                    <Dropdown.Toggle className='view-announcement'>Show Announcement</Dropdown.Toggle>

                                                                    <Dropdown.Menu >
                                                                        <div className='announcement-content'>
                                                                            {
                                                                                getCourseAnnouncement.length === 0 ? <li style={{ fontWeight: 'bold', padding: '10px' }} className="noti-text-dup">No Announcment</li> :
                                                                                    <ul className="list-unstyled feature-list" style={{ overflowY: 'auto', height: "250px" }}>
                                                                                        {getCourseAnnouncement.map((data) => {
                                                                                            return (
                                                                                                <li style={{ padding: '10px' }} className="noti-text-dup" onClick={() => AnnouncementModal(data.title, data.body, dateConverter(data.publihFrom))}>{data.title}</li>
                                                                                            )
                                                                                        })}
                                                                                    </ul>
                                                                            }
                                                                        </div>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>


                                                            </div>

                                                        </div>

                                                    </Col>
                                                }
                                            </RenderOnAuthenticated>
                                        </Row>

                                    </div>
                                </Col>
                            </div >
                            {/* </Col> */}
                        </Row>
                    </Container>
                </section>
                <section className="course-details-area" id='Tab'>
                    <Container >
                        <Row>
                            <div className="course-tab-list" >
                                <Tab.Container defaultActiveKey="overview" >
                                    <Nav className="flex-column" onClick={() => scrollToView()} >
                                        <Nav.Item>
                                            <Nav.Link eventKey="overview">{t('overview')}</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { callCourseDelievery(); }} eventKey="curriculum" >{t('curriculum')}</Nav.Link>
                                        </Nav.Item>
                                        {/* <RenderOnAuthenticated>
                                            {visibility ?
                                                null
                                                :
                                                <Nav.Item>
                                                    <Nav.Link eventKey="assignment">{t('assignment')}</Nav.Link>
                                                </Nav.Item>
                                            }
                                        </RenderOnAuthenticated> */}
                                        <Nav.Item>
                                            <Nav.Link eventKey="instructor">Instructor</Nav.Link>
                                        </Nav.Item>
                                        <RenderOnAuthenticated>
                                            <Nav.Item>
                                                <Nav.Link eventKey="feedback">{t('feedback')}</Nav.Link>
                                            </Nav.Item>
                                        </RenderOnAuthenticated>
                                        <Nav.Item>
                                            <Nav.Link eventKey="review">{t('reviews')}</Nav.Link>
                                        </Nav.Item>
                                        {/* <RenderOnAuthenticated>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="assessment">{t('assessment')}</Nav.Link>
                                                </Nav.Item>
                                        </RenderOnAuthenticated> */}

                                        <RenderOnAuthenticated>
                                            <Nav.Item>
                                                <Nav.Link eventKey="discussion">Discussion</Nav.Link>
                                            </Nav.Item>
                                        </RenderOnAuthenticated>
                                        <RenderOnAuthenticated>
                                            <Nav.Item>
                                                <Nav.Link eventKey="query">Query</Nav.Link>
                                            </Nav.Item>
                                        </RenderOnAuthenticated>
                                    </Nav>
                                    <Tab.Content >
                                        <Tab.Pane eventKey="query" className="overview-tab">
                                            <Query courseid={courseId} tenantid={tenantId} userid={userId} itemid={courseId} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="discussion" className="overview-tab">
                                            <DiscussionMain courseid={courseId} tenantid={tenantId} userid={userId} itemid={courseId} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="overview" className="overview-tab">
                                            <div className="course-desc">
                                                <h5>{t('course_description')}</h5>
                                                <p dangerouslySetInnerHTML={{ __html: courseValue.generalDetails }}></p>
                                            </div>
                                            <div className="course-feature">
                                                <h5>{t('course_prerequisite')}</h5>
                                                <p dangerouslySetInnerHTML={{ __html: courseValue.prerequisite }}></p>
                                            </div>
                                            <div className="course-feature">
                                                <h5>Course Objective</h5>
                                                <p dangerouslySetInnerHTML={{ __html: courseValue.objective }}></p>
                                            </div>

                                            <div className="course-share">
                                                <h5>{t('share_this_course')}</h5>
                                                <ul className="social list-unstyled list-inline">
                                                    {/* <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-facebook-f"></i></a></li>
                                                            <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-twitter"></i></a></li>
                                                            <li className="list-inline-item"><a href={process.env.PUBLIC_URL + "/"}><i className="fab fa-linkedin-in"></i></a></li> */}
                                                    <li className="list-inline-item">
                                                        <FacebookShareButton url={url} quote={"Share this course"} >
                                                            <FacebookIcon logoFillColor="white" round={true} size={32}></FacebookIcon>
                                                        </FacebookShareButton>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <TwitterShareButton url={url} quote={"Share this course"}>
                                                            <TwitterIcon logoFillColor="white" round={true} size={32}></TwitterIcon>
                                                        </TwitterShareButton>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <LinkedinShareButton url={url} quote={"Share this course"}>
                                                            <LinkedinIcon logoFillColor="white" round={true} size={32}></LinkedinIcon>
                                                        </LinkedinShareButton>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <WhatsappShareButton url={url} title="Share course">
                                                            <WhatsappIcon logoFillColor="white" round={true} size={32}></WhatsappIcon>
                                                        </WhatsappShareButton>
                                                    </li>

                                                </ul>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="curriculum" className="curriculum-tab">
                                            <div className="course-element">
                                                {/* <h5>{getcourseStructure.label}
                                                            {visibility ? null : <Link className="nav-link pull-right" onClick={() => CourseDelivery(courseValue.courseId, 1)}>Content View</Link>}
                                                        </h5> */}
                                                {/* {showContentDependOnDate && (<div>
                                                            {getcourseStructure1.map((d) => {
                                                                return (

                                                                    
                                                                    <div className="course-item">
                                                                        <button className="course-button active" onClick={() => { toggleHandler(d.key) }}>{d.label} <span>{sumOfAllContentDuration(d.nodes)} Min</span></button>
                                                                        {visibility ? null : <div className={`course-content ${d.isActive ? "" : "show"}`}>
                                                                            <ul className="list-unstyled">
                                                                                {d.nodes.map((f) => {
                                                                                    return (
                                                                                        <li>
                                                                                            <span className="play-icon"><i className={f.nodetype == "pdf" ? "fas fa-file-pdf" : f.nodetype == "docx" || f.nodetype == "doc" ? "fas fa-file-word" :
                                                                                                f.nodetype == "html" ? "fab fa-html5" : f.nodetype == "txt" ? "fas fa-file-alt" : f.nodetype == "scorm" ? "far fa-file-archive" : f.nodetype == "youtube" ? "fab fa-youtube" :
                                                                                                    f.nodetype == "mp4" || f.nodetype == "webm" || f.nodetype == "ogg" ? "fas fa-file-video" : f.nodetype == "jpg" || f.nodetype == "png" || f.nodetype == "jpeg" ? "fas fa-file-image"
                                                                                                        : null} style={{ cursor: 'pointer' }} onClick={() => CourseDelivery(courseValue.courseId, 1)}></i> {f.label}</span>
                                                                                            <span className="lecture-duration">{f.duration}:00</span>
                                                                                        </li>
                                                                                    )
                                                                                })}
                                                                            </ul>
                                                                        </div>}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>)} */}
                                                {/* {(!showContentDependOnDate || visibility === true) && (<div>
                                                    {getcourseStructure1.map((d) => {
                                                        return (
                                                            <div className="course-item">
                                                                <button className="course-button active" onClick={() => { toggleHandler(d.key) }}>{d.label} <span>{sumOfAllContentDuration(d.nodes)} Min</span></button>
                                                                {visibility ? null : <div className={`course-content ${d.isActive ? "" : "show"}`}>
                                                                    <ul className="list-unstyled">
                                                                        {d.nodes.map((f) => {
                                                                            return (
                                                                                <li>
                                                                                    <span className="play-icon"><i className={f.nodetype == "pdf" ? "fas fa-file-pdf" : f.nodetype == "docx" || f.nodetype == "doc" ? "fas fa-file-word" :
                                                                                        f.nodetype == "html" ? "fab fa-html5" : f.nodetype == "txt" ? "fas fa-file-alt" : f.nodetype == "scorm" ? "far fa-file-archive" : f.nodetype == "youtube" ? "fab fa-youtube" :
                                                                                            f.nodetype == "mp4" || f.nodetype == "webm" || f.nodetype == "ogg" ? "fas fa-file-video" : f.nodetype == "jpg" || f.nodetype == "png" || f.nodetype == "jpeg" ? "fas fa-file-image"
                                                                                                : null} style={{ cursor: 'pointer' }} onClick={() => courseStructurContentView(f.nodetype, f.filePath)}></i> {f.label}</span>
                                                                                    <span className="lecture-duration">{f.duration}:00</span>
                                                                                </li>
                                                                            )
                                                                        })}
                                                                    </ul>
                                                                </div>}
                                                            </div>
                                                        )
                                                    })}
                                                </div>)} */}
                                                {

                                                    <div>
                                                        {getcourseStructure1.map((d) => {
                                                            return (
                                                                <div className="course-item">
                                                                    <button className="course-button active" onClick={() => { toggleHandler(d.key) }}>{d.label} <span>{sumOfAllContentDuration(d.nodes)} Min</span></button>
                                                                    {visibility ? <></> : <div className={`course-content ${d.isActive ? "" : "show"}`}>
                                                                        <ul className="list-unstyled">
                                                                            {d.nodes.map((f) => {
                                                                                return (
                                                                                    <li>
                                                                                        <span className="play-icon"><i className={f.nodetype == "pdf" ? "fas fa-file-pdf" : f.nodetype == "docx" || f.nodetype == "doc" ? "fas fa-file-word" :
                                                                                            f.nodetype == "html" ? "fab fa-html5" : f.nodetype == "txt" ? "fas fa-file-alt" : f.nodetype == "scorm" ? "far fa-file-archive" : f.nodetype == "youtube" ? "fab fa-youtube" :
                                                                                                f.nodetype == "mp4" || f.nodetype == "webm" || f.nodetype == "ogg" ? "fas fa-file-video" : f.nodetype == "jpg" || f.nodetype == "png" || f.nodetype == "jpeg" ? "fas fa-file-image"
                                                                                                    : null} style={{ cursor: 'pointer' }} onClick={() => courseStructurContentView(f.nodetype, f.filePath)}></i> {f.label}</span>
                                                                                        <span className="lecture-duration">{f.duration}:00</span>
                                                                                    </li>
                                                                                )
                                                                            })}
                                                                        </ul>
                                                                    </div>}
                                                                </div>
                                                            )
                                                        }
                                                        )
                                                        }
                                                    </div>

                                                }


                                            </div>

                                            {/* <div className="items"> {items}</div > */}

                                            {/* <div className="course-element">
                                                        <h5>{getcourseStructure.label}</h5>
                                                        <div className="course-item">
                                                            <Tree data={getcourseStructure.nodes} />
                                                        </div>
                                                    </div> */}

                                        </Tab.Pane>
                                        <Tab.Pane eventKey="assessment" className="assessment-tab">
                                            {showContentDependOnDate && (<RenderOnAuthenticated>
                                                <DataTableAssessment tenantId={tenantId} courseId={courseId} />
                                            </RenderOnAuthenticated>)}
                                            {!showContentDependOnDate && (<RenderOnAuthenticated>
                                                <p>The course has been closed.</p>
                                            </RenderOnAuthenticated>)}

                                        </Tab.Pane>
                                        <Tab.Pane eventKey="instructor" className="instructor-tab">
                                            <h5>Course Instructor</h5>
                                            <div className='instructor-box'>
                                                <div className="instructor-item">
                                                    {
                                                        getInstructor.map((data, i) => {
                                                            
                                                            return (
                                                                <Row>
                                                                    {/* <Col md="4"> */}
                                                                    <div className="instructor-img">
                                                                        <img src={`${getInstructorImg.img}${data.learnerUsername}`} alt="" className="img-fluid" style={{ width: '110px' }} />
                                                                    </div>
                                                                    {/* </Col> */}
                                                                    <Col md="8">
                                                                        <div className="instructor-content">
                                                                            <div className="instructor-box">
                                                                                <div className="top-content " >
                                                                                    {/* d-flex justify-content-between  */}
                                                                                    <div >
                                                                                        <div className="instructor-name">
                                                                                            <h6>{data.firstName} {data.lastName
                                                                                            }</h6>
                                                                                            <p>{courseValue.inst_profile}</p>
                                                                                            <br />
                                                                                            <p>EMAIL ID - {data.email}</p>

                                                                                        </div>
                                                                                        <div className="instructor-social">
                                                                                            <ul className="social list-unstyled list-inline">
                                                                                                {data.facebookId === "" ? null :
                                                                                                    <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a target="_blank" href={"https://www.facebook.com/" + data.facebookId}><i className="fab fa-facebook-f"></i></a></li>
                                                                                                }
                                                                                                {data.twitterId === "" ? null :
                                                                                                    <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.twitter.com/" + data.twitterId} target="_blank"><i className="fab fa-twitter"></i></a></li>
                                                                                                }
                                                                                                {data.linkedinId === "" ? null :
                                                                                                    <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.linkedin.com/in/" + data.linkedinId} target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                                                                                                }
                                                                                                {data.youtubeId === "" ? null :
                                                                                                    <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.youtube.com/" + data.youtubeId} target="_blank"><i className="fab fa-youtube"></i></a></li>
                                                                                                }
                                                                                                {data.skypeId === "" ? null :
                                                                                                    <li className="list-inline-item" style={{ margin: 5, marginTop: 10 }}><a href={"https://www.skype.com/" + data.skypeId} target="_blank"><i className="fab fa-skype"></i></a></li>
                                                                                                }
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="instructor-desk">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        })
                                                    }
                                                </div>

                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="feedback">
                                            <CourseFeedback typeid={1} cid={courseId} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="review" className="review-tab">
                                            <Row>
                                                <div className="review-comments">
                                                    <h5>{t('course_reviews')}</h5>
                                                    {getRating.map((rate) => {
                                                        const timestamp = Date.parse(rate.creationTime);
                                                        const starrating = (rate.rating)
                                                        return (
                                                            < div className="comment-box d-flex" >
                                                                <div className="comment-image">
                                                                    <img src={rate.profilePicUrl} alt="" />
                                                                </div>
                                                                <div className="comment-content">
                                                                    <div className="content-title d-flex justify-content-between">
                                                                        <div className="comment-writer">
                                                                            <h6>{rate.firstName} {rate.lastName}</h6>
                                                                            <p>{new Intl.DateTimeFormat('en-in', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)}</p>
                                                                            <ul className="list-unstyled list-inline">
                                                                                {rate.rating == 1 ?
                                                                                    <>
                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({rate.rating})</li>
                                                                                    </>
                                                                                    : rate.rating == 2 ?
                                                                                        <>
                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({rate.rating})</li>
                                                                                        </>
                                                                                        : rate.rating == 3 ?
                                                                                            <>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({rate.rating})</li>
                                                                                            </>
                                                                                            : rate.rating == 4 ?
                                                                                                <>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({rate.rating})</li>
                                                                                                </>
                                                                                                : rate.rating == 5 ?
                                                                                                    <>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({rate.rating})</li>
                                                                                                    </>
                                                                                                    : null}
                                                                            </ul>
                                                                        </div>
                                                                        <div className="reply-btn">
                                                                            {rate.learnerId == userId ? <><button type="button" onClick={() => UpdateReview(rate.reviewText, rate.rating, rate.reviewId, userId)}>
                                                                                <i className="fas fa-edit"></i></button>&nbsp;&nbsp;&nbsp;
                                                                                <button type="button" onClick={() => { DeleteReview(rate.reviewId); }}><i className="fas fa-trash-alt"></i></button></>
                                                                                : null}
                                                                        </div>
                                                                    </div>
                                                                    <div className="comment-desc">
                                                                        <p>{rate.reviewText}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                </div>
                                                {reviewvisibility == true || reviewvisibilitybfrlgin == true ?
                                                    <>
                                                        <section className="registration-area" id="formRegistration">
                                                            <Container>
                                                                <Row>
                                                                    <Col md="12">
                                                                        <div className="registration-box">
                                                                            <div className="registration-title text-center">
                                                                                {/* <h3>Review Already Submitted for this Course </h3> */}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        </section>
                                                    </>

                                                    : visibility == true ?
                                                        null
                                                        : <>
                                                            <div className="review form" >
                                                                <h5>Rate the Course</h5>
                                                                <br></br>
                                                                <Styles1>
                                                                    <form id="form6" className="form review-comment-form">
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <div className="star-rating">
                                                                                    <input type="radio" name="rating" value="5" defaultValue={getRate.rating} onChange={e => setRate({ ...getRate, rating: e.target.value })} id="rate-5" />
                                                                                    <label htmlFor="rate-5" className="las la-star"></label>
                                                                                    <input type="radio" value="4" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-4" />
                                                                                    <label htmlFor="rate-4" className="las la-star"></label>
                                                                                    <input type="radio" value="3" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-3" />
                                                                                    <label htmlFor="rate-3" className="las la-star"></label>
                                                                                    <input type="radio" value="2" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-2" />
                                                                                    <label htmlFor="rate-2" className="las la-star"></label>
                                                                                    <input type="radio" value="1" onChange={e => setRate({ ...getRate, rating: e.target.value })} name="rating" id="rate-1" />
                                                                                    <label htmlFor="rate-1" className="las la-star"></label>
                                                                                </div>
                                                                                <div>
                                                                                    <p style={{ fontSize: 12, color: "red" }}>
                                                                                        {getRate.ratingError}
                                                                                    </p>
                                                                                </div>
                                                                            </Col>
                                                                            <Col md="12">
                                                                                <p className="form-control">
                                                                                    <textarea name="reviewText"

                                                                                        id="desc6" onChange={e => setRate({ ...getRate, reviewText: e.target.value })} placeholder="Submit your review comments"></textarea>
                                                                                    <span className="input-msg6"></span>
                                                                                </p>
                                                                                <p style={{ fontSize: 12, color: "red" }}>
                                                                                    {getRate.reviewTextError}
                                                                                </p>
                                                                            </Col>

                                                                            <Col md="12">
                                                                                {loading ? <button type="button" ><div class="spinner-border" role="status">
                                                                                    <span class="sr-only">Loading...</span>
                                                                                </div>  Submitting</button>
                                                                                    : <button type="button" onClick={() => { saverating() }}>Submit</button>}
                                                                            </Col>
                                                                        </Row>
                                                                    </form>
                                                                </Styles1>
                                                            </div>
                                                        </>}
                                                <br></br>
                                                <br></br>
                                            </Row>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="assignment" >

                                            {/* <AssignmentMain userId={userId} courseId={courseId} tenantId={tenantId} /> */}


                                            {showContentDependOnDate && (<RenderOnAuthenticated>
                                                <EnrolledAssignment courseID={courseId} tenantID={tenantId} />
                                                {/* <AssignmentMain userId={userId} courseId={courseId} tenantId={tenantId} /> */}
                                            </RenderOnAuthenticated>)}
                                            {!showContentDependOnDate && (<RenderOnAuthenticated>
                                                <p>The course has been closed.</p>
                                            </RenderOnAuthenticated>)}
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="certificate" >
                                            <Button variant="outline-info" onClick={() => certificateDownload()}>Download <i class="las la-download la-lg"></i></Button>
                                            <Button variant="outline-info" onClick={() => certificateView()}>View <i class="las la-eye la-lg"></i></Button>
                                            {/* <iframe src={getCertificateURl} width="725px" height="800px" /> */}
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </div>



                        </Row>
                    </Container>
                </section>
                <Modal
                    centered show={getModalState.show} onHide={() => handleModal2()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Provide the reply
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReplyForm rrId={getreviewId} />
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
                <Modal
                    centered show={getModalState1.show} onHide={() => handleModal3()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Review
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateReviewform reviewdata={getreviewText} starrating={getstarrate} courseid={getcourseId} ureviewid={getureviewId} learnerId={userId} tenantId={tenantId} />
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
                <Modal
                    centered show={getModalState5.show} onHide={() => handleModal5()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {t('review_deleted_successfully')}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
                <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={getAnnouncmentModal} backdrop="static" keyboard={false}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {announcementData.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {ReactHtmlParser(ReactHtmlParser(announcementData.body))}
                    </Modal.Body>
                    <Modal.Footer>
                        <span style={{ fontSize: '10px', position: 'sticky' }}>{announcementData.date}</span>
                        <Button onClick={() => setAnnouncementModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={getViewModalState}
                >
                    <Modal.Header>
                        {/* <Modal.Title id="contained-modal-title-vcenter">
                            
                        </Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        <iframe src={getCertificateURl} width="765px" height="800px" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setViewModalState(false)} className="btn btn-danger">Close</Button>
                    </Modal.Footer>
                </Modal>

                {/* ContentView model code start here*/}
                <Modal
                    size="xl" centered show={getUrlModal.show} onHide={() => UrlModalHide()} backdrop="static">
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter">
                            {getContentType === "zip" ? <i class="fas fa-file-archive" style={{ fontSize: "25px", color: "#fdbf00" }}> Zip</i>
                                : getContentType === "pdf" ? <i class="fas fa-file-pdf" style={{ fontSize: "25px", color: "#b30b00" }}> PDF</i>
                                    : getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <i class="fas fa-file-image" style={{ fontSize: "25px", color: "#b2b1ff" }}> Image</i>
                                        : getContentType === "html" ? <i class="fab fa-html5" style={{ fontSize: "25px", color: "#e54c21" }}> Html</i>
                                            : getContentType === "ogg" || getContentType === "webm" || getContentType === "mp4" ? <i class="fas fa-file-video" style={{ fontSize: "25px", color: "#8cee02" }}> Video</i>
                                                : getContentType === "txt" ? <i class="fas fa-file-alt" style={{ fontSize: "25px", color: "#2766a0" }}> Text</i>
                                                    : getContentType === "doc" || getContentType === "docx" ? <i class="fas fa-file-word" style={{ fontSize: "25px", color: "#1e62b4" }}> Doc</i>
                                                        : getContentType === "scorm" ? <i class="far fa-file-archive" style={{ fontSize: "25px", color: "green" }}> Scorm</i>
                                                            : getContentType === "youtube" ? <i class="fab fa-youtube" style={{ fontSize: "25px", color: "green" }}> YouTube</i>
                                                                : null}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            getContentType === "jpg" || getContentType === "png" || getContentType === "jpeg" ? <img src={DMS_URL+`/${getUrl}`} width="1100" height="800" />
                                : getContentType === "pdf" ? <iframe width="1100" height="800" src={DMS_URL+`/${getUrl}`} type="application/pdf" ></iframe>
                                    : getContentType === "mp4" ? <div> <Videojs {...videoJsOptions} /></div>
                                        : getContentType === "docx" ? <iframe width="100%" height="100%" src={DMS_URL+`/${getUrl}`} ></iframe>
                                            : getContentType === "html" ? <iframe width="1100" height="800" src={DMS_URL+`/${getUrl}`} ></iframe>
                                                : getContentType === "zip" ? <iframe width="1100" height="800" src={DMS_URL+`/${getUrl}`} ></iframe>
                                                    : getContentType === "scorm" ? <iframe width="1100" height="800" src={DMS_URL+`/${getUrl}`} ></iframe>
                                                        : getContentType === "youtube" ? <ReactPlayer url={getUrl} width="100%" height="800px" controls="true"
                                                            config={{
                                                                youtube: {
                                                                    playerVars: { showinfo: 1 }
                                                                }
                                                            }}
                                                        />

                                                            : <p>No Content Available</p>
                        }
                    </Modal.Body>
                    {/* <DiscussionMain courseid={courseId} tenantid={tenantId} userid={userId} itemid={123} /> */}
                </Modal>
                {/* ContentView model code end here*/}


                {/* Certificate Modal */}

                <Modal centered show={getCertificateView.show} onHide={() => CertificateViewHide()} backdrop="static" className='custom-modal-style' size="xl" >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                            Course Certificate
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{}}>
                            {/* <a id="id2239" href="http://gfsu2.hyderabad.cdac.in:8083/certificates/246.pdf" class="act01">View Certificate</a>
                        <div class="fgh"><embed id="fgh" src="http://gfsu2.hyderabad.cdac.in:8083/certificates/246.pdf" type="application/pdf" width="400" height="400"/></div> */}

                            {/* <p>http://gfsu2.hyderabad.cdac.in:8083/{certificateUrl}</p> */}
                            <iframe src={`${CERTIFICATION}/${certificateUrl}`} type="application/pdf" style={{ width: '1115px', height: '800px' }}></iframe>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "center" }}>
                        {/* <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)', border: '0px' }}
                            onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" >
                            Download
                        </Button>
                        <Button variant="secondary" onClick={() => CertificateViewHide()} style={{ border: '0px' }}>
                            Cancel
                        </Button> */}
                    </Modal.Footer>
                </Modal>

                {/* payment receipt */}

                <Modal centered show={statusForCourse.show} onHide={() => paymentReceiptViewHide()} backdrop="static" className='custom-modal-style' size="xl" >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ alignContent: "center" }}>
                            Course Certificate
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{}}>

                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "center" }}>
                        {/* <Button variant="primary" style={{ background: 'linear-gradient(90deg, #11B67A 0%, #009444 100%)', border: '0px' }}
                            onMouseOut={changeBackgroundOut} onMouseOver={changeBackgroundOver} id="register" >
                            Download
                        </Button> */}
                        <Button variant="secondary" onClick={() => redirecrToCourse(courseId, tenantID)} style={{ border: '0px' }}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Styles>

            {/* Footer 2 */}
            <FooterTwo />

        </div >
    )
}

export default AdminLibraryDetails;
