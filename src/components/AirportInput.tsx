import { forwardRef } from "react";

interface AirportInputProps {
  //   label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: React.ReactElement;
  data: any[];
  setData: any;
  show: boolean;
  setShow: any;
  input: "from" | "to";
}

// const AirportInput: React.FC<AirportInputProps> = ({
//   //   label,
//   value,
//   onChange,
//   icon,
//   placeholder,
//   setData,
//   singleData,
//   data,
//   ref,
//   show = false,
//   setShow,
//   input,
// }) => {
//   return (
//     <div className="flex flex-col !m-0 mb-4 w-[49%] relative" ref={ref}>
//       {/* <label className="text-sm text-gray-600 mb-1"></label> */}
//       {icon && icon}
//       <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         className={`w-full p-2 py-4 border border-[#5f6368] rounded ${
//           icon ? "pl-[50px]" : ""
//         }`}
//         placeholder={placeholder}
//         name={placeholder === "Where From?" ? "from" : "to"}
//       />
//       <div className="absolute w-full flex flex-col gap-1 top-[110%] bg-[#36373b]">
//         {show &&
//           data &&
//           data.length > 0 &&
//           data.map((airport: any, i) => (
//             <p
//               key={i}
//               className="!m-0 p-2 font-google-bold hover:border hover:border-[#5f6368]"
//               onClick={() => {
//                 if (input == "from") {
//                   setData({
//                     ...singleData,
//                     from: airport.skyId,
//                     fromEntity: airport.entityId,
//                   });
//                 } else {
//                   setData({
//                     ...singleData,
//                     to: airport.skyId,
//                     toEntity: airport.entityId,
//                   });
//                 }
//                 setShow(false);
//               }}
//             >
//               {airport.presentation.title}
//             </p>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default AirportInput;

const AirportInput = forwardRef<HTMLDivElement, AirportInputProps>(
  (
    {
      value,
      onChange,
      icon,
      placeholder,
      setData,
      data,
      show = false,
      setShow,
      input,
    },
    ref
  ) => {
    return (
      <div className="flex flex-col !m-0 mb-4 w-[49%] relative">
        {icon && icon}
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={`w-full p-2 py-4 border border-[#5f6368] rounded ${
            icon ? "pl-[50px]" : ""
          }`}
          placeholder={placeholder}
          name={placeholder === "Where From?" ? "from" : "to"}
        />
        <div
          className="absolute w-full flex flex-col gap-1 top-[110%] bg-[#36373b]"
          ref={ref}
        >
          {show &&
            data &&
            data.length > 0 &&
            data.map((airport: any, i) => (
              <p
                key={i}
                className="!m-0 p-2 font-google-bold hover:border hover:border-[#5f6368] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Clicked on an option");
                  console.log({ airport });
                  if (input === "from") {
                    setData((prevData: any) => ({
                      ...prevData,
                      from: airport.skyId,
                      fromEntity: airport.entityId,
                    }));
                    setShow(false);
                  } else {
                    setData((prevData: any) => ({
                      ...prevData,
                      to: airport.skyId,
                      toEntity: airport.entityId,
                    }));
                    setShow(false);
                  }
                }}
              >
                {airport.presentation.title}
              </p>
            ))}
        </div>
      </div>
    );
  }
);

export default AirportInput;
