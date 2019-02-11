import React from 'react';
import { connect } from 'react-redux';

export const CalorieSummary = (props) => {
    return (
        <div>
            <h1>Calorie Goal: {props.nutritionGoals.calorieGoal}</h1>
            <p>Protein: {props.nutritionGoals.proteinGoal} Carbs: {props.nutritionGoals.carbsGoal} Fats: {props.nutritionGoals.fatsGoal}</p>
        </div>
    )
}


const mapStateToProps = (state) => ({
    calorieItem: state.calorieItem,
    nutritionGoals: state.nutritionGoals
})

export default connect(mapStateToProps)(CalorieSummary);