import axios from 'axios'

export default axios.create({
    baseURL: ' http://localhost:8000/',timeout: 10000,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept',
    }
})