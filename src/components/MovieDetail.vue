<template>
  <ModalVue
        v-if="getIsOpenMovieDetail"
        :isOpen="getIsOpenMovieDetail"
        @clickEvent="closeMovieDetails"
        dropBg="rgb(12, 12, 12,.5)"
        modalBg="rgb(47, 51, 60, .5)"
        radius="10"
        closeIconColor='#fff'
        :width="{
            default:'80',
            lg:'85',
            md:'90',
            sm:'95',
            xs:'100',
        }"
        :height="{
            default:'80',
            lg:'85',
            md:'90',
            sm:'95',
            xs:'100',
        }"
        :closeIconPosition="{
            default:'15',
            lg:'15',
            md:'15',
            sm:'15',
            xs:'15',
        }"
        :closeIconSize="{
            default:'20',
            lg:'20',
            md:'20',
            sm:'20',
            xs:'20',
        }"
      >
        <div v-if="getWaitModalContent" class="modal-loading-wrapper">
          <Loading/>
        </div>
        <div v-else class="modal-content-wrapper">
          <div class="selected-movie-image">
            <img :src="getMovieImage" alt="">
          </div>
          <div class="selected-movie-infos">
            <div class="movie-vote-count">
              {{getMovieVotePercent}}/10 ({{getMovieVoteCount}})
            </div>
            <div class="selected-movie-name">
              {{getMovieName}}
              <img v-if="getMovieDetail.adult" src="@/assets/img/18Plus.svg" alt="">
            </div>
            <div class="selected-movie-overview">
              {{getMovieDetail.overview || 'No Overview'}}
            </div>
          </div>
        </div>
      </ModalVue>
</template>

<script>
import ModalVue from '@/generic-components/modal/Modal.vue'
import {mapMutations,mapGetters} from 'vuex'
import Loading from '@/generic-components/loading/Loading.vue'
import {BASE_IMAGE_URL} from '@/configs'
export default {
  methods:{
    ...mapMutations([
      'setIsOpenMovieDetail',
    ]),
    closeMovieDetails(){
      console.log(this.getMovieDetail)
      this.setIsOpenMovieDetail(false)
    },
  },
  computed:{
    ...mapGetters([
      'getIsOpenMovieDetail',
      'getWaitModalContent',
      'getMovieDetail'
    ]),
    getMovieImage(){
      return BASE_IMAGE_URL + this.getMovieDetail?.poster_path || ''
    },
    getMovieVotePercent(){
      return this.getMovieDetail?.vote_average?.toFixed(1) || '0'
    },
    getMovieVoteCount(){
      return this.getMovieDetail?.vote_count || 0
    },
    getMovieName(){
      return this.getMovieDetail.name || this.getMovieDetail.title || ''
    }
  },
  components: {
    ModalVue,
    Loading
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
@import "@/scss/colors.scss";

.modal-loading-wrapper{
  width:100%;
  height: 100%;
}
.modal-content-wrapper{
  width: 100%;
  height: 100%;
  @include d-flex(row,flex-start,stretch);
  padding: 30px;
  gap: 30px;
  .selected-movie-image{
    flex: 0 0 auto;
    @include d-flex-center;
    border-radius: 5px;
    overflow: hidden;
    img{
      height: 100%;
      object-fit: contain;
      
    }
  }
  .selected-movie-infos{
    flex: 1 0 1px;
    position: relative;
    @include d-flex(column,flex-start,stretch);
    gap: 8px;
    .selected-movie-name{
      font-size: 3.6rem;
      color: $white1;
      font-weight: 700;
      @include d-flex(row,flex-start,center);
      gap:15px;
      .movie-vote-count{
        font-size: 3rem;
        color: $white3;
        font-weight: 500;
      }
      img{
        width: 35px;
      }
    }
    .selected-movie-overview{
      font-size: 2rem;
      color: $white3;
      font-weight: 500;
    }
    .movie-vote-count{
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 1.6rem;
      color: $white3;
      font-weight: 400;
    }
  }
}
</style>