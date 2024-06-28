import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";

import ExploreClient from "./ExploreClient";
import ListingsContainer from "../components/listings/ListingContainer";
import getListings, { IListingsParams } from "../actions/getListings";
import Categories from "../components/navbar/Categories";
import getAllListings from "../actions/getAllListings";


interface PartnershipParams {
  searchParams: IListingsParams
};

const PartnershipsPage = async ({ searchParams }: PartnershipParams) => {
  const currentUser = await getCurrentUser();
 
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }


  //lmust come from here
  const listings = await getAllListings(searchParams);

  return (
    <ClientOnly>
       <ExploreClient listings={listings} currentUser={currentUser}/>
    </ClientOnly>
  );
}
 
export default PartnershipsPage;
