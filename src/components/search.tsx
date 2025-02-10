import { useEffect, useRef, useState } from "react";
import TripDropdown from "./tripDropDown";
import PeopleDropdown from "./peopleDropDown";
import FlightDropdown from "./flightDropDown";
import { IoMdSearch } from "react-icons/io";
import AirportInput from "./AirportInput";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { CgShapeCircle } from "react-icons/cg";
import { MdOutlineLocationOn } from "react-icons/md";
import { useAppDispatch } from "../redux/hooks";
import { getAirports } from "../redux/actions/airports";
import Calendar from "./DatePicker";
import { RiCalendar2Fill } from "react-icons/ri";
import { getFlights } from "../redux/actions/flights";

interface DropdownState {
  trip: boolean;
  peopleNum: boolean;
  flightType: boolean;
}

interface PeopleType {
  adults: number;
  children: number;
  infants: number;
  infantsLap: number;
}

const SearchComponent: React.FC = () => {
  const [showDropdowns, setShowDropdowns] = useState<DropdownState>({
    trip: false,
    peopleNum: false,
    flightType: false,
  });
  const [peopleType, setPeopleType] = useState<PeopleType>({
    adults: 1,
    children: 0,
    infants: 0,
    infantsLap: 0,
  });

  const [airports, setAirports] = useState({
    from: [],
    to: [],
  });

  const [flightType, setFlightType] = useState<string>("Economy");
  const [choosenDateFrom, setChoosenDateFrom] = useState<any>();
  const [choosenDateTo, setChoosenDateTo] = useState<any>();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [trip, setTrip] = useState<"Round trip" | "One way" | "Multi-city">(
    "Round trip"
  );

  // const formatDate = (date: Date | null): string => {
  //   return date ? date.toISOString().split("T")[0] : "";
  // };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2 digits
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
    return `${year}-${month}-${day}`;
  };

  const [showValue, setShowValue] = useState({
    from: false,
    to: false,
  });

  const tripRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const airportRef = useRef<HTMLDivElement | null>(null);
  const airportRefTo = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      tripRef.current?.contains(e.target as Node) ||
      peopleRef.current?.contains(e.target as Node) ||
      flightRef.current?.contains(e.target as Node) ||
      calendarRef.current?.contains(e.target as Node) ||
      airportRef.current?.contains(e.target as Node) ||
      airportRefTo.current?.contains(e.target as Node)
    ) {
      return; // Click inside, do nothing
    }

    // Click outside, close all dropdowns
    setShowDropdowns({
      trip: false,
      peopleNum: false,
      flightType: false,
    });
    setShowValue({
      from: false,
      to: false,
    });
    setShowCalendar(false);
  };

  const swapLocations = () => {
    setData((prevData) => ({
      ...prevData,
      from: prevData.to,
      to: prevData.from,
    }));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dispatch = useAppDispatch();

  const [data, setData] = useState<{
    from: string;
    fromEntity: string;
    to: string;
    toEntity: string;
    departure: any;
    return: any;
  }>({
    from: "",
    fromEntity: "",
    to: "",
    toEntity: "",
    departure: "",
    return: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      getFlights({
        params: `originSkyId=${data.from}&destinationSkyId=${
          data.to
        }&originEntityId=${data.fromEntity}&destinationEntityId=${
          data.toEntity
        }&date=${data.departure}&${
          data.return.length > 0 ? `returnDate=${data.return}&` : ""
        }adults=${peopleType.adults}&children=${peopleType.children}&infants=${
          peopleType.infants + peopleType.infantsLap
        }&sortBy=best&limit=5&currency=USD&cabinClass=${
          flightType == "Economy"
            ? "economy"
            : flightType == "Premium Economy"
            ? "premium_economy"
            : flightType == "Business"
            ? "business"
            : "first"
        }`,
        cb: (res: any) => {
          console.log({ flightsRes: res });
        },
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative !mt-[3rem] w-full flex flex-col gap-5 md:w-[70%] bg-[#36373b] rounded-[8px] p-4 pb-8"
    >
      <div className="text-[#c1c1c1] w-full flex items-center gap-2">
        <TripDropdown
          trip={trip}
          setTrip={setTrip}
          show={showDropdowns.trip}
          onClick={
            () => setShowDropdowns((prev) => ({ ...prev, trip: true })) // Set to true explicitly
          }
          tripRef={tripRef}
        />
        <PeopleDropdown
          peopleType={peopleType}
          setPeopleType={setPeopleType}
          show={showDropdowns.peopleNum}
          onClick={
            () => setShowDropdowns((prev) => ({ ...prev, peopleNum: true })) // Set to true explicitly
          }
          peopleRef={peopleRef}
        />
        <FlightDropdown
          flightType={flightType}
          setFlightType={setFlightType} // Pass setFlightType prop
          show={showDropdowns.flightType}
          onClick={() =>
            setShowDropdowns((prev) => ({ ...prev, flightType: true }))
          }
          flightRef={flightRef}
        />
      </div>
      <div className="w-full flex items-center justify-between flex-col md:flex-row gap-2 md:gap-0">
        <div className="relative justify-between w-full md:w-[60%] flex items-center !m-0">
          <AirportInput
            show={showValue.from}
            input="from"
            setShow={setShowValue}
            ref={airportRef}
            data={airports.from}
            setData={setData}
            onChange={(e) => {
              setShowValue({
                from: true,
                to: false,
              });
              console.log("Airport");
              dispatch(
                getAirports({
                  params: e.target.value,
                  cb: (res: any) => {
                    setAirports({ ...airports, from: res });
                  },
                })
              );
              handleInputChange(e);
            }}
            placeholder="Where From?"
            value={data.from}
            key={1}
            icon={
              <CgShapeCircle
                size={25}
                color="#a3aaad"
                className="absolute top-[50%] translate-y-[-50%] left-[20px]"
              />
            }
          />
          <HiArrowsRightLeft
            size={35}
            className="cursor-pointer z-10 !m-0 absolute left-[50%] translate-x-[-50%] border border-white border-t-0 border-b-0 rounded-full p-2 bg-[#36373b]"
            onClick={swapLocations}
          />
          <AirportInput
            show={showValue.to}
            setShow={setShowValue}
            ref={airportRefTo}
            data={airports.to}
            setData={setData}
            input="to"
            onChange={(e) => {
              setShowValue({
                from: false,
                to: true,
              });
              console.log("Airport to");
              dispatch(
                getAirports({
                  params: e.target.value,
                  cb: (res: any) => {
                    setAirports({ ...airports, to: res });
                  },
                })
              );
              handleInputChange(e);
            }}
            placeholder="Where To?"
            value={data.to}
            key={2}
            icon={
              <MdOutlineLocationOn
                color="#a3aaad"
                size={25}
                className="absolute top-[50%] translate-y-[-50%] left-[20px]"
              />
            }
          />
        </div>
        <div
          className="w-full md:w-[38%] !m-0 z-20"
          onClick={(e) => {
            e.stopPropagation();
            setShowCalendar(true);
          }}
        >
          {trip !== "Round trip" ? (
            <div
              className="w-full relative flex items-center border rounded border-[#4f5154]"
              onClick={(e) => {
                e.stopPropagation();
                setShowCalendar(true);
              }}
            >
              <input
                type="text"
                className="py-4 p-2 w-full pl-15 !m-0"
                placeholder="Departure Date"
                value={choosenDateFrom ? choosenDateFrom.toDateString() : ""}
                readOnly
                onClick={() => {
                  setShowCalendar(true);
                }}
              />
              <RiCalendar2Fill
                size={25}
                onClick={() => {
                  setShowCalendar(true);
                }}
                color={""}
                className="absolute left-[25px] top-[50%] translate-y-[-50%]"
              />
              {showCalendar && (
                <div
                  className="absolute top-[-100%] md:left-[-60%] w-full z-50"
                  ref={calendarRef}
                >
                  <Calendar
                    setShowCalendar={setShowCalendar}
                    isRangePicker={false}
                    setChoosenDateFrom={setChoosenDateFrom}
                    setDepartureDate={(date) =>
                      setData((prev) => ({
                        ...prev,
                        departure: formatDate(date),
                      }))
                    }
                    setReturnDate={(date) =>
                      setData((prev) => ({ ...prev, return: formatDate(date) }))
                    }
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              className="w-full relative flex items-center border rounded border-[#4f5154]"
              onClick={() => {
                setShowCalendar(true);
              }}
            >
              <div className="w-[50%] after:content-[''] after:absolute after:right-[50%] after:translate-x-[50%] after:top-[50%] after:block after:w-[1px] after:h-[70%] after:translate-y-[-50%] after:bg-[#4f5154]">
                <input
                  type="text"
                  className="py-4 p-2 w-full"
                  placeholder="Departure Date"
                  value={choosenDateFrom ? choosenDateFrom.toDateString() : ""}
                  readOnly
                />
              </div>
              <input
                type="text"
                className="py-4 p-2 w-[50%]"
                placeholder="Return Date"
                value={choosenDateTo ? choosenDateTo.toDateString() : ""}
                readOnly
              />

              {showCalendar && (
                <div
                  className="absolute md:top-[-100%] md:left-[-60%] w-full"
                  ref={calendarRef}
                >
                  <Calendar
                    isRangePicker={true}
                    setShowCalendar={setShowCalendar}
                    setChoosenDateFrom={setChoosenDateFrom}
                    setChoosenDateTo={setChoosenDateTo}
                    setDepartureDate={(date) =>
                      setData((prev) => ({
                        ...prev,
                        departure: formatDate(date),
                      }))
                    }
                    setReturnDate={(date) =>
                      setData((prev) => ({ ...prev, return: formatDate(date) }))
                    }
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="cursor-pointer absolute bg-[#88b4f8] rounded-[50px] p-3 bottom-[-25px] left-[50%] transform -translate-x-1/2">
        <button className="cursor-pointer bg-transparent flex items-center border-none outline-none justify-between text-black gap-2">
          <IoMdSearch />
          <p className="text-[.875rem]">Search</p>
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
