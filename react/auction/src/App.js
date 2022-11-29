import React, { Component } from 'react';
import './App.css';
import Auctions from './containers/auctions';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import NotFound from "./components/NotFound/notFound";
import Login from './components/Login/login';
import { Provider, connect } from "react-redux";
import { createStore,applyMiddleware } from "redux";
import auctions from "./reducers/reducers";
import thunk from "redux-thunk";
import {auth} from "./reducers/actions";
import Register from './components/Register/register.js';
import NewAuction from './components/auction/newAuction';
import Redirecting from './helpers/redirect';
import FullAuction from './components/auction/fullAuction';
import Finished from './components/auction/finished/finished';
import Active from './components/auction/active/active';
import Winning from './components/auction/winning/winning';

let store = createStore(auctions, applyMiddleware(thunk));

class RootContainerComponent extends Component {

    componentDidMount() {
        this.props.loadUser();
    }

    PrivateRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render={props => {
            if (this.props.auth.isLoading) {
                return <em>Loading...</em>;
            } else if (!this.props.auth.isAuthenticated) {
                return <Redirect to="/login" />;
            } else {
                return <ChildComponent {...props} />
            }
        }} />
    }

    render() {
        let {PrivateRoute} = this;
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <PrivateRoute exact path="/" component={Auctions} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/newauction" component={NewAuction} />
                        <Route exact path="/redirect" component={Redirecting} />
                        <Route exact path="/finished" component={Finished} />
                        <Route exact path="/active" component={Active} />
                        <Route exact path="/winning" component={Winning} />
                        <Route exact path="/:id" component={FullAuction} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => {
            return dispatch(auth.loadUser());
        }
    }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <RootContainer />
        </Provider>
    );
  }
}

export default App;
