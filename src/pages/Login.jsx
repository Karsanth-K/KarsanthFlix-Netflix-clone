import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import background from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      document.getElementById("error").innerHTML="";
    } catch (error) {
      document.getElementById("error").innerHTML="Incorrect Email/Password";
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center" >
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={handleLogin}>Login</button>
              <p className="error" id="error"></p>
              <p className="p">&copy;Karsanth</p>
            </div>
          </div>
        </div>
      <p className="copyright">&copy;Karsanth</p>
      </div>
    </Container>
  );
}
const Container = styled.div`
.error{
  color:rgba(184, 184, 184,0.75);
  font-size:medium;
  text-align:center;
  background-color:rgba(0,0,0,0.75);
}
  position: relative;
  .content {
    position: absolute;
    top: -50px;
    left: 0;
    height: 107vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 40vh;
      .form {
        padding: 2rem;
        background-color:rgba(87, 87, 87, 0.263);
        width: 25vw;
        gap: 2rem;
        color: white;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size:2rem;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          .p{
            color:rgb(194, 194, 194);
            text-align:right;
            font-size:0.8rem;
          }
          button {
            font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
  .copyright{
    position:fixed;
    right:2px;
    bottom:2px;
  }
`;