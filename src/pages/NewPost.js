import { useState } from 'react'
import axios from 'axios'
import Header from '../components/header/Header'

const NewPost = () => {
    const [postForm, setPostForm] = useState({
        title: '',
        description: ''
    })

    const handleFormChange = (e) => {
        setPostForm({...postForm, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')

        axios.post('http://localhost:8000/api/posts', postForm, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            console.log(resp)
        })
        .catch(err => {
            console.log(err)
            console.log('Servas numire')
        })
    }
 
    return (
        <>
            <Header />
            <div className="container">
                <h1>Naujas Postas</h1>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" onChange={handleFormChange} />
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" name="description" onChange={handleFormChange} />
                    </div>
                    <button type="submit">Siųsti</button>
                </form> 
            </div>
        </>
    )
}

export default NewPost