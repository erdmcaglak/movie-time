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
          <div class="modal-content-scroll">
            <div class="selected-movie-image">
            <img :src="getMovieImage" alt="">
          </div>
          <div class="selected-movie-infos">
            <div class="info-wrapper">
              <div class="selected-movie-name">
                <div class="movie-name">
                  {{getMovieName}}
                </div>
                
                <div class="movie-vote-count">
                  {{getMovieVotePercent}}/10 ({{getMovieVoteCount}})
                </div>
              </div>
              <div class="selected-movie-genres">
                <div>
                  {{getGenres}}
                </div>
                <span>({{getReleaseDate}})</span>
              </div>
              <div v-if="getEpisodeCount" class="selected-movie-episode">
                {{getEpisodeCount}}
              </div>
              <div class="selected-movie-overview">
                {{getMovieDetail.overview || 'No Overview'}}
              </div>
              <div v-if="getMovieDetail.networks" class="selected-movie-networks">
                <img v-for="(item,i) in getMovieDetail.networks" :key="'networks'+i" :src="getNetworkImage(item)" alt="">
              </div>
              <template v-if="getSelectedMovieCredits.cast.length>0">
                <br>
                <hr>
                <br>
                <h3 class="movie-credit-header">Cast</h3>
                <div class="selected-movie-credits">
                  <div v-for="(item,i) in getSelectedMovieCredits.cast" :key="'cast'+i" class="selected-movie-cast">
                    <div class="cast-image-wrapper">
                      <img :src="getCastImage(item)" alt="">
                    </div>
                    <div class="cast-info-wrapper">
                      <div class="original-name">
                        {{item.original_name}}
                      </div>
                      <div class="character-name">
                        {{item.character}}
                      </div>
                    </div>
                    
                  </div>
                </div>
              </template>
            </div>
            <div class="go-movie-page">
              <a target="_blank" :href="getMovieDetail.homepage">Go To Home Page</a>
            </div>
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
  data(){
    return{
      movieDetailPicture: 'poster_path'
    }
  },
  methods:{
    ...mapMutations([
      'setIsOpenMovieDetail',
    ]),
    closeMovieDetails(){
      this.setIsOpenMovieDetail(false)
    },
    getCastImage(item){
      let profilePath = item.profile_path || ''
      return BASE_IMAGE_URL + profilePath;
    },
    getNetworkImage(item){
      let networkImage = item.logo_path || ''
      return BASE_IMAGE_URL + networkImage;
    }
  },
  computed:{
    ...mapGetters([
      'getIsOpenMovieDetail',
      'getWaitModalContent',
      'getSelectedMovieCredits',
      'getMovieDetail'
    ]),
    getMovieImage(){
      let posterPath = this.getMovieDetail?.poster_path || '';
      return BASE_IMAGE_URL + posterPath;
    },
    getReleaseDate(){
      return this.getMovieDetail?.first_air_date || this.getMovieDetail?.release_date || ''
    },
    getMovieVotePercent(){
      return this.getMovieDetail?.vote_average?.toFixed(1) || '0'
    },
    getMovieVoteCount(){
      return this.getMovieDetail?.vote_count || 0
    },
    getMovieName(){
      return this.getMovieDetail?.name || this.getMovieDetail?.title || ''
    },
    getEpisodeCount(){
      if(this.getMovieDetail?.number_of_episodes){
        return this.getMovieDetail?.number_of_episodes + ' Episodes'
      }
      else if(this.getMovieDetail?.runtime){
        return this.getMovieDetail?.runtime + ' Minutes'
      }
      return ''
    },
    getGenres(){
      let totalGenre = '';
      this.getMovieDetail?.genres?.forEach((item,i) => {
        totalGenre += item.name;
        if(i !== this.getMovieDetail?.genres?.length-1){
          totalGenre += ' / '
        }
      });
      return totalGenre;
    }
  },
  mounted(){
    window.addEventListener('resize',function(){
      
    })
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
  @media only screen and (max-width:1024px) {
    padding: 5px;
  }
  .modal-content-scroll{
    @include d-flex(row,flex-start,stretch);
    width: 100%;
    height: 100%;
    @media only screen and (max-width:1024px) {
      @include d-flex(column,flex-start,stretch);
      overflow: auto;
    }
    .selected-movie-image{
      flex: 0 0 auto;
      @include d-flex-center;
      border-radius: 5px;
      overflow: hidden;
      img{
        height: 100%;
        object-fit: contain;
        @media only screen and (max-width:480px) {
          height: unset;
          width: 95%;
        }
      }
    }
    .selected-movie-infos{
      flex: 1 0 1px;
      position: relative;
      @include d-flex(column,flex-start,stretch);
      gap: 12px;
      @media only screen and (max-width:1024px) {
        display: block;
        margin-top: 30px;
      }
      .info-wrapper{
        @include d-flex(column,flex-start,stretch);
        gap: 12px;
        overflow: auto;
        padding: 0 15px;
        flex: 1 0 1px;
        /* width */
        &::-webkit-scrollbar {
          width: 5px;
          border-radius: 999px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
          background: $white3;
          cursor: pointer;
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
          background: #b3b3b3;
        }
        .selected-movie-name{
          color: $white1;
          font-weight: 700;
          @include d-flex(row,space-between,flex-start);
          gap:15px;
          position: relative;
          @media only screen and (max-width:480px) {
            @include d-flex(column,flex-start,flex-start);
          }
          .movie-name{
            font-size: 3.6rem;
            max-width: 80%;
            @supports (-webkit-line-clamp: 2){
              overflow: hidden !important;
              text-overflow: ellipsis !important;
              white-space: initial !important;
              display: -webkit-box !important;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            white-space: nowrap;
            text-overflow: ellipsis !important;
            @media only screen and (max-width:480px) {
              max-width: 100%;
            }
          }
          .movie-vote-count{
            white-space: nowrap;
            font-size: 1.6rem;
            color: $pink1;
            font-weight: 400;
          }
        }
        .selected-movie-networks{
          display: grid;
          grid-template-columns: repeat( auto-fit, minmax(150px, 1fr));
          align-items: center;
          gap: 16px;
          margin-top: 16px;
          img{
            max-width: 100px;
          }
        }
        .selected-movie-overview{
          font-size: 2rem;
          color: $white2;
          font-weight: 500;
        }
        
        .selected-movie-genres{
          @include d-flex(row,flex-start,center);
          gap: 16px;
          font-weight: 500;
          div{
            font-size: 2rem;
            color: $yellow1;
          }
          span{
            font-size: 1.8rem;
            color: $white2;
          }
          @media only screen and (max-width:1440px){
            @include d-flex(column,flex-start,flex-start);
            gap: 1px;
            div{
              @supports (-webkit-line-clamp: 2){
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                white-space: initial !important;
                display: -webkit-box !important;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
        .selected-movie-episode{
          font-size: 1.8rem;
          color: $pink1;
        }
        .movie-credit-header{
          font-size: 3rem;
        }
        .selected-movie-credits{
          display: grid;
          grid-template-columns: repeat( auto-fit, minmax(200px, 1fr));
          gap: 16px;
          .selected-movie-cast{
            @include d-flex(row,flex-start,center);
            gap: 12px;
            padding: 10px;
            border: 1px solid $white3;
            border-radius: 8px;
            .cast-image-wrapper{
              overflow: hidden;
              width: 50px;
              min-height: 75px;
              border-radius: 4px;
              user-select: none;
              pointer-events: none;
              @include d-flex-center;
              img{
                width: 100%;
                object-fit: cover;
              }
            }
            .cast-info-wrapper{
              @include d-flex(column,flex-start,flex-start);
              color: $white1;
              gap: 4px;
              .original-name{
                font-size: 1.6rem;
                color: $pink1;
                font-weight: 700;
              }
              .character-name{
                font-size: 1.4rem;
              }
            }
          }
        }
      }
      
      .go-movie-page{
        @include d-flex(row,flex-end,center);
        margin-top: 10px;
        a{
          padding: 10px 20px;
          border: 1px solid $yellow1;
          color: $yellow1;
          font-size: 2.4rem;
          border-radius: 4px;
          transition: all .2s linear;
          @include d-flex-center;
          @media (hover: hover) {
            &:hover{
              background-color: $yellow2;
              color: $white1;
            }
          }
          
          @media only screen and (max-width:480px) {
            width: 100%;
          }
        }
      }
    }
  }
  
}
</style>