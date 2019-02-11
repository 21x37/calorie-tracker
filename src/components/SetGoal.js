import React from 'react';
import { setGoal } from '../playground/react-redux-store';
import { connect } from 'react-redux';

class SetGoal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0
        }
    }
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
        this.props.setGoal(calories, protein, carbs, fats);

    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type='text-input' onChange={this.onCaloriesChange} type='text' placeholder='Calories'/>
                    <input type='text-input' onChange={this.onProteinChange} type='text' placeholder='Protein'/>
                    <input type='text-input' onChange={this.onCarbsChange} type='text' placeholder='Carbs'/>
                    <input type='text-input' onChange={this.onFatsChange} type='text' placeholder='Fats'/>
                    <button>Set Goal!</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGoal: (calories, protein, carbs, fats) => dispatch(setGoal(calories, protein, carbs, fats))
    }
}


export default connect(undefined, mapDispatchToProps)(SetGoal);