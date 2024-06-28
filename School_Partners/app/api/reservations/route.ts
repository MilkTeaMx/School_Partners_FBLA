import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
  
    startDate,
    endDate,
    listingId,
    description
    
   } = body;

   if (!listingId || !startDate || !endDate) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        create: {
   
          startDate,
          endDate,
          userId: currentUser.id,
          description
        }
      }
    }
  });

  return NextResponse.json(listingAndReservation);
}
