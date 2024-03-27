'use client';

import { useRouter } from "next/navigation";
import Globe from 'react-globe.gl';
import Button from "./Button";
import Heading from "./Heading";
import useLoginModal from "../hooks/useLoginModal";



const LandingState = ({}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const collegeLocations = [
    // North America
    { lat: 37.7749, lng: -122.4194, name: "San Francisco State University", continent: "North America" },
    { lat: 34.0224, lng: -118.2851, name: "University of Southern California", continent: "North America" },
    { lat: 40.7128, lng: -74.0060, name: "New York University", continent: "North America" },
    // Europe
    { lat: 51.5074, lng: -0.1278, name: "University College London", continent: "Europe" },
    { lat: 48.8566, lng: 2.3522, name: "Sorbonne University", continent: "Europe" },
    { lat: 51.5255, lng: -0.1336, name: "Imperial College London", continent: "Europe" },
    // Asia
    { lat: 35.6895, lng: 139.6917, name: "University of Tokyo", continent: "Asia" },
    { lat: 22.3193, lng: 114.1694, name: "University of Hong Kong", continent: "Asia" },
    { lat: 1.3521, lng: 103.8198, name: "National University of Singapore", continent: "Asia" },
    // Africa
    { lat: -1.2921, lng: 36.8219, name: "University of Nairobi", continent: "Africa" },
    { lat: -33.9180, lng: 18.4232, name: "University of Cape Town", continent: "Africa" },
    { lat: 9.0820, lng: 8.6753, name: "University of Lagos", continent: "Africa" },
    // South America
    { lat: -23.5505, lng: -46.6333, name: "University of Sao Paulo", continent: "South America" },
    { lat: -12.0464, lng: -77.0428, name: "National University of San Marcos", continent: "South America" },
    { lat: -34.6037, lng: -58.3816, name: "University of Buenos Aires", continent: "South America" },
    // Oceania
    { lat: -37.8136, lng: 144.9631, name: "University of Melbourne", continent: "Oceania" },
    { lat: -33.8688, lng: 151.2093, name: "University of Sydney", continent: "Oceania" },
    { lat: -36.8485, lng: 174.7633, name: "University of Auckland", continent: "Oceania" },
    // Add more colleges across different continents as needed
  ];
  
  // Function to assign colors based on continent
  const getColorByContinent = (continent: any) => {
    switch (continent) {
      case "North America":
        return "blue";
      case "Europe":
        return "green";
      case "Asia":
        return "red";
      case "Africa":
        return "yellow";
      case "Oceania":
        return "orange"
      default:
        return "gray";
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden lg:flex">
        {/* Globe Section */}
        <div className="lg:w-2/3 bg-gray-200 flex items-center justify-center">
          <div className="z-0 h-1/3 w-96 flex items-center justify-center">
            <Globe
              width={550}
              height={550}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              pointsData={collegeLocations}
              pointRadius={0.8}
              pointAltitude={0.01}
              pointColor={(point: any) => getColorByContinent(point.continent)}
            />
          </div>
        </div>
        {/* Information Section */}
        <div className="z-10 p-8 lg:w-1/2 bg-gray-100">
          <div className="max-w-md mx-auto pt-16">
            <Heading
              title="Welcome to Community Connect"
              subtitle="Where amazing things happen"
              center={false}
            />
            <p className="text-lg mb-4 pt-16">
              Explore different businesses, organizations, agencies, or schools.
              Connect with the people near you, or across the world. Build your community.
            </p>
            <Button label="Get Started" onClick={loginModal.onOpen} />
            <p className="text-sm mt-4">Any questions? Contact us at <a href="mailto:info@communityconnect.com">info@communityconnect.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LandingState;