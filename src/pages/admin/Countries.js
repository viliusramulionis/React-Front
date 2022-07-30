import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import axios from 'axios'

const Countries = () => {
    return (
        <>
            <Header />
            <div className="pt-5 container">
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <h2>Šalys</h2> 
                        <button type="button" className="btn btn-primary ml-auto">Nauja Šalis</button>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default Countries