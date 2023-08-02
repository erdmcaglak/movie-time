export const types = [{
    title: 'TV Show',
    id: 'tv-show',
    api: 'tv'
  },
  {
    title: 'Movie',
    id: 'movie',
    api: 'movie'
  }
]

export const recomendations = [
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
]

export const recoItemInfos = [
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
]