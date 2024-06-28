'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { format } from 'date-fns';

import { motion } from "framer-motion";

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
  onCheckboxClick?: (id: string, checked: boolean) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  onCheckboxClick,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const location = data.locationValue

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent the click from propagating to the parent div
    setIsChecked(e.target.checked);
    onCheckboxClick?.(data.id, e.target.checked);
  };

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  const formatPhoneNumber = (phoneNumber: string) => {
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    const formattedPhoneNumber = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    return formattedPhoneNumber;
  };

  return (
    <motion.div

      className="w-full cursor-pointer group border-b border-gray-200 py-2 relative flex items-center"
      initial={{ opacity: 0, translateY: 40 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.8 }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="mr-2" // Add some margin to the right for spacing
      />
      <div className="font-medium text-base w-1/5" onClick={() => router.push(`/listings/${data.id}`)}>
        {data.title}
      </div>
      <div className="border-l border-gray-300 h-4 w-1/12"></div>
      <div className="flex flex-col w-1/6">
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
      <div className="border-l border-gray-300 h-4 w-1/12"></div>
      <div className="flex flex-col w-1/6">
        <div>
          {formatPhoneNumber(data.phoneNumber)}
        </div>
        <div className="font-normal text-sm text-neutral-500">
          {data.email}
        </div>
      </div>
      <div className="border-l border-gray-300 h-4 w-1/12"></div>
      <div className="font-normal text-sm w-1/3">
        {data.description}
      </div>
      <div className="top-1 right-1 pl-5">
        <HeartButton
          listingId={data.id}
          currentUser={currentUser}
        />
      </div>
    </motion.div>
  );
};

export default ListingCard;
