import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRemoveCalorieItem, startRemoveAllCalories } from '../../actions/calorieItem';


class CalorieItemList extends React.Component {
    constructor(props){
        super(props);
    };
    render() {
        const id = uuid();
        return (
            <div>
            {/* CHECKING IF THERE ARE CALORIES IF THERE IS CALORIES SHOW REMOVE BUTTON */}
            {this.props.calorieItem[0] && <button className='remove-all-calories-button' onClick={() => {
                this.props.startRemoveAllCalories(this.props.currentUser.id)
            }}>Remove All Calories</button> } 
            {/* RENDERING ALL CALORIES IN REDUX STATE */}
            {this.props.calorieItem.map(calorie => {
                return (
                    <div className='calorie-item-container' key={calorie.id}>
                        <div className='calorie-item-wrapper'>
                            <button hidden={true} id={id} onClick={() => {
                                this.props.startRemoveCalorieItem(this.props.currentUser.id, {id: calorie.id})
                            }}>Remove</button>
                            <div className='remove-calorie-item-wrapper'>
                                <label className='remove-calorie-item' style={{cursor: 'pointer'}} htmlFor={id}><ion-icon name="trash"></ion-icon></label>
                            </div>
                            <Link style={{ textDecoration: 'none', color: '#333' }} to={`/calories/${calorie.id}`} >
                                <p className='calorie-item-description'>{calorie.description}</p>
                                <p className='calorie-item-calories'>{calorie.calories} {calorie.calories > 1 ? 'calories' : 'calorie'}</p>
                                <div className='calorie-item-macros__flex'>
                                    <p>Protein {calorie.protein}</p>
                                    <p>Carbs {calorie.carbs}</p>
                                    <p>Fats {calorie.fats}</p>
                                </div>
                                <div className='calorie-item-bar-container'>
                                    <div className='calorie-item-progress-wrapper'>
                                        <div className='calories-from-protein-bar'>
                                            <div style={{height: `${((calorie.protein * 4) / calorie.calories) * 100}%`, background: '#e74c3c'}} className='calories-progress'></div>
                                        </div>
                                        <div className='calories-from-carbs-bar'>
                                            <div style={{height: `${((calorie.carbs * 4) / calorie.calories) * 100}%`, background: '#3498db'}} className='calories-progress'></div>
                                        </div>
                                        <div className='calories-from-fats-bar'>
                                            <div style={{height: `${((calorie.fats * 9) / calorie.calories) * 100}%`, background: '#f1c40f'}} className='calories-progress'></div>
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