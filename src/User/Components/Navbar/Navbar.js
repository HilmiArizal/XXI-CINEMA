import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Imax from '../../Assets/Images/imaxnav.png';
import Dolby from '../../Assets/Images/dolbynav.png';
import Mtix from '../../Assets/Images/mtixnav.png';
import { MDBContainer, MDBIcon } from 'mdbreact';
import { userLogout } from '../../../Redux/Action';
import './Navbar.css';


class Navbar extends Component {


    onBtnLogout = () => {
        this.props.userLogout();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
                    <MDBContainer>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0" id="navbar-between">
                                <li className="nav-item">
                                    <Link to="/nowplaying" id="nav-link"><MDBIcon icon="play" />Now Playing</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/upcoming" id="nav-link"><MDBIcon icon="volume-up" />Upcoming</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/theaters" id="nav-link"><MDBIcon icon="map-marker-alt" />Theaters</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/promotions" id="nav-link"><MDBIcon icon="star-half-alt" />Promotions</Link>
                                </li>
                                <li className="nav-item">
                                    {
                                        !this.props.username
                                            ?
                                            <div className="dropdown">
                                                <div id="nav-link" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><MDBIcon icon="user-alt" />Account</div>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                    <li>
                                                        <Link to="/login" id="link-account-nav">
                                                            <button className="dropdown-item" id="dropdown-item">
                                                                <MDBIcon icon="sign-in-alt" className="account-nav" />Login
                                                    </button>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/register" id="link-account-nav">
                                                            <button className="dropdown-item" id="dropdown-item">
                                                                <MDBIcon icon="user-plus" className="account-nav" />Register
                                                    </button>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            :
                                            <div className="dropdown">
                                                <div id="nav-link" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><MDBIcon icon="user-alt" />{this.props.username}</div>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                    <li>
                                                        <Link to="/changepassword" id="link-account-nav">
                                                            <button className="dropdown-item" id="dropdown-item">
                                                                <MDBIcon icon="unlock" className="account-nav" />Change Password
                                                </button>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/" id="link-account-nav" onClick={this.onBtnLogout}>
                                                            <button className="dropdown-item" id="dropdown-item">
                                                                <MDBIcon icon="sign-out-alt" className="account-nav" />Logout
                                                </button>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                    }

                                </li>
                            </ul>
                            <hr className="hr-vertical" />
                            <form className="form-inline my-2 my-lg-0" id="my-form" autoComplete="off">
                                <img src={Imax} alt="logo-img" className="logo-img-nav" />
                                <img src={Dolby} alt="logo-img" className="logo-img-nav" />
                                <img src={Mtix} alt="logo-img" className="logo-img-nav" />
                            </form>
                        </div>
                    </MDBContainer>
                </nav>

            </div>
        );
    }
}

const mapStatetoProps = ({ auth }) => {
    return {
        username: auth.dataUser.username
    }
}

export default connect(mapStatetoProps, { userLogout })(Navbar);