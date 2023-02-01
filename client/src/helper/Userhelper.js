import axios from 'axios';
import instance from '../utils/serverConfig';

export async function loginUser({ username, password }) {
    try {
        const {data} = await instance({
            url: '/api/login',
            method: 'post',
            data: {username, password}
        })
        data.loggedIn = true;
        localStorage.setItem('usertoken', data.UserToken)
        return data;
    } catch (error) {
        console.log(error.message);
        return { error: "Not a valid user" }
    }
}

export async function verifyToken(token) {
    try {
        const {data} = await instance({
            url: '/api/verifyToken',
            method: 'post',
            data: {token}
        })
        return data;
    } catch (error) {
        return { user: false, error: "Token Invalid" }
    }
}