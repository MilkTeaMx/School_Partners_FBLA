import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import ListingsContainer from "./components/listings/ListingContainer";
import ChatbotClient from "./chatbot/ChatbotClient";
import LandingState from "./components/LandingState";

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  
  if (currentUser == null) {
    console.log("SDFSDFSDF")
    return (
      <ClientOnly>
        <LandingState />
      </ClientOnly>
    )
  }

  if (listings.length === 0) {
    console.log("AAAAAAAAAASDFSDFSDF")
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }


  return (
    <ClientOnly>
      <ListingsContainer listings={listings} currentUser={currentUser}/>
      
    </ClientOnly>
  )
}

export default Home;
