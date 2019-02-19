const calorieReducerDefaultState = []
// CALORIE ITEM REDUCER
export const calorieItemReducer = (state = calorieReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_CALORIE_ITEM':
            return [
                ...state,
                action.calorieData
            ];
        case 'REMOVE_CALORIE_ITEM':
            return state.filter(calorieItem => calorieItem.id !== action.id);
        case 'EDIT_CALORIE_ITEM':
            return state.map(calorie => {
                if (calorie.id === action.id) {
                    return {
                        ...calorie,
                        ...action.updates
                    }
                } else {
                    return calorie;
                }
            });
        case 'SET_CALORIE':
            return action.calorie
        case 'REMOVE_ALL_CALORIES':
            return calorieReducerDefaultState;
        case 'REMOVE_CALORIE':
            return calorieReducerDefaultState;
        default:
            return state;
    };
};

export default calorieItemReducer;