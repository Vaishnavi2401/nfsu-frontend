import { PAID_COURSE_TYPE, FREE_COURSE_TYPE, SEARCH, CATEGORY, ENROLLED, SEARCHENGINE } from '../Types/courseTypes';

export const paidCoursesStatus = (data) => {

    

    return {
        type: PAID_COURSE_TYPE,
        payload: data
    }
}

export const freeCoursesStatus = (data) => {

    

    return {
        type: FREE_COURSE_TYPE,
        payload: data
    }
}

export const search = (data) => {

    

    return {
        type: SEARCH,
        payload: data
    }
}

export const categoryData = (data) => {
    

    return {
        type: CATEGORY,
        payload: data
    }
}

export const searchEngine = (data) => {

    return {
        type: SEARCHENGINE,
        payload: data
    }
}



