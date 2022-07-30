import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const Countries = () => {
    const [countries, setCountries] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        axios.get('/api/countries', {
            headers: { Authorization: `Bearer ${token}` }
        })
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
    }, [reload])

    const handleDelete = (id) => {
        setLoading(true)
        axios.delete('/api/countries/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((resp) => {
            setLoading(false)
            setReload(true)
            setMessage({text: resp.data.message, status: 'success'})
            setTimeout(() => setMessage({text: '', status: ''}), 5000)
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
            //navigate('/login')
        })
    }

    return (
        <>
            <Header />
            {loading && ( <div className="loading">Kraunasi...</div> )}
            <div className="pt-5 container">
                <div className="row mb-5">
                    <div className="col-md-12 d-flex">
                        <h2>Šalys</h2> 
                        <Link to="/admin/countries/new" className="btn btn-primary ml-auto">Nauja Šalis</Link>
                    </div>
                </div>
                <Message value={message} />
                {countries.length > 0 ? (
                    <table className="table bg-light table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Šalis</th>
                                <th>Sezonas</th>
                            </tr>
                        </thead>
                        <tbody>
                        {countries.map(country => (
                            <tr key={country.id}>
                                <td>{country.id}</td>
                                <td>{country.name}</td>
                                <td>{country.season}</td>
                                <td>    
                                    <p className="text-end">
                                        <button className="btn btn-danger me-2" onClick={() => handleDelete(country.id)}>Trinti</button>
                                        <Link to={'/admin/countries/edit/' + country.id} className="btn btn-primary">Redaguoti</Link>
                                    </p>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">Kol kas nėra pridėta šalių</h5> }  
            </div>
        </>
    )
}

export default Countries