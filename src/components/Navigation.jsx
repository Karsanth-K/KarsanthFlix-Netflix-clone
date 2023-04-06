import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase";
import logo from '../assets/logo.png';
import {FaPowerOff, FaSearch} from 'react-icons/fa';
import { current } from '@reduxjs/toolkit';
import Movies from '../pages/Movies';
import { BsCursor } from 'react-icons/bs';
import { BiPointer } from 'react-icons/bi';
export default function Navigation({isScrolled}) {
    var srchval;
    const navigate = useNavigate();
    const links=[{name:"Home", link:'/'},
                {name:"Movies", link:'/movies'},
                {name:"Top Picks", link:'/mylist'},];

    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(!currentUser) navigate("/login");
    },[]);

    const[search,setSearch]=useState(false);
    const[inpHover,setInpHover]=useState(false);
  return (
    <Container>
        <nav className={`flex ${isScrolled ? "scrl":""}`}>
            <div className="left flex a-center">
                <div className="brand a-center j-center">
                    <Link to='/'>
                    <img src={logo} alt='logo.png'/></Link>
                </div>
                <ul className="links flex">
                    {links.map(({name,link})=>{
                        return(
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>);
                    })}
                </ul>
            </div>
            <div className="right flex a-center">
                <div className={`search ${search ? "show-search":""}`}>
                <button onFocus={()=>setSearch(true)} onBlur={()=>{
                    if(!inpHover) setSearch(false);
                }}>
                    <div className='logout'>Logout</div><FaSearch/>
                </button>
                <form action='javascript:void(0)'><input type='text' placeholder='Search' id="srchData"
                onSubmit={()=>{srchval=(document.getElementById("srchData").value);localStorage.setItem("srch",srchval);window.location.assign('/movies')}}
                onMouseEnter={()=>setInpHover(true)}
                onMouseOut={()=>setInpHover(false)}
                onBlur={()=>{setSearch(false);setInpHover(false);}}/></form>
                    <button className='srchbtn' onClick={()=>window.location.assign('/movies')}>Search</button>
                </div>
                <button onClick={()=>{signOut(firebaseAuth);}}>
                    <FaPowerOff />
                </button>
            </div>
        </nav>
    </Container>
  )
}

const Container = styled.div`
.flix-logo{
    cursor:pointer;
}
.srchbtn{
    color:white;
    .a{
        color:white;
    }
}
.scrl{
    background-color:black;
}
nav{
    position: sticky;
    top:0;
    height:5rem;
    width:100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 1s ease-in-out;
    .left{
        gap:5rem;
        .brand{
            img{
                height:6.25rem;
            }
        }
        .links{
            list-style-type: none;
            gap:2rem;
            li{
                a{
                    color:white;
                    text-decoration:none;
                }
                a:hover{
                    font-size:25px;
                    color:red;
                    text-shadow:2px 2px black;
                }
            }
        }
    }
    .right{
        gap:3rem;
        button{
            background-color: transparent;
            border:none;
            cursor:pointer;
            .logout{
                position:fixed;
                top:3rem;
                right:3.25rem;
                color:white;                
            }
            &:focus{
                outline:none;
            }
            svg{
                color:#f34242;
                font-size:1.2rem;
            }
        }
        .search{
            display:flex;
            gap:0.4rem;
            align-items: center;
            justify-content: center;
            padding: 0.2rem;
            padding-left: 0.5rem;
            button{
                background-color: transparent;
                svg{
                    color:white;
                }
            }
            input{
                width:0;
                opacity: 0;
                visibility: hidden;
                transition: 0.25s ease-in-out;
                background-color: rgba(0,0,0,0.4);
                border:none;
                color:white;
                font-size:500;
                &:focus{
                    outline:none;
                }
            }
            input::placeholder{
                color:white;
            }
        }
        .show-search{
            border:1px;
            background-color: rgba(0,0,0,0.2);
            input{
                border:1px solid rgba(150,150,150,0.5);
                width:100%;
                opacity:0.8;
                visibility:visible;
                padding:0.2rem;
            }
        }
    }
}
`;