import { useState, useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
function Notes() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [title, settitle] = useState("");
    const [description, setDescription] = useState("")
    const [tag, settag] = useState("");
    const getAuth = localStorage.getItem("Token")
    const [data, setdata] = useState([]);
    const [Profile, setprofile] = useState([]);
    const [userData, setUserData] = useState(null);
    // http://localhost:5000/api/v2/getNotes1
    const getData1 = async () => {
        const result = await fetch("http://localhost:5000/api/vi/UserDetail", {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': getAuth,
            }
        })
        const response = await result.json();
        setprofile(response)
    }
    const SubmitHandle = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/v2/CreateNotes", {
                title,
                description,
                tag,
            }, {

                headers: {
                    'auth-token': getAuth,
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.data;

        } catch (error) {
            console.error('Error creating user:', error);

        }
    }
    const getData = async () => {
        const result = await fetch("http://localhost:5000/api/v2/getNotes1", {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': getAuth,
            }
        })
        const response = await result.json();
        setdata(response)
    }
    useEffect(() => {
        getData();
        getData1()
    }, []);
    return (
        <div>

            <div className='container my-5'>
                <form onSubmit={SubmitHandle}>
                    <h1>Create Notes</h1>
                    <div class="mb-3">
                        <label for="text" class="form-label">Title</label>
                        <input type="text" value={title} onChange={(e) => settitle(e.target.value)} class="form-control" id="text" aria-describedby="text" />
                    </div>
                    <div class="mb-3">
                        <label for="text" class="form-label">Description</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} class="form-control" id="text" />
                    </div>
                    <div class="mb-3">
                        <label for="text" class="form-label">Tag</label>
                        <input type="text" value={tag} onChange={(e) => settag(e.target.value)} class="form-control" id="text" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <div className="conatainer my-3">
                    <h2>Explore Our Food Collection</h2>
                    <div className="row">
                        {data.map((element) => {
                            console.log(element.user[0]._id);
                            return (
                                <div className="col-md-3 mx-3 my-2">
                                    <Card className="text-white" style={{ backgroundColor: "black", color: "white", cursor: "pointer" }}>
                                        <CardHeader className="text-white"
                                            avatar={
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    R
                                                </Avatar>
                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title="Quick-service restaurant"
                                            subheader="September 14, 2016"
                                        />
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image="https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg"
                                            alt="Paella dish"
                                        />

                                        <CardContent>
                                            <Link className="text-white text-decoration-none" id="name1" to={"/UserProfile/" + element.user[0]._id} > <p className="text-white text-decoration-none" >By {element.user[0].name}</p></Link>
                                           
                                            <h5>{element.title}</h5>
                                            <Typography className="text-white" variant="body2">
                                                {element.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing style={{ color: "white" }}>
                                            <IconButton aria-label="add to favorites" style={{ color: "white" }}>
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton aria-label="share" style={{ color: "white" }}>
                                                <ShareIcon />
                                            </IconButton>
                                            <ExpandMore style={{ color: "white" }}
                                                expand={expanded}
                                                onClick={handleExpandClick}
                                                aria-expanded={expanded}
                                                aria-label="show more"
                                            >
                                                <ExpandMoreIcon />
                                            </ExpandMore>
                                        </CardActions>
                                        <div className="container text-center my-2">
                                            <button typeof="button" className="btn btn-danger" style={{ fontWeight: "bold" }}>Add To Bucket</button>
                                        </div>
                                    </Card>

                                </div>)
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Notes