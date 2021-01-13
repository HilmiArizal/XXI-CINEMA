import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies, addLikeMovie, getLikeMovie, editLikeMovie } from '../../../Redux/Action';
import { API_URL } from '../../../Helpers';
import { MDBBtn, MDBCard, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact';
import './NowPlaying.css';
import { Link } from 'react-router-dom';


class Movie extends Component {

    state = {
        dataLike: [],

        idmovies: 0,
        activeLike: false,
        countLike: 0
    }

    componentDidMount() {
        this.props.getMovies();
        this.props.getLikeMovie();

        window.scrollTo(0, 0);
    }

    onChangeLike = (idmovies) => {
        let movieId = idmovies;
        let userId = this.props.iduser;
        let dataLike = { movieId, userId }

        this.props.addLikeMovie(dataLike)
    }

    onEditLike = (idlikemovie, movieId) => {
        let idmovies = movieId;
        let dataMovie = { idmovies }
        this.props.editLikeMovie(idlikemovie, dataMovie)
    }

    renderMovie = () => {
        return this.props.dataMovies.map((item, index) => {
            return (
                <MDBCol size="3" style={{ margin: 'auto' }}>
                    <MDBCard style={{ width: '18rem', padding: '18px', border: 'none' }}>
                        <img src={API_URL + item.imagemovies} alt="img-movie" className="img-movie" />
                        <div style={{ display: 'flex', paddingTop: '5%', justifyContent: 'space-around' }}>
                            {
                                this.props.dataLikeMovies.map((item2, index) => {
                                    if (!item2.idlikemovie) {
                                        return (
                                            item2.iduser === this.props.iduser
                                                ?
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <MDBIcon far icon="heart" style={{ cursor: 'pointer', marginRight: '10%' }} onClick={() => this.onChangeLike(item.idmovies) + this.setState({ idmovies: item.idmovies })} /><div>{item.likemovie}</div>
                                                </div>
                                                :
                                                ''
                                        )
                                    } else {
                                        return (

                                            item2.movieId === item.idmovies
                                                ?
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <MDBIcon icon="heart" style={{ cursor: 'pointer', marginRight: '10%' }} onClick={() => this.onEditLike(item2.idlikemovie, item2.movieId)} /><div>{item.likemovie}</div>
                                                </div>
                                                :
                                                ''
                                        )
                                    }
                                })
                            }


                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <MDBIcon far icon="comment-alt" style={{ marginRight: '10%' }} /><div>{item.commentmovie}</div>
                            </div>
                        </div>
                        <div className="title-movie">{item.title}</div>
                        <Link to={`detailmovie?idmovies=${item.idmovies}`} style={{ color: 'black', textDecoration: 'none', margin: 'auto', width: '100%' }}>
                            <MDBBtn size="sm" id="btn-choose-movie">Choose</MDBBtn>
                        </Link>
                    </MDBCard>
                </MDBCol >
            )
        })
    }

    render() {
        return (
            <div>
                <div className="card-movie">
                    <div className="title-bestmovie-home" style={{ marginTop: '1%' }}>NOW PLAYING</div>
                    <MDBContainer>
                        <MDBRow>
                            {this.renderMovie()}
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ auth, movies }) => {
    return {
        iduser: auth.dataUser.iduser,
        dataMovies: movies.dataMovies,
        dataLikeMovies: movies.dataLikeMovies
    }
}

export default connect(mapStatetoProps, { getMovies, addLikeMovie, getLikeMovie, editLikeMovie })(Movie);