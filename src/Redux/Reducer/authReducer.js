const INITIAL_STATE = {
    dataUser: [],
    dataAdmin: [],
    iduser: 0,
    email: '',
    username: '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
    role: '',
    status: '',

    showOldPassword: false,
    showPassword: false,
    showConfirmPassword: false,

    validMail: false,
    borderMail: false,
    showReqMail: false,

    char: false,
    num: false,
    upper: false,
    border: false,
    showReq: false,

    redirectLogin: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_SUCCESS':
            return {
                ...state,
                dataUser: action.payload,
            }
        case 'ADMIN_SUCCESS':
            return {
                ...state,
                dataAdmin: action.payload,
                role: action.payload.role
            }
        case 'INPUT_SUCCESS':
            return {
                ...state,
                [action.payload.property]: action.payload.value,
            }
        case 'REDIRECT_LOGIN':
            return {
                ...state,
                redirectLogin: action.payload
            }
        case 'USER_FAIL':
            return INITIAL_STATE
        case 'ADMIN_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}