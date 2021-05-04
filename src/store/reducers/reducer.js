import * as actionTypes from '../actions/actionTypes';

const initialState = {
    taskList: [],
    user: [],
    loading: false,
    taskStatus: '',
    taskDetails: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TASK_DETAILS:
            return {
                ...state,
                loading: false,
                taskDetails: action.taskDetails
            }
        case actionTypes.START_ADD_TASK:
            return {
                ...state,
                loading: action.loading,
                taskStatus: action.taskStatus
            }
        case actionTypes.SET_TASKS:
            return {
                ...state,
                taskList: action.taskList,
                loading: action.loading,
                taskStatus: action.taskStatus
            };
        case actionTypes.FETCH_TASKS:
            return {
                ...state,
                taskList: action.tasks,
            };
        case actionTypes.CHECK_TASKS:
            return state;
        
        case actionTypes.ADD_TASK:
            return {
                ...this.state,
                task: action.task
            };
        case actionTypes.UPDATE_TASK:
            return state;
        case actionTypes.REMOVE_TASK:
            return state;
        default: return state;
            
    }
};

export default reducer;