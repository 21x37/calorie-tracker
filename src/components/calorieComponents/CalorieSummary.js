import React from 'react';
import { connect } from 'react-redux';
import { selectCaloriesTotal, selectProteinTotal, selectCaloriePercentage } from '../../selectors/totalCalories';

export const CalorieSummary = (props) => {

    return (
        <div>
            <h1>Calorie Goal: {props.caloriesTotal} / {props.nutritionGoals.calorieGoal}</h1>
            <p>Percentage: {props.caloriesPercentage}%</p>
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
        fatsTotal: selectProteinTotal(state.calorieItem, 'fats'),
        caloriesPercentage: selectCaloriePercentage(state.calorieItem, state.nutritionGoals)
    }
}

export default connect(mapStateToProps)(CalorieSummary);

// return (
//     <div>
//         <div className='content-container'>
//             <h1 >{props.caloriesTotal} out of {props.nutritionGoals.calorieGoal} calories.</h1>
//             <div>
//                 <div >48%</div>
//             </div>
//             <div>
//                 <ul>
//                     <li>Protein</li>
//                     <li>{props.proteinTotal} / {props.nutritionGoals.proteinGoal}</li>
//                 </ul>
//                 <ul>
//                     <li>Carbs</li>
//                     <li>{props.carbsTotal} / {props.nutritionGoals.carbsGoal}</li>
//                 </ul>
//                 <ul>
//                     <li>Fats</li>
//                     <li>{props.fatsTotal} / {props.nutritionGoals.fatsGoal}</li>
//                 </ul>
//             </div>
//         </div>
//     </div>
// )