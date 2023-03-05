import "./Cocktail_Recipe_Taste_Result_Item.scss";
import { NavLink } from 'react-router-dom';

function Cocktail_Recipe_Taste_Result_Item(props) {
    return (
        <>
            <div className="Cocktail_Recipe_Taste_Result_Item--card">
                <NavLink to={`/cocktail_recipe/${props.CurrentTasteRecipeItem?.recipe_id}`}>
                    <img className="Cocktail_Recipe_Taste_Result_Item--image" src={`http://localhost:5050/assets/Cocktail_Type/${props.CurrentTasteRecipeItem?.img_id}.jpg`}/>
                    <div className="Cocktail_Recipe_Taste_Result_Item--title">{props.CurrentTasteRecipeItem?.cocktail_name}</div>
                </NavLink>
            </div>
        </>
    );
}

export default Cocktail_Recipe_Taste_Result_Item;