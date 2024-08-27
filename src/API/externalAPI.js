import axios from 'axios';

// Using an environment variable for the API key
const API_KEY = import.meta.env.VITE_API_KEY;

// Asynchronously fetch data
async function getFoods() {
  try {
    const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
      params: {
        cuisine: 'chinese',
        number: 100,
        apiKey: API_KEY
      }
    });
    return response.data.results;
  } catch (error) { 
    console.error("Failed to fetch foods:", error);
    return null;
  }
}

export default getFoods;
