import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage';
import Header from '../components/Header';
import CalorieList from '../components/CalorieList';
import EditCalories from '../components/EditCalories';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path='/' component={HomePage} exact={true}/>
                <Route path='/calories' component={CalorieList}/>
                <Route path='/edit/:id' component={EditCalories}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter; 