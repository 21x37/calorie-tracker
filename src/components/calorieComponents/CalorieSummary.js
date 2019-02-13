import React from 'react';
import { connect } from 'react-redux';
import { selectCaloriesTotal, selectProteinTotal } from '../../selectors/totalCalories';

export const CalorieSummary = (props) => {
    console.log(props.nutritionGoals);
    return (
        <div>
            <h1>Calorie Goal: {props.caloriesTotal} / {props.nutritionGoals.calorieGoal}</h1>
            
            <p>Protein: {props.proteinTotal} / {props.nutritionGoals.proteinGoal}</p>
            <p>Carbs: {props.carbsTotal} / {props.nutritionGoals.carbsGoal}</p>
            <p>Fats: {props.fatsTotal} / {props.nutritionGoals.fatsGoal}</p>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        calorieItem: state.calorieItem,
        nutritionGoals: state.nutritionGoals,
        caloriesTotal: selectCaloriesTotal(state.calorieItem),
        proteinTotal: selectProteinTotal(state.calorieItem, 'protein'),
        carbsTotal: selectProteinTotal(state.calorieItem, 'carbs'),
        fatsTotal: selectProteinTotal(state.calorieItem, 'fats')
    }
}

export default connect(mapStateToProps)(CalorieSummary);