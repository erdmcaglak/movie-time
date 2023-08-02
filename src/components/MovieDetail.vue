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
        <div v-if="getWaitModalContent">
          loading
        </div>
        <div v-else>
          type
        </div>
      </ModalVue>
</template>

<script>
import ModalVue from '@/generic-components/modal/Modal.vue'
import {mapMutations,mapGetters} from 'vuex'
export default {
  methods:{
    ...mapMutations([
      'setIsOpenMovieDetail',
    ]),
    closeMovieDetails(){
      this.setIsOpenMovieDetail(false)
    },
  },
  computed:{
    ...mapGetters([
      'getIsOpenMovieDetail',
      'getWaitModalContent',
      'getMovieDetail'
    ])
  },
  components: {
    ModalVue
  }
}
</script>

<style lang="scss" scoped>

</style>