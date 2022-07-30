import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/header/Header'
import axios from 'axios'

const NewHotel = () => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        photo: '',
        travel_duration: '',
        country_id: 0
    })
    const [message, setMessage] = useState('')
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const handleFormChange = (e) => {
        if(e.target.name === 'photo')
            setForm({ ...form, [e.target.name]: e.target.files[0] })
        else
            setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setLoading(true)

        axios.get('http://localhost:8000/api/countries')
        .then(resp => {
            setLoading(false)
            setCountries(resp.data.message)
        })
        .catch(err => {
            setLoading(false)
            setMessage(err.response.data.message)
        })
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        let formData = new FormData()
        for(const key of Object.keys(form)) {
            formData.append(key, form[key])
        }

        axios.post('http://localhost:8000/api/hotels', formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', 
            }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                //navigate('/')
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if (err.response.data)
                setMessage(err.response.data.message)
            else
                setMessage('Serveris miręs')
        })
    }

    return (
        <>
            <Header />
            {loading && (<div className="loading">Kraunasi...</div>)}
            <div className="pt-5 container">
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <h2>Naujas Viešbutis</h2>
                    </div>
                </div>
                {message && <div className="alert">{message}</div>}
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Viešbučio pavadinimas:</label>
                        <input type="text" name="name" className="form-control" onChange={handleFormChange} value={form.name} />
                    </div>
                    <div className="form-group">
                        <label>Kaina:</label>
                        <input type="number" name="price" className="form-control" onChange={handleFormChange} value={form.price} />
                    </div>
                    <div className="form-group">
                        <label>Nuotrauka:</label>
                        <input type="file" name="photo" className="form-control-file" onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label>Kelionės trukmė:</label>
                        <input type="text" name="travel_duration" className="form-control" onChange={handleFormChange} value={form.travel_duration} />
                    </div>
                    <div className="form-group">
                        <label>Šalis:</label>
                        <select name="country_id" className="form-control" onChange={handleFormChange}>
                            <option value="0">Pasirinkite šalį</option>
                            {countries.map(country => <option value={country.id}>{country.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" class="btn btn-primary">Siųsti</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewHotel