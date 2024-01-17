import React from 'react'
import Header from '../Header.js'
import img1 from '../Home/img1.jpeg'
import SampleCard from '../Home/SampleCard'
import './ProfilePage.css'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import Cookies from 'js-cookie'
const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            axios.post(`https://blogit-backend-tmf9.onrender.com/api/blogs/getBlogbyUser/${user._id}`,{token:Cookies.get('access_token')})
            .then(response => {
                // Handle the response, which contains the blogs for the user
                setBlogs(response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });
        }
        fetchData();
    }, [])
    

    

    return (
        <div style={{ height: "100vh" }}>
            <Header />
            <div className='profileBox'>
                <div className='profileInfo'>
                    <div className='profileInfoLeft'>
                        <h1>Profile Info</h1> 
                        <div className='profilestyle'>
                            <img src={img1} alt='profile pic' className='profileImg' />
                            <div className='profileDet'>
                                <h3>Username : {user.username}</h3>
                                <h3>Email : {user.email}</h3>
                                <h3>Name : {user.name}</h3>
                            </div>
                        </div>

                    </div>
                    <div className='profileInfoRight'>
                        <h1>My Blogs</h1>
                        <div className='profileBlog'>
                            {blogs.map((blog) => (
                                <SampleCard key={blog._id} title={blog.title} userid={blog.userid} summary={blog.summary} blogid={blog._id} img={blog.contentImage} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage