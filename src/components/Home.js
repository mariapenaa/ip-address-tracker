
import React, {useEffect, useState} from 'react'
import './Home.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import RoomIcon from '@material-ui/icons/Room';
import L from 'leaflet';
import {iconPerson} from './Icon'

const Home = () => {
    const endpoint = 'https://geo.ipify.org/api/v2/country,city?apiKey='+process.env.REACT_APP_API_KEY
    const [data, setData] = useState('')
    const [text, setText] = useState('Loading')
    const [ip, setIP] = useState('')
    const [domain, setDomain] = useState(false)
    const [backspace, setBackspace] = useState(false)


    useEffect(() => {
        fetchData(endpoint).then(response => {
            if(response.ip){
                setData(response)
                setIP(response.ip)
                console.log(response)
            }
        })
    }, [])

    const fetchData = async (ep) => {
        const res = await fetch(ep)
        const json = await res.json()
        return json
    }

    const findIP = () => {
        setIP('')
        setData('')
        let added;


            added = '&ipAddress='+ip+'&domain='+ip;
    

        console.log(endpoint+added)
        fetchData(endpoint+added).then(response => {
            if(response.ip){
                setData(response)
                setText('')
            }else if(response.code === 422){
                console.log(response)
                setText(response.messages)
                setData('')
            }else{
                setText('Error loading')
                setData('')
            }
            console.log(response)
        })
    }

    const ipChange = (e) => {

            if(!backspace){
                if(!isNaN(e.target.value) || (e.target.value.length > 3 && !isNaN(e.target.value[0]) && !isNaN(e.target.value[1]) && !isNaN(e.target.value[2])  )){
                    console.log(e.target.value)
                     if(e.target.value.length != 3 && e.target.value.length != 7 && e.target.value.length != 11 && e.target.value.length < 16  ){
                        setIP(e.target.value)
                    }else if(e.target.value.length < 16){
                        setIP(e.target.value+'.')
                    } 
                    setDomain(false)
                }else{
                    setIP(e.target.value)
                    setDomain(true)
                }
            }else{
                setIP(e.target.value)
            }
    }

    return (
    <div className="mainContainer">
        <div className="subContainer">
            <div className="input-container d-flex justify-content-center align-items-center">
                <p className="m-0 title">IP Address Tracker</p>
                <div className="inputDiv">
                    <input placeholder="Search IP Address or domain" value={ip} type="text" onKeyDown={(e)=>e.which === 8 ? setBackspace(true) : setBackspace(false)} onChange={(event)=> ipChange(event)}/>
                    <button onClick={findIP} type="button"><ChevronRightIcon className="icon" /></button>
                </div>
            {data != '' ? 
                <div className="card d-flex justify-content-center">
                    <div className=" my-2 d-flex justify-content-center">
                        <p className="subtitle mb-0">Ip Address</p>
                        <p className="blackTitle mb-0">{data.ip}</p>
                    </div>
                    <div className="vr"></div>
                    <div className=" my-2 d-flex justify-content-center borderLeft">
                        <p className="subtitle mb-0">Location</p>
                        <p className="blackTitle mb-0">{data.location.region}, {data.location.country}</p>
                    </div>
                    <div className="vr"></div>
                    <div className=" my-2 d-flex justify-content-center borderLeft">
                        <p className="subtitle mb-0">Timezone</p>
                        <p className="blackTitle mb-0">UTC {data.location.timezone}</p>
                    </div>
                    <div className="vr"></div>
                    <div className=" my-2 d-flex justify-content-center borderLeft">
                        <p className="subtitle mb-0">Isp</p>
                        <p className="blackTitle mb-0">{data.isp}</p>
                    </div>
                </div> : 
                <div className="card d-flex justify-content-center" style={{height:'40vh', padding:'1rem'}}>
                    <p className="blackTitle">{text}</p>
                </div>
            }
            </div>
        </div>
        <div id="map">
            {data != '' ?
            <div>
                <MapContainer center={[data.location.lat+0.0025,data.location.lng]} zoom={16} scrollWheelZoom={true} zoomControl={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[data.location.lat,data.location.lng]} icon={iconPerson}>
                        {/* <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup> */}
                        <RoomIcon />
                    </Marker>
                </MapContainer> 
            </div> : <div></div>
            }
        </div>
    </div>
    );
}

export default Home;
