import axios from "axios";
import UserService from "./UserService";
import {COURSE_URL, COURSE_CLUG, Communication, USER_API, USER_API2} from "./service";

const USER_API_KEYCLOCK = USER_API + "um_auth/";

const BULK_UPLOAD_URL = USER_API + "um_bulk/upload";


/* Testimonials */
const TESTIMONIAL_API = Communication + "/testimonial/";

const requesOfLearnerForCourse = COURSE_CLUG +'/api';

const approve_reject_content = `${COURSE_URL}/courseOrganizer`;

const Enable_Disable_User =  USER_API + "um_auth"

const Cadre_Qualification_Designation_CURD = USER_API2 + "um_api"

const CheckEmail = USER_API + "domainList/validate"



class adminServices {

    /* for user service */
    getAllLearners() {
        return axios.get(USER_API + "learner");
    }
    getAllInstructors() {
        return axios.get(USER_API + "learner/getInstructorList");
    }
    getUserImage(userId) {
        return axios.get(USER_API + "getprofilepic/" + userId)
    }
    getAllInstructorRequest() {

        return axios.get(USER_API + "getUserRequestInstructorList?status=pending")
        // return axios.get(USER_API + "getUserRequestInstructorList")
    }
    getLearnerByid(userId) {
        return axios.get(USER_API + "learner/byId?userid=" + userId)
    }
    disableUser(userId) {
        return axios.post(USER_API_KEYCLOCK + "DUser/" + userId);
    }
    enableUser(userId) {
        return axios.post(USER_API_KEYCLOCK + "EUser/" + userId);
    }
    getAllRequestForLearner(){
        return axios.get(USER_API + "learnerlistforadminapproval" );
    }

    

    // By Dhirendra
    putRejectInstructorRequestURL(rowId , rejectRemark){ 
        return axios.post(USER_API + `rejectInstRequest?id=${rowId}&remarks=${rejectRemark}`);
    }

    getRequestOfLearnerForCourse(courseId){
        return axios.get(requesOfLearnerForCourse + "/getUnapprovedCourseEnrollRequest/" + courseId);
    }

    getRequestOfLearnerForLibrary(courseId){
        return axios.get(requesOfLearnerForCourse + "/getUnapprovedCourseEnrollRequest/" + courseId);
    }

    /* Testimonials Methods Start */

    getAllTestimonial() {
        return axios.get(TESTIMONIAL_API + "getAllTestimonial");
    }

    approveTestimonials(testId) {
        return axios.post(TESTIMONIAL_API + "approve/" + testId);
    }

    rejectTestimonials(testId) {
        return axios.post(TESTIMONIAL_API + "reject/" + testId);
    }

    /* Testimonials Methods End */

    /* Bulk User Registration */

    bulkUserUpload(fileData, userId) {
        let formData = new FormData();
        formData.append("file", fileData);
        // formData.append("programId", programId);
        formData.append("updatedBy", userId);
        //return axios.post(BULK_UPLOAD_URL, formData);
        return axios.post(BULK_UPLOAD_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }


    enableLearnerUser(userId){
        return axios.post(Enable_Disable_User+`/EUser/${userId}`);
    }

    disableLearnerUser(userId){
        return axios.post(Enable_Disable_User+`/DUser/${userId}`);
    }



    ///////  DESINATION //////

    addDesignation(desig){
        return axios({
            method : "POST",
            url : Cadre_Qualification_Designation_CURD+`/desig`,
            data : desig,
        })
    }

    getAllDesignation(){
        return axios({
            method : "GET",
            url : Cadre_Qualification_Designation_CURD+`/desig`,
        })
    }

    getDesignationById(id){
        return axios({
            method : "GET",
            url : Cadre_Qualification_Designation_CURD+`/desig/${id}`,
        })
    }
                    
    UpdateDesignation(desig){
        return axios({
            method : "POST",
            url : Cadre_Qualification_Designation_CURD+`/updatedesig`,
            data : desig,
        })
    }

    deleteDesignation(id){
        return axios.post(Cadre_Qualification_Designation_CURD+`/desig/${id}`);
    }

    //////  QUALIFICATION   ///////

    addQualification(qualf){
        return axios({
            method : "POST",
            url : Cadre_Qualification_Designation_CURD+`/qualf`,
            data : qualf,
        })
    }

    getAllQualification(){
        return axios({
            method : "GET",
            url : Cadre_Qualification_Designation_CURD+`/qualf`,
        })
    }

    getQualificationById(id){
        return axios({
            method : "GET",
            url : Cadre_Qualification_Designation_CURD+`/qualf/${id}`,
        })
    }

    UpdateQualification(qualf){
        return axios({
            method : "POST",
            url : Cadre_Qualification_Designation_CURD+`/updatequalf`,
            data : qualf,
        })
    }

    deleteQualification(id){
        return axios.post(Cadre_Qualification_Designation_CURD+`/qualf/${id}`);
    }


    approveContent(id1,cid){

        const data1 = {
            courseId : cid,
            contentId : id1
        } 
        return axios.post(approve_reject_content+"/approveContent",data1)
    }


    rejectContent(data1){

        return axios.post(approve_reject_content+"/rejectContent",data1);
        
        // return axios({
        //     method : "POST",
        //     url : approve_reject_content+"/rejectContent",
        //     data : data1,
        // })
    }

    checkEmailSpam(email){
        return axios.get(CheckEmail+`/${email}`);
    }

}

export default new adminServices()