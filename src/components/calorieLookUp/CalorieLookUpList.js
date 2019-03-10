import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { startAddCalorie } from '../../actions/calorieItem';
import { history } from '../../routers/AppRouter';
import IndividualCalorie from './IndividualCalorie';

const CalorieLookUpList = (props) => {
    return (
        <div>
            {props.calorieLookUp.map(calorieRes => {
                const calorie = calorieRes.fields;
                let serving = 1;
                let calorieName = calorie.item_name.split('-')[0].replace(/,/g, '');
                let calories = Math.ceil(calorie.nf_calories);
                let protein = Math.ceil(calorie.nf_protein);
                let carbs = Math.ceil(calorie.nf_total_carbohydrate);
                let fats = Math.ceil(calorie.nf_total_fat);
                return (
                    <IndividualCalorie calorieName={calorieName} servingSize={calorie.nf_serving_size_qty} servingSizeUnit={calorie.nf_serving_size_unit} serving={serving} calories={calories} protein={protein} carbs={carbs} fats={fats} currentUser={props.currentUser.id} key={uuid()}/>
                )
            })}
            {!props.calorieLookUp[0] && props.searched && <p className='calorie-lookup-no-results'>No Results</p>}
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    startAddCalorie: (id, calorieObj) => dispatch(startAddCalorie(id, calorieObj))
})

const mapStateToProps = (state) => ({
    calorieLookUp: state.calorieLookUp,
    currentUser: state.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(CalorieLookUpList);