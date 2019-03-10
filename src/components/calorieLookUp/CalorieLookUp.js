import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import CalorieLookUpList from './CalorieLookUpList';
import { calorieLookUp } from '../../actions/calorieLookUp';
import Header from '../Header';
import CalorieSummary from '../calorieComponents/CalorieSummary';

const appId = process.env.NUTRITIONIX_APP_ID;
const appKey = process.env.NUTRITIONIX_APP_KEY;


class CalorieLookUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appId,
            appKey,
            fields: ["item_name", "nf_calories", "nf_protein", "nf_total_carbohydrate", "nf_total_fat", "nf_serving_size_qty", "nf_serving_size_unit"],
            lookup: '',
            error: '',
            searched: false
        }
        this.results = [];
    };
    onChange = (e) => {
        const query = e.target.value;
        this.setState({query})
    };
    onSubmit = (e) => {
        if (this.state.query) {
            e.preventDefault();
            const jsonString = JSON.stringify(this.state);
            this.setState({ error: ''})
            const xhr = new XMLHttpRequest();
    
            xhr.open('POST', "https://api.nutritionix.com/v1_1/search");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(jsonString);
    
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        const res = JSON.parse(xhr.responseText);
                        this.props.calorieLookUp(res.hits);
                        this.setState({lookup: this.state.query});
                        this.setState({searched: true})
                        const form = document.getElementById('calorieSearchForm');
                        form.reset();
                    };
                };
            };
        } else {
            e.preventDefault();
            this.setState({ error: 'Enter a Food to Find!'})
        }


    };
    render() {
        return (
            <div className='calorie-lookup-container'>
                <div className='calorie-lookup-wrapper'>
                    <h1 className='calorie-lookup-title'>Search For a Food!</h1>
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={this.onSubmit} id='calorieSearchForm'>
                        <input className='calorie-lookup-text-input' type='text' onChange={this.onChange}/>
                        <button className='calorie-lookup-button'>Search</button>
                    </form>
                    {this.state.lookup && <h1 className='calorie-lookup-search'>Searching for {this.state.lookup}</h1>}
                    <CalorieLookUpList searched={this.state.searched} />
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    calorieLookUp: res => dispatch(calorieLookUp(res))
});

export default connect(undefined, mapDispatchToProps)(CalorieLookUp);
