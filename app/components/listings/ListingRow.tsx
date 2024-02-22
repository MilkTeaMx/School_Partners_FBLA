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
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

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

  
return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="w-full cursor-pointer group border-b border-gray-200 py-4 relative"
    >
      <div className="flex items-center gap-4">
        <div className="font-semibold text-lg"> 
          {data.title}
        </div>
        <div className="border-l border-gray-300 h-6 mx-3"></div> {/* Vertical line */}
        <div className="flex flex-col">
          <div>
            {location?.region}, {location?.label}
          </div>
          <div className="font-light text-neutral-500">
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
        
        <div className="border-l border-gray-300 h-6 mx-3"></div> {/* Vertical line */}
        <div>

          {data.description}
        </div>

        <div className="absolute top-3 right-3">
          <HeartButton 
            listingId={data.id} 
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}

 
export default ListingCard;
