import database from '../firebase/firebase';


// NUTRITION GOAL ACTIONS
export const setGoal = (calorieGoal, proteinGoal, carbsGoal, fatsGoal) => ({
    type: 'SET_GOAL',
    calorieGoal,
    proteinGoal,
    carbsGoal,
    fatsGoal
});

export const startSetGoal = (calorieGoal, proteinGoal, carbsGoal, fatsGoal) => {
    return (dispatch) => {
        return database.ref('nutritionGoal').set({calorieGoal, proteinGoal, carbsGoal, fatsGoal}).then((ref) => {
            dispatch(setGoal(calorieGoal, proteinGoal, carbsGoal, fatsGoal))
        })
    }
}

export const renderGoal = (goal) => ({
    type: 'RENDER_GOAL',
    goal
});

export const startRenderGoal = () => {
    return (dispatch) => {
        return database.ref('nutritionGoal').once('value').then((snapshot) => {
            if(snapshot.val()) {
                dispatch(renderGoal(snapshot.val()))
            } else {
                dispatch(renderGoal({
                    calorieGoal: 0,
                    proteinGoal: 0,
                    carbsGoal: 0,
                    fatsGoal: 0
                }));
            };

        });
    };
};


export const editGoal = (edit) => ({
    type: 'EDIT_GOAL',
    edit
});

export const discardGoal = () => ({
    type: 'DISCARD_GOAL'
});

