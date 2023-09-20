import axios from "axios";
import { assign } from "lodash";
import Header from "react-modal-image/lib/Header";
import UserService from "./UserService";
import {Assignment} from "./service";



const getAssignmentDetail = Assignment +"/assignment/instructor/"
//this will list out the assignment created by the Inst
const postAssignmentDetail = Assignment +"/assignment/assignment/"
//this is use to create the assignment at the instructor side with meta data
const postFileUpload = Assignment + "/assignment/fileonlyadd/"
// this api is use to upload the File at inst side
const updateAssignmentDetail = Assignment + "/assignment/assignmentupdate"
//this is use to update the assignment meta data at the instructor side with meta data

const deleteAssignment = Assignment + "/assignment/assignmentdelete/"
const deleteFile =  Assignment + "/assignment/fileonlydelete/"


const studentAssignListAPI = Assignment + "/assignment/student/"
//This will list out the Assignment at the LEarner side with Opening and closing date

const assignmentData = Assignment + '/assignment/getassignbyid/'
export const getFileToView = Assignment + '/assignment/getfile/'

const studentFileUpload = Assignment + '/assignment/solutionsubmit/'
//This is use to upload the file at the Learner side
const getStudentFileUpload = Assignment + '/assignment/getsolbyassignandsubmittedby/'
const getAssignmentSubmittedList= Assignment+ '/assignment/getsolbycourseandtenantassign/'
const putEvaluatedBy = Assignment + '/assignment/evaluate/'
const solutionFileDelete = Assignment + '/assignment/solutionfileonlydelete/'
// This is use to delete the File at the learner side. make sure that at reuploading the file previous or current file must be delete then only file can be upload by the learner


export const getSolutionFile = Assignment + '/assignment/getsolnfile/'




class AssignmentService {

    getAssignDetail(userID, courseID, tenantID) {
        return axios.get(getAssignmentDetail + `${userID}/${courseID}/${tenantID}`);
    }
    postFileUpload(assignid, data) {
        return axios.post(postFileUpload + `${assignid}`, data);
    }
    postAssignmentDetail(ReqBodyInfoSave) {
        return axios.post(postAssignmentDetail, ReqBodyInfoSave)
    }
    deleteAssignment(assignID) {
        return axios.post(deleteAssignment + `${assignID}`);
    }
    fileOnDelete(fileID) {
        return axios.post(deleteFile + `${fileID}`);
    }
    updateAssignmentDetail(ReqBodyInfo) {
        return axios.post(updateAssignmentDetail, ReqBodyInfo)
    }

    getListStudentAssignment(courseID, tenantID) {
        return axios.get(studentAssignListAPI + `${courseID}/${tenantID}`)
        //return axios.get(getAssignmentDetail + `${userID}/${courseID}/${tenantID}`);
    }

    getAssignmentData(assignid) {
        return axios.get(assignmentData + assignid);
    }

    getfileView(fileId) {
        return axios.get(getFileToView + fileId)
    }

    postStudentFileUpload(assignId, userId, studFile) {
        return axios({
            method : "POST" ,
            url: studentFileUpload+`${assignId}/${userId}`,
            data : studFile,
            headers : {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    getStudentFileUpload (assignId , UserId){
        return axios.get(getStudentFileUpload+`${assignId}/${UserId}`)
    }
    getAssignmentSubmittedList(courseId , tenantId , assignId){
        return axios.get(getAssignmentSubmittedList+`${courseId}/${tenantId}/${assignId}`)
    }
    putEvaluatedBy(evalBody){
        return axios.post(putEvaluatedBy, evalBody)

    }
    solutionfileonlydelete(id){
        return axios.post(solutionFileDelete+id);
    }


}

export default new AssignmentService();


