import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}

export async function PUT(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  console.log("PUT ACCESSED")
  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const body = await request.json();

   Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });
  console.log(body)
  const updatedListing = await prisma.listing.updateMany({
    where: {
      id: listingId,
      userId: currentUser.id
    },
    data: {
      // Assuming 'body' contains the entire listing object with updated fields
      title: body.title,
      description: body.description,
      imageSrc: body.imageSrc,
      category: body.category,
      typeOfOrganization: body.typeOfOrganization,
      phoneNumber: body.phoneNumber,
      email: body.email,
      locationValue: body.location,
      price: body.price 
    }

    
  });

  return NextResponse.json(updatedListing);
}
