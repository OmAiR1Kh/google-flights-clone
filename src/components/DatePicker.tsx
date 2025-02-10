import React, { useState } from "react";

interface CalendarProps {
  isRangePicker: boolean;
  setChoosenDateFrom: (date: Date | null) => void;
  setChoosenDateTo?: (date: Date | null) => void;
  setShowCalendar: any;
  setDepartureDate?: (date: Date | null) => void; // New prop
  setReturnDate?: (date: Date | null) => void;
}

type DateState = Date | null;

const Calendar: React.FC<CalendarProps> = ({
  isRangePicker,
  setChoosenDateFrom,
  setChoosenDateTo,
  setShowCalendar,
  setDepartureDate,
  setReturnDate,
}) => {
  const [startDate, setStartDate] = useState<DateState>(null);
  const [endDate, setEndDate] = useState<DateState>(null);
  const [currentMonthOffset, setCurrentMonthOffset] = useState<number>(0);


  const handleDateClick = (date: Date) => {
    if (isRangePicker) {
      if (!startDate || (startDate && endDate)) {
        setStartDate(date);
        setChoosenDateFrom(date);
        setDepartureDate?.(date);
        setEndDate(null);
        setChoosenDateTo?.(null);
        setReturnDate?.(null);
      } else if (date > startDate) {
        setEndDate(date);
        setChoosenDateTo?.(date);
        setReturnDate?.(date);
      }
    } else {
      setStartDate(date);
      setChoosenDateFrom(date);
      setDepartureDate?.(date);
    }
    console.log({ date, startDate, endDate });
  };

  const handleMonthChange = (offset: number) => {
    setCurrentMonthOffset((prev) => prev + offset);
  };

  const renderCalendar = (monthOffset: number = 0) => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset + currentMonthOffset);
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = firstDayOfMonth.getDay();

    const days: JSX.Element[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center p-2"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const isSelected = isRangePicker
        ? (startDate &&
            currentDate.toDateString() === startDate.toDateString()) ||
          (endDate && currentDate.toDateString() === endDate.toDateString())
        : startDate && currentDate.toDateString() === startDate.toDateString();

      days.push(
        <div
          key={i}
          className={`text-center p-2 cursor-pointer rounded-full ${
            isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-700"
          }`}
          onClick={() => handleDateClick(currentDate)}
        >
          {i}
        </div>
      );
    }

    return (
      <div className="bg-[#36373b] p-4 rounded-lg shadow-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => handleMonthChange(-1)}
            className="text-white hover:bg-gray-700 p-2 rounded-full"
          >
            &lt;
          </button>
          <div className="text-white font-semibold">
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(date)}
          </div>
          <button
            onClick={() => handleMonthChange(1)}
            className="text-white hover:bg-gray-700 p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-gray-400 font-medium">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#36373b] p-6 rounded-lg md:w-[50vw] flex flex-col">
      <div className="flex gap-4 flex-col md:flex-row">
        {renderCalendar()}
        {isRangePicker && renderCalendar(1)}
      </div>
      <button
        type="button"
        className="text-white bg-[#8ab5f9] p-2 rounded-xl px-4 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setShowCalendar((prev: boolean) => !prev);
          console.log({ startDate, endDate });
        }}
      >
        Done
      </button>
    </div>
  );
};

export default Calendar;
