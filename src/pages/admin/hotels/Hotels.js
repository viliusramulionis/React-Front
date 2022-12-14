import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const Hotels = () => {
    const [hotels, setHotels] = useState([])
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
        axios.get('/api/hotels', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setLoading(false)
            setReload(false)
            setHotels(resp.data.message)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
            //navigate('/login')
        })
    }, [reload])

    const handleDelete = (id) => {
        console.log(id)
        setLoading(true)
        axios.delete('/api/hotels/' + id, {
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
            console.log(err)
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
                        <h2>Viešbučiai</h2> 
                        <Link to="/admin/hotels/new" className="btn btn-success ml-auto">Naujas Viešbutis</Link>
                    </div>
                </div>  
                <Message value={message} />
                {hotels.length > 0 ? (
                    <table className="table bg-light table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nuotrauka</th>
                                <th>Pavadinimas</th>
                                <th>Kaina</th>
                                <th>Trukmė</th>
                                <th>Šalis</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {hotels.map(hotel => (
                            <tr key={hotel.id}>
                                <td className="text-center">{hotel.id}</td>
                                <td className="hotelImage"><img src={hotel.photo} alt={hotel.name} /></td>
                                <td>{hotel.name}</td>
                                <td>{hotel.price}</td>
                                <td>{hotel.travel_duration}</td>
                                <td>{hotel.country}</td>
                                <td>    
                                    <p className="text-end">
                                        <button className="btn btn-danger me-2" onClick={() => handleDelete(hotel.id)}>Trinti</button>
                                        <Link to={'/admin/hotels/edit/' + hotel.id} className="btn btn-primary">Redaguoti</Link>
                                    </p>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">Nėra gauta jokių užsakymų</h5> }
            </div>
        </>
    )
}

export default Hotels