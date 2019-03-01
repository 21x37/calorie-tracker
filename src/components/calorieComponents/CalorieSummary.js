import React from 'react';
import { connect } from 'react-redux';
import { selectCaloriesTotal, selectProteinTotal, selectCaloriePercentage } from '../../selectors/totalCalories';
import macroPercentage from '../../selectors/macroPercentage';



class CalorieSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            proteinPercentage: (this.props.proteinTotal / this.props.nutritionGoals.proteinGoal) *100 < 100 ? (this.props.proteinTotal / this.props.nutritionGoals.proteinGoal) : 100
        }
    }
    componentDidUpdate(newVal) {

    }
    render() {
        console.log(this.props.proteinPercentage);
        return  (

            <div className='calorie-summary-container'>
                <h1 className='calorie-summary-title'>Calorie Goal: {this.props.caloriesTotal} / {this.props.nutritionGoals.calorieGoal}</h1>
                {console.log(window.location.href.split('/')[3])}
                {window.location.href.split('/')[3] === 'calories' && 
                <div className='calorie-progress-bar'>
                    <div className='calorie-progress' style={{width: `${this.props.caloriesPercentage}%`}}><p style={{marginLeft: '10px'}}>{this.props.caloriesPercentage}%</p></div>
                </div> 
            }
            <div className='calorie-container'>
                <div className='calorie-macros-container'>
                <div className='protein-progress-bar'>
                    <div className='calorie-protein-total' style={{height: `${this.props.proteinPercentage}%`}}>
                        <p className='calorie-protein-text' style={{height: `${(this.props.proteinTotal / this.props.nutritionGoals.proteinGoal) *100}%`}}>{this.props.proteinTotal}g</p>
                    </div>
                </div>
                <div className='carbs-progress-bar'>
                    <div className='calorie-carbs-total' style={{height: `${this.props.carbsPercentage}%`}}>
                        <p className='calorie-carbs-text' style={{height: `${(this.props.carbsTotal / this.props.nutritionGoals.carbsGoal) *100}%`}}>{this.props.carbsTotal}g</p>
                    </div>
                </div>
                <div className='fats-progress-bar'>
                    <div className='calorie-fats-total' style={{height: `${this.props.fatsPercentage}%`}}>
                        <p className='calorie-fats-text'>{this.props.fatsTotal > 0 ? this.props.fatsTotal : 0}g</p>
                    </div>
                </div>
                </div>
                </div>
                <div className='under-calorie-total-bar'></div>
                <div className='calorie-names-container'>
                    <p>Protein</p>
                    <p>Carbs</p>
                    <p>Fats</p>
                </div>
                <div className='calorie-name-goals'>
                    <p className='calorie-goal-total-protein'>{this.props.nutritionGoals.proteinGoal}g</p>
                    <p className='calorie-goal-total-carbs'>{this.props.nutritionGoals.carbsGoal}g</p>
                    <p className='calorie-goal-total-fats'>{this.props.nutritionGoals.fatsGoal}g</p>
                </div>
            </div>
        )
    }
}


// export const CalorieSummary = (props) => {

//     let proteinPercentage;
    // if ((props.proteinTotal / props.nutritionGoals.proteinGoal) *100 < 100) {
    //     proteinPercentage = (props.proteinTotal / props.nutritionGoals.proteinGoal) *100;
    // } else if (((props.proteinTotal / props.nutritionGoals.proteinGoal) *100) >= 100 ) {
    //     proteinPercentage = 100;
    // }

//     console.log((props.proteinTotal / props.nutritionGoals.proteinGoal) *100)
//     console.log(Math.floor(props.nutritionGoals.proteinGoal/ props.proteinTotal))
//     return (

//         <div className='calorie-summary-container'>
//             <h1 className='calorie-summary-title'>Calorie Goal: {props.caloriesTotal} / {props.nutritionGoals.calorieGoal}</h1>
//             {console.log(window.location.href.split('/')[3])}
//             {window.location.href.split('/')[3] === 'calories' && 
//             <div className='calorie-progress-bar'>
//                 <div className='calorie-progress' style={{width: `${props.caloriesPercentage}%`}}><p style={{marginLeft: '10px'}}>{props.caloriesPercentage}%</p></div>
//             </div> 
//         }
//         <div className='calorie-container'>
//             <div className='calorie-macros-container'>
//             <div className='protein-progress-bar'>
//                 <div className='calorie-protein-total' style={{height: `${proteinPercentage}%`}}>
//                     <p className='calorie-protein-text' style={{height: `${(props.proteinTotal / props.nutritionGoals.proteinGoal) *100}%`}}>{props.proteinTotal}g</p>
//                 </div>
//             </div>
//             <div className='carbs-progress-bar'>
//                 <div className='calorie-carbs-total' style={{height: `${(props.carbsTotal / props.nutritionGoals.carbsGoal) *100}%`}}>
//                     <p className='calorie-carbs-text' style={{height: `${(props.carbsTotal / props.nutritionGoals.carbsGoal) *100}%`}}>{props.carbsTotal}g</p>
//                 </div>
//             </div>
//             <div className='fats-progress-bar'>
//                 <div className='calorie-fats-total' style={{height: `${(props.fatsTotal / props.nutritionGoals.fatsGoal) *100}%`}}>
//                     <p className='calorie-fats-text'>{props.fatsTotal > 0 ? props.fatsTotal : 0}g</p>
//                 </div>
//             </div>
//             </div>
//             </div>
//             <div className='under-calorie-total-bar'></div>
//             <div className='calorie-names-container'>
//                 <p>Protein</p>
//                 <p>Carbs</p>
//                 <p>Fats</p>
//             </div>
//             <div className='calorie-name-goals'>
//                 <p className='calorie-goal-total-protein'>{props.nutritionGoals.proteinGoal}g</p>
//                 <p className='calorie-goal-total-carbs'>{props.nutritionGoals.carbsGoal}g</p>
//                 <p className='calorie-goal-total-fats'>{props.nutritionGoals.fatsGoal}g</p>
//             </div>
//         </div>
//     )
// }


const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    console.log((ownProps / state.nutritionGoals.proteinGoal) * 100)
    return {
        calorieItem: state.calorieItem,
        nutritionGoals: state.nutritionGoals,
        caloriesTotal: selectCaloriesTotal(state.calorieItem),
        proteinTotal: selectProteinTotal(state.calorieItem, 'protein'),
        carbsTotal: selectProteinTotal(state.calorieItem, 'carbs'),
        fatsTotal: selectProteinTotal(state.calorieItem, 'fats'),
        caloriesPercentage: selectCaloriePercentage(state.calorieItem, state.nutritionGoals),

        proteinPercentage: macroPercentage(state.calorieItem, 'protein', state.nutritionGoals.proteinGoal),
        carbsPercentage: macroPercentage(state.calorieItem, 'carbs', state.nutritionGoals.carbsGoal),
        fatsPercentage: macroPercentage(state.calorieItem, 'fats', state.nutritionGoals.fatsGoal)
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