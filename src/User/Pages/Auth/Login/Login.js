import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { onInputUser, userLogin } from '../../../../Redux/Action';
import { MDBContainer } from 'mdbreact';
import './Login.css';


class Login extends Component {

    onKeyPress = (e) => {
        if (e.keyCode === 13) {
            this.onBtnLogin();
        }
    }

    onBtnLogin = (e) => {
        e.preventDefault();

        let username = this.props.username;
        let password = this.props.password;
        let dataLogin = { username, password }

        this.props.userLogin(dataLogin)
    }

    render() {
        if(this.props.status === 'unverified'){
            return(
                <Redirect to="/unverified"></Redirect>
            )
        }
        if (this.props.role === 'user') {
            return (
                <Redirect to="/"></Redirect>
            )
        }
        return (
            <div>
                <div className="card-login">
                    <form id="form-login">
                        <div className="title-form-login">LOGIN NOW !</div>
                        <hr />
                        <div className="input-form-login">
                            <div className="form-group">
                                <label htmlFor="example3">Username/Email</label>
                                <input type="text" className="form-control form-control-sm" onChange={(e) => this.props.onInputUser('username', e.target.value)} onKeyPress={this.onKeyPress} />
                            </div>
                        </div>
                        <div className="input-form-login">
                            <div className="form-group">
                                <label htmlFor="example3">Password</label>
                                <input type={this.props.showPassword ? "text" : "password"} className="form-control form-control-sm" onChange={(e) => this.props.onInputUser('password', e.target.value)} />
                                <MDBContainer>
                                    <i className={`${this.props.showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} login-password`} onClick={() => this.props.onInputUser('showPassword', !this.props.showPassword)}></i>
                                </MDBContainer>
                            </div>
                        </div>
                        <div className="input-form-login">
                            <div>Forgot password ? <Link to="/forgotpassword">Reset here</Link></div>
                        </div>
                        <button className="btn btn-primary btn-sm" id="btn-form-login" onClick={this.onBtnLogin}>LOGIN</button>
                        <div className="input-form-login">
                            <div className="text-center">Haven't account ? <br /> <Link to="/register">Register here</Link></div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ auth }) => {
    return {
        username: auth.username,
        password: auth.password,
        role: auth.dataUser.role,
        status: auth.dataUser.status,
        showPassword: auth.showPassword
    }
}

export default connect(mapStatetoProps, { onInputUser, userLogin })(Login);