import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../../reducers/actions";
import './register.css';

class Register extends Component {

    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.register(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }
        return (
            <div className="Register">
                <div className="card card-container">
                    <img id="profile-img" className="profile-img-card"
                         src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile "/>
                    <form className="form-signin" onSubmit={this.onSubmit}>
                        <legend>Register as a new user</legend>
                        {this.props.errors.length > 0 && (
                            <ul>
                                {this.props.errors.map(error => (
                                    <li key={error.field}>{error.message}</li>
                                ))}
                            </ul>
                        )}
                        <input type="text" id="inputEmail" className="form-control" placeholder="Username"
                               required onChange={e => this.setState({username: e.target.value})}/>
                        <input type="password" id="inputPassword" className="form-control"
                               placeholder="Password" required
                               onChange={e => this.setState({password: e.target.value})}/>
                        <div id="remember" className="checkbox">
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Register</button>
                    </form>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
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
        register: (username, password) => dispatch(auth.register(username, password)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);