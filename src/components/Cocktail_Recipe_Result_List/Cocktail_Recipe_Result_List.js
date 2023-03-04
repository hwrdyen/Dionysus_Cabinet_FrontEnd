import "./Cocktail_Recipe_Result_List.scss";

//import components
import CocktailRecipeResultItem from "../Cocktail_Recipe_Result_Item/Cocktail_Recipe_Result_Item";

function Cocktail_Recipe_Result_List(props) {

    return (
        <>
            <section className="Cocktail_Recipe_Result_List">
                <div className={`Result__Number ${props.CurrentAlcohol !== "" ? 'Recipe_SearchResult' : 'Recipe_ZeroResult'}`} id="Result__Number__Result">
                    There are {props.CurrentAlcoholRecipes.length} recipes with {props.CurrentAlcohol}
                </div>

                <div className="Result__ItemList">{props.CurrentAlcoholRecipes.map((CurrentAlcoholRecipe_info, index) => (
                        <CocktailRecipeResultItem id={`CocktailRecipeResultItem_${index}`} CurrentAlcoholRecipe_info={CurrentAlcoholRecipe_info}/>
                    ))
                }</div>

                <div className={`Result__Reset ${props.CurrentAlcohol !== "" ? 'Recipe_SearchResult' : 'Recipe_ZeroResult'}`} onClick={props.ResetSelectAlcohol}>
                    <button className="Cocktail_Recipe_Result_List__resetbutton">Reset</button>
                </div>
                
            </section>

        </>
    );
}

export default Cocktail_Recipe_Result_List;