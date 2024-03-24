'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import Input from '../inputs/Input';

interface ListingReservationProps {
  price: number;
  dateRange: Range,

  onChangeDate: (value: Range) => void;
  onChangeDesc: (value: any) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  dateRange,
 
  onChangeDate,
  onChangeDesc,
  onSubmit,
  disabled,
  disabledDates
}) => {
  return ( 
    <div 
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div className="
      flex flex-row items-center gap-1 p-4 text-center text-lg">
        Set Up A Meeting / Event
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => 
          onChangeDate(value.selection)}
      />
      <hr />

      <input
        type="text"
        className="mt-4 p-4 border border-gray-300 rounded-md w-full"
        placeholder="Enter any additional information"
        onChange={(event) => onChangeDesc(event.target.value)}
      />


      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Set" 
          onClick={onSubmit}
        />
      </div>
  
      
      <hr />
      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
      </div>
    </div>
   );
}
 
export default ListingReservation;