import HotelCard from '../hotelCard/HotelCard'
import './HotelList.css'

const HotelsList = (props) => {
    const hotels = props.hotels

    return (
        <div className="hotelList">
            {hotels.map(hotel => <HotelCard key={hotel.id} data={hotel} />)}
        </div>
    )
}

export default HotelsList