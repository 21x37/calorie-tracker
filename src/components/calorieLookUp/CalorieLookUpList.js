import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { startAddCalorie } from '../../actions/calorieItem';
import { history } from '../../routers/AppRouter';

const CalorieLookUpList = (props) => {
    return (
        <div>
            {props.calorieLookUp.map(calorieRes => {
                const calorie = calorieRes.fields;
                const calorieName = calorie.item_name.split('-')[0].replace(/,/g, '');
                const calories = Math.ceil(calorie.nf_calories);
                const protein = Math.ceil(calorie.nf_protein);
                const carbs = Math.ceil(calorie.nf_total_carbohydrate);
                const fats = Math.ceil(calorie.nf_total_fat);
                return (
                    <div key={uuid()}>
                        <h3>{calorieName}, {calorie.nf_serving_size_qty} {calorie.nf_serving_size_unit}</h3>
                        <p>Calories: {calories}</p>
                        <p>Protein: {protein}</p>
                        <p>Carbs: {carbs}</p>
                        <p>Fats: {fats}</p>
                        <button onClick={() => {
                            props.startAddCalorie({
                                calories,
                                carbs,
                                description: calorieName,
                                fats,
                                protein
                            })
                            history.push('/calories')
                        }}>Add Calorie!</button>
                    </div>
                )
            })}
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    startAddCalorie: calorieObj => dispatch(startAddCalorie(calorieObj))
})

const mapStateToProps = (state) => ({
    calorieLookUp: state.calorieLookUp
})

export default connect(mapStateToProps, mapDispatchToProps)(CalorieLookUpList);

// this.props.startAddCalorie({
//     calories: this.state.calories ? this.state.calories : 0,
//     carbs: this.state.carbs ? this.state.carbs : 0,
//     description: this.state.description,
//     fats: this.state.fats ? this.state.fats : 0,
//     protein: this.state.protein ? this.state.protein : 0,
// });