import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/header/Header'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(false)
        const token = localStorage.getItem('token')

        if(token) {
            navigate('/')
        }
    }, [navigate])

    const handleFormChange = (e) => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('http://localhost:8000/api/login', loginForm)
        .then(resp => {
            setLoading(false)
            if(resp.status === 200) {
                localStorage.setItem('token', resp.data.message.token)
                localStorage.setItem('user_role', resp.data.message.role)
                navigate('/')
            }
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setError(err.response.data.message)
            else 
                setError('Serveris miręs')
        })
    }
 
    return (
        <>
            {loading && ( <div className="loading">Kraunasi...</div> )}
            <Header />
            <main className="text-center loginForm">
                <div className="form-signin w-100 m-auto">
                    <h1 className="h3 mb-3 fw-normal">Prisijungti</h1>
                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-floating">
                            <input type="email" className="form-control" name="email" onChange={handleFormChange} placeholder="name@example.com" />
                            <label>El. pašto adresas</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" name="password" onChange={handleFormChange} placeholder="Slaptažodis" />
                            <label>Slaptažodis</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Prisijungti</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
                    </form> 
                </div>
            </main>
        </>
    )
}

export default Login