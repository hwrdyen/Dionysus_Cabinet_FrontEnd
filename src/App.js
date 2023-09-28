import "./App.scss";
import "./styles/partials/_global.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import components
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header.js";
import AlcoholCabinet from "./pages/Alcohol_Cabinet/Alcohol_Cabinet";
import CocktailRecipePage from "./pages/Cocktail_Recipe_Page/Cocktail_Recipe_Page";
import Taste from "./pages/Taste/Taste.js";
import Mood from "./pages/Mood/Mood.js";
import Upload from "./pages/Upload/Upload.js";
import Footer from "./components/Footer/Footer.js";
import NotFound from "./pages/NotFound/NotFound.js";

function App() {
  const [CurrentAlcohol, setCurrentAlcohol] = useState("");
  const [CurrentAlcoholRecipes, setCurrentAlcoholRecipes] = useState([]);
  const [AllRecipesInfo, setAllRecipesInfo] = useState([]);
  const [RefetchRecipe, setRefetchRecipe] = useState(true);

  useEffect(() => {
    function GetAllRecipesInfo() {
      return axios
        .get(`https://dionysus-cocktail-cabinet-be.onrender.com/cocktails_list`)
        .then((element) => {
          let recipes_info = element.data;
          setAllRecipesInfo(recipes_info);
          setRefetchRecipe(false);
        });
    }
    if (RefetchRecipe === true) {
      GetAllRecipesInfo();
    }
  }, [RefetchRecipe]);

  useEffect(() => {
    function GetCurrentAlcoholRecipesInfo() {
      return axios
        .get(`https://dionysus-cocktail-cabinet-be.onrender.com/cocktails_list`)
        .then((element) => {
          let recipes_info = element.data;
          if (CurrentAlcohol !== "") {
            const current_alcohol_recipes_info = recipes_info.filter((recipe) =>
              recipe.cocktail_included_alchohol.includes(CurrentAlcohol)
            );
            setCurrentAlcoholRecipes(current_alcohol_recipes_info);
          } else {
            setCurrentAlcoholRecipes([]);
          }
        });
    }

    GetCurrentAlcoholRecipesInfo();
    // console.log(CurrentAlcohol);
    // console.log(CurrentAlcoholRecipes);
  }, [CurrentAlcohol]);

  return (
    <>
      <BrowserRouter>
        <Header setRefetchRecipe={setRefetchRecipe} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/liquor_cellar"
            element={
              <AlcoholCabinet
                CurrentAlcohol={CurrentAlcohol}
                setCurrentAlcohol={setCurrentAlcohol}
                CurrentAlcoholRecipes={CurrentAlcoholRecipes}
              />
            }
          />
          <Route
            path="/cocktail_recipe/:cocktail_recipe_ID"
            element={<CocktailRecipePage AllRecipesInfo={AllRecipesInfo} />}
          />
          <Route
            path="taste_concierge"
            element={<Taste AllRecipesInfo={AllRecipesInfo} />}
          />
          <Route
            path="mood_matchmaker"
            element={<Mood AllRecipesInfo={AllRecipesInfo} />}
          />
          <Route
            path="upload"
            element={<Upload setRefetchRecipe={setRefetchRecipe} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
