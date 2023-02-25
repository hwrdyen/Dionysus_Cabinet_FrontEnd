import "./Cocktail_Recipe_Page.scss";

import { useParams, useNavigate } from 'react-router-dom';

function Cocktail_Recipe_Page(props) {
    const { cocktail_recipe_ID } = useParams();


    let CurrentCocktailRecipe = props.AllRecipesInfo.find((cocktail_recipe) => cocktail_recipe?.recipe_id === cocktail_recipe_ID);

    const navigate = useNavigate();
    if (!CurrentCocktailRecipe) {
        navigate("/*");
    }

    return (
        <>
            <section className="Cocktail_Recipe_Page">
                <div className="Recipe__info">
                    <div className="Recipe__infotitle--container">
                        <div className="Recipe__name">{CurrentCocktailRecipe?.cocktail_name}</div>
                        <div className={`Recipe__author ${CurrentCocktailRecipe?.cocktail_recipe_author_name ? `show` : `hidden`}`}>By {CurrentCocktailRecipe?.cocktail_recipe_author_name}</div>
                    </div>
                    <img className="Recipe__image" src={`http://localhost:8080/assets/Cocktail_Type/${CurrentCocktailRecipe?.img_id}.jpg`}/>
                </div>

                <div className="Recipe__tags--list" id="Recipe__tags--list">{
                    CurrentCocktailRecipe?.cocktail_included_alchohol.split(",").map((alcohol) => (
                        <div className="Recipe__tags--item">{alcohol}</div>
                    ))
                }</div>
                
                <div className="Cocktail_Recipe--infocontainer">
                    <div className="Cocktail_Recipe--ingredientcontainer">
                        <p className="Recipe_Page__title">Ingredient:</p>
                        <div className="Cocktail_Recipe--ingredientlistcontainer">{
                        CurrentCocktailRecipe?.cocktail_ingredients.split(";").map((ingredient, index) => (
                            <p>- {ingredient}</p>
                        ))}</div>
                    </div>

                    <div className="Cocktail_Recipe--stepcontainer">
                        <p className="Recipe_Page__title">Steps:</p>
                        <div>{
                        CurrentCocktailRecipe?.cocktail_recipe_steps.split(";").map((step, index) => (
                            <p>{parseInt(index)+1}. {step}</p>
                        ))}</div>
                    </div>
                </div>



            </section>
        </>
    );
}

export default Cocktail_Recipe_Page;