import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            axios.post('http://localhost:8000/api/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user_role')
                navigate('/')
            })
            .catch(err => {
                console.log(err)
                navigate('/')
            })
        }
    }, [navigate])
}

export default Logout;