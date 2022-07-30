import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header/Header'
import Message from '../components/message/Message'
import axios from 'axios'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        axios.get('/api/orders/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setLoading(false)
            setOrders(resp.data.message)
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

    return (
        <> 
            <Header />
            {loading && ( <div className="loading">Kraunasi...</div> )}
            <div className="pt-5 container">
                <div className="row mb-5">
                    <div className="col-md-12">
                        <h2>Jūsų užsakymai</h2> 
                    </div>
                </div>  
                <Message value={message} />
                {orders.length > 0 ? (
                    <table className="table bg-light table-bordered">
                        <thead>
                            <tr>
                                <th>Viešbutis</th>
                                <th>Kaina</th>
                                <th>Trukme</th>
                                <th>Šalis</th>
                                <th>Statusas</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.hotel_name}</td>
                                <td>{order.price}</td>
                                <td>{order.travel_duration}</td>
                                <td>{order.country_name}</td>
                                <td>{order.approved === 0 ? 'Nepatvirtintas' : 'Patvirtintas' }</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">Dar nesukūrėte jokių užsakymų</h5> }
            </div>
        </>
    )
}

export default Orders