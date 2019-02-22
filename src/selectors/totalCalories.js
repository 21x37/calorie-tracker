
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
    console.log('calories', calories);
    console.log('goal', calorieGoal);
    const percentage = Math.floor((totalCalories / calorieGoal.calorieGoal) *100);
    console.log(totalCalories);
    console.log(percentage);
    return percentage;
};