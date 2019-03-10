import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import uuid from 'uuid';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from '../routers/PrivateRoute';
import PublicRoute from '../routers/PublicRoute';
//import FindCalorie from '../components/FindCaloriePage';
import ProfilePage from '../components/profileComponent/ProfilePage';
import CaloriePage from '../components/CaloriePage';
import EditCalorie from '../components/calorieComponents/EditCalorie';
import CalorieLookUp from '../components/calorieLookUp/CalorieLookUp';
import SearchUsers from '../components/searchUsers/SearchUsers';
import Followers from '../components/followComponents/Followers';
import Following from '../components/followComponents/Following';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
    <div id='wrapper'>
            <div id='app-router-div'>
                <Switch>
                    <PrivateRoute path="/" component={DashboardPage} exact={true}/>
                    <PublicRoute path='/login' component={LoginPage} />
                    <PrivateRoute path='/profile/:id' component={ProfilePage} exact={true} key={uuid()}/>
                    <PrivateRoute path='/profile/:id/followers' component={Followers} key={uuid()}/>
                    <PrivateRoute path='/profile/:id/following' component={Following} key={uuid()}/>
                    <PrivateRoute path='/calories' component={CaloriePage} exact={true}/>
                    <PrivateRoute path='/foodsearch' component={CalorieLookUp} />
                    <PrivateRoute path='/calories/:id' component={EditCalorie} />
                    <PublicRoute component={NotFoundPage}/>
                </Switch>
            </div>
        </div>
    </Router>
)


export default AppRouter;