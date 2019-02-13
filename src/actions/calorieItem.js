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

export const editCalorieItem = (id, edit) => ({
    type: 'EDIT_CALORIE_ITEM',
    id,
    edit
});