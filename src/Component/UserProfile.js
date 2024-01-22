import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function UserProfile() {
    const params = useParams();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [notes, setnotes] = useState([]);
    const getdata = async () => {
        axios.get(`http://localhost:5000/api/vi//getProfile/${params.id}`)
            .then((response) => {
                const All = response.data;
                setname(All.name);
                setemail(All.email)
            }

            )
    }
    const getdata1 = async () => {
        axios.get(`http://localhost:5000/api/v2/getNotes3/${params.id}`)
            .then((response) => {
                const All1 = response.data;
                setnotes(All1)
            }

            )
    }
    useEffect(() => {
        getdata();
        getdata1()
    }, [])
    return (
        <div>
            <div className='container-fluid' style={{ backgroundColor: "black", color: "white" }}>
                <br></br>   <br></br>   <br></br>
                <div className='row'>
                    <div className='col-md-4'>
                        <div class="card" style={{width: "18rem"}}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYRAWqd6TQyF2T7q3XretY6PCSDQVBnPhYg&usqp=CAU"  style={{ height: "150px", width: "170px" }}class="card-img-top rounded-circle text-center mx-5" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title text-center">{name}</h5>
                                    <p class="card-text">{email}</p>
                                </div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='row'>
                            {notes.map((element) => {
                                return (
                                    <div className='col-md-4' key={element.id}>
                                        <div class="card mb-3">
                                            <div class="row g-0">
                                                <div class="col-md-4">
                                                    <img src="https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg" class="img-fluid rounded-start" alt="..." />
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="card-body">
                                                        <h5 class="card-title">{element.title}</h5>
                                                        <p>{element.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
