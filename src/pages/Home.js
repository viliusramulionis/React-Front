import Header from '../components/header/Header'
import HotelList from '../components/hotelList/HotelList'
import Message from '../components/message/Message'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [hotels, setHotels] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })

    useEffect(() => {
        //const token = localStorage.getItem('token')
        setLoading(true)
        axios.get('/api/hotels')
        .then(resp => {
            setLoading(false)
            if(resp.data.success) {
                setHotels(resp.data.message)
            }
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
        })
    }, [])

    return (
        <>
            <Header />
            {loading && ( <div className="loading">Kraunasi...</div> )}
            <div className="container">
                <Message value={message} />
                {hotels ? <HotelList hotels={hotels} /> : (
                    <h2>Nėra sukurtų jokių viešbučių</h2>
                )}
            </div>
        </>
    )
}

export default Home