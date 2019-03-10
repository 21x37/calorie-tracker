import React from 'react';
import AddCalorieItem from './calorieComponents/AddCalorieItem';
import CalorieSummary from './calorieComponents/CalorieSummary';
import CalorieItemList from './calorieComponents/CalorieItemList';
import SetGoal from './calorieComponents/SetGoal';


class CaloriePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCalorieNotVisible: true,
            setGoalNotVisible: true
        }
        this.getBooleanFromForms = this.getBooleanFromForms.bind(this);
    };
    getBooleanFromForms(val, form) {
        this.setState({ [form]: val }, () => {
        })
    }
    render() {
        return (
            <div className='calorie-page-wrapper'>
            <div className='calorie-page-container'>
                <CalorieSummary />
                <div className='calorie-add-wrapper'>
                    <div className='calorie-add-container'>
                        <AddCalorieItem sendBoolean={this.getBooleanFromForms} />
                        <SetGoal sendBoolean={this.getBooleanFromForms} />
                    </div>
                </div>
                <div hidden={this.state.addCalorieNotVisible && this.state.setGoalNotVisible} className='calorie-forms-margin'></div>
                <div className='under-calorie-goal-bar'></div>
                <CalorieItemList />
            </div>
        </div>
        )
    }
}


export default CaloriePage;