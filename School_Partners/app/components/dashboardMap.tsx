'use client';

import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import { Status, Wrapper } from '@googlemaps/react-wrapper';


import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";




// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

type LatLng = {
  lat: number;
  lng: number;
};

interface MapProps {
  position?: LatLng;
  listings?: any;
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MyDashboardMap: React.FC<MapProps> = ({ position, listings }) => {
  
  const [openInfoWindows, setOpenInfoWindows] = useState<{ [key: string]: boolean }>({});
  const handleMarkerClick = (title: string) => {
    setOpenInfoWindows(prevState => ({
      ...prevState,
      [title]: !prevState[title], // Toggle the state for the clicked listing title
    }));
  };

  //If want to be able to move
  return (
    <>
    <APIProvider apiKey={""}>
      <div className='h-96'>
         <Map defaultZoom={9} defaultCenter={{lat: 42.58, lng: -83.23}} mapId={"your-map-id"}>
            {listings.map((listing:any) => (
              <AdvancedMarker key={listing.id} position={{ lat: listing.lat, lng: listing.lng }} onClick={() => handleMarkerClick(listing.title)}>
              <Pin background={"grey"} borderColor={"red"} glyphColor={"white"} />
              </AdvancedMarker>
            ))}

            
            {listings.map((listing:any) => (
              openInfoWindows[listing.title] && (
                <InfoWindow
                  key={listing.id}
                  position={{ lat: listing.lat, lng: listing.lng }}
                  onCloseClick={() => handleMarkerClick(listing.title)}
                >
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <p className="text-md font-semibold">{listing.title}</p>
                    <p className="text-gray-600 mb-1">{listing.category}</p>
                    <p className="text-xs text-gray-600 mb-1">{listing.location}</p>
                    <p className="text-xs text-gray-700">{listing.description}</p>
                  </div>
                </InfoWindow>
              )))}
        </Map>

      </div>
    </APIProvider>
    </>
  );

}
export default MyDashboardMap