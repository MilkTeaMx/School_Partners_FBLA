"use client"
import { useState } from 'react';

import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import { SafeUser } from '@/app/types';

interface ListingContainerProps {
    listings?: any
    currentUser?: SafeUser | null
  }

const ListingsContainer: React.FC<ListingContainerProps> = ({ listings, currentUser }) => {
  
  const [toggleViewMode, setToggleViewMode] = useState(false);
  
  return (
    <>

    <Container>
      <div 
        className="
          pt-24
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
    </>
  );
};

export default ListingsContainer;
