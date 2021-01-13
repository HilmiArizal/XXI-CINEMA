import { MDBBtn, MDBCard, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../Helpers';
import { getBestMovies } from '../../../../Redux/Action';
import './BestMovieHome.css';


class BestMovieHome extends Component {

    state = {}

    componentDidMount() {
        this.props.getBestMovies();
    }

    render() {
        return (
            <div>
                <div className="title-bestmovie-home">NOW PLAYING</div>
                <div className="card-bestmovie-home">
                    <MDBContainer>
                        <MDBRow>
                            {this.props.dataBestMovies.map((item, index) => {
                                return (
                                    <MDBCol size="4">
                                        <Link to={`detailmovie?idmovies=${item.idmovies}`} style={{ color: 'black', textDecoration: 'none' }}>
                                            <MDBCard style={{ width: '18rem', border: 'none', padding: '18px', margin: 'auto' }}>
                                                <img src={API_URL + item.imagemovies} alt="img-movie" className="img-movie" />
                                                <div className="title-movie">{item.title}</div>
                                                <MDBBtn size="sm" id="btn-choose-movie">Choose</MDBBtn>
                                            </MDBCard>
                                        </Link>
                                    </MDBCol>
                                )
                            })}
                        </MDBRow>
                    </MDBContainer>
                    <center>
                        <Link to="nowplaying">
                            <MDBBtn size="sm" id="btn-seemore-movie">See More ...</MDBBtn>
                        </Link>
                    </center>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ movies }) => {
    return {
        dataBestMovies: movies.dataBestMovies
    }
}

export default connect(mapStatetoProps, { getBestMovies })(BestMovieHome);