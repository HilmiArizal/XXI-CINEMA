import React, { Component } from 'react';
import BestMovieHome from '../BestMovieHome/BestMovieHome';
import CarouselPage from '../CarouselHome/CarouselHome';
import './Home.css';


class Home extends Component {
    state = {}
    render() {
        return (
            <div>
                <div className="carousel-home">
                    <CarouselPage />
                </div>
                <div className="movie-home">
                    <BestMovieHome />
                </div>
            </div>
        );
    }
}

export default Home;