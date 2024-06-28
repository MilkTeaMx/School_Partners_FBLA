"use client";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import { SafeUser } from "@/app/types";

interface ListingContainerProps {
  listings?: any;
  currentUser?: SafeUser | null;
}

const ListingsContainer: React.FC<ListingContainerProps> = ({ listings, currentUser }) => {
  return (
    <>
      <Container>
        <h1 className="text-lg font-bold mb-2 justify-centers">Your Partnerships:</h1>
        <div
          className="
            grid  
            grid-cols-1  
            sm:grid-cols-2  
            md:grid-cols-3  
            lg:grid-cols-4 
            xl:grid-cols-5 
            2xl:grid-cols-6 
            gap-8 
          "
        >
          {listings.map((listing: any, index: number) => (
            <ListingItem
              key={listing.id}
              listing={listing}
              index={index}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

const ListingItem = ({ listing, index, currentUser }: any) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        translateY: 0,
        transition: {
          duration: 0.5,
          delay: index * 0.05
        }
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, translateY: 20 }}
      animate={controls}
    >
      <ListingCard
        currentUser={currentUser}
        data={listing}
      />
    </motion.div>
  );
}

export default ListingsContainer;