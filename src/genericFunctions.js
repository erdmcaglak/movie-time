import store from './store/index'
import {getDetail,getCredits} from '@/apis/apis'

export const _openMovieDetails = (selectedRecomendation,currentDetail)=>{
  
  store.commit('setIsOpenMovieDetail',true)
  store.commit('setWaitModalContent',true)

  const promise1 = getDetail(selectedRecomendation,currentDetail.id)
  const promise2 = getCredits(selectedRecomendation,currentDetail.id)

  Promise.all([promise1,promise2]).then((values) => {
    store.commit('setMovieDetail',values[0])
    store.commit('setSelectedMovieCredits',values[1])
    store.commit('setWaitModalContent',false)
  });
}