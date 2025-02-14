import dotenv from 'dotenv';
import fetch from "node-fetch";

dotenv.config();

const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
    if (!apiKey) {
        throw new Error("API key not found");
    }

    // Default to page 1 if invalid or undefined
    if (isNaN(page) || page < 1) {
        page = 1;
    }

    // Construct the API URL
    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
    
    // Query parameters
    const queryParams = {
        apiKey,  // Ensure this is correct based on the API documentation
        query: searchTerm,
        number: "10",
        offset: (page * 10).toString(),  // Adjust page for API (e.g., page 1 -> offset 0)
    };

    url.search = new URLSearchParams(queryParams).toString();
    console.log("Fetching URL:", url.toString()); // Debugging

    try {
        const searchResponse = await fetch(url);

        // Check for HTTP errors
        if (!searchResponse.ok) {
            throw new Error(`API request failed with status ${searchResponse.status} - ${searchResponse.statusText}`);
        }

        const resultsJson = await searchResponse.json();
        console.log("API Response:", resultsJson); // Debugging
        return resultsJson;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};

export const getRecipeSummary = async (recipeId:string) => {
    if(!apiKey){
        throw new Error("API key not found");
    }

    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);
    const params = {
        apiKey: apiKey,
    }
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);
    const json = await response.json();

    return json;
};


export const getFavouriteRecipesByIDs = async(ids: string[]) => {
    if (!apiKey) {
        throw new Error("API key not found");
    }

    const url = new URL(`https://api.spoonacular.com/recipes/informationBulk`);
    const params = {
        apiKey: apiKey,
        ids: ids.join(","),
    }
    url.search = new URLSearchParams(params).toString()

    const searchResponse = await fetch(url);
    const json = await searchResponse.json();

    return { results: json};
}
