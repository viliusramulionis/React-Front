import './HotelCard.css'

const HotelCard = (props) => {
    const data = props.data
    const url = 'http://localhost:8000' + data.photo
    return (
        <div class="box">
            <h2>{data.name}</h2>
            <img src={url} alt={data.name} />
            <div class="price">{data.price}</div>
            <div class="duration">{data.travel_duration}</div>
        </div>
    )
}

export default HotelCard