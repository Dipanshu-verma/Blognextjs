"use client"
import React, { useEffect, useState } from "react";
import styles from "./blog.module.css"
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "./Modal";
 
 
const Blogitem = ({ elm,setBlogs }) => {
 
     
    const [ismodalopen,setisModalOpen]  = useState(false)
 
    const handleEditClick = () => {
      setisModalOpen(true)
      };


     


    async function handleDelete(){
        try{

            const {data}  =  await axios.delete(`https://blogserver-w5gq.onrender.com/blogs/${elm._id}`)
            setBlogs((prevItems) => prevItems.filter(item => item._id !== elm._id));

        }catch(error){

          alert("something went wrong please try again")
        }
      }


      
      

     
    return (
        <>

     
        <div className={styles.blogItem}>
            <div className={styles.blogitemtop}>
            <h2 className={styles.blogItemTitle}>{elm.title}</h2>
         
          <p className={styles.blogItemCreatedAt}>{elm.createdAt}</p>
          </div>
          <div className={styles.blogItemBody} key={elm.id}>
            <p>{elm.body}</p>
          </div>
          <h5>{elm.author}</h5>
          <div className={styles.blogItemButtons}>
          
            <button className={styles.editButton} onClick={handleEditClick}>Edit</button>
           
            <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
          </div>

          
        </div>


         {
          ismodalopen&& <Modal setBlogs={setBlogs} elm={elm} ismodalopen={ismodalopen} setisModalOpen={setisModalOpen}/>
         }

        </>
      );
};

export default Blogitem;
