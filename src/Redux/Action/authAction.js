import Axios from 'axios';
import { API_URL } from '../../Helpers';
import Swal from 'sweetalert2';
import $ from 'jquery';


export const onInputUser = (property, value) => {
    return {
        type: 'INPUT_SUCCESS',
        payload: { property, value }
    }
}

export const userRegister = (dataRegister, dataBorder, reset) => {
    return async (dispatch) => {
        let border = dataBorder.border;
        let borderMail = dataBorder.borderMail;
        try {
            if (!border || !borderMail) {
                Swal.fire({
                    icon: 'error',
                    position: 'top-end',
                    title: 'Bad password',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            } else {
                await Axios.post(API_URL + `users/register`, dataRegister)
                Swal.fire({
                    icon: 'success',
                    position: 'center',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
                dispatch({ type: 'USER_FAIL' })
                $(reset)[0].reset();
                dispatch({ type: 'REDIRECT_LOGIN', payload: true })
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                position: 'top-end',
                title: err.response.data,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    }
}

export const userLogin = (dataLogin) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(API_URL + `users/login`, dataLogin)
            if (res.data.role === 'user') {
                Swal.fire({
                    icon: 'success',
                    position: 'center',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
                dispatch({ type: 'USER_SUCCESS', payload: res.data })
                localStorage.setItem('token', res.data.token)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'User not find!',
                    position: 'center',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                position: 'top-end',
                title: err.response.data,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    }
}

export const adminLogin = (dataLogin) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(API_URL + `users/login`, dataLogin)
            if (res.data.role === 'admin') {
                Swal.fire({
                    icon: 'success',
                    position: 'center',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
                dispatch({ type: 'ADMIN_SUCCESS', payload: res.data })
                localStorage.setItem('token', res.data.token)
                window.location.reload()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'User not find!',
                    position: 'center',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })  
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                position: 'top-end',
                title: err.response.data,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    }
}

export const keepLogin = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const res = await Axios.post(API_URL + `users/keepLogin`, {}, headers)
            dispatch({ type: 'USER_SUCCESS', payload: res.data })
        } catch (err) {
            dispatch({ type: 'USER_FAIL' })
        }
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem('token');
            dispatch({ type: 'USER_FAIL' });
            Swal.fire({
                title: 'Thank you',
                position: 'center',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const resendEmail = () => {
    return async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                await Axios.post(API_URL + `users/resendEmail`, {}, headers)
            }
        } catch (err) {
            // console.log(err)
        }
    }
}

export const emailVerification = (token) => {
    return async () => {
        try {
            if (token) {
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                await Axios.patch(API_URL + `users/emailVerification`, {}, headers)
            }
        } catch (err) {
            // console.log(err)
        }
    }
}

export const changePassword = (dataChangePassword, dataBorder) => {
    let border = dataBorder.border
    return async (dispatch) => {
        try {
            if (!border) {

                Swal.fire({
                    icon: 'error',
                    position: 'top-end',
                    title: 'Bad password',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            } else {
                const token = localStorage.getItem('token');
                if (token) {
                    const headers = {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                    await Axios.patch(API_URL + `users/changePassword`, dataChangePassword, headers)
                }
                Swal.fire({
                    icon: 'success',
                    position: 'center',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
                dispatch({ type: 'REDIRECT_LOGIN', payload: true })
                setTimeout(() => {
                    dispatch({ type: 'REDIRECT_LOGIN', payload: false })
                }, 1000);
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                position: 'top-end',
                title: err.response.data,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    }
}