import axios from "axios"
import Vue from 'vue'
import { BASE_URL } from "@/configs.js";
const AXIOS = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 10000,
    headers: {
        accept: 'application/json',
        Authorization:  'Bearer ' + Vue.prototype.$accessKey
    }
});

const getTotalSearchResult = (squery,page)=>{
    return new Promise((resolve, reject)=>{
        AXIOS.get(`/search/multi?query=${squery}&include_adult=true&language=en-US&page=${page}`)
        .then(res=>{
            resolve(res.data)
        })
        .catch(reject)
    })
}

export const getSearchResult = (squery,page=1) =>{
    return new Promise((resolve, reject)=>{
        AXIOS.get(`/search/multi?query=${squery}&include_adult=true&language=en-US&page=${page}`)
        .then(res=>{
            resolve(res.data)
        })
        .catch(reject)
    })
}

export const getPopular = (reco,type) =>{
    return new Promise((resolve, reject)=>{
        AXIOS.get(`/${type}/${reco}?api_key=${Vue.prototype.$apiKey}&language=en-US`)
        .then(res=>resolve(res.data))
        .catch(reject)
    })
}

export const getDetail = (type,id) =>{
    return new Promise((resolve, reject)=>{
        AXIOS.get(`/${type}/${id}?language=en-US`)
        .then(res=>resolve(res.data))
        .catch(reject)
    })
}

export const getCredits = (type,id) =>{
    return new Promise((resolve, reject)=>{
        AXIOS.get(`/${type}/${id}/credits?language=en-US`)
        .then(res=>resolve(res.data))
        .catch(reject)
    })
}