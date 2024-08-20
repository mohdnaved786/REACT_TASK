import React, { useEffect, useState } from 'react'

const User = () => {
    const [name,serName] = useState("")
    const [email,setEmail] = useState("")
    const [password,serPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [file, setFile] = useState("")
    const [data, setData] = useState({name,email,mobile,password})

    function addUser(){
        const userInfo = ({name,email,mobile,password,file})
        setData(userInfo)
        localStorage.setItem("DATA==>", JSON.stringify(userInfo))
        // fetch("http://localhost:3000/userData",{
        //     method:'POST',
        //     headers:{

        //     },
        //     body:JSON.stringify(userInfo)
        // })
    }

    useEffect(()=>{
        let user = localStorage.getItem("DATA==>")
        user = JSON.parse(user)
    },[])
    
    return (
        <React.Fragment>
            <div className="container mt-5">
               <div className="row">
               <div className="col-lg-6 bg-primary p-5">
                    <input className='form-control' type="text" onChange={(e)=>serName(e.target.value)} value={name} placeholder='Enter Name' required /> <br /> <br />
                    <input className='form-control'  type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter Email' required /> <br /> <br />
                    <input className='form-control'  type="number" onChange={(e)=>setMobile(e.target.value)} value={mobile} placeholder='Enter Mobile' required /> <br /> <br />
                    <input  className='form-control' type="password" onChange={(e)=>serPassword(e.target.value)} value={password} placeholder='Enter Password' required /> <br /> <br />
                    <input type="file" onChange={(e)=>setFile(e.target.value)} className='form-control' /> <br /> <br />
                    <button onClick={addUser} className='btn btn-success'>Add User</button>
                    <button className='btn btn-warning ms-3'>Update User</button>
                </div>
                <div className="col-lg-6">
                    <div className="card p-5">
                        <h2>Name: {data.name}</h2>
                        <h2>Email: {data.email}</h2>
                        <h2>Mobile: {data.mobile}</h2>
                        <h2>Password: {data.password}</h2>
                        <h3>File Name: {data.file}</h3>
                    </div>
                </div>
               </div>
            </div>
        </React.Fragment>
    )
}

export default User