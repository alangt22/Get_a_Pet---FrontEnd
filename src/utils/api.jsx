import axios from 'axios'

export default axios.create({
    baseURL: 'https://getapet-backend-production.up.railway.app/'
})