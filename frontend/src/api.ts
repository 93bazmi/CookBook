import { Recipe } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL;

// 🔍 search
export const searchRecipes = async (searchTerm: string, page: number) => {
  const url = new URL(`${BASE_URL}/api/recipes/search`);
  url.searchParams.append("searchTerm", searchTerm);
  url.searchParams.append("page", String(page));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// 📄 summary
export const getRecipeSummary = async (recipeId: string) => {
  const url = new URL(`${BASE_URL}/api/recipes/${recipeId}/summary`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// ❤️ get favourites
export const getFavouriteRecipes = async () => {
  const response = await fetch(`${BASE_URL}/api/recipes/favourite`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

// ➕ add favourite
export const addFavouriteRecipe = async (recipe: Recipe) => {
  const response = await fetch(`${BASE_URL}/api/recipes/favourite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeId: recipe.id }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

// ❌ remove favourite
export const removeFavouriteRecipe = async (recipe: Recipe) => {
  const response = await fetch(`${BASE_URL}/api/recipes/favourite`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeId: recipe.id }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};