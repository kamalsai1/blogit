import React, { useEffect } from 'react'
import Header from '../Header'
import SampleCard from './SampleCard'
import { useState } from 'react'
import axios from 'axios'
import img1 from './img1.jpeg'
import img2 from './img2.jpeg'
import img3 from './img3.jpeg'
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get('https://blogit-backend-tmf9.onrender.com/api/blogs/getAllBlogs').then((response) => {
      setBlogs(response.data);
    }
    );
  }, []);

  return (
    <div>
      <Header />
      <div className='allBlogs' style={{padding:"20px",backgroundColor:"#1e1c1c",justifyContent:"center", display:"flex",flexWrap:"wrap", gap:"20px",minHeight:"100vh"}}>
        {blogs.map((blog) => (
          <SampleCard key={blog._id} title={blog.title} userid={blog.userid} summary={blog.summary} blogid={blog._id} img={blog.contentImage}/>
        ))}
      </div>
    </div>
  )
}

export default Home