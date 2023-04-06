import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {IoPlayCircleSharp} from 'react-icons/io5';
import {RiThumbDownFill,RiThumbUpFill} from 'react-icons/ri';
import {BsCheck} from 'react-icons/bs';
import {AiOutlinePlus} from 'react-icons/ai';
import {BiChevronDown} from 'react-icons/bi';
import styled from 'styled-components';
import video from '../assets/video.mp4';
export default function Card({movieData,isLiked=false}) {
  const [hover,setHover] = useState(false);
  const navigate = useNavigate();
    return (
    <My_Style onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`}onClick={()=>navigate("/player")} alt="movie"/>
        {
            hover &&(
                <div className='hover'>
                    <div className="image-video-container">
                        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt='movie'/>
                        
                    </div>
                    <div className="info-container flex column">
                        <h3 className="name">
                            {movieData.name}
                        </h3>
                        <div className="icons flex j-between">
                            <div className="controlls flex">
                                <IoPlayCircleSharp title="Play"
                                onClick={()=>navigate("/player")}/>
                            </div>
                            <div className="info">
                                <BiChevronDown title='More Info'/>
                            </div>
                        </div>
                        <div className="genres flex">
                            <ui className="flex">{movieData.genres.map((genre)=>{
                                <li key={genre}>{genre}</li>
                            })}</ui>
                        </div>
                    </div>
                </div>
            )
        }
        
    </My_Style>
  )
}

const My_Style   = styled.div`
  max-width: 500px;
  width: fit-content;
  left:0.5%;
  padding-right:4.5%;
  padding-top:1%;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    padding-right:15px;
    width:125%;
    height: 150%;
    z-index: 10;
  }
  .hover {
    transition:1.5s ease-in-out;
    z-index: 10;
    height: max-content;
    width: 115%;
    position: absolute;
    top: -30vh;
    left: 0vw;
    border-radius: 0.3rem;
    box-shadow: rgba(255, 59, 59, 0.75) 0px 0px 20px;
    background-color: black;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        box-shadow:rgb(0, 0, 0) 0px 0px 25px;
        padding:0rem;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        z-index: 4;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        gap: 10rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;