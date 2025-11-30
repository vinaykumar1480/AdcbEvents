import axios from "axios";

const API_KEY = "ECAJM8lDJvdEuIhsaEcdRzN5QkuwUpQo";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

export const searchEvents = async (keyword, city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        keyword,
        city,
        size: 20,
      },
    });

    return response.data._embedded?.events || [];
  } catch (error) {
    console.log("API ERROR:", error);
    return [];
  }
};
