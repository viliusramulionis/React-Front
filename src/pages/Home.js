import Header from '../components/header/Header'
import HotelList from '../components/hotelList/HotelList'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Home = () => {

    const [hotels, setHotels] = useState([])

    useEffect(() => {
        //const token = localStorage.getItem('token')

        axios.get('http://localhost:8000/api/hotels')
        .then(resp => {
            if(resp.data.success) {
                setHotels(resp.data.message)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [hotels])

    return (
        <>
            <Header />
            <div className="container">
                {hotels ? <HotelList hotels={hotels} /> : (
                    <h2>Nėra sukurtų jokių viešbučių</h2>
                )}
            </div>
        </>
    )
}

export default Home