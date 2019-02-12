import React from 'react';
import { connect } from 'react-redux';

const CalorieItemList = (props) => (
    <div>
        {props.calorieItem.map(calorie => {
            return (
                <div key={calorie.id}>
                    <p>Calorie:{calorie.calories} Protein: {calorie.protein} Carbs: {calorie.carbs} Fats: {calorie.fats}</p>
                </div>
            )
        })}
    </div>
);


const mapStateToProps = (state) => {
    return {
        calorieItem: state.calorieItem
    }
}

export default connect(mapStateToProps)(CalorieItemList);