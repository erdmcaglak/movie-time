import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backgroundImage:'./assets/img/default-background.jpg',
    currentType:{
      title: 'TV Show',
      id: 'tv-show',
      api:'tv'
    },
    currentSearchType:{
      title: 'TV Show',
      id: 'tv-show',
      api:'tv'
    },
    isOpenMovieDetail:false,
    movieDetail:{},
    waitModalContent:true,
    selectedMovieCredits:{},
  },
  getters: {
    getBackground(state){
      return state.backgroundImage;
    },
    getCurrentType(state){
      return state.currentType
    },
    getIsOpenMovieDetail(state){
      return state.isOpenMovieDetail
    },
    getMovieDetail(state){
      return state.movieDetail;
    },
    getWaitModalContent(state){
      return state.waitModalContent;
    },
    getSelectedMovieCredits(state){
      return state.selectedMovieCredits;
    },
    getCurrentSearchType(state){
      return state.currentSearchType;
    },
  },
  mutations: {
    setBackground(state,item){
      state.backgroundImage = item;
    },
    setCurrentType(state,item){
      return state.currentType = item;
    },
    setIsOpenMovieDetail(state,item){
      return state.isOpenMovieDetail = item;
    },
    setMovieDetail(state,item){
      return state.movieDetail = item;
    },
    setWaitModalContent(state,item){
      return state.waitModalContent = item;
    },
    setSelectedMovieCredits(state,item){
      return state.selectedMovieCredits = item;
    },
    setCurrentSearchType(state,item){
      return state.currentSearchType = item;
    },
  },
  actions: {
  },
  modules: {
  }
})
