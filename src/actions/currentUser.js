import database from '../firebase/firebase';
import { startRenderGoal } from './nutritionGoals';
import { startSetCalorie } from './calorieItem';
import { startSetHashtags } from './statusFeatures';
import { startSetStatus, startSetImages } from './postStatus';
import { startSetComment } from './comment';
// import configureStore from '../store/configureStore';

// const store = configureStore();

export const setCurrentUser = (user) => ({
    type: 'SET_CURRENT_USER',
    user
});

export const startSetCurrentUser = (email) => {
    return (dispatch) => {
        return database.ref('users').once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (email === childSnapshot.val().email) {
                    dispatch(setCurrentUser({
                        ...childSnapshot.val(),
                        id: childSnapshot.key,
                        googleId: childSnapshot.val().id
                    }));
                    dispatch(startRenderGoal(childSnapshot.key));
                    dispatch(startSetCalorie(childSnapshot.key));
                    dispatch(startSetHashtags());
                    dispatch(startSetStatus());
                    dispatch(startSetComment());
                    dispatch(startSetImages());
                };
            });
        })
    };
};


// store.dispatch(startRenderGoal());
// store.dispatch(startSetCalorie());
// store.dispatch(startSetHashtags());
// store.dispatch(startSetStatus());
// store.dispatch(startSetComment());
// store.dispatch(startSetImages());