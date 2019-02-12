import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { addCalorie } from '../../actions/calorieItem';


// INDIVIDUAL CALORIE ITEM
class AddCalorieItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            calories: 0,
            carbs: 0,
            fats: 0,
            protein: 0
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
        // DISPATCHES CURRENT STATE TO REDUX STATE
        e.preventDefault();
        console.log(this.props);
        if (true) {
            this.props.addCalorie({
                id: uuid(),
                calories: this.state.calories,
                carbs: this.state.carbs,
                fats: this.state.fats,
                protein: this.state.protein
            });
            const form = document.getElementById('calorieItemForm');
            form.reset();
        };
    };
    render() {
        return (
            <div>
                <h2>Log a calorie</h2>
                <form id='calorieItemForm'onSubmit={this.onSubmit}>
                    <input type='text-input' onChange={this.onCaloriesChange} type='text' placeholder='Calories'/>
                    <input type='text-input' onChange={this.onProteinChange} type='text' placeholder='Protein'/>
                    <input type='text-input' onChange={this.onCarbsChange} type='text' placeholder='Carbs'/>
                    <input type='text-input' onChange={this.onFatsChange} type='text' placeholder='Fats'/>
                    <button>Submit</button>
                </form>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCalorie: (calorieData) => dispatch(addCalorie(calorieData))
    };
};

export default connect(undefined, mapDispatchToProps)(AddCalorieItem);