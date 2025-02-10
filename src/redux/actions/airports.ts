import { API } from "../../utils/API";
import { setAirports } from "../features/airports";

export const getAirports =
  ({ params, cb }: any) =>
  async (dispatch: any) => {
    try {
      await API.get(
        `/v1/flights/searchAirport?query=${params}&locale=en-US`
      ).then((res) => {
        dispatch(setAirports(res.data.data));
        cb && cb(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
