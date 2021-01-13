const INITIAL_STATE = {
    dataAdminProfile: [],
    dataAdminProfileByUser: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DATA_PROFILEADMIN_SUCCESS':
            return { ...state, dataAdminProfile: action.payload }
        case 'DATA_PROFILEADMIN_BYUSER_SUCCESS':
            return { ...state, dataAdminProfileByUser: action.payload }
        case 'DATA_PROFILEADMIN_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}