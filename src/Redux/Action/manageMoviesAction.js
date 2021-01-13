import Axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../Helpers";


export const getMovies = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL + `movies/getMovies`);
            dispatch({
                type: 'DATA_MOVIES_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: 'DATA_MOVIES_FAIL'
            })
        }
    }
}

export const getMoviesById = (idmovies) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL + `movies/getMoviesById?idmovies=${idmovies}`)
            dispatch({
                type: 'DATA_MOVIESBYID_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getBestMovies = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL + `movies/getBestMovies`)
            dispatch({
                type: 'DATA_BESTMOVIES_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const addMovies = (dataMovies, imageMovies) => {
    return async (dispatch) => {
        try {
            let formData = new FormData();

            formData.append('dataMovies', JSON.stringify(dataMovies))
            formData.append('imageMovies', (imageMovies))

            await Axios.post(API_URL + `movies/addMovies`, formData)
            const res = await Axios.get(API_URL + `movies/getMovies`);
            dispatch({
                type: 'DATA_MOVIES_SUCCESS',
                payload: res.data
            })
            Swal.fire({
                icon: 'success',
                timer: 1000,
                showConfirmButton: false
            })
            dispatch({
                type: 'REDIRECT_MOVIES',
                payload: true
            })
            setTimeout(() => {
                dispatch({
                    type: 'REDIRECT_MOVIES',
                    payload: false
                })
            }, 1000);
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteMovies = (idmovies) => {
    return async (dispatch) => {
        try {
            await Axios.delete(API_URL + `movies/deleteMovies?idmovies=${idmovies}`)
            const res = await Axios.get(API_URL + `movies/getMovies`);
            dispatch({
                type: 'DATA_MOVIES_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const editMovies = (idmovies, dataMovies, imagemovies) => {
    return async (dispatch) => {
        try {
            let formData = new FormData();

            formData.append('dataMovies', JSON.stringify(dataMovies))
            formData.append('imagemovies', (imagemovies))

            await Axios.patch(API_URL + `movies/editMovies?idmovies=${idmovies}`, formData)
            const res = await Axios.get(API_URL + `movies/getMoviesById?idmovies=${idmovies}`);
            dispatch({
                type: 'DATA_MOVIESBYID_SUCCESS',
                payload: res.data
            })
            Swal.fire({
                icon: 'success',
                position: 'center',
                timer: 1000,
                showConfirmButton: false
            })
            dispatch({
                type: 'REDIRECT_MOVIES',
                payload: true
            })
            setTimeout(() => {
                dispatch({
                    type: 'REDIRECT_MOVIES',
                    payload: false
                })
            }, 1000);
        } catch (err) {
            console.log(err)
        }
    }
}

export const addLikeMovie = (dataLike) => {
    return async (dispatch) => {
        try {
            await Axios.post(API_URL + `movies/addLikeMovie`, dataLike)
            const token = localStorage.getItem('token');
            if (token) {
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                const res = await Axios.get(API_URL + `movies/getLikeMovie`, headers)
                dispatch({ type: 'DATA_LIKEMOVIES_SUCCESS', payload: res.data })
            }
            const res = await Axios.get(API_URL + `movies/getMovies`);
            dispatch({
                type: 'DATA_MOVIES_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getLikeMovie = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                const res = await Axios.get(API_URL + `movies/getLikeMovie`, headers)
                dispatch({ type: 'DATA_LIKEMOVIES_SUCCESS', payload: res.data })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const editLikeMovie = (idlikemovie, dataMovie) => {
    return async (dispatch) => {
        try {
            await Axios.patch(API_URL + `movies/editLikeMovie?idlikemovie=${idlikemovie}`, dataMovie)
            const token = localStorage.getItem('token');
            if (token) {
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                const res = await Axios.get(API_URL + `movies/getLikeMovie`, headers)
                dispatch({ type: 'DATA_LIKEMOVIES_SUCCESS', payload: res.data })
            }
            const res = await Axios.get(API_URL + `movies/getMovies`);
            dispatch({ type: 'DATA_MOVIES_SUCCESS', payload: res.data })
        } catch (err) {
            console.log(err)
        }
    }
}

export const addCommentMovie = (dataComment, movieId) => {
    return async (dispatch) => {
        try {
            console.log(dataComment)
            await Axios.post(API_URL + `movies/addCommentMovie`, dataComment)
            const res = await Axios.get(API_URL + `movies/getCommentMovie?idmovies=${movieId}`)
            dispatch({ type: 'DATA_COMMENTMOVIES_SUCCESS', payload: res.data })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getCommentMovie = (idmovies) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL + `movies/getCommentMovie?idmovies=${idmovies}`)
            dispatch({ type: 'DATA_COMMENTMOVIES_SUCCESS', payload: res.data })
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteCommentMovie = (idcommentmovie, movieId) => {
    return async (dispatch) => {
        try {
            await Axios.delete(API_URL + `movies/deleteCommentMovie?idcommentmovie=${idcommentmovie}`, { data: { movieId: movieId } })
            const res = await Axios.get(API_URL + `movies/getCommentMovie?idmovies=${movieId}`)
            dispatch({ type: 'DATA_COMMENTMOVIES_SUCCESS', payload: res.data })
        } catch (err) {
            console.log(err)
        }
    }
}