import { API } from "../../utils/API";
import { setFlightData } from "../features/flights";

export const getFlights =
  ({ params, cb }: any) =>
  async (dispatch: any) => {
    try {
      await API.get(`v2/flights/searchFlights?${params}`).then((res) => {
        console.log({ flightResOrigin: res });
        dispatch(setFlightData(res.data.data));
        cb && cb(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
