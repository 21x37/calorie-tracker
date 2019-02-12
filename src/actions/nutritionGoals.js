
// NUTRITION GOAL ACTIONS
export const setGoal = (calorieGoal, proteinGoal, carbsGoal, fatsGoal,) => ({
    type: 'SET_GOAL',
    calorieGoal,
    proteinGoal,
    carbsGoal,
    fatsGoal
});

export const editGoal = (edit) => ({
    type: 'EDIT_GOAL',
    edit
});

export const discardGoal = () => ({
    type: 'DISCARD_GOAL'
});

