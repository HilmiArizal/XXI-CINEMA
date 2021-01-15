const INITIAL_STATE = {
    dataMovies: [],
    dataMoviesById: [],
    dataBestMovies: [],
    dataLikeMovies: [],
    dataCommentMovies: [],
    data3CommentMovies: [],
    dataMoviesUpComing: [],
    dataMoviesNowPlaying: [],
    redirectMovies: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DATA_MOVIES_SUCCESS':
            return { ...state, dataMovies: action.payload }
        case 'DATA_MOVIESBYID_SUCCESS':
            return { ...state, dataMoviesById: action.payload }
        case 'DATA_BESTMOVIES_SUCCESS':
            return { ...state, dataBestMovies: action.payload }
        case 'DATA_LIKEMOVIES_SUCCESS':
            return { ...state, dataLikeMovies: action.payload }
        case 'DATA_COMMENTMOVIES_SUCCESS':
            return { ...state, dataCommentMovies: action.payload }
        case 'DATA_3COMMENTMOVIES_SUCCESS':
            return { ...state, data3CommentMovies: action.payload }
        case 'DATA_MOVIESUPCOMING_SUCCESS':
            return { ...state, dataMoviesUpComing: action.payload }
        case 'DATA_MOVIESNOWPLAYING_SUCCESS':
            return { ...state, dataMoviesNowPlaying: action.payload }
        case 'REDIRECT_MOVIES':
            return { ...state, redirectMovies: action.payload }
        case 'DATA_MOVIES_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}