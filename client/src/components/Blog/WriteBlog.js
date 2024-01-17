import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './WriteBlog.css'
import { useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Buffer } from 'buffer'

const WriteBlog = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [data, setData] = useState({ title: "", summary: "", content: "", category: "", contentImage: "" });
  const [file, setFile] = useState(null);
  const [buffer, setBuffer] = useState(null);

  const updateData = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const updateContent = () => {
    setData(prev => ({ ...prev, content: content }));
  }

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new window.FileReader();
      reader.onload = () => {
        setBuffer(reader.result);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  const formSubmitter = async (e) => {
    e.preventDefault();
    const bufferarr = Buffer.from(buffer);
    const blogData = {
      title: data.title,
      summary: data.summary,
      content: data.content,
      category: data.category,
      contentImage: bufferarr,
    }
    console.log(blogData);

    const token = await Cookies.get('access_token');
    await axios.post(`http://localhost:5001/api/blogs/createBlog/${user._id}`, { data: blogData, token: token }).then((res) => {
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
          <input type='title' placeholder='Title' name='title' onChange={updateData} />
          <input type='summary' placeholder='summary' name='summary' onChange={updateData} />
          <div className='itemCat' onChange={updateData}>
            <h5 style={{ margin: "0" }}>Category</h5>
            <input type='radio' name='category' value='art' id='art' />
            <label htmlFor='art'>Art</label>
            <input type='radio' name='category' value='science' id='science' />
            <label htmlFor='science'>science</label>
            <input type='radio' name='category' value='technology' id='technology' />
            <label htmlFor='technology'>technology</label>
            <input type='radio' name='category' value='food' id='food' />
            <label htmlFor='food'>food</label>
            <input type='radio' name='category' value='cinema' id='cinema' />
            <label htmlFor='cinema'>cinema</label>
          </div>
          <input style={{ display: "None" }} type='file' id="file" onChange={fileHandler} />
          <label htmlFor='file' className='file'>Add image here..</label>
          <div className='editorContainer'><ReactQuill className='editor1' value={content} onChange={newValue => { setContent(newValue); updateContent() }} /></div>
          <button type='submit' className='subButton'>Post</button>
        </form>
      </div>
    </div>
  )
}

export default WriteBlog;