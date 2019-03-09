import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRemoveCalorieItem, startRemoveAllCalories } from '../../actions/calorieItem';


class CalorieItemList extends React.Component {
    constructor(props){
        super(props);
    };
    textAbstract = (text) => {
        if (text) {
            if (text.length > 20) {
                return text.substring(0,20)+'...';
                } else {
                return text;
                }
        }
    }
    render() {
        return (
            <div className='calorie-list-wrapper'>
            {/* CHECKING IF THERE ARE CALORIES IF THERE IS CALORIES SHOW REMOVE BUTTON */}
            {this.props.calorieItem[0] && <button className='remove-all-calories-button' onClick={() => {
                this.props.startRemoveAllCalories(this.props.currentUser.id)
            }}>Remove All Calories</button> } 
            {/* RENDERING ALL CALORIES IN REDUX STATE */}
            {this.props.calorieItem.map(calorie => {
                const id = uuid();
                const proteinPercentage = ((calorie.protein * 4) / calorie.calories) * 100 < 100 ? ((calorie.protein * 4) / calorie.calories) * 100 : 100;
                const carbsPercentage = ((calorie.carbs * 4) / calorie.calories) * 100 < 100 ? ((calorie.carbs * 4) / calorie.calories) * 100 : 100;
                const fatsPercentage = ((calorie.fats * 9) / calorie.calories) * 100 < 100 ? ((calorie.fats * 9) / calorie.calories) * 100 : 100;
                return (
                    <div className='calorie-item-container calorie-item-container__hover' key={calorie.id}>
                        <div className='calorie-item-wrapper'>
                            <button hidden={true} id={id} onClick={() => {
                                this.props.startRemoveCalorieItem(this.props.currentUser.id, {id: calorie.id})
                            }}>Remove</button>
                            <div className='remove-calorie-item-wrapper'>
                                <label className='remove-calorie-item' style={{cursor: 'pointer'}} htmlFor={id}><img className='calorie-item-remove-image' src="https://img.icons8.com/material/24/000000/delete/303A52" /></label>
                            </div>
                            <Link style={{ textDecoration: 'none', color: '#333' }} to={`/calories/${calorie.id}`} >
                                <p className='calorie-item-description'>{this.textAbstract(calorie.description)}</p>
                                <p className='calorie-item-calories'>{calorie.calories} {calorie.calories > 1 ? 'calories' : 'calorie'}</p>
                                <div className='calorie-item-macros__flex'>
                                    <p>Protein: {calorie.protein}g</p>
                                    <p>Carbs: {calorie.carbs}g</p>
                                    <p>Fats: {calorie.fats}g</p>
                                </div>
                                <div className='calorie-item-bar-container'>
                                    <div className='calorie-item-progress-wrapper'>
                                        <div className='calories-from-protein-bar'>
                                            <div style={{height: `${proteinPercentage}%`, background: '#e74c3c'}} className='calories-progress'></div>
                                        </div>
                                        <div className='calories-from-carbs-bar'>
                                            <div style={{height: `${carbsPercentage}%`, background: '#3498db'}} className='calories-progress'></div>
                                        </div>
                                        <div className='calories-from-fats-bar'>
                                            <div style={{height: `${fatsPercentage}%`, background: '#f1c40f'}} className='calories-progress'></div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startRemoveCalorieItem: (ref, calorieItem) => dispatch(startRemoveCalorieItem(ref, calorieItem)) ,
        startRemoveAllCalories: (ref) => dispatch(startRemoveAllCalories(ref)) 
    };
};

const mapStateToProps = (state) => {
    return {
        calorieItem: state.calorieItem,
        currentUser: state.currentUser
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalorieItemList);