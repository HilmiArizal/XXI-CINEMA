import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getMoviesById, editMovies } from '../../../../Redux/Action';
import { MDBIcon } from 'mdbreact';
import { API_URL } from '../../../../Helpers';
import './editMovies.css';


class EditMovies extends Component {

    state = {
        changeImage: false,
        imagemovies: null,
        previewImage: null,

        title: '',
        duration: 0,
        genre: '',
        synopsis: '',
        casts: '',
        producer: '',
        director: '',
        writter: '',
        playing: '',
        category: ''

    }

    componentDidMount() {
        let idmovies = this.props.location.search.split('=')[1];
        this.props.getMoviesById(idmovies);
    }

    onChangeImage = (e) => {
        if (e.target.files[0]) {
            this.setState({
                changeImage: true,
                imagemovies: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    onBtnEditMovies = () => {
        this.props.dataMoviesById.map((item, index) => {
            let idmovies = item.idmovies;
            let changeImage = this.state.changeImage;
            let imagemovies = this.state.imagemovies === null ? API_URL + item.imagemovies : this.state.imagemovies;
            let title = !this.state.title ? item.title : this.state.title;
            let duration = !this.state.duration ? item.duration : this.state.duration;
            let genre = !this.state.genre ? item.genre : this.state.genre;
            let synopsis = !this.state.synopsis ? item.synopsis : this.state.synopsis;
            let casts = !this.state.casts ? item.casts : this.state.casts;
            let producer = !this.state.producer ? item.producer : this.state.producer;
            let director = !this.state.director ? item.director : this.state.director;
            let writter = !this.state.writter ? item.writter : this.state.writter;
            let playing = !this.state.playing ? item.playing : this.state.playing;
            let category = !this.state.category ? item.category : this.state.category;
            let dataMovies = { title, duration: parseInt(duration), genre, synopsis, casts, producer, director, writter, playing, category, changeImage };
            let redirectMovies = this.state.redirectMovies;
            console.log(dataMovies)
            this.props.editMovies(idmovies, dataMovies, imagemovies, redirectMovies)
        })
    }

    renderMoviesById = () => {
        return this.props.dataMoviesById.map((item, index) => {
            return (
                <div className="section-edit-movies">
                    <div>
                        {
                            this.state.changeImage
                                ?
                                <img src={this.state.previewImage} alt="img-movies" />
                                :
                                <img src={API_URL + item.imagemovies} alt="img-movies" />
                        }
                        <div>
                            <input type="file" onChange={this.onChangeImage} className="img-movies-file" />
                        </div>
                    </div>
                    <div className="container">
                        <div className="title-edit-movies">
                            <label>Title</label><div style={{ marginRight: '1%' }}>:</div>
                            <input type="text" defaultValue={item.title} className="form-control form-control-sm" onChange={(e) => this.setState({ title: e.target.value })} />
                        </div>
                        <div className="title-edit-movies">
                            <label>Duration</label><div style={{ marginRight: '1%' }}>:</div>
                            <input type="number" defaultValue={item.duration} className="form-control form-control-sm" onChange={(e) => this.setState({ duration: e.target.value })} />
                        </div>
                        <div className="title-edit-movies" onChange={(e) => this.setState({ genre: e.target.value })}>
                            <label>Genre</label><div style={{ marginRight: '1%' }}>:</div>
                            <select className="form-select form-control-sm">
                                <option disabled selected hidden>{item.genre}</option>
                                <option>Action</option>
                                <option>Comedy</option>
                                <option>Drama</option>
                                <option>Horror</option>
                            </select>
                        </div>
                        <div className="title-edit-movies">
                            <label>Synopsis</label><div style={{ marginRight: '1%' }}>:</div>
                            <textarea
                                className="form-control form-control-sm"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                defaultValue={item.synopsis}
                                onChange={(e) => this.setState({ synopsis: e.target.value })}
                            />
                        </div>
                        <hr />
                        <div className="title-edit-movies">
                            <label>Casts</label><div style={{ marginRight: '1%' }}>:</div>
                            <textarea
                                className="form-control form-control-sm"
                                id="exampleFormControlTextarea1"
                                rows="2"
                                defaultValue={item.casts}
                                onChange={(e) => this.setState({ casts: e.target.value })}
                                style={{ marginBottom: '1%' }}
                            />
                        </div>
                        <div className="title-edit-movies">
                            <label>Producer</label><div style={{ marginRight: '1%' }}>:</div>
                            <input type="text" defaultValue={item.producer} className="form-control form-control-sm" onChange={(e) => this.setState({ producer: e.target.value })} />
                        </div>
                        <div className="title-edit-movies">
                            <label>Director</label><div style={{ marginRight: '1%' }}>:</div>
                            <input type="text" defaultValue={item.director} className="form-control form-control-sm" onChange={(e) => this.setState({ director: e.target.value })} />
                        </div>
                        <div className="title-edit-movies">
                            <label>Writter</label><div style={{ marginRight: '1%' }}>:</div>
                            <input type="text" defaultValue={item.writter} className="form-control form-control-sm" onChange={(e) => this.setState({ writter: e.target.value })} />
                        </div>
                        <div className="title-edit-movies" onChange={(e) => this.setState({ playing: e.target.value })}>
                            <label>Playing</label><div style={{ marginRight: '1%' }}>:</div>
                            <select className="form-select form-control-sm">
                                <option hidden disabled selected>{item.playing}</option>
                                <option>Now Playing</option>
                                <option>Up Coming</option>
                            </select>
                        </div>
                        <div className="title-edit-movies" onChange={(e) => this.setState({ category: e.target.value })}>
                            <label>Category</label><div style={{ marginRight: '1%' }}>:</div>
                            <select className="form-select form-control-sm">
                                <option hidden disabled selected>{item.category}</option>
                                <option>All Ages</option>
                                <option>Adult (17+)</option>
                                <option>Teenager (13+)</option>
                            </select>
                        </div>
                        <hr />
                        <center>
                            <div className="btn btn-primary btn-sm custom-edit-movies" onClick={this.onBtnEditMovies}>SUBMIT</div>
                        </center>
                    </div>
                </div>
            )
        })
    }

    render() {
        if (this.props.redirectMovies) {
            return (
                <Redirect to="managemovies"></Redirect>
            )
        }
        return (
            <div>
                <div className="card-manage-movies">
                    <div className="arrowback-manage-movies">
                        <Link to="managemovies">
                            <MDBIcon icon="arrow-left" />
                        </Link>
                    </div>
                    <div className="title-manage-movies">Manage Our Movies</div>
                    <div >
                        {this.renderMoviesById()}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStatetoProps = ({ movies }) => {
    return {
        dataMoviesById: movies.dataMoviesById,
        redirectMovies: movies.redirectMovies
    }
}

export default connect(mapStatetoProps, { getMoviesById, editMovies })(EditMovies);