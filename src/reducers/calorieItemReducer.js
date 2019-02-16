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
        default:
            return state;
    };
};

export default calorieItemReducer;