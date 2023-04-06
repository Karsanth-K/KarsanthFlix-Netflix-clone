import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGenres, getMovies,searchMovies } from '../store';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import ChooseGenre from '../components/ChooseGenre';

export default function Movies() {
    const [scrl,setScrl] = useState(false);
window.onscroll = () =>{
  setScrl(window.pageYOffset == 0 ? false:true);
  return ()=>(window.onscroll = null);
};
  const navigate = useNavigate();
  const genresLoaded = useSelector((state)=>state.karsanth.genresLoaded);
  const dispatch = useDispatch();
  const movies = useSelector((state)=>state.karsanth.movies);
  const genres = useSelector((state)=>state.karsanth.genres);
  useEffect(()=>{
    dispatch(getGenres())
  },[]);
  useEffect(()=>{
    if(genresLoaded) dispatch(getMovies({type:"movie"}))
  },[]);
  return (
    <My_Style>
        <div className='navbar'>
          <Navigation isScrolled={1}/>
        </div>
        <div className="data">
          <div className='inp'>
          <ChooseGenre genres={genres} type="movie"/>
          </div>
            {
                movies.length ? <Slider movies={movies}/>:<NotAvailable/>
            }
        </div>
    </My_Style>
  )
}
const My_Style = styled.div`
.inp{
  position:absolute;
  top:15%;
}
.data{
  margin-top:12rem;
  .not-available{
        text-align:center;
        color:white;
        margin-top:4rem;
    }
}`;
