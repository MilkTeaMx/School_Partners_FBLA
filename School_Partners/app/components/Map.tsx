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
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MyMap: React.FC<MapProps> = ({ position }) => {
  
  const [open, setOpen] = useState(false);

  return (
    <>
    <APIProvider apiKey={"AIzaSyDR9EOvqsmZ6VCotCRuyg86KGLNewtAoGI"}>
      <div className='h-96'>
        <Map zoom={9} center={position} mapId={"AIzaSyDR9EOvqsmZ6VCotCRuyg86KGLNewtAoGI"}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p> Location </p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
    </>
  );
}
export default MyMap