'use client'
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';

interface LocationSelectProps {
  values?: any;
  onChange: (value: any) => void;
}


const AutocompletePlaces: React.FC<LocationSelectProps> = ({values, onChange}) => {
  
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  const handleInputChange = () => {
    if (!placeAutocomplete || !inputRef.current) return;

    const inputValue = inputRef.current.value;
    console.log("Input Value:", inputValue);
  };

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address']
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;
    
  
    placeAutocomplete.addListener('place_changed', () => {
      
      
      getGeocode({ address: placeAutocomplete.getPlace().formatted_address }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });

        onChange({address: placeAutocomplete.getPlace().formatted_address, lat: lat,  lng:lng});
      });

      
    });
  }, [onChange, placeAutocomplete]);

  return (
    <>
    <div className="autocomplete-container">
      <input ref={inputRef} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"/>
    </div>
    </>
  );
};


export default AutocompletePlaces