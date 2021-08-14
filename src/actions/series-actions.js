import firebase from 'firebase';
import 'firebase/auth';
import { Alert } from 'react-native';

export const SET_SERIES = 'SET_SERIES';
export const setSeries = series => ({ type: SET_SERIES, series });

export const watchSeries = () => async dispatch => {
    const { currentUser } = firebase.auth();

    await firebase
        .database()
        .ref(`/users/${currentUser.uid}/series`)
        .on('value', snapshot => {
            const series = snapshot.val();
            dispatch(setSeries(series));
        });
}

export const deleteSerie = serie => dispatch => {
    return new Promise((resolve, reject) => {
        Alert.alert(
            'Exclusão',
            `Deseja excluir a série ${serie.title}`,
            [{
                text: 'Não',
                style: 'cancel',
                onPress: () => resolve(false)
            }, {
                text: 'Sim',
                onPress: async () => {
                    const { currentUser } = firebase.auth();

                    try {
                        await firebase
                            .database()
                            .ref(`/users/${currentUser.uid}/series/${serie.id}`)
                            .remove();
                            
                        resolve(true);
                    } catch (error) {
                        resolve(error);
                    }
                }
            }],
            { cancelable: false }
        );
    });
}