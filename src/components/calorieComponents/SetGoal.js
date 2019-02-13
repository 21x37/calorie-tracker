import React from 'react';
import { startSetGoal } from '../../actions/nutritionGoals';
import { connect } from 'react-redux';

// SET NUTRITION GOAL

class SetGoal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0
        }
    };
    onCaloriesChange = (e) => {
        const calories = e.target.value;
        if (!calories || calories.match(/^[0-9]*$/)){
            this.setState(() => ({ calories }));
        }
    };
    onCarbsChange = (e) => {
        const carbs = e.target.value;
        this.setState({ carbs });
    };
    onFatsChange = (e) => {
        const fats = e.target.value;
        this.setState({ fats });
    };
    onProteinChange = (e) => {
        const protein = e.target.value;
        this.setState({ protein });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const calories = parseInt(this.state.calories);
        const protein = parseInt(this.state.protein);
        const carbs = parseInt(this.state.carbs);
        const fats = parseInt(this.state.fats);
        this.props.startSetGoal(calories, protein, carbs, fats);
        const form = document.getElementById('setGoalForm');
        form.reset();
    };
    render() {
        return (
            <div>
                <h2>Set Calorie Goal</h2>
                <form id='setGoalForm' onSubmit={this.onSubmit}>
                    <input type='text-input' onChange={this.onCaloriesChange} type='text' placeholder='Calories'/>
                    <input type='text-input' onChange={this.onProteinChange} type='text' placeholder='Protein'/>
                    <input type='text-input' onChange={this.onCarbsChange} type='text' placeholder='Carbs'/>
                    <input type='text-input' onChange={this.onFatsChange} type='text' placeholder='Fats'/>
                    <button>Set Goal!</button>
                </form>
            </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startSetGoal: (calories, protein, carbs, fats) => dispatch(startSetGoal(calories, protein, carbs, fats))
    }
}


export default connect(undefined, mapDispatchToProps)(SetGoal);