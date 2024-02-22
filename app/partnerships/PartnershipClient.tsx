"use client"
import { useCallback, useState } from 'react';

import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import { SafeUser } from '@/app/types';
import ListingRow from '../components/listings/ListingRow';


import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';

interface ListingContainerProps {
    listings?: any
    currentUser?: SafeUser | null
  }

const ListingsContainer: React.FC<ListingContainerProps> = ({ listings, currentUser }) => {
  
  const [filterIsOpen, setIsOpen] = useState(false);
  const [sortedListings, setListings] = useState(listings)

  const sortListingsByAlphabet = () => {
    if (listings) {
      const newSortedListings = [...listings].sort((a: any, b: any) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) { 
          return -1;
        } 
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
      
      //important to create new warray using the [...] so it actually rerenders
      setListings(newSortedListings)
    }
    
    console.log("SDFSD")
  }


  const sortListingsByCategory = () => {
    if (listings) {
      const newSortedListings = [...listings].sort((a: any, b: any) => {
        const categoryA = a.category.toLowerCase();
        const categoryB = b.category.toLowerCase();
        if (categoryA < categoryB) { 
          return -1;
        } 
        if (categoryA > categoryB) {
          return 1;
        }
        return 0;
      });
      
      setListings(newSortedListings);
    }
  }
  
  const sortListingsByLocation = () => {
    if (listings) {
      const newSortedListings = [...listings].sort((a: any, b: any) => {
        const locationValueA = a.locationValue.toLowerCase();
        const locationValueB = b.locationValue.toLowerCase();
        if (locationValueA < locationValueB) { 
          return -1;
        } 
        if (locationValueA > locationValueB) {
          return 1;
        }
        return 0;
      });
      
      setListings(newSortedListings);
    }
  }

  const sortListingsByOrganization = () => {
    if (listings) {
      const newSortedListings = [...listings].sort((a: any, b: any) => {
        const organizationA = a.typeOfOrganization.toLowerCase();
        const organizationB = b.typeOfOrganization.toLowerCase();
        if (organizationA < organizationB) { 
          return -1;
        } 
        if (organizationA > organizationB) {
          return 1;
        }
        return 0;
      });
      
      setListings(newSortedListings);
    }
  }
  


  return (
    <>
      <div className="flex space-x-4"> {/* Flex container with horizontal spacing */}
        <div 
          onClick={sortListingsByAlphabet}
          className="
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Sort by Alphabet
        </div>

        {/* Add two more buttons with similar styling */}
        <div 
          onClick={sortListingsByOrganization}
          className="
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Sort By Type of Organization
        </div>

        <div 
          onClick={sortListingsByCategory}
          className="
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Sort By Resources Available
        </div>

        <div 
          onClick={sortListingsByLocation}
          className="
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Sort By Location
        </div>
      </div>

      <div style={{ width: '100%', borderBottom: '1px solid light grey' }}></div>

    <Container>
      <div 
        className="
          pt-4
          flex
          flex-wrap
          justify-start
          gap-8
        "
      >
        {sortedListings.map((listing: any) => (
          <ListingRow
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
