'use client';

import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import RentModal from "../components/modals/PartnerModal";
import SearchModal from "../components/modals/SearchModal";

const ModalsProvider = () => {
  return ( 
    <>
      <LoginModal />
      <RegisterModal />
      <SearchModal />
      <RentModal />
    </>
   );
}
 
export default ModalsProvider;