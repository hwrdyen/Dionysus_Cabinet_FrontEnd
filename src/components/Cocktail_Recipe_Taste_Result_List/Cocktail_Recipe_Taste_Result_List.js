import "./Cocktail_Recipe_Taste_Result_List.scss";
import { useState, useEffect } from 'react';

//import components
import CocktailRecipeTasteResultItem from "../Cocktail_Recipe_Taste_Result_Item/Cocktail_Recipe_Taste_Result_Item";

function Cocktail_Recipe_Taste_Result_List(props) {
    const [CurrentTasteRecipesList, setCurrentTasteRecipesList] = useState([]);
    const [CurrentTasteInfo, setCurrentTasteInfo] = useState([]);

    useEffect(() => {
        if (props.CurrentTaste !== "") {
            let FilterTasteRecipes = props.AllRecipesInfo.filter((recipe) => recipe.taste_preferences.includes(props.CurrentTaste));
            setCurrentTasteRecipesList(FilterTasteRecipes);
        }

        else {
            setCurrentTasteRecipesList([]);
        }
    }, [props.CurrentTaste, props.AllRecipesInfo]);
    // console.log(CurrentTasteRecipesList);

    useEffect(() => {
        if (props.CurrentTaste !== "") {
            let currenttaste_info = props.TastePreferencesList.find((taste) => taste?.taste_name === props.CurrentTaste);
            setCurrentTasteInfo(currenttaste_info);
        }

        else {
            setCurrentTasteInfo([]);
        }
    }, [props.CurrentTaste, props.TastePreferencesList])
    // console.log(CurrentTasteInfo);

    return (
        <>
            <div className="Cocktail_Recipe_Taste_Result_List">
                <div className={`Taste_Result--titlecontainer ${!props.CurrentTaste ? `nonactive` : `active`}`}>
                    <p className="Taste_Result--title">{props.CurrentTaste}</p>
                    <p className="Taste_Result--titledescription">{CurrentTasteInfo?.taste_description}</p>
                </div>

                <div className="Cocktail_Recipe_Taste_Result_List--ItemList">{
                    CurrentTasteRecipesList.map((CurrentTasteRecipeItem, index) => (
                        <CocktailRecipeTasteResultItem id={`CocktailRecipeTasteResultItem_${index}`} CurrentTasteRecipeItem={CurrentTasteRecipeItem}/>
                    ))
                }</div>
            </div>

        </>
    );
}

export default Cocktail_Recipe_Taste_Result_List;