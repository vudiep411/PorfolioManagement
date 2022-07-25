import axios from 'axios'

const APIkey = ''
const config = {
    headers: {
        'x-api-key': APIkey
    }
}

export const fetchYHFAPI = (symbol) => axios.get(`https://yfapi.net/v7/finance/options/${symbol}`, config)
export const fetchRecomendationData = (symbol) => axios.get(`https://yfapi.net/ws/insights/v1/finance/insights?symbol=${symbol}`, config)
export const fetchTrendingUS = () => axios.get('https://yfapi.net/v1/finance/trending/US', config)
export const fetchChart = (symbol) => axios.get(`https://yfapi.net/v8/finance/chart/${symbol}?range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit`, config)


const API = axios.create({ baseURL: 'http://localhost:5000'})
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile'))
    {
        const obj = JSON.parse(localStorage.getItem('profile'))
        req.headers.Authorization = `${obj.token}`
    }

    return req
})

export const signIn = (formData) => API.post(`/user/signin`, formData)
export const signUp = (formData) => API.post(`/user/signup`, formData)
export const addToWatchList = (data) => API.patch(`/user/add`, data)
export const getWatchList = (id) => API.get(`/user/getWatchList/${id}`)
