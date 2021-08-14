import { SET_FIELD, SET_SERIE, RESET_FORM } from "../actions/new-serie-form";

const INITIAL_STATE = {
    id: null,
    title: '',
    gender: 'Ação',
    rate: 0,
    img: '',
    description: ''
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SET_FIELD:
            return { ...state, [action.field]: action.value };
        case SET_SERIE:
            return action.serie;
        case RESET_FORM:
            return INITIAL_STATE;
        default: 
            return state;
    }
}