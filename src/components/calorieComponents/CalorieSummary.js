import React from 'react';
import { connect } from 'react-redux';
import { selectCaloriesTotal, selectProteinTotal, selectCaloriePercentage } from '../../selectors/totalCalories';

export const CalorieSummary = (props) => {

    return (
        <div className='calorie-summary-container'>
            <h1 className='calorie-summary-title'>Calorie Goal: {props.caloriesTotal} / {props.nutritionGoals.calorieGoal}</h1>
            {console.log(window.location.href.split('/')[3])}
            {window.location.href.split('/')[3] === 'calories' && 
            <div className='calorie-progress-bar'>
                <div className='calorie-progress' style={{width: `${props.caloriesPercentage}%`}}><p style={{marginLeft: '10px'}}>{props.caloriesPercentage}%</p></div>
            </div> 
        }
            <div className='calorie-macros-names-container'>
                <p className='calorie-macro-protein'>Protein</p>
                <p className='calorie-macro-carbs'>Carbs</p>
                <p className='calorie-macro-fats'>Fats</p>
            </div>
            <div className='calorie-macros-container'>
                <p>{props.proteinTotal} / {props.nutritionGoals.proteinGoal}</p>
                <p>{props.carbsTotal} / {props.nutritionGoals.carbsGoal}</p>
                <p>{props.fatsTotal} / {props.nutritionGoals.fatsGoal}</p>
            </div>
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