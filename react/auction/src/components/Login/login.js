import React, {Component} from "react";
import {connect} from "react-redux";

import {Redirect, Link} from "react-router-dom";

import {auth} from "../../reducers/actions";
import './login.css';

class Login extends Component {

    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }
        return (
            <div className="Login">
               <h1>Login</h1>
                <div className="container">
                    <div className="card card-container">
                        <img id="profile-img" className="profile-img-card"
                             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile "/>
                        <form className="form-signin" onSubmit={this.onSubmit}>
                            {this.props.errors.length > 0 && (
                                <ul>
                                    {this.props.errors.map(error => (
                                        <li key={error.field}>{error.message}</li>
                                    ))}
                                </ul>
                            )}
                            <input type="text" id="inputEmail" className="form-control" placeholder="Username"
                                   required onChange={e => this.setState({username: e.target.value})} />
                                <input type="password" id="inputPassword" className="form-control"
                                       placeholder="Password" required onChange={e => this.setState({password: e.target.value})}/>
                                    <div id="remember" className="checkbox">
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in </button>
                        </form>
                        <p>
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </div>

                </div>

            </div>
    )
    }
    }

    const mapStateToProps = state => {
        let errors = [];
        if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
        return {field, message: state.auth.errors[field]};
    });
    }
        return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
    }

    const mapDispatchToProps = dispatch => {
        return {
        login: (username, password) => {
        return dispatch(auth.login(username, password));
    }
    };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Login);