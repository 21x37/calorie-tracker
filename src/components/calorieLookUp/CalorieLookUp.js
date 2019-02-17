import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import CalorieLookUpList from './CalorieLookUpList';
import { calorieLookUp } from '../../actions/calorieLookUp';
import Header from '../Header';
import CalorieSummary from '../calorieComponents/CalorieSummary';
// https://trackapi.nutritionix.com/v2/natural/nutrients

const appId = process.env.NUTRITIONIX_APP_ID;
const appKey = process.env.NUTRITIONIX_APP_KEY;

console.log(appId, appKey);

class CalorieLookUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appId,
            appKey,
            fields: ["item_name", "nf_calories", "nf_protein", "nf_total_carbohydrate", "nf_total_fat", "nf_serving_size_qty", "nf_serving_size_unit"],
            lookup: ''
        }
        this.results = [];
    };
    onChange = (e) => {
        const query = e.target.value;
        this.setState({query})
        //console.log(this.state.query);
    };
    onSubmit = (e) => {
        e.preventDefault();
        const jsonString = JSON.stringify(this.state);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', "https://api.nutritionix.com/v1_1/search");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(jsonString);

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if(xhr.status == 200) {
                    const res = JSON.parse(xhr.responseText);
                    console.log(res.hits);
                    this.props.calorieLookUp(res.hits);
                    this.setState({lookup: this.state.query})
                    const form = document.getElementById('calorieSearchForm');
                    form.reset();
                };
            };
        };

    };
    render() {
        return (
            <div>
                <Header />
                <CalorieSummary query={this.query}/>
                <h1>Search For a Food!</h1>
                <form onSubmit={this.onSubmit} id='calorieSearchForm'>
                    <input type='text' onChange={this.onChange}/>
                    <button>Search</button>
                </form>
                {this.state.lookup && <h1>Searching for {this.state.lookup}</h1>}
                <CalorieLookUpList />
            </div>
        )
    }
};
// ReactDOM.render(<CalorieLookUp />, document.getElementById('app'));

const mapDispatchToProps = (dispatch) => ({
    calorieLookUp: res => dispatch(calorieLookUp(res))
});

export default connect(undefined, mapDispatchToProps)(CalorieLookUp);

// const required = {
//     appId,
//     appKey,
//     fields: ["item_name","brand_name","nf_calories"],
//     query: 'Ice Cream'
// }

// const jsonString = JSON.stringify(required);

// const xhr = new XMLHttpRequest();


// xhr.open('POST', "https://api.nutritionix.com/v1_1/search");
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.send(jsonString);
// const url = xhr.responseURL;
// console.log(url);

// xhr.onreadystatechange = () => {
//     if (xhr.readyState == 4) {
//         if (xhr.status == 200) {
//             const res = JSON.parse(xhr.responseText);
//             console.log(res);
//         }

//         if (xhr.status == 404) {
//             console.log('File or resource not found');
//         }
//     }
// };