import React, { useContext, useEffect } from 'react'
import './Blog.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import img1 from '../Home/img3.jpeg'
import img2 from '../Home/img2.jpeg'
import ReactQuill from 'react-quill';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Blog = (props) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    console.log(user)
    const token = Cookies.get('access_token');
    const DeleteBlog = async() => {
        await axios.post(`https://blogit-backend-tmf9.onrender.com/api/blogs/delBlog/${props.blogId}`,{data: {}, token:token}).then((res) => {
            if (res.status === 200) {
                console.log(res);
                // alert("Login Successful");
                navigate('/');
            }
            else {
                alert("error");
            }
        }
        )
    }
    const updateBlog = () => {
        navigate(`/update/${props.blogId}`)
    }
    return (
        <div className='blogBox'>
            <div className='content'>
                <img src={img1} />
                <div className='user'>
                    <img src={img2} />
                    <div className='info'>
                        <span>{props.username}</span>
                        <p>Posted 5 days ago</p>
                    </div>
                    <div className='edit'>
                        {user._id == props.userid &&
                            <div>
                                <EditIcon onClick={updateBlog} style={{cursor:"pointer"}}/>
                                <DeleteIcon onClick={DeleteBlog} style={{cursor:"pointer"}}/>
                            </div>}
                    </div>
                </div>
                <h1>{props.title}</h1>
                <div className='blogContent'>
                    <ReactQuill
                        value={props.content}
                        readOnly={true}
                        theme={"bubble"}
                    />
                </div>

                {/* <p className='blogContent'>
                    {props.content}
                    Blogs are a type of regularly updated websites that provide insight into a certain topic. The word blog is a combined version of the words “web” and “log.” At their inception, blogs were simply an online diary where people could keep a log about their daily lives on the web. They have since morphed into an essential forum for individuals and businesses alike to share information and updates. In fact, many people even make money blogging as professional full-time bloggers.
                    As the publishing world has evolved, and more of it has moved online, blogs have come to occupy a central position in this digital content world. Blogs are a source of knowledge, opinion and concrete advice. While not yet posed to replace journalism as an art form, people increasingly look to trusted blogs to find answers to their questions, or to learn how to do something.
                    Blogs are always evolving both in terms of how they're created and what they are used for.
                    <br /><br />
                    Importance of blogs
                    Whether it’s personal or professional, a blog provides endless opportunities for a website’s traffic growth. Not to mention, the popularity of blogs hasn't diminished. In fact, the opposite is true: As Neal Shaffer, founder of the digital marketing consultancy PDCA Social says, blogging isn’t dead, “blogs are useful for a lot more than just sharing your thoughts. In fact, 60% of consumers will buy something after they’ve read a blog post on the topic.”
                    Blogging is still important today, for establishing your web present, and for the following reasons:
                    <br /><br />
                    Relationship and community building
                    Much like social media platforms, blogs allow people to share their thoughts and experiences with others. Given the active comment sections, they enable people to interact with one another and build relationships based on shared interests that aren’t limited by geographic location. They're an impactful form of information exchange. Essentially, blogs have become a social platform unto themselves and a central part of online community building.
                    For this reason blogs are also a key part of brand management. Your content creation efforts, published via a blog can be used to represent your brand, its values and your products.
                    <br /><br />
                    Monetization
                    Another reason why blogging has become so popular is that many people have started monetizing their blogs. Bloggers tend to make money off of advertisements in a couple of different forms. One of the most common types of advertisements is affiliate marketing. Since bloggers often discuss a given topic and experience in their field, they are reliable sources for those topics.
                    For example, if you've started a travel blog and write about your experiences and what you did in various destinations, your readers might follow your advice. Because you provide information about travel attractions and promote them to your readers, those travel attractions might be willing to pay you to increase their visitor count. Bloggers could also make money on digital ads  through an advertising network (such as Google Adsense) or sell their blogs to larger media entities.
                    <br /><br />
                    Easy to create
                    On a technical note, blogs have surged because it has become easy for individuals to create and update their own blogs regularly using a code-less website building platform. And because blogs are about any topic of choice, anyone can choose to create their own. Still not convinced? Let our blogging for beginners guide show you how.
                    Ready to create your own? Get started with these totally customizable blog website templates.
                    They can be a vehicle for creativity and for marketing. They're also increasingly created and read on mobile apps, as mobile blogging also comes into its own.
                    As you now know, a blog often deals with a given topic and is updated with regular posts, mostly in the form of articles. Websites, however, are often broken down into inner explanatory pages, each with varying purposes. This can mean anything from an FAQ page to a welcoming homepage design. These pages are occasionally updated, making a website more static than a blog. Oftentimes websites have internal blogs, while other websites are entirely blogs without any additional pages.
                    When blogs are a section of a larger website, the website provides the bulk of the information and uses a blog feature to keep users updated and engaged. For example, think of an online store that also offers a blog about their various products and how to use them.
                    Blogs that make up the entire website usually rely on the content itself rather than sell a product or market a service.
                </p> */}
            </div>
            {/* <div className='similarPosts'>
                <div className='post'>
                    <img src={img2} />
                    <h2>Similar Post</h2>
                    <button>Read More</button>
                </div>
                <div className='post'>
                    <img src={img2} />
                    <h2>Similar Post</h2>
                    <button>Read More</button>
                </div>
                <div className='post'>
                    <img src={img2} />
                    <h2>Similar Post</h2>
                    <button>Read More</button>
                </div>
            </div> */}
        </div>
    )
}

export default Blog