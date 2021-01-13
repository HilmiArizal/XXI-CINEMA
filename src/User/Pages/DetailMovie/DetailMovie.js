import { MDBBtn, MDBContainer, MDBIcon } from 'mdbreact';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API_URL } from '../../../Helpers';
import { getMoviesById, getCommentMovie, addCommentMovie, deleteCommentMovie } from '../../../Redux/Action';
import './DetailMovie.css';
import $ from 'jquery';



class DetailMovie extends Component {

    state = {
        idmovies: 0,
        commentMovies: ''
    }

    componentDidMount() {
        let idmovies = this.props.location.search.split('=')[1];
        this.props.getMoviesById(idmovies);
        this.props.getCommentMovie(idmovies);
        this.setState({ idmovies: idmovies })
    }

    onBtnComment = (e) => {

        e.preventDefault()

        let userId = this.props.iduser;
        let movieId = this.state.idmovies;
        let comment = this.state.commentMovies;
        let dataComment = { userId, movieId: parseInt(movieId), comment }
        this.props.addCommentMovie(dataComment, movieId)

        $('#comment-form')[0].reset();
        this.setState({ commentMovies: '' })

    }

    onBtnDeleteComment = (idcommentmovie) => {
        let movieId = this.state.idmovies;
        this.props.deleteCommentMovie(idcommentmovie, movieId);
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    {this.props.dataMoviesById.map((item, index) => {
                        return (
                            <div className="card-detail-movie" key={index}>
                                <div className="section-detail-movie">
                                    <div className="left-section-detail-movie">
                                        <img src={API_URL + item.imagemovies} alt="img-movie" className="img-movie" />
                                        <div className="btn-buy-movie">BUY MOVIE</div>
                                    </div>
                                    <div className="right-section-detail-movie">
                                        <div className="title-detail-movie">{item.title}</div>
                                        <div>
                                            <label>Genre</label> : {item.genre}
                                        </div>
                                        <div>
                                            <label>Producer</label> : {item.producer}
                                        </div>
                                        <div>
                                            <label>Director</label> : {item.director}
                                        </div>
                                        <div>
                                            <label>Writter</label> : {item.writter}
                                        </div>
                                        <div>
                                            <label>Casts</label> : {item.casts}
                                        </div>
                                        <div className="section-playing">
                                            <hr />
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div style={{ marginRight: '10%', cursor: 'pointer' }}>Watch Trailer</div>
                                                <div style={{ cursor: 'pointer' }}>Playing At</div>
                                            </div>
                                            <hr />
                                        </div>
                                        <div>
                                            <label style={{ fontWeight: 'bold' }}>SYNOPSIS</label>
                                            <div>
                                                {item.synopsis}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div style={{ fontWeight: 'bold', fontSize: '120%' }}>They said about : {item.title} ? </div>
                                {this.props.dataCommentMovies.map((item, index) => {
                                    return (
                                        <div className="card-comment-movie">
                                            {
                                                this.props.iduser === item.iduser ?
                                                    <MDBContainer><div className="delete-comment-movie" onClick={() => this.onBtnDeleteComment(item.idcommentmovie)}><MDBIcon icon="trash-alt" /></div></MDBContainer> :
                                                    ''
                                            }
                                            <label style={{ fontSize: '90%', fontWeight: 'bold' }}>{item.username}</label>
                                            <div style={{ fontSize: '70%', fontStyle: 'italic' }}>{item.comment}</div>
                                        </div>
                                    )
                                })}
                                <form id="comment-form">
                                    <div className="input-group" style={{ marginTop: '2%', marginBottom: '2%' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                                <i className="fas fa-pencil-alt prefix"></i>
                                            </span>
                                        </div>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => this.setState({ commentMovies: e.target.value })}></textarea>
                                    </div>
                                    {
                                        this.state.commentMovies
                                            ?
                                            <MDBBtn size="sm" id="btn-choose-detailmovie" onClick={this.onBtnComment}>Comment Now !</MDBBtn>
                                            :
                                            <MDBBtn disabled size="sm" id="btn-choose-detailmovie" onClick={this.onBtnComment}>Comment Now !</MDBBtn>
                                    }
                                </form>
                            </div>
                        )
                    })}
                </MDBContainer>
            </div>
        );
    }
}

const mapStatetoProps = ({ auth, movies }) => {
    return {
        iduser: auth.dataUser.iduser,
        dataMoviesById: movies.dataMoviesById,
        dataCommentMovies: movies.dataCommentMovies
    }
}

export default connect(mapStatetoProps, { getMoviesById, getCommentMovie, addCommentMovie, deleteCommentMovie })(DetailMovie);