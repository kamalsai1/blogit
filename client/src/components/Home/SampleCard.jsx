import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Link, useNavigate } from 'react-router-dom';
import './SampleCard.css';
import axios from 'axios';


const SampleCard = (props) => {
  const navigate = useNavigate();

  const [userDet,setUserDet] = React.useState({});
  React.useEffect(()=>{
    axios.get(`https://blogit-backend-tmf9.onrender.com/api/users/getUserbyId/${props.userid}`).then((res)=>{
      setUserDet(res.data);
    }
    )
  },[])
  const base64String = btoa(props.img.data.reduce((data, byte) => data + String.fromCharCode(byte), ''));
  
  const handleReadMore = () => {
    navigate(`/post/${props.blogid}`);
  };
  return (
    <Card sx={{ maxWidth: 750, height: 300,minWidth:600, alignItems: "center", display: "flex" }}>
      <div className='cardImg'>
        {/* <RenderImage buffer={props.img} /> */}
        {/* <CardMedia
          component="img"
          alt="blog image"
          image={props.img}
          sx={{
            objectFit: "fill",
            height: "300px",
            width: "300px"
          }}
        /> */}
        <img src={`data:image/jpeg;base64,${base64String}` } alt="" style={{ objectFit: "fill",
          height: "300px",
          width: "300px"}}/>
      </div>
      <div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" marginBottom={0}>
            {props.title}
          </Typography>
          <Typography fontSize={"10px"} marginBottom={"1.2rem"}>by {userDet.username}</Typography>
          <Typography variant="body2" color="text.secondary">
            {props.summary}
          </Typography>
        </CardContent>
        <CardActions>
          <div className='ButtonHolder' style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <Button size="small" onClick={handleReadMore}>Read More</Button>
            </div>
            <div>
              <Button size="small"><ShareIcon /></Button>
              <Button size='small'><FavoriteBorderIcon /></Button>
            </div>
          </div>
        </CardActions>
      </div>
    </Card>
  )
}

export default SampleCard