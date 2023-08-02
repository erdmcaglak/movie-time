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

export const getSearchResult = (type,squery) =>{
    return new Promise((resolve, reject)=>{
        AXIOS.get(`/search/${type}?api_key=${Vue.prototype.$apiKey}&language=en-US&query=${squery}`)
        .then(res=>resolve(res.data))
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