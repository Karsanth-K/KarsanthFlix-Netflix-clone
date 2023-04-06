import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import backgroundImage from '../assets/avatar_home.jpg';
import MovieLogo from "../assets/avatar.png";
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {FaPlay} from "react-icons/fa";
import {AiOutlineInfoCircle} from "react-icons/ai";
import Player from './Player';
import { getGenres, getMovies, searchMovies } from '../store';
import Slider from '../components/Slider';
export default function KarsanthFlix() {
  const [scrl,setScrl] = useState(false);
window.onscroll = () =>{
  setScrl(window.pageYOffset == 0 ? false:true);
  return ()=>(window.onscroll = null);
};
  const navigate = useNavigate();
  const avatar_info="Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.";
  const genresLoaded = useSelector((state)=>state.karsanth.genresLoaded);
  const dispatch = useDispatch();
  const movies = useSelector((state)=>state.karsanth.movies);
  useEffect(()=>{
    dispatch(getGenres())
  },{});

  useEffect(()=>{
    if(genresLoaded) dispatch(getMovies({type:"all"}));
  },{});
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  },{});

  return (
    <My_Style>
      <Navigation isScrolled={scrl}/>
      <div className="main">
        <img src={backgroundImage} alt="Bg.png" className="background-img"/>
        <div className='container'>
          <p className='trend'>Trending Today</p>
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo"/>
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center" onClick={()=>navigate("/Player")}>
              <FaPlay/> Play
            </button>
            <button className="flex j-center a-center" onMouseOver={()=>document.getElementById("inf").innerHTML="Movie : "+avatar_info+""} onMouseLeave={()=>document.getElementById("inf").innerHTML=""}>
              <AiOutlineInfoCircle/>
              More Info
            </button>
          </div>
          <div className="infoText">
            <p id="inf"></p>
          </div>
        </div>
      </div>
      <Slider movies={movies}/>
    </My_Style>
  );
}
const My_Style = styled.div`
  background-color: black;
  .main {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    .trend{
      text-shadow:1px 1px 10px red;
      color:white;
      position:absolute;
      top:-45%;
      left:10%;
      font-size:50px;
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 500px;
          height: 150px;
          margin-left: 3rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(0,0,0,0.5);
            color: white;
          }
        }
        button:hover{
          border:2px solid white;
          background:rgb(255, 59, 0);
          color:rgb(15,15,15);
          font-size:30px;
          font-weight :550;
        }
      }
      .infoText{
        position:absolute;
        bottom:-10px;
        right:auto;
        background-color:rgba(0,0,0,0.7);
        width:fit-content;
        height:fit-content;
        text-align:center;
      }
    }
  }
`;