import { USER_LOGIN, USER_LOGOUT } from '../actions/user-actions';

export default function userReducer(state = null, action) {
    switch(action.type) {
        case USER_LOGIN:
            return action.user;
        case USER_LOGOUT:
            return action.user;
        default:
            return state;
    }
}