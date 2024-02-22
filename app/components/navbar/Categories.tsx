'use client';

import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GiAnvil } from "react-icons/gi";
import { MdDiscount } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { BiSolidBusSchool } from "react-icons/bi";
import { FaPencilRuler } from "react-icons/fa";
import { MdCleanHands } from "react-icons/md";
import { RiCommunityFill } from "react-icons/ri";


import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { MdVolunteerActivism } from "react-icons/md";
import { RiGovernmentFill } from "react-icons/ri";

import { usePathname, useSearchParams } from 'next/navigation';

import CategoryBox from "../CategoryBox";
import Container from '../Container';

export const orgCategories = [
  {
    label: 'for-Profit',
    icon: BsFillSuitcaseLgFill,
    description: 'for-Profit',

  },

  {
    label: 'non-Profit',
    icon: MdVolunteerActivism,
    description: 'non-Profit',
  },

  {
    label: 'government',
    icon: RiGovernmentFill,
    description: 'government',
  }
]


export const categories = [
  {
    label: 'Scholarships',
    icon: RiGraduationCapFill,
    description: 'Scholarships',
  },
  {
    label: 'Apprenticeships',
    icon: GiAnvil,
    description: 'Apprenticeships',
  },
  {
    label: 'Discounts',
    icon: MdDiscount,
    description: 'Discounts'
  },
  {
    label: 'Funding',
    icon: FaMoneyBillTransfer,
    description: 'Funding'
  },
  {
    label: 'Field Trips',
    icon: BiSolidBusSchool,
    description: 'Field Trips'
  },
  {
    label: 'Supplies',
    icon: FaPencilRuler,
    description: 'Supplies',
  },
  {
    label: 'Services',
    icon: MdCleanHands,
    description: 'Services'
  },
  {
    label: 'Community',
    icon: RiCommunityFill,
    description: 'Community'
  },
  
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;