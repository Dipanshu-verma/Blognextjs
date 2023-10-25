import React, { useEffect, useState } from 'react'
import styles from "./modal.module.css"
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Modal = ({setBlogs,ismodalopen,elm,setisModalOpen}) => {

    const [redirectPath, setRedirectPath] = useState(null);

    const router = useRouter();
    
    useEffect(() => {
      if (redirectPath) {
        router.push(redirectPath);
      }
    }, [redirectPath, router]);

    const [formData, setFormData] = useState({
        title:elm.title,
        body: elm.body,
        createdAt:elm.createdAt,
        author:elm.author,
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
    
            const {data}  =  await axios.put(`https://blogserver-w5gq.onrender.com/blogs/${elm._id}`,formData)

            setBlogs((prevItems) => prevItems.map(item => item._id === elm._id?formData:item));

      setRedirectPath("/")
      setisModalOpen(false)
        }catch(error){
     
            alert("something went wrong please try again")

        }
       
      };

  return (
    <>
   
   <div className={styles.overlay} onClick={()=>setisModalOpen(false)}></div>
    <div className={styles.container}>
    <h2 className={styles.create}>Edit Blog</h2>
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
          value={formData.createdAt}
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
          value={formData.author}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <button type="submit"  className={styles.button} >Submit</button>
    </form>
  </div>

       
  </>
  )
}

export default Modal