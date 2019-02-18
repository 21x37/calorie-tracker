import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
                        <Link to={`/calories/${calorie.id}`} >
                            <p>Description:{calorie.description} Calorie:{calorie.calories} Protein: {calorie.protein} Carbs: {calorie.carbs} Fats: {calorie.fats}</p>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => {
                            this.props.startRemoveCalorieItem(this.props.currentUser.id, {id: calorie.id})
                        }}>Remove</button>
                    </div>
                );
            })};
        </div>
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startRemoveCalorieItem: (ref, calorieItem) => dispatch(startRemoveCalorieItem(ref, calorieItem)) 
    };
};

const mapStateToProps = (state) => {
    return {
        calorieItem: state.calorieItem,
        currentUser: state.currentUser
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalorieItemList);