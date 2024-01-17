import React from 'react'
import Header from '../Header'
import Blog from './Blog'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


const BlogPage = () => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = React.useState({});
  const [userDetails, setUserDetails] = React.useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        console.log(id);
        await axios.get(`https://blogit-backend-tmf9.onrender.com/api/blogs/getBlogbyId/${id}`).then((res) => {
          console.log(res.data);
          setBlogDetails(res.data);
          const det = res.data;
          async function fetchData1() {
            try {
              console.log(det.userid);
              await axios.get(`https://blogit-backend-tmf9.onrender.com/api/users/getUserbyId/${det.userid}`).then((res) => {
                console.log(res.data);
                setUserDetails(res.data);
              }
              );
            }
            catch (error) {
              console.log("error ", error);
            }
          }
          fetchData1();
        }
        );
      }
      catch (error) {
        console.log("error ", error);
      }
    }
    fetchData();
  }
    , [])
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       console.log(blogDetails.userid);
  //       await axios.get(`https://blogit-backend-tmf9.onrender.com/api/users/getUserbyId/${blogDetails.userid}`).then((res) => {
  //         console.log(res.data);
  //         setUserDetails(res.data);
  //       }
  //       );
  //     }
  //     catch (error) {
  //       console.log("error ", error);
  //     }
  //   }
  //   fetchData();
  // }, [setBlogDetails])

  return (
    <div>
      <Header />
      <Blog title={blogDetails.title} content={blogDetails.content} username={userDetails.username} blogId={id} userid={blogDetails.userid} />
    </div>
  )
}

export default BlogPage