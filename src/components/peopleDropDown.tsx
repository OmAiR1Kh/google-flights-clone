import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";

interface PeopleType {
  adults: number;
  children: number;
  infants: number;
  infantsLap: number;
}

interface PeopleDropdownProps {
  peopleType: PeopleType;
  setPeopleType: React.Dispatch<React.SetStateAction<PeopleType>>;
  show: boolean;
  onClick: () => void; // Add onClick handler
  peopleRef: React.RefObject<HTMLDivElement>;
}

const PeopleDropdown: React.FC<PeopleDropdownProps> = ({
  peopleType,
  setPeopleType,
  show,
  onClick,
  peopleRef,
}) => {
  const peopleCategories = [
    { label: "Adults", key: "adults", description: "" },
    { label: "Children", key: "children", description: "Aged 2-11" },
    { label: "Infants", key: "infants", description: "In seat" },
    { label: "Infants", key: "infantsLap", description: "On lap" },
  ];

  return (
    <div
      className="md:w-[10%] !m-0 flex items-center gap-2 cursor-pointer hover:bg-[#5b5959] p-1 rounded-[4px] relative"
      onClick={onClick} // Add onClick handler here
    >
      <IoMdPerson className="!m-0" />
      {Object.values(peopleType).reduce((a, b) => a + b, 0)}
      <MdArrowDropDown className={show ? "rotate-up" : "rotate-down"} />
      {show && (
        <div
          ref={peopleRef}
          className="absolute flex flex-col items-start gap-2 bg-[#303135] p-3 top-[30px] left-0 w-[200px] z-50 rounded-[4px]"
        >
          {peopleCategories.map(({ label, key, description }) => (
            <div
              key={key}
              className="flex items-center justify-between gap-2 w-full"
            >
              <p className="flex items-start flex-col gap-1 !m-0">
                <span>{label}</span>
                {description && (
                  <span className="text-xs !m-0">{description}</span>
                )}
              </p>
              <div className="flex items-center gap-3 !m-0">
                <button
                  type="button"
                  className="border border-gray-400"
                  onClick={() =>
                    setPeopleType((prev) => ({
                      ...prev,
                      [key]: Math.max(
                        prev[key as keyof PeopleType] - 1,
                        key === "adults" ? 1 : 0
                      ),
                    }))
                  }
                >
                  <HiMinusSm />
                </button>
                <p className="w-[25px] text-center">
                  {peopleType[key as keyof PeopleType]}
                </p>
                <button
                  type="button"
                  className="border border-gray-400"
                  onClick={() =>
                    setPeopleType((prev) => ({
                      ...prev,
                      [key]: prev[key as keyof PeopleType] + 1,
                    }))
                  }
                >
                  <HiPlusSm />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PeopleDropdown;
