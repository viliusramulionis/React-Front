import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const NewCountry = () => {
    const [form, setForm] = useState({
        name: '',
        season: ''
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        axios.post('/api/countries', form, {
            headers: { 
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'Šalis sėkmingai išssaugota', status: 'success'})
                setTimeout(() => navigate('/admin/countries'), 2000)
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
        })
    }

    return (
        <>
            <Header />
            {loading && (<div className="loading">Kraunasi...</div>)}
            <div className="pt-5 container">
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <h2>Nauja šalis</h2>
                    </div>
                </div>
                <Message value={message} />
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Šalies pavadinimas:</label>
                        <input type="text" name="name" className="form-control" onChange={handleFormChange} value={form.name} />
                    </div>
                    <div className="form-group">
                        <label>Sezonas:</label>
                        <input type="text" name="season" className="form-control" onChange={handleFormChange} value={form.season} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Siųsti</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewCountry