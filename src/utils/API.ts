import axios from "axios";

export const API = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api/",
  headers: {
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    "x-rapidapi-key": import.meta.env.VITE_API_KEY,
  },
});
