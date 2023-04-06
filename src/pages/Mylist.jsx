import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGenres, getMovies } from '../store';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';

export default function Mylist() {
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
      if(genresLoaded) dispatch(getMovies({type:"tv"}))
    },{});
  return (
    <My_Style>
        <div className='navbar'>
          <Navigation isScrolled={1}/>
        </div>
        <div className="data">
            {
                movies.length ? <Slider movies={movies}/>:<NotAvailable/>
            }
        </div>
    </My_Style>
  )
}
const My_Style = styled.div`.inp{
    position:absolute;
    top:10%;
  }
  .data{
    margin-top:5rem;
    .not-available{
          text-align:center;
          color:white;
          margin-top:4rem;
      }
  }`;
