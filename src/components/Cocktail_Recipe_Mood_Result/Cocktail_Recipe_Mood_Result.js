import "./Cocktail_Recipe_Mood_Result.scss";
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Cocktail_Recipe_Mood_Result(props) {
    const [CurrentMoodRecipesList, setCurrentMoodRecipesList] = useState([]);
    
    //onClick rerender the AllList
    const OnClick = (event) => {
        props.setRefetchRecipe(true);
    }

    useEffect(() => {
        if (props.CurrentMood !== "") {
            let FilterMoodRecipes = props.AllRecipesInfo.filter((recipe) => recipe.represent_mood.includes(props.CurrentMood));
            setCurrentMoodRecipesList(FilterMoodRecipes);
        }

        else {
            setCurrentMoodRecipesList([]);
        }
    }, [props.CurrentMood])

    // console.log(CurrentMoodRecipesList);

    // Select a random Cocktail Recipe from the CurrentMoodRecipesList

    let random = Math.floor(Math.random() * CurrentMoodRecipesList.length);
    let random_MoodRecipe = CurrentMoodRecipesList[parseInt(random)];

    return (
        <>
            <section className="Cocktail_Recipe_Mood_Result">
                <p className="Mood-Result__moodtitle neon-text">"{props.CurrentMood}"</p>
                <NavLink to={`/cocktail_recipe/${random_MoodRecipe?.recipe_id}`} className={`${random_MoodRecipe ? 'Mood-Result__ShowResult' : 'Mood-Result__NoResult'}`}>
                    <div className="Mood-Result__block">
                        <img className="Mood-Result__image" src={`${random_MoodRecipe?.img_id ? `http://localhost:5050/assets/Cocktail_Type/${random_MoodRecipe?.img_id}.jpg` : ""} `}/>
                        <p className="Mood-Result__title neon-text">{random_MoodRecipe?.cocktail_name}</p>
                    </div>
                </NavLink>


                <button className="Mood-Result__randombutton" onClick={OnClick}>
                    Next Please
                </button>


            </section>
        </>
    );
}

export default Cocktail_Recipe_Mood_Result;