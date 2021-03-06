import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../useAuth/useAuth';
import './Resister.css'
const Register = () => {
    const {creatPassword,setUser,updateName,setIsloading}=useAuth();
    let location=useLocation();
    let navigate=useNavigate();
    const uri=location?.state?.form ||'/'
  const  nameRef=useRef();
   const emailRef=useRef();
   const passwordRef=useRef();
    
    const handelResisterForm=e=>{
        e.preventDefault();
       const name= nameRef.current.value;
       const email=emailRef.current.value;
       const password=passwordRef.current.value;
     
       creatPassword(email,password)
      
  .then((userCredential) => {
    setIsloading(true)
    // Signed in 
    updateName(name)
    const user = userCredential.user;
    setUser(user)
    navigate(uri)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode );
    // ..
  })
  .finally(()=>{
    setIsloading(false)
  })

       

    }
    return (
        <div className='resister'>
            <h1>welcome to our tutor home resister your name </h1>
            <form  onSubmit={handelResisterForm} >
                <input type="text" placeholder='Enter your Name' ref={nameRef} />
                <input type="email" placeholder='Enter your Email' ref={emailRef} />
                <input type="password" placeholder='Enter your Password' ref={passwordRef} />
                <input type="submit" value="Sign up" />
            </form>
          <p className='text-center'>  Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Register;