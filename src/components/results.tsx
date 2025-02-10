import { useAppSelector } from "../redux/hooks";

const Results = () => {
  const results = useAppSelector((state) => state.flight);
  console.log({ results });
  if (
    results.data &&
    results.data.itineraries &&
    results.data.itineraries.length > 0
  ) {
    return (
      <section className="w-full md:w-[70%] !mt-10 rounded-t-2xl border border-white">
        {results.data.itineraries.map((item: any, i: any) => (
          <div
            key={i}
            className="w-full flex items-center justify-between border-b border-b-white p-2"
          >
            <img
              src={item?.legs[0].carriers?.marketing[0]?.logoUrl}
              alt={item?.legs[0].carriers?.marketing[0]?.name}
              width={40}
              height={40}
              className="!m-0"
            />
            <div className="flex flex-col items-start !m-0">
              <p className="!m-0">
                {item?.legs[0].departure?.split("T")[1]}-
                {item?.legs[0].arrival?.split("T")[1]}
              </p>
              <p className="!m-0 text-[#787971] text-sm">
                {item?.legs[0].segments[0]?.operatingCarrier?.name}
              </p>
            </div>
            <div className="flex flex-col items-start !m-0">
              <p className="!m-0">{item.legs[0].durationInMinutes}min</p>
              <p className="!m-0 text-[#787971] text-sm">
                {item.legs[0].origin.id} - {item.legs[0].destination.id}
              </p>
            </div>
            <p className="!m-0">Price: {item.price.formatted}</p>
          </div>
        ))}
      </section>
    );
  } else {
    return (
      <div className="w-full !pt-10">
        <p className="w-full font-google-bold text-center text-[2.25rem]">
          No Results Found
        </p>
      </div>
    );
  }
};

export default Results;
