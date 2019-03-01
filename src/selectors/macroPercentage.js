import { selectProteinTotal } from "./totalCalories";

const macroPercentage = (calorieItem, query, goal) => {
    const macroTotal = selectProteinTotal(calorieItem, query);
    return (macroTotal / goal) * 100 < 100 ? (macroTotal / goal) * 100 : 100
}

export default macroPercentage;