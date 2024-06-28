'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
     return categories.find((items) => 
      items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [eventDesc, setEventDesc] = useState('test')

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
  
    console.log(eventDesc);
    console.log(dateRange);
    setIsLoading(true);
  
    axios.post('/api/reservations', {

      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,
      description: eventDesc,
      
    })
    .then(() => {
      toast.success('Success!');
      setDateRange(initialDateRange);
  
    })
    .catch(() => {
      toast.error('Something Went Wrong');
    })
    .finally(() => {
      setIsLoading(false);
    });
  
    axios.post('/api/sendEmail', {
      listingId: listing?.id,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      orgEmail: listing.email,
      description: eventDesc,
    })
    .then(() => {
      toast.success('Email Sent');
      router.push('/');
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [
    dateRange,
    listing?.id,
    eventDesc,
    router,
    currentUser,
    loginModal
  ]);
  
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate,
        dateRange.startDate
      );
    }
  }, [dateRange, listing?.price]);
  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              email={listing.email}
              phoneNumber={listing.phoneNumber}
              locationValue={listing.locationValue}
              typeOfOrganization={listing.typeOfOrganization}
              id={listing.id}
            />
            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
         
                onChangeDate={(value) => setDateRange(value)}
                onChangeDesc={(test) => setEventDesc(test)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
         
            </div>
          </div>
        </div>
      </div>
    </Container>
   );
}
 
export default ListingClient;
