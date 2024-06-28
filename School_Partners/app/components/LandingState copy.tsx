'use client';

import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from "next/navigation";
import Globe from 'react-globe.gl';
import Button from './Button';
import Heading from './Heading';
import useLoginModal from '../hooks/useLoginModal';

const LandingPage = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const collegeLocations = [
    { lat: 37.7749, lng: -122.4194, name: 'San Francisco State University', continent: 'North America' },
    { lat: 34.0224, lng: -118.2851, name: 'University of Southern California', continent: 'North America' },
    { lat: 40.7128, lng: -74.0060, name: 'New York University', continent: 'North America' },
    { lat: 51.5074, lng: -0.1278, name: 'University College London', continent: 'Europe' },
    // Asia
    { lat: 35.6895, lng: 139.6917, name: "University of Tokyo", continent: "Asia" },
    { lat: 22.3193, lng: 114.1694, name: "University of Hong Kong", continent: "Asia" },
    { lat: 1.3521, lng: 103.8198, name: 'National University of Singapore', continent: 'Asia' },
    { lat: -1.2921, lng: 36.8219, name: 'University of Nairobi', continent: 'Africa' },
    { lat: -33.9180, lng: 18.4232, name: 'University of Cape Town', continent: 'Africa' },
    { lat: 9.0820, lng: 8.6753, name: 'University of Lagos', continent: 'Africa' },
    { lat: -23.5505, lng: -46.6333, name: 'University of Sao Paulo', continent: 'South America' },
    { lat: -12.0464, lng: -77.0428, name: 'National University of San Marcos', continent: 'South America' },
    { lat: -34.6037, lng: -58.3816, name: 'University of Buenos Aires', continent: 'South America' },
    { lat: -37.8136, lng: 144.9631, name: 'University of Melbourne', continent: 'Oceania' },
    { lat: -33.8688, lng: 151.2093, name: 'University of Sydney', continent: 'Oceania' },
    { lat: -36.8485, lng: 174.7633, name: 'University of Auckland', continent: 'Oceania' },
  ];
  
  const getColorByContinent = (continent: string) => {
    switch (continent) {
      case 'North America':
        return 'blue';
      case 'Europe':
        return 'green';
      case 'Asia':
        return 'red';
      case 'Africa':
        return 'yellow';
      case 'Oceania':
        return 'orange';
      default:
        return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto p-4 text-center"
      >
        <Heading
          title="Welcome to Community Connect"
          subtitle="Where amazing things happen"
          center={true}
        />
        <p className="text-lg mb-6">
          Explore different businesses, organizations, agencies, or schools.
          Connect with the people near you, or across the world. Build your community.
        </p>
      </motion.div>

      <div className="relative flex justify-center items-center w-full bg-white p-8 shadow-lg rounded-lg overflow-hidden">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full flex items-center justify-center"
        >
          <Globe
            width={600}
            height={600}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            pointsData={collegeLocations}
            pointRadius={0.8}
            pointAltitude={0.01}
            pointColor={(point: any) => getColorByContinent(point.continent)}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-10"
      >
        <Button label="Get Started" onClick={loginModal.onOpen} />
        <p className="text-sm mt-4">
          Any questions? Contact us at{' '}
          <a href="mailto:info@communityconnect.com" className="text-blue-500">
            info@communityconnect.com
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage;