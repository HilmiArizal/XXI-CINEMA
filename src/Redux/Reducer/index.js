import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminProfileReducer from './adminProfileReducer';
import manageMoviesReducer from './manageMoviesReducer';

export default combineReducers({
    auth: authReducer,
    adminProfile: adminProfileReducer,
    movies: manageMoviesReducer
})