"use client"
import { useCallback, useState } from 'react';
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import { SafeUser } from '@/app/types';
import ListingRow from '../components/listings/ListingRow';
import OpenableMenu from '../components/openableMenu';
import { categories } from '../components/navbar/Categories';
import { AiOutlineSearch } from 'react-icons/ai';
import { saveAs } from 'file-saver';
import { useRouter, useSearchParams } from 'next/navigation';
import Search from '../components/navbar/Search';
import useFavorite from "@/app/hooks/useFavorite";
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface ListingContainerProps {
  listings?: any;
  currentUser?: SafeUser | null;
}

const ListingsContainer: React.FC<ListingContainerProps> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [sortedListings, setListings] = useState<any[]>(listings || []);
  const [selectedListings, setSelectedListings] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const { toggleFavoriteById } = useFavorite({ currentUser });
  const [showReport, setShowReport] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const handleChange = (event: any) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (listings) {
      const newSearchedListings = listings.filter((listing: any) =>
        listing.title.toLowerCase().startsWith(searchTerm)
      );
      setListings(newSearchedListings);
    }
  };

  const handleCheckboxClick = (id: string, checked: boolean) => {
    setSelectedListings(prev => {
      const newSelectedListings = new Set(prev);
      if (checked) {
        newSelectedListings.add(id);
      } else {
        newSelectedListings.delete(id);
      }
      return newSelectedListings;
    });
  };

  const handleDeleteAll = async () => {
    selectedListings.forEach(async id => {
      let request;
      request = () => axios.delete(`/api/listings/${id}`);
      await request();
      router.push('/')
    })
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + sortedListings.map(row => Object.values(row).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sortedListings.csv");
    document.body.appendChild(link);
    link.click();
  };

  const sortListingsByAlphabet = (reverseOrder = false) => {
    if (listings) {
      const newSortedListings = [...listings].sort((a: any, b: any) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) {
          return reverseOrder ? 1 : -1;
        }
        if (titleA > titleB) {
          return reverseOrder ? -1 : 1;
        }
        return 0;
      });
      setListings(newSortedListings);
    }
  };

  const sortListingsByCategory = (categoryParam: string) => {
    if (listings) {
      const newSortedListings = listings.filter((item: any) => {
        return item.category.toLowerCase() === categoryParam.toLowerCase();
      }).sort((a: any, b: any) => {
        const categoryA = a.category.toLowerCase();
        const categoryB = b.category.toLowerCase();
        if (categoryA < categoryB) {
          return -1;
        }
        if (categoryA > categoryB) {
          return 1;
        }
        return 0;
      });
      setListings(newSortedListings);
    }
  };

  const sortListingsByLocation = (reverseOrder: boolean) => {
    if (listings) {
      const newSortedListings = [...listings].sort((a: any, b: any) => {
        const locationValueA = a.locationValue.toLowerCase();
        const locationValueB = b.locationValue.toLowerCase();
        if (reverseOrder) {
          if (locationValueA < locationValueB) {
            return 1;
          }
          if (locationValueA > locationValueB) {
            return -1;
          }
        } else {
          if (locationValueA < locationValueB) {
            return -1;
          }
          if (locationValueA > locationValueB) {
            return 1;
          }
        }
        return 0;
      });
      setListings(newSortedListings);
    }
  };

  const sortListingsByOrganization = (startsWith: string) => {
    if (listings) {
      const newSortedListings = [...listings].filter((item: any) => {
        return item.typeOfOrganization.toLowerCase().startsWith(startsWith.toLowerCase());
      }).sort((a: any, b: any) => {
        const organizationA = a.typeOfOrganization.toLowerCase();
        const organizationB = b.typeOfOrganization.toLowerCase();
        if (organizationA < organizationB) {
          return -1;
        }
        if (organizationA > organizationB) {
          return 1;
        }
        return 0;
      });
      setListings(newSortedListings);
    }
  };

  const generateReport = () => {
    setShowReport(true);
  };

  const closeReport = () => {
    setShowReport(false);
  };

  const downloadReport = async () => {
    const input = document.getElementById('report-content');
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('report.pdf');
    }
  };

  const generateReportData = () => {
    const categoriesData = categories.map(category => {
      return sortedListings.filter(listing => listing.category.toLowerCase() === category.label.toLowerCase()).length;
    });
    const typesOfOrganizationData = ['government', 'for-profit', 'non-profit'].map(type => {
      return sortedListings.filter(listing => listing.typeOfOrganization.toLowerCase().includes(type)).length;
    });

    return {
      categoriesData,
      typesOfOrganizationData,
    };
  };

  const reportData = generateReportData();

  const dataForPieChart = {
    labels: categories.map(category => category.label),
    datasets: [
      {
        label: 'Listings by Category',
        data: reportData.categoriesData,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF729D', '#7CB342', '#AFB42B', '#29B6F6', '#BA68C8'],
        hoverBackgroundColor: ['#FF4384', '#0692EB', '#FFAE56', '#FF529D', '#5CB342', '#8FB42B', '#09B6F6', '#9A68C8'],
      },
    ],
  };

  const dataForBarChart = {
    labels: ['Government', 'For-Profit', 'Non-Profit'],
    datasets: [
      {
        label: 'Listings by Type of Organization',
        data: reportData.typesOfOrganizationData,
        backgroundColor: '#42A5F5',
      },
    ],
  };

  
  return (
    <>
      <div className="z-10 fixed w-full flex flex-row items-center justify-between space-x-4 py-4 px-4">
        <div className="flex flex-row items-center space-x-4">
          <OpenableMenu
            title='Sort By Alphabet'
            option1="Ascending" option1Action={() => sortListingsByAlphabet(false)}
            option2="Descending" option2Action={() => sortListingsByAlphabet(true)}
          />
          <OpenableMenu
            title='Sort By Type of Organization'
            option1="Government" option1Action={() => sortListingsByOrganization("government")}
            option2="For-Profit" option2Action={() => sortListingsByOrganization("for")}
            option3="Non-Profit" option3Action={() => sortListingsByOrganization("non")}
          />
          <OpenableMenu
            title='Sort By Resources Available'
            option1="Scholarships" option1Action={() => sortListingsByCategory("Scholarships")}
            option2="Apprenticeships" option2Action={() => sortListingsByCategory("Apprenticeships")}
            option3="Discounts" option3Action={() => sortListingsByCategory("Discounts")}
            option4="Funding" option4Action={() => sortListingsByCategory("Funding")}
            option5="Field Trips" option5Action={() => sortListingsByCategory("Field Trips")}
            option6="Supplies" option6Action={() => sortListingsByCategory("Supplies")}
            option7="Services" option7Action={() => sortListingsByCategory("Services")}
            option8="Community" option8Action={() => sortListingsByCategory("Community")}
          />
          <OpenableMenu
            title='Sort By Location'
            option1="Ascending" option1Action={() => sortListingsByLocation(false)}
            option2="Descending" option2Action={() => sortListingsByLocation(true)}
          />
           <button className="px-4 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600" onClick={exportToCSV}>Export to CSV</button>
          <button className="px-4 py-1 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600" onClick={generateReport}>Generate Report</button>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChange}
              className="rounded-full w-72 pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            />
            <AiOutlineSearch
              className="absolute top-0 left-0 m-2 text-gray-400 pointer-events-none"
              style={{ fontSize: '1rem' }}
            />
          </form>
        </div>
        <div className="flex space-x-4">
          {selectedListings.size > 0 && (
            <>
              <button className="px-2 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600" onClick={handleDeleteAll}>
                Delete Selected ({selectedListings.size})
              </button>
            </>
          )}
        </div>
      </div>
      <Container>
        <div className="pt-14 flex flex-wrap justify-start gap-8">
          <div style={{ width: '100%' }}></div>
          {sortedListings.map((listing: any) => (
            <ListingRow
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              onCheckboxClick={handleCheckboxClick}
            />
          ))}
        </div>
      </Container>

      {showReport && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 pt-20 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg space-y-4" id="report-content">
            <h2 className="text-xl font-semibold">Listing Report</h2>
            <div>
              <h3 className="font-semibold">Listings by Category</h3>
              <Pie data={dataForPieChart} />
            </div>
            <div>
              <h3 className="font-semibold">Listings by Type of Organization</h3>
              <Bar data={dataForBarChart} />
            </div>
            <button
              className="mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              onClick={downloadReport}
            >
              Download Report
            </button>
            <button
              className="mt-2 px-4 py-2 rounded-lg bg-gray-300 text-black font-semibold hover:bg-gray-400"
              onClick={closeReport}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingsContainer;