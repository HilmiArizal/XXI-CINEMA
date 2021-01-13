import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { keepLogin } from './Redux/Action';
import Header from './User/Components/Header/Header';
import Login from './User/Pages/Auth/Login/Login';
import Register from './User/Pages/Auth/Register/Register';
import ChangePassword from './User/Pages/Auth/ChangePassword/ChangePassword';
import Home from './User/Pages/Home/Home/Home';
import Unverified from './User/Pages/Status/Unverified/Unverified';
import Verified from './User/Pages/Status/Verified/Verified';
import LoginAdmin from './Admin/Pages/Auth/Login/LoginAdmin';
import HomeAdmin from './Admin/Pages/Home/HomeAdmin';
import Navbar from './Admin/Components/Navbar/Navbar';
import ProfileAdmin from './Admin/Pages/Profile/ProfileAdmin';
import ManageMovies from './Admin/Pages/ManageMovies/Movies/movies';
import addMovies from './Admin/Pages/ManageMovies/AddMovies/addMovies';
import editMovies from './Admin/Pages/ManageMovies/EditMovies/editMovies';
import NowPlaying from './User/Pages/Movie/NowPlaying';
import DetailMovie from './User/Pages/DetailMovie/DetailMovie';


class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.keepLogin();
    }
  }

  render() {
    if (this.props.role === 'admin') {
      return (
        <div className="body-admin">
          <div className="left-side">
            <Navbar />
          </div>
          <div className="right-side">
            <Route path="/loginadmin" component={LoginAdmin} />
            <Route path="/" component={HomeAdmin} exact />
            <Route path="/profileadmin" component={ProfileAdmin} />
            <Route path="/managemovies" component={ManageMovies} />
            <Route path="/addmovies" component={addMovies} />
            <Route path="/editmovies" component={editMovies} />
          </div>
        </div>
      )
    } else if (this.props.role === 'user') {
      if (this.props.status === 'unverified') {
        return (
          <div>
            <Header />
            <Route path="/login" component={Login} />
            <Route path="/loginadmin" component={LoginAdmin} />
            <Route path="/unverified" component={Unverified} />
            <Route path="/verified" component={Verified} />
            <Route path="/nowplaying" component={NowPlaying} />
            <Route path="/detailmovie" component={DetailMovie} />
          </div>
        )
      } else {
        return (
          <div>
            <Header />
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/loginadmin" component={LoginAdmin} />
            <Route path="/verified" component={Verified} />
            <Route path="/changePassword" component={ChangePassword} />
            <Route path="/nowplaying" component={NowPlaying} />
            <Route path="/detailmovie" component={DetailMovie} />
          </div>
        )
      }
    } else {
      return (
        <div>
          <Header />
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/loginadmin" component={LoginAdmin} />
          <Route path="/register" component={Register} />
          <Route path="/nowplaying" component={NowPlaying} />
          <Route path="/detailmovie" component={DetailMovie} />
        </div>
      )
    }
  }
}

const mapStatetoProps = ({ auth }) => {
  return {
    role: auth.dataUser.role,
    status: auth.dataUser.status
  }
}

export default connect(mapStatetoProps, { keepLogin })(App);