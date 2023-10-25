// InputForm.js
"use client"
import React, { useEffect, useState } from 'react';
import styles from './write.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/app/Navbar/Navbar';
 

const Page = () => {
    const [redirectPath, setRedirectPath] = useState(null);

const router = useRouter();

useEffect(() => {
  if (redirectPath) {
    router.push(redirectPath);
  }
}, [redirectPath, router]);

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    createdAt: '',
    author: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (
        formData.title === '' ||
        formData.body === '' ||
        formData.createdAt === '' ||
        formData.author === ''
      ) {
         
        alert('Please fill in all fields');
        return;  
      }
    try{
console.log(formData);
        const {data}  =  await axios.post("https://blogserver-w5gq.onrender.com/blogs",formData)
  setRedirectPath("/")
    }catch(error){
alert("somthing went wrong please try again")
    }
   
  };

  return (
    <>
        <Navbar/>
  
    <div className={styles.container}>
      <h2 className={styles.create}>Create A Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="body" className={styles.label}>Body:</label>
          <textarea
            id="body"
            name="body"
            rows="10"
            value={formData.body}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.label}>Date:</label>
          <input
            type="date"
            id="date"
            name="createdAt"
            value={formData.date}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="authorName"  className={styles.label}>Author Name:</label>
          <input
            type="text"
            id="authorName"
            name="author"
            value={formData.authorName}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit"  className={styles.button} >Create a Blog</button>
      </form>
    </div>
    </>
  );
};

export default Page;
