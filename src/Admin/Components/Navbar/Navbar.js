import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { getAdminProfile, userLogout } from '../../../Redux/Action';
import { connect } from 'react-redux';
import ImgAccount from '../../Assets/AkunImage.png';
import { MDBIcon } from 'mdbreact';
import { API_URL } from '../../../Helpers';


class Navbar extends Component {

    onBtnLogout = () => {
        this.props.userLogout();
    }

    componentDidMount() {
        this.props.getAdminProfile();
    }

    render() {
        return (
            <div id="body-sidenav">
                <div className="sidebar">
                    {
                        this.props.dataAdminProfile.length > 0
                            ?
                            this.props.dataAdminProfile.map((item, index) => {
                                return (

                                    <div className="img-admin" key={index}>
                                        <img src={API_URL + item.imageprofile === null ? ImgAccount : API_URL + item.imageprofile} alt="img-profile-admin" className="img-profile-admin" />
                                    </div>
                                )
                            })
                            :
                            <div className="img-admin">
                                <img src={ImgAccount} alt="img-profile-admin" className="img-profile-admin" />
                            </div>
                    }
                    <div style={{ width: '100%' }}>
                        <Link to="/" id="link-sidenav">
                            <MDBIcon icon="home" style={{ width: '15%' }} />
                                Home
                                </Link>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Link to="/profileadmin" id="link-sidenav">
                            <MDBIcon icon="user" style={{ width: '15%' }} />
                                Profile
                                </Link>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Link to="/managemovies" id="link-sidenav">
                            <MDBIcon icon="film" style={{ width: '15%' }} />
                                Manage Movies
                                </Link>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Link to="/" onClick={this.onBtnLogout} id="link-sidenav">
                            <MDBIcon icon="sign-out-alt" style={{ width: '15%' }} />
                        Logout
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStatetoProps = ({ adminProfile }) => {
    return {
        dataAdminProfile: adminProfile.dataAdminProfile
    }
}

export default connect(mapStatetoProps, { getAdminProfile, userLogout })(Navbar);