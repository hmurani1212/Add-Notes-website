import React, { useState, useEffect } from 'react'
function Profile() {
    const getAuth = localStorage.getItem("Token")
    const [Profile, setprofile] = useState([]);
    const [name, setname] = useState([])
    const [data, setdata] = useState([]);
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
    const getData = async () => {
        const result = await fetch("http://localhost:5000/api/v2/getNotes", {
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
        getData1();
    }, []);
    // <img src={require(`../images/${element.image}`)}
    // className="card-img-top" alt='....' />
    return (
        <div>
            <div className='container-fluid' style={{ backgroundColor: "black", color: "white" }}>
                <br></br>   <br></br>   <br></br>
                <div className='row'>
                    <div className='col-md-4'>
                        <div class="card" style={{width: "18rem"}}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYRAWqd6TQyF2T7q3XretY6PCSDQVBnPhYg&usqp=CAU"  style={{ height: "150px", width: "170px" }}class="card-img-top rounded-circle text-center mx-5" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title text-center">{Profile.name}</h5>
                                    <p class="card-text">{Profile.email}</p>
                                </div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='row'>
                            {data.map((element) => {
                                return (
                                    <div className='col-md-4'>
                                        <div class="card mb-3">
                                            <div class="row g-0">
                                                <div class="col-md-4">
                                                    <img src="https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg" class="img-fluid rounded-start" alt="..." />
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="card-body">
                                                        <h5 class="card-title">{element.title}</h5>
                                                        <p>Uploaded BY {Profile.name}</p>
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
        </div >
    )
}

export default Profile