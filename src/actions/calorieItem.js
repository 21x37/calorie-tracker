import database from '../firebase/firebase';

// CALORIE ITEM ACTIONS
export const addCalorie = (calorieData) => ({
    type: 'ADD_CALORIE_ITEM',
    calorieData
});

export const startAddCalorie = (ref, calorieData) => {
    return (dispatch, getState) => {

        return database.ref(`users/${ref}/calories`).push(calorieData).then((ref) => {
            dispatch(addCalorie({
                id: ref.key,
                ...calorieData
            }));
        });
    };
};

export const removeCalorieItem = ({ id }) => ({ 
    type: 'REMOVE_CALORIE_ITEM',
    id
});

export const startRemoveCalorieItem = (ref, { id }) => {
    return (dispatch) => {
        return database.ref(`users/${ref}/calories/${id}`).remove().then(() => {
            dispatch(removeCalorieItem({ id }))
        })
    };
};

export const setCalorie = (calorie) => ({
    type: 'SET_CALORIE',
    calorie
});

export const startSetCalorie = (ref) => {
    return (dispatch) => {
        return database.ref(`users/${ref}/calories`).once('value').then((snapshot) => {
            const calorieData = [];

            snapshot.forEach((childSnapshot) => {
                calorieData.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setCalorie(calorieData));
        });
    };
};

export const editCalorieItem = (id, updates) => ({
    type: 'EDIT_CALORIE_ITEM',
    id,
    updates
});

export const startEditCalorieItem = (ref, id, updates) => {
    return (dispatch) => {
        return database.ref(`users/${ref}/calories/${id}`).update(updates).then(() => {
            dispatch(editCalorieItem(id, updates));
        })
    }
};

export const removeAllCalories = () => ({
    type: 'REMOVE_ALL_CALORIES'
})

export const startRemoveAllCalories = (ref) => {
    return (dispatch) => {
        return database.ref(`users/${ref}/calories`).remove(() => {
            dispatch(removeAllCalories());
        })
    }
}

export const startRemoveCalorie = () =>  ({
    type: 'REMOVE_CALORIE'
});