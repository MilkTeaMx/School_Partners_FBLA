
import EmptyState from "@/app/components/EmptyState";
export const dynamic = 'force-dynamic'
import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import ListingsContainer from "./components/listings/ListingContainer";

import LandingState from "./components/LandingState";
import Dashboard from "./components/Dashboard";

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  
  if (currentUser == null) {
    return (
      <ClientOnly>
        <LandingState />
      </ClientOnly>
    )
  }

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }


  return (
    <ClientOnly>
      <Dashboard listings={listings} currentUser={currentUser}/>
      <ListingsContainer listings={listings} currentUser={currentUser}/>
    </ClientOnly>
  )
}

export default Home;
