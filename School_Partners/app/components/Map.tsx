'use client';

import { useMemo, useState } from 'react';
import { Status, Wrapper } from '@googlemaps/react-wrapper';


import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

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

const MyMap: React.FC<MapProps> = ({ position, listings }) => {
  
  const [open, setOpen] = useState(false);

  //If only one position
  if (position != null && listings == null) {
    return (
      <>
      <APIProvider apiKey={"AIzaSyCRBTWSv2ba1wJUY0RBDptXf7KD8h--zqE"}>
        <div className='h-96'>
          <Map defaultZoom={9} defaultCenter={position} mapId={"ffe9c9316b601969"}>
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
  
  return (
    <></>
  )
}
export default MyMap