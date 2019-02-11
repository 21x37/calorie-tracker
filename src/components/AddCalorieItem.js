import React from 'react';
import uuid from 'uuid';

class AddCalorieItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: uuid(),
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
    render() {
        return (
            <div>
                <form>
                    <input type='text-input' onChange={this.onCaloriesChange} type='text' placeholder='Calories'/>
                    <input type='text-input' onChange={this.onProteinChange} type='text' placeholder='Protein'/>
                    <input type='text-input' onChange={this.onCarbsChange} type='text' placeholder='Carbs'/>
                    <input type='text-input' onChange={this.onFatsChange} type='text' placeholder='Fats'/>
                    <button>Submit</button>
                </form>
            </div>
        )
    };
};

export default AddCalorieItem;