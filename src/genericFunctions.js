import store from './store/index'
import {getDetail} from '@/apis/apis'

export const _openMovieDetails = (selectedRecomendation,currentDetail)=>{
  store.commit('setIsOpenMovieDetail',true)
  store.commit('setWaitModalContent',true)
  getDetail(selectedRecomendation,currentDetail.id).then(res=>{
    store.commit('setMovieDetail',res)
    store.commit('setWaitModalContent',false)
  })
}