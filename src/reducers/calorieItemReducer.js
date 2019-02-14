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
            return state.map(calorieItem => {
                if (calorieItem.id === action.id) {
                    return {
                        ...calorieItem,
                        ...action.edit
                    };
                };
            });
        case 'SET_CALORIE':
            return action.calorie
        default:
            return state;
    };
};

export default calorieItemReducer;