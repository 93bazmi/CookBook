import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { AiOutlineSearch } from "react-icons/ai";

type Tabs = "search" | "favourites";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavouriteRecipes = async () => {
      try {
        const favouriteRecipes = await api.getFavouriteRecipes();
        setFavouriteRecipes(favouriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavouriteRecipes();
  }, []);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipe = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipe.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  const addFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavouriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      const updatedRecipes = favouriteRecipes.filter(
        (favRecipe) => recipe.id !== favRecipe.id
      );
      setFavouriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo"></img>
      </div>

      <div className="tabs flex gap-10">
        <div
          style={{ fontSize: "20px" }}
          className={`tab px-6 py-2 rounded ${
            selectedTab === "search" ? "tab-active" : "tab-s"
          }`}
          onClick={() => setSelectedTab("search")}
        >
          Recipe Search
        </div>
        <div
          style={{ fontSize: "20px" }}
          className={`tab px-6 py-2 rounded ${
            selectedTab === "favourites" ? "tab-active" : "tab-f"
          }`}
          onClick={() => setSelectedTab("favourites")}
        >
          Favourites
        </div>
      </div>

      <div className="app-container">
        {selectedTab === "search" && (
          <>
            <form onSubmit={(event) => handleSearchSubmit(event)}>
              <input
                type="text"
                required
                placeholder="Enter a search term ..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              ></input>
              <button type="submit">
                <AiOutlineSearch size={40} />
              </button>
            </form>

            <div className="recipe-grid">
              {recipes.map((recipe) => {
                const isFavourite = favouriteRecipes.some(
                  (favRecipe) => recipe.id === favRecipe.id
                );

                return (
                  <RecipeCard
                    recipe={recipe}
                    onClick={() => setSelectedRecipe(recipe)}
                    onFavouriteButtonClick={
                      isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
                    }
                    isFavourite={isFavourite}
                  />
                );
              })}
            </div>

            <button
              style={{
                marginBottom: "150px",
                marginTop: "50px",
                fontFamily: "'Neucha', serif",
              }}
              className="view-more-button"
              onClick={handleViewMoreClick}
            >
              View More
            </button>
          </>
        )}

        <div
          style={{
            marginBottom: "150px",
          }}
        >
          {selectedTab === "favourites" && (
            <div className="recipe-grid">
              {favouriteRecipes.map((recipe) => (
                <RecipeCard
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  onFavouriteButtonClick={removeFavouriteRecipe}
                  isFavourite={true}
                />
              ))}
            </div>
          )}

          {selectedRecipe ? (
            <RecipeModal
              recipeId={selectedRecipe.id.toString()}
              onClose={() => setSelectedRecipe(undefined)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
