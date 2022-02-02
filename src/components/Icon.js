import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('../images/pin.png'),
    iconRetinaUrl: require('../images/pin.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
});

export  {iconPerson};