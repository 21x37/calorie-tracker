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


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch(startSetCurrentUser(user.email));
      store.dispatch(login(user.uid));
      renderApp();
      if (history.location.pathname === '/login') {
        history.push('/');
      }
    }else {
        store.dispatch(startRemoveCurrentUser())
        store.dispatch(logout());
        renderApp();
        history.push('/login');
    }
  });