import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"

export async function addDepartment({department}){
    try {
        const {data} = await axios.post('/api/addDepartment',{department})
        return data       
    } catch (error) {
        return {error: "Not Added"}        
    }
}

export async function getAllDepartments(){
    try {
        const {data} = await axios.get('/api/getAllDepartments')        
        return data       
    } catch (error) {
        console.log("Server Error");        
    }
}