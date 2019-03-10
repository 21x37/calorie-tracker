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
            error: '',
            visible: true
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
        if (this.state.calories || this.state.carbs || this.state.fats || this.state.protein) {
            this.props.startAddCalorie(this.props.currentUser.id, {
                calories: this.state.calories ? this.state.calories : 0,
                carbs: this.state.carbs ? this.state.carbs : 0,
                description: this.state.description,
                fats: this.state.fats ? this.state.fats : 0,
                protein: this.state.protein ? this.state.protein : 0,
            }).then(() => {
                this.setState(() => {
                    return {
                        id: '',
                        calories: 0,
                        carbs: 0,
                        description: '',
                        fats: 0,
                        protein: 0,
                        error: ''
                    }
                })
            });
            const form = document.getElementById('calorieItemForm');
            form.reset();
            this.setState({error: ''});
        } else {
            this.setState({error: 'Enter Something to Log!'});
        }
    };
    onClick = () => {
        if (this.state.visible) {
            this.setState({ visible: false })
            this.props.sendBoolean(false, 'addCalorieNotVisible');
        }else {
            this.setState({ visible: true})
            this.props.sendBoolean(true, 'addCalorieNotVisible');
        }

    }
    render() {
        return (
            <div className='calorie-input-wrapper'>
                <div className='calorie-input-container'>
                    <button className='set-calorie-button add-calorie-button' onClick={this.onClick}>Log a Calorie</button>
                    <div className='log-calorie-wrapper'>
                        <div className='log-calorie-container' hidden={this.state.visible}>
                            {this.state.error && <p>{this.state.error}</p>}
                            <form id='calorieItemForm'onSubmit={this.onSubmit}>
                                <input className='add-calorie-input' onChange={this.onDescriptionChange} type='text' placeholder='Description'/>
                                <input className='add-calorie-input' onChange={this.onCaloriesChange} type='text' onKeyPress={this.allowNumbersOnly} placeholder='Calories'/>
                                <input className='add-calorie-input' onChange={this.onProteinChange} type='text' onKeyPress={this.allowNumbersOnly} placeholder='Protein'/>
                                <input className='add-calorie-input' onChange={this.onCarbsChange} type='text' onKeyPress={this.allowNumbersOnly} placeholder='Carbs'/>
                                <input className='add-calorie-input' onChange={this.onFatsChange} type='text' onKeyPress={this.allowNumbersOnly} placeholder='Fats'/>
                                <button className='submit-calorie-button'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
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