import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMovies, deleteMovies } from '../.././../../Redux/Action';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBRow, MDBIcon, MDBModalBody, MDBModal, MDBModalHeader, MDBBtn } from 'mdbreact';
import { API_URL } from '../../../../Helpers';
import './movies.css';


class ManageMovies extends Component {

    state = {
        modal: false,
        title: ''
    }

    componentDidMount() {
        this.props.getMovies();
    }

    toggle = (title) => {
        this.setState({ modal: !this.state.modal, title: title })
    }

    onBtnDeleteMovies = (idmovies) => {
        this.props.deleteMovies(idmovies)
        this.toggle();
    }

    renderMovies = () => {
        return this.props.dataMovies.map((item, index) => {
            return (
                <MDBCol size="2" className="movies-manage">
                    <MDBCard style={{ width: "18rem", marginBottom: '20%', transition: '0.2s', cursor: 'pointer' }} className="section-card-movies-admin">
                        <MDBCardImage className="img-fluid" src={API_URL + item.imagemovies} waves id="item-img-admin" />
                        <div class="middle">
                            <div class="text">
                                <Link to={`editmovies?idmovies=${item.idmovies}`}>
                                    <div className="btn btn-sm" id="icon-manage-movies">
                                        <MDBIcon icon="cog" style={{ marginRight: '20%', cursor: 'pointer' }} />
                                    </div>
                                </Link>
                                <div className="btn btn-sm" id="icon-manage-movies" onClick={() => this.toggle(item.title)}  >
                                    <MDBIcon icon="trash" style={{ cursor: 'pointer' }} />
                                </div>
                            </div>
                        </div>
                        <MDBCardBody>
                            <MDBCardTitle>
                                <div className="item-title-admin">{item.title}</div>
                            </MDBCardTitle>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
                        <MDBModalHeader onClick={() => this.toggle()} toggle={this.toggle}>Are you sure for delete {this.state.title}?</MDBModalHeader>
                        <MDBModalBody>
                            <center>
                                <MDBBtn color="danger" size="sm" style={{ marginRight: '5%' }} onClick={() => this.toggle()}>Cancel</MDBBtn>
                                <MDBBtn color="primary" size="sm" onClick={() => this.onBtnDeleteMovies(item.idmovies)}>Confirm</MDBBtn>
                            </center>
                        </MDBModalBody>
                    </MDBModal>
                </MDBCol>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="card-manage-movies">
                    <div className="title-manage-movies">Manage Our Movies</div>

                    <div className="section-manage-movies">
                        <center>
                            <Link to="addmovies">
                                <div className="btn btn-primary btn-sm sub-title-manage-movies">Add Movies</div>
                            </Link>
                        </center>
                        <MDBRow >
                            <div className="movies-manage">
                                {this.renderMovies()}
                            </div>
                        </MDBRow>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ movies }) => {
    return {
        dataMovies: movies.dataMovies
    }
}

export default connect(mapStatetoProps, { getMovies, deleteMovies })(ManageMovies);