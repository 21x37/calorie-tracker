import React from 'react';
import { connect } from 'react-redux';
import { startRemoveCalorieItem } from '../../actions/calorieItem';


class CalorieItemList extends React.Component {
    constructor(props){
        super(props);
    };
    render() {
        return (
            <div>
            {this.props.calorieItem.map(calorie => {
                console.log(calorie.id);
                return (
                    <div key={calorie.id}>
                        <p>Description:{calorie.description} Calorie:{calorie.calories} Protein: {calorie.protein} Carbs: {calorie.carbs} Fats: {calorie.fats}</p>
                        <button onClick={() => {
                            this.props.startRemoveCalorieItem({id: calorie.id})
                        }}>Remove</button>
                    </div>

    
                )
            })}
        </div>
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startRemoveCalorieItem: calorieItem => dispatch(startRemoveCalorieItem(calorieItem)) 
    };
};

const mapStateToProps = (state) => {
    return {
        calorieItem: state.calorieItem
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalorieItemList);