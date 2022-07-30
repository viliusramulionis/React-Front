import './HotelCard.css'

const HotelCard = (props) => {
    const { data, handleOrder } = props
    
    return (
        <div className="col hotelBox">
            <h3>{data.name}</h3>
            {data.photo && (
                <div className="photo">
                    <img src={data.photo} alt={data.name} className="img-fluid" />
                </div>
            )}
            <div className="mt-3 fs-5 price"><strong>€ {data.price}</strong></div>
            <div className="duration">Kelionės trukmė: {data.travel_duration}</div>
            <div className="country">Šalis: {data.country}</div>
            <div className="mt-2">
                <button className="btn btn-success" onClick={() => handleOrder(data.id)}>Užsakyti</button>
            </div>
        </div>
    )
}

export default HotelCard