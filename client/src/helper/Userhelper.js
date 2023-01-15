import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080"

export async function loginUser({username, password}){
    try {
        const {data} = await axios.post('/api/login',{username, password})
        data.loggedIn =true;
        localStorage.setItem('usertoken', data.UserToken)
        return data;
    } catch (error) {
        return {error: "Not a valid user"}        
    }
}

export async function verifyToken(token){
    try {
        const {data} = await axios.post('/api/verifyToken',{token})
        return data;        
    } catch (error) {
        return {user:false,error: "Token Invalid"}
    }
}