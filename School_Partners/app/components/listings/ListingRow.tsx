'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import useCountries from "@/app/hooks/useCountries";
import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import ListingCategory from "./ListingCategory";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();

  const location = data.locationValue

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-digit characters from the phone number
    const digitsOnly = phoneNumber.replace(/\D/g, '');
  
    // Format the phone number as (###) ###-####
    const formattedPhoneNumber = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  
    return formattedPhoneNumber;
  };

  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="w-full cursor-pointer group border-b border-gray-200 py-2 relative flex items-center" // Applied flex and items-center to center elements vertically
    >
      <div className="font-medium text-base w-1/5"> {/* Fixed width for title */}
        {data.title}
      </div>
  
      <div className="border-l border-gray-300 h-4 w-1/12"></div> {/* Fixed width for vertical line */}
      <div className="flex flex-col w-1/6"> {/* Smaller width for location */}
        <div>
          {location}
        </div>
        <div className="font-normal text-sm text-neutral-500">
          {reservationDate || data.category} - {data.typeOfOrganization}
        </div>
      </div>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel} 
          onClick={handleCancel}
        />
      )}
  
      <div className="border-l border-gray-300 h-4 w-1/12"></div> {/* Fixed width for vertical line */}
  
      <div className="flex flex-col w-1/6"> {/* Smaller width for phone number and email */}
        <div>
          {formatPhoneNumber(data.phoneNumber)}
        </div>
        <div className="font-normal text-sm text-neutral-500">
          {data.email}
        </div>
      </div>
  
      <div className="border-l border-gray-300 h-4 w-1/12"></div> {/* Fixed width for vertical line */}
      <div className="font-normal text-sm w-1/3"> {/* Larger width for description */}
        {data.description}
      </div>
      <div className="top-1 right-1"> {/* Adjusted positioning */}
        <HeartButton 
          listingId={data.id} 
          currentUser={currentUser}
        />
      </div>
    </div>
  );
  
  
}

 
export default ListingCard;
