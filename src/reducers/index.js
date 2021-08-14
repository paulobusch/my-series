import { combineReducers } from "redux";
import newSerieForm from "./new-serie-form";
import serieReducer from './serie-reducer';

import userReducer from './user-reducer';

export default combineReducers({
    user: userReducer,
    serieForm: newSerieForm,
    serieList: serieReducer
});