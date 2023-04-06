import React from 'react'
import CardSlider from './CardSlider'

export default function Slider({movies}) {
  const getMoviesFromRange=(from,to)=>{
    return movies.slice(from,to);
  }
  return (
      <div><CardSlider  data={getMoviesFromRange(0,5)} />
      <CardSlider data={getMoviesFromRange(5,10)} />
      <CardSlider data={getMoviesFromRange(10,15)} />
      <CardSlider data={getMoviesFromRange(15,20)} />
      <CardSlider data={getMoviesFromRange(20,25)} />
      <CardSlider data={getMoviesFromRange(25,30)} />
    </div>
  )
}
