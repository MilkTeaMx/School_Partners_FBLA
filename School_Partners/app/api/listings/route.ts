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
  console.log(body)
  const { 
    category,
    typeOfOrganization,
    phoneNumber,
    email,
    location,
    imageSrc,
    lat,
    lng,
    publicListing,
    price,
    title,
    description,
   } = body;
 
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      typeOfOrganization,
      phoneNumber,
      email,
      locationValue: location,
      lat,
      lng,
      publicListing,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}
