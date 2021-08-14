import firebase from 'firebase';
import 'firebase/auth';

export const SET_FIELD = 'SET_FIELD';
export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({ type: RESET_FORM });

export const setField = (field, value) => ({ type: SET_FIELD, field, value });

export const SET_SERIE = 'SET_SERIE';
export const setSerie = serie => ({ type: SET_SERIE, serie });

export const saveSerie = serie => async dispatch => {
    const { currentUser } = firebase.auth();

    if (serie.id) {
        await firebase
            .database()
            .ref(`/users/${currentUser.uid}/series/${serie.id}`)
            .set(serie);
    } else {
        await firebase
            .database()
            .ref(`/users/${currentUser.uid}/series`)
            .push(serie);
    }

    dispatch(resetForm());
}