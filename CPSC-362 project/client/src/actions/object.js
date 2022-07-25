import * as api from '../API'

// import your action function here

export const fetchYHFAPI = async (symbol) => {
    try {
        const { data } = await api.fetchYHFAPI(symbol)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchRecomendationData = async (symbol) => {
    try {
        const {data} = await api.fetchRecomendationData(symbol)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchTrendingUS = async () => {
    try {
        const {data} = await api.fetchTrendingUS()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchChart = async (symbol) => {
    try {
        const { data } = await api.fetchChart(symbol)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async (formData, navigate) => {
    const {data} = await api.signIn(formData)
    try {
        if(data.message)
        {
            return data.message
        }
        else
        {
            localStorage.setItem('profile', JSON.stringify({...data}))       
            navigate('/')
            return data
        }
    } catch (error) {
            console.log(error)
    }
}

export const signUp = async (formData, navigate) => {
    const {data} = await api.signUp(formData)
    try {
        if(data.message)
        {
            return data.message
        }
        else
        {
            localStorage.setItem('profile', JSON.stringify({...data}))            
            navigate('/')
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export const addToWatchList = async (data) => {
    try {
        await api.addToWatchList(data)
    } catch (error) {
        console.log(error)
    }
}

export const getWatchList = async (id) => {
    const { data } = await api.getWatchList(id)
    try {
        return data
    } catch (error) {
        console.log(error)
    }
}