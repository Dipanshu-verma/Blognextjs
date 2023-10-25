"use client"
import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import Link from 'next/link';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/Navbar/Navbar';

 

const login = () => {
  const [loginData, setLoginData] = useState({
    email:"",
    password:"",
  });
  
 const[error,setError]  =useState(false)
const [redirectPath, setRedirectPath] = useState(null);

const router = useRouter();

useEffect(() => {
  if (redirectPath) {
    router.push(redirectPath);
  }
}, [redirectPath, router]);


function handlelogin(e){
setLoginData({...loginData,[e.target.name]:e.target.value})
}


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
      try{

        const {data}  =  await axios.post("https://blogserver-w5gq.onrender.com/login",loginData)

        
        localStorage.setItem("token",data.token)
        setRedirectPath("/")
     
      }catch(error){

        
        setError(true);

      }
     
  };

  return (
    <>
        <Navbar/>

    <div className={styles.loginForm}>
    

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className='label'>Email:</label>
          <input
            type="email"
            value={loginData.email}
            name="email"
            onChange={handlelogin}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className='label'>Password:</label>
          <input
            type="password"
            value={loginData.password}
            name='password'
            onChange={handlelogin}
            className={styles.input}
            required
          />
        </div>
        {
      error&&<p className={styles.error}>please enter the valid credantial</p>
        }
        
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      <p className={styles.createacount}>don't have an account <Link href="/signup" className={styles.Link} ><span style={{color:'#007bff'}}>create account</span></Link>  </p>
    </div>
    </>
  );
};

export default login;