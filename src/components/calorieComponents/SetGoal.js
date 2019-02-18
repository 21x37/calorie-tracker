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
            fats: 0,
            error: ''
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
        if (this.state.calories && this.state.protein && this.state.carbs && this.state.fats) {
            const calories = parseInt(this.state.calories);
            const protein = parseInt(this.state.protein);
            const carbs = parseInt(this.state.carbs);
            const fats = parseInt(this.state.fats);
            this.props.startSetGoal(this.props.currentUser.id, calories, protein, carbs, fats);
            const form = document.getElementById('setGoalForm');
            form.reset();
        } else {
            this.setState({error: 'Please fill out all of the goals!'})
        }

    };
    render() {
        return (
            <div>
                <h2>Set Calorie Goal</h2>
                {this.state.error && <p>{this.state.error}</p>}
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
        startSetGoal: (ref, calories, protein, carbs, fats) => dispatch(startSetGoal(ref, calories, protein, carbs, fats))
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SetGoal);