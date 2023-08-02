<template>
  <div class="home-page container">
    <div class="page-header-wrapper">
      <h2 class="page-title">Movie Time - Search Movie or TV Shows</h2>
      <p class="page-sub-text">This site will give you all the information about the movie or TV series you are looking
        for.</p>
      <div class="search-wrapper">
        <div class="type-selectbox-wrapper">
          <div @click="openOptions" class="type-selectbox">
            <span style="position:relative;z-index:1"> {{currentType.title}}</span>
            <Icon :icon="typeButtonArrow" :width="{
                  default:'10',
                  lg:'10',
                  md:'10',
                  sm:'8',
                  xs:'8',
              }" pointer iconColor="#F1F2EB" class="search-icon" />
          </div>
          <div v-if="isOpenOptions" class="search-box-options">
            <div @click="chooseType(item)" v-for="(item,i) in types" :key="'optionItem'+i"
              :class="item.id ===currentType.id ? 'selected-option-item search-box-option-item' : 'search-box-option-item'">
              {{item.title}}
            </div>
          </div>
        </div>
        <div class="search-input-wrapper">
          <input @input="typingInput" :placeholder="getSearchInputPlaceHolder" class="search-input" v-model="movieSearch" type="text">
          <Icon icon="search.svg" :width="{
                default:'20',
                lg:'18',
                md:'16',
                sm:'14',
                xs:'12',
            }" iconColor="#636363" class="search-icon" />
        </div>
        <div v-if="isHaveResult" class="search-result-box-wrapper">
          <div @click="openMovieDetails(currentType.api,item)" v-for="(item,i) in results" :key="'searchResultItem'+i" class="search-result-item">
            <img class="search-result-item-image" :src="item.poster_path" :alt="item.name">
            <div class="search-result-item-info-wrapper">
              <div class="search-result-item-name-and-date">
                <div class="search-result-item-name">
                  {{item.name}}
                </div>
                <div class="search-result-item-date">
                  {{item.first_air_date}}
                </div>
              </div>
              <div class="search-result-item-overview">
                {{getItemOverView(item)}}
              </div>
            </div>
          </div>
          <div class="search-result-box-see-more">
            See more
          </div>
        </div>
      </div>
    </div>
    <div class="recomendations">
      <div class="recomendations-header">
          <div class="recomendations-types">
            <div class="recomendation-header-item-wrapper">
              <div @click="selectRecomendation(item)" v-for="(item,i) in recomendations" :key="'recomendationItem'+i" :class="selectedRecomendation.value === item.value ? 'recomendation-header-item-selected ' : 'recomendation-header-item'">
                {{item.title}}
              </div>
            </div>
            <div class="recomendations-type-wrapper">
              <div @click="changeRecoType(item)" v-for="(item,i) in types" :key="'recoType'+i" :class="(selectedRecoType.id ===item.id ? 'recomendations-type-item-selected ' + item.id :'recomendations-type-item ' +item.id)">
                {{item.title}}
              </div>
            </div>
          </div>
          <div class="filter-wrapper">
            <Icon icon="filter.svg" :width="{
                  default:'20',
                  lg:'18',
                  md:'16',
                  sm:'14',
                  xs:'12',
              }" pointer iconColor="#636363" class="search-icon" />
          </div>
      </div>
      <div class="reco-carousel">
        <div v-for="(item,i) in popularItems" @click="openMovieDetails(selectedRecomendation.api,item)" :key="'recoItem'+i" class="reco-item-wrapper">
          <div class="reco-item">
            <img class="reco-item-image" :src="item.backdrop_path" alt="">
            <div class="reco-item-name">
              {{item.name || item.title}}
            </div>
            <div class="reco-item-info-wrapper">
              <div v-for="(info,i) in recoItemInfos" :key="'recoItem'+i" class="reco-item-info">
                {{info.title}} : {{item[info.value] || item[info._value]}}<span class="vote-max" v-if="info.title === 'Vote'">/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalVue
        v-if="isOpen"
        :isOpen="isOpen"
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
            xs:'10',
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
            lg:'13',
            md:'11',
            sm:'9',
            xs:'8',
        }"
        :closeIconSize="{
            default:'20',
            lg:'18',
            md:'16',
            sm:'14',
            xs:'12',
        }"
      >
        <div>
          selam
        </div>
      </ModalVue>
  </div>
</template>

