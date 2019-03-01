
export const selectCaloriesTotal = (caloriesItem) => {
    return caloriesItem
        .map(calorie => parseInt(calorie.calories))
        .reduce((sum, value) => sum + value, 0);
};

export const  selectProteinTotal = (caloriesItem, macro) => {
    return caloriesItem
        .map(calorie => parseInt(calorie[macro]))
        .reduce((sum, value) => sum + value, 0);
};

export const selectCaloriePercentage = (calories, calorieGoal) => {
    const totalCalories = selectCaloriesTotal(calories);
    if (calorieGoal.calorieGoal > 0) {
        const percentage = Math.floor((totalCalories / calorieGoal.calorieGoal) * 100);
        return percentage < 100 ? percentage : 100;
    } else {
        return 0
    }

};