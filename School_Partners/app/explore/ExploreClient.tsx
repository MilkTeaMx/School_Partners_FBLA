"use client";
import { useCallback, useEffect, useState } from 'react';
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import { SafeUser } from '@/app/types';
import Heading from '../components/Heading';
import PartnershipCard from './exploreCard'; // Import the PartnershipCard component
import { TypeAnimation } from 'react-type-animation';

interface ExploreContainerProps {
  listings?: any[];
  currentUser?: SafeUser | null;
}

const ExploreContainer: React.FC<ExploreContainerProps> = ({ listings = [], currentUser }) => {
  const [sortByDistance, setSortByDistance] = useState(false); // State to track sorting by distance
  const [showTopRecommended, setShowTopRecommended] = useState(false); // State to track showing top recommended
  const [filteredListings, setFilteredListings] = useState<any[]>(listings);

  console.log(listings);

  const handleSortByDistance = useCallback(() => {
    setSortByDistance(true);
    setShowTopRecommended(false);
  }, []);

  const handleShowTopRecommended = useCallback(async () => {
    setShowTopRecommended(true);
    setSortByDistance(false);

    try {
      const response = await fetch(`http://localhost:8080/recommendations?user_id=${currentUser?.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      const data = await response.json();
      console.log("SDFSF")
      console.log(listings)
      console.log(data); // Log fetched recommendations
      
      setFilteredListings(data); // Update listings with fetched recommendations
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setFilteredListings([]); // Clear listings on error
    }
  }, [currentUser?.id]);



  return (
    <Container>
       <div className="flex justify-between items-center mb-4">
    <p className="header-shadow text-2xl font-bold mb-4 text-gray-600">

      Explore Public Partnerships Created by     <TypeAnimation
              className="typeanimation header-shadow text-2xl text-gray-400 font-bold mb-4 underline"
              sequence={[
                "Businesses",
                1000,
                "Students",
                1000,
                "Teachers",
                1000,
                "Schools",
                1000,
              ]}
              speed={5}
              style={{
                fontFamily: 'Bebas Neue, sans-serif'
              }}
              repeat={Infinity}
            />
    </p>


    {/* Buttons for sorting */}
    <button
      className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${showTopRecommended ? 'bg-green-700' : ''}`}
      onClick={handleShowTopRecommended}
    > 
      Your Top Recommended
    </button>
  </div>
    <p className="text-center ml-4 text-lg font-semibold text-gray-600 position-absolute">Find some community favorites</p>

      {/* Render listings based on filteredListings */}
      <div className="space-y-4 pt-4">
        {filteredListings.length === 0 ? (
          <EmptyState />
        ) : (
          filteredListings.map((listing: any) => (
            <PartnershipCard key={listing.id} partnership={listing} />
          ))
        )}
      </div>
    </Container>
  );
};

export default ExploreContainer;
