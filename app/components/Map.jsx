import React,{useEffect} from 'react';
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const Map = ({stadium}) =>{

    useEffect(() => {
       
        const map = L.map('map', {
            center: [40.50955,22.98894],
            zoom: 13
        });
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);
        const icon = L.icon({iconUrl:'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png', iconSize: [25, 41]})
        const marker=L.marker([40.50955,22.98894],{icon}).bindPopup('Here is the stadium '+stadium.name +'<br/>' +
            'The coodinates is 40.50955,22.98894'+'<br/>'
             +'You can use the coords to find the place in ' +'<a href='+'https://www.google.com/maps'+'>' +'g-maps'+'</a>').addTo(map);
        marker.openPopup()
       
      }, [stadium.name]);
   return (
       <div id='map' style={{width :'100%', height:'100%', position:'absolute'}}/>
   )
}

export default Map;