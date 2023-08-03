<template>
  <div class="search-wrapper">
    <div class="type-selectbox-wrapper">
      <div @click="openOptions" class="type-selectbox">
        <span style="position:relative;z-index:1"> {{getCurrentType.title}}</span>
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
          :class="item.id ===getCurrentType.id ? 'selected-option-item search-box-option-item' : 'search-box-option-item'">
          {{item.title}}
        </div>
      </div>
    </div>
    <div class="search-input-wrapper">
      <input @input="typingInput" @focus="typingInput" :placeholder="getSearchInputPlaceHolder" class="search-input" v-model="movieSearch"
        type="text">
      <Icon icon="search.svg" :width="{
            default:'20',
            lg:'18',
            md:'16',
            sm:'14',
            xs:'12',
        }" iconColor="#636363" class="search-icon" />
    </div>
    <div v-if="isHaveResult && results.length >0" class="search-result-box-wrapper">
      <div @click="openMovieDetails(getCurrentType.api,item)" v-for="(item,i) in results" :key="'searchResultItem'+i"
        class="search-result-item">
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
</template>

<script>
  import Icon from '@/generic-components/icon/Icon.vue'
  import {mapMutations,mapGetters} from 'vuex'
  import {getSearchResult,getPopular,getDetail} from '@/apis/apis'
  import {_openMovieDetails} from '@/genericFunctions'
  import {types} from '@/enum'
  import {BASE_IMAGE_URL} from '@/configs'
  export default {
    data(){
      return{
        typeButtonArrow: 'arrow-down.svg',
        isOpenOptions: false,
        movieSearch: '',
        isHaveResult:false,
        types,
        results:[],
        timeout:undefined,
        sendedSearchQuery:''
      }
    },
    methods:{
      ...mapMutations([
        'setCurrentType'
      ]),
      chooseType(item) {
        this.setCurrentType(item)
        this.isOpenOptions = false;
      },
      getItemOverView(item){
        if(item.overview)
          return item.overview;
        
        return 'No Overview'
      },
      typingInput(){
        if(this.movieSearch?.length >=3){
          clearTimeout(this.timeout);
          this.sendedSearchQuery = this.movieSearch;
          this.timeout = setTimeout(() => {
            getSearchResult(this.getCurrentType.api,this.movieSearch).then(res=>{
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
      openMovieDetails(selectedRecomendation,currentDetail){
        _openMovieDetails(selectedRecomendation,currentDetail)
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
    },
    computed:{
      ...mapGetters([
        'getCurrentType'
      ]),
      getSearchInputPlaceHolder() {
        return 'Search ' + this.getCurrentType.title;
      },
    },
    components:{
      Icon
    },
  }
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
  @import "@/scss/colors.scss";
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

    .search-result-box-wrapper {
      position: absolute;
      width: 100%;
      top: 105%;
      left: 0;
      @include d-flex(column, flex-start, stretch);
      background-color: $dark3;
      border-radius: 6px;
      gap: 6px;
      padding: 10px;
      z-index: 8;

      .search-result-item {
        padding: 4px;
        border-radius: 6px;
        @include d-flex(row, flex-start, stretch);
        background-color: $dark4;
        color: $white2;
        gap: 4px;
        transition: all .15s ease;

        &:hover {
          background-color: $gray2;
        }

        cursor: pointer;

        .search-result-item-image {
          width: 75px;
          object-fit: contain;
          border-radius: 4px;
          flex: 0 0 auto;
          user-select: none;
        }

        .search-result-item-info-wrapper {
          @include d-flex(column, flex-start, space-between);
          flex: 1 0 1px;
          padding: 4px 8px;

          .search-result-item-name-and-date {
            width: 100%;
            @include d-flex(row, space-between, center);

            .search-result-item-name {
              font-size: 1.8rem;
              color: $white3;
            }

            .search-result-item-date {
              color: $gray5;
              font-size: 1.3rem;
            }
          }

          .search-result-item-overview {
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

      .search-result-box-see-more {
        font-size: 1.6rem;
        text-align: center;
        width: 100%;
        padding: 6px;
        user-select: none;
        cursor: pointer;
        transition: all .15s linear;
        border-radius: 6px;

        &:hover {
          background-color: $gray2;
        }
      }
    }
  }
</style>