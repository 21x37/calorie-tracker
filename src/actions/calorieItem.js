import database from '../firebase/firebase';

// CALORIE ITEM ACTIONS
export const addCalorie = (calorieData) => ({
    type: 'ADD_CALORIE_ITEM',
    calorieData
});

export const startAddCalorie = (calorieData) => {
    return (dispatch, getState) => {

        return database.ref('calorieItem').push(calorieData).then((ref) => {
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

export const startRemoveCalorieItem = ({ id }) => {
    return (dispatch) => {
        return database.ref(`calorieItem/${id}`).remove().then(() => {
            dispatch(removeCalorieItem({ id }))
        })
    };
};

export const setCalorie = (calorie) => ({
    type: 'SET_CALORIE',
    calorie
});

export const startSetCalorie = () => {
    return (dispatch) => {
        return database.ref('calorieItem').once('value').then((snapshot) => {
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

export const startEditCalorieItem = (id, updates) => {
    return (dispatch) => {
        return database.ref(`calorieItem/${id}`).update(updates).then(() => {
            dispatch(editCalorieItem(id, updates));
        })
    }
}