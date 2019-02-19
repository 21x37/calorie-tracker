import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from'./firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { addStatus } from './actions/postStatus';
import { addCalorie, removeCalorieItem } from './actions/calorieItem';
import { setGoal } from './actions/nutritionGoals';
import { startRenderGoal } from './actions/nutritionGoals';
import { startSetCalorie } from './actions/calorieItem';
import { startSetStatus } from './actions/postStatus';
import { startSetComment } from './actions/comment';
import { startSetHashtags } from './actions/statusFeatures';
import { startSetImages } from './actions/postStatus';
import { startSetCurrentUser, startRemoveCurrentUser } from './actions/currentUser';

const store = configureStore();



//-----------------------------------
// CALORIE TESTS

const calorieMockup = {
    id: 0,
    calories: 0,
    fats: 0,
    protein: 0,
    carbs: 0
};

const calorieMockup1 = {
    id: 1,
    calories: 200,
    fats: 10,
    protein: 5,
    carbs: 15
};

// CALORIE ITEM DISPATCHES
store.dispatch(addCalorie(calorieMockup));
store.dispatch(addCalorie(calorieMockup1));
//console.log(store.getState());
store.dispatch(removeCalorieItem(calorieMockup1));
//console.log(store.getState());

store.dispatch(setGoal(3000, 160, 300, 80))
store.dispatch(addStatus({
    id: 1,
    description: "This is a status",
    createdAt: 'February 13'
}));
//-----------------------------------

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};
ReactDOM.render(<LoadingPage/>, document.getElementById('app'));
// store.dispatch(startRenderGoal());
// store.dispatch(startSetCalorie());
// store.dispatch(startSetHashtags());
// store.dispatch(startSetStatus());
// store.dispatch(startSetComment());
// store.dispatch(startSetImages());
ReactDOM.render(jsx, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(startSetCurrentUser(user.email));
        store.dispatch(login(user.uid));

        renderApp();

        console.log('log in');

        if (history.location.pathname === '/login') {
            history.push('/');
        }
    } else {
        console.log('log out');
        store.dispatch(logout());
        renderApp();
        history.push('/login');
        store.dispatch(startRemoveCurrentUser())
    }
});