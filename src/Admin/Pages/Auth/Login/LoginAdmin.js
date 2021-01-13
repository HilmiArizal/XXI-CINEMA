import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { onInputUser, adminLogin } from '../../../../Redux/Action';
import './LoginAdmin.css';


class LoginAdmin extends Component {

    state = {
        modal: true
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    onBtnLoginAdmin = (e) => {
        e.preventDefault();

        let username = this.props.username;
        let password = this.props.password;
        let dataLogin = { username, password }
        this.props.adminLogin(dataLogin)
        // this.setState({ modal: false })
    }


    render() {
        if (this.props.role === 'admin') {
            return (
                <Redirect to="/"></Redirect>
            )
        }
        return (
            <div className="body-login-admin">
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered size="lg">
                    <Link to="/">
                        <MDBModalHeader toggle={this.toggle}></MDBModalHeader>
                    </Link>
                    <MDBModalBody>
                        <div className="card-login-admin">
                            <form id="form-login-admin">
                                <div className="title-form-login-admin">WELCOME ADMIN !</div>
                                <div className="input-form-login-admin">
                                    <div className="form-group">
                                        <label htmlFor="example3">Username/Email</label>
                                        <input type="text" className="form-control form-control-sm" onChange={(e) => this.props.onInputUser('username', e.target.value)}/>
                                    </div>
                                </div>
                                <div className="input-form-login-admin">
                                    <div className="form-group">
                                        <label htmlFor="example3">Password</label>
                                        <input type={this.props.showPassword ? "text" : "password"} className="form-control form-control-sm" onChange={(e) => this.props.onInputUser('password', e.target.value)} />
                                        <MDBContainer>
                                            <i className={`${this.props.showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} login-password`} onClick={() => this.props.onInputUser('showPassword', !this.props.showPassword)}></i>
                                        </MDBContainer>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-sm" id="btn-form-login-admin" onClick={this.onBtnLoginAdmin}>LOGIN</button>
                            </form>
                        </div>
                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}

const mapStatetoProps = ({ auth }) => {
    console.log(auth.role)
    return {
        username: auth.username,
        password: auth.password,
        showPassword: auth.showPassword,
        role: auth.role
    }
}

export default connect(mapStatetoProps, { onInputUser, adminLogin })(LoginAdmin);