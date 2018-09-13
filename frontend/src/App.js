import React, {Component} from 'react';
import {Route, Switch, BrowserRouter, Redirect, Link} from 'react-router-dom';

import {Provider, connect} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {auth} from "./actions/index";
import reducer from "./reducers/index";

import RoomManager from "./components/RoomManager";
import Room from "./components/Room";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";


let store = createStore(reducer, applyMiddleware(thunk));

class RootContainerComponent extends Component {

    componentDidMount() {
        this.props.loadUser();
    }

    PrivateRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render={props => {
            if (this.props.auth.isLoading) {
                return <div>Loading...
                    <Link to={"/login"}>login</Link>
                    <Link to={"/register"}>register</Link>
                </div>;
            } else if (!this.props.auth.isAuthenticated) {
                return <Redirect to="/login"/>;
            } else {
                return <ChildComponent {...props} />
            }
        }}/>
    }

    render() {
        let {PrivateRoute} = this;
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path="/" component={RoomManager}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/room/:id/" component={Room}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
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

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootContainer/>
            </Provider>
        )
    }
}