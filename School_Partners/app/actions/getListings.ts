
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export interface IListingsParams {
  userId?: string;
  phoneNumber?: string;
  email?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  typeOfOrganization?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  const currentUser = await getCurrentUser();
  const currentUserID = currentUser?.id

  try {
    const { 
      userId,
      locationValue,
      startDate,
      endDate,
      category,
      phoneNumber,
      email,
      typeOfOrganization,
   
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    
    query.userId = currentUserID

    if (category) {
      query.category = category;
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    } 

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing: any) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
