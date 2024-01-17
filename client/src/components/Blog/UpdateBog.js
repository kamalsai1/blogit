import React, { useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './WriteBlog.css'
import { useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const UpdateBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [content, setContent] = useState("");
    const [data, setData] = useState({ title: "", summary: "", content: "", category: "", contentImage: "" });

    useEffect(() => {
        const fetchData = async () => {
            console.log("this is at update blog ",id)
            await axios.get(`https://blogit-backend-tmf9.onrender.com/api/blogs/getBlogbyId/${id}`).then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    setData(res.data);
                    setContent(res.data.content);
                }
                else {
                    alert("error");
                }
            })
        }
        fetchData();
    }, [])

    const updateContent = () => {
        setData(prev => ({ ...prev, content: content }));
    }

    const formSubmitter = async (e) => {
        e.preventDefault();
        const blogData = {
            title: data.title,
            summary: data.summary,
            content: content,
            category: data.category,
        }
        console.log(blogData);

        const token = await Cookies.get('access_token');
        await axios.put(`https://blogit-backend-tmf9.onrender.com/api/blogs/updateBlog/${id}`, { data: blogData, token: token }).then((res) => {
            if (res.status === 200) {
                console.log(res);
                // alert("Login Successful");
                navigate('/');
            }
            else {
                alert("error");
            }
        })
    }
    return (
        <div className='crtBlog'>
            <Header />
            <div className='WriterClass'>
                <form onSubmit={formSubmitter}>
                    <p>title: {data.title}</p>
                    <p>summary: {data.summary}</p>
                    <p>category: {data.category}</p>
                    <div className='editorContainer'><ReactQuill className='editor1' value={content} onChange={newValue => { setContent(newValue); updateContent() }} /></div>
                    <button type='submit' className='subButton'>Post</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateBlog;