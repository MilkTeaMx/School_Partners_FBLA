'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types"
;
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


interface ReservationsClientProps {
  reservations: SafeReservation[],
  currentUser?: SafeUser | null,
}

function formatDate(dateString: any) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  console.log(reservations)

  const colors = [
    '#3498db', // Blue
    '#8e44ad', // Purple
    '#f1c40f', // Yellow
    '#e74c3c', // Red
    '#e67e22', // Orange
    '#2ecc71', // Green
    '#add8e6', // Light Blue
    '#ffcccb', // Light Red
    '#90ee90', // Light Green
    '#ffb6c1', // Light Pink
    '#ffa07a', // Light Salmon
    '#d3d3d3'  // Light Gray
  ];
  
  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  
  const events = reservations.map(item => ({
    title: item.description,
    start: formatDate(item.startDate),
    end: formatDate(item.endDate),
    backgroundColor: getRandomColor()
  }));

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Meeting cancelled');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <Container >
      
      <div className="pt-8 pb-8">
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          events={events}
          height="650px"
        />
      </div>
      

    </Container>
   );
}
 
export default ReservationsClient;