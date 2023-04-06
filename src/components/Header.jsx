import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from './BackgroundImage';
export default function Header(props) {
  const navigate=useNavigate();
  return (
    <Container className='flex a-center j-between'>
        <div className="logo">
            <img src={logo} alt="logo.png" />
        </div>
        <button onClick={()=>navigate(props.login?"/login":"/signup")}>{props.login ? "Log In":"Sign In"}</button>
    </Container>
  )
}
const Container = styled.div`
    padding:4rem;
    .logo{
        img{
            height:8rem;
            background-color:rgba(0, 0, 0, 0.075);
        }
    }
    button{
        padding:0.5rem 0.5rem;
        background-color:#e50914;
        border:none;
        cursor:pointer;
        color:white;
        border-radius:0.2rem;
        font-weight:bolder;
        font-size:1.05rem;
    }
`;