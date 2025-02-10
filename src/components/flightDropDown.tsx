// import { MdArrowDropDown } from "react-icons/md";
// import { LuCheck } from "react-icons/lu";

// interface FlightDropdownProps {
//   flightType: string;
//   setFlightType: (flightType: string) => void; // Add setFlightType prop
//   show: boolean;
//   onClick: () => void; // Add onClick handler
//   flightRef: React.RefObject<HTMLDivElement>;
// }

// const FlightDropdown: React.FC<FlightDropdownProps> = ({
//   flightType,
//   setFlightType,
//   show,
//   onClick,
//   flightRef,
// }) => {
//   const flightClasses = ["Economy", "Premium Economy", "Business", "First"];

//   return (
//     <div
//       className="md:w-[10%] !m-0 flex font-google-bold relative items-center gap-2 cursor-pointer hover:bg-[#5b5959] p-1 rounded-[4px]"
//       onClick={onClick} // Add onClick handler here
//     >
//       {flightType}
//       <MdArrowDropDown className={show ? "rotate-up" : "rotate-down"} />
//       {show && (
//         <div
//           ref={flightRef}
//           className="absolute flex flex-col items-start gap-2 bg-[#303135] p-3 top-[30px] left-0 w-[200px] z-50 rounded-[4px]"
//         >
//           {flightClasses.map((flightClass) => (
//             <p
//               key={flightClass}
//               className={`hover:bg-[#2f3033] text-start w-full flex items-center gap-2 ${
//                 flightType === flightClass ? "bg-[#394456]" : "pl-[1rem]"
//               }`}
//               onClick={() => setFlightType(flightClass)} // Update flight type on click
//             >
//               {flightType === flightClass && <LuCheck className="!m-0" />}
//               {flightClass}
//             </p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlightDropdown;

import { MdArrowDropDown } from "react-icons/md";
import { LuCheck } from "react-icons/lu";
import { useState, useEffect } from "react";

interface FlightDropdownProps {
  flightType: string;
  setFlightType: (flightType: string) => void;
  show: boolean;
  onClick: () => void;
  flightRef: React.RefObject<HTMLDivElement>;
}

const FlightDropdown: React.FC<FlightDropdownProps> = ({
  flightType,
  setFlightType,
  show,
  onClick,
  flightRef,
}) => {
  const flightClasses = ["Economy", "Premium Economy", "Business", "First"];
  const [buttonWidth, setButtonWidth] = useState("auto"); // State to control button width

  // Calculate the width of the button based on the selected flight type
  useEffect(() => {
    const tempElement = document.createElement("span");
    tempElement.style.visibility = "hidden";
    tempElement.style.whiteSpace = "nowrap";
    tempElement.style.fontSize = "14px"; // Match the font size of the button
    tempElement.style.fontFamily = "inherit"; // Match the font family of the button
    tempElement.innerText = flightType;
    document.body.appendChild(tempElement);

    // Set the width of the button to the width of the text
    const width = tempElement.offsetWidth + 60; // Add padding/margin for the dropdown icon
    setButtonWidth(`${width}px`);

    document.body.removeChild(tempElement);
  }, [flightType]);

  return (
    <div
      className="!m-0 flex font-google-bold relative items-center gap-2 cursor-pointer hover:bg-[#5b5959] p-1 rounded-[4px]"
      onClick={onClick}
      style={{ width: buttonWidth }} // Set dynamic width
    >
      {flightType}
      <MdArrowDropDown className={show ? "rotate-up" : "rotate-down"} />
      {show && (
        <div
          ref={flightRef}
          className="absolute flex flex-col items-start gap-2 bg-[#303135] p-3 top-[30px] left-0 w-[200px] z-50 rounded-[4px]"
        >
          {flightClasses.map((flightClass) => (
            <p
              key={flightClass}
              className={`hover:bg-[#2f3033] text-start w-full flex items-center gap-2 ${
                flightType === flightClass ? "bg-[#394456]" : "pl-[1rem]"
              }`}
              onClick={() => setFlightType(flightClass)}
            >
              {flightType === flightClass && <LuCheck className="!m-0" />}
              {flightClass}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightDropdown;
