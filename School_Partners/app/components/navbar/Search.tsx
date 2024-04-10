'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries';
import useLoginModal from "../../hooks/useLoginModal";

interface SearchProps {
  currentUser?: any
}

const Search: React.FC<SearchProps> = ({currentUser}) => {
  const searchModal = useSearchModal();
  const loginModal = useLoginModal();
  const params = useSearchParams();

  const  locationValue = params?.get('locationValue'); 
  return (
    <></>
  );
}
 
export default Search;