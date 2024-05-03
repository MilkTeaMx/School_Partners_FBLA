'use client';


import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";


import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

import UpdateModal from '@/app/components/modals/UpdateModal';
import { useCallback, useState } from "react";
import useUpdateModal from "@/app/hooks/useUpdateModal";


const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

interface ListingInfoProps {
  user: SafeUser,
  description: string;
  email: string;
  phoneNumber: string,
  typeOfOrganization: string,
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
  id: any;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  email,
  phoneNumber,
  typeOfOrganization,
  category,
  locationValue,
  id
}) => {
  const { getByValue } = useCountries();

  const router = useRouter();

  const updateModal = useUpdateModal();

  const onUpdate = useCallback(() => {

    updateModal.onOpen();
  }, [updateModal]);

  const onDelete = useCallback(() => {

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Partnership deleted');
      router.push('/')
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
  }, [router]);



  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <hr />
      <div className="flex flex-col gap-2">
        <hr />
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
            
          "
        >
          <div>Organized by {user?.name}</div>
     
        </div>
        <div className="
            flex 
            flex-col
            items-left
            gap-4 
           
            text-neutral-500
          "
        >
          <div className="pt-4">
            Get In Touch: Set up a formal meeting
          </div>
          <div> Call or Text at: {phoneNumber} </div>
          <div> Email at: {email} </div>
          <div> Organization: {typeOfOrganization} </div>
          <div> {locationValue} </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />


      <div 
          onClick={onUpdate}
          className="
            hidden
            md:block
            text-md 
            font-semibold 
            
            px-4 
            rounded-full 
   
            transition 
            cursor-pointer
          "
        >
          Update Information
        </div>

        <div 
          onClick={() => onDelete}
          className="
            hidden
            md:block
            text-md 
            font-semibold 
       
            px-4 
            rounded-full 
            text-red-400
            transition 
            cursor-pointer
          "
        >
          Delete
        </div>

    </div>
   );
}
 
export default ListingInfo;