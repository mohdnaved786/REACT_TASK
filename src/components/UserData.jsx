import React, { useEffect, useState } from 'react'

const UserData = () => {
    const [firstName, setFirstName] = useState("")
    const [middleName, setmiddleName] = useState("")
    const [lastName, setlastName] = useState("")
    const [pin, setpin] = useState("")
    const [address, setAddress] = useState("")
    const [id, setId] = useState(null)
    const [data2, setData] = useState([])

    const url = "http://localhost:3000/userData/"

    function getData() {
        fetch(url).then((result) => {
            result.json().then((res) => {
                setData(res)
                // setFirstName(res[0].firstName)
                // setmiddleName(res[0].middleName)
                // setlastName(res[0].lastName)
                // setpin(res[0].pin)
                // setAddress(res[0].address)

            })

        })
    }

    useEffect(() => {
        getData();
    }, [])

    function getUserData(e) {
        e.preventDefault();
        const data = { firstName, middleName, lastName, pin, address }
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((res) => res.json().then((data) => console.log(data)))
        getData();



        // localStorage.setItem("NavedData",JSON.stringify(data))
    }
    // useEffect(()=>{
    //     fetch("http://localhost:3000/userData",{
    //     }).then((res)=>res.json().then((data)=>console.log(data)))
    // },[])

    // useEffect(()=>{
    //     const newData = localStorage.getItem("NavedData")
    //     const lastData = JSON.parse(newData)
    //     console.log(lastData)
    // },[])

    function deleteUser(id) {
        fetch(url + id, {
            method: "DELETE"
        }).then((res) => res.json().then((final) => console.log(final)))
        getData();
    }

    function updateUser(id) {
        const item = data2[id - 1]
        setFirstName(data2[id - 1].firstName)
        setmiddleName(item.middleName)
        setlastName(item.lastName)
        setpin(item.pin)
        setAddress(item.address)
        setId(item.id)
    }

    function updateUserApi(){
        console.log({firstName,middleName,lastName,pin,address,id})

    }

    return (
        <React.Fragment>




            <form onSubmit={getUserData}>
                <div className="container">
                    <div className="row p-5">
                        <div className="col-lg-6">
                            <div className='w-50'>
                                <label>First Name</label>
                                <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} className='form-control' />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='w-50'>
                                <label>Middle Name</label>
                                <input type="text" onChange={(e) => setmiddleName(e.target.value)} value={middleName} className='form-control' />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='w-50'>
                                <label>Last Name</label>
                                <input type="text" onChange={(e) => setlastName(e.target.value)} value={lastName} className='form-control' />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='w-50'>
                                <label>Pin Code</label>
                                <input type="text" onChange={(e) => setpin(e.target.value)} value={pin} className='form-control' />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='w-50'>
                                <label>Address</label>
                                <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} className='form-control' />
                            </div>
                        </div>
                        <div className="button mt-4">
                            <button type='submit' className='btn btn-success me-5'>ADD</button>
                            <button type='button' onClick={updateUserApi} className='btn btn-danger'>Update</button>
                        </div>
                    </div>
                </div>
            </form>


            <div className="conatiner">
                <table border="2">
                    <tr>
                        <td>ID</td>
                        <td>First Name</td>
                        <td>Middle Name</td>
                        <td>Last Name</td>
                        <td>Pin</td>
                        <td>Address</td>
                        <td>Actions</td>
                    </tr>
                    {
                        data2.map((item, i) =>
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.middleName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.pin}</td>
                                <td>{item.address}</td>
                                <button className='btn btn-primary' onClick={() => deleteUser(item.id)}>Delete</button>
                                <button className='btn btn-info' onClick={() => updateUser(item.id)}>Update</button>
                            </tr>)
                    }
                </table>
            </div>
        </React.Fragment>
    )
}

export default UserData