import axios from "axios"

import { 
    FETCH_REQUEST,
    FETCH_ISSUES,
    ISSUE_ERROR,
    FETCH_MORE_ISSUES
} from "../Types"

export const getIssues = (username, repo, page) => async dispatch => {
   
    dispatch({
        type: FETCH_REQUEST,

     })
    try {
        const endpoint = `https://api.github.com/repos/${username}/${repo}/issues?page=${page}&per_page=20`;
        let res = await axios.get(endpoint);
        let data = res.data;
        dispatch({
            type: FETCH_ISSUES,
            payload: data
        });
    }
    catch(err) {
        dispatch({
            type: ISSUE_ERROR,
            payload: err.message
        });
    }
}


export const getMoreIssues = (username, repo, page) => async dispatch => {
    
    dispatch({
        type: FETCH_REQUEST,
     })
    try {
        const endpoint = `https://api.github.com/repos/${username}/${repo}/issues?page=${page}&per_page=20`;
        let res = await axios.get(endpoint);
        let data = res.data;
        dispatch({
            type: FETCH_MORE_ISSUES,
            payload: data
        });
    }
    catch(err) {
        dispatch({
            type: ISSUE_ERROR,
            payload: err.message
        });
    }
}



