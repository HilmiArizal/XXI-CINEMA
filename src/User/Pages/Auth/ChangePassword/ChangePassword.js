import { MDBContainer } from 'mdbreact';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { onInputUser, changePassword } from '../../../../Redux/Action';
import './ChangePassword.css';


class ChangePassword extends Component {

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

    onChangeShowReq = () => {
        this.props.onInputUser('showReq', true)
    }

    onBtnChangePassword = (e) => {
        e.preventDefault();

        let oldPassword = this.props.oldPassword;
        let password = this.props.password;
        let confirmPassword = this.props.confirmPassword;
        let dataChangePassword = { oldPassword, password, confirmPassword }

        let border = this.props.border;
        let dataBorder = { border }

        this.props.changePassword(dataChangePassword, dataBorder);
    }


    render() {
        if (this.props.redirectLogin) {
            return (
                <Redirect to="/"></Redirect>
            )
        }
        return (
            <div>
                <div className="card-changepassword">
                    <form id="form-changepassword">
                        <div className="title-changepassword">Change Your Password!</div>
                        <hr />
                        <div className="input-form-login">
                            <div className="form-group">
                                <label htmlFor="example3">Old Password</label>
                                <input type={this.props.showOldPassword ? "text" : "password"} className="form-control form-control-sm" onChange={(e) => this.props.onInputUser('oldPassword', e.target.value)} />
                                <MDBContainer>
                                    <i className={`${this.props.showOldPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} login-password`} onClick={() => this.props.onInputUser('showOldPassword', !this.props.showOldPassword)}></i>
                                </MDBContainer>
                            </div>
                        </div>
                        <div className="input-form-login">
                            <div className="form-group">
                                <label>Password</label>
                                <input type={this.props.showPassword ? "text" : "password"} className="form-control form-control-sm" onChange={this.onChangePassword} onFocus={this.onChangeShowReq} style={{ borderColor: this.props.showReq ? this.props.border ? '' : 'red' : '' }} />
                                <MDBContainer>
                                    <i className={`fa ${this.props.showPassword ? "fa-eye-slash" : "fa-eye"} password-register`} onClick={() => this.props.onInputUser('showPassword', !this.props.showPassword)}></i>
                                </MDBContainer>
                                <div className="show-req">{!this.props.border ? this.props.showReq ? 'Password must consist of letters and numbers, first capital letters, and at least 8 characters.' : '' : ''}</div>
                            </div>
                        </div>
                        <div className="input-form-login">
                            <div className="form-group">
                                <label htmlFor="example3">New Confirm Password</label>
                                <input type={this.props.showConfirmPassword ? "text" : "password"} className="form-control form-control-sm" onChange={(e) => this.props.onInputUser('confirmPassword', e.target.value)} />
                                <MDBContainer>
                                    <i className={`${this.props.showConfirmPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} login-password`} onClick={() => this.props.onInputUser('showConfirmPassword', !this.props.showConfirmPassword)}></i>
                                </MDBContainer>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm" id="btn-form-login" onClick={this.onBtnChangePassword}>CHANGE PASSWORD</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ auth }) => {
    return {
        oldPassword: auth.oldPassword,
        password: auth.password,
        confirmPassword: auth.confirmPassword,
        showOldPassword: auth.showOldPassword,
        showPassword: auth.showPassword,
        showConfirmPassword: auth.showConfirmPassword,
        showReq: auth.showReq,
        border: auth.border,
        redirectLogin: auth.redirectLogin
    }
}

export default connect(mapStatetoProps, { onInputUser, changePassword })(ChangePassword);