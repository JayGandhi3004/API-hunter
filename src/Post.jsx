import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert'

const Post = () => {
    const [newdata, setnewdata] = useState([])
    const [update, setupdate] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handle = (data) => {
        console.log(data);
        axios.post('http://localhost:3030/posts', data).then((res) => {
            console.log(res.data, "post")
            setnewdata([...newdata, res.data] || [])
            // swal({
            //     title: `${data.firstName} ${data.lastName}`,
            //     text: `${data.age}`,
            //     icon: "success",
            //     dangerMode: true,
            // });
        })
    }

    const fetch = () => {
        axios.get("http://localhost:3030/posts").then((res) => {
            console.log(res.data);
            setnewdata(res.data || [])
        })
    }
    useEffect(() => {
        fetch();
    }, [])

    const remove = (id) => {
        axios.delete(`http://localhost:3030/posts/${id}`).then((res) => {
            console.log(res);
            let filter = newdata.filter((data) => data.id !== id)
            setnewdata(filter)
        })
    }

    const edit = (index) => {
        const alldatas = newdata[index]
        setupdate(alldatas);
        console.log(alldatas);
    }


    const updatedata = (e) => {
        setupdate({ ...update, [e.target.name]: e.target.value })
    }

    const finalupdate = (id) => {
        axios.put(`http://localhost:3030/posts/${id}`, update).then((res) => {
            // console.log(res.data)
            setupdate(res.data)
            setnewdata(alldata => alldata.map((item) => item.id === id ? update : item))
        })
    }

    return (
        <>
            <h1>ADD Data</h1>

            <form onSubmit={handleSubmit(handle)}>
                <input {...register('name')} />
                {errors.lastName && <p>Last name is required.</p>}
                <input {...register('age', { pattern: /\d+/ })} />
                {errors.age && <p>Please enter number for age.</p>}
                <input type="submit" />
            </form>
            <div>
                {
                    newdata.map((data, index) => {
                        return (
                            <div key={index} className="card" style={{ width: '290px' }}>
                                <div className="card-body">
                                    <div key={data.id}>
                                        <p>{data.id}</p>
                                        <p>{data.name}</p>
                                        <p>{data.age}</p>
                                        <button onClick={() => edit(index)}>Edit</button>
                                        <button onClick={() => remove(data.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <h1>Update Data</h1>
            <input name='name' type='text' onChange={updatedata} value={update.name} />
            <input name='age' type='text' onChange={updatedata} value={update.age} />
            <button onClick={() => finalupdate(update.id)}>Update</button>

        </>
    )
}

export default Post
