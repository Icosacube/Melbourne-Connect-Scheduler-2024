import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

// Currently getting from dummy api
async function getSpeakers() {
  try {
    const response = await instance.get("/1");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export { getSpeakers };
