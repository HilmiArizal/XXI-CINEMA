import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { onInputUser, userRegister } from '../../../../Redux/Action';
import { MDBContainer } from 'mdbreact';
import './Register.css';


class Register extends Component {

    onChangeEmail = (e) => {
        const { onInputUser } = this.props;
        let mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = e.target.value;
        onInputUser('email', e.target.value);
        onInputUser('validMail', mail.test(email));
        onInputUser('borderMail', (mail.test(email)));
    }

    onChangePassword = (e) => {
        const { onInputUser } = this.props;
        let password = e.target.value;
        let number = /[0-9]/;
        onInputUser('password', e.target.value);
        onInputUser('char', password.length > 7);
        onInputUser('num', number.test(password));
        onInputUser('upper', password.charAt(0).toUpperCase() === password.charAt(0));
        onInputUser('border', ((password.length > 7) && (number.test(password)) && (password.charAt(0).toUpperCase() === password.charAt(0))));
    }

    onChangeShowReqMail = () => {
        this.props.onInputUser('showReqMail', true)
    }

    onChangeShowReq = () => {
        this.props.onInputUser('showReq', true)
    }

    onKeyPress = (e) => {
        if (e.keyCode === 13) {
            this.onBtnRegister();
        }
    }

    onBtnRegister = (e) => {
        e.preventDefault();
        let reset = '#form-register';

        let email = this.props.email;
        let username = this.props.username;
        let password = this.props.password;
        let confirmPassword = this.props.confirmPassword;
        let dataRegister = { email, username, password, confirmPassword }

        let border = this.props.border;
        let borderMail = this.props.borderMail;
        let dataBorder = { border, borderMail }

        this.props.userRegister(dataRegister, dataBorder, reset);
    }

    render() {
        const { showPassword, showConfirmPassword, showReq, border, showReqMail, borderMail, redirectLogin } = this.props;
        if (redirectLogin) {
            return (
                <Redirect to="/login"></Redirect>
            )
        }

        return (
            <div>
                <div className="card-register">
                    <form id="form-register">
                        <div className="title-form-login">REGISTER NOW !</div>
                        <hr />
                        <div className="input-form-login">
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control form-control-sm" onChange={(e) => this.props.onInputUser('username', e.target.value)} />
                            </div>
                        </div>
                        <div className="input-form-login">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control form-control-sm" onChange={this.onChangeEmail} onFocus={this.onChangeShowReqMail} style={{ borderColor: showReqMail ? borderMail ? '' : 'red' : '' }} onKeyPress={this.onKeyPress} />
                            </div>
                        </div>
                        <div className="input-form-login">
                            <div className="form-group">
                                <label>Password</label>
                                <input type={showPassword ? "text" : "password"} className="form-control form-control-sm" onChange={this.onChangePassword} onFocus={this.onChangeShowReq} style={{ borderColor: showReq ? border ? '' : 'red' : '' }} />
                                <MDBContainer>
                                    <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-register`} onClick={() => this.props.onInputUser('showPassword', !showPassword)}></i>
                                </MDBContainer>
                                <div className="show-req">{!border ? showReq ? 'Password must consist of letters and numbers, first capital letters, and at least 8 characters.' : '' : ''}</div>
                            </div>
                        </div>
                        <div className="input-form-login">
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type={showConfirmPassword ? "text" : "password"} className="form-control form-control-sm" onChange={(e) => this.props.onInputUser('confirmPassword', e.target.value)} />
                                <MDBContainer>
                                    <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} confirm-password-register`} onClick={() => this.props.onInputUser('showConfirmPassword', !showConfirmPassword)}></i>
                                </MDBContainer>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm" id="btn-form-login" onClick={this.onBtnRegister}>
                            REGISTER
                        </button>
                        <div className="input-form-login">
                            <div className="text-center">Have account ? <br /> <Link to="/login">Login here</Link></div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ auth }) => {
    return {
        email: auth.email,
        username: auth.username,
        password: auth.password,
        confirmPassword: auth.confirmPassword,
        showPassword: auth.showPassword,
        showConfirmPassword: auth.showConfirmPassword,
        borderMail: auth.borderMail,
        showReqMail: auth.showReqMail,
        border: auth.border,
        showReq: auth.showReq,
        redirectLogin: auth.redirectLogin
    }
}

export default connect(mapStatetoProps, { onInputUser, userRegister })(Register);