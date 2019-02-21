
const calorieLookUpReducerDefaultState = [];

const calorieLookUpReducer = (state = calorieLookUpReducerDefaultState, action) => {
    switch (action.type) {
        case 'CALORIE_LOOKUP':
            return action.res
        case 'CLEAR_CALORIE_LOOKUP':
            return calorieLookUpReducerDefaultState;
        default:
            return state
    };
};

export default calorieLookUpReducer;