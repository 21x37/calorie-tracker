export const selectCaloriesTotal = (caloriesItem) => {
    return caloriesItem
        .map(calorie => parseInt(calorie.calories))
        .reduce((sum, value) => sum + value, 0);
};

export const  selectProteinTotal = (caloriesItem, macro) => {
    return caloriesItem
        .map(calorie => parseInt(calorie[macro]))
        .reduce((sum, value) => sum + value, 0);
}