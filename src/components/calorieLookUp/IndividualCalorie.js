import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { history } from '../../routers/AppRouter';
import { startAddCalorie } from '../../actions/calorieItem';
import { clearCalorieLookUp } from '../../actions/calorieLookUp';

class IndividualCalorie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            calorieName: this.props.calorieName,
            servingSize: this.props.servingSize,
            servingSizeUnit: this.props.servingSizeUnit,
            serving: this.props.serving,
            calories: this.props.calories,
            protein: this.props.protein,
            carbs: this.props.carbs,
            fats: this.props.fats

        }
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
    }
    onIncrement(e) {
        e.preventDefault();
        this.setState((prevState) => {
            return {
                servingSize: prevState.servingSize + this.props.servingSize,
                serving: prevState.serving + this.props.serving,
                calories: prevState.calories + this.props.calories,
                protein: prevState.protein + this.props.protein,
                carbs: prevState.carbs + this.props.carbs,
                fats: prevState.fats + this.props.fats
            }
        })
    }
    onDecrement(e) {
        e.preventDefault();
        if ( this.state.serving > 1 ) {
            this.setState((prevState) => {
                return {
                    servingSize: prevState.servingSize - this.props.servingSize,
                    serving: prevState.serving - this.props.serving,
                    calories: prevState.calories - this.props.calories,
                    protein: prevState.protein - this.props.protein,
                    carbs: prevState.carbs - this.props.carbs,
                    fats: prevState.fats - this.props.fats
                }
            })
        }
    }
    textAbstract = (text) => {
        if (text) {
            if (text.length > 13) {
                return text.substring(0,13)+'...';
                } else {
                return text;
                }
        }
    }
    servingAbstract = (text) => {
        if (text) {
            if (text.length > 8) {
                return text.substring(0,8)+'...';
                } else {
                return text;
                }
        }

    }
    render() {
        const proteinPercentage = ((this.state.protein * 4) / this.state.calories) * 100 < 100 ? ((this.state.protein * 4) / this.state.calories) * 100 : 100;
        const carbsPercentage = ((this.state.carbs * 4) / this.state.calories) * 100 < 100 ? ((this.state.carbs * 4) / this.state.calories) * 100 : 100;
        const fatsPercentage = ((this.state.fats * 9) / this.state.calories) * 100 < 100 ? ((this.state.fats * 9) / this.state.calories) * 100 : 100;

        const incrementId = uuid();
        const decrementId = uuid();
        const addItemId = uuid();
        return (
            <div className='calorie-item-container' key={this.props.calories + this.props.protein}>
                <div className='calorie-item-wrapper'>
                <button hidden={true} id={incrementId} onClick={this.onIncrement}>+</button>
                <div className='calorie-increment-decrement-wrapper'>
                    <label className='calorie-increment-serving' htmlFor={incrementId}><ion-icon style={{cursor: 'pointer'}} name="add-circle-outline"></ion-icon></label>
                </div>

                <button id={decrementId} hidden={true} onClick={this.onDecrement}>-</button>
                <div className='calorie-increment-decrement-wrapper'>
                    <label className='calorie-decrement-serving' htmlFor={decrementId}><ion-icon style={{cursor: 'pointer'}} name="remove-circle-outline"></ion-icon></label>
                </div>

                    <h3 className='calorie-item-description'>{this.textAbstract(this.state.calorieName)} {this.servingAbstract(this.state.servingSize)} {this.servingAbstract(this.state.servingSizeUnit)}</h3>
                    <p>Calories: {this.state.calories}</p>
                    <p>Protein: {this.state.protein}g</p>
                    <p>Carbs: {this.state.carbs}g</p>
                    <p>Fats: {this.state.fats}g</p>
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
                    <button hidden={true} id={addItemId} onClick={() => {
                        this.props.startAddCalorie(this.state.currentUser, {
                            calories: this.state.calories,
                            carbs : this.state.carbs,
                            description: this.state.calorieName,
                            fats: this.state.fats,
                            protein: this.state.protein
                        });
                        history.push('/calories');
                        this.props.clearCalorieLookUp();
                    }} >Add Calorie!</button>
                    <label className='add-searched-calorie' htmlFor={addItemId}><ion-icon style={{cursor: 'pointer'}} name="checkmark-circle-outline"></ion-icon></label>
                </div>
            </div>
        )
    }
}



// <div className='calorie-item-container' key={calorie.id}>
// <div className='calorie-item-wrapper'>
//     <button hidden={true} id={id} onClick={() => {
//         this.props.startRemoveCalorieItem(this.props.currentUser.id, {id: calorie.id})
//     }}>Remove</button>
//     <div className='remove-calorie-item-wrapper'>
//         <label className='remove-calorie-item' style={{cursor: 'pointer'}} htmlFor={id}><ion-icon name="trash"></ion-icon></label>
//     </div>
//     <Link style={{ textDecoration: 'none', color: '#333' }} to={`/calories/${calorie.id}`} >
//         <p className='calorie-item-description'>{calorie.description}</p>
//         <p className='calorie-item-calories'>{calorie.calories} {calorie.calories > 1 ? 'calories' : 'calorie'}</p>
//         <div className='calorie-item-macros__flex'>
//             <p>Protein {calorie.protein}</p>
//             <p>Carbs {calorie.carbs}</p>
//             <p>Fats {calorie.fats}</p>
//         </div>
        // <div className='calorie-item-bar-container'>
        //     <div className='calorie-item-progress-wrapper'>
        //         <div className='calories-from-protein-bar'>
        //             <div style={{height: `${proteinPercentage}%`, background: '#e74c3c'}} className='calories-progress'></div>
        //         </div>
        //         <div className='calories-from-carbs-bar'>
        //             <div style={{height: `${carbsPercentage}%`, background: '#3498db'}} className='calories-progress'></div>
        //         </div>
        //         <div className='calories-from-fats-bar'>
        //             <div style={{height: `${fatsPercentage}%`, background: '#f1c40f'}} className='calories-progress'></div>
        //         </div>
        //     </div>
        // </div>
//     </Link>
// </div>
// </div>

const mapDispatchToProps = (dispatch) => ({
    startAddCalorie: (id, calorieObj) => dispatch(startAddCalorie(id, calorieObj)),
    clearCalorieLookUp: () => dispatch(clearCalorieLookUp())
})

export default connect(undefined, mapDispatchToProps)(IndividualCalorie);
