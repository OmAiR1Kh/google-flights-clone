import { LuCheck } from "react-icons/lu";
import { MdArrowDropDown } from "react-icons/md";
import { VscArrowRight, VscArrowSwap } from "react-icons/vsc";
import { TbArrowsTransferUpDown } from "react-icons/tb";

interface TripDropdownProps {
  trip: "Round trip" | "One way" | "Multi-city";
  setTrip: (trip: "Round trip" | "One way" | "Multi-city") => void;
  show: boolean;
  onClick: () => void; // Add onClick handler
  tripRef: React.RefObject<HTMLDivElement>;
}

const TripDropdown: React.FC<TripDropdownProps> = ({
  trip,
  setTrip,
  show,
  onClick,
  tripRef,
}) => {
  const tripIcons: Record<
    "Round trip" | "One way" | "Multi-city",
    JSX.Element
  > = {
    "Round trip": <VscArrowSwap className="!m-0" />,
    "One way": <VscArrowRight className="!m-0" />,
    "Multi-city": <TbArrowsTransferUpDown className="!m-0" />,
  };

  const tripOptions: ("Round trip" | "One way" | "Multi-city")[] = [
    "Round trip",
    "One way",
    "Multi-city",
  ];

  return (
    <div
      className="md:w-[15%] font-google-bold relative !m-0 flex items-center gap-2 cursor-pointer hover:bg-[#5b5959] p-1 rounded-[4px]"
      onClick={onClick} // Add onClick handler here
    >
      {tripIcons[trip]}
      {trip}
      <MdArrowDropDown className={show ? "rotate-up" : "rotate-down"} />
      {show && (
        <div
          ref={tripRef}
          className="absolute flex flex-col items-start gap-2 bg-[#303135] p-3 top-[30px] left-0 w-[200px] z-50 rounded-[4px]"
        >
          {tripOptions.map((option) => (
            <p
              key={option}
              className={`hover:bg-[#2f3033] text-start w-full flex items-center gap-2 ${
                trip === option ? "bg-[#394456]" : "pl-[1rem]"
              }`}
              onClick={() => setTrip(option)}
            >
              {trip === option && <LuCheck className="!m-0" />}
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripDropdown;
