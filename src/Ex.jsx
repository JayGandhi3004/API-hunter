import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Ex = () => {

    const [newdata, setnewdata] = useState({
        name: "",
        age: ""
    })
    const [show, setshow] = useState([])
    const [updata, setUpdata] = useState([])

    const change = (e) => {
        setnewdata({ ...newdata, [e.target.name]: e.target.value })
    }

    const handle = () => {
        axios.post('http://localhost:3030/posts', newdata).then((res) => {
            setshow([...show, res.data])
            console.log(res.data);
        })
    }

    useEffect(() => {
        axios.get('http://localhost:3030/posts').then((res) => {
            console.log(res);
            setshow(res.data)
        })
    }, [])

    const remove = (id) => {
        axios.delete(`http://localhost:3030/posts/${id}`).then((res) => {
            console.log(res);
            let filter = show.filter((gayab) => gayab.id !== id)
            setshow(filter)
        })
    }

    const edit = (index) => {
        const stor = show[index]
        setUpdata(stor)
    }
    const ud = (e) => {
        const { name, value } = e.target
        setUpdata({
            ...updata,
            [name]: value
        })
    }
    const updataData = id => {
        axios.put(`http://localhost:3030/posts/${id}` , updata).then((res)=>{
            console.log(res);
            setshow(item => item.map((data)=>data.id === id ? updata : data))
        }) 
    }
    console.log(updata);
    return (
        <>
            <div>
                <input type="text" placeholder='name' name='name' onChange={change} />
                <input type="text" placeholder='age' name='age' onChange={change} />
                <input type="submit" onClick={handle} />
            </div>
             <div>
                <input type="text" value={updata.name || ""} placeholder='name' name='name' onChange={ud} />
                <input type="text" value={updata.age || ""} placeholder='age' name='age' onChange={ud} />
                <input type="submit" onClick={()=>updataData(updata.id)} />
            </div>
            <table border="1">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Action</td>             
                    </tr>
                </thead>
                <tbody>
                    {
                        show?.map((val, index) => {
                            return (
                                <tr key={index}>
                                    <td>{val.name}</td>
                                    <td>{val.age}</td>
                                    <td>
                                        <button onClick={() => edit(index)}>Edit</button>
                                        <button onClick={() => remove(val.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
           

        </>
    )
}

export default Ex
