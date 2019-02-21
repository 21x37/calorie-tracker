import React from 'react';
import { connect } from 'react-redux';
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
    render() {
        return (
            <div key={this.props.calories + this.props.protein}>
                <h3>{this.state.calorieName}, {this.state.servingSize} {this.state.servingSizeUnit}</h3>
                <p>Serving: {this.state.serving}</p>
                <p>Calories: {this.state.calories}</p>
                <p>Protein: {this.state.protein}</p>
                <p>Carbs: {this.state.carbs}</p>
                <p>Fats: {this.state.fats}</p>
                <button onClick={() => {
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
                <button onClick={this.onIncrement}>+</button>
                <button onClick={this.onDecrement}>-</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddCalorie: (id, calorieObj) => dispatch(startAddCalorie(id, calorieObj)),
    clearCalorieLookUp: () => dispatch(clearCalorieLookUp())
})

export default connect(undefined, mapDispatchToProps)(IndividualCalorie);
