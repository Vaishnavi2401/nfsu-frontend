import React, { Fragment, useState, useEffect } from 'react';
import "../styles/pagination.css";
import { Link } from 'react-router-dom';
import Pagination from './../../../components/Pagination';
import Services from '../../../services/service';
import { useHistory } from 'react-router-dom'
import UserService from '../../../services/UserService';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from "react-paginate";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import learnerService from '../../../services/learnerService'
import '../styles/styles.scss'
import service from '../../../services/service';
import { Container, Row, Col, Tab, Nav, Button, Card, Modal, OverlayTrigger, Tooltip, TabPane } from 'react-bootstrap';
import { colors } from "../../../components/common/element/elements.js";
import CryptoJS from "crypto-js";
import {COURSE_URL, USER_API} from '../../../services/service';

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

const CourseItemGrid = (props) => {

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
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [getAvgRating, setAvgRating] = useState([]);
    const [postsPerPage] = useState(10);
    const [paidJsonState, setPaidJsonState] = useState();
    const [freeJsonState, setFreeJsonState] = useState();
    const [courseState, setCourseState] = useState([]);
    const [filteredCourse, setFilteredCourse] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [rating, setRating] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    let value = useSelector(state => state.inputValue);
    let paidStat = useSelector(state => state.paidCourse);
    let freeStat = useSelector(state => state.freeCourse);
    let categoryValue = useSelector(state => state.categoryValue);
    let searchEngine = useSelector(state => state.searchEngine);
    const um_api = USER_API;
    let currentCourseState;
    
    ////console.log("============="+searchEngine);
    let dummyCategory = [];
    if (categoryValue) {
        dummyCategory = courseState.filter(function (ele) {
            return ele.catName == categoryValue;
        })

    }

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await service.getPublishCourses();
            setCourseState(res.data);
            
            setPaidJsonState(res.data.filter(function (ele) {
                return ele.fees > 0;
            }));
            setFreeJsonState(res.data.filter(function (ele) {
                return ele.fees == 0;
            }));
            setLoading(false);
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        ratingTest();
       
    }, [courseState])

    const ratingTest = () => {
       
        courseState.map((data, i) => {
            ////console.log(data.courseId);
            setRating(rating => [...rating, { itemId: data.courseId, tenantId: 1 }])
        })
    }

    useEffect(() => {
        ////console.log("108" + rating);
        if (rating !== " ") {
            Services.averageRating(rating)
                .then(res => {
                    setAvgRating(res.data);
                })
        }
    }, [rating]);



    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         setLoading(true);
    //         const res = await Services.getCourseDetails();
    //         setCourseState(res.data);
    //         setPaidJsonState(res.data.filter(function (ele) {
    //             return ele.fees > 0;
    //         }));
    //         setFreeJsonState(res.data.filter(function (ele) {
    //             return ele.fees == 0;
    //         }));
    //         setLoading(false);
    //     };

    //     Services.averageRating()
    //         .then(res => {
    //             setAvgRating(res.data);
    //         })

    //     fetchPosts();
    // }, []);

    const [searchEngineData, setsearchEngineData] = useState([]);
    const [getCourseIdsData, setCourseIdsData] = useState([]);
    let courseIds = [];
    let tenentId = [];
    let uniqueCourseIds;
    let tenids;
    // useEffect(() => {
    //     Services.searchEngine(searchEngine)
    //         .then(res => {
    //             let abc = res.data;
    //             setsearchEngineData(abc.hits.hits)
    //             searchEngineData.map((d) => {
    //                 var abc = `${d._source.path.real}`;
    //                 //for windows var str = abc.replace(/\\/g, '\\');
    //                 var str1 = abc.split('/');
    //                 // //console.log(str1)
    //                 courseIds.push(str1[9]);
    //                 tenentId.push(str1[7]);
    //                 uniqueCourseIds = [...new Set(courseIds)]
    //                 let uniqueTenantId = [...new Set(tenentId)]
    //                 var str2 = uniqueTenantId.toString();
    //                 tenids = str2.substring(6, 8);
    //                 Services.SearchEngineResult(uniqueCourseIds, tenids)
    //                     .then(res => {
    //                         setCourseIdsData(res.data)
    //                     })
    //             })
    //         }).catch(err => alert("Service is down please try after some time"));
    // }, [searchEngine])

    // useEffect(() => {
    //     setFilteredCourse(
    //         courseState.filter((course) =>
    //             course.courseName.toLowerCase().includes(value)
    //         )
    //     );
    // }, [value, courseState]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    if (value) {
        let data = courseState.filter((course) =>
            course.courseName.toLowerCase().includes(value)
        )
        currentCourseState = data.slice(0, 1000);
    }
    else if (paidStat) {
        if (paidJsonState == undefined) {
            currentCourseState = courseState.slice(0, 1000);
        } else {
            currentCourseState = paidJsonState.slice(0, 1000);
        }
    }
    else if (freeStat) {
        if (freeJsonState == undefined) {
            currentCourseState = courseState.slice(0, 1000);
        } else {
            currentCourseState = freeJsonState.slice(0, 1000);
        }
    }
    else if (categoryValue) {
        currentCourseState = dummyCategory.slice(0, 1000);
    }
    else if (searchEngine) {
        currentCourseState = getCourseIdsData.slice(0, 1000);
    }
    else {
        currentCourseState = courseState.slice(0, 1000);
    }
    // const currentCourseState = courseState.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    //const paginate = pageNumber => setCurrentPage(pageNumber);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    const pageCount = Math.ceil(currentCourseState.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


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

    const CourseDetails = (id, tid) => {

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

        // //history.push(`${process.env.PUBLIC_URL + "/instLibraryDetails/"}${rNumber}${cid}/${result}${tId}`);
        // history.push(`${process.env.PUBLIC_URL + "/course-details/"}${rNumber}${cid}/${result}${tId}`);

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

    const fee_validator = (fees) => {
        if (fees === 0) {
            return "Free Course"
        }
        else {
            return <div>&#8377;{fees}</div>
        }
    }

    const imageUrls = (url) => {
        if (url == null) {
            return '';
        } else {
            let imagepath = url.replace(/\\/g, "\\\\");
            let imageurl = `${COURSE_URL}/${imagepath}`;
            return imageurl;
        }

    }

    if (loading) {
        return <div className="loader"></div>;
    }

    // important notes please read carefully 
    // after the tenantId comes dynamically replace "1" to tenantId



    const toggleHover = () => {
        setHovered(true);
    }

    const toggleHover1 = () => {
        setHovered(false);
    }

    ////console.log("courseState" + JSON.stringify(courseState));

    ////console.log("rating" + JSON.stringify(rating));




    return (
        <>
            {currentCourseState.length == 0 ? <div style={{ marginLeft: '30px' }}>{t('no_course_publish')}</div> :
                <Fragment>
                    {/* Course Item */}
                    {currentCourseState.slice(pagesVisited, pagesVisited + usersPerPage).map((data, i) => (
                        data.status == "P" ? <Col lg="6" md="12" key={i}>
                            <div className="course-item">
                                <Link onClick={() => CourseDetails(data.courseId, 1)}>
                                    <div className="course-image" onMouseOver={toggleHover} onMouseOut={toggleHover1} style={{ backgroundImage: `url(${imageUrls(data.courseImage)})` }}>
                                        {data.instructor.map((d) => (
                                            <div className="author-img d-flex">
                                                <div className="img">
                                                    <img src={um_api + `getprofilepic/${d.learnerUsername}`} alt="" />
                                                </div>
                                                <div className="title">
                                                    <p>{d.firstName}</p>
                                                    <p>{d.lastName}</p>
                                                    {/* <span>{data.authorCourses}</span> */}
                                                </div>
                                            </div>
                                        ))}
                                        {/* <div className={hovered ? "pyro" : ''}  >
                                            <div class="beforeSpark"></div>
                                            <div class="afterSpark"></div>
                                        </div> */}
                                        <div className="course-price">
                                            <p>{fee_validator(data.fees)}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="course-content">
                                    <div>
                                        <Row>
                                            <Col sm={9}>
                                                <h6 className="heading"><Link onClick={() => CourseDetails(data.courseId, data.tenantId)}>{data.courseName}</Link></h6>
                                            </Col>
                                            <Col sm={3}>
                                                <Button variant="success" style={{ position: "absolute", right: 10, background: `${colors.gr_bg}` }} onClick={() => CourseDetails(data.courseId, data.tenantId)}>{t('view')}</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <h6><p>{t('category')} : {data.catName}</p></h6>
                                    <p className="desc" style={{ textAlign: "justify", textOverflow: "ellipsis", width: "300px", whiteSpace: "nowrap", overflow: "hidden" }} dangerouslySetInnerHTML={{ __html: data.courseDescription }}></p>
                                    <div className="course-face d-flex justify-content-between">
                                        <div className="duration">
                                            <p><i className="fas fa-clock"></i>{data.duration == 1825 ? "Unlimited" : data.duration} {t('days')}</p>
                                        </div>
                                        <div className="rating">
                                            <ul className="list-unstyled list-inline">
                                                {
                                                    getAvgRating.map((d) => {
                                                        return (
                                                            <>
                                                                {
                                                                    1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 1 ?
                                                                        <>
                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                        </>
                                                                        : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 1.1 || d.avgScore == 1.2 || d.avgScore == 1.3 || d.avgScore == 1.4 || d.avgScore == 1.5 || d.avgScore == 1.6 || d.avgScore == 1.7 || d.avgScore == 1.8 || d.avgScore == 1.9 ?
                                                                            <>
                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                            </>

                                                                            : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 2 ?
                                                                                <>
                                                                                    <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                </>

                                                                                : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 2.1 || d.avgScore == 2.2 || d.avgScore == 2.3 || d.avgScore == 2.4 || d.avgScore == 2.5 || d.avgScore == 2.6 || d.avgScore == 2.7 || d.avgScore == 2.8 || d.avgScore == 2.9 ?
                                                                                    <>
                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                        <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                    </>
                                                                                    : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 3 ?
                                                                                        <>
                                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                            <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                        </>
                                                                                        : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 3.1 || d.avgScore == 3.2 || d.avgScore == 3.3 || d.avgScore == 3.4 || d.avgScore == 3.5 || d.avgScore == 3.6 || d.avgScore == 3.7 || d.avgScore == 3.8 || d.avgScore == 3.9 ?
                                                                                            <>
                                                                                                <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                            </>
                                                                                            : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 4 ?
                                                                                                <>
                                                                                                    <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                    <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                </>
                                                                                                : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 4.1 || d.avgScore == 4.2 || d.avgScore == 4.3 || d.avgScore == 4.4 || d.avgScore == 4.5 || d.avgScore == 4.6 || d.avgScore == 4.7 || d.avgScore == 4.8 || d.avgScore == 4.9 ?
                                                                                                    <>
                                                                                                        <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                                                        <li className="list-inline-item"><i className="las la-star-half-alt"></i></li>
                                                                                                    </>
                                                                                                    : 1 == d.tenantId && data.courseId == d.itemId ? d.avgScore == 5 ?
                                                                                                        <>
                                                                                                            <li className="list-inline-item" style={{ color: "#be5a0e", fontWeight: "bold" }}>({1 == d.tenantId && data.courseId == d.itemId ? d.avgScore : null})&nbsp;</li>
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
                                        <div className="student">
                                            <p><i className="fas fa-users"></i>{data.userCount == 0 ? null : data.userCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col> : null
                    ))
                    }
                </Fragment>
            }
            {currentCourseState.length == 0 ? null :
                <Col md="12" className="text-center">
                    <ReactPaginate
                        previousLabel={t('previous')}
                        nextLabel={t('next')}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </Col>
            }

        </>
    )
}

export default CourseItemGrid;
