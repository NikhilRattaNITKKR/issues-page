import { 
    FETCH_REQUEST,
    FETCH_ISSUES,
    FETCH_MORE_ISSUES,
    ISSUE_ERROR
} from "../Types"

const initialState = {
    issues: [],
    err: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    console.log("a ", action)
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                err: null,
                loading: true
            }
        case FETCH_ISSUES:
            console.log("b", action)
            return {
                issues: action.payload,
                err: null,
                loading: false
            }
        case FETCH_MORE_ISSUES:
            console.log("c", action)
            return {
                issues: [...state.issues, ...action.payload],
                err: null,
                loading: false
            }
        case ISSUE_ERROR:
            return {
                issues: [],
                err: action.payload,
                loading: false
            }

        default:
            return state
    }
}

export default reducer
