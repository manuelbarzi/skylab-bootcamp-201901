import React, { useState, useEffect } from "react";
import './index.sass'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer, InfoWindow } from "react-google-maps"
import { func } from "prop-types";

function Maps({ handlePlaceUbication }) {

    const [userUbication, setUserUbication] = useState(false) // de momento no se utiliza

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setUserUbication(position)
            debugger
        })
    }, [])


    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 41.40177588441426, lng: 2.200207937834165 }}
        >
            {userUbication &&
                <Marker position={{ lat: userUbication.coords.latitude, lng: userUbication.coords.longitude }} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }} >
                    <InfoWindow>
                        <span>You're here!</span>
                    </InfoWindow>
                </Marker>
            }

            <Marker position={{ lat: 41.39404704231163, lng: 2.1970611184605673 }} onClick={() => handlePlaceUbication('Carrer Àlaba Pàdel Nova Icària 08071 Barcelona')} >
                <InfoWindow>
                    <span>
                        <h1>Store 2</h1>
                        <p>Carrer d'Àlaba, Pàdel Nova Icària, 08071 Barcelona, España</p>
                    </span>
                </InfoWindow>
            </Marker>

            <Marker position={{ lat: 41.4037255, lng: 2.2057369 }} title='holaa' onClick={() => handlePlaceUbication('Carrer de Llull 182 0805 Barcelona')} >
                <InfoWindow>
                    <span>
                        <h1>Store 2</h1>
                        <p>Carrer de Llull 182 0805 Barcelona</p>
                    </span>
                </InfoWindow>
            </Marker>
        </GoogleMap >
    ))

    return (
        <section className='g-Order__map' >
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAeQaJ0WROB5TGpLn8G8ErZM44oXQpEkyw"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `450px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </section>
    )
}

export default Maps

