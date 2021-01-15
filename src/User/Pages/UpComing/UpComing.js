import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMoviesUpComing } from '../../../Redux/Action';
import { MDBBtn, MDBCard, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { API_URL } from '../../../Helpers';
import './UpComing.css';


class UpComing extends Component {

    componentDidMount() {
        this.props.getMoviesUpComing();
    }

    renderGetMovies = () => {
        return this.props.dataMoviesUpComing.map((item, index) => {
            return (
                <MDBCol style={{ margin: 'auto' }}>
                    <MDBCard style={{ width: '18rem', padding: '18px', border: 'none' }}>
                        <img src={API_URL + item.imagemovies} alt="img-movie" className="img-movie" />
                        <div className="title-movie">{item.title}</div>
                        <MDBBtn disabled size="sm" id="btn-upcoming-movie">COMING SOON !</MDBBtn>
                    </MDBCard>
                </MDBCol>
            )
        })
    }

    render() {
        return (
            <div>
                <div classNames="card-movie">
                    <div className="title-upcoming-movie" style={{ marginTop: '1%' }}>UPCOMING</div>
                    <center>
                        <MDBContainer>
                            <MDBRow >
                                {this.renderGetMovies()}
                            </MDBRow>
                        </MDBContainer>
                    </center>
                </div>

            </div>
        );
    }
}

const mapStatetoProps = ({ movies }) => {
    return {
        dataMoviesUpComing: movies.dataMoviesUpComing
    }
}

export default connect(mapStatetoProps, { getMoviesUpComing })(UpComing);