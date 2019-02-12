// CALORIE ITEM ACTIONS
export const addCalorie = (calorieData) => ({
    type: 'ADD_CALORIE_ITEM',
    calorieData
});

export const removeCalorieItem = ({ id }) => ({
    type: 'REMOVE_CALORIE_ITEM',
    id
});

export const editCalorieItem = (id, edit) => ({
    type: 'EDIT_CALORIE_ITEM',
    id,
    edit
});