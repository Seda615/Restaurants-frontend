import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import Service from "../../core/service";
import { RESTAURANTS_PATH } from "../../core/constants";

const CustomMarker = ({ setIsOpenTooltip, restaurant }) => (
    <div 
        onMouseEnter={() => setIsOpenTooltip(true)} 
        onMouseLeave={() => setIsOpenTooltip(false)}
        className="marker"
    >
        <Link to={{pathname: "/about", state: {restaurant}}}>
            <FaMapMarkerAlt style={{width: '30px', height: '30px', color: 'red'}} />
        </Link>
    </div>
)
   

const Tooltip = ({ name }) => (
    <div className="tooltip"><p>{name}</p></div>
)

function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [isOpenTooltip, setIsOpenTooltip] = useState(false);
    const [error, setError] = useState('')

    const [restaurant, setRestaurant] = useState({
        location: {
            address: '1600 Amphitheatre Parkway, Mountain View, california.',
            lat: "37.42216",
            lng: "-122.08427",
          },
          name: 'restaurant'
    })

    useEffect(() => {
        Service.request(
            RESTAURANTS_PATH,
            '',
            'GET',
            null,
            (rest) => setRestaurants(rest.restaurants),
            (error => setError(error))
        )
    }, [])
    
    return (
        <div className={'container flex'}>
            {error ? <p>{error}</p> : null}
            <div className="restaurants-list">
                {restaurants
                .sort((rest1, rest2) => rest1.rate - rest2.rate)
                .map(restaurant => (
                    <div key={restaurant.id} className="restaurant-name">
                        <p onClick={() => {setRestaurant(restaurant)}}>{restaurant.name}</p>
                            {[...Array(restaurant.rate)].map((v, id) => {        
                                return (         
                                    <FaStar color="orange" key={id}/>       
                                );
                            })}
                        <Link to={{pathname: "/about", state: {restaurant}}}>about</Link>
                    </div>
                ))}
            </div>
            <div style={{ height: '500px', width: '50%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyC3E9I6SD44NpXMhmRPDXGwd6C690XBsXo'}}
                    center={{
                        lat: +restaurant.location.lat,
                        lng: +restaurant.location.lng,
                    }}
                    defaultZoom={17}
                >
                    <CustomMarker
                        lat={+restaurant.location.lat}
                        lng={+restaurant.location.lng}
                        restaurant={restaurant}
                        setIsOpenTooltip={setIsOpenTooltip}
                    />
                    {isOpenTooltip && 
                        <Tooltip lat={+restaurant.location.lat} lng={+restaurant.location.lng} name={restaurant.name}  /> 
                    }
                </GoogleMapReact>
            </div>
        </div>
    )
}

export default Restaurants