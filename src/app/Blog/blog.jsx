"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blogitem from '../blogitem/Blogitem';
import Navbar from '../Navbar/Navbar';

const Blog = () => {

    const [blogs,setBlogs] =  useState();

    useEffect(()=>{
     getBlogs();
    },[])



   async function  getBlogs(){
    try{

const {data}  = await axios("https://blogserver-w5gq.onrender.com/blogs")
setBlogs(data)



    }catch(error){
        console.log(error);
    }
   }






  return (
    <>
        <Navbar/>
   
    <div>
       {
        blogs?.map((elm)=>(
            <Blogitem key={elm._id} elm={elm}setBlogs={setBlogs} />
        ))
       }
 
    </div>
    </>
  )
}

export default Blog