<script>
  import Icon from '@/generic-components/icon/Icon.vue'
  import {getSearchResult,getPopular,getDetail} from '@/apis/apis'
  import {BASE_IMAGE_URL} from '@/configs'
  import ModalVue from '@/generic-components/modal/Modal.vue'
  export default {
    data() {
      return {
        isOpen:false,
        recoItemInfos:[
          {
            title:'Air Date',
            value:'first_air_date',
            _value:'release_date'
          },
          {
            title:'Popularity',
            value:'popularity'
          },
          {
            title:'Vote',
            value:'vote_average'
          },
          {
            title:'Vote Count',
            value:'vote_count'
          },
        ],
        popularItems:[],
        selectedRecoType:{
          title: 'TV Show',
          id: 'tv-show',
          api:'tv'
        },
        selectedRecomendation:{
          title:'Popular',
          value:'popular',
          api:'popular',
          type:'all'
        },
        recomendations:[
          {
            title:'Popular',
            value:'popular',
            api:'popular',
            type:'all'
          },
          {
            title:'Top Rated',
            value:'topRated',
            api:'top_rated',
            type:'all'
          },  
          {
            title:'Upcoming',
            value:'upcoming',
            api:'upcoming',
            type:'movie'
          },
        ],
        isHaveResult:false,
        results:[],
        sendedSearchQuery:'',
        timeout:undefined,
        movieSearch: '',
        currentType: {
          title: 'TV Show',
          id: 'tv-show',
          api:'tv'
        },
        typeButtonArrow: 'arrow-down.svg',
        isOpenOptions: false,
        types: [{
            title: 'TV Show',
            id: 'tv-show',
            api:'tv'
          },
          {
            title: 'Movie',
            id: 'movie',
            api:'movie'
          }
        ],
        currentDetail:{},
      }
    },
    methods: {
      openMovieDetails(selectedRecomendation,currentDetail){
        this.currentDetail = currentDetail;
        this.isOpen = true;
        getDetail(selectedRecomendation,currentDetail.id).then(res=>{
          console.log({res})
        })
      },
      closeMovieDetails(){
        this.isOpen = false;
      },
      requestReco(reco,type){
        getPopular(reco.api,type.api).then(res=>{
          this.popularItems = Array.from(res.results).filter(e=>e.backdrop_path).slice(0,12);
          for(let item of this.popularItems){
            item.backdrop_path = BASE_IMAGE_URL + item.backdrop_path
          }
          console.log({i:this.popularItems})
        })
      },
      changeRecoType(item){
        this.selectedRecoType = item;
        if(item.id === 'tv-show' && this.selectedRecomendation.value === 'upcoming'){
          
          this.selectedRecomendation = this.recomendations.find(e=>e.value === 'topRated');
        }
        this.requestReco(this.selectedRecomendation,this.selectedRecoType)
      },
      selectRecomendation(item){
        this.selectedRecomendation = item;
        if(item.value === 'upcoming'){
          this.selectedRecoType = this.types.find(e=>e.id === 'movie');
        }
        this.requestReco(this.selectedRecomendation,this.selectedRecoType)
      },
      typingInput(){
        if(this.movieSearch?.length >=3 && this.sendedSearchQuery !== this.movieSearch){
          clearTimeout(this.timeout);
          this.sendedSearchQuery = this.movieSearch;
          this.timeout = setTimeout(() => {
            getSearchResult(this.currentType.api,this.movieSearch).then(res=>{
              this.isHaveResult = true;
              this.listenClick();
              this.results = Array.from(res.results).filter(e=>e.poster_path).slice(0,3);
              for(let item of this.results){
                item.poster_path = BASE_IMAGE_URL + item.poster_path
              }
            })
          },300);
        }
        else{
          window.removeEventListener('click', this.checkClick)
          this.isHaveResult = false;
        }
        
      },
      openOptions() {
        this.listenClick();
        this.isOpenOptions = !this.isOpenOptions;
        if(this.isOpenOptions){
          this.typeButtonArrow = 'arrow-up.svg'
        }
        else{
          this.typeButtonArrow = 'arrow-down.svg'
        }
      },
      checkClick(e) {
        if (e.target !== document.querySelector('.search-box-options') && e.target.offsetParent !== document.querySelector('.type-selectbox') && e.target !== document.querySelector('.type-selectbox') && this.isOpenOptions) {
          this.isOpenOptions = false;
          this.typeButtonArrow = 'arrow-down.svg'
          window.removeEventListener('click', this.checkClick)
        }
        if(e.target !== document.querySelector('.search-result-box-wrapper') && e.target.offsetParent !== document.querySelector('.search-wrapper') && this.isHaveResult){
          this.isHaveResult = false;
          window.removeEventListener('click', this.checkClick)
        }
      },
      listenClick() {
        window.removeEventListener('click', this.checkClick)
        setTimeout(() => {
          window.addEventListener('click', this.checkClick)
        }, 100);
      },
      chooseType(item) {
        this.currentType = item;
        this.isOpenOptions = false;
      },
      getItemOverView(item){
        if(item.overview)
          return item.overview;
        
        return 'No Overview'
      }
    },
    computed: {
      getSearchInputPlaceHolder() {
        return 'Search ' + this.currentType.title;
      },
    },
    mounted() {
      this.requestReco(this.selectedRecomendation,this.selectedRecoType)
    },
    components: {
      Icon,
      ModalVue,
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/scss/mixins.scss";
  @import "@/scss/colors.scss";

  .home-page {
    height: 100%;
    @include d-flex(column, flex-start, center);

    .page-header-wrapper {
      @include d-flex(column, flex-start, center);
      padding: 20px 0;
      gap: 15px;
      max-width: 600px;

      .page-title {
        font-size: 3.5rem;
        text-align: center;
      }

      .page-sub-text {
        width: 70%;
        color: $gray3;
        font-size: 1.8rem;
        text-align: center;
        @include d-flex-center;
      }

      .search-wrapper {
        @include d-flex(row, center, stretch);
        padding: 10px;
        width: 600px;
        margin-top: 10px;
        background-color: $dark3;
        border-radius: 6px;
        position: relative;
        .type-selectbox-wrapper {
          user-select: none;
          background-size: 100% 90px;
          position: relative;
          @include d-flex-center;

          .type-selectbox {
            cursor: pointer;
            padding: 10px 8px;
            position: relative;
            z-index: 1;
            width: 100%;
            height: 100%;
            @include d-flex-center;
            border-radius: 6px;
            gap: 4px;
            font-size: 1.5rem;
            color: $white1;
            transition: all 0.25s linear;
            background: linear-gradient(145deg, rgba(202, 83, 222, 1) 0%, rgba(254, 0, 82, 1) 93%);

            &::before {
              position: absolute;
              content: "";
              inset: 0;
              /* same as { top: 0; right: 0; bottom: 0; left: 0; } */
              background-image: linear-gradient(290deg, rgba(202, 83, 222, 1) 0%, rgba(254, 0, 82, 1) 93%);
              opacity: 0;
              z-index: 0;
              transition: opacity 0.25s linear;
              border-radius: 6px;
            }

            &:hover {
              &::before {
                opacity: 1;
              }
            }
          }
          .search-box-options {
            @include d-flex(column, flex-start, stretch);
            position: absolute;
            width: 100%;
            left: 50%;
            transform: translate(-50%, 0);
            top: 105%;
            background-color: $white2;
            border-radius: 6px;
            cursor: pointer;
            z-index: 9;
            .selected-option-item {
              background-color: $yellow1;
            }

            .search-box-option-item {
              color: $dark2;
              font-size: 1.3rem;
              padding: 8px 4px;
              transition: all .15s linear;
              font-weight: 500;

              &:first-child {
                border-radius: 6px 6px 0 0;
              }

              &:last-child {
                border-radius: 0 0 6px 6px;
              }

              &:hover {
                background-color: $yellow1;
              }
            }
          }
        }
        .search-input-wrapper {
          flex: 1 0 1px;
          @include d-flex-center;

          .search-input {
            width: 100%;
            background: none;
            outline: none;
            border: none;
            font-size: 1.5rem;
            padding: 4px 12px;
            color: $gray5;

            &::placeholder {
              color: $gray4;
            }
          }

          .search-icon {
            margin-right: 12px;
          }
        }
        .search-result-box-wrapper{
          position: absolute;
          width: 100%;
          top: 105%;
          left: 0;
          @include d-flex(column,flex-start,stretch);
          background-color: $dark3;
          border-radius: 6px;
          gap: 6px;
          padding: 10px;
          z-index: 8;
          .search-result-item{
            padding: 4px;
            border-radius: 6px;
            @include d-flex(row,flex-start,stretch);
            background-color: $dark4;
            color: $white2;
            gap: 4px;
            transition: all .15s ease;
            &:hover{
              background-color: $gray2;
            }
            cursor: pointer;
            .search-result-item-image{
              width: 75px;
              object-fit: contain;
              border-radius: 4px;
              flex: 0 0 auto;
              user-select: none;
            }
            .search-result-item-info-wrapper{
              @include d-flex(column,flex-start,space-between);
              flex: 1 0 1px;
              padding: 4px 8px;
              .search-result-item-name-and-date{
                width: 100%;
                @include d-flex(row,space-between,center);
                .search-result-item-name{
                  font-size: 1.8rem;
                  color: $white3;
                }
                .search-result-item-date{
                  color: $gray5;
                  font-size: 1.3rem;
                }
              }
              
              .search-result-item-overview{
                flex: 1 0 1px;
                color: $gray4;
                font-size: 1.6rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                height: 50px;
                max-height: 50px;
                @supports (-webkit-line-clamp: 2) {
                  overflow: hidden !important;
                  text-overflow: ellipsis !important;
                  white-space: initial !important;
                  display: -webkit-box !important;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                @media (min-width: 1025px) and (max-width: 1440px) {
                  height: 40px;
                  max-height: 40px;
                }

                @media (min-width: 769px) and (max-width: 1024px) {
                  height: 36px;
                  max-height: 36px;
                }

                @media (min-width: 481px) and (max-width: 768px) {
                  height: 32px;
                  max-height: 32px;
                }

                @media (max-width: 480px) {
                  height: 27px;
                  max-height: 27px;
                }
              }
            }
          }
          .search-result-box-see-more{
            font-size: 1.6rem;
            text-align: center;
            width: 100%;
            padding: 6px;
            user-select: none;
            cursor: pointer;
            transition: all .15s linear;
            border-radius: 6px;
            &:hover{
              background-color: $gray2;
            }
          }
        }
      }
    }
    .recomendations{
        @include d-flex(column,flex-start,stretch);
        width: 100%;
        margin-top: 30px;
        .recomendations-header{
          width: 100%;
          @include d-flex(row,space-between,center);
          .recomendations-types{
            @include d-flex(row,flex-start,center);
            .recomendation-header-item-wrapper{
              @include d-flex(row,flex-start,center);
              gap: 20px;
              border-right: 1px solid $gray4;
              padding: 0 20px;
              .recomendation-header-item{
                font-size: 1.8rem;
                color: $white3;
                user-select: none;
                cursor: pointer;
                transition: all .15s linear;
                position: relative;
                &:hover{
                  color: $pink1;
                }
              }
              .recomendation-header-item-selected{
                @extend .recomendation-header-item;
                color: $pink1;
              }
            }
            .recomendations-type-wrapper{
              @include d-flex(row,flex-start,center);
              gap: 20px;
              padding: 0 20px;
              .recomendations-type-item{
                font-size: 1.8rem;
                color: $white3;
                user-select: none;
                cursor: pointer;
                transition: all .15s linear;
                position: relative;
                &::after{
                  transition: all .15s linear;
                  content: "";
                  position: absolute;
                  left: 50%;
                  bottom: 0;
                  transform: translate(-50%,0);
                  height: 2px;
                  width: 0;
                  background-color: $white1;
                }
                &:hover{
                  &::after{
                    width: 100%;
                  }
                }
              }
              .recomendations-type-item-selected{
                @extend .recomendations-type-item;
                &::after{
                  width: 100%;
                }
              }
              .tv-show{
                color: $red2;
              }
              .movie{
                color: $blue1;
              }
            }
            
          }
          .filter-wrapper{
            cursor: pointer;
          }
        }
        .reco-carousel{
          margin-top: 20px;
          @include d-flex(row,flex-start,center);
          flex-wrap: wrap;
          .reco-item-wrapper{
            width: calc(100%/6);
            padding: 10px 10px;
            .reco-item{
              background-color: $dark4;
              @include d-flex(column,flex-start,stretch);
              border-radius: 6px;
              padding: 6px;
              width: 100%;
              height: 100%;
              cursor: pointer;
              transition: all .1s linear;
              &:hover{
                transform:scale(1.1);
              }
              .reco-item-image{
                border-radius: 6px;
                user-select: none;
                pointer-events: none;
              }
              .reco-item-name{
                color: $white1;
                font-size: 1.6rem;
                padding: 4px 0;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              .reco-item-info-wrapper{
                @include d-flex(column,flex-start,flex-start);
                font-size: 1.3rem;
                .reco-item-info{
                  color: $gray6;
                  .vote-max{
                    color: $gray6!important;
                  }
                }
              }
            }
          }
        }
        .reco-next-button{
          background-color: transparent;
          position: relative;
          width: 20px;
          height: 30px;
          &:after{
            content: "";
            width: 100%;
            height: 2px;
            background-color: $white1;
            border-radius: 99px;
            top: 25%;
            right: 0;
            transform: rotate(45deg);
          }
          
        }
      }
  }
</style>