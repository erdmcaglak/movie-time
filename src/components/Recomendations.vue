<template>
  <div class="recomendations">
    <div class="recomendations-header">
      <div class="recomendations-types">
        <div class="recomendation-header-item-wrapper">
          <div @click="selectRecomendation(item)" v-for="(item,i) in recomendations" :key="'recomendationItem'+i"
            :class="selectedRecomendation.value === item.value ? 'recomendation-header-item-selected ' : 'recomendation-header-item'">
            {{item.title}}
          </div>
        </div>
        <div class="recomendations-type-wrapper">
          <div @click="changeRecoType(item)" v-for="(item,i) in types" :key="'recoType'+i"
            :class="(getCurrentType.id ===item.id ? 'recomendations-type-item-selected ' + item.id :'recomendations-type-item ' +item.id)">
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
      <div v-for="(item,i) in popularItems" @click="openMovieDetails(getCurrentType.api,item)" :key="'recoItem'+i"
        class="reco-item-wrapper">
        <div class="reco-item">
          <img class="reco-item-image" :src="item.backdrop_path" alt="">
          <div class="reco-item-name">
            {{item.name || item.title}}
          </div>
          <div class="reco-item-info-wrapper">
            <div v-for="(info,i) in recoItemInfos" :key="'recoItem'+i" class="reco-item-info">
              {{info.title}} : {{item[info.value] || item[info._value]}}<span class="vote-max"
                v-if="info.title === 'Vote'">/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getPopular,getDetail} from '@/apis/apis'
import {recomendations,types,recoItemInfos} from '@/enum'
import {_openMovieDetails} from '@/genericFunctions'
import {BASE_IMAGE_URL} from '@/configs'
import {mapMutations,mapGetters} from 'vuex'
import Icon from '@/generic-components/icon/Icon.vue'
  export default {
    data(){
      return{
        recomendations,
        types,
        recoItemInfos,
        selectedRecomendation:{
          title:'Popular',
          value:'popular',
          api:'popular',
          type:'all'
        },
        popularItems:[],
      }
    },
    methods:{
      ...mapMutations([
        'setCurrentType',
        'setIsOpenMovieDetail'
      ]),
      openMovieDetails(selectedRecomendation,currentDetail){
        _openMovieDetails(selectedRecomendation,currentDetail)
      },
      changeRecoType(item){
        this.setCurrentType(item)
        if(item.id === 'tv-show' && this.selectedRecomendation.value === 'upcoming'){
          
          this.selectedRecomendation = this.recomendations.find(e=>e.value === 'topRated');
        }
        this.requestReco(this.selectedRecomendation,this.getCurrentType)
      },
      selectRecomendation(item){
        this.selectedRecomendation = item;
        if(item.value === 'upcoming'){
          this.setCurrentType(this.types.find(e=>e.id === 'movie'))
        }
        this.requestReco(this.selectedRecomendation,this.getCurrentType)
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
    },
    computed:{
      ...mapGetters([
        'getCurrentType',
        'getIsOpenMovieDetail'
      ]),
    },
    mounted() {
      this.requestReco(this.selectedRecomendation,this.getCurrentType)
    },
    components:{
      Icon
    }
  }
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
@import "@/scss/colors.scss";
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
                height: fit-content;
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
</style>