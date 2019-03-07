import React from 'react';
import { connect } from 'react-redux';
import { startEditCalorieItem } from '../../actions/calorieItem';
import Header from '../Header';
import { history } from '../../routers/AppRouter';


// INDIVIDUAL CALORIE ITEM
class EditCalorie extends React.Component {
    constructor(props) {
        super(props)
        this.rendered = false;
        this.state = {
            id: '',
            calories: 0,
            carbs: 0,
            description: '',
            fats: 0,
            protein: 0
        };
    };
    componentWillMount() {
        const urlId = window.location.href.split('/')[4];
        
        if (!this.rendered) {
            this.props.calorieItem.forEach(calorie => {
                if (calorie.id === urlId) {
                    this.setState(() => {
                        return {
                            id: calorie.id,
                            calories: calorie.calories,
                            carbs: calorie.carbs,
                            description: calorie.description,
                            fats: calorie.fats,
                            protein: calorie.protein
                        };
                    })
                };
            });
            this.rendered = true;
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
        // DISPATCHES CURRENT STATE TO REDUX STATE
        e.preventDefault();
        console.log(this.props);
        if (true) {
            this.props.startEditCalorieItem(this.props.currentUser.id, this.state.id, {
                calories: this.state.calories,
                carbs: this.state.carbs,
                description: this.state.description,
                fats: this.state.fats,
                protein: this.state.protein
            });
            history.push('/calories');
        };
        this.rendered = false;
    };
    onRefresh() {


    }
    render() {

        return (
            <div className='edit-calorie-wrapper'>
                <div className='edit-calorie-container'>
                    <h1 className='edit-calorie-description'>Editing {this.state.description?  `${this.state.description}!` : 'a calorie log!' }</h1>
                    <div className='edit-calorie-input-container'>
                        <form id='calorieItemForm'onSubmit={this.onSubmit}>
                            <input className='edit-calorie-input-field' value={this.state.description} onChange={this.onDescriptionChange} type='text' placeholder='Description'/>
                            <input className='edit-calorie-input-field' value={this.state.calories} onChange={this.onCaloriesChange} type='text' placeholder='Calories'/>
                            <input className='edit-calorie-input-field' value={this.state.protein} onChange={this.onProteinChange} type='text' placeholder='Protein'/>
                            <input className='edit-calorie-input-field' value={this.state.carbs} onChange={this.onCarbsChange} type='text' placeholder='Carbs'/>
                            <input className='edit-calorie-input-field' value={this.state.fats} onChange={this.onFatsChange} type='text' placeholder='Fats'/>
                            <button className='edit-calorie-button'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startEditCalorieItem: (ref, id, calorieData) => dispatch(startEditCalorieItem(ref, id, calorieData))
    };
};

const mapStateToProps = (state) => {
    return {
        calorieItem: state.calorieItem,
        currentUser: state.currentUser
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditCalorie);