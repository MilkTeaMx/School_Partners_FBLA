"use client"
import { useCallback, useState } from 'react';

import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import { SafeUser } from '@/app/types';
import ListingRow from '../components/listings/ListingRow';
import OpenableMenu from '../components/openableMenu';
import {categories} from '../components/navbar/Categories';
import { AiOutlineSearch } from 'react-icons/ai';
import { saveAs } from 'file-saver';

import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import Search from '../components/navbar/Search';

interface ListingContainerProps {
    listings?: any;
    currentUser?: SafeUser | null;
  }

const ListingsContainer: React.FC<ListingContainerProps> = ({ listings, currentUser }) => {
  
  const [filterIsOpen, setIsOpen] = useState(false);
  const [sortedListings, setListings] = useState<any[]>(listings)
  const [searchTerm, setSearchTerm] = useState('');


  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchTerm);
  };

  const handleChange = (event:any) => {
    const searchTerm = event.target.value.toLowerCase(); // Ensure the search term is in lowercase
    setSearchTerm(searchTerm)
    if (listings) {
      const newSearchedListings = listings.filter((listing:any) => 
        listing.title.toLowerCase().startsWith(searchTerm)
      );
      setListings(newSearchedListings);
    }
  };


  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + sortedListings.map(row => Object.values(row).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sortedListings.csv");
    document.body.appendChild(link);
    link.click();
  };

  const sortListingsByAlphabet = (reverseOrder=false) => {
    if (listings) {
      const newSortedListings = [...listings].sort((a: any, b: any) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) { 
          return reverseOrder ? 1 : -1;
        } 
        if (titleA > titleB) {
          return reverseOrder ? -1 : 1;
        }
        return 0;
      });
      
      //important to create new warray using the [...] so it actually rerenders
      setListings(newSortedListings)
    }
    
  }

  const sortListingsByCategory = (categoryParam: string) => {
    if (listings) {
      const newSortedListings = listings.filter((item: any) => {
        return item.category.toLowerCase() === categoryParam.toLowerCase();
      }).sort((a: any, b: any) => {
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
  
  const sortListingsByLocation = (reverseOrder: boolean) => {
    if (listings) {
      const newSortedListings = [...listings].sort((a: any, b: any) => {
        const locationValueA = a.locationValue.toLowerCase();
        const locationValueB = b.locationValue.toLowerCase();
        if (reverseOrder) {
          if (locationValueA < locationValueB) { 
            return 1;
          } 
          if (locationValueA > locationValueB) {
            return -1;
          }
        } else {
          if (locationValueA < locationValueB) { 
            return -1;
          } 
          if (locationValueA > locationValueB) {
            return 1;
          }
        }
        return 0;
      });
      
      setListings(newSortedListings);
    }
  }


  const sortListingsByOrganization = (startsWith: string) => {
    if (listings) {
      const newSortedListings = [...listings].filter((item: any) => {
        return item.typeOfOrganization.toLowerCase().startsWith(startsWith.toLowerCase());
      }).sort((a: any, b: any) => {
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
   
      <div className="z-10 fixed w-full flex flex-row items-center justify-between space-x-4 py-4 px-4"> {/* Flex container with horizontal spacing */}
      <div className="flex flex-row items-center space-x-4"> {/* Wrapper for OpenableMenu components */}
        <OpenableMenu
          title='Sort By Alphabet'
          option1="Ascending" option1Action={() => sortListingsByAlphabet(false)}
          option2="Descending" option2Action={() => sortListingsByAlphabet(true)}
        />

        <OpenableMenu
          title='Sort By Type of Organization'
          option1="Government" option1Action={() => sortListingsByOrganization("government")}
          option2="For-Profit" option2Action={() => sortListingsByOrganization("for")}
          option3="Non-Profit" option3Action={() => sortListingsByOrganization("non")}
        />

        <OpenableMenu
          title='Sort By Resources Available'
          option1="Scholarships" option1Action={() => sortListingsByCategory("Scholarships")}
          option2="Apprenticeships" option2Action={() => sortListingsByCategory("Apprenticeships")}
          option3="Discounts" option3Action={() => sortListingsByCategory("Discounts")}
          option4="Funding" option4Action={() => sortListingsByCategory("Funding")}
          option5="Field Trips" option5Action={() => sortListingsByCategory("Field Trips")}
          option6="Supplies" option6Action={() => sortListingsByCategory("Supplies")}
          option7="Services" option7Action={() => sortListingsByCategory("Services")}
          option8="Community" option8Action={() => sortListingsByCategory("Community")}
        />

        <OpenableMenu
          title='Sort By Location'
          option1="Ascending" option1Action={() => sortListingsByLocation(false)}
          option2="Descending" option2Action={() => sortListingsByLocation(true)}
        />

      <button className=" px-4 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600" onClick={exportToCSV}>Export to CSV</button>

      <form onSubmit={handleSubmit} className="relative">
        
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        className="rounded-full w-96 pl-10 pr-4 py-1 border border-gray-300 w-1rounded-lg focus:outline-none focus:border-red-500"
      />

      <AiOutlineSearch
        className="absolute top-0 left-0 m-2 text-gray-400 pointer-events-none"
        style={{ fontSize: '1rem' }}
      />

      </form>

      </div>


   
    </div>
    
     

    <Container>
      
      <div 
        className="
          pt-14
          flex
          flex-wrap
          justify-start
          gap-8

        "
      >
        <div style={{ width: '100%'}}></div>

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
