import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import axios from 'axios'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('http://localhost:8000/api/orders/all', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setOrders(resp.data.message)
        })
        .catch(err => {
            console.log(err)
            navigate('/login')
        })
    }, [navigate, token])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8000/api/orders/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setMessage(resp.data.message)
        })
        .catch(err => {
            navigate('/login')
        })
    }

    const handleStatus = (id) => {

    }


    return (
        <> 
            <Header />
            <div className="pt-5 container">
                <h2>Gauti užsakymai</h2>
                {message && (
                    <div className="alert">{message}</div>
                )}
                {orders.length > 0 ? (
                    <table>
                        <thead>
                            <th>Viešbutis</th>
                            <th>Kaina</th>
                            <th>Trukme</th>
                            <th>Šalis</th>
                            <th>Statusas</th>
                            <th>Veiksmai</th>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr>
                                <td>{order.hotel_name}</td>
                                <td>{order.price}</td>
                                <td>{order.travel_duration}</td>
                                <td>{order.country_name}</td>
                                <td>{order.approved === 0 ? 'Nepatvirtintas' : 'Patvirtintas' }</td>
                                <td>
                                    <button onClick={() => handleDelete(order.id)}>Trinti</button>
                                    <button onClick={() => handleStatus(order.id)}>Patvirtinti</button>
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

export default Orders