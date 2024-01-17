import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './components/Home/Home'
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import BlogPage from './components/Blog/BlogPage';
import WriteBlog from './components/Blog/WriteBlog';
import ProfilePage from './components/ProfilePage/ProfilePage';
import UpdateBlog from './components/Blog/UpdateBog';
function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/post/:id' element={<BlogPage/>} />
          <Route path='/write' element={<WriteBlog/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/update/:id' element={<UpdateBlog/>} />
          
        </Routes>
    </BrowserRouter>

  );
}

export default App;
