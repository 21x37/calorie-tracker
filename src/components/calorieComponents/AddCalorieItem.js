import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { startAddCalorie } from '../../actions/calorieItem';


// INDIVIDUAL CALORIE ITEM
class AddCalorieItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            calories: 0,
            carbs: 0,
            description: '',
            fats: 0,
            protein: 0,
            error: ''
        }
    };
    allowNumbersOnly = (e) => {
        var code = (e.which) ? e.which : e.keyCode;
        if (code > 31 && (code < 48 || code > 57)) {
            e.preventDefault();
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
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState({ description })
    }
    onSubmit = (e) => {
        // DISPATCHES CURRENT STATE TO REDUX STATE AND DATABASE
        e.preventDefault();
        console.log(this.props);
        if (this.state.calories || this.state.carbs || this.state.fats || this.state.protein) {
            this.props.startAddCalorie(this.props.currentUser.id, {
                calories: this.state.calories ? this.state.calories : 0,
                carbs: this.state.carbs ? this.state.carbs : 0,
                description: this.state.description,
                fats: this.state.fats ? this.state.fats : 0,
                protein: this.state.protein ? this.state.protein : 0,
            });
            const form = document.getElementById('calorieItemForm');
            form.reset();
            this.setState({error: ''});
        } else {
            this.setState({error: 'Enter something to log!'});
        }
    };
    render() {
        return (
            <div>
                <h2>Log a Calorie</h2>
                {this.state.error && <p>{this.state.error}</p>}
                <form id='calorieItemForm'onSubmit={this.onSubmit}>
                    <input onChange={this.onDescriptionChange} type='text' placeholder='Description'/>
                    <input onChange={this.onCaloriesChange} type='text' onKeyPress={this.allowNumbersOnly} placeholder='Calories'/>
                    <input onChange={this.onProteinChange} type='text' onKeyPress={this.allowNumbersOnly} placeholder='Protein'/>
                    <input onChange={this.onCarbsChange} type='text' onKeyPress={this.allowNumbersOnly} placeholder='Carbs'/>
                    <input onChange={this.onFatsChange} type='text' onKeyPress={this.allowNumbersOnly} placeholder='Fats'/>
                    <button>Submit</button>
                </form>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddCalorie: (id, calorieData) => dispatch(startAddCalorie(id, calorieData))
    };
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCalorieItem);