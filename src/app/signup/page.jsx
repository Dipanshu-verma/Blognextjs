"use client"
import React, { useEffect, useState } from 'react';
import styles from './signup.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/Navbar/Navbar';
 

const Signup = () => {
    const [loginData, setLoginData] = useState({
        email:"",
        password:"",
        name:"",
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
      const handleSubmit = async(e) => {
        e.preventDefault();
        setError(false)
        try{

            const {data}  =  await axios.post("https://blogserver-w5gq.onrender.com/signup",loginData)
            setRedirectPath('/login');
    
          }catch(error){
          setError(true)
          }
      }; 
  return (
<>
    <Navbar/>

    <div className={styles.loginForm}>
    
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
          <label className='label'>Name:</label>
          <input
            type="name"
            value={loginData.name}
            name="name"
            onChange={handlelogin}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className='label'>Email:</label>
          <input
            type="email"
            value={loginData.email}
            name="email"
            onChange={handlelogin}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className='label'>Password:</label>
          <input
            type="password"
            value={loginData.password}
             name="password"
            onChange={handlelogin}
            className={styles.input}
          />
        </div>
        {
      error&&<p className={styles.error}>User already exist please login</p>
        }
        <button type="submit" className={styles.button}>
          Signup
        </button>
      </form>
      <p className={styles.createacount}>already have an account please <Link href="/login" className={styles.Link} ><span style={{color:'#007bff'}}>login </span></Link>  </p>
    </div>
    </>
  );
};

export default Signup;