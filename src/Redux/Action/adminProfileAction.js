import Axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../Helpers";


export const getAdminProfile = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('token');
            if (token) {
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                const res = await Axios.get(API_URL + `users/getProfileAdmin`, headers)
                dispatch({ type: 'DATA_PROFILEADMIN_SUCCESS', payload: res.data })
            }
        } catch (err) {
            dispatch({ type: 'DATA_PROFILEADMIN_FAIL' })
        }
    }
}

export const getAdminProfileByUser = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('token');
            if (token) {
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                const res = await Axios.get(API_URL + `users/getProfileAdminByUser`, headers)
                dispatch({ type: 'DATA_PROFILEADMIN_BYUSER_SUCCESS', payload: res.data })
            }
        } catch (err) {
            // console.log(err)
            // dispatch({ type: 'DATA_PROFILEADMIN_FAIL' })
        }
    }
}

export const addAdminProfile = (dataProfileAdmin, imageprofile) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('token');
            if (token) {
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                let formData = new FormData();
                formData.append('dataProfileAdmin', JSON.stringify(dataProfileAdmin))
                formData.append('imageprofile', (imageprofile))
                if (imageprofile) {
                    if (dataProfileAdmin) {
                        await Axios.post(API_URL + `users/addProfileAdmin`, formData, headers)
                        const res = await Axios.get(API_URL + `users/getProfileAdmin`, headers)
                        dispatch({ type: 'DATA_PROFILEADMIN_SUCCESS', payload: res.data })
                        const res1 = await Axios.get(API_URL + `users/getProfileAdminByUser`, headers)
                        dispatch({ type: 'DATA_PROFILEADMIN_BYUSER_SUCCESS', payload: res1.data })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Your input is invalid!',
                            position: 'top-end',
                            timer: '1000',
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Your input is invalid!',
                        position: 'top-end',
                        timer: '1000',
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const editAdminProfile = (dataProfileAdmin, imageprofile) => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('token');
            if (token) {
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                let formData = new FormData();
                formData.append('dataProfileAdmin', JSON.stringify(dataProfileAdmin))
                formData.append('imageprofile', (imageprofile))

                await Axios.patch(API_URL + `users/editProfileAdmin`, formData, headers)
                const res = await Axios.get(API_URL + `users/getProfileAdmin`, headers)
                dispatch({ type: 'DATA_PROFILEADMIN_SUCCESS', payload: res.data })
                const res1 = await Axios.get(API_URL + `users/getProfileAdminByUser`, headers)
                dispatch({ type: 'DATA_PROFILEADMIN_BYUSER_SUCCESS', payload: res1.data })
            }
        } catch (err) {
            console.log(err)
        }
    }
}