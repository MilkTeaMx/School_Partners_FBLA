'use client';

import { useMemo, useState } from 'react';

import { FaSchool } from "react-icons/fa";

import schoolClipart from '../../public/images/schoolClipart.png'; // Import the image
import schoolsClipart from '../../public/images/Logo1.png'; // Import the image


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


const MyDashboardMap: React.FC<MapProps> = ({ position, listings }) => {
  
  const [openInfoWindows, setOpenInfoWindows] = useState<{ [key: string]: boolean }>({});
  const handleMarkerClick = (title: string) => {
    setOpenInfoWindows(prevState => ({
      ...prevState,
      [title]: !prevState[title], // Toggle the state for the clicked listing title
    }));
  };




  const customPinImage = "../public/images/schoolClipart.png"; // Path to your custom pin image

  const createCustomPinElement = () => {
    const img = document.createElement('img');
    img.src = customPinImage;
    img.style.width = '32px'; // Adjust the size as needed
    img.style.height = '32px';
    return img;
  };


  //If want to be able to move
  return (
    <>
    <APIProvider apiKey={"AIzaSyCLLAxKmD2GPvIdhRjd0MUZZ7_L6rgeBd4"}>
      <div className='h-96'>
         <Map defaultZoom={10} defaultCenter={{lat: 42.58, lng: -83.23}} mapId={"8e9104aca2da6600"}>

            <AdvancedMarker position={{lat: 42.58, lng: -83.23}} zIndex={10}>
              <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Round_Landmark_School_Icon_-_Transparent.svg/768px-Round_Landmark_School_Icon_-_Transparent.svg.png"} width={45} height={45} />
            </AdvancedMarker>

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
                  <div>
                    <h1 className="text-md font-semibold pb-6">{listing.title}</h1>
                    <p className=" mb-1">{listing.category}</p>

                    <p className="text-xs text-gray-400">{listing.description}</p>
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