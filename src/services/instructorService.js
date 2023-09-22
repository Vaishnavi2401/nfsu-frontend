import axios from "axios";
import { DMS_URL, COURSE_URL, COURSE_CLUG, COURSE_CLONE } from "./service";

//DMS_URL is document management service

class instructorService {

    /* Category Services Start here  */

    addCourseCategory(data) {
        return axios.post(COURSE_URL + "/courseOrganizer/addCategory", data);
    }

    getAllCourseCategory() {
        return axios.get(COURSE_URL + "/courseOrganizer/getAllCategories");
    }

    deleteCategory(categoryId) {
        return axios.post(COURSE_URL + "/courseOrganizer/deleteCategory/" + categoryId);
    }

    editCategory(data) {
        return axios.post(COURSE_URL + "/courseOrganizer/updateCategory", data);
    }
    /* Category Services End here  */

    /* Course Create Services Start */

    createCourse(feeSelectVal, courseFeeVal, courseNameVal, courseCategoryVal, durationVal , type , durationSelectVal, publishDateVal, enrollStartDateVal, enrollEndDateVal,
        commencementDateVal, courseIcon,iconsig, banner,bannersig, video,videosig, instructorProfile, Objective, gDetails, prerequisite, isScormCompliant, userId, fee_discount) {
        let formData = new FormData();
        formData.append("courseType", feeSelectVal);
        if (feeSelectVal == "free" || feeSelectVal == "restricted") {
            formData.append("courseFee", 0);
        } else {
            formData.append("courseFee", courseFeeVal);
        }
        formData.append("courseName", courseNameVal);
        formData.append("categoryId", courseCategoryVal);
        formData.append("courseAccessType", durationSelectVal);
        if (durationSelectVal == "unlimited") {
            formData.append("duration", 0);
        } else {
            formData.append("duration", durationVal);
        }
        formData.append("publishDate", publishDateVal);
        formData.append("enrollSdate", enrollStartDateVal);
        formData.append("enrollEdate", enrollEndDateVal);
        formData.append("commencementDate", commencementDateVal);
        formData.append("file", courseIcon);
        formData.append("filesig", iconsig);
        formData.append("video", video);
        formData.append("videosig", videosig);
        formData.append("banner", banner);
        formData.append("bannersig", bannersig);
        // type 1 is for Course and 2 for library 
        formData.append("type", type);
        if (gDetails == '') {
            formData.append("generalDetails", undefined);
        } else {
            formData.append("generalDetails", gDetails);
        }
        if (prerequisite == '') {
            formData.append("prerequisite", undefined);
        } else {
            formData.append("prerequisite", prerequisite);
        }
        if (Objective == '') {
            formData.append("objective", undefined);
        } else {
            formData.append("objective", Objective);
        }
        formData.append("inst_profile", instructorProfile);
        formData.append("isScormCompliant", isScormCompliant);
        formData.append("userId", userId);
        formData.append("fee_discount", fee_discount);
        // console.log("formData", formData);
        return axios.post(COURSE_URL + "/courseOrganizer/addCourse/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    updateCourse(feeSelectVal, courseFeeVal, courseNameVal, courseCategoryVal, durationVal, durationSelectVal, publishDateVal, enrollStartDateVal, enrollEndDateVal,
        commencementDateVal, courseIcon,iconsig, banner,bannersig, video,videosig, instructorProfile, Objective, gDetails, prerequisite, isScormCompliant, userId, courseId, fee_discount) {
        // console.log("phlesasasasasas", feeSelectVal, courseFeeVal, courseNameVal, courseCategoryVal, durationVal, durationSelectVal, publishDateVal, enrollStartDateVal, enrollEndDateVal,
        //     commencementDateVal, courseIcon, banner, video, instructorProfile, Objective, gDetails, prerequisite, isScormCompliant, userId, courseId, fee_discount)
        let formData = new FormData();
        formData.append("courseType", feeSelectVal);
        if (feeSelectVal == "free" || feeSelectVal == "restricted") {
            formData.append("courseFee", 0);
        } else {
            formData.append("courseFee", courseFeeVal);
        }
        formData.append("courseName", courseNameVal);
        formData.append("categoryId", courseCategoryVal);
        formData.append("courseAccessType", durationSelectVal);
        if (durationSelectVal == "unlimited") {
            formData.append("duration", 0);
        } else {
            formData.append("duration", durationVal);
        }
        formData.append("publishDate", publishDateVal);
        formData.append("enrollSdate", enrollStartDateVal);
        formData.append("enrollEdate", enrollEndDateVal);
        formData.append("commencementDate", commencementDateVal);
        formData.append("file", courseIcon);
        formData.append("filesig", iconsig);
        formData.append("video", video);
        formData.append("videosig", videosig);
        formData.append("banner", banner);
        formData.append("bannersig", bannersig);
        if (gDetails == '') {
            formData.append("generalDetails", undefined);
        } else {
            formData.append("generalDetails", gDetails);
        }
        if (prerequisite == '') {
            formData.append("prerequisite", undefined);
        } else {
            formData.append("prerequisite", prerequisite);
        }
        if (Objective == '') {
            formData.append("objective", undefined);
        } else {
            formData.append("objective", Objective);
        }
        formData.append("inst_profile", instructorProfile);
        formData.append("isScormCompliant", isScormCompliant);
        formData.append("userId", userId);
        formData.append("courseId", courseId)
        formData.append("fee_discount", fee_discount);
        // console.log("bad me", feeSelectVal, courseFeeVal, courseNameVal, courseCategoryVal, durationVal, publishDateVal, enrollStartDateVal, enrollEndDateVal,
        //     commencementDateVal, courseIcon, Objective, gDetails, prerequisite, isScormCompliant, userId, courseId);
        return axios.post(COURSE_URL + "/courseOrganizer/updateCourse/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })

    }

    getAllCourses() {
        return axios.get(COURSE_URL + "/courseOrganizer/getCourses")
    }

    getCourseById(cId) {
        return axios.get(COURSE_URL + "/courseOrganizer/getCourses/" + cId);
    }

    getLibraryById(cId) {
        return axios.get(COURSE_URL + "/courseOrganizer/getLibraries/" + cId);
    }

    getLibraryContent(id){
        return axios.get(COURSE_URL+`/courseOrganizer/getInstLibraryStructure/${id}`);
    }

    /* Course Create Services End */

    /* Create Course Structure and Get All Code Start Here */


    contentDetails(dir_id, user_id) {
        return axios.get(DMS_URL + "/dms/getContentDetails/" + dir_id + "/" + user_id);
    }


    createDirectory(data) {
        return axios.post(DMS_URL + "/dms/addRootDirectory/", data);
    }

    createChildDirectory(data) {
        return axios.post(DMS_URL + "/dms/addChildDirectory/", data)
    }

    getFolderStructure(userId) {
        return axios.get(DMS_URL + "/dms/getDirectories/" + userId);
    }

    fileUpload(file,filesig, user_id, dir_name, durationInMinutes, contentName, fileSelectedOption, checkBox) {
        //console.log(file);
        let formData = new FormData();
        formData.append("file", file);
        formData.append("fileSig", filesig);
        formData.append("user_id", user_id)
        formData.append("dir_name", dir_name);
        formData.append("durationInMinutes", durationInMinutes);
        formData.append("contentName", contentName);
        formData.append("zipStatus", checkBox);
        formData.append("fileSelectedOption",fileSelectedOption);
         return axios.post(DMS_URL + "/dms/fileUpload/", formData, {
             headers: {
                 "Content-Type": "multipart/form-data",
             }
         })
            // return axios.post(DMS_URL + "/dms/fileUploadmediacms/", formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     }
            // })
    }

    // fileUpload(file,filesig, user_id, dir_name, durationInMinutes, contentName, fileSelectedOption, checkBox) {
    //     //console.log(file);
    //     let formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("fileSig", filesig);
    //     formData.append("user_id", user_id)
    //     formData.append("dir_name", dir_name);
    //     formData.append("durationInMinutes", durationInMinutes);
    //     formData.append("contentName", contentName);
    //     formData.append("zipStatus", checkBox);
    //     formData.append("fileSelectedOption",fileSelectedOption);
    //     return axios.post(DMS_URL + "/dms/fileUploadmediacms/", formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         }
    //     })
    // }

    contentDetails(dir_id, user_id) {
        return axios.get(DMS_URL + "/dms/getContentDetails/" + dir_id + "/" + user_id);
    }

    deleteDirectory(data) {
        return axios.post(DMS_URL + "/dms/deleteDirectory", data);
    }

    directoryStatusCheck(dirId) {
        return axios.post(DMS_URL + "/dms/directoryStatusCheck/" + dirId)
    }

    contentDelete(contentId) {
        return axios.post(DMS_URL + "/dms/deleteContent/" + contentId);
    }

    fileCotentDetailsUpdate(data) {
        return axios.post(DMS_URL + "/dms/updateContent", data)
    }

    folderNameUpdate(data) {
        return axios.post(DMS_URL + "/dms/updateDirectory", data);
    }

    contentAccess(url) {
        return axios.get(url);
    }

    getContentAccess(url){
        return axios.get(`${DMS_URL}/${url}`)
    }

    /* Create Course Structure and Get All Code Start Here */

    /* Course Structure API Methods */

    addContentToCourseStructure(data) {
        return axios.post(COURSE_URL + "/courseOrganizer/addContent", data)
    }

    checkContentStatus(contentId) {
        return axios.get(COURSE_URL + "/courseOrganizer/contentStatusCheck/" + contentId);
    }

    deleteCourseContent(data) {
        return axios.post(COURSE_URL + "/courseOrganizer/deleteContent", data);
    }

    deleteCourseStructureChild(data) {
        return axios.post(COURSE_URL + "/courseOrganizer/deleteChild", data);
    }

    addModuleOrTopic(data) {
        return axios.post(COURSE_URL + "/courseOrganizer/addChild", data);
    }

    courseDelete(id) {
        return axios.post(COURSE_URL + "/courseOrganizer/deleteCourse/" + id);
    }

    updateFolderDetails(data) {
        return axios.post(COURSE_URL + "/courseOrganizer/updateChild", data);
    }

    updateContentDetails(data) {
        return axios.post(COURSE_URL + "/courseOrganizer/updateContent", data);
    }

    coursePublish(cId) {
        return axios.post(COURSE_URL + "/courseOrganizer/publishCourse/" + cId);
    }

    LibraryPublish(cId) {
        return axios.post(COURSE_URL + "/courseOrganizer/publishLibrary/" + cId);
    }

    coursePublishAdminRequest(cId) {
        return axios.post(COURSE_URL + "/courseOrganizer/requestAdminforPublishCourse/" + cId);
    }

    libraryPublishAdminRequest(cId) {
        return axios.post(COURSE_URL + "/courseOrganizer/requestAdminforPublishLibrary/" + cId);
    }

    ContentPublishAdminRequest(cId) {
        return axios.post(COURSE_URL + "/courseOrganizer/requestAdminforPublishContent/" + cId);
    }

    LibraryDisableStatus(cId){
        return axios.post(COURSE_URL + "/courseOrganizer/LibraryDisableStatus/" + cId);
    }

    courseUnPublish(cId) {
        return axios.post(COURSE_URL + "/courseOrganizer/UnPublishCourse/" + cId);
    }

    libraryUnPublish(cId) {
        return axios.post(COURSE_URL + "/courseOrganizer/UnPublishLibrary/" + cId);
    }

    // libraryUnPublish(cId) {
    //     return axios.post(COURSE_URL + "UnPublishLibrary/" + cId);
    // }

    CourseDisable(cId) {
        return axios.post(COURSE_URL + "/courseOrganizer/CourseDisableStatus/" + cId);
    }

    LibraryDisable(cId) {
        return axios.post(COURSE_URL + "/courseOrganizer/LibraryDisableStatus/" + cId);
    }
    //  get time and date call this api

    getServerTime() {
        return axios.get(COURSE_URL + "/courseOrganizer/getSystemDate/");
    }

    /////  Library  Services   ///

    addLibrary(data1){
        return axios({
            method : "POST",
            url : COURSE_URL+`/courseOrganizer/addLibrary`,
            data : data1,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }) 

    }


}

export default new instructorService()