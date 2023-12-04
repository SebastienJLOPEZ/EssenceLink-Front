import axios from 'axios'

const Axios = axios.create({
    baseURL : 'http://localhost:7115' //Need to verify if API REST adress is same in each computer
})


export default Axios
