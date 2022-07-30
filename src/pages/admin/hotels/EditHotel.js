import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const EditHotel = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        price: '',
        photo: '',
        travel_duration: '',
        country_id: 0
    })
    const [image, setImage] = useState('')
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
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

        axios.get('/api/countries')
        .then(resp => {
            setLoading(false)
            setCountries(resp.data.message)
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
            //navigate('/login')
        })

        axios.get('/api/hotels/' + id)
        .then(resp => {
            setLoading(false)
            setForm({
                name: resp.data.message[0].name,
                price: resp.data.message[0].price,
                photo: '',
                travel_duration: resp.data.message[0].travel_duration,
                country_id: resp.data.message[0].country_id || ''
            })
            if(resp.data.message[0].photo)
                setImage('http://localhost:8000' + resp.data.message[0].photo)
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
            //navigate('/login')
        })
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        
        let formData = new FormData()
        for(const key of Object.keys(form)) {
            formData.append(key, form[key])
        }

        axios.post('/api/hotels/' + id, formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', 
            }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'Viešbutis sėkmingai išssaugotas', status: 'success'})
                setTimeout(() => navigate('/admin/hotels'), 2000)
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
                        <h2>Viešbučio redagavimas</h2>
                    </div>
                </div>
                <Message value={message} />
                <form className="editHotelForm" onSubmit={handleFormSubmit}>
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
                        {image && <img className="previewImage" src={image} />}
                    </div>
                    <div className="form-group">
                        <label>Kelionės trukmė:</label>
                        <input type="text" name="travel_duration" className="form-control" onChange={handleFormChange} value={form.travel_duration} />
                    </div>
                    <div className="form-group">
                        <label>Šalis:</label>
                        <select name="country_id" className="form-control" onChange={handleFormChange} value={form.country_id}>
                            <option value="0">Pasirinkite šalį</option>
                            {countries.map(country => <option key={country.id} value={country.id}>{country.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Siųsti</button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default EditHotel