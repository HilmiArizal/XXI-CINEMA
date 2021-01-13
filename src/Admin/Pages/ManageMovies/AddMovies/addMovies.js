import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './addMovies.css';
import NoImg from '../../../Assets/NoImage.png';
import { addMovies } from '../../../../Redux/Action';
import { MDBIcon } from 'mdbreact';
import Swal from 'sweetalert2';


class AddMovies extends Component {

    state = {
        showStep1: false,
        changeInput: false,
        input: [],

        imageMovies: null,
        previewImage: null,
        changeImage: false,

        errorStep1: '',
        errorImage: '',

        title: '',
        duration: 0,
        genre: '',
        synopsis: '',

        casts: '',
        casts0: '',
        casts1: '',
        casts2: '',
        casts3: '',
        producer: '',
        director: '',
        writter: '',

        showValidate: false
    }

    onChangeImg = (e) => {
        if (e.target.files[0]) {
            this.setState({
                changeImage: true,
                imageMovies: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    onChangeInput = () => {
        const { casts0, casts1, casts2, casts3 } = this.state;
        if (casts0) {
            this.setState({ changeInput: true, casts: `${casts0}${casts1 ? ',' : ''} ${casts1}${casts2 ? ',' : ''} ${casts2}${casts3 ? ',' : ''} ${casts3}` })
        } else {
            alert('Input invalid!')
        }
    }

    onBackInput = () => {
        this.setState({ changeInput: false, casts0: this.state.casts0, casts1: this.state.casts1, casts2: this.state.casts2, casts3: this.state.casts3 })
    }

    onBtnAddInput = () => {
        let html =
            <div className="title-edit-movies">
                <label></label><div style={{ marginRight: '1%' }}>:</div>
                <input type="text" className="form-control form-control-sm" defaultValue={this.state.casts1} placeholder="Casts our movies ?" onChange={(e) => this.setState({ casts1: e.target.value })} />
            </div>
        let html2 =
            < div className="title-edit-movies" >
                <label></label><div style={{ marginRight: '1%' }}>:</div>
                <input type="text" className="form-control form-control-sm" defaultValue={this.state.casts2} placeholder="Casts our movies ?" onChange={(e) => this.setState({ casts2: e.target.value })} />
            </div >
        let html3 =
            <div className="title-edit-movies">
                <label></label><div style={{ marginRight: '1%' }}>:</div>
                <input type="text" className="form-control form-control-sm" defaultValue={this.state.casts3} placeholder="Casts our movies ?" onChange={(e) => this.setState({ casts3: e.target.value })} />
            </div>
        if (this.state.input.length === 0) {
            this.state.input.push(html)
            this.setState({ input: this.state.input })
        } else if (this.state.input.length === 1) {
            this.state.input.push(html2)
            this.setState({ input: this.state.input })
        } else if (this.state.input.length === 2) {
            this.state.input.push(html3)
            this.setState({ input: this.state.input })
        }
    }

    onBtnNext = (e) => {
        e.preventDefault();

        let { imageMovies } = this.state;
        let title = this.state.title;
        let duration = this.state.duration;
        let genre = this.state.genre;
        let synopsis = this.state.synopsis;
        if (title && duration && genre && synopsis) {
            if (imageMovies) {
                Swal.fire({ icon: 'success', timer: 1000, showConfirmButton: false })
                this.setState({ showStep1: true, showValidate: false, errorStep1: '', errorImage: '' })
            } else {
                Swal.fire({ title: 'Upload image!', icon: 'warning', timer: 1000, showConfirmButton: false })
            }
        } else {
            this.setState({ showValidate: true, errorStep1: 'Input data in correctly!' })
        }
    }

    onBtnSubmit = (e) => {
        e.preventDefault();

        let { imageMovies } = this.state;
        let title = this.state.title;
        let duration = this.state.duration;
        let genre = this.state.genre;
        let synopsis = this.state.synopsis;
        let casts = this.state.casts;
        let producer = this.state.producer;
        let director = this.state.director;
        let writter = this.state.writter;
        let dataMovies = {
            title, duration: parseInt(duration), genre, synopsis, casts, producer, director, writter
        }
        if (title && duration && genre && synopsis && casts && producer && director && writter) {
            this.props.addMovies(dataMovies, imageMovies);
        } else {
            this.setState({ showValidate: true, errorStep1: 'Input data in correctly!' })
        }
    }

    render() {
        const { casts0, casts1, casts2, casts3, title, duration, genre, synopsis, casts, producer, director, writter } = this.state;
        if (this.props.redirectMovies) {
            return (
                <Redirect to="/managemovies"></Redirect>
            )
        }
        return (
            <div className="body-manage-movies">
                <div className="card-manage-movies">
                    <div className="arrowback-manage-movies">
                        <Link to="managemovies">
                            <MDBIcon icon="arrow-left" />
                        </Link>
                    </div>
                    <div className="title-manage-movies">Manage Our Movies</div>
                    <form className="form-manage-movies">
                        {
                            this.state.changeImage
                                ?
                                <div>
                                    <h3 style={{ color: 'red' }}>{this.state.showValidate ? this.state.errorImage : ''}</h3>
                                    <img src={this.state.previewImage} alt="no-img" className="no-img" />
                                </div>
                                :
                                <div>
                                    <h3 style={{ color: 'red' }}>{this.state.showValidate ? this.state.errorImage : ''}</h3>
                                    <img src={NoImg} alt="no-img" className="no-img" />
                                </div>
                        }
                        <div>
                            <input type="file" className="file-manage-movies" onChange={this.onChangeImg} />
                        </div>
                        <h3 style={{ color: 'red' }}>{this.state.showValidate ? this.state.errorStep1 : ''}</h3>
                        {
                            this.state.showStep1
                                ?
                                <div>
                                    {
                                        this.state.changeInput
                                            ?
                                            <div className="title-edit-movies">
                                                <label>Casts</label><div style={{ marginRight: '1%' }}>:</div>
                                                <input type="text" value={`${casts0}${casts1 ? ',' : ''} ${casts1}${casts2 ? ',' : ''} ${casts2}${casts3 ? ',' : ''} ${casts3}`} className="form-control form-control-sm" placeholder="Casts our movies ?" />
                                                <MDBIcon icon="cog" className="add-input-casts" onClick={this.onBackInput}></MDBIcon>
                                            </div>
                                            :
                                            <div>
                                                <div className="title-edit-movies">
                                                    <label>Casts</label><div style={{ marginRight: '1%' }}>:</div>
                                                    <input style={this.state.showValidate ? { borderColor: this.state.casts ? null : 'red' } : null} type="text" className="form-control form-control-sm" defaultValue={this.state.casts0} placeholder="Casts our movies ?" onChange={(e) => this.setState({ casts0: e.target.value })} />
                                                    {
                                                        this.state.input.length === 3
                                                            ?
                                                            <div>
                                                                <MDBIcon icon="check" className="add-input-casts" onClick={this.onChangeInput}></MDBIcon>
                                                            </div>
                                                            :
                                                            <div style={{ display: 'flex' }}>
                                                                <MDBIcon icon="plus" className="add-input-casts" onClick={this.onBtnAddInput}></MDBIcon>
                                                                <MDBIcon icon="check" className="add-input-casts" onClick={this.onChangeInput}></MDBIcon>
                                                            </div>
                                                    }
                                                </div>
                                                {this.state.input.map((item) => {
                                                    return (
                                                        <div style={{ marginBottom: '1%' }}>
                                                            {item}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                    }
                                    <div className="title-edit-movies">
                                        <label>Producer</label><div style={{ marginRight: '1%' }}>:</div>
                                        <input style={this.state.showValidate ? { borderColor: this.state.producer ? null : 'red' } : null} type="text" className="form-control form-control-sm" value={this.state.producer} placeholder="Producer our movies ?" onChange={(e) => this.setState({ producer: e.target.value })} />
                                    </div>
                                    <div className="title-edit-movies">
                                        <label>Director</label><div style={{ marginRight: '1%' }}>:</div>
                                        <input style={this.state.showValidate ? { borderColor: this.state.director ? null : 'red' } : null} type="text" className="form-control form-control-sm" value={this.state.director} placeholder="Director our movies ?" onChange={(e) => this.setState({ director: e.target.value })} />
                                    </div>
                                    <div className="title-edit-movies">
                                        <label>Writter</label><div style={{ marginRight: '1%' }}>:</div>
                                        <input style={this.state.showValidate ? { borderColor: this.state.writter ? null : 'red' } : null} type="text" className="form-control form-control-sm" value={this.state.writter} placeholder="Writter our movies ?" onChange={(e) => this.setState({ writter: e.target.value })} />
                                    </div>
                                    <hr />
                                    <center>
                                        <button style={{ marginRight: '1%' }} className="btn btn-primary btn-sm" id="btn-manage-movies" onClick={(e) => e.preventDefault() + this.setState({ showStep1: false })}>BACK</button>
                                        <button className="btn btn-primary btn-sm" id="btn-manage-movies" onClick={this.onBtnSubmit}>SUBMIT</button>
                                    </center>
                                </div>
                                :
                                <div>
                                    <br />
                                    <div className="title-edit-movies">
                                        <label>Title</label><div style={{ marginRight: '1%' }}>:</div>
                                        <input style={this.state.showValidate ? { borderColor: this.state.title ? null : 'red' } : null} type="text" className="form-control form-control-sm" value={this.state.title} placeholder="Title our movies ?" onChange={(e) => this.setState({ title: e.target.value })} />
                                    </div>
                                    <div className="title-edit-movies">
                                        <label>Duration</label><div style={{ marginRight: '1%' }}>:</div>
                                        <input style={this.state.showValidate ? { borderColor: this.state.duration ? null : 'red' } : null} type="number" className="form-control form-control-sm" value={!this.state.duration ? '' : this.state.duration} placeholder="Duration our movies ?" onChange={(e) => this.setState({ duration: e.target.value })} />
                                    </div>
                                    <div className="title-edit-movies">
                                        <label>Genre</label><div style={{ marginRight: '1%' }}>:</div>
                                        <select style={this.state.showValidate ? { borderColor: this.state.genre ? null : 'red' } : null} className="form-control form-control-sm" onChange={(e) => this.setState({ genre: e.target.value })}>
                                            <option hidden disabled selected>{!this.state.genre ? 'Genre our movies ?' : this.state.genre}</option>
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
                                            rows="5"
                                            value={this.state.synopsis}
                                            onChange={(e) => this.setState({ synopsis: e.target.value })}
                                            placeholder="Synopsis our movies ?"
                                            style={this.state.showValidate ? { borderColor: this.state.synopsis ? null : 'red' } : null}
                                        />
                                    </div>
                                    <hr />
                                    <center>
                                        <button className="btn btn-primary btn-sm" id="btn-manage-movies" onClick={this.onBtnNext}>NEXT</button>
                                    </center>
                                </div>
                        }


                    </form>
                </div >
            </div >
        );
    }
}

const mapStatetoProps = ({ movies }) => {
    return {
        redirectMovies: movies.redirectMovies
    }
}


export default connect(mapStatetoProps, { addMovies })(AddMovies);