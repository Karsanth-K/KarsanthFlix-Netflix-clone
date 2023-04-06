import React from 'react';
import styled from 'styled-components';
import {BsArrowLeft} from "react-icons/bs";
import video from "../assets/Avatar_Teaser.mp4";
import { Link } from 'react-router-dom';
export default function Player() {
  return (
    <My_Style>
        <div className="player">
            <div className="back">
                <Link to={'/'} className='back-link'>
                <BsArrowLeft/>
                </Link>
            </div>
            <video src={video} autoPlay controls></video>
        </div>
    </My_Style>
  );
}


const My_Style=styled.div`
.player{
    width:100vw;
    height:100vh;
    .back{
        position:absolute;
        padding:2rem;
        z-index:1;
        svg{
            font-size:3rem;
            cursor:pointer;
        }
        .back-link{
            color:rgba(255, 255, 255, 0.395);
        }
    }
    video{
        height:100%;
        width:100%;
        object-fit:cover;
    }
}`;