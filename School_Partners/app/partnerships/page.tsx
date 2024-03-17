import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";

import PartnershipsClient from "./PartnershipClient";
import ListingsContainer from "../components/listings/ListingContainer";
import getListings, { IListingsParams } from "../actions/getListings";


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
  const listings = await getListings(searchParams);

  return (
    <ClientOnly>
       <PartnershipsClient listings={listings} currentUser={currentUser}/>
    </ClientOnly>
  );
}
 
export default PartnershipsPage;
