import { selectProteinTotal } from "./totalCalories";

const macroPercentage = (calorieItem, query, goal) => {
    const macroTotal = selectProteinTotal(calorieItem, query);
    if (goal !== 0 ) {
        return (macroTotal / goal) * 100 < 100 ? (macroTotal / goal) * 100 : 100
    } else {
        return 0
    }
    
}

export default macroPercentage;