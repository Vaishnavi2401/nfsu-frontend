import React, { useEffect, useState } from 'react';
import service from '../../services/service';
import Header from '../../components/Header';
import { Styles } from '../../pages/account/styles/account';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import { Button, Card, Form, Container, Row, Col, } from "react-bootstrap";
import RenderOnAuthenticated from '../../pages/account/RenderOnAuthenticated';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie';
import UserService from '../../services/UserService';

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
const UserProfile = (props) => {

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
    const history = useHistory();


    const [getUserDetails, setUserDetails] = useState({
        title:'',
        firstName: '',
        middleName:'',
        lastName: '',
        email: '',
        mobile: '',
        mobile1:'',
        gender: '',
        dob: '',
        instituteName: '',
        qualification: '',
        address: '',
        city: '',
        pincode: '',
        countryId: '',
        stateId: '',
        districtId: '',
        updateBy: props.match.params.updateBy,
        learnerUsername: props.match.params.learnerUsername,
        idproofNumber:'',
        ddcertificate:'',
        facebookId: '',
        twitterId: '',
        linkedinId: '',
        youtubeId: '',
        skypeId: '',
        designation: '',
        TitleError:'',
        firstNameError: '',
        lastNameError: '',
        genderError: '',
        dobError: '',
        mobileError: '',
        mobile1Error: '',
        qualificationError: '',
        instituteNameError: '',
        addressError: '',
        cityError: '',
        pincodeError: '',
        countryIdError: '',
        stateIdError: '',
        districtIdError: '',
        facebookIdError: '',
        twitterIdError: '',
        linkedinIdError: '',
        youtubeIdError: '',
        skypeIdError: '',
        designationError: '',
        idproofNumber: '',
        idproofNumberError:'',
        ddcertificateError:'',
    });

    let id = props.match.params.id;
    useEffect(() => {
        service.getUserById(id)
            .then(res => {
                setUserDetails(res.data);
                
            })
            .catch(err => {
               
            })
    }, [])




    const [getCountry, setCountry] = useState([]);
    useEffect(() => {
        service.getCountry()
            .then(res => {
                ////console.log("Country Response ---- " + res.data);
                setCountry(res.data);
            })
            .catch(err => {
               
            })
    }, [])

    const [getStates, setStates] = useState([]);
    useEffect(() => {
        service.getState()
            .then(res => {
                setStates(res.data);
                
            })
            .catch(err => {
               
            })
    }, [])


    const [getdistrict, setdistrict] = useState([]);
    const getDistricts = (stateId) => {
        service.getDistrict(stateId)
            .then(res => {
                setdistrict(res.data);

            })
            .catch(err => {
               
            })
    }

    const [qualification, setQualification] = useState([]);
    const [designation, setDesignation] = useState([]);

    useEffect(() => {

        service.RegisterQualification()
            .then((res) => {
                
                setQualification(res.data);
            })
            .catch((err) => {
               
            })
        service.RegisterDesignation()
            .then((res) => {
                
                setDesignation(res.data);
            })
            .catch((err) => {
               
            })

    }, [])

    const [getState, setState] = useState([]);
    const handleSelectChange = (event) => {
        setState({
            result: event.target.value
        })
        setUserDetails({ ...getUserDetails, stateId: event.target.value })
        ////console.log(getUserDetails);

        getDistricts(event.target.value);
        setChangeAddress(true);
        getUserDetails.districtMaster.districtId = 0;
        getUserDetails.districtMaster.districtName = "Please Select District";
        getUserDetails.districtId = 0;
        getUserDetails.districtName = "Please Select District";
        ////console.log(getUserDetails);
    }

    const [getDistrict, setDistricts] = useState([]);
    const handleDistrict = (event) => {
        setDistricts({
            result: event.target.value
        })
        setUserDetails({ ...getUserDetails, districtId: event.target.value })
        setChangeAddress(true);
        ////console.log(getUserDetails);

    }

    const [getcountry, setcountry] = useState([]);
    const handle = (event) => {
        setcountry({
            result: event.target.value
        })
        setUserDetails({ ...getUserDetails, countryId: event.target.value });
        setChangeAddressCountry(true);
        getUserDetails.stateMaster.stateId = 0;
        getUserDetails.stateMaster.stateName = "Please Select State";
        getUserDetails.stateId = 0;
        getUserDetails.stateName = "Please Select State";
        getUserDetails.districtMaster.districtId = 0;
        getUserDetails.districtMaster.districtName = "Please Select District";
        getUserDetails.districtId = 0;
        getUserDetails.districtName = "Please Select District";
    }


    // useEffect(() => {
    //     //console.log('getUserDetails : ', getUserDetails)
    // }, [getUserDetails])

    const validate = () => {
        let firstNameError1 = '';
        let lastNameError1 = '';
        let genderError1 = '';
        let dobError1 = '';
        let mobileError1 = '';
        let qualificationError1 = '';
        let instituteNameError1 = '';
        let addressError1 = '';
        let cityError1 = '';
        let pincodeError1 = '';
        let countryIdError1 = '';
        let stateIdError1 = '';
        //let districtIdError1 = '';
        let facebookIdError1 = '';
        let twitterIdError1 = '';
        let linkedinIdError1 = '';
        let youtubeIdError1 = '';
        let skypeIdError1 = '';
        let designationError1 = '';
        let TitleError1 = '';
        let idproofNumberError1 = '';
        let ddcertificateError1 = '';


        if (!getUserDetails.ddcertificate) {
            ddcertificateError1 = "ID Proof Number can't be blank";
        }
        if (!getUserDetails.ddcertificate.match(/^[A-Za-z& ]{2,200}$/)) {
            ddcertificateError1 = "Minimum 2 and Maxmimum 200 Alphabet Character Are Allowed";
        }
        if (!getUserDetails.idproofNumber) {
            idproofNumberError1 = "ID Proof Number can't be blank";
        }
        if (!getUserDetails.idproofNumber.match(/^[A-Za-z0-9 ]{2,50}$/)) {
            ddcertificateError1 = "Minimum 2 and Maxmimum 50 Character Are Allowed";
        }
        if (!getUserDetails.title) {
            TitleError1 = "title can't be blank";
        }
        // if (!getUserDetails.designation) {
        //     designationError1 = "designation can't be blank";
        // }
        if (!getUserDetails.firstName) {
            firstNameError1 = t('first_name_cant_be_blank');
        }
        if (!getUserDetails.firstName.match(/^[A-Za-z ]{2,50}$/)) {
            firstNameError1 = "Minimum 2 and Maxmimum 50 Alphabet Character Are Allowed";
        }
        if (!getUserDetails.lastName) {
            lastNameError1 = t('last_name_cant_be_blank');
        }
        if (!getUserDetails.lastName.match(/^[A-Za-z ]{2,50}$/)) {
            lastNameError1 = "Minimum 2 and Maxmimum 50 Alphabet Character Are Allowed";
        }
        if (!getUserDetails.gender) {
            genderError1 = t('select_any_one');
        }
        if (!getUserDetails.dob) {
            dobError1 = t('select_your_date_of_birth');
        } if (getUserDetails.dob) {
            const d = new Date(getUserDetails.dob);
            let year1 = d.getFullYear();
            if (year - year1 <= 21) {
                dobError1 = "Invalid age! Age should be greater than 21. "
            }
        }
        if (!getUserDetails.mobile) {
            mobileError1 = t('enter_your_ten_digit_mobile_number');
        }
        // if (!getUserDetails.mobile.match(/^[0-9]{10}$/)) {
        //     firstNameError = "Only 10 digit are allowed";
        // }

        function isMobile(mobile) {
            // return /^[6-9]\d{9}$/.test(mobile);
            return /^[0-9]{10}$/.test(mobile);
        }
        if (!isMobile(getUserDetails.mobile)) {
            mobileError1 = t('not_a_valid_mobile_number');
        }

        function isFacebookId(facebookId) {
            return /^([a-zA-Z0-9.]{4,75})$/.test(facebookId);
        }
        if (!isFacebookId(getUserDetails.facebookId) && getUserDetails.facebookId.toUpperCase() !== "NA") {
            facebookIdError1 = t('enter_valid_id');
        }
        function istwitterId(twitterId) {
            ////console.log(/^([a-zA-Z0-9]{4,264})$/.test(twitterId));
            return /^([a-zA-Z0-9]{4,75})$/.test(twitterId);
        }
        if (!istwitterId(getUserDetails.twitterId) && getUserDetails.twitterId.toUpperCase() !== "NA") {
            twitterIdError1 = t('enter_valid_id');
        }
        function isLinkedinId(linkedinId) {
            return /^([a-zA-Z0-9-]{4,75})$/.test(linkedinId);
        }
        if (!isLinkedinId(getUserDetails.linkedinId) && getUserDetails.linkedinId.toUpperCase() !== "NA") {
            linkedinIdError1 = t('enter_valid_id');
        }
        function isYoutubeId(youtubeId) {
            return /^([a-zA-Z0-9@]{4,75})$/.test(youtubeId);
        }
        if (!isYoutubeId(getUserDetails.youtubeId) && getUserDetails.youtubeId.toUpperCase() !== "NA") {
            youtubeIdError1 = t('enter_valid_id');
        }
        function isSkypeId(skypeId) {
            return /^([a-zA-Z0-9]{4,75})$/.test(skypeId);
        }
        if (!isSkypeId(getUserDetails.skypeId) && getUserDetails.skypeId.toUpperCase() !== "NA") {
            skypeIdError1 = t('enter_valid_id');
        }


        // if (getUserDetails.mobile.length !==10 || getUserDetails.mobile == 0 ) {
        //     mobileError = t('enter_your_ten_digit_mobile_number');
        // }
        // if(!getUserDetails.mobile.match("^[1-9]")){
        //     mobileError = "Mobile no Should not begin with '0'"
        // }
        // if (!getUserDetails.qualification) {
        //     qualificationError = t('qualification_name_cant_be_blank');
        // }
        if (!getUserDetails.instituteName) {
            instituteNameError1 = t('institute_name_cant_be_blank');
        }
        if (!getUserDetails.instituteName.match(/^[A-Za-z\s]{2,75}$/) && getUserDetails.instituteName.toUpperCase() !== "NA") {
            instituteNameError1 = "Minimum 2 and Maxmimum 75 Alphabet Character Are Allowed";
        }
        if (!getUserDetails.address) {
            addressError1 = t('address_cant_be_blank');
        }
        if (!getUserDetails.address.match(/^[A-Za-z0-9&.,#\-()+ " ' \n]{2,250}$/) && getUserDetails.address.toUpperCase() !== "NA") {
            addressError1 = `Minimum 2 and Maxmimum 250 Character with Alphabets ,Digits, Space and Special Characters like ( & . , # - () + " ' ) are Allowed`;
        }
        if (!getUserDetails.city) {
            cityError1 = t('city_cant_be_blank');
        }
        if (!getUserDetails.city.match(/^[A-Za-z\s]{2,25}$/) && getUserDetails.city.toUpperCase() !== "NA") {
            cityError1 = "Minimum 2 and Maxmimum 25 Alphabet and Space Are Allowed";
        }
        if (!getUserDetails.pincode || getUserDetails.pincode == 0) {
            pincodeError1 = t('pincode_cant_be_blank');
        }
        // if (!getUserDetails.pincode.match(/^[0-9]{6,6}$/)) {
        //     pincodeError = t('valid_pincode');
        // }
        if (getUserDetails.countryId == 0) {
            countryIdError1 = t('select_your_country');
        }
        if (getUserDetails.stateId == 0) {
            stateIdError1 = t('select_your_state');
        }
        // if (getUserDetails.districtId == 0) {
        //     districtIdError1 = t('select_your_district');
        // }


        if (firstNameError1 || lastNameError1 || genderError1 || dobError1 || mobileError1 || qualificationError1 || instituteNameError1 || addressError1 || cityError1 || pincodeError1 || countryIdError1 || stateIdError1 || facebookIdError1 || twitterIdError1 || linkedinIdError1 || youtubeIdError1 || skypeIdError1 ||  TitleError1 || ddcertificateError1 || idproofNumberError1) {
            setUserDetails({
                ...getUserDetails,
                firstNameError: firstNameError1,
                lastNameError: lastNameError1,
                genderError: genderError1,
                dobError: dobError1,
                mobileError: mobileError1,
                qualificationError: qualificationError1,
                instituteNameError: instituteNameError1,
                addressError: addressError1,
                cityError: cityError1,
                pincodeError: pincodeError1,
                countryIdError: countryIdError1,
                stateIdError: stateIdError1,
                //districtIdError: districtIdError1,
                facebookIdError: facebookIdError1,
                linkedinIdError: linkedinIdError1,
                twitterIdError: twitterIdError1,
                youtubeIdError: youtubeIdError1,
                skypeIdError: skypeIdError1,
                TitleError:TitleError1,
                ddcertificateError:ddcertificateError1,
                idproofNumberError:idproofNumberError1,
                //designationError:designationError1,
            });


            return false;
        }

        return true;
    }

    const [changeAddress, setChangeAddress] = useState(false);
    const [changeAddressCountry, setChangeAddressCountry] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        ////console.log("inside submit function");
        const isValid = validate();
        ////console.log("isValid " + isValid);

        let desgId = " ";
        let qualId = " ";

        if (getUserDetails.designation === " " || getUserDetails.designation === undefined) {
            desgId = getUserDetails.designationMaster.desgId;
            ////console.log(desgId)
        }
        else {
            desgId = getUserDetails.designation;
        }

        if (getUserDetails.qualification === " " || getUserDetails.qualification === undefined) {
            qualId = getUserDetails.qualificationMaster.qualId;
            ////console.log(qualId)
        }
        else {
            qualId = getUserDetails.qualification;
        }


        if (isValid) {
            ////console.log(getUserDetails);
            //setUserDetails(initialState);

            // initialized update, if-else condition is ti pass countryid, stateid, districtid from master in absence of any change in present address



            let update = {
                email: " ", firstName: " ", lastName: " ", mobile: " ", gender: " ", dob: " ", instituteName: " ", qualId: " ", address: " ", city: " ", pincode: " ",
                countryId: " ", stateId: " ", districtId: " ", updateBy: " ", learnerUsername: " ", facebookId: " ", twitterId: " ", linkedinId: " ", youtubeId: " ", skypeId: " ",
                 desgId: '', title: " ", ddcertificate: " ", mobile1: " ", middleName: " ", idproofNumber: " "
            };

            if (changeAddress === true && changeAddressCountry === true) {

                update = {
                    email: getUserDetails.email, firstName: getUserDetails.firstName, lastName: getUserDetails.lastName, mobile: getUserDetails.mobile, gender: getUserDetails.gender, dob: getUserDetails.dob,
                    instituteName: getUserDetails.instituteName, qualId: qualId, address: getUserDetails.address, city: getUserDetails.city, pincode: getUserDetails.pincode,
                    countryId: getUserDetails.countryId, stateId: getUserDetails.stateId, districtId: getUserDetails.districtId, updateBy: getUserDetails.learnerUsername, learnerUsername: getUserDetails.learnerUsername,
                    facebookId: getUserDetails.facebookId, twitterId: getUserDetails.twitterId, linkedinId: getUserDetails.linkedinId, youtubeId: getUserDetails.youtubeId, skypeId: getUserDetails.skypeId,
                    desgId: desgId, title: getUserDetails.title, ddcertificate: getUserDetails.ddcertificate, mobile1: getUserDetails.mobile1, middleName: getUserDetails.middleName, idproofNumber: getUserDetails.idproofNumber
                }
            }
            else if (changeAddress === true && changeAddressCountry === false) {

                update = {
                    email: getUserDetails.email, firstName: getUserDetails.firstName, lastName: getUserDetails.lastName, mobile: getUserDetails.mobile, gender: getUserDetails.gender, dob: getUserDetails.dob,
                    instituteName: getUserDetails.instituteName, qualId: qualId, address: getUserDetails.address, city: getUserDetails.city, pincode: getUserDetails.pincode,
                    countryId: getUserDetails.countryMaster.countryId, stateId: getUserDetails.stateId, districtId: getUserDetails.districtId, updateBy: getUserDetails.learnerUsername, learnerUsername: getUserDetails.learnerUsername,
                    facebookId: getUserDetails.facebookId, twitterId: getUserDetails.twitterId, linkedinId: getUserDetails.linkedinId, youtubeId: getUserDetails.youtubeId, skypeId: getUserDetails.skypeId,
                    desgId: desgId, title: getUserDetails.title, ddcertificate: getUserDetails.ddcertificate, mobile1: getUserDetails.mobile1, middleName: getUserDetails.middleName, idproofNumber: getUserDetails.idproofNumber
                }
            }
            else {
                update = {
                    email: getUserDetails.email, firstName: getUserDetails.firstName, lastName: getUserDetails.lastName, mobile: getUserDetails.mobile, gender: getUserDetails.gender, dob: getUserDetails.dob,
                    instituteName: getUserDetails.instituteName, qualId: qualId, address: getUserDetails.address, city: getUserDetails.city, pincode: getUserDetails.pincode,
                    countryId: getUserDetails.countryMaster.countryId, stateId: getUserDetails.stateMaster.stateId, districtId: getUserDetails.districtMaster.districtId, updateBy: getUserDetails.learnerUsername, learnerUsername: getUserDetails.learnerUsername,
                    facebookId: getUserDetails.facebookId, twitterId: getUserDetails.twitterId, linkedinId: getUserDetails.linkedinId, youtubeId: getUserDetails.youtubeId, skypeId: getUserDetails.skypeId,
                    desgId: desgId, title: getUserDetails.title, ddcertificate: getUserDetails.ddcertificate, mobile1: getUserDetails.mobile1, middleName: getUserDetails.middleName, idproofNumber: getUserDetails.idproofNumber
                }
            }
           

            service.updateUser(update)
                .then(async response => {
                    if (response.status === 200) {
                        await swal(t('profile_update'), "", "success")
                        history.push('/');
                    } else {
                        swal(t('services_is_down_please_update_after_sometime'), "", "warning")
                    }
                }).catch(err => alert(t('services_is_down_please_update_after_sometime')));
        }
    }

    var date = new Date();
    var str = '';
    var timeNow = '';
    var year, month, day, hour, min, sec;
    year = date.getFullYear();
    month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    day = date.getDate();
    day = day < 10 ? '0' + day : day;
    hour = date.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    min = date.getMinutes();
    min = min < 10 ? '0' + min : min;
    sec = date.getSeconds();
    sec = sec < 10 ? '0' + sec : sec;

    str += year + '-' + month + '-' + day;
    str += 'T' + hour + ':' + min;

    timeNow += year + '-' + month + '-' + day;
    // timeNow += 'T' + hour + ':' + min + ':' + sec;

    ////console.log(getUserDetails);

    return (

        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">
                {/* Header */}
                <Header />
                {/* Breadcroumb */}
                <BreadcrumbBox title="Update Profile" />

                <Container fluid style={{ marginTop: 40 }}>

                    <Row>
                        <Col md="1"></Col>
                        <Col md="10">
                            <RenderOnAuthenticated>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">{t('edit_profile')}</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Row style={{margin:"20px"}}>
                                                <Col className="pl-1" md="3">
                                                <Form.Group >
                                                        <label>Title</label>
                                                        <Form.Control
                                                            onChange={e => setUserDetails({ ...getUserDetails, title: e.target.value })}
                                                            as="select" placeholder="Title">
                                                            <option value={getUserDetails.title} selected>{getUserDetails.title}</option>
                                                            {getUserDetails.title !== "Dr." && (<option value={"Dr."}>Dr.</option>)}
                                                            {getUserDetails.title !== "Mr." && (<option value={"Mr."}>Mr.</option>)}
                                                            {getUserDetails.title !== "Mrs." && (<option value={"Mrs."}>Mrs.</option>)}
                                                            {getUserDetails.title !== "Miss." && (<option value={"Miss."}>Miss.</option>)}

                                                        </Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.TitleError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                            <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>{t('first_name')}</label>
                                                        <Form.Control name="firstName" value={getUserDetails.firstName} minLength={2} maxLength={50} onChange={e => setUserDetails({ ...getUserDetails, firstName: e.target.value })} placeholder="First Name" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.firstNameError}
                                                        </p>
                                                    </Form.Group>

                                                </Col>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>Middle Name</label>
                                                        <Form.Control name="middleName" value={getUserDetails.middleName} maxLength={50} onChange={e => setUserDetails({ ...getUserDetails, middleName: e.target.value })} placeholder="Last Name" type="text"    ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.middleNameError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>{t('last_name')}</label>
                                                        <Form.Control name="lastName" value={getUserDetails.lastName} minLength={2} maxLength={50} onChange={e => setUserDetails({ ...getUserDetails, lastName: e.target.value })} placeholder="Last Name" type="text"    ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.lastNameError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row style={{margin:"20px"}}>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>{t('email')}</label>
                                                        <Form.Control name="email"
                                                            defaultValue={getUserDetails.email}
                                                            onChange={onchange}
                                                            disabled placeholder="Email"
                                                            type="text"
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>{t('date_of_birth')}</label>
                                                        <Form.Control name="dob" dateFormate='dd/MM/yyyy' max={timeNow} value={getUserDetails.dob} placeholder="Date of Birth" onChange={e => setUserDetails({ ...getUserDetails, dob: e.target.value })} type="Date" />
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.dobError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>{t('mobile')} 1</label>
                                                        <Form.Control name="mobile" value={getUserDetails.mobile} onChange={e => setUserDetails({ ...getUserDetails, mobile: e.target.value })} placeholder="Mobile number" type="text" minLength="10" maxLength="10" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.mobileError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>{t('mobile')} 2</label>
                                                        <Form.Control name="mobile" value={getUserDetails.mobile1} onChange={e => setUserDetails({ ...getUserDetails, mobile1: e.target.value })} placeholder="Mobile number" type="text" minLength="10" maxLength="10" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.mobile1Error}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                               
                                            </Row>

                                            <Row style={{margin:"20px"}}>
                                                <Col className="pl-1" md="6">
                                                    <Form.Group>
                                                        <label>{t('gender')} </label>
                                                        <br></br>

                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={e => setUserDetails({ ...getUserDetails, gender: e.target.value })} checked={getUserDetails.gender === "Male"} value="Male" />
                                                            <label class="form-check-label" for="inlineRadio1">Male</label>
                                                        </div>
                                                        <span style={{marginRight:"50px", display:"inline-block"}}></span>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={e => setUserDetails({ ...getUserDetails, gender: e.target.value })} checked={getUserDetails.gender === "Female"} value="Female" />
                                                            <label class="form-check-label" for="inlineRadio2">Female</label>
                                                        </div>
                                                        <span style={{marginRight:"50px", display:"inline-block"}}></span>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" onChange={e => setUserDetails({ ...getUserDetails, gender: e.target.value })} checked={getUserDetails.gender === "Transgender"} value="Transgender" />
                                                            <label class="form-check-label" for="inlineRadio2">Transgender</label>
                                                        </div>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.genderError}
                                                        </p>
                                                        {/* <Form.Control name="gender" defaultValue={getUserDetails.gender} onChange={e => setUserDetails({ ...getUserDetails, gender: e.target.value })} placeholder="Gender" type="text" ></Form.Control> */}
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="6">
                                                    <Form.Group>
                                                        <label>ID Proof Number</label>
                                                        <Form.Control value={getUserDetails.idproofNumber} minLength={2} maxLength={50} onChange={e => setUserDetails({ ...getUserDetails, idproofNumber: e.target.value })} placeholder="ID Proof Number" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.idproofNumberError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row style={{margin:"20px"}}>
                                                <Col className="pl-1" md="12">
                                                    <Form.Group>
                                                        <label>{t('address')}</label>
                                                        <Form.Control value={getUserDetails.address} minLength={2} maxLength={250} onChange={e => setUserDetails({ ...getUserDetails, address: e.target.value })} placeholder="Address" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>{getUserDetails.addressError}</p>
                                                    </Form.Group>
                                                </Col>
                                                </Row>
                                            <Row style={{margin:"20px"}}>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>{t('city')}</label>
                                                        <Form.Control value={getUserDetails.city} minLength={2} maxLength={25} onChange={e => setUserDetails({ ...getUserDetails, city: e.target.value })} placeholder="City" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.cityError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>Pincode</label>
                                                        <Form.Control value={getUserDetails.pincode} onChange={e => setUserDetails({ ...getUserDetails, pincode: e.target.value })} placeholder="ZIP Code" minLength="6" maxLength="6" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.pincodeError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>{t('country')}</label>
                                                        <Form.Control onChange={handle} as="select" placeholder="Country" >
                                                            <option value={getUserDetails.countryMaster ? getUserDetails.countryMaster.countryId ? getUserDetails.countryMaster.countryId : null : null}>{getUserDetails.countryMaster ? getUserDetails.countryMaster.countryName ? getUserDetails.countryMaster.countryName : null : null}</option>
                                                            {/*{getCountry.map((country, index) => {
                                                                return (
                                                                    <option name="countryId" onChange={e => setUserDetails({ ...getUserDetails, countryId: e.target.value })} value={country.countryId}>{country.countryName}</option>
                                                                );
                                                            })} */}

                                                            {
                                                                getUserDetails.countryId !== "" ?
                                                                    <>
                                                                        {

                                                                            getCountry.map((country, index) => {

                                                                                if (country.countryId != getUserDetails.countryMaster.countryId) {
                                                                                    // && country.countryId !=getUserDetails.countryMaster.countryId
                                                                                    if (country.countryId > 0) {
                                                                                        return (
                                                                                            <option name="countryId" onChange={e => setUserDetails({ ...getUserDetails, countryId: e.target.value })} value={country.countryId}>{country.countryName}</option>
                                                                                        );
                                                                                    }

                                                                                }
                                                                            })
                                                                        }
                                                                    </>
                                                                    :
                                                                    <>
                                                                    </>
                                                            }
                                                        </Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.countryIdError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="3">
                                                    <Form.Group>
                                                        <label>{t('state')}</label>
                                                        <Form.Control onChange={handleSelectChange} as="select" placeholder="State" >
                                                            <option value={getUserDetails.stateMaster ? getUserDetails.stateMaster.stateId ? getUserDetails.stateMaster.stateId : null : null}>{getUserDetails.stateMaster ? getUserDetails.stateMaster.stateName ? getUserDetails.stateMaster.stateName : null : null}</option>
                                                            {getStates.map((states, index) => {
                                                                if (states.stateId >= 1) {
                                                                    return (
                                                                        <option name="stateId" onChange={e => { setUserDetails({ ...getUserDetails, stateId: e.target.value }); }} value={states.stateId}>{states.stateName}</option>
                                                                    );
                                                                }
                                                            })}
                                                        </Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.stateIdError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                                {/* <Col className="pl-1" md="4" >
                                                    <Form.Group >
                                                        <label>{t('district')}</label>
                                                        <Form.Control onChange={handleDistrict} as="select" placeholder="District" >

                                                            <option value={getUserDetails.districtMaster ? getUserDetails.districtMaster.districtId ? getUserDetails.districtMaster.districtId : null : null}>{getUserDetails.districtMaster ? getUserDetails.districtMaster.districtName ? getUserDetails.districtMaster.districtName : null : null}</option>

                                                            {getdistrict.map((district, index) => {
                                                                return (
                                                                    <option name="districtId" onChange={e => setUserDetails({ ...getUserDetails, districtId: e.target.value })} value={district.districtId} >{district.districtName}</option>
                                                                );
                                                            })

                                                            }
                                                        </Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.districtIdError}
                                                        </p>
                                                    </Form.Group>
                                                </Col> */}
                                            </Row>
                                            <Row style={{margin:"20px", marginTop:"60px"}}>
                                                <Col className="pl-1" md="6">
                                                    <Form.Group >
                                                        <label>Educational Qualification (Name of Last Degree/Diploma)</label>
                                                        <Form.Control
                                                            onChange={e => setUserDetails({ ...getUserDetails, qualification: e.target.value })}
                                                            as="select" placeholder="qualification">

                                                            <option value={getUserDetails.qualificationMaster ? getUserDetails.qualificationMaster.qualId ? getUserDetails.qualificationMaster.qualId : null : null}>{getUserDetails.qualificationMaster ? getUserDetails.qualificationMaster.qualification ? getUserDetails.qualificationMaster.qualification : null : null}</option>

                                                            {qualification.map((qualification, index) => {
                                                                return (
                                                                    <option name="qualification"
                                                                        onChange={e => setUserDetails({ ...getUserDetails, qualification: e.target.value })}
                                                                        value={qualification.qualId} >{qualification.qualification}</option>
                                                                );
                                                            })

                                                            }
                                                        </Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.qualificationError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="6">
                                                    <Form.Group>
                                                        <label>Degree/Diploma Certificate</label>
                                                        <Form.Control value={getUserDetails.ddcertificate} minLength={2} maxLength={500} onChange={e => setUserDetails({ ...getUserDetails, ddcertificate: e.target.value })} placeholder="Degree/Diploma Certificate" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.ddcertificateError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row style={{margin:"20px"}}>
                                                <Col className="pl-1" md="6">
                                               
                                                    <Form.Group >
                                                        <label>{t('designation')}</label>
                                                        <Form.Control
                                                            onChange={e => setUserDetails({ ...getUserDetails, designation: e.target.value })} 
                                                            as="select" placeholder="Designation">

                                                            <option value={getUserDetails.designationMaster ? getUserDetails.designationMaster.desgId ? getUserDetails.designationMaster.desgId : null : null}>{getUserDetails.designationMaster ? getUserDetails.designationMaster.designation ? getUserDetails.designationMaster.designation : null : null}</option>

                                                            {designation.map((designation, index) => {
                                                                return (
                                                                    <option name="designation"
                                                                        onChange={e => setUserDetails({ ...getUserDetails, designation: e.target.value })}
                                                                        value={designation.desgId} >{designation.designation}</option>
                                                                );
                                                            })

                                                            }
                                                        </Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.designationError}
                                                        </p>
                                                    </Form.Group>

                                               
                                                </Col>
                                                <Col className="pl-1" md="6">
                                                    <Form.Group>
                                                        <label>Organization</label>
                                                        <Form.Control value={getUserDetails.instituteName} minLength={2} maxLength={75} onChange={e => setUserDetails({ ...getUserDetails, instituteName: e.target.value })} placeholder="Institute Name" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.instituteNameError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                           
                                            <br></br>
                                            <br></br>
                                            <h6>{t('social_media_profiles')}:</h6>
                                            <Row style={{margin:"20px"}}>
                                                <Col className="pl-1" md="4">
                                                    <Form.Group>
                                                        <label>{t('facebook_id')}</label>
                                                        <Form.Control name="facebookId" value={getUserDetails.facebookId} onChange={e => setUserDetails({ ...getUserDetails, facebookId: e.target.value })} placeholder="Facebook Id" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.facebookIdError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="4">
                                                    <Form.Group>
                                                        <label>{t('twitter_id')}</label>
                                                        <Form.Control name="twitterId" value={getUserDetails.twitterId} onChange={e => setUserDetails({ ...getUserDetails, twitterId: e.target.value })} placeholder="Twitter Id" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.twitterIdError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pl-1" md="4">
                                                    <Form.Group>
                                                        <label>{t('linkedin_id')}</label>
                                                        <Form.Control name="linkedinId" value={getUserDetails.linkedinId} onChange={e => setUserDetails({ ...getUserDetails, linkedinId: e.target.value })} placeholder="Linkedin Id" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.linkedinIdError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row style={{margin:"20px"}}>
                                                <Col md="6" className="pl-1">
                                                    <Form.Group>
                                                        <label>{t('youtube_id')}</label>
                                                        <Form.Control name="youtubeId" value={getUserDetails.youtubeId} onChange={e => setUserDetails({ ...getUserDetails, youtubeId: e.target.value })} placeholder="Youtube Id" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.youtubeIdError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6" className="pl-1">
                                                    <Form.Group>
                                                        <label>{t('skype_id')}</label>
                                                        <Form.Control name="skypeId" value={getUserDetails.skypeId} onChange={e => setUserDetails({ ...getUserDetails, skypeId: e.target.value })} placeholder="Skype Id" type="text" ></Form.Control>
                                                        <p style={{ fontSize: 12, color: "red" }}>
                                                            {getUserDetails.skypeIdError}
                                                        </p>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row style={{ display: 'none' }}>
                                                <Col className="pr-1" md="4">
                                                    <Form.Group>
                                                        <label>{t('details_updated_by')}</label>
                                                        <Form.Control disabled value={getUserDetails.learnerUsername} placeholder="Details Updated By" >
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="px-1" md="4">
                                                    <Form.Group>
                                                        <label>{t('learner_username')}</label>
                                                        <Form.Control disabled value={getUserDetails.learnerUsername} placeholder="Details Updated By" >
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <Button className="btn-fill pull-right mt-3" onClick={handleSubmit} variant="info">{t('update_profile')}</Button>
                                            <div className="clearfix"></div>
                                        </Form>

                                    </Card.Body>
                                </Card>
                            </RenderOnAuthenticated>
                        </Col>
                        <Col md="1"></Col>
                    </Row>
                    <br></br>
                </Container>
                <br></br>
            </div>
        </Styles>

    );

}

export default UserProfile;