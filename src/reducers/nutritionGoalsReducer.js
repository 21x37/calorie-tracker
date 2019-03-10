// GOALS REDUCER 

const nutritionGoalsReducerDefaultState = {
    calorieGoal: 0,
    proteinGoal: 0,
    carbsGoal: 0,
    fatsGoal: 0,
}

export const nutritionGoalsReducer = (state = nutritionGoalsReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_GOAL':
            return {
                ...state,
                calorieGoal: action.calorieGoal,
                proteinGoal: action.proteinGoal,
                carbsGoal: action.carbsGoal,
                fatsGoal: action.fatsGoal
            }
        case 'EDIT_GOAL':
            return {
                ...state,
                ...action.edit
            }
        case 'DISCARD_GOAL':
            return { ...nutritionGoalsReducerDefaultState }
        case 'RENDER_GOAL':
            return action.goal;
        case 'REMOVE_GOAL':
            return nutritionGoalsReducerDefaultState;
        default:
            return state;
    };
};

export default nutritionGoalsReducer;