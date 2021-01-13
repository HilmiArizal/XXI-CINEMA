import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeNav from '../../Assets/Images/homenav.png'
import CinemaNav from '../../Assets/Images/cinemanav.png'
import { MDBContainer } from 'mdbreact';
import './Header.css';
import Navbar from '../Navbar/Navbar';


class Header extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light" id="header">
                    <MDBContainer>
                        <img src={HomeNav} alt="RcLogo" className="img-header" />
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <Link to="/" id="nav-link">
                                        <img src={CinemaNav} alt="RcLogo" className="img-navbar" />
                                    </Link>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0" id="my-form" autoComplete="off">
                                <div className="input-group">
                                    <div className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></div>
                                    <input style={{ fontStyle: 'italic', fontSize:'90%' }} type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </form>

                        </div>
                    </MDBContainer>
                </nav>
                <Navbar />
            </div>
        );
    }
}

export default Header;