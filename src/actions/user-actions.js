import firebase from '@firebase/app';
import '@firebase/auth';
import { Alert } from 'react-native';

export const USER_LOGIN = 'USER_LOGIN';
export const userLogin = user => ({ type: USER_LOGIN, user });

export const USER_LOGOUT = 'USER_LOGOUT';
export const userLogout = () => ({ type: USER_LOGOUT });

export const processLogin = ({ email, password }) => dispatch => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(userLogin(user));
            return user;
        })
        .catch(error => {
            if (error.code === 'auth/user-not-found') {
                return new Promise((resolve, reject) => {
                    Alert.alert(
                        'Usuário não encontrado',
                        'Deseja criar um novo usuário!',
                        [{
                            text: 'Não',
                            onPress: resolve
                        }, {
                            text: 'Sim',
                            onPress: () => { 
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(email, password)
                                    .then(resolve)
                                    .catch(reject);
                            }
                        }],
                        { cancelable: false }
                    );
                })
            }
            return Promise.reject(error);
        });
}