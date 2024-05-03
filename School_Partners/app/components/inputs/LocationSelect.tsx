'use client';

import Select from 'react-select'

import useCountries from '@/app/hooks/useCountries';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import {useState, useMemo} from "react"

import {ComboBox, Item, Section} from '@adobe/react-spectrum'
import useOnclickOutside from 'react-cool-onclickoutside';


interface LocationSelectProps {
  values?: any;
  onChange: (value: any) => void;
}


const Places: React.FC<LocationSelectProps> = ({values, onChange}) => {

  const libraries = useMemo(() => ['places'], []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCRBTWSv2ba1wJUY0RBDptXf7KD8h--zqE",
    libraries: libraries as any,
  });


  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
 

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    
  };

  const handleSelect = ({ description }: any) =>() => {
     
      setValue(description, false);
      
      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        //console.log("📍 Coordinates: ", { lat, lng });

        onChange({lat, lng, description})
    
      });

      
    };
  
    const renderSuggestions = () =>
  data.map((suggestion) => {
    const {
      place_id,
      structured_formatting: { main_text, secondary_text },
    } = suggestion;

    return (
      <li key={place_id} onClick={handleSelect(suggestion)} className="cursor-pointer hover:bg-gray-100 p-1 border border-gray-200 rounded-md">
      <div className="p-1">
        <div className="text-base font-semibold">{main_text}</div>
        <div className="text-xs text-gray-600">{secondary_text}</div>
      </div>
    </li>
    );
  });

  if (!isLoaded) return <div>Loading...</div>;
 
  return (
    <div className="z-10">
      <input
        id="inputField"
        value={value}
        onChange={handleInput}
        placeholder="Where is it located?"
        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {<ul className="mt-2 overflow-y-auto max-h-40 ">{renderSuggestions()}</ul>}
    </div>
  );
};

export default Places;