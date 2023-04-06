import React, { useState } from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase';
export default function Signup() {
  const navigate=useNavigate();
  const [reveal, setreveal] = useState(false);
  const [val,setval]=useState({
    email:"",  password:"",
  });
  const handleSignIn = async()=>{
    try{
      const {email,password} = val;
      await createUserWithEmailAndPassword(firebaseAuth,email,password);
      document.getElementById("error").innerHTML="";
    }catch(err){
      if(err=="email-already-in-use"){
        document.getElementById("error").innerHTML="Email already in use !";
      }
      else{
      document.getElementById("error").innerHTML="Enter a Valid Email address. \nThe password must have atleast 6 characters";
      }
    }
  };

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate('/');
  })

  return <Container reveal={reveal}>
    <BackgroundImage className="logo"/>
    <div className="content">
    <Header login />
    <div className="body flex column a-center j-center">
      <div className="text flex column">
        <h1>Your all time favourite </h1>
        <h4>Watch and Enjoy</h4>
        <h6>Ready to watch? Enter your Email to create your membership</h6>
      </div>
      <div className="form">
        <input type="email" placeholder='Email Address' name="email" value={val.email} onChange={(e)=>setval({...val,[e.target.name]: e.target.value,})} required/>
        {reveal && <input type='password' placeholder='Password' name="password" value={val.password} onChange={(e)=>setval({...val,[e.target.name]: e.target.value,})} required/>}
        {!reveal && <button onClick={()=>setreveal(true)}>Get Started</button>}
      </div>
      <button onClick={handleSignIn}>Sign up</button>
      <p id="error" className='error'></p>
    <p className='copyright'>&copy;Karsanth</p>
    </div>
    </div>
    </Container>
}
const Container = styled.div`
.logo{
  padding-left:40%;
  padding-top:10%;
}
.error{
  background-color:rgba(0,0,0,0.5);
}
:placeholder{
  color:white;
  opacity:1;
}
color:white;
    position:relative;
    .content{
      position:fixed;
      top:0;
      left:0;
      background-color: rgba(0,0,0,0.5);
      height: 100vh;
      width:100vw;
      display:grid;
      grid-template-rows:20vh 85vh;
      .body{
        gap:1rem;
        .text{
          gap:1rem;
          text-align:center;
          font-size:2rem;
          h1{
            padding:0 25rem;
          }
        }
        .form{
          display:grid;
          grid-template-columns:${({reveal})=>reveal?"1fr 1fr":"2fr 1fr"};
          width: 60%;
          input{
            color:white;
            border:none;
            padding:1.5rem;
            font-size:1.2rem;
            background-color:rgba(255, 255, 255, 0.186);
            border: 1px solid grey;
            &:focus{
              outline:none;
            }
          }
          input::placeholder{
            color:rgba(255, 255, 255, 0.537);
          }
          button{
            padding:0.5rem 0.5rem;
            background-color:#e50914;
            border:none;
            cursor:pointer;
            color:white;
            font-weight:bolder;
            font-size:1.05rem;
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
      }
    }
    .copyright{
      position:fixed;
      right:2px;
      bottom:2px;
    }
`;