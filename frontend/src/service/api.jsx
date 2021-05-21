import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://192.168.0.121:3333/api'
    // baseURL: 'http://192.168.35.103:3333/api'
    // baseURL: 'http://192.168.1.3:3333'
    baseURL: 'http://192.168.35.103:3333'

})

const token = localStorage.getItem('@token')

if(token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api