import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/header/Header'
import axios from 'axios'

const Hotels = () => {
    const [hotels, setHotels] = useState([])
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('http://localhost:8000/api/hotels', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setLoading(false)
            setHotels(resp.data.message)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            //navigate('/login')
        })
    }, [navigate, token])

    return (
        <>
            <Header />
            {loading && ( <div className="loading">Kraunasi...</div> )}
            <div className="pt-5 container">
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <h2>Viešbučiai</h2> 
                        <button type="button" className="btn btn-primary ml-auto">Naujas Viešbutis</button>
                    </div>
                </div>  
            
                {message && <div class="alert">{message}</div>}
                {hotels.length > 0 ? (
                    <table>
                        <thead>
                            <th>Nuotrauka</th>
                            <th>Pavadinimas</th>
                            <th>Kaina</th>
                            <th>Trukmė</th>
                            <th>Šalis</th>
                        </thead>
                        <tbody>
                        {hotels.map(hotel => (
                            <tr>
                                <td><img src={hotel.photo} alt={hotel.name} /></td>
                                <td>{hotel.name}</td>
                                <td>{hotel.price}</td>
                                <td>{hotel.travel_duration}</td>
                                <td>
                                    {/* <button onClick={() => handleDelete(hotel.id)}>Trinti</button>
                                    <button onClick={() => handleEdit(order.id)}>Patvirtinti</button> */}
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