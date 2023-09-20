import axios from "axios"
import {COURSE_URL, CERTIFICATION, COURSE_CLUG, LEARNING_ANALYTICS, QUIZRESULT} from "./service";

const COURSE_FATCH_URL = `${COURSE_URL}/courseOrganizer/`;

const COURSES_CATELOUGE = COURSE_CLUG +'/api/';

const ASSIGNED_QUIZZES_STATUS = QUIZRESULT + '/assign/get/getAssignedQuizzesWithStatusByUserIdAndCourseId';

const GET_LOG = LEARNING_ANALYTICS + '/la_an/'



class learnerService {

    getPublishCourses() {
        return axios.get(COURSE_FATCH_URL + "getPublishCourses");
    }

    getCourseMetadataById(courseId) {
        return axios.get(COURSE_FATCH_URL + "getCourseMetadata/" + courseId);
    }

    getCourseStructureById(courseId) {
        return axios.get(COURSE_FATCH_URL + "getCourseStructure/" + courseId);
    }

    getLibraryStructureById(courseId) {
        return axios.get(COURSE_FATCH_URL + "getPubLibraryStructure/" + courseId);
    }

    getLibraryStructureForAdminById(courseId) {
        return axios.get(COURSE_FATCH_URL + "getInstLibraryStructure/" + courseId);
    }


    getUserEnrolledByCourse(courseId, tenantId) {
        return axios.get(COURSES_CATELOUGE + "getCourseEnrolledLearners/" + courseId + "/" + tenantId);
    }

    getCourseInstructors(courseId, tenantId) {
        return axios.get(COURSES_CATELOUGE + "getCourseInstructors/" + courseId + "/" + tenantId);
    }

    getAssignedQuizzesStatus(userId,courseId){
        return axios.get(ASSIGNED_QUIZZES_STATUS + "/" + userId + "/" + courseId);
    }

    toGenerateCertificate(userId, courseId, tenantId){
       
        return axios.get(CERTIFICATION + '/certificate/gencert/' + userId + '/' + courseId + '/' + tenantId);
    }

    toDownloadCertificate(courseId, fileCode){
       
         let url = CERTIFICATION + '/certificate/downloadFile/' + courseId + '/' + fileCode;
        return axios.get(url,  { responseType: 'arraybuffer' });
    }

    certificateVerification(certificateId){
        return axios.get(CERTIFICATION + '/certificate/verifycertificate?certificateid=' + certificateId);
    }

    getLearnerActivityLog(userId , fromDate , toDate){
        return axios.get(GET_LOG+`activitylogbydaterange/${userId}?fromdate=${fromDate}&todate=${toDate}`)
    }

    getLearnerTimeSpend (userId , courseId , fromDate , toDate) {
        return axios.get(GET_LOG+`timespentresbydaterange/${userId}/${courseId}?fromdate=${fromDate}&todate=${toDate}`)
    }

    getLearnerContentAccessLog (userId , courseId , fromDate , toDate ){
        return axios.get(GET_LOG+`contentaccessbydaterange/${userId}/${courseId}?fromdate=${fromDate}&todate=${toDate}`)
    }
    

}
export default new learnerService