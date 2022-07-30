import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('user_role')

        if(token && role) {
            setUser({
                loggedIn: true,
                token,
                role
            })
        }
    }, [])

    return (
        <header>
            <div className="container d-flex">
                <div className="logo"><h1>Logo</h1></div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        {!user.loggedIn && (
                            <>
                                <li><Link to="/login">Prisijungti</Link></li>
                                <li><Link to="/register">Registruotis</Link></li>
                            </>
                        )}
                        {user.loggedIn && (
                            <>
                                <li><Link to="/orders">Jūsų užsakymai</Link></li>
                                <li><Link to="/logout">Atsijungti</Link></li>
                            </>
                        )}
                        {user.loggedIn && user.role === '0' && (
                            <>
                                <li>
                                    <Link to="/admin/orders">Administratorius</Link>
                                    <ul>
                                        <li><Link to="/admin/orders">Užsakymai</Link></li>
                                        <li><Link to="/admin/hotels">Viešbučiai</Link></li>
                                        <li><Link to="/admin/countries">Šalys</Link></li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header