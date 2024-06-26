
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export interface IListingsParams {
  phoneNumber?: string;
  email?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  typeOfOrganization?: string;
}

export default async function getAllListings(params: IListingsParams) {
  const currentUser = await getCurrentUser();
  const currentUserID = currentUser?.id;

  try {
    const {
      locationValue,
      startDate,
      endDate,
      category,
      phoneNumber,
      email,
      typeOfOrganization,
    } = params;

    let query: any = {};

    // Exclude listings created by the current user
    if (currentUserID) {
      query.userId = { not: currentUserID };
    }

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
