"use client"
import { useEffect, useState } from 'react';

import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import { SafeUser } from '@/app/types';
import { Chart as ChartJS, ArcElement, LinearScale, CategoryScale,  LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

import { Pie, Line} from 'react-chartjs-2';

import usePartnerModal from "@/app/hooks/usePartnerModal";
import useUpdateModal from "@/app/hooks/useUpdateModal";

import MyDashboardMap from './dashboardMap';

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Legend,
  Tooltip
);
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import LocationSelect from './inputs/LocationSelect';
import { useRouter, useSearchParams } from "next/navigation";
import { APIProvider } from '@vis.gl/react-google-maps';

interface DashboardProps {
    listings?: any
    currentUser?: SafeUser | null
  }

const Dashboard: React.FC<DashboardProps> = ({ listings, currentUser }) => {

    const router = useRouter();
    const [selectedPlace, setSelectedPlace] =
      useState<google.maps.places.PlaceResult | null>(null);

    const handleLocationSelect = (value: any) => {
      console.log("SDFSF")
      setSelectedPlace(value)
      console.log(selectedPlace)

      console.log(value.lat)
      
    }

    const updateModal = useUpdateModal();
    const partnerModal = usePartnerModal();

    const categoryCounts: { [category: string]: number } = {};
    const dateCounts: { [date: string]: number } = {};

    listings.forEach((listing:any) => {
      categoryCounts[listing.category] = (categoryCounts[listing.category] || 0) + 1;

      const listingDate = new Date(listing.createdAt);
      const formattedDate = listingDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
      dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
    });
    console.log(categoryCounts)
    console.log(dateCounts)

    const pieData = {
        labels: ['Scholarships', 'Apprenticeships', 'Discounts', 'Funding', 'Field Trips', 'Supplies', 'Services', 'Community'],
        datasets: [
            {
              label: '# of Partnerships',
              data: [categoryCounts['Scholarships'], categoryCounts['Apprenticeships'], categoryCounts['Discounts'], categoryCounts['Funding'], categoryCounts['Field Trips'], categoryCounts['Supplies'], categoryCounts['Services'], categoryCounts['Community']],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 0, 0, 0.2)', // Additional color
                'rgba(0, 255, 0, 0.2)', // Additional color
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 0, 0, 1)', // Additional color
                'rgba(0, 255, 0, 1)', // Additional color

              ],
              borderWidth: 1,
            },
        ]
    }

    interface PlotDataPoint {
        month: string;
        count: number;
    }

    const currentDate: Date = new Date();
    const lastSixMonths: string[] = Array.from({ length: 6 }, (_, i) => {
      const month: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      return `${month.toLocaleDateString('en-US', { month: 'long' })} ${month.getFullYear()}`;
    }).reverse();

    const plotsData: PlotDataPoint[] = lastSixMonths.map((month: string) => ({
      month,
      count: dateCounts[month] || 0
    }));

    const plotData = {
      labels: lastSixMonths,
      datasets: [
        {
          label: 'Your Community',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          fill: false,
          data: plotsData.map(point => point.count),
        }
      ]
    }

    return (
  <Container>
    <div className="pt-12 pb-6 bg-white flex flex-col">
      <h1 className="text-lg font-bold mb-2 justify-centers pt-8">Your Dashboard</h1>
      <div className="flex justify-between h-2/3 p-2 border-2 border-gray-200 shadow-md">
        
        <div className="w-1/4 bg-red-50 p-4 rounded border border-gray-300 m-3 items-center">
          <h2 className="text-md font-bold mb-2 justify-centers">Community Pie</h2>
          {pieData && <Pie data={pieData} />}
        </div>
        
        <div className="w-1/3 bg-green-50 p-4 rounded border border-gray-300 m-3">
          <div className="pt-8">
            {true && <MyDashboardMap listings={listings} />}
          </div>
        </div>
        
        <div className="w-2/5 flex flex-col">
          <div className="bg-blue-50 p-4 rounded-t border border-gray-300 m-3">
            <h2 className="text-md font-bold mb-2 justify-centers"># of Partnerships Created</h2>
            {plotData && <Line data={plotData} />}
          </div>
          <div className="bg-purple-100 p-4 rounded-b border border-gray-300 m-3 cursor-pointer transition transform hover:scale-105 hover:bg-purple-100" 
             onClick={() => router.push("/explore")}
          >
            <h2 className="text-md font-bold mb-2 underline">Explore More</h2>
            <p>Explore some personalized partnership recommendations</p>
  
          </div>
        </div>

      </div>
    </div>
  </Container>
);
  };
  
  export default Dashboard;