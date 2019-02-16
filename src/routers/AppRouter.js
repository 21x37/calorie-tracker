import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
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

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={DashboardPage} exact={true}/>
                <Route path='/profile/:id' component={ProfilePage} />
                <Route path='/calories' component={CaloriePage} exact={true}/>
                <Route path='/calories/:id' component={EditCalorie} />
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
)
//<Route path='/find-calorie' component={FindCalorie} />
//<PublicRoute path="/" component={LoginPage} exact={true} />



export default AppRouter;