<template>
  <div class="home-page container">
    <div class="page-header-wrapper">
      <h2 class="page-title">Movie Time - Search Movie or TV Shows</h2>
      <p class="page-sub-text">This site will give you all the information about the movie or TV series you are looking
        for.</p>
      <SearchAreaVue/>
    </div>
    <RecomendationsVue/>
    <MovieDetailVue/>
  </div>
</template>

<script>
  import SearchAreaVue from '@/components/SearchArea.vue'
  import RecomendationsVue from '@/components/Recomendations.vue'
  import MovieDetailVue from '@/components/MovieDetail.vue'
  export default {
    components: {
      SearchAreaVue,
      RecomendationsVue,
      MovieDetailVue
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
        padding: 0 15px;
      }

      .page-sub-text {
        width: 70%;
        color: $gray3;
        font-size: 1.8rem;
        text-align: center;
        @include d-flex-center;
      }
    }
  }
</style>