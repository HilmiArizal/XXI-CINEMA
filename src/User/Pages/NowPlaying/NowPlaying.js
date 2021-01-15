import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMoviesNowPlaying, addLikeMovie, getLikeMovie, editLikeMovie, get3CommentMovie } from '../../../Redux/Action';
import { API_URL } from '../../../Helpers';
import { MDBBtn, MDBCard, MDBCol, MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBRow } from 'mdbreact';
import './NowPlaying.css';
import Adult from '../../Assets/Images/Adult.png';
import Teenager from '../../Assets/Images/Teenager.png';
import Allages from '../../Assets/Images/Allages.png';


class Movie extends Component {

    state = {
        idmovies: 0,
        title: '',
        modal: false
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    addMoviesId = (idmovies, title) => {
        this.setState({ idmovies: idmovies, title: title })
        this.toggle();
        this.props.get3CommentMovie(idmovies);
    }

    componentDidMount() {
        this.props.getMoviesNowPlaying();
        this.props.getLikeMovie();

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
        return this.props.dataMoviesNowPlaying.map((item, index) => {
            return (
                <MDBCol size="3" style={{ margin: 'auto' }}>
                    <MDBCard style={{ width: '18rem', padding: '18px', border: 'none' }}>
                        <Link to={`detailmovie?idmovies=${item.idmovies}`} style={{ color: 'black', textDecoration: 'none', margin: 'auto' }}>
                        <img src={API_URL + item.imagemovies} alt="img-movie" className="img-movie" width="100%" />
                        </Link>
                        <div style={{ display: 'flex', paddingTop: '5%', justifyContent: 'space-around' }}>
                            {
                                this.props.dataLikeMovies.map((item2, index) => {
                                    if (!item2.idlikemovie) {
                                        return (
                                            item2.iduser === this.props.iduser
                                                ?
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <MDBIcon far icon="heart" style={{ cursor: 'pointer', marginRight: '10%' }} onClick={() => this.onChangeLike(item.idmovies) + this.setState({ idmovies: item.idmovies })} /><div>{!item2.likemovie ? 0 : item.likemovie}</div>
                                                </div>
                                                :
                                                ''
                                        )
                                    } else {
                                        return (
                                            item2.movieId === item.idmovies
                                                ?
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <MDBIcon icon="heart" style={{ cursor: 'pointer', marginRight: '10%' }} onClick={() => this.onEditLike(item2.idlikemovie, item2.movieId)} /><div>{item2.likemovie}</div>
                                                </div>
                                                :
                                                ''
                                        )
                                    }
                                })
                            }


                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <MDBIcon far icon="comment-alt" style={{ marginRight: '20%,', cursor: 'pointer' }} onClick={() => this.addMoviesId(item.idmovies, item.title)} /><div style={{ marginLeft: '10%' }}>{item.commentmovie}</div>
                            </div>
                            {
                                this.state.modal
                                    ?
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered size="lg" >
                                        <MDBModalHeader toggle={this.toggle}>They said about : {this.state.title}</MDBModalHeader>
                                        <MDBModalBody>
                                            {this.props.data3CommentMovies.map((item3) => {
                                                return (
                                                    <div className="card-comment-movie">
                                                        <label style={{ fontSize: '90%', fontWeight: 'bold' }}>{item3.username}</label>
                                                        <div style={{ fontSize: '70%', fontStyle: 'italic' }}>{item3.comment}</div>
                                                    </div>
                                                )
                                            })}
                                            {
                                                this.props.data3CommentMovies.length === 0
                                                    ?
                                                    <div className="text-center">Haven't comment yet!</div>
                                                    :
                                                    <center>
                                                        <Link to={`detailmovie?idmovies=${this.state.idmovies}`} style={{ color: 'black', textDecoration: 'none', margin: 'auto', width: '100%' }}>
                                                            <MDBBtn size="sm" id="btn-choose-detailmovie" >See more comment {`>>>`}</MDBBtn>
                                                        </Link>
                                                    </center>
                                            }
                                        </MDBModalBody>
                                    </MDBModal>
                                    :
                                    ''
                            }
                        </div>
                        <div className="title-movie">{item.title}</div>
                        <div className="text-center">
                            {item.category === 'All Ages' ?
                                <img src={Allages} alt="img-category" /> :
                                item.category === 'Adult (17+)' ?
                                    <img src={Adult} alt="img-category" /> :
                                    item.category === 'Teenager (13+)' ?
                                        <img src={Teenager} alt="img-category" /> :
                                        ''
                            }
                        </div>
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
        dataMoviesNowPlaying: movies.dataMoviesNowPlaying,
        dataLikeMovies: movies.dataLikeMovies,
        data3CommentMovies: movies.data3CommentMovies
    }
}

export default connect(mapStatetoProps, { getMoviesNowPlaying, addLikeMovie, getLikeMovie, editLikeMovie, get3CommentMovie })(Movie